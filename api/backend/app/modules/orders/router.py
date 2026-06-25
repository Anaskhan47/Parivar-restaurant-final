from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List, Optional
from datetime import datetime

from app.database import models, schemas
from app.database.database import get_db
from app.api import deps
from app.core.websockets import manager

router = APIRouter(prefix="/orders", tags=["orders"])

@router.get("/", response_model=List[schemas.OrderResponse])
async def list_orders(
    table_id: int = None,
    status: models.OrderStatus = None,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
    query = select(models.Order).options(
        selectinload(models.Order.items).selectinload(models.OrderItem.menu_item),
        selectinload(models.Order.timeline_events),
        selectinload(models.Order.table),
        selectinload(models.Order.bill)
    )
    if table_id:
        query = query.where(models.Order.table_id == table_id)
    if status:
        query = query.where(models.Order.status == status)
        
    result = await db.execute(query.order_by(models.Order.created_at.desc()))
    return result.scalars().all()

@router.get("/{order_id}", response_model=schemas.OrderResponse)
async def get_order(
    order_id: int,
    db: AsyncSession = Depends(get_db)
):
    query = select(models.Order).options(
        selectinload(models.Order.items).selectinload(models.OrderItem.menu_item),
        selectinload(models.Order.timeline_events),
        selectinload(models.Order.table),
        selectinload(models.Order.bill)
    ).where(models.Order.id == order_id)
    
    result = await db.execute(query)
    order = result.scalars().first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.post("/", response_model=schemas.OrderResponse)
async def create_order(
    order_in: schemas.OrderCreate,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[models.User] = Depends(deps.get_current_user)
):
    total = 0.0
    new_items = []
    
    # Verify items and calculate total
    for item in order_in.items:
        try:
            menu_item_id_int = int(item.menu_item_id)
            res = await db.execute(select(models.MenuItem).where(models.MenuItem.id == menu_item_id_int))
        except ValueError:
            res = await db.execute(select(models.MenuItem).where(models.MenuItem.name == str(item.menu_item_id)))
            
        menu_item = res.scalars().first()
        if not menu_item:
            raise HTTPException(status_code=400, detail=f"Menu item {item.menu_item_id} not found")
        total += menu_item.price * item.quantity
        
        new_items.append(models.OrderItem(
            menu_item_id=menu_item.id,
            quantity=item.quantity,
            unit_price=menu_item.price,
            special_notes=item.special_notes,
            status=models.OrderItemStatus.NEW
        ))
        
    waiter_id = current_user.id if current_user else None
    new_order = models.Order(
        table_id=order_in.table_id,
        customer_id=order_in.customer_id,
        waiter_id=waiter_id,
        order_type=order_in.order_type,
        guest_count=order_in.guest_count,
        total_amount=total,
        customer_name=order_in.customer_name,
        customer_phone=order_in.customer_phone,
        status=models.OrderStatus.NEW
    )
    
    db.add(new_order)
    await db.flush() # get id
    
    for ni in new_items:
        ni.order_id = new_order.id
        db.add(ni)
        
    creator = current_user.username if current_user else "Customer"
    timeline_event = models.TimelineEvent(
        order_id=new_order.id,
        description=f"Order created by {creator}"
    )
    db.add(timeline_event)
    
    if order_in.table_id:
        res_table = await db.execute(select(models.RestaurantTable).where(models.RestaurantTable.id == order_in.table_id))
        table = res_table.scalars().first()
        if table:
            table.status = models.TableStatus.OCCUPIED
            await db.flush()
            # Broadcast table status change
            await manager.broadcast({
                "type": "TABLE_UPDATED",
                "data": {
                    "id": table.id,
                    "status": table.status,
                    "table_number": table.table_number
                }
            })
    
    await db.commit()
    await db.refresh(new_order)
    
    # Fetch full object for response
    res_full = await db.execute(
        select(models.Order)
        .options(
            selectinload(models.Order.items).selectinload(models.OrderItem.menu_item),
            selectinload(models.Order.timeline_events),
            selectinload(models.Order.table),
            selectinload(models.Order.bill)
        )
        .where(models.Order.id == new_order.id)
    )
    order_full = res_full.scalars().first()
    
    await manager.broadcast({
        "type": "ORDER_CREATED",
        "data": { 
            "id": order_full.id, 
            "table_id": order_full.table_id,
            "table_number": order_full.table.table_number if order_full.table else None,
            "order_type": order_full.order_type,
            "total_amount": order_full.total_amount,
            "created_at": order_full.created_at.isoformat() if order_full.created_at else None
        }
    })
    
    return order_full

async def _resolve_menu_item(db: AsyncSession, menu_item_id):
    try:
        menu_item_id_int = int(menu_item_id)
        res = await db.execute(select(models.MenuItem).where(models.MenuItem.id == menu_item_id_int))
    except ValueError:
        res = await db.execute(select(models.MenuItem).where(models.MenuItem.name == str(menu_item_id)))
    return res.scalars().first()

async def _recalculate_order_bill(order: models.Order):
    if not order.bill:
        return
    subtotal = order.total_amount
    order.bill.subtotal = subtotal
    order.bill.tax_amount = round(subtotal * 0.10, 2)
    order.bill.service_fee = round(subtotal * 0.05, 2)
    order.bill.grand_total = round(subtotal + order.bill.tax_amount + order.bill.service_fee, 2)

@router.post("/{order_id}/items", response_model=schemas.OrderResponse)
async def add_items_to_order(
    order_id: int,
    payload: schemas.OrderAddItems,
    db: AsyncSession = Depends(get_db),
):
    if not payload.items:
        raise HTTPException(status_code=400, detail="No items provided")

    res = await db.execute(
        select(models.Order)
        .options(
            selectinload(models.Order.items),
            selectinload(models.Order.bill),
        )
        .where(models.Order.id == order_id)
    )
    order = res.scalars().first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.status in [models.OrderStatus.CLOSED, models.OrderStatus.CANCELLED]:
        raise HTTPException(status_code=400, detail="Cannot modify a closed or cancelled order")

    added_names = []
    for item in payload.items:
        menu_item = await _resolve_menu_item(db, item.menu_item_id)
        if not menu_item or not menu_item.is_available:
            raise HTTPException(status_code=400, detail=f"Menu item {item.menu_item_id} not found or unavailable")

        existing = next(
            (oi for oi in order.items if oi.menu_item_id == menu_item.id),
            None,
        )
        if existing:
            existing.quantity += item.quantity
            order.total_amount += menu_item.price * item.quantity
        else:
            order_item = models.OrderItem(
                order_id=order.id,
                menu_item_id=menu_item.id,
                quantity=item.quantity,
                unit_price=menu_item.price,
                special_notes=item.special_notes,
                status=models.OrderItemStatus.NEW,
            )
            db.add(order_item)
            order.total_amount += menu_item.price * item.quantity
        added_names.append(menu_item.name)

    await _recalculate_order_bill(order)

    timeline_event = models.TimelineEvent(
        order_id=order.id,
        description=f"Customer added: {', '.join(added_names)}",
    )
    db.add(timeline_event)

    await db.commit()

    res_updated = await db.execute(
        select(models.Order)
        .options(
            selectinload(models.Order.items).selectinload(models.OrderItem.menu_item),
            selectinload(models.Order.timeline_events),
            selectinload(models.Order.table),
            selectinload(models.Order.bill),
        )
        .where(models.Order.id == order_id)
    )
    order_updated = res_updated.scalars().first()

    await manager.broadcast({
        "type": "ORDER_UPDATED",
        "data": {"id": order_updated.id, "total_amount": order_updated.total_amount},
    })
    await manager.broadcast({
        "type": "ORDER_STATUS_CHANGED",
        "data": {"id": order_updated.id, "status": order_updated.status},
    })

    return order_updated

@router.put("/{order_id}/status", response_model=schemas.OrderResponse)
async def update_order_status(
    order_id: int,
    status_update: schemas.OrderUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
    res = await db.execute(
        select(models.Order)
        .options(
            selectinload(models.Order.items).selectinload(models.OrderItem.menu_item),
            selectinload(models.Order.timeline_events),
            selectinload(models.Order.table)
        )
        .where(models.Order.id == order_id)
    )
    order = res.scalars().first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
        
    if status_update.status:
        old_status = order.status
        order.status = status_update.status
        timeline_event = models.TimelineEvent(
            order_id=order.id,
            description=f"Order status changed to {status_update.status.value} by {current_user.username}"
        )
        db.add(timeline_event)
        
        # Sync items status
        item_status_map = {
            models.OrderStatus.NEW: models.OrderItemStatus.NEW,
            models.OrderStatus.ACCEPTED: models.OrderItemStatus.ACCEPTED,
            models.OrderStatus.PREPARING: models.OrderItemStatus.PREPARING,
            models.OrderStatus.READY: models.OrderItemStatus.READY,
            models.OrderStatus.COMPLETED: models.OrderItemStatus.SERVED,
            models.OrderStatus.CANCELLED: models.OrderItemStatus.CANCELLED,
            models.OrderStatus.CLOSED: models.OrderItemStatus.SERVED
        }
        target_item_status = item_status_map.get(status_update.status)
        if target_item_status:
            for item in order.items:
                item.status = target_item_status
        
        # If order is CANCELLED or CLOSED, set table status to AVAILABLE
        if (status_update.status in [models.OrderStatus.CANCELLED, models.OrderStatus.CLOSED]) and order.table_id:
            table_res = await db.execute(select(models.RestaurantTable).where(models.RestaurantTable.id == order.table_id))
            table = table_res.scalars().first()
            if table:
                table.status = models.TableStatus.AVAILABLE
                await manager.broadcast({
                    "type": "TABLE_UPDATED",
                    "data": {
                        "id": table.id,
                        "status": table.status,
                        "table_number": table.table_number
                    }
                })
                
    await db.commit()
    
    # Re-fetch with full eager-loading to avoid MissingGreenlet / lazy-load errors
    res_updated = await db.execute(
        select(models.Order)
        .options(
            selectinload(models.Order.items).selectinload(models.OrderItem.menu_item),
            selectinload(models.Order.timeline_events),
            selectinload(models.Order.table),
            selectinload(models.Order.bill)
        )
        .where(models.Order.id == order_id)
    )
    order_updated = res_updated.scalars().first()
    
    # Broadcast general status change
    await manager.broadcast({
        "type": "ORDER_STATUS_CHANGED",
        "data": { "id": order_updated.id, "status": order_updated.status }
    })
    
    # Broadcast status-specific event
    event_type = f"ORDER_{order_updated.status.value}"
    await manager.broadcast({
        "type": event_type,
        "data": { 
            "id": order_updated.id, 
            "status": order_updated.status,
            "table_id": order_updated.table_id
        }
    })
    
    return order_updated
