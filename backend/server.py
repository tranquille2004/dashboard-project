from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Multi-Tenant Website Platform")

# Create routers
api_router = APIRouter(prefix="/api")
auth_router = APIRouter(prefix="/api/auth")
admin_router = APIRouter(prefix="/api/admin")
public_router = APIRouter(prefix="/api/public")

# ============== MODELS ==============

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserSession(BaseModel):
    model_config = ConfigDict(extra="ignore")
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    session_token: str
    expires_at: datetime
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Site(BaseModel):
    model_config = ConfigDict(extra="ignore")
    site_id: str = Field(default_factory=lambda: f"site_{uuid.uuid4().hex[:12]}")
    name: str
    slug: str  # e.g., "cantina", "bottega"
    domains: List[str] = []  # e.g., ["lacantinaitaliana.net", "www.lacantinaitaliana.net"]
    site_type: str = "restaurant"  # restaurant, business, etc.
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SiteConfig(BaseModel):
    model_config = ConfigDict(extra="ignore")
    config_id: str = Field(default_factory=lambda: f"config_{uuid.uuid4().hex[:12]}")
    site_id: str
    # Branding
    logo_url: Optional[str] = None
    primary_color: str = "#7D3C32"
    secondary_color: str = "#D4A574"
    # Contact info
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    website: Optional[str] = None
    btw_number: Optional[str] = None
    # Social
    facebook_url: Optional[str] = None
    instagram_url: Optional[str] = None
    # Opening hours
    opening_hours: Dict[str, Any] = {}
    closure_notice: Optional[str] = None
    # Features
    has_reservations: bool = True
    has_takeaway: bool = False
    reservation_form_url: Optional[str] = None
    takeaway_form_url: Optional[str] = None
    # SEO
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    # Translations
    translations: Dict[str, Dict[str, str]] = {}
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class MenuItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    item_id: str = Field(default_factory=lambda: f"item_{uuid.uuid4().hex[:12]}")
    site_id: str
    category: str
    name_nl: str
    name_fr: Optional[str] = None
    name_en: Optional[str] = None
    description_nl: Optional[str] = None
    description_fr: Optional[str] = None
    description_en: Optional[str] = None
    price: float
    is_available: bool = True
    sort_order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class GroupMenu(BaseModel):
    model_config = ConfigDict(extra="ignore")
    menu_id: str = Field(default_factory=lambda: f"gmenu_{uuid.uuid4().hex[:12]}")
    site_id: str
    name: str
    price: float
    includes_wine: bool = False
    items: List[Dict[str, Any]] = []
    sort_order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class GalleryImage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    image_id: str = Field(default_factory=lambda: f"img_{uuid.uuid4().hex[:12]}")
    site_id: str
    url: str
    alt_text: Optional[str] = None
    category: str = "gallery"  # gallery, food, interior, etc.
    sort_order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SiteAdmin(BaseModel):
    """Site-level admin (restaurant owner)"""
    model_config = ConfigDict(extra="ignore")
    admin_id: str = Field(default_factory=lambda: f"sadmin_{uuid.uuid4().hex[:12]}")
    site_id: str
    email: str
    name: str
    password_hash: str = ""  # For email/password login
    is_active: bool = True
    # Permissions - what this admin can edit
    permissions: Dict[str, bool] = Field(default_factory=lambda: {
        "menu_items": True,
        "menu_prices": True,
        "opening_hours": True,
        "closure_notice": True,
        "gallery": True,
        "contact_info": False,  # Usually don't want clients changing address/phone
        "group_menus": True
    })
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    last_login: Optional[datetime] = None

class SiteAdminCreate(BaseModel):
    email: str
    name: str
    password: str

# ============== AUTH HELPERS ==============

async def get_current_user(request: Request) -> User:
    """Get current user from session token in cookie or header"""
    session_token = request.cookies.get("session_token")
    
    if not session_token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            session_token = auth_header.split(" ")[1]
    
    if not session_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    session_doc = await db.user_sessions.find_one(
        {"session_token": session_token},
        {"_id": 0}
    )
    
    if not session_doc:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    expires_at = session_doc["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")
    
    user_doc = await db.users.find_one(
        {"user_id": session_doc["user_id"]},
        {"_id": 0}
    )
    
    if not user_doc:
        raise HTTPException(status_code=401, detail="User not found")
    
    return User(**user_doc)

