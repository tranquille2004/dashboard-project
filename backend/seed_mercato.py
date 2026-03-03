#!/usr/bin/env python3
"""
Seed script for Ristorante Mercato data
Source: https://github.com/tranquille2004/Mercato
"""
import asyncio
import hashlib
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Mercato group menus from GitHub GroupMenus.jsx
MERCATO_GROUP_MENUS = [
    {
        "name": "Menu 1",
        "price": 45.00,
        "includes_wine": False,
        "sort_order": 1,
        "items": [
            {"course": "Aperitivo (spumante)", "options": [
                "Rundercarpaccio met rucola en parmezaanse kaas",
                "Gemarineerde zalm",
                "Parmigiana - Gratin van aubergine met gerookte mozzarella",
                "Tagliere 'Mercato' - Italiaanse charcuterie, kaas"
            ]},
            {"course": "Hoofdgerecht", "options": [
                "Ravioli al Tartufo - Ravioli met truffel",
                "Gebraden zalm met grof zout, purée, spumante saus, seizoensgroenten",
                "Involtino di vitello - Kalfsrollade gevuld met hesp en kaas, portsaus"
            ]},
            {"course": "Dessert", "options": ["Verrassingsdessert"]}
        ]
    },
    {
        "name": "Menu 2",
        "price": 55.00,
        "includes_wine": True,
        "sort_order": 2,
        "items": [
            {"course": "Aperitivo (spumante)", "options": [
                "Triologie van zeecarpaccio: zwaardvis, tonijn, zalm",
                "Parmaham met burratina",
                "Sapori 'Mercato' - Rundercarpaccio, vitello tonnato, Parmaham",
                "Scampi met truffel en groene asperges"
            ]},
            {"course": "Hoofdgerecht", "options": [
                "Kalfsribstuk, crème met bospaddenstoelen, aardappelen",
                "Zwaardvis op mediterraanse wijze, groenten en aardappelen",
                "Trio van verse pasta 'Mercato': ravioli met truffel, tortelloni met ricotta, tagliatelle"
            ]},
            {"course": "Dessert", "options": ["Verrassingsdessert"]},
            {"course": "Inclusief", "options": ["½ fles huiswijn per persoon"]}
        ]
    },
    {
        "name": "Menu 3",
        "price": 65.00,
        "includes_wine": True,
        "sort_order": 3,
        "items": [
            {"course": "Aperitivo (spumante)", "options": [
                "Vitello tonnato - Kalfslapje, crème van tonijn, ansjovis, mayonnaise en kappertjes",
                "Gerookte zalm",
                "Ravioli met kreeft",
                "Salade van ganzenlever, sperziebonen, venkel"
            ]},
            {"course": "Hoofdgerecht", "options": [
                "Runderfilet Rossini: ganzenlever met rodewijnsaus, aardappelen",
                "Ravioli met ganzenlever, porto saus, kalfszwezerik",
                "Gegilde vissoorten met salade"
            ]},
            {"course": "Dessert", "options": ["Verrassingsdessert"]},
            {"course": "Inclusief", "options": ["½ fles huiswijn per persoon"]}
        ]
    }
]

# Mercato gallery images (from public folder structure in repo)
MERCATO_GALLERY_IMAGES = [
    "https://ristorantemercato.weebly.com/uploads/1/0/1/5/101515486/img-20160704-110159.jpg",
    "https://ristorantemercato.weebly.com/uploads/1/0/1/5/101515486/3_1.jpg",
    "https://ristorantemercato.weebly.com/uploads/1/0/1/5/101515486/dscn0463.jpg",
    "https://ristorantemercato.weebly.com/uploads/1/0/1/5/101515486/editor/dscn0407.jpg",
    "https://ristorantemercato.weebly.com/uploads/1/0/1/5/101515486/1_5.jpg",
    "https://ristorantemercato.weebly.com/uploads/1/0/1/5/101515486/2_2.jpg",
    "https://ristorantemercato.weebly.com/uploads/1/0/1/5/101515486/4_1.jpg",
    "https://ristorantemercato.weebly.com/uploads/1/0/1/5/101515486/5_1.jpg",
    "https://ristorantemercato.weebly.com/uploads/1/0/1/5/101515486/6_1.jpg",
    "https://ristorantemercato.weebly.com/uploads/1/0/1/5/101515486/7.jpg",
]

