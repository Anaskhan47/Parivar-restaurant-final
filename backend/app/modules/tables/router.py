from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional

from app.database import models, schemas
from app.database.database import get_db
from app.api import deps
from app.core.websockets import manager

from sqlalchemy.orm import selectinload

router = APIRouter(prefix="/tables", tags=["tables"])

@router.get("", response_model=List[schemas.TableResponse])
async def read_tables(
    db: AsyncSession = Depends(get_db),
    current_user: Optional[models.User] = Depends(deps.get_current_user)
):
    result = await db.execute(
        select(models.RestaurantTable)
        .options(selectinload(models.RestaurantTable.orders).selectinload(models.Order.waiter))
        .order_by(models.RestaurantTable.table_number)
    )
    tables = result.scalars().all()
    
    for table in tables:
        active = None
        for order in table.orders:
            if order.status not in [models.OrderStatus.CLOSED, models.OrderStatus.CANCELLED]:
                active = order
                break
        if active:
            table.active_order = {
                "id": active.id,
                "status": active.status,
                "total_amount": active.total_amount,
                "guest_count": active.guest_count,
                "waiter_username": active.waiter.username if active.waiter else None,
                "created_at": active.created_at
            }
        else:
            table.active_order = None
            
    return tables

@router.post("", response_model=schemas.TableResponse)
async def create_table(
    table_in: schemas.TableCreate,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(deps.require_role([models.UserRole.SUPER_ADMIN, models.UserRole.MANAGER]))
):
    # Check for duplicate table number
    existing = await db.execute(
        select(models.RestaurantTable).where(models.RestaurantTable.table_number == table_in.table_number)
    )
    if existing.scalars().first():
        raise HTTPException(status_code=400, detail=f"Table '{table_in.table_number}' already exists")

    table = models.RestaurantTable(
        table_number=table_in.table_number,
        capacity=table_in.capacity,
        status=table_in.status,
    )
    db.add(table)
    await db.commit()
    await db.refresh(table)

    await manager.broadcast({
        "type": "TABLE_CREATED",
        "data": {
            "id": table.id,
            "table_number": table.table_number,
            "status": table.status,
            "capacity": table.capacity,
        }
    })

    table.active_order = None
    return table

@router.put("/{table_id}", response_model=schemas.TableResponse)
async def update_table(
    table_id: int,
    table_in: schemas.TableUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(deps.require_role([models.UserRole.SUPER_ADMIN, models.UserRole.MANAGER, models.UserRole.WAITER]))
):
    result = await db.execute(select(models.RestaurantTable).where(models.RestaurantTable.id == table_id))
    table = result.scalars().first()
    if not table:
        raise HTTPException(status_code=404, detail="Table not found")
    
    if table_in.status:
        table.status = table_in.status
    if table_in.capacity:
        table.capacity = table_in.capacity
        
    await db.commit()
    await db.refresh(table)
    
    # Broadcast the table update
    await manager.broadcast({
        "type": "TABLE_UPDATED",
        "data": {
            "id": table.id,
            "status": table.status,
            "table_number": table.table_number
        }
    })
    
    table.active_order = None
    return table

@router.delete("/{table_id}")
async def delete_table(
    table_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(deps.require_role([models.UserRole.SUPER_ADMIN, models.UserRole.MANAGER]))
):
    result = await db.execute(select(models.RestaurantTable).where(models.RestaurantTable.id == table_id))
    table = result.scalars().first()
    if not table:
        raise HTTPException(status_code=404, detail="Table not found")

    # Don't allow deleting occupied tables
    for order in table.orders:
        if order.status not in [models.OrderStatus.CLOSED, models.OrderStatus.CANCELLED]:
            raise HTTPException(status_code=400, detail="Cannot delete a table with an active order")

    table_number = table.table_number
    await db.delete(table)
    await db.commit()

    await manager.broadcast({
        "type": "TABLE_DELETED",
        "data": {"id": table_id, "table_number": table_number}
    })

    return {"message": f"Table {table_number} deleted"}
