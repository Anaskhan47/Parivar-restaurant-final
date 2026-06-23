from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.database.database import get_db
from app.database import crud, schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.MenuItemResponse])
async def read_menu_items(category: str = None, db: AsyncSession = Depends(get_db)):
    if category:
        return await crud.get_menu_items_by_category(db, category_name=category)
    return await crud.get_menu_items(db)

@router.post("/", response_model=schemas.MenuItemResponse)
async def create_menu_item(
    menu_item: schemas.MenuItemCreate, 
    db: AsyncSession = Depends(get_db),
    # Assuming only super admin or manager can create/edit, but we'll leave dependency open or you can add deps.get_current_active_superuser
):
    return await crud.create_menu_item(db=db, menu_item=menu_item)

@router.put("/{item_id}", response_model=schemas.MenuItemResponse)
async def update_menu_item(
    item_id: int,
    menu_item_update: schemas.MenuItemUpdate,
    db: AsyncSession = Depends(get_db)
):
    from fastapi import HTTPException
    db_item = await crud.update_menu_item(db=db, item_id=item_id, menu_item_update=menu_item_update)
    if not db_item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return db_item

@router.delete("/{item_id}")
async def delete_menu_item(
    item_id: int,
    db: AsyncSession = Depends(get_db)
):
    from fastapi import HTTPException
    db_item = await crud.delete_menu_item(db=db, item_id=item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return {"message": "Menu item deleted"}
