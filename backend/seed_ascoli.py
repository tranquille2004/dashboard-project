#!/usr/bin/env python3
"""
Seed script for L'Ascoli restaurant data
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

# L'Ascoli menu items
ASCOLI_MENU_ITEMS = [
    # Koude voorgerechten / Entrées froides
    {"category": "Koude voorgerechten", "name_nl": "Burrata van buffel met tomaten en basilicum in olijfolie", "name_fr": "Burrata de bufflonne, tomates, basilic assaisonné à l'huile d'olives", "name_en": "Buffalo burrata cheese, tomatoes, basil and olive oil", "price": 22.00, "sort_order": 1},
    {"category": "Koude voorgerechten", "name_nl": "Rundercarpaccio gemarineerd in olijfolie en citroen, met parmezaanschilfers", "name_fr": "Carpaccio de boeuf mariné à l'huile d'olives et citron, copeau de parmesan", "name_en": "Beef carpaccio marinated with olive oil and lemon, shaved parmesan cheese", "price": 21.50, "sort_order": 2},
    {"category": "Koude voorgerechten", "name_nl": "Bresaola gemarineerd in olijfolie en citroen, met parmezaanschilfers", "name_fr": "Bresaola à l'huile d'olives et citron, copeaux de parmesan", "name_en": "Bresaola with olive oil and lemon, shaved parmesan cheese", "price": 24.50, "sort_order": 3},
    {"category": "Koude voorgerechten", "name_nl": "Salade van inktvis", "name_fr": "Salade de poulpe", "name_en": "Octopus salad", "price": 24.50, "sort_order": 4},
    {"category": "Koude voorgerechten", "name_nl": "Parmaham met meloen", "name_fr": "Jambon de Parme au melon", "name_en": "Parmaham with melon", "price": 23.50, "sort_order": 5},
    {"category": "Koude voorgerechten", "name_nl": "Gegratineerde aubergines op grootmoeders wijze", "name_fr": "Aubergines gratinées de la nonna", "name_en": "Grandmothers eggplant", "price": 21.50, "sort_order": 6},
    {"category": "Koude voorgerechten", "name_nl": "Vitello tonnato; Kalfslapje, crème van tonijn, ansjovis, mayonnaise, kappertjes", "name_fr": "Vitello tonnato, braisé de veau, sauce au thon, mayonnaise et câpres", "name_en": "Vitello tonnato: braised veal, tuna sauce, mayonnaise and capers", "price": 24.50, "sort_order": 7},
    {"category": "Koude voorgerechten", "name_nl": "Bordje antipasti", "name_fr": "Assiette de antipasti", "name_en": "Antipasto Platter", "price": 23.50, "sort_order": 8},
    {"category": "Koude voorgerechten", "name_nl": "Verse gemarineerde zalm", "name_fr": "Saumon frais mariné", "name_en": "Fresh marinated salmon", "price": 24.50, "sort_order": 9},
    
    # Soepen / Soupes
    {"category": "Soepen", "name_nl": "Minestrone, soep van verse groenten uit de tuin", "name_fr": "Minestrone, potage de légumes frais du jardin", "name_en": "Minestrone, soup of vegetables, fresh from the garden", "price": 12.50, "sort_order": 10},
    {"category": "Soepen", "name_nl": "Tomatenroomsoep met zachte look en basilicum", "name_fr": "Crème de tomates parfumée au basilic et ail doux", "name_en": "Cream of tomato with sweet garlic and basil", "price": 12.50, "sort_order": 11},
    {"category": "Soepen", "name_nl": "Heldere soep van eend, tortellini geparfumeerd met verse munt en limoen", "name_fr": "Consommé de canard aux tortellini, parfumé à la menthe et citron vert", "name_en": "Soup with tortellini stuffed with duck, perfumed with mint and lime", "price": 14.50, "sort_order": 12},
    
    # Huisgemaakte pasta / Pâtes faites maison
    {"category": "Huisgemaakte pasta", "name_nl": "Spaghetti met verse kerstomaten, look en basilicum", "name_fr": "Spaghetti à la tomate fraîche, ail, basilic", "name_en": "Spaghetti with fresh tomatoes, garlic and basil", "price": 17.50, "sort_order": 13},
    {"category": "Huisgemaakte pasta", "name_nl": "Spaghetti met look, olie en pepertjes", "name_fr": "Spaghetti à l'ail, huile et poivres", "name_en": "Spaghetti with garlic, olive oil and pepper", "price": 17.50, "sort_order": 14},
    {"category": "Huisgemaakte pasta", "name_nl": "Spaghetti met schelpdieren", "name_fr": "Spaghetti alle vongole veraci", "name_en": "Spaghetti with shellfish", "price": 24.50, "sort_order": 15},
    {"category": "Huisgemaakte pasta", "name_nl": "Linguini met scampi, courgette en pijnboompitten", "name_fr": "Linguini aux scampi, courgettes et pignons de pin", "name_en": "Linguini with scampi, zucchini and pine nuts", "price": 24.50, "sort_order": 16},
    {"category": "Huisgemaakte pasta", "name_nl": "Tagliolini met pesto van zwarte truffel, boter en parmezaanschilfers", "name_fr": "Tagliolini à la crème de truffes noires, beurre et copeaux de Parmesan", "name_en": "Tagliolini with black truffle cream, butter and shaved parmesan cheese", "price": 28.50, "sort_order": 17},
    {"category": "Huisgemaakte pasta", "name_nl": "Bucatini all'amatriciana", "name_fr": "Bucatini all'amatriciana", "name_en": "Bucatini all'amatriciana", "price": 19.50, "sort_order": 18},
    {"category": "Huisgemaakte pasta", "name_nl": "Ravioli met rivierkreeftjes en champignons", "name_fr": "Ravioli aux écrevisses et champignons", "name_en": "Ravioli with crayfish and mushrooms", "price": 23.50, "sort_order": 19},
    {"category": "Huisgemaakte pasta", "name_nl": "Ravioli met ricotta en verse tomaat", "name_fr": "Ravioli à la ricotta et tomates fraîches", "name_en": "Ravioli with ricotta cheese and tomatoes", "price": 19.50, "sort_order": 20},
    {"category": "Huisgemaakte pasta", "name_nl": "Carameles gevuld met osso buco, crème van parmezaan en salie", "name_fr": "Carameles farcis à l'osso buco, crème de parmesan et sauge", "name_en": "Carameles stuffed with osso buco, parmesan crème and sage", "price": 23.50, "sort_order": 21},
    {"category": "Huisgemaakte pasta", "name_nl": "Tagliolini met citroen van de Amalfi, gember en schaafsels van parmezaan", "name_fr": "Tagliolini au citron d'Amalfi, gingembre et copeaux de parmesan", "name_en": "Tagliolini with zucchini, lemon from Amalfi, shaved parmesan cheese and ginger", "price": 21.50, "sort_order": 22},
    {"category": "Huisgemaakte pasta", "name_nl": "Kwartet van verse huisgemaakte pasta", "name_fr": "Quatre pâtes fraîches de la maison", "name_en": "Four housemade pastas", "price": 23.50, "sort_order": 23},
    
    # Visgerechten / Poissons
    {"category": "Visgerechten", "name_nl": "Gegrilde inkvis met italiaanse kruiden, zachte look en salade", "name_fr": "Seiches grillées aux arômes italiens, parfumées à l'ail doux, salade", "name_en": "Grilled octopus with italian herbs, perfumed with soft garlic, salad", "price": 26.50, "sort_order": 24},
    {"category": "Visgerechten", "name_nl": "Gefrituurde calamares met tartaarsaus", "name_fr": "Calamars frais frits, sauce tartare", "name_en": "Fresh fried calamari, tartar sauce", "price": 25.50, "sort_order": 25},
    {"category": "Visgerechten", "name_nl": "Filet van wilde zeebaars met rozemarijn, salie, olijfolie en citroen", "name_fr": "Filet de bar sauvage au romarin, sauge, huile d'olive et citron", "name_en": "Wild bass fillet with rosemary, sage, olive oil and lemon", "price": 34.50, "sort_order": 26},
    {"category": "Visgerechten", "name_nl": "Rode tonijnfilet met italiaanse kruiden, verse tomatenblokjes, basilicum, oregano", "name_fr": "Filet de thon rouge macéré aux arômes italiens, dés de tomates fraîches, basilic, origan", "name_en": "Red tuna fillet macerated with italian herbs, cubes of fresh tomatoes, basil, oregano", "price": 33.50, "sort_order": 27},
    {"category": "Visgerechten", "name_nl": "Filet van zeebrasem aqua pazza", "name_fr": "Filet de Daurade aqua pazza", "name_en": "Sea bass fillet aqua pazza", "price": 32.50, "sort_order": 28},
    
    # Vleesgerechten / Viandes
    {"category": "Vleesgerechten", "name_nl": "Mechelse koekoek met Amalfi citroen en seizoensgroenten", "name_fr": "Poitrine de coucou de Malines au citron d'Amalfi et ses légumes de saison", "name_en": "Breast of chicken from Mechelen with lemon from Amalfi and seasonal vegetables", "price": 25.50, "sort_order": 29},
    {"category": "Vleesgerechten", "name_nl": "Kalkoenskotelet op Milaneese wijze en seizoensgroenten", "name_fr": "Escalope de dinde à la Milanèse et légumes de saison", "name_en": "Turkey cutlet Milanese with seasonal vegetables", "price": 24.50, "sort_order": 30},
    {"category": "Vleesgerechten", "name_nl": "Kalfslever met gestoofde ajuin op Venetiaanse wijze", "name_fr": "Foie de veau aux oignons fondants à la mode de Venise", "name_en": "Veal liver with fondant onions at Venice style", "price": 27.50, "sort_order": 31},
    {"category": "Vleesgerechten", "name_nl": "Saltimbocca alla Romana, kalfsmédaillon, Parmaham, scamorza en salie", "name_fr": "Saltimbocca alla Romana, petite médaillon de veau, jambon de Parme, scamorza, sauge", "name_en": "Saltimbocca alla Romana, small veal medallion, Parmaham, scamorza, sage, Marsala sauce", "price": 28.50, "sort_order": 32},
    {"category": "Vleesgerechten", "name_nl": "Iberische filet pur met koninklijke boleten", "name_fr": "Filet pur d'Iberico aux bolets royals", "name_en": "Iberian pure tenderloin with royal mushrooms", "price": 32.50, "sort_order": 33},
    {"category": "Vleesgerechten", "name_nl": "Kalfsniertjes trifolati met oesterzwammen", "name_fr": "Rognons de veau trifolati aux pleurotes", "name_en": "Veal kidneys trifolati with oyster mushrooms", "price": 23.50, "sort_order": 34},
    {"category": "Vleesgerechten", "name_nl": "Tagliata, Runderlapje op een bedje van raketsla en balsamieksaus", "name_fr": "Tagliata, Emincé de boeuf sur lit de roquette, sauce balsamique et copeaux de Parmesan", "name_en": "Tagliata, slices of beef on a bed of arugula salad, balsamic sauce and shaved parmesan cheese", "price": 32.50, "sort_order": 35},
    {"category": "Vleesgerechten", "name_nl": "Gegrilde Filet pur met groenten", "name_fr": "Filet pur grillé aux légumes", "name_en": "Grilled pure tenderloin with vegetables", "price": 36.50, "sort_order": 36},
]

# L'Ascoli group menus
ASCOLI_GROUP_MENUS = [
    {
        "name": "Menu Torino",
        "price": 47.50,
        "includes_wine": True,
        "sort_order": 1,
        "items": [
            {"course": "Aperitivo", "options": ["Italiaans antipasti buffet", "Vitello Tonnato", "Penne met aubergines, mozzarella en tomaat"]},
            {"course": "Hoofdgerecht", "options": ["Emincé van kalkoen met citroen en italiaanse kruiden", "Escalope van zalm met spumante saus", "Rode poonfilet op Libournaise wijze"]},
            {"course": "Dessert", "options": ["Italiaanse pâtisserie"]},
            {"course": "Inclusief", "options": ["Eén fles rode of witte wijn per 3 personen", "Koffie/thee en cantuccini"]}
        ]
    },
    {
        "name": "Menu Puglia",
        "price": 52.50,
        "includes_wine": True,
        "sort_order": 2,
        "items": [
            {"course": "Aperitivo", "options": ["Burrata op een bedje van biologische tomaat", "Salade van verse zeevruchten", "Ravioli gevuld met rivierkreeftjes"]},
            {"course": "Hoofdgerecht", "options": ["Tagliata: emincé van Ierse contre-filet", "Magret van eend met Marsala saus", "Filet van brasem aqua pazza"]},
            {"course": "Dessert", "options": ["Profiteroles met warme chocolade", "Affogato: vanille ijs met kersen en amaretto"]},
            {"course": "Inclusief", "options": ["Eén fles rode of witte wijn per 3 personen", "Koffie/thee en cantuccini"]}
        ]
    },
    {
        "name": "Menu Amalfi",
        "price": 57.50,
        "includes_wine": True,
        "sort_order": 3,
        "items": [
            {"course": "Aperitivo", "options": ["Risotto met paddenstoelen", "Paccheri met baarsfilet en kerstomaatjes", "Integrale tagliatelle met pancetta"]},
            {"course": "Hoofdgerecht", "options": ["Ballotine van konijn gevuld met ganzenlever", "Noisette van lam met thijm en citroen", "Baarsfilet de ligne met rozemarijn"]},
            {"course": "Dessert", "options": ["Ricotta taart met citroen", "Mix van sorbet ijs"]},
            {"course": "Inclusief", "options": ["Eén fles rode of witte wijn per 3 personen", "Koffie/thee en cantuccini"]}
        ]
    },
    {
        "name": "Menu Ascoli",
        "price": 67.50,
        "includes_wine": True,
        "sort_order": 4,
        "items": [
            {"course": "Aperitivo", "options": ["Slaatje van ganzenlever", "Gefrituurde scampi met tartaarsaus", "Tartaar van verse zalm en sint jakobs"]},
            {"course": "Hoofdgerecht", "options": ["Kabeljauwfilet livornese", "Saltimbocca alla Romana", "Filet van varken op wijze van Maremma"]},
            {"course": "Dessert", "options": ["Fruitsalade", "Panna cotta"]},
            {"course": "Inclusief", "options": ["Eén fles rode of witte wijn per 3 personen", "Koffie/thee en cantuccini"]}
        ]
    }
]

# L'Ascoli gallery images
ASCOLI_GALLERY_IMAGES = [
    "https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5788_1_orig.jpg",
    "https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5857.jpg",
    "https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5879.jpg",
    "https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5889.jpg",
    "https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-6046_1_orig.jpg",
    "https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5497_1_orig.jpg",
    "https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/333497-362660580479961-522768784-o.jpg",
    "https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/45280374-1885058464947804-146153777123033088-o_2_orig.jpg",
    "https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/20689781-1380875678699421-9174551204022883676-o_1.jpg",
    "https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5714_1_orig.jpg",
    "https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5746_1_orig.jpg",
    "https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5801_1_orig.jpg",
]

async def seed_ascoli_data():
    site_id = "site_ascoli001"
    now = datetime.now(timezone.utc).isoformat()
    
    # 1. Delete existing menu items, group menus and gallery for Ascoli
    print("Deleting existing Ascoli data...")
    await db.menu_items.delete_many({"site_id": site_id})
    await db.group_menus.delete_many({"site_id": site_id})
    await db.gallery_images.delete_many({"site_id": site_id})
    
    # 2. Insert menu items
    print(f"Inserting {len(ASCOLI_MENU_ITEMS)} menu items...")
    menu_docs = []
    for i, item in enumerate(ASCOLI_MENU_ITEMS):
        menu_docs.append({
            "item_id": f"item_ascoli_{i:03d}",
            "site_id": site_id,
            "category": item["category"],
            "name_nl": item["name_nl"],
            "name_fr": item.get("name_fr"),
            "name_en": item.get("name_en"),
            "description_nl": item.get("description_nl"),
            "description_fr": item.get("description_fr"),
            "description_en": item.get("description_en"),
            "price": item["price"],
            "is_available": True,
            "sort_order": item["sort_order"],
            "created_at": now
        })
    await db.menu_items.insert_many(menu_docs)
    print(f"Inserted {len(menu_docs)} menu items")
    
    # 3. Insert group menus
    print(f"Inserting {len(ASCOLI_GROUP_MENUS)} group menus...")
    group_docs = []
    for i, menu in enumerate(ASCOLI_GROUP_MENUS):
        group_docs.append({
            "menu_id": f"gmenu_ascoli_{i:03d}",
            "site_id": site_id,
            "name": menu["name"],
            "price": menu["price"],
            "includes_wine": menu["includes_wine"],
            "items": menu["items"],
            "sort_order": menu["sort_order"],
            "created_at": now
        })
    await db.group_menus.insert_many(group_docs)
    print(f"Inserted {len(group_docs)} group menus")
    
    # 4. Insert gallery images
    print(f"Inserting {len(ASCOLI_GALLERY_IMAGES)} gallery images...")
    gallery_docs = []
    for i, url in enumerate(ASCOLI_GALLERY_IMAGES):
        gallery_docs.append({
            "image_id": f"img_ascoli_{i:03d}",
            "site_id": site_id,
            "url": url,
            "alt_text": f"L'Ascoli foto {i+1}",
            "category": "gallery",
            "sort_order": i,
            "created_at": now
        })
    await db.gallery_images.insert_many(gallery_docs)
    print(f"Inserted {len(gallery_docs)} gallery images")
    
    # 5. Update site config with complete info
    print("Updating site config...")
    await db.site_configs.update_one(
        {"site_id": site_id},
        {"$set": {
            "logo_url": "https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/ascoli.jpg",
            "primary_color": "#6b1f1f",
            "secondary_color": "#D4A574",
            "address": "Hector Henneaulaan 136, 1930 Zaventem",
            "phone": "+32 2 725 45 45",
            "email": "info@ascolizaventem.com",
            "facebook_url": "https://www.facebook.com/ascolizaventem",
            "has_reservations": True,
            "has_takeaway": True,
            "opening_hours": {
                "ma_vr_midi": "12:00 - 14:00",
                "ma_za_soir": "18:30 - 22:30",
                "zo": "Gesloten / Fermé"
            },
            "closure_notice": "Voor het einde van het jaar zijn wij gesloten op: 24 december tot en met 1 januari 2026. Open weer vanaf 2 januari 2026.",
            "meta_title": "L'Ascoli - Italiaans restaurant in Zaventem",
            "meta_description": "Authentiek Italiaans restaurant in Zaventem met verse pasta, groepmenus en Toscaanse tuin. Sinds 2015 serveert Antonio Di Siervi verfijnde Italiaanse gerechten.",
            "updated_at": now
        }}
    )
    print("Site config updated")
    
    print("\n=== L'Ascoli data seeding complete! ===")

async def create_site_admins():
    """Create site admin accounts for all restaurants"""
    now = datetime.now(timezone.utc).isoformat()
    
    admins_to_create = [
        {
            "site_id": "site_ascoli001",
            "email": "ascoli@test.be",
            "name": "L'Ascoli Admin",
            "password": "test123"
        },
        {
            "site_id": "site_cantina001",
            "email": "cantina@test.be",
            "name": "La Cantina Admin",
            "password": "test123"
        }
    ]
    
    for admin_data in admins_to_create:
        # Check if admin already exists
        existing = await db.site_admins.find_one({
            "site_id": admin_data["site_id"],
            "email": admin_data["email"]
        })
        
        if existing:
            print(f"Admin {admin_data['email']} already exists for site {admin_data['site_id']}")
            continue
        
        password_hash = hashlib.sha256(admin_data["password"].encode()).hexdigest()
        
        admin_doc = {
            "admin_id": f"sadmin_{admin_data['site_id'].split('_')[1]}_{admin_data['email'].split('@')[0]}",
            "site_id": admin_data["site_id"],
            "email": admin_data["email"],
            "name": admin_data["name"],
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
        print(f"Created admin: {admin_data['email']} for {admin_data['site_id']}")

async def main():
    print("Starting L'Ascoli data seed...")
    await seed_ascoli_data()
    print("\nCreating site admins...")
    await create_site_admins()
    print("\n=== All done! ===")
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
