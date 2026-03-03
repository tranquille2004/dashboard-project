#!/usr/bin/env python3
"""
Seed script for Tracemaster Rastreadores
Source: https://www.tracemaster-rastreadores.com/
Note: This is a product/service website, not a restaurant
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

# Tracemaster products
TRACEMASTER_PRODUCTS = [
    {
        "product_id": "prod_tm_001",
        "name": "Tracemaster 100 PRO",
        "description_es": "Sistema de seguimiento GPS sin suscripción. Se entrega completamente listo para usar y puede usarse sin costos adicionales.",
        "description_en": "GPS tracking system without subscription. Delivered completely ready to use with no additional costs.",
        "price": 199.00,
        "original_price": 259.00,
        "currency": "USD",
        "in_stock": True,
        "features": [
            "Sin costos adicionales - No plan!",
            "SIM incorporada funciona en todo el mundo",
            "Precisión de ubicación hasta 5 metros",
            "Adecuado para autos, camiones, caravanas, barcos",
            "Duración de batería hasta 100 días",
            "Potente imán",
            "Red 4G/LTE",
            "Eliminación de interferencias",
            "Aplicación gratuita en castellano",
            "2 años de garantía"
        ],
        "specifications": {
            "red": "IOT/4G-LTE",
            "precision_gps": "Hasta 5 metros",
            "tamaño": "10,8 cm x 6,1 cm x 3 cm",
            "peso": "291 gramos",
            "bateria": "Hasta 100 días",
            "resistencia": "IP65 (a prueba de salpicaduras)",
            "garantia": "2 años"
        },
        "images": [
            "https://customer-assets.emergentagent.com/job_trace-jotform/artifacts/j4ekq9pu_toepassingen-gps-trackers-auto-vk-300x300-1%20%281%29.JPG",
            "https://customer-assets.emergentagent.com/job_trace-jotform/artifacts/v5f5qps1_tracemaster-1-1.JPG",
            "https://tracemaster-rastreadores.weebly.com/uploads/1/0/1/5/101515486/100pro-uitleg-600x600.webp",
            "https://tracemaster-rastreadores.weebly.com/uploads/1/0/1/5/101515486/app-web-1-600x600.webp"
        ],
        "sort_order": 1
    },
    {
        "product_id": "prod_tm_002",
        "name": "Adaptador Incorporado para Vehículo",
        "description_es": "Adaptador fijo opcional para los sistemas de seguimiento Tracemaster con conexión Micro USB. Ya no es necesario cargar el sistema de seguimiento por separado.",
        "description_en": "Optional fixed adapter for Tracemaster tracking systems with Micro USB connection. No longer necessary to charge the tracking system separately.",
        "price": 25.00,
        "original_price": None,
        "currency": "USD",
        "in_stock": True,
        "features": [
            "Adaptador/cargador fijo DC 12V-24V → 5V 3A",
            "Adecuado para Tracemaster 100 PRO",
            "Ya no es necesario carga manual",
            "Rastreador GPS siempre en standby"
        ],
        "specifications": {
            "conexion": "Micro USB",
            "entrada": "DC 12V-24V",
            "salida": "5V 3A"
        },
        "images": [
            "https://tracemaster-rastreadores.weebly.com/uploads/1/0/1/5/101515486/chargeur1_orig.jpg",
            "https://tracemaster-rastreadores.weebly.com/uploads/1/0/1/5/101515486/editor/vooraanzicht-vaste-adapter-300x300.webp",
            "https://tracemaster-rastreadores.weebly.com/uploads/1/0/1/5/101515486/chargeur2_orig.jpg",
            "https://tracemaster-rastreadores.weebly.com/uploads/1/0/1/5/101515486/chargeur3_orig.jpg"
        ],
        "sort_order": 2
    }
]

# Tracemaster gallery/feature images
TRACEMASTER_GALLERY = [
    "https://customer-assets.emergentagent.com/job_trace-jotform/artifacts/bqt0d2jg_gps.JPG",
    "https://customer-assets.emergentagent.com/job_trace-jotform/artifacts/v5f5qps1_tracemaster-1-1.JPG",
    "https://tracemaster-rastreadores.weebly.com/uploads/1/0/1/5/101515486/100pro-uitleg-600x600.webp",
    "https://tracemaster-rastreadores.weebly.com/uploads/1/0/1/5/101515486/app-web-1-600x600.webp",
]

async def seed_tracemaster():
    """Seed Tracemaster data"""
    now = datetime.now(timezone.utc).isoformat()
    
    # 1. Create site
    site_id = "site_tracemaster001"
    
    existing_site = await db.sites.find_one({"site_id": site_id})
    if existing_site:
        print(f"Site {site_id} already exists, updating...")
        await db.sites.update_one(
            {"site_id": site_id},
            {"$set": {
                "name": "Tracemaster Rastreadores",
                "slug": "tracemaster",
                "domains": ["tracemaster-rastreadores.com", "www.tracemaster-rastreadores.com"],
                "site_type": "product",  # Different type!
                "is_active": True,
                "updated_at": now
            }}
        )
    else:
        print("Creating new site: Tracemaster Rastreadores")
        await db.sites.insert_one({
            "site_id": site_id,
            "name": "Tracemaster Rastreadores",
            "slug": "tracemaster",
            "domains": ["tracemaster-rastreadores.com", "www.tracemaster-rastreadores.com"],
            "site_type": "product",
            "is_active": True,
            "created_at": now,
            "updated_at": now
        })
    
    # 2. Create/Update site config
    print("Updating site config...")
    config_data = {
        "config_id": "config_tracemaster001",
        "site_id": site_id,
        "logo_url": None,  # Text logo used
        "primary_color": "#1a73e8",  # Blue
        "secondary_color": "#ffffff",
        "address": "Santo Domingo, Ecuador",
        "phone": "+593 98 901 3622",
        "email": None,
        "whatsapp": "+593989013622",
        "company_name": "fworksbuilders",
        "ruc": "1759884990001",
        "facebook_url": None,
        "instagram_url": None,
        "youtube_url": "https://www.youtube.com/watch?v=OaQeIIpSmBA",
        "has_reservations": False,
        "has_takeaway": False,
        "has_products": True,
        "has_contact_form": True,
        "hero_title_es": "Rastreador GPS Sin Suscripción",
        "hero_subtitle_es": "Con tarjeta SIM incorporada para todo tipo de vehículos. Producto importado de Países Bajos, calidad holandesa.",
        "hero_title_en": "GPS Tracker Without Subscription",
        "hero_subtitle_en": "With built-in SIM card for all types of vehicles. Product imported from the Netherlands, Dutch quality.",
        "meta_title": "TRACEMASTER - Rastreador GPS sin suscripción Ecuador",
        "meta_description": "Tracemaster Ecuador - Rastreador GPS sin suscripción con tarjeta SIM incorporada para todo tipo de vehículos. Sin costos adicionales, calidad holandesa. $199 IVA incluido.",
        "language": "es",  # Spanish as primary
        "supported_languages": ["es", "en"],
        "updated_at": now
    }
    
    await db.site_configs.update_one(
        {"site_id": site_id},
        {"$set": config_data},
        upsert=True
    )
    
    # 3. Clear and insert products (using products collection instead of menu_items)
    print("Inserting products...")
    await db.products.delete_many({"site_id": site_id})
    
    product_docs = []
    for product in TRACEMASTER_PRODUCTS:
        product_docs.append({
            **product,
            "site_id": site_id,
            "created_at": now
        })
    
    if product_docs:
        await db.products.insert_many(product_docs)
        print(f"Inserted {len(product_docs)} products")
    
    # 4. Clear and insert gallery images
    print("Inserting gallery images...")
    await db.gallery_images.delete_many({"site_id": site_id})
    
    gallery_docs = []
    for i, url in enumerate(TRACEMASTER_GALLERY):
        gallery_docs.append({
            "image_id": f"img_tracemaster_{i:03d}",
            "site_id": site_id,
            "url": url,
            "alt_text": f"Tracemaster GPS Tracker {i+1}",
            "category": "gallery",
            "sort_order": i,
            "created_at": now
        })
    
    if gallery_docs:
        await db.gallery_images.insert_many(gallery_docs)
        print(f"Inserted {len(gallery_docs)} gallery images")
    
    print("\n=== Tracemaster Rastreadores data seeding complete! ===")

async def create_tracemaster_admin():
    """Create site admin for Tracemaster"""
    now = datetime.now(timezone.utc).isoformat()
    site_id = "site_tracemaster001"
    
    existing = await db.site_admins.find_one({
        "site_id": site_id,
        "email": "tracemaster@test.be"
    })
    
    if existing:
        print(f"Admin tracemaster@test.be already exists")
        return
    
    password_hash = hashlib.sha256("test123".encode()).hexdigest()
    
    admin_doc = {
        "admin_id": "sadmin_tracemaster_admin",
        "site_id": site_id,
        "email": "tracemaster@test.be",
        "name": "Tracemaster Admin",
        "password_hash": password_hash,
        "is_active": True,
        "permissions": {
            "products": True,
            "prices": True,
            "gallery": True,
            "contact_info": True,
            "hero_content": True
        },
        "created_at": now,
        "last_login": None
    }
    
    await db.site_admins.insert_one(admin_doc)
    print(f"Created admin: tracemaster@test.be for Tracemaster")

async def main():
    print("=== Seeding Tracemaster Rastreadores ===")
    print("Bron: https://www.tracemaster-rastreadores.com/")
    print()
    await seed_tracemaster()
    print("\nCreating site admin...")
    await create_tracemaster_admin()
    print("\n=== Klaar! ===")
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