async def seed_mercato():
    """Seed Ristorante Mercato data"""
    now = datetime.now(timezone.utc).isoformat()
    
    # 1. Create site
    site_id = "site_mercato001"
    
    # Check if site already exists
    existing_site = await db.sites.find_one({"site_id": site_id})
    if existing_site:
        print(f"Site {site_id} already exists, updating...")
        await db.sites.update_one(
            {"site_id": site_id},
            {"$set": {
                "name": "Ristorante Pizzeria Mercato",
                "slug": "mercato",
                "domains": ["ristorantemercato.be", "www.ristorantemercato.be"],
                "site_type": "restaurant",
                "is_active": True,
                "updated_at": now
            }}
        )
    else:
        print("Creating new site: Ristorante Mercato")
        await db.sites.insert_one({
            "site_id": site_id,
            "name": "Ristorante Pizzeria Mercato",
            "slug": "mercato",
            "domains": ["ristorantemercato.be", "www.ristorantemercato.be"],
            "site_type": "restaurant",
            "is_active": True,
            "created_at": now,
            "updated_at": now
        })
    
    # 2. Create/Update site config
    print("Updating site config...")
    config_data = {
        "config_id": "config_mercato001",
        "site_id": site_id,
        "logo_url": "https://ristorantemercato.weebly.com/uploads/1/0/1/5/101515486/mercato-logo.png",
        "primary_color": "#D4AF37",  # Gold color from GitHub repo
        "secondary_color": "#000000",  # Black
        "address": "Stationsstraat 35, 1930 Zaventem",
        "phone": "+32 2 720 01 21",
        "email": "mercato@mail.be",
        "btw_number": None,
        "facebook_url": "https://www.facebook.com/mercatozaventem/",
        "instagram_url": None,
        "has_reservations": True,
        "has_takeaway": True,
        "reservation_form_url": None,
        "takeaway_form_url": None,
        "opening_hours": {
            "lunch": "12:00 - 14:00",
            "dinner": "18:00 - 22:00",
            "closed": "Zaterdagmiddag en zondag de hele dag"
        },
        "closure_notice": "Voor het einde van het jaar zijn wij gesloten op: 24,25 december en 31 december en 1 januari 2026. Open weer vanaf 2 januari 2026.",
        "menu_pdf_url": "https://ristorantemercato.weebly.com/uploads/1/0/1/5/101515486/ss-mains_mercato_09_24__1_.pdf",
        "meta_title": "Ristorante Pizzeria Mercato - Zaventem",
        "meta_description": "Authentieke Italiaanse keuken in het hart van Zaventem. Pizza, pasta en meer. Reserveer nu!",
        "translations": {},
        "updated_at": now
    }
    
    await db.site_configs.update_one(
        {"site_id": site_id},
        {"$set": config_data},
        upsert=True
    )
    
    # 3. Clear and insert group menus
    print("Inserting group menus...")
    await db.group_menus.delete_many({"site_id": site_id})
    
    group_docs = []
    for i, menu in enumerate(MERCATO_GROUP_MENUS):
        group_docs.append({
            "menu_id": f"gmenu_mercato_{i:03d}",
            "site_id": site_id,
            "name": menu["name"],
            "price": menu["price"],
            "includes_wine": menu["includes_wine"],
            "items": menu["items"],
            "sort_order": menu["sort_order"],
            "created_at": now
        })
    
    if group_docs:
        await db.group_menus.insert_many(group_docs)
        print(f"Inserted {len(group_docs)} group menus")
    
    # 4. Clear and insert gallery images
    print("Inserting gallery images...")
    await db.gallery_images.delete_many({"site_id": site_id})
    
    gallery_docs = []
    for i, url in enumerate(MERCATO_GALLERY_IMAGES):
        gallery_docs.append({
            "image_id": f"img_mercato_{i:03d}",
            "site_id": site_id,
            "url": url,
            "alt_text": f"Mercato foto {i+1}",
            "category": "gallery",
            "sort_order": i,
            "created_at": now
        })
    
    if gallery_docs:
        await db.gallery_images.insert_many(gallery_docs)
        print(f"Inserted {len(gallery_docs)} gallery images")
    
    # Note: Mercato uses a PDF menu, so no individual menu_items needed
    # The PDF link is stored in the config
    
    print("\n=== Ristorante Mercato data seeding complete! ===")

async def create_mercato_admin():
    """Create site admin for Mercato"""
    now = datetime.now(timezone.utc).isoformat()
    site_id = "site_mercato001"
    
    # Check if admin already exists
    existing = await db.site_admins.find_one({
        "site_id": site_id,
        "email": "mercato@test.be"
    })
    
    if existing:
        print(f"Admin mercato@test.be already exists")
        return
    
    password_hash = hashlib.sha256("test123".encode()).hexdigest()
    
    admin_doc = {
        "admin_id": "sadmin_mercato_mercato",
        "site_id": site_id,
        "email": "mercato@test.be",
        "name": "Mercato Admin",
        "password_hash": password_hash,
        "is_active": True,
        "permissions": {
            "menu_items": True,
            "menu_prices": True,
            "opening_hours": True,
            "closure_notice": True,
            "gallery": True,
            "contact_info": False,
            "group_menus": True
        },
        "created_at": now,
        "last_login": None
    }
    
    await db.site_admins.insert_one(admin_doc)
    print(f"Created admin: mercato@test.be for Ristorante Mercato")

async def main():
    print("=== Seeding Ristorante Mercato ===")
    print("Bron: https://github.com/tranquille2004/Mercato")
    print()
    await seed_mercato()
    print("\nCreating site admin...")
    await create_mercato_admin()
    print("\n=== Klaar! ===")
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
