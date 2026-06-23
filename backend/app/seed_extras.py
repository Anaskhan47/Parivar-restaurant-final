import logging
from sqlalchemy import select
from app.database.database import AsyncSessionLocal
from app.database import models

logger = logging.getLogger(__name__)

ADDON_ITEMS = [
    {"name": "Extra Butter Naan", "desc": "Add an extra butter naan to your meal", "price": 3.00, "img": "/menu-images/Naan Bread/butter naan.png"},
    {"name": "Extra Garlic Naan", "desc": "Garlic naan on the side", "price": 3.50, "img": "/menu-images/Naan Bread/garlic naan.png"},
    {"name": "Raita", "desc": "Cooling yogurt with cucumber and mint", "price": 2.50, "img": "/menu-images/Savory Items/momos 10 pcs.png"},
    {"name": "Extra Rice", "desc": "Steamed saffron basmati rice", "price": 3.00, "img": "/menu-images/Desi Chinese/veg fried rice.png"},
    {"name": "Mint Chutney", "desc": "Fresh mint and coriander chutney", "price": 1.50, "img": "/menu-images/Savory Items/samosa 2 pcs.png"},
    {"name": "Papadum (2 pcs)", "desc": "Crispy lentil wafers", "price": 2.00, "img": "/menu-images/Savory Items/samosa 2 pcs.png"},
]

SPECIAL_ITEMS = [
    {"name": "Chef's Dum Biryani", "desc": "Today's slow-cooked lamb biryani with saffron rice", "price": 18.99, "img": "/menu-images/Desi Chinese/chicken fried  rice.png"},
    {"name": "Royal Haleem Bowl", "desc": "Limited batch heritage haleem — only today", "price": 14.99, "img": "/menu-images/Entree/mutton haleem.png"},
    {"name": "Tandoori Platter Special", "desc": "Mixed grill with naan and chutney — today's deal", "price": 22.99, "img": "/menu-images/Entree/tandoor (full).png"},
]


async def seed_addons_and_specials():
    async with AsyncSessionLocal() as session:
        for cat_name, items, desc in [
            ("Add-ons", ADDON_ITEMS, "Extra items customers can add to their order"),
            ("Today's Special", SPECIAL_ITEMS, "Featured dishes for today"),
        ]:
            result = await session.execute(select(models.Category).where(models.Category.name == cat_name))
            cat = result.scalars().first()
            if not cat:
                cat = models.Category(name=cat_name, description=desc, image_url="/src/assets/parivar-logo.png")
                session.add(cat)
                await session.commit()
                await session.refresh(cat)
                logger.info("Created category: %s", cat_name)

            for item in items:
                existing = await session.execute(
                    select(models.MenuItem).where(
                        models.MenuItem.category_id == cat.id,
                        models.MenuItem.name == item["name"],
                    )
                )
                if not existing.scalars().first():
                    session.add(models.MenuItem(
                        category_id=cat.id,
                        name=item["name"],
                        description=item["desc"],
                        price=item["price"],
                        image_url=item["img"],
                        is_available=True,
                    ))
            await session.commit()
