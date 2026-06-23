from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.database.database import get_db
from app.database import crud, schemas, models
from app.api import deps
from sqlalchemy.future import select

router = APIRouter()

@router.get("/", response_model=List[schemas.UserResponse])
async def read_users(
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
    return await crud.get_users(db)

class PasswordChangeRequest(schemas.BaseModel):
    current_password: str
    new_password: str

@router.put("/me/password")
async def change_my_password(
    password_data: PasswordChangeRequest,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
    from app.core import security
    
    # Verify current password
    if not security.verify_password(password_data.current_password, current_user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect current password")
        
    # Update password
    update_schema = schemas.UserUpdate(password=password_data.new_password)
    await crud.update_user(db=db, user_id=current_user.id, user_update=update_schema)
    
    return {"message": "Password updated successfully"}

@router.post("/", response_model=schemas.UserResponse)
async def create_user(
    user: schemas.UserCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(deps.require_role([models.UserRole.SUPER_ADMIN]))
):
    # Check if username exists
    existing_user = await db.execute(select(models.User).filter(models.User.username == user.username))
    if existing_user.scalars().first():
        raise HTTPException(status_code=400, detail="Username already registered")
    return await crud.create_user(db=db, user=user)

@router.put("/{user_id}", response_model=schemas.UserResponse)
async def update_user(
    user_id: int, 
    user_update: schemas.UserUpdate, 
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(deps.require_role([models.UserRole.SUPER_ADMIN]))
):
    db_user = await crud.update_user(db=db, user_id=user_id, user_update=user_update)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.delete("/{user_id}")
async def delete_user(
    user_id: int, 
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(deps.require_role([models.UserRole.SUPER_ADMIN]))
):
    if current_user.id == user_id:
        raise HTTPException(status_code=400, detail="Cannot delete your own account")
    db_user = await crud.delete_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted"}
