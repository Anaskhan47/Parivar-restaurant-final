from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from datetime import datetime

from app.database import models, schemas
from app.database.database import get_db
from app.api import deps

router = APIRouter(prefix="/catering", tags=["catering"])

@router.post("/", response_model=schemas.CateringResponse)
async def create_catering_request(
    request_in: schemas.CateringCreate,
    db: AsyncSession = Depends(get_db)
):
    db_request = models.CateringRequest(
        customer_name=request_in.customer_name,
        phone=request_in.phone,
        email=request_in.email,
        event_type=request_in.event_type,
        event_date=request_in.event_date,
        guest_count=request_in.guest_count,
        requirements=request_in.requirements,
        status=models.CateringStatus.PENDING
    )
    db.add(db_request)
    await db.commit()
    await db.refresh(db_request)
    return db_request

@router.get("/", response_model=List[schemas.CateringResponse])
async def list_catering_requests(
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
    result = await db.execute(
        select(models.CateringRequest)
        .order_by(models.CateringRequest.created_at.desc())
    )
    return result.scalars().all()

@router.put("/{request_id}/status", response_model=schemas.CateringResponse)
async def update_catering_status(
    request_id: int,
    status_update: schemas.CateringUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
    result = await db.execute(
        select(models.CateringRequest)
        .where(models.CateringRequest.id == request_id)
    )
    db_request = result.scalars().first()
    if not db_request:
        raise HTTPException(status_code=404, detail="Catering request not found")
        
    db_request.status = status_update.status
    await db.commit()
    await db.refresh(db_request)
    return db_request

@router.delete("/{request_id}")
async def delete_catering_request(
    request_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(deps.require_role([models.UserRole.SUPER_ADMIN]))
):
    result = await db.execute(
        select(models.CateringRequest)
        .where(models.CateringRequest.id == request_id)
    )
    db_request = result.scalars().first()
    if not db_request:
        raise HTTPException(status_code=404, detail="Catering request not found")
        
    await db.delete(db_request)
    await db.commit()
    return {"message": "Catering request deleted"}