# ============== AUTH ROUTES ==============

@auth_router.post("/session")
async def exchange_session(request: Request, response: Response):
    """Exchange session_id for session_token"""
    body = await request.json()
    session_id = body.get("session_id")
    
    if not session_id:
        raise HTTPException(status_code=400, detail="session_id required")
    
    # Call Emergent Auth to get user data
    async with httpx.AsyncClient() as client_http:
        auth_response = await client_http.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers={"X-Session-ID": session_id}
        )
    
    if auth_response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session_id")
    
    auth_data = auth_response.json()
    email = auth_data.get("email")
    name = auth_data.get("name")
    picture = auth_data.get("picture")
    session_token = auth_data.get("session_token")
    
    # Find or create user
    existing_user = await db.users.find_one({"email": email}, {"_id": 0})
    
    if existing_user:
        user_id = existing_user["user_id"]
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {"name": name, "picture": picture}}
        )
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        new_user = {
            "user_id": user_id,
            "email": email,
            "name": name,
            "picture": picture,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(new_user)
    
    # Create session
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    session_doc = {
        "session_id": str(uuid.uuid4()),
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": expires_at.isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.user_sessions.insert_one(session_doc)
    
    # Set cookie
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
        max_age=7 * 24 * 60 * 60
    )
    
    user_doc = await db.users.find_one({"user_id": user_id}, {"_id": 0})
    return user_doc

@auth_router.get("/me")
async def get_me(user: User = Depends(get_current_user)):
    """Get current authenticated user"""
    return user.model_dump()

@auth_router.post("/logout")
async def logout(request: Request, response: Response):
    """Logout user"""
    session_token = request.cookies.get("session_token")
    if session_token:
        await db.user_sessions.delete_one({"session_token": session_token})
    
    response.delete_cookie(key="session_token", path="/")
    return {"message": "Logged out"}

# ============== ADMIN ROUTES ==============

@admin_router.get("/sites")
async def get_sites(user: User = Depends(get_current_user)):
    """Get all sites for admin"""
    sites = await db.sites.find({}, {"_id": 0}).to_list(100)
    return sites

@admin_router.post("/sites")
async def create_site(request: Request, user: User = Depends(get_current_user)):
    """Create a new site"""
    body = await request.json()
    site = Site(**body)
    site_dict = site.model_dump()
    site_dict["created_at"] = site_dict["created_at"].isoformat()
    site_dict["updated_at"] = site_dict["updated_at"].isoformat()
    await db.sites.insert_one(site_dict)
    
    # Create default config
    config = SiteConfig(site_id=site.site_id)
    config_dict = config.model_dump()
    config_dict["updated_at"] = config_dict["updated_at"].isoformat()
    await db.site_configs.insert_one(config_dict)
    
    return site_dict

@admin_router.get("/sites/{site_id}")
async def get_site(site_id: str, user: User = Depends(get_current_user)):
    """Get a specific site"""
    site = await db.sites.find_one({"site_id": site_id}, {"_id": 0})
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    return site

@admin_router.put("/sites/{site_id}")
async def update_site(site_id: str, request: Request, user: User = Depends(get_current_user)):
    """Update a site"""
    body = await request.json()
    body["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.sites.update_one({"site_id": site_id}, {"$set": body})
    site = await db.sites.find_one({"site_id": site_id}, {"_id": 0})
    return site

@admin_router.delete("/sites/{site_id}")
async def delete_site(site_id: str, user: User = Depends(get_current_user)):
    """Delete a site and all related data"""
    await db.sites.delete_one({"site_id": site_id})
    await db.site_configs.delete_many({"site_id": site_id})
    await db.menu_items.delete_many({"site_id": site_id})
    await db.group_menus.delete_many({"site_id": site_id})
    await db.gallery_images.delete_many({"site_id": site_id})
    return {"message": "Site deleted"}

# Site Config
@admin_router.get("/sites/{site_id}/config")
async def get_site_config(site_id: str, user: User = Depends(get_current_user)):
    """Get site configuration"""
    config = await db.site_configs.find_one({"site_id": site_id}, {"_id": 0})
    if not config:
        # Create default config
        config = SiteConfig(site_id=site_id)
        config_dict = config.model_dump()
        config_dict["updated_at"] = config_dict["updated_at"].isoformat()
        await db.site_configs.insert_one(config_dict)
        return config_dict
    return config

@admin_router.put("/sites/{site_id}/config")
async def update_site_config(site_id: str, request: Request, user: User = Depends(get_current_user)):
    """Update site configuration"""
    body = await request.json()
    body["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.site_configs.update_one({"site_id": site_id}, {"$set": body}, upsert=True)
    config = await db.site_configs.find_one({"site_id": site_id}, {"_id": 0})
    return config

# Menu Items
@admin_router.get("/sites/{site_id}/menu")
async def get_menu_items(site_id: str, user: User = Depends(get_current_user)):
    """Get all menu items for a site"""
    items = await db.menu_items.find({"site_id": site_id}, {"_id": 0}).sort("sort_order", 1).to_list(500)
    return items

@admin_router.post("/sites/{site_id}/menu")
async def create_menu_item(site_id: str, request: Request, user: User = Depends(get_current_user)):
    """Create a menu item"""
    body = await request.json()
    body["site_id"] = site_id
    item = MenuItem(**body)
    item_dict = item.model_dump()
    item_dict["created_at"] = item_dict["created_at"].isoformat()
    await db.menu_items.insert_one(item_dict)
    return item_dict

@admin_router.put("/sites/{site_id}/menu/{item_id}")
async def update_menu_item(site_id: str, item_id: str, request: Request, user: User = Depends(get_current_user)):
    """Update a menu item"""
    body = await request.json()
    await db.menu_items.update_one({"item_id": item_id, "site_id": site_id}, {"$set": body})
    item = await db.menu_items.find_one({"item_id": item_id}, {"_id": 0})
    return item

@admin_router.delete("/sites/{site_id}/menu/{item_id}")
async def delete_menu_item(site_id: str, item_id: str, user: User = Depends(get_current_user)):
    """Delete a menu item"""
    await db.menu_items.delete_one({"item_id": item_id, "site_id": site_id})
    return {"message": "Item deleted"}

# Group Menus
@admin_router.get("/sites/{site_id}/group-menus")
async def get_group_menus(site_id: str, user: User = Depends(get_current_user)):
    """Get all group menus for a site"""
    menus = await db.group_menus.find({"site_id": site_id}, {"_id": 0}).sort("sort_order", 1).to_list(50)
    return menus

@admin_router.post("/sites/{site_id}/group-menus")
async def create_group_menu(site_id: str, request: Request, user: User = Depends(get_current_user)):
    """Create a group menu"""
    body = await request.json()
    body["site_id"] = site_id
    menu = GroupMenu(**body)
    menu_dict = menu.model_dump()
    menu_dict["created_at"] = menu_dict["created_at"].isoformat()
    await db.group_menus.insert_one(menu_dict)
    return menu_dict

@admin_router.put("/sites/{site_id}/group-menus/{menu_id}")
async def update_group_menu(site_id: str, menu_id: str, request: Request, user: User = Depends(get_current_user)):
    """Update a group menu"""
    body = await request.json()
    await db.group_menus.update_one({"menu_id": menu_id, "site_id": site_id}, {"$set": body})
    menu = await db.group_menus.find_one({"menu_id": menu_id}, {"_id": 0})
    return menu

@admin_router.delete("/sites/{site_id}/group-menus/{menu_id}")
async def delete_group_menu(site_id: str, menu_id: str, user: User = Depends(get_current_user)):
    """Delete a group menu"""
    await db.group_menus.delete_one({"menu_id": menu_id, "site_id": site_id})
    return {"message": "Menu deleted"}

# Gallery Images
@admin_router.get("/sites/{site_id}/gallery")
async def get_gallery_images(site_id: str, user: User = Depends(get_current_user)):
    """Get all gallery images for a site"""
    images = await db.gallery_images.find({"site_id": site_id}, {"_id": 0}).sort("sort_order", 1).to_list(200)
    return images

@admin_router.post("/sites/{site_id}/gallery")
async def create_gallery_image(site_id: str, request: Request, user: User = Depends(get_current_user)):
    """Create a gallery image"""
    body = await request.json()
    body["site_id"] = site_id
    image = GalleryImage(**body)
    image_dict = image.model_dump()
    image_dict["created_at"] = image_dict["created_at"].isoformat()
    await db.gallery_images.insert_one(image_dict)
    return image_dict

@admin_router.delete("/sites/{site_id}/gallery/{image_id}")
async def delete_gallery_image(site_id: str, image_id: str, user: User = Depends(get_current_user)):
    """Delete a gallery image"""
    await db.gallery_images.delete_one({"image_id": image_id, "site_id": site_id})
    return {"message": "Image deleted"}

# Site Admins Management (for super admin)
@admin_router.get("/sites/{site_id}/admins")
async def get_site_admins(site_id: str, user: User = Depends(get_current_user)):
    """Get all admins for a site"""
    admins = await db.site_admins.find({"site_id": site_id}, {"_id": 0, "password_hash": 0}).to_list(50)
    return admins

@admin_router.post("/sites/{site_id}/admins")
async def create_site_admin(site_id: str, request: Request, user: User = Depends(get_current_user)):
    """Create a new site admin (restaurant owner)"""
    import hashlib
    body = await request.json()
    
    # Check if email already exists for this site
    existing = await db.site_admins.find_one({"site_id": site_id, "email": body["email"]})
    if existing:
        raise HTTPException(status_code=400, detail="Admin with this email already exists")
    
    # Hash password
    password_hash = hashlib.sha256(body["password"].encode()).hexdigest()
    
    admin = SiteAdmin(
        site_id=site_id,
        email=body["email"],
        name=body["name"],
        password_hash=password_hash,
        permissions=body.get("permissions", {
            "menu_items": True,
            "menu_prices": True,
            "opening_hours": True,
            "closure_notice": True,
            "gallery": True,
            "contact_info": False,
            "group_menus": True
        })
    )
    admin_dict = admin.model_dump()
    admin_dict["created_at"] = admin_dict["created_at"].isoformat()
    await db.site_admins.insert_one(admin_dict)
    
    # Remove password_hash from response
    del admin_dict["password_hash"]
    return admin_dict

@admin_router.put("/sites/{site_id}/admins/{admin_id}")
async def update_site_admin(site_id: str, admin_id: str, request: Request, user: User = Depends(get_current_user)):
    """Update a site admin's permissions"""
    body = await request.json()
    
    # Don't allow changing password through this endpoint
    if "password_hash" in body:
        del body["password_hash"]
    if "password" in body:
        del body["password"]
    
    await db.site_admins.update_one(
        {"admin_id": admin_id, "site_id": site_id},
        {"$set": body}
    )
    admin = await db.site_admins.find_one({"admin_id": admin_id}, {"_id": 0, "password_hash": 0})
    return admin

@admin_router.delete("/sites/{site_id}/admins/{admin_id}")
async def delete_site_admin(site_id: str, admin_id: str, user: User = Depends(get_current_user)):
    """Delete a site admin"""
    await db.site_admins.delete_one({"admin_id": admin_id, "site_id": site_id})
    return {"message": "Admin deleted"}

# ============== SITE ADMIN AUTH & ROUTES ==============

site_admin_router = APIRouter(prefix="/api/site-admin")

async def get_current_site_admin(request: Request) -> dict:
    """Get current site admin from session token"""
    session_token = request.cookies.get("site_admin_token")
    
    if not session_token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            session_token = auth_header.split(" ")[1]
    
    if not session_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    session = await db.site_admin_sessions.find_one({"session_token": session_token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")
    
    admin = await db.site_admins.find_one({"admin_id": session["admin_id"]}, {"_id": 0, "password_hash": 0})
    if not admin:
        raise HTTPException(status_code=401, detail="Admin not found")
    
    return admin

@site_admin_router.post("/login")
async def site_admin_login(request: Request, response: Response):
    """Login for site admins (restaurant owners)"""
    import hashlib
    body = await request.json()
    email = body.get("email")
    password = body.get("password")
    
    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password required")
    
    password_hash = hashlib.sha256(password.encode()).hexdigest()
    
    admin = await db.site_admins.find_one(
        {"email": email, "password_hash": password_hash, "is_active": True},
        {"_id": 0}
    )
    
    if not admin:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create session
    session_token = str(uuid.uuid4())
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    
    await db.site_admin_sessions.insert_one({
        "session_token": session_token,
        "admin_id": admin["admin_id"],
        "site_id": admin["site_id"],
        "expires_at": expires_at.isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    
    # Update last login
    await db.site_admins.update_one(
        {"admin_id": admin["admin_id"]},
        {"$set": {"last_login": datetime.now(timezone.utc).isoformat()}}
    )
    
    # Set cookie
    response.set_cookie(
        key="site_admin_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
        max_age=7 * 24 * 60 * 60
    )
    
    # Get site info
    site = await db.sites.find_one({"site_id": admin["site_id"]}, {"_id": 0})
    
    return {
        "admin": {k: v for k, v in admin.items() if k != "password_hash"},
        "site": site
    }

@site_admin_router.get("/me")
async def get_site_admin_me(admin: dict = Depends(get_current_site_admin)):
    """Get current site admin info"""
    site = await db.sites.find_one({"site_id": admin["site_id"]}, {"_id": 0})
    return {"admin": admin, "site": site}

@site_admin_router.post("/logout")
async def site_admin_logout(request: Request, response: Response):
    """Logout site admin"""
    session_token = request.cookies.get("site_admin_token")
    if session_token:
        await db.site_admin_sessions.delete_one({"session_token": session_token})
    response.delete_cookie(key="site_admin_token", path="/")
    return {"message": "Logged out"}

# Site admin data access (respects permissions)
@site_admin_router.get("/config")
async def get_own_site_config(admin: dict = Depends(get_current_site_admin)):
    """Get own site configuration"""
    config = await db.site_configs.find_one({"site_id": admin["site_id"]}, {"_id": 0})
    return config

@site_admin_router.put("/config")
async def update_own_site_config(request: Request, admin: dict = Depends(get_current_site_admin)):
    """Update own site configuration (respects permissions)"""
    body = await request.json()
    permissions = admin.get("permissions", {})
    
    # Filter updates based on permissions
    allowed_updates = {}
    
    if permissions.get("opening_hours") and "opening_hours" in body:
        allowed_updates["opening_hours"] = body["opening_hours"]
    if permissions.get("closure_notice") and "closure_notice" in body:
        allowed_updates["closure_notice"] = body["closure_notice"]
    if permissions.get("contact_info"):
        for field in ["phone", "email", "address"]:
            if field in body:
                allowed_updates[field] = body[field]
    
    if not allowed_updates:
        raise HTTPException(status_code=403, detail="No permission to update these fields")
    
    allowed_updates["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.site_configs.update_one({"site_id": admin["site_id"]}, {"$set": allowed_updates})
    
    config = await db.site_configs.find_one({"site_id": admin["site_id"]}, {"_id": 0})
    return config

@site_admin_router.get("/menu")
async def get_own_menu(admin: dict = Depends(get_current_site_admin)):
    """Get own menu items"""
    items = await db.menu_items.find({"site_id": admin["site_id"]}, {"_id": 0}).sort("sort_order", 1).to_list(500)
    return items

@site_admin_router.post("/menu")
async def create_own_menu_item(request: Request, admin: dict = Depends(get_current_site_admin)):
    """Create menu item (if permitted)"""
    if not admin.get("permissions", {}).get("menu_items"):
        raise HTTPException(status_code=403, detail="No permission to add menu items")
    
    body = await request.json()
    body["site_id"] = admin["site_id"]
    item = MenuItem(**body)
    item_dict = item.model_dump()
    item_dict["created_at"] = item_dict["created_at"].isoformat()
    await db.menu_items.insert_one(item_dict)
    return item_dict

@site_admin_router.put("/menu/{item_id}")
async def update_own_menu_item(item_id: str, request: Request, admin: dict = Depends(get_current_site_admin)):
    """Update own menu item (respects permissions)"""
    permissions = admin.get("permissions", {})
    body = await request.json()
    
    # Check item belongs to this site
    item = await db.menu_items.find_one({"item_id": item_id, "site_id": admin["site_id"]})
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Filter updates based on permissions
    allowed_updates = {}
    
    if permissions.get("menu_items"):
        for field in ["name_nl", "name_fr", "name_en", "description_nl", "description_fr", "description_en", "category", "is_available", "sort_order"]:
            if field in body:
                allowed_updates[field] = body[field]
    
    if permissions.get("menu_prices") and "price" in body:
        allowed_updates["price"] = body["price"]
    
    if not allowed_updates:
        raise HTTPException(status_code=403, detail="No permission to update these fields")
    
    await db.menu_items.update_one({"item_id": item_id}, {"$set": allowed_updates})
    updated = await db.menu_items.find_one({"item_id": item_id}, {"_id": 0})
    return updated

@site_admin_router.delete("/menu/{item_id}")
async def delete_own_menu_item(item_id: str, admin: dict = Depends(get_current_site_admin)):
    """Delete own menu item (if permitted)"""
    if not admin.get("permissions", {}).get("menu_items"):
        raise HTTPException(status_code=403, detail="No permission to delete menu items")
    
    result = await db.menu_items.delete_one({"item_id": item_id, "site_id": admin["site_id"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted"}

@site_admin_router.get("/gallery")
async def get_own_gallery(admin: dict = Depends(get_current_site_admin)):
    """Get own gallery images"""
    images = await db.gallery_images.find({"site_id": admin["site_id"]}, {"_id": 0}).sort("sort_order", 1).to_list(200)
    return images

@site_admin_router.post("/gallery")
async def add_own_gallery_image(request: Request, admin: dict = Depends(get_current_site_admin)):
    """Add gallery image (if permitted)"""
    if not admin.get("permissions", {}).get("gallery"):
        raise HTTPException(status_code=403, detail="No permission to add images")
    
    body = await request.json()
    body["site_id"] = admin["site_id"]
    image = GalleryImage(**body)
    image_dict = image.model_dump()
    image_dict["created_at"] = image_dict["created_at"].isoformat()
    await db.gallery_images.insert_one(image_dict)
    return image_dict

@site_admin_router.delete("/gallery/{image_id}")
async def delete_own_gallery_image(image_id: str, admin: dict = Depends(get_current_site_admin)):
    """Delete own gallery image (if permitted)"""
    if not admin.get("permissions", {}).get("gallery"):
        raise HTTPException(status_code=403, detail="No permission to delete images")
    
    result = await db.gallery_images.delete_one({"image_id": image_id, "site_id": admin["site_id"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Image not found")
    return {"message": "Image deleted"}

# ============== PUBLIC ROUTES ==============

@public_router.get("/site-by-domain")
async def get_site_by_domain(domain: str):
    """Get site data by domain - used for domain detection"""
    # Clean domain
    domain = domain.lower().replace("www.", "")
    
    site = await db.sites.find_one(
        {"domains": {"$elemMatch": {"$regex": f"^(www\\.)?{domain}$", "$options": "i"}}},
        {"_id": 0}
    )
    
    if not site:
        return None
    
    config = await db.site_configs.find_one({"site_id": site["site_id"]}, {"_id": 0})
    menu_items = await db.menu_items.find({"site_id": site["site_id"]}, {"_id": 0}).sort("sort_order", 1).to_list(500)
    group_menus = await db.group_menus.find({"site_id": site["site_id"]}, {"_id": 0}).sort("sort_order", 1).to_list(50)
    gallery = await db.gallery_images.find({"site_id": site["site_id"]}, {"_id": 0}).sort("sort_order", 1).to_list(200)
    
    return {
        "site": site,
        "config": config,
        "menu_items": menu_items,
        "group_menus": group_menus,
        "gallery": gallery
    }

@public_router.get("/site/{slug}")
async def get_site_by_slug(slug: str):
    """Get site data by slug - used for preview/development"""
    site = await db.sites.find_one({"slug": slug}, {"_id": 0})
    
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    
    config = await db.site_configs.find_one({"site_id": site["site_id"]}, {"_id": 0})
    menu_items = await db.menu_items.find({"site_id": site["site_id"]}, {"_id": 0}).sort("sort_order", 1).to_list(500)
    group_menus = await db.group_menus.find({"site_id": site["site_id"]}, {"_id": 0}).sort("sort_order", 1).to_list(50)
    gallery = await db.gallery_images.find({"site_id": site["site_id"]}, {"_id": 0}).sort("sort_order", 1).to_list(200)
    
    return {
        "site": site,
        "config": config,
        "menu_items": menu_items,
        "group_menus": group_menus,
        "gallery": gallery
    }

@public_router.get("/sites")
async def get_all_public_sites():
    """Get all active sites (for site selector)"""
    sites = await db.sites.find({"is_active": True}, {"_id": 0, "site_id": 1, "name": 1, "slug": 1, "site_type": 1}).to_list(100)
    return sites

# ============== ROOT ==============

@api_router.get("/")
async def root():
    return {"message": "Multi-Tenant Website Platform API"}

@api_router.get("/health")
async def health():
    return {"status": "healthy"}

# Include routers
app.include_router(api_router)
app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(public_router)
app.include_router(site_admin_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
