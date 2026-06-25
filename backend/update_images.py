import asyncio
import os
import urllib.parse
from app.database.database import AsyncSessionLocal
from app.database import models
from sqlalchemy import select

async def update_images():
    async with AsyncSessionLocal() as session:
        # Get all categories
        result = await session.execute(select(models.Category))
        categories = result.scalars().all()
        
        for category in categories:
            # Look for folder in uploads
            category_path = os.path.join("uploads", category.name)
            if os.path.isdir(category_path):
                # Update category image to a default one if exists
                # Not strictly needed but good
                pass
                
            # Get items in this category
            item_result = await session.execute(select(models.MenuItem).where(models.MenuItem.category_id == category.id))
            items = item_result.scalars().all()
            
            for item in items:
                # Find the matching image file
                # the filenames seem to be lowercase of item name + .png
                # or just look at all files in the category folder
                if os.path.isdir(category_path):
                    for file in os.listdir(category_path):
                        name_without_ext = os.path.splitext(file)[0]
                        if name_without_ext.lower() == item.name.lower():
                            # Generate URL encoded path
                            url_path = f"http://localhost:8000/uploads/{category.name}/{file}"
                            # Replace spaces with %20 so URLs work reliably in CSS/img tags
                            url_path = url_path.replace(" ", "%20")
                            item.image_url = url_path
                            print(f"Updated {item.name} -> {url_path}")
                            break
                            
        await session.commit()

if __name__ == "__main__":
    asyncio.run(update_images())
