from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List

from app.database import models, schemas
from app.database.database import get_db
from app.api import deps
from app.core.websockets import manager

router = APIRouter(prefix="/kitchen", tags=["kitchen"])

@router.get("/queue", response_model=List[schemas.OrderItemResponse])
async def get_kitchen_queue(
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(deps.require_role([models.UserRole.SUPER_ADMIN, models.UserRole.MANAGER, models.UserRole.KITCHEN]))
):
    query = (
        select(models.OrderItem)
        .join(models.Order)
        .options(
            selectinload(models.OrderItem.menu_item),
            selectinload(models.OrderItem.order).selectinload(models.Order.table)
        )
        .where(
            models.Order.status.in_([
                models.OrderStatus.ACCEPTED,
                models.OrderStatus.PREPARING,
                models.OrderStatus.READY
            ])
        )
        .order_by(models.OrderItem.created_at.asc())
    )
    
    result = await db.execute(query)
    return result.scalars().all()

@router.put("/items/{item_id}/status", response_model=schemas.OrderItemResponse)
async def update_item_status(
    item_id: int,
    status: models.OrderItemStatus,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(deps.require_role([models.UserRole.SUPER_ADMIN, models.UserRole.MANAGER, models.UserRole.KITCHEN, models.UserRole.WAITER]))
):
    result = await db.execute(select(models.OrderItem).options(selectinload(models.OrderItem.menu_item)).where(models.OrderItem.id == item_id))
    item = result.scalars().first()
    if not item:
        raise HTTPException(status_code=404, detail="Order item not found")
        
    item.status = status
    
    # Check if all items in order are ready, then update order status
    order_res = await db.execute(select(models.Order).options(selectinload(models.Order.items)).where(models.Order.id == item.order_id))
    order = order_res.scalars().first()
    
    if order:
        all_ready = all(i.status in [models.OrderItemStatus.READY, models.OrderItemStatus.SERVED, models.OrderItemStatus.CANCELLED] for i in order.items)
        if all_ready and order.status != models.OrderStatus.READY:
            order.status = models.OrderStatus.READY
            timeline = models.TimelineEvent(
                order_id=order.id,
                description=f"Order {order.id} is entirely READY"
            )
            db.add(timeline)
            
            await manager.broadcast({
                "type": "ORDER_STATUS_CHANGED",
                "data": {"id": order.id, "status": order.status}
            })
            
    await db.commit()
    await db.refresh(item)
    
    await manager.broadcast({
        "type": "KITCHEN_ITEM_UPDATED",
        "data": {"id": item.id, "status": item.status, "order_id": item.order_id}
    })
    
    return item
