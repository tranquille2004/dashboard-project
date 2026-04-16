from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends, File, UploadFile
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import httpx
import asyncio
import resend
import requests
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from contextlib import asynccontextmanager

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY', '')

# Emergent Object Storage configuration
STORAGE_URL = "https://integrations.emergentagent.com/objstore/api/v1/storage"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY", "")
APP_NAME = "fworks-sites"
storage_key = None

def init_storage():
    """Initialize storage and get session key"""
    global storage_key
    if storage_key:
        return storage_key
    if not EMERGENT_KEY:
        logging.warning("EMERGENT_LLM_KEY not set - storage disabled")
        return None
    try:
        resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
        resp.raise_for_status()
        storage_key = resp.json()["storage_key"]
        logging.info("Emergent Object Storage initialized successfully")
        return storage_key
    except Exception as e:
        logging.error(f"Storage init failed: {e}")
        return None

def put_object(path: str, data: bytes, content_type: str) -> dict:
    """Upload file to object storage"""
    key = init_storage()
    if not key:
        raise Exception("Storage not initialized")
    resp = requests.put(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key, "Content-Type": content_type},
        data=data, timeout=120
    )
    resp.raise_for_status()
    return resp.json()

def get_object(path: str) -> tuple:
    """Download file from object storage"""
    key = init_storage()
    if not key:
        raise Exception("Storage not initialized")
    resp = requests.get(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key}, timeout=60
    )
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")

MIME_TYPES = {
    "jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png",
    "gif": "image/gif", "webp": "image/webp", "pdf": "application/pdf",
    "mp4": "video/mp4", "webm": "video/webm", "mov": "video/quicktime"
}

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Background scheduler
scheduler = AsyncIOScheduler()

# Alert Email Configuration
ALERT_EMAIL_RECIPIENT = "tranquille2004@gmail.com"

# ============== EMAIL ALERT HELPER ==============

async def send_alert_email(site_name: str, alert_type: str, message: str, domain: str = ""):
    """Send an email alert to the configured recipient"""
    try:
        if not resend.api_key:
            logging.warning("Resend API key not configured - skipping email alert")
            return False
        
        # Determine subject based on alert type
        if alert_type == "health":
            subject = f"🚨 ALERT - {site_name} - Site DOWN"
            alert_color = "#dc3545"  # red
            alert_icon = "🔴"
        elif alert_type == "reservation":
            subject = f"⚠️ ALERT - {site_name} - Geen Reservaties"
            alert_color = "#9b59b6"  # purple
            alert_icon = "🟣"
        else:
            subject = f"⚠️ ALERT - {site_name}"
            alert_color = "#f39c12"  # orange
            alert_icon = "🟠"
        
        # Build email HTML
        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: {alert_color}; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">{alert_icon} SITE ALERT {alert_icon}</h1>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border: 1px solid #ddd; border-top: 0; border-radius: 0 0 8px 8px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Restaurant:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 18px;">{site_name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Alert Type:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">{alert_type.upper()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Domain:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">{domain}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Details:</td>
                        <td style="padding: 10px 0;">{message}</td>
                    </tr>
                </table>
                <div style="margin-top: 20px; padding: 15px; background: #fff; border-left: 4px solid {alert_color}; border-radius: 4px;">
                    <p style="margin: 0; color: #666; font-size: 14px;">
                        <strong>Tijd:</strong> {datetime.now(timezone.utc).strftime('%d-%m-%Y %H:%M:%S')} UTC
                    </p>
                </div>
            </div>
            <div style="text-align: center; padding: 15px; color: #888; font-size: 12px;">
                <p>Dit bericht is automatisch verzonden door het fworksbuilders monitoring systeem.</p>
            </div>
        </div>
        """
        
        params = {
            "from": "fworksbuilders Alert <onboarding@resend.dev>",
            "to": [ALERT_EMAIL_RECIPIENT],
            "subject": subject,
            "html": html_content
        }
        
        email_result = await asyncio.to_thread(resend.Emails.send, params)
        logging.info(f"Alert email sent to {ALERT_EMAIL_RECIPIENT}: {email_result}")
        return True
        
    except Exception as e:
        logging.error(f"Failed to send alert email: {str(e)}")
        return False

# ============== BACKGROUND MONITORING TASKS ==============

async def background_health_check():
    """Background task to check all sites health every 5 minutes"""
    logging.info("Running background health check...")
    try:
        sites = await db.sites.find({}).to_list(1000)
        
        for site in sites:
            slug = site.get("slug", "")
            domains = site.get("domains", [])
            site_name = site.get("name", slug)
            
            if domains:
                check_url = f"https://{domains[0]}"
            else:
                check_url = f"{os.environ.get('REACT_APP_BACKEND_URL', 'https://image-restore-21.preview.emergentagent.com')}/site/{slug}"
            
            try:
                async with httpx.AsyncClient(timeout=15.0, verify=False) as client_http:
                    response = await client_http.get(check_url, follow_redirects=True)
                    
                    if response.status_code >= 400:
                        # Site is down - create alert if not exists
                        existing_alert = await db.site_alerts.find_one({
                            "site_id": slug,
                            "alert_type": "health",
                            "is_active": True
                        })
                        if not existing_alert:
                            alert_msg = f"Site returned status {response.status_code}"
                            alert_domain = domains[0] if domains else slug
                            alert = SiteAlert(
                                site_id=slug,
                                site_name=site_name,
                                domain=alert_domain,
                                status="down",
                                message=alert_msg,
                                alert_type="health"
                            )
                            await db.site_alerts.insert_one(alert.model_dump())
                            logging.warning(f"ALERT: Site {site_name} is DOWN (status {response.status_code})")
                            # Send email alert
                            await send_alert_email(site_name, "health", alert_msg, alert_domain)
                    else:
                        # Site is up - resolve any active health alerts
                        active_alert = await db.site_alerts.find_one({
                            "site_id": slug,
                            "alert_type": "health",
                            "is_active": True
                        })
                        if active_alert:
                            started = active_alert["started_at"]
                            if isinstance(started, str):
                                started = datetime.fromisoformat(started.replace("Z", "+00:00"))
                            duration = int((datetime.now(timezone.utc) - started).total_seconds() / 60)
                            await db.site_alerts.update_one(
                                {"alert_id": active_alert["alert_id"]},
                                {"$set": {
                                    "is_active": False,
                                    "resolved_at": datetime.now(timezone.utc).isoformat(),
                                    "duration_minutes": duration
                                }}
                            )
                            logging.info(f"RESOLVED: Site {site_name} is back UP after {duration} minutes")
                            
            except Exception as e:
                # Connection error - site is unreachable
                existing_alert = await db.site_alerts.find_one({
                    "site_id": slug,
                    "alert_type": "health",
                    "is_active": True
                })
                if not existing_alert:
                    alert_msg = f"Connection failed: {str(e)[:100]}"
                    alert_domain = domains[0] if domains else slug
                    alert = SiteAlert(
                        site_id=slug,
                        site_name=site_name,
                        domain=alert_domain,
                        status="down",
                        message=alert_msg,
                        alert_type="health"
                    )
                    await db.site_alerts.insert_one(alert.model_dump())
                    logging.warning(f"ALERT: Site {site_name} is UNREACHABLE - {str(e)[:50]}")
                    # Send email alert
                    await send_alert_email(site_name, "health", alert_msg, alert_domain)
                    
    except Exception as e:
        logging.error(f"Background health check failed: {e}")

async def check_visitor_activity():
    """Check if any site has had no visitors for 2+ hours"""
    logging.info("Checking visitor activity...")
    try:
        sites = await db.sites.find({}).to_list(1000)
        two_hours_ago = datetime.now(timezone.utc) - timedelta(hours=2)
        
        for site in sites:
            slug = site.get("slug", "")
            site_name = site.get("name", slug)
            domains = site.get("domains", [])
            
            # Count visitors in last 2 hours
            recent_visits = await db.site_visits.count_documents({
                "site_slug": slug,
                "timestamp": {"$gte": two_hours_ago.isoformat()}
            })
            
            if recent_visits == 0:
                # Check if alert already exists
                existing_alert = await db.site_alerts.find_one({
                    "site_id": slug,
                    "alert_type": "traffic",
                    "is_active": True
                })
                
                if not existing_alert:
                    # Get last visit time
                    last_visit = await db.site_visits.find_one(
                        {"site_slug": slug},
                        sort=[("timestamp", -1)]
                    )
                    
                    if last_visit:
                        last_time = last_visit.get("timestamp", "onbekend")
                        message = f"Geen bezoekers sinds {last_time}"
                    else:
                        message = "Nog nooit bezoekers geregistreerd"
                    
                    alert = SiteAlert(
                        site_id=slug,
                        site_name=site_name,
                        domain=domains[0] if domains else slug,
                        status="no_visitors",
                        message=message,
                        alert_type="traffic"
                    )
                    await db.site_alerts.insert_one(alert.model_dump())
                    logging.warning(f"TRAFFIC ALERT: {site_name} has no visitors for 2+ hours")
            else:
                # Has visitors - resolve any active traffic alerts
                active_alert = await db.site_alerts.find_one({
                    "site_id": slug,
                    "alert_type": "traffic",
                    "is_active": True
                })
                if active_alert:
                    started = active_alert["started_at"]
                    if isinstance(started, str):
                        started = datetime.fromisoformat(started.replace("Z", "+00:00"))
                    duration = int((datetime.now(timezone.utc) - started).total_seconds() / 60)
                    await db.site_alerts.update_one(
                        {"alert_id": active_alert["alert_id"]},
                        {"$set": {
                            "is_active": False,
                            "resolved_at": datetime.now(timezone.utc).isoformat(),
                            "duration_minutes": duration
                        }}
                    )
                    logging.info(f"TRAFFIC RESOLVED: {site_name} has visitors again after {duration} minutes")
                    
    except Exception as e:
        logging.error(f"Visitor activity check failed: {e}")

async def check_reservation_activity():
    """Check if restaurant sites have received reservations in the last 2 hours (via confirmation page visits)"""
    logging.info("Checking reservation activity for restaurants...")
    try:
        restaurant_sites = ['cantina', 'bottega', 'ascoli', 'mercato']
        two_hours_ago = datetime.now(timezone.utc) - timedelta(hours=2)
        
        for slug in restaurant_sites:
            # Get site info
            site = await db.sites.find_one({"slug": slug})
            if not site:
                continue
                
            site_name = site.get("name", slug)
            domains = site.get("domains", [])
            
            # Count confirmation page visits in last 2 hours
            # These indicate successful reservations (both dine-in and takeaway)
            confirmation_visits = await db.site_visits.count_documents({
                "site_slug": slug,
                "timestamp": {"$gte": two_hours_ago.isoformat()},
                "$or": [
                    {"path": {"$regex": "confirmation", "$options": "i"}},
                    {"path": {"$regex": "grazie", "$options": "i"}},
                    {"path": {"$regex": "bedankt", "$options": "i"}}
                ]
            })
            
            if confirmation_visits == 0:
                # Check if alert already exists
                existing_alert = await db.site_alerts.find_one({
                    "site_id": slug,
                    "alert_type": "reservation",
                    "is_active": True
                })
                
                if not existing_alert:
                    # Get last reservation time
                    last_reservation = await db.site_visits.find_one(
                        {
                            "site_slug": slug,
                            "$or": [
                                {"path": {"$regex": "confirmation", "$options": "i"}},
                                {"path": {"$regex": "grazie", "$options": "i"}},
                                {"path": {"$regex": "bedankt", "$options": "i"}}
                            ]
                        },
                        sort=[("timestamp", -1)]
                    )
                    
                    if last_reservation:
                        last_time = last_reservation.get("timestamp", "onbekend")
                        # Format the timestamp nicely
                        try:
                            dt = datetime.fromisoformat(last_time.replace("Z", "+00:00"))
                            formatted_time = dt.strftime("%d-%m-%Y %H:%M")
                            alert_msg = f"Geen reservaties sinds {formatted_time}. Meer dan 2 uur geleden."
                        except:
                            alert_msg = f"Geen reservaties sinds {last_time}. Meer dan 2 uur geleden."
                    else:
                        alert_msg = "Nog geen reservaties geregistreerd (confirmation page niet bezocht)"
                    
                    alert_domain = domains[0] if domains else slug
                    alert = SiteAlert(
                        site_id=slug,
                        site_name=site_name,
                        domain=alert_domain,
                        status="no_reservations",
                        message=alert_msg,
                        alert_type="reservation"
                    )
                    await db.site_alerts.insert_one(alert.model_dump())
                    logging.warning(f"RESERVATION ALERT: {site_name} has no reservations for 2+ hours")
                    # Send email alert
                    await send_alert_email(site_name, "reservation", alert_msg, alert_domain)
            else:
                # Has reservations - resolve any active reservation alerts
                active_alert = await db.site_alerts.find_one({
                    "site_id": slug,
                    "alert_type": "reservation",
                    "is_active": True
                })
                if active_alert:
                    started = active_alert["started_at"]
                    if isinstance(started, str):
                        started = datetime.fromisoformat(started.replace("Z", "+00:00"))
                    duration = int((datetime.now(timezone.utc) - started).total_seconds() / 60)
                    await db.site_alerts.update_one(
                        {"alert_id": active_alert["alert_id"]},
                        {"$set": {
                            "is_active": False,
                            "resolved_at": datetime.now(timezone.utc).isoformat(),
                            "duration_minutes": duration
                        }}
                    )
                    logging.info(f"RESERVATION RESOLVED: {site_name} received reservations after {duration} minutes")
                    
    except Exception as e:
        logging.error(f"Reservation activity check failed: {e}")

# Lifespan context manager for startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    logging.info("Starting background monitoring scheduler...")
    scheduler.add_job(background_health_check, 'interval', minutes=5, id='health_check')
    scheduler.add_job(check_visitor_activity, 'interval', minutes=30, id='visitor_check')
    scheduler.add_job(check_reservation_activity, 'interval', minutes=15, id='reservation_check')
    scheduler.start()
    logging.info("Background scheduler started - Health: 5min, Visitors: 30min, Reservations: 15min")
    
    # Seed sites in background - don't block server startup
    asyncio.create_task(seed_sites_on_startup())
    
    yield
    
    logging.info("Shutting down background scheduler...")
    scheduler.shutdown()

# Create the main app with lifespan
app = FastAPI(title="Multi-Tenant Website Platform", lifespan=lifespan)

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
    # Special Announcement (shown on homepage and reservation pages)
    special_announcement: Optional[str] = None
    special_announcement_active: bool = False
    special_announcement_type: str = "info"  # info, warning, success
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

# Site Health Monitoring Models
class SiteAlert(BaseModel):
    model_config = ConfigDict(extra="ignore")
    alert_id: str = Field(default_factory=lambda: f"alert_{uuid.uuid4().hex[:12]}")
    site_id: str
    site_name: str
    domain: str
    status: str  # "down", "up", "slow", "no_visitors"
    message: str
    response_time_ms: Optional[int] = None
    started_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    resolved_at: Optional[datetime] = None
    duration_minutes: Optional[int] = None
    is_active: bool = True
    alert_type: str = "health"  # "health" or "traffic"

# Contact Form Email Models
class ContactFormRequest(BaseModel):
    site: str  # Which site the form is from (smeralda, fworks, etc.)
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    # Optional fields for reservation forms
    arrival: Optional[str] = None
    departure: Optional[str] = None
    apartment: Optional[str] = None
    persons: Optional[int] = None

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

# ============== CONTACT FORM EMAIL ==============

SITE_EMAIL_CONFIG = {
    'smeralda': {
        'to': 'villasmeralda1980@gmail.com',
        'subject_prefix': 'Villa Smeralda Reservation',
        'from_name': 'Villa Smeralda Website'
    },
    'fworks': {
        'to': 'fworks@mail.be',
        'subject_prefix': 'FWorks Builders Contact',
        'from_name': 'FWorks Builders Website'
    }
}

@public_router.post("/contact")
async def send_contact_form(form: ContactFormRequest):
    """Send contact form email via Resend"""
    config = SITE_EMAIL_CONFIG.get(form.site, SITE_EMAIL_CONFIG['fworks'])
    
    # Build email HTML
    html_content = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
            {config['subject_prefix']}
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">{form.name}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:{form.email}">{form.email}</a></td>
            </tr>
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">{form.phone or 'Not provided'}</td>
            </tr>
    """
    
    # Add reservation fields if present
    if form.arrival:
        html_content += f"""
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Arrival:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">{form.arrival}</td>
            </tr>
        """
    if form.departure:
        html_content += f"""
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Departure:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">{form.departure}</td>
            </tr>
        """
    if form.apartment:
        html_content += f"""
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Accommodation:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">{form.apartment}</td>
            </tr>
        """
    if form.persons:
        html_content += f"""
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Persons:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">{form.persons}</td>
            </tr>
        """
    
    html_content += f"""
            <tr>
                <td style="padding: 10px; font-weight: bold; vertical-align: top;">Message:</td>
                <td style="padding: 10px;">{form.message.replace(chr(10), '<br>')}</td>
            </tr>
        </table>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This message was sent from the {form.site} website contact form.
        </p>
    </div>
    """
    
    # Save to database as backup
    await db.contact_submissions.insert_one({
        "site": form.site,
        "name": form.name,
        "email": form.email,
        "phone": form.phone,
        "message": form.message,
        "arrival": form.arrival,
        "departure": form.departure,
        "apartment": form.apartment,
        "persons": form.persons,
        "submitted_at": datetime.now(timezone.utc).isoformat()
    })
    
    # Send email via Resend
    try:
        params = {
            "from": f"{config['from_name']} <onboarding@resend.dev>",
            "to": [config['to']],
            "subject": f"{config['subject_prefix']} - {form.name}",
            "html": html_content,
            "reply_to": form.email
        }
        
        email_result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent successfully: {email_result}")
        
        return {
            "success": True,
            "message": "Your message has been sent successfully!"
        }
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        # Still return success since we saved to DB
        return {
            "success": True,
            "message": "Your message has been received. We will contact you soon."
        }

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
    
    logger.info(f"Site admin login attempt for: {email}")
    
    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password required")
    
    password_hash = hashlib.sha256(password.encode()).hexdigest()
    logger.info(f"Password hash: {password_hash[:20]}...")
    
    admin = await db.site_admins.find_one(
        {"email": email, "password_hash": password_hash, "is_active": True},
        {"_id": 0}
    )
    
    logger.info(f"Admin found: {admin is not None}")
    
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
        for field in ["phone", "phone2", "email", "address"]:
            if field in body:
                allowed_updates[field] = body[field]
    
    # Prices - if has prices permission
    if permissions.get("prices") and "prices" in body:
        allowed_updates["prices"] = body["prices"]
    
    # Room prices - for hotels
    if permissions.get("prices") and "room_prices" in body:
        allowed_updates["room_prices"] = body["room_prices"]
    
    # Events - for hotels
    if permissions.get("prices") and "events" in body:
        allowed_updates["events"] = body["events"]
    
    # Restaurant hours - for hotels/restaurants
    if permissions.get("opening_hours") and "restaurant_hours" in body:
        allowed_updates["restaurant_hours"] = body["restaurant_hours"]
    
    # Special announcement - always allowed for site admins
    if "special_announcement" in body:
        allowed_updates["special_announcement"] = body["special_announcement"]
    if "special_announcement_active" in body:
        allowed_updates["special_announcement_active"] = body["special_announcement_active"]
    if "special_announcement_type" in body:
        allowed_updates["special_announcement_type"] = body["special_announcement_type"]
    
    if not allowed_updates:
        raise HTTPException(status_code=403, detail="No permission to update these fields")
    
    allowed_updates["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.site_configs.update_one({"site_id": admin["site_id"]}, {"$set": allowed_updates}, upsert=True)
    
    config = await db.site_configs.find_one({"site_id": admin["site_id"]}, {"_id": 0})
    return config

@site_admin_router.post("/upload")
async def upload_site_image(file: UploadFile = File(...), folder: str = "gallery", admin: dict = Depends(get_current_site_admin)):
    """Upload image directly to Object Storage - no deploy/migrate needed"""
    if not admin.get("permissions", {}).get("gallery"):
        raise HTTPException(status_code=403, detail="No permission to upload images")
    
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail=f"File type {file.content_type} not allowed")
    
    # Read file data (max 10MB)
    data = await file.read()
    if len(data) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large (max 10MB)")
    
    # Build storage path
    site_slug = admin["site_id"].replace("site_", "")
    ext = file.filename.rsplit(".", 1)[-1] if "." in file.filename else "jpg"
    import time
    filename = f"{int(time.time())}_{file.filename}"
    storage_path = f"images/{site_slug}/{folder}/{filename}"
    
    try:
        result = put_object(storage_path, data, file.content_type)
        # Store record in migrated_images so the image API can find it
        await db.migrated_images.update_one(
            {"original_path": f"/{storage_path}"},
            {"$set": {
                "original_path": f"/{storage_path}",
                "storage_path": storage_path,
                "content_type": file.content_type,
                "size": len(data),
                "migrated_at": datetime.now(timezone.utc).isoformat()
            }},
            upsert=True
        )
        return {
            "success": True,
            "path": f"/{storage_path}",
            "filename": filename,
            "size": len(data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@site_admin_router.delete("/upload")
async def delete_site_image(request: Request, admin: dict = Depends(get_current_site_admin)):
    """Delete image from Object Storage"""
    if not admin.get("permissions", {}).get("gallery"):
        raise HTTPException(status_code=403, detail="No permission to delete images")
    
    body = await request.json()
    path = body.get("path", "")
    if not path:
        raise HTTPException(status_code=400, detail="Path required")
    
    # Remove from migrated_images
    await db.migrated_images.delete_one({"original_path": path})
    return {"success": True, "deleted": path}

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
    products = await db.products.find({"site_id": site["site_id"]}, {"_id": 0}).sort("sort_order", 1).to_list(100)
    
    return {
        "site": site,
        "config": config,
        "menu_items": menu_items,
        "group_menus": group_menus,
        "gallery": gallery,
        "products": products
    }

@public_router.get("/sites")
async def get_all_public_sites():
    """Get all active sites (for site selector)"""
    sites = await db.sites.find({"is_active": True}, {"_id": 0, "site_id": 1, "name": 1, "slug": 1, "site_type": 1}).to_list(100)
    return sites

# ============== SEO ENDPOINTS ==============

# Site domain to slug mapping for SEO
DOMAIN_SLUG_MAP = {
    'fworksbuilders.com': 'fworks',
    'www.fworksbuilders.com': 'fworks',
    'theobeans-export.com': 'theobeans',
    'www.theobeans-export.com': 'theobeans',
    'tracemaster-rastreadores.com': 'tracemaster',
    'www.tracemaster-rastreadores.com': 'tracemaster',
    'labottegaherent.com': 'bottega',
    'www.labottegaherent.com': 'bottega',
    'lacantinaitaliana.net': 'cantina',
    'www.lacantinaitaliana.net': 'cantina',
    'ascolizaventem.com': 'ascoli',
    'www.ascolizaventem.com': 'ascoli',
    'ristorantemercato.be': 'mercato',
    'www.ristorantemercato.be': 'mercato',
    'smeraldavacanze.it': 'smeralda',
    'www.smeraldavacanze.it': 'smeralda',
    'hoteldelpacifico.net': 'hoteldelpacifico',
    'www.hoteldelpacifico.net': 'hoteldelpacifico',
    'hoteldelpacifico.com': 'hoteldelpacifico',
    'www.hoteldelpacifico.com': 'hoteldelpacifico',
}

# SEO data per site
SITE_SEO_DATA = {
    'fworks': {
        'domain': 'fworksbuilders.com',
        'name': 'F.Works Builders - Web Design & Development',
        'description': 'Professionele website ontwikkeling en webdesign. Wij bouwen moderne, snelle websites voor restaurants en bedrijven.',
        'keywords': 'webdesign, website maken, web development, fworksbuilders, België',
        'pages': ['/', '/#features', '/#portfolio', '/#pricing', '/#contact']
    },
    'theobeans': {
        'domain': 'theobeans-export.com',
        'name': 'Theo Beans Export - Premium Cacao uit Ecuador',
        'description': 'Premium cacao bonen rechtstreeks uit Ecuador. Duurzame teelt, uitstekende kwaliteit, directe handel.',
        'keywords': 'cacao, Ecuador, cacao bonen, premium cacao, export, chocolade',
        'pages': ['/', '/photos', '/objectif', '/varietes', '/qualite', '/tracabilite', '/contact']
    },
    'tracemaster': {
        'domain': 'tracemaster-rastreadores.com',
        'name': 'Tracemaster GPS Rastreadores - América Latina',
        'description': 'Rastreadores GPS profesionales para vehículos y activos en Latinoamérica. Seguimiento en tiempo real, geocercas, alarmas. Calidad holandesa, soporte local.',
        'keywords': 'rastreador GPS, GPS tracker, América Latina, Ecuador, Colombia, Perú, seguimiento vehicular, localizador GPS, rastreo satelital',
        'pages': ['/', '/productos', '/contacto']
    },
    'bottega': {
        'domain': 'labottegaherent.com',
        'name': 'La Bottega Italiana Herent',
        'description': 'Authentiek Italiaans restaurant in Herent. Verse pasta, pizza, en Italiaanse specialiteiten.',
        'keywords': 'Italiaans restaurant, Herent, pasta, pizza, La Bottega',
        'pages': ['/', '/over-ons', '/kaart', '/galerie', '/groepmenus', '/openingstijden', '/contact', '/reserveren', '/afhalen']
    },
    'cantina': {
        'domain': 'lacantinaitaliana.net',
        'name': 'La Cantina Italiana Tervuren',
        'description': 'Gezellig Italiaans restaurant in Tervuren. Authentieke Italiaanse keuken, pizza en pasta.',
        'keywords': 'Italiaans restaurant, Tervuren, La Cantina, pizza, pasta',
        'pages': ['/', '/about', '/kaart', '/groepmenus', '/reserveren', '/fotos', '/info']
    },
    'ascoli': {
        'domain': 'ascolizaventem.com',
        'name': "L'Ascoli Zaventem",
        'description': 'Italiaans restaurant in Zaventem. Traditionele Italiaanse gerechten in een gezellige sfeer.',
        'keywords': 'Italiaans restaurant, Zaventem, Ascoli, pasta, pizza',
        'pages': ['/', '/menu', '/reserveren', '/contact']
    },
    'mercato': {
        'domain': 'ristorantemercato.be',
        'name': 'Ristorante Mercato',
        'description': 'Italiaans restaurant met verse ingrediënten en traditionele recepten.',
        'keywords': 'Italiaans restaurant, Mercato, pasta, pizza',
        'pages': ['/', '/menu', '/reserveren', '/contact']
    },
    'smeralda': {
        'domain': 'smeraldavacanze.it',
        'name': 'Résidence Villa Smeralda - Sardinia',
        'description': 'Vakantieappartementen in Sardinië, Italië. Prachtige ligging nabij strand en natuur.',
        'keywords': 'vakantie Sardinië, appartement Sardinia, Villa Smeralda, Italië vakantie',
        'pages': ['/', '/apartments', '/gallery', '/prices', '/contact']
    },
    'hoteldelpacifico': {
        'domain': 'www.hoteldelpacifico.net',
        'name': 'Hotel del Pacífico - Santo Domingo, Ecuador',
        'description': 'Hotel del Pacífico: Su oasis de tranquilidad y elegancia en Santo Domingo de los Tsáchilas, Ecuador. 36 habitaciones confortables, restaurante La Orquídea, centro de negocios y sala de conferencias. Ideal para viajeros de negocios y turistas.',
        'keywords': 'hotel santo domingo ecuador, hotel del pacifico, alojamiento santo domingo, hotel negocios ecuador, hotel tsachilas, la orquidea restaurante, hotel 3 estrellas ecuador, hospedaje santo domingo',
        'pages': ['/', '/habitaciones', '/precios', '/fotos', '/restaurante', '/atractivos', '/contacto']
    }
}

@api_router.get("/robots.txt")
async def get_robots_txt(request: Request):
    """Dynamic robots.txt based on request host"""
    host = request.headers.get('host', '').lower().replace(':443', '').replace(':80', '')
    slug = DOMAIN_SLUG_MAP.get(host, 'fworks')
    seo_data = SITE_SEO_DATA.get(slug, SITE_SEO_DATA['fworks'])
    domain = seo_data['domain']
    
    robots_content = f"""User-agent: *
Allow: /

Sitemap: https://{domain}/sitemap.xml
"""
    return Response(content=robots_content, media_type="text/plain")

@api_router.get("/sitemap.xml")
async def get_sitemap_xml(request: Request):
    """Dynamic sitemap.xml based on request host"""
    host = request.headers.get('host', '').lower().replace(':443', '').replace(':80', '')
    slug = DOMAIN_SLUG_MAP.get(host, 'fworks')
    seo_data = SITE_SEO_DATA.get(slug, SITE_SEO_DATA['fworks'])
    domain = seo_data['domain']
    pages = seo_data['pages']
    
    today = datetime.now(timezone.utc).strftime('%Y-%m-%d')
    
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    for page in pages:
        priority = '1.0' if page == '/' else '0.8'
        sitemap += f'  <url>\n'
        sitemap += f'    <loc>https://{domain}{page}</loc>\n'
        sitemap += f'    <lastmod>{today}</lastmod>\n'
        sitemap += f'    <changefreq>weekly</changefreq>\n'
        sitemap += f'    <priority>{priority}</priority>\n'
        sitemap += f'  </url>\n'
    
    sitemap += '</urlset>'
    
    return Response(content=sitemap, media_type="application/xml")

# ============== ROOT ==============

@api_router.get("/")
async def root():
    return {"message": "Multi-Tenant Website Platform API"}

@api_router.get("/health")
async def health():
    return {"status": "healthy"}

# ============== TEST ALERT EMAIL ENDPOINT ==============

@api_router.post("/test-alert-email")
async def test_alert_email(request: Request):
    """Test the alert email functionality - protected with secret"""
    body = await request.json()
    secret = body.get("secret", "")
    alert_type = body.get("type", "health")  # health or reservation
    site_name = body.get("site_name", "Test Restaurant")
    
    if secret != "fworks-test-2024":
        raise HTTPException(status_code=403, detail="Invalid secret")
    
    message = f"Dit is een TEST alert voor {site_name}"
    domain = "test-domain.com"
    
    result = await send_alert_email(site_name, alert_type, message, domain)
    
    return {
        "success": result,
        "message": f"Test email {'verzonden' if result else 'mislukt'} naar {ALERT_EMAIL_RECIPIENT}",
        "alert_type": alert_type,
        "site_name": site_name
    }

# ============== IMAGE MIGRATION ENDPOINTS ==============

def get_images_folder():
    """Find the images folder - check multiple possible locations"""
    possible_paths = [
        ROOT_DIR.parent / "frontend" / "public" / "images",
        ROOT_DIR.parent / "frontend" / "build" / "images",
        Path("/app/frontend/public/images"),
        Path("/app/frontend/build/images"),
    ]
    for p in possible_paths:
        if p.exists():
            logging.info(f"Found images folder at: {p}")
            return p
    return None

@api_router.get("/admin/migrate/status")
async def get_migration_status():
    """Get the current status of image migration"""
    try:
        # Count migrated images
        migrated = await db.migrated_images.count_documents({})
        
        # Count local images - check multiple locations
        images_folder = get_images_folder()
        local_count = 0
        folder_path = "not found"
        
        if images_folder and images_folder.exists():
            folder_path = str(images_folder)
            for ext in ['jpg', 'jpeg', 'png', 'gif', 'webp']:
                local_count += len(list(images_folder.rglob(f"*.{ext}")))
        
        return {
            "migrated_count": migrated,
            "local_count": local_count,
            "storage_initialized": storage_key is not None,
            "images_folder": folder_path
        }
    except Exception as e:
        return {"error": str(e)}

@api_router.post("/admin/migrate/start")
async def start_image_migration(request: Request):
    """Start migrating all local images to Emergent Object Storage"""
    try:
        # Initialize storage
        key = init_storage()
        if not key:
            raise HTTPException(status_code=500, detail="Could not initialize storage. Check EMERGENT_LLM_KEY.")
        
        # Find images folder
        frontend_public = get_images_folder()
        if not frontend_public or not frontend_public.exists():
            raise HTTPException(status_code=404, detail="Images folder not found in any expected location")
        
        logging.info(f"Using images folder: {frontend_public}")
        
        results = {
            "success": 0,
            "failed": 0,
            "skipped": 0,
            "errors": [],
            "migrated_files": [],
            "images_folder": str(frontend_public)
        }
        
        # Find all images
        image_files = []
        for ext in ['jpg', 'jpeg', 'png', 'gif', 'webp']:
            image_files.extend(frontend_public.rglob(f"*.{ext}"))
        
        logging.info(f"Starting migration of {len(image_files)} images from {frontend_public}")
        
        for img_path in image_files:
            try:
                # Get relative path from images folder
                rel_path = img_path.relative_to(frontend_public)
                storage_path = f"{APP_NAME}/images/{rel_path}"
                
                # Check if already migrated
                existing = await db.migrated_images.find_one({"original_path": f"/images/{rel_path}"})
                if existing:
                    results["skipped"] += 1
                    continue
                
                # Read file
                with open(img_path, 'rb') as f:
                    data = f.read()
                
                # Determine content type
                ext = img_path.suffix.lower().replace('.', '')
                content_type = MIME_TYPES.get(ext, 'application/octet-stream')
                
                # Upload to storage
                upload_result = put_object(storage_path, data, content_type)
                
                # Save to database
                await db.migrated_images.insert_one({
                    "original_path": f"/images/{rel_path}",
                    "storage_path": upload_result["path"],
                    "content_type": content_type,
                    "size": upload_result.get("size", len(data)),
                    "migrated_at": datetime.now(timezone.utc).isoformat()
                })
                
                results["success"] += 1
                results["migrated_files"].append(str(rel_path))
                
                # Log progress every 50 files
                if results["success"] % 50 == 0:
                    logging.info(f"Migration progress: {results['success']} files uploaded")
                    
            except Exception as e:
                results["failed"] += 1
                results["errors"].append(f"{rel_path}: {str(e)}")
                logging.error(f"Failed to migrate {rel_path}: {e}")
        
        logging.info(f"Migration complete: {results['success']} success, {results['failed']} failed, {results['skipped']} skipped")
        
        return results
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Migration error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/admin/migrate/sync-from-storage")
async def sync_migration_records_from_storage():
    """
    Sync migrated_images records by checking what exists in Object Storage.
    This is useful when the local files don't exist but images are already in storage.
    """
    try:
        # Initialize storage
        key = init_storage()
        if not key:
            raise HTTPException(status_code=500, detail="Could not initialize storage. Check EMERGENT_LLM_KEY.")
        
        # List of all known image paths that were migrated
        # These are the paths we know exist in Object Storage
        known_paths = []
        
        # Get existing records count
        existing_count = await db.migrated_images.count_documents({})
        
        if existing_count >= 800:
            return {
                "message": "Records already synced",
                "existing_count": existing_count,
                "synced": 0
            }
        
        # Define all the image directories and their files
        # We'll verify each one exists in storage before adding
        image_prefixes = [
            "smeralda", "cantina", "bottega", "ascoli", "mercato",
            "theobeans", "tracemaster", "gallery", "about", "contact",
            "founder", "home", "logo", "menu"
        ]
        
        synced = 0
        errors = []
        
        # Try to list objects from storage (if supported) or use known paths
        # For now, we'll create records for common patterns
        test_paths = [
            # Smeralda images
            ("smeralda/bg-header.png", "image/png"),
            ("smeralda/bg-reserve.jpg", "image/jpeg"),
            ("smeralda/ciao-tutti.jpg", "image/jpeg"),
            ("smeralda/logo-smeralda.png", "image/png"),
            # Cantina images
            ("cantina/hero-background.jpg", "image/jpeg"),
            ("cantina/logo-cantina.jpg", "image/jpeg"),
            # Root images
            ("gallery1.jpg", "image/jpeg"),
            ("gallery2.jpg", "image/jpeg"),
            ("fworks-logo.png", "image/png"),
        ]
        
        for path, content_type in test_paths:
            storage_path = f"{APP_NAME}/images/{path}"
            original_path = f"/images/{path}"
            
            # Check if already exists
            existing = await db.migrated_images.find_one({"original_path": original_path})
            if existing:
                continue
            
            # Try to verify it exists in storage
            try:
                get_object(storage_path)
                # It exists! Add record
                await db.migrated_images.insert_one({
                    "original_path": original_path,
                    "storage_path": storage_path,
                    "content_type": content_type,
                    "migrated_at": datetime.now(timezone.utc).isoformat(),
                    "synced_from_storage": True
                })
                synced += 1
            except Exception as e:
                errors.append(f"{path}: {str(e)[:50]}")
        
        return {
            "message": "Sync complete",
            "synced": synced,
            "existing_count": existing_count,
            "errors": errors[:10] if errors else []
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Sync error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/admin/migrate/import-records")
async def import_migration_records(request: Request):
    """
    Import migrated_images records from JSON data.
    This allows syncing records from preview to production.
    """
    try:
        body = await request.json()
        records = body.get("records", [])
        
        if not records:
            raise HTTPException(status_code=400, detail="No records provided")
        
        imported = 0
        skipped = 0
        
        for record in records:
            original_path = record.get("original_path")
            if not original_path:
                continue
            
            # Check if already exists
            existing = await db.migrated_images.find_one({"original_path": original_path})
            if existing:
                skipped += 1
                continue
            
            # Insert the record
            await db.migrated_images.insert_one({
                "original_path": original_path,
                "storage_path": record.get("storage_path"),
                "content_type": record.get("content_type"),
                "size": record.get("size"),
                "migrated_at": record.get("migrated_at", datetime.now(timezone.utc).isoformat()),
                "imported": True
            })
            imported += 1
        
        return {
            "message": "Import complete",
            "imported": imported,
            "skipped": skipped,
            "total_provided": len(records)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Import error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/admin/migrate/export-records")
async def export_migration_records():
    """Export all migrated_images records as JSON for syncing to another environment."""
    try:
        records = await db.migrated_images.find({}, {"_id": 0}).to_list(2000)
        return {
            "count": len(records),
            "records": records
        }
    except Exception as e:
        logging.error(f"Export error: {e}")
        raise HTTPException(status_code=500, detail=str(e))



@api_router.get("/images/{path:path}")
async def serve_image(path: str):
    """Serve images from object storage or local fallback"""
    try:
        # First check if migrated to object storage
        record = await db.migrated_images.find_one({"original_path": f"/images/{path}"})
        
        if record and record.get("storage_path"):
            # Serve from object storage
            try:
                data, content_type = get_object(record["storage_path"])
                return Response(content=data, media_type=record.get("content_type", content_type))
            except Exception as e:
                logging.warning(f"Failed to get from storage, falling back to local: {e}")
        
        # Fallback to local file - check multiple locations
        images_folder = get_images_folder()
        if images_folder:
            local_path = images_folder / path
            if local_path.exists():
                ext = local_path.suffix.lower().replace('.', '')
                content_type = MIME_TYPES.get(ext, 'application/octet-stream')
                with open(local_path, 'rb') as f:
                    return Response(content=f.read(), media_type=content_type)
        
        raise HTTPException(status_code=404, detail="Image not found")
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error serving image {path}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============== ONE-TIME SEED ENDPOINT ==============
# Dit endpoint vult de database met alle 7 websites
# Na uitvoeren wordt het veilig uitgeschakeld (returned already seeded)

@api_router.get("/seed-sites")
async def seed_all_sites(secret: str = ""):
    """
    Eenmalige seed endpoint om alle 7 websites toe te voegen aan de database.
    Beveiligd met een geheime sleutel.
    Na eerste uitvoering worden duplicaten voorkomen.
    """
    # Beveiligingscheck
    if secret != "fworks-seed-2024":
        return {"error": "Invalid secret. Use ?secret=fworks-seed-2024"}
    
    # Alle 7 websites die beheerd worden
    all_sites = [
        {
            "site_id": "site_cantina",
            "name": "La Cantina Italiana",
            "slug": "cantina",
            "domains": ["lacantinaitaliana.net", "www.lacantinaitaliana.net"],
            "site_type": "restaurant",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "site_id": "site_bottega",
            "name": "La Bottega Herent",
            "slug": "bottega",
            "domains": ["labottegaherent.com", "www.labottegaherent.com"],
            "site_type": "restaurant",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "site_id": "site_ascoli",
            "name": "L'Ascoli Zaventem",
            "slug": "ascoli",
            "domains": ["ascolizaventem.com", "www.ascolizaventem.com"],
            "site_type": "restaurant",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "site_id": "site_mercato",
            "name": "Ristorante Mercato",
            "slug": "mercato",
            "domains": ["ristorantemercato.be", "www.ristorantemercato.be"],
            "site_type": "restaurant",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "site_id": "site_tracemaster",
            "name": "Tracemaster Rastreadores",
            "slug": "tracemaster",
            "domains": ["tracemaster-rastreadores.com", "www.tracemaster-rastreadores.com"],
            "site_type": "business",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "site_id": "site_theobeans",
            "name": "Theo Beans Export",
            "slug": "theobeans",
            "domains": ["theobeans-export.com", "www.theobeans-export.com"],
            "site_type": "business",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "site_id": "site_fworks",
            "name": "fworksbuilders",
            "slug": "fworks",
            "domains": ["fworksbuilders.com", "www.fworksbuilders.com"],
            "site_type": "business",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    added = []
    skipped = []
    
    for site in all_sites:
        # Check of site al bestaat (op basis van slug)
        existing = await db.sites.find_one({"slug": site["slug"]})
        if existing:
            skipped.append(site["name"])
        else:
            await db.sites.insert_one(site)
            added.append(site["name"])
    
    return {
        "success": True,
        "message": f"Seed voltooid! {len(added)} toegevoegd, {len(skipped)} al aanwezig.",
        "added": added,
        "skipped": skipped,
        "total_sites": len(all_sites)
    }

# Tijdelijke endpoint om announcement te wissen voor een site
@public_router.post("/site/{slug}/clear-announcement")
async def clear_site_announcement(slug: str, secret: str = "fworks2024"):
    """Tijdelijke endpoint om announcement te wissen - verwijder na gebruik"""
    if secret != "fworks2024":
        raise HTTPException(status_code=403, detail="Invalid secret")
    
    # Zoek de site config
    site = await db.sites.find_one({"slug": slug})
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    
    config_id = site.get("site_config_id")
    if config_id:
        await db.site_configs.update_one(
            {"_id": config_id},
            {"$set": {
                "special_announcement": "",
                "special_announcement_active": False,
                "closure_notice": ""
            }}
        )
        return {"success": True, "message": f"Announcement cleared for {slug}"}
    
    raise HTTPException(status_code=404, detail="Site config not found")

# ============== VISITOR TRACKING ==============

@public_router.post("/track-visit")
async def track_visit(request: Request):
    """Track a website visit with page path"""
    body = await request.json()
    site_slug = body.get("site_slug")
    page_path = body.get("path", "/")  # Now receiving path from frontend
    
    if not site_slug:
        raise HTTPException(status_code=400, detail="site_slug required")
    
    # Get visitor IP
    forwarded = request.headers.get("x-forwarded-for")
    visitor_ip = forwarded.split(",")[0].strip() if forwarded else request.client.host
    
    # Create unique visitor ID for this page visit (IP + date + path)
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    visitor_id = f"{visitor_ip}_{today}_{page_path}"
    
    # Check if this exact page was already visited today by this visitor
    existing = await db.site_visits.find_one({
        "site_slug": site_slug,
        "visitor_id": visitor_id
    })
    
    if existing:
        # Already tracked this page today
        return {"status": "already_tracked"}
    
    # Try to get country from IP (using free API)
    country = "Unknown"
    country_code = "XX"
    try:
        async with httpx.AsyncClient(timeout=2.0) as client_http:
            geo_response = await client_http.get(f"http://ip-api.com/json/{visitor_ip}?fields=country,countryCode")
            if geo_response.status_code == 200:
                geo_data = geo_response.json()
                country = geo_data.get("country", "Unknown")
                country_code = geo_data.get("countryCode", "XX")
    except:
        pass  # Silent fail, use Unknown
    
    visit = {
        "site_slug": site_slug,
        "visitor_id": visitor_id,
        "visitor_ip": visitor_ip,
        "path": page_path,  # NOW STORING THE PATH
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "date": today,
        "country": country,
        "country_code": country_code,
        "user_agent": request.headers.get("user-agent", ""),
        "referer": request.headers.get("referer", "")
    }
    
    await db.site_visits.insert_one(visit)
    return {"status": "tracked", "path": page_path}

@admin_router.get("/sites/{site_id}/stats")
async def get_site_stats(site_id: str, user: User = Depends(get_current_user)):
    """Get detailed visitor statistics for a site"""
    site = await db.sites.find_one({"site_id": site_id}, {"_id": 0})
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    
    site_slug = site.get("slug", site_id)
    now = datetime.now(timezone.utc)
    
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_start = today_start - timedelta(days=7)
    month_start = today_start - timedelta(days=30)
    
    # Count unique visitors
    total_visits = await db.site_visits.count_documents({"site_slug": site_slug})
    today_visits = await db.site_visits.count_documents({
        "site_slug": site_slug,
        "date": now.strftime("%Y-%m-%d")
    })
    week_visits = await db.site_visits.count_documents({
        "site_slug": site_slug,
        "timestamp": {"$gte": week_start.isoformat()}
    })
    month_visits = await db.site_visits.count_documents({
        "site_slug": site_slug,
        "timestamp": {"$gte": month_start.isoformat()}
    })
    
    # Get country breakdown
    country_pipeline = [
        {"$match": {"site_slug": site_slug}},
        {"$group": {"_id": "$country", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]
    countries = await db.site_visits.aggregate(country_pipeline).to_list(10)
    country_stats = [{"country": c["_id"] or "Unknown", "visitors": c["count"]} for c in countries]
    
    # Get daily visits for last 7 days
    daily_pipeline = [
        {"$match": {"site_slug": site_slug, "timestamp": {"$gte": week_start.isoformat()}}},
        {"$group": {"_id": "$date", "count": {"$sum": 1}}},
        {"$sort": {"_id": -1}},
        {"$limit": 7}
    ]
    daily = await db.site_visits.aggregate(daily_pipeline).to_list(7)
    daily_stats = [{"date": d["_id"], "visitors": d["count"]} for d in daily]
    
    # Get recent visitors (last 10)
    recent = await db.site_visits.find(
        {"site_slug": site_slug},
        {"_id": 0, "visitor_ip": 0, "visitor_id": 0}
    ).sort("timestamp", -1).limit(10).to_list(10)
    
    return {
        "site_id": site_id,
        "site_name": site.get("name"),
        "site_slug": site_slug,
        "stats": {
            "today": today_visits,
            "week": week_visits,
            "month": month_visits,
            "total": total_visits
        },
        "countries": country_stats,
        "daily": daily_stats,
        "recent_visitors": recent
    }

@admin_router.get("/all-stats")
async def get_all_stats(user: User = Depends(get_current_user)):
    """Get visitor statistics for all sites"""
    sites = await db.sites.find({}, {"_id": 0}).to_list(100)
    
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_start = today_start - timedelta(days=7)
    month_start = today_start - timedelta(days=30)
    
    stats = []
    for site in sites:
        site_slug = site.get("slug", site.get("site_id"))
        
        total_visits = await db.site_visits.count_documents({"site_slug": site_slug})
        today_visits = await db.site_visits.count_documents({
            "site_slug": site_slug,
            "timestamp": {"$gte": today_start.isoformat()}
        })
        week_visits = await db.site_visits.count_documents({
            "site_slug": site_slug,
            "timestamp": {"$gte": week_start.isoformat()}
        })
        month_visits = await db.site_visits.count_documents({
            "site_slug": site_slug,
            "timestamp": {"$gte": month_start.isoformat()}
        })
        
        stats.append({
            "site_id": site.get("site_id"),
            "site_name": site.get("name"),
            "site_slug": site_slug,
            "today": today_visits,
            "week": week_visits,
            "month": month_visits,
            "total": total_visits
        })
    
    return stats

@admin_router.get("/live-visitor")
async def get_latest_visitor(user: User = Depends(get_current_user)):
    """Get the most recent visitor across all sites (for live animation)"""
    # Get the most recent visit from the last 5 minutes
    five_mins_ago = (datetime.now(timezone.utc) - timedelta(minutes=5)).isoformat()
    
    recent_visit = await db.site_visits.find_one(
        {"timestamp": {"$gte": five_mins_ago}},
        {"_id": 0, "visitor_ip": 0, "visitor_id": 0},
        sort=[("timestamp", -1)]
    )
    
    if not recent_visit:
        return None
    
    # Get site name
    site_slug = recent_visit.get("site_slug", "")
    site = await db.sites.find_one({"slug": site_slug}, {"_id": 0, "name": 1})
    site_name = site.get("name", site_slug) if site else site_slug
    
    # Format country with flag
    country = recent_visit.get("country", "Onbekend")
    country_flags = {
        "Belgium": "🇧🇪 België",
        "Netherlands": "🇳🇱 Nederland",
        "France": "🇫🇷 Frankrijk",
        "Germany": "🇩🇪 Duitsland",
        "Italy": "🇮🇹 Italië",
        "Spain": "🇪🇸 Spanje",
        "United Kingdom": "🇬🇧 UK",
        "United States": "🇺🇸 USA",
        "Ecuador": "🇪🇨 Ecuador",
        "Colombia": "🇨🇴 Colombia",
        "Peru": "🇵🇪 Peru",
    }
    country_display = country_flags.get(country, f"🌍 {country}")
    
    # Format path nicely
    path = recent_visit.get("path", "/")
    page_names = {
        "/": "Homepage",
        "/kaart": "Menu",
        "/menu": "Menu",
        "/contact": "Contact",
        "/reserveren": "Reserveren",
        "/reserve": "Reserveren",
        "/about": "Over ons",
        "/over-ons": "Over ons",
        "/gallery": "Galerij",
        "/fotos": "Foto's",
        "/info": "Info"
    }
    page_display = page_names.get(path, path)
    
    return {
        "site": site_name,
        "country": country_display,
        "page": page_display,
        "timestamp": recent_visit.get("timestamp")
    }

# ============== SITE HEALTH MONITORING ==============

@admin_router.get("/health-check")
async def check_all_sites_health(user: User = Depends(get_current_user)):
    """Check health of all sites and return status with any alerts"""
    sites = await db.sites.find({}, {"_id": 0}).to_list(100)
    
    health_results = []
    
    async with httpx.AsyncClient(timeout=10.0) as client:
        for site in sites:
            site_id = site.get("site_id")
            site_name = site.get("name", "Unknown")
            domains = site.get("domains", [])
            slug = site.get("slug", "")
            
            # Determine URL to check
            if domains and len(domains) > 0:
                check_url = f"https://{domains[0]}"
                domain = domains[0]
            else:
                # Use preview URL for sites without custom domain
                check_url = f"{os.environ.get('PREVIEW_URL', 'https://image-restore-21.preview.emergentagent.com')}/site/{slug}"
                domain = f"/site/{slug}"
            
            try:
                start_time = datetime.now(timezone.utc)
                response = await client.get(check_url, follow_redirects=True)
                end_time = datetime.now(timezone.utc)
                response_time = int((end_time - start_time).total_seconds() * 1000)
                
                if response.status_code == 200:
                    status = "up"
                    message = "Site is online"
                    # Check if slow (> 3 seconds)
                    if response_time > 3000:
                        status = "slow"
                        message = f"Site is slow ({response_time}ms)"
                elif response.status_code >= 500:
                    status = "down"
                    message = f"Server error: {response.status_code}"
                else:
                    status = "warning"
                    message = f"HTTP {response.status_code}"
                    
                health_results.append({
                    "site_id": site_id,
                    "site_name": site_name,
                    "domain": domain,
                    "status": status,
                    "message": message,
                    "response_time_ms": response_time,
                    "checked_at": datetime.now(timezone.utc).isoformat()
                })
                
                # If site is down, create or update alert
                if status == "down":
                    existing_alert = await db.site_alerts.find_one({
                        "site_id": site_id,
                        "is_active": True
                    })
                    if not existing_alert:
                        alert = SiteAlert(
                            site_id=site_id,
                            site_name=site_name,
                            domain=domain,
                            status=status,
                            message=message,
                            response_time_ms=response_time
                        )
                        await db.site_alerts.insert_one(alert.model_dump())
                else:
                    # Resolve any active alerts for this site
                    active_alert = await db.site_alerts.find_one({
                        "site_id": site_id,
                        "is_active": True
                    })
                    if active_alert:
                        started = datetime.fromisoformat(active_alert["started_at"].replace("Z", "+00:00")) if isinstance(active_alert["started_at"], str) else active_alert["started_at"]
                        duration = int((datetime.now(timezone.utc) - started).total_seconds() / 60)
                        await db.site_alerts.update_one(
                            {"alert_id": active_alert["alert_id"]},
                            {"$set": {
                                "is_active": False,
                                "resolved_at": datetime.now(timezone.utc).isoformat(),
                                "duration_minutes": duration
                            }}
                        )
                        
            except Exception as e:
                # Site is unreachable
                health_results.append({
                    "site_id": site_id,
                    "site_name": site_name,
                    "domain": domain,
                    "status": "down",
                    "message": f"Unreachable: {str(e)[:50]}",
                    "response_time_ms": None,
                    "checked_at": datetime.now(timezone.utc).isoformat()
                })
                
                # Create alert if not exists
                existing_alert = await db.site_alerts.find_one({
                    "site_id": site_id,
                    "is_active": True
                })
                if not existing_alert:
                    alert = SiteAlert(
                        site_id=site_id,
                        site_name=site_name,
                        domain=domain,
                        status="down",
                        message=f"Unreachable: {str(e)[:50]}"
                    )
                    await db.site_alerts.insert_one(alert.model_dump())
    
    return health_results

@admin_router.get("/alerts")
async def get_site_alerts(
    user: User = Depends(get_current_user),
    limit: int = 100,
    offset: int = 0,
    alert_type: Optional[str] = None,
    site_id: Optional[str] = None,
    is_active: Optional[bool] = None
):
    """Get all site alerts with filters and pagination"""
    query = {}
    if alert_type:
        query["alert_type"] = alert_type
    if site_id:
        query["site_id"] = site_id
    if is_active is not None:
        query["is_active"] = is_active
    
    total = await db.site_alerts.count_documents(query)
    alerts = await db.site_alerts.find(
        query, 
        {"_id": 0}
    ).sort("started_at", -1).skip(offset).limit(limit).to_list(limit)
    
    return {
        "alerts": alerts,
        "total": total,
        "limit": limit,
        "offset": offset
    }

@admin_router.get("/alerts/stats")
async def get_alert_statistics(user: User = Depends(get_current_user)):
    """Get alert statistics summary"""
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_ago = now - timedelta(days=7)
    
    # Count by type
    pipeline = [
        {"$group": {"_id": "$alert_type", "count": {"$sum": 1}}}
    ]
    by_type = await db.site_alerts.aggregate(pipeline).to_list(10)
    
    # Active alerts
    active_count = await db.site_alerts.count_documents({"is_active": True})
    
    # Today's alerts
    today_count = await db.site_alerts.count_documents({
        "started_at": {"$gte": today_start.isoformat()}
    })
    
    # This week
    week_count = await db.site_alerts.count_documents({
        "started_at": {"$gte": week_ago.isoformat()}
    })
    
    # Average resolution time (for resolved alerts)
    resolved_alerts = await db.site_alerts.find(
        {"is_active": False, "duration_minutes": {"$exists": True, "$ne": None}},
        {"duration_minutes": 1}
    ).to_list(500)
    
    avg_resolution = 0
    if resolved_alerts:
        durations = [a["duration_minutes"] for a in resolved_alerts if a.get("duration_minutes")]
        if durations:
            avg_resolution = sum(durations) / len(durations)
    
    return {
        "active_alerts": active_count,
        "today_alerts": today_count,
        "week_alerts": week_count,
        "total_alerts": await db.site_alerts.count_documents({}),
        "by_type": {item["_id"]: item["count"] for item in by_type},
        "avg_resolution_minutes": round(avg_resolution, 1)
    }

@admin_router.get("/alerts/active")
async def get_active_alerts(user: User = Depends(get_current_user)):
    """Get only active (unresolved) alerts"""
    alerts = await db.site_alerts.find(
        {"is_active": True}, 
        {"_id": 0}
    ).sort("started_at", -1).to_list(50)
    
    return alerts

@admin_router.delete("/alerts/{alert_id}")
async def dismiss_alert(alert_id: str, user: User = Depends(get_current_user)):
    """Dismiss/acknowledge an alert"""
    result = await db.site_alerts.update_one(
        {"alert_id": alert_id},
        {"$set": {
            "is_active": False,
            "resolved_at": datetime.now(timezone.utc).isoformat(),
            "dismissed_manually": True
        }}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Alert not found")
    return {"success": True}

# ============== GALLERY SYNC ==============

@admin_router.post("/sites/{site_id}/gallery/sync")
async def sync_gallery_from_filesystem(site_id: str, user: User = Depends(get_current_user)):
    """Sync gallery images from filesystem to database"""
    import glob
    
    # Map site_id to folder name
    site_folders = {
        'site_bottega001': 'bottega',
        'site_cantina001': 'cantina',
        'site_ascoli001': 'ascoli',
        'site_mercato001': 'mercato',
        'site_smeralda': 'smeralda',
        'site_tracemaster001': 'tracemaster',
        'site_theobeans001': 'theobeans',
        'site_fworks': 'fworks',
        # Also support slug directly
        'bottega': 'bottega',
        'cantina': 'cantina',
        'ascoli': 'ascoli',
        'mercato': 'mercato',
        'smeralda': 'smeralda',
        'tracemaster': 'tracemaster',
        'theobeans': 'theobeans',
        'fworks': 'fworks',
    }
    
    folder_name = site_folders.get(site_id)
    if not folder_name:
        raise HTTPException(status_code=400, detail=f"Unknown site: {site_id}")
    
    # Define possible gallery paths
    base_path = "/app/frontend/public/images"
    possible_paths = [
        f"{base_path}/{folder_name}/gallery/*.jpg",
        f"{base_path}/{folder_name}/gallery/*.jpeg",
        f"{base_path}/{folder_name}/gallery/*.png",
        f"{base_path}/{folder_name}/gallery/*.webp",
        f"{base_path}/{folder_name}/*.jpg",
        f"{base_path}/{folder_name}/*.jpeg",
        f"{base_path}/{folder_name}/*.png",
        f"{base_path}/{folder_name}/*.webp",
    ]
    
    # Find all image files
    all_images = []
    for pattern in possible_paths:
        all_images.extend(glob.glob(pattern))
    
    # Remove duplicates and filter out non-gallery images
    seen = set()
    unique_images = []
    for img in all_images:
        filename = os.path.basename(img)
        if filename not in seen:
            # Skip known non-gallery files
            skip_prefixes = ['logo', 'hero', 'menu', 'bg-', 'icon', 'kaart']
            if not any(filename.lower().startswith(prefix) for prefix in skip_prefixes):
                seen.add(filename)
                unique_images.append(img)
    
    # Clear existing gallery for this site
    await db.gallery_images.delete_many({"site_id": site_id})
    
    # Insert new images
    inserted = 0
    for i, img_path in enumerate(unique_images):
        filename = os.path.basename(img_path)
        relative_path = img_path.replace("/app/frontend/public", "")
        
        image_doc = {
            "image_id": f"img_{folder_name}_{i:03d}",
            "site_id": site_id,
            "url": relative_path,
            "alt_text": filename.replace("-", " ").replace("_", " ").rsplit(".", 1)[0],
            "sort_order": i,
            "category": "gallery",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.gallery_images.insert_one(image_doc)
        inserted += 1
    
    return {
        "success": True,
        "synced_images": inserted,
        "site_id": site_id,
        "folder": folder_name
    }

@admin_router.post("/gallery/sync-all")
async def sync_all_galleries(user: User = Depends(get_current_user)):
    """Sync gallery images for all sites"""
    sites = ['site_bottega001', 'site_cantina001', 'site_ascoli001', 'site_mercato001', 
             'site_smeralda', 'site_tracemaster001', 'site_theobeans001', 'site_fworks']
    
    results = {}
    for site_id in sites:
        try:
            result = await sync_gallery_from_filesystem(site_id, user)
            results[site_id] = result["synced_images"]
        except Exception as e:
            results[site_id] = f"Error: {str(e)}"
    
    return {"success": True, "results": results}

# Include routers
app.include_router(api_router)
app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(public_router)
app.include_router(site_admin_router)

# Direct /images/ route (without /api prefix) for frontend compatibility
@app.get("/images/{path:path}")
async def serve_image_direct(path: str):
    """
    Serve images directly at /images/ path (without /api prefix).
    This is needed because the frontend uses /images/... paths directly.
    On production, static files can't be served, so we serve from Object Storage.
    """
    try:
        # First check if migrated to object storage
        record = await db.migrated_images.find_one({"original_path": f"/images/{path}"})
        
        if record and record.get("storage_path"):
            # Serve from object storage
            try:
                data, content_type = get_object(record["storage_path"])
                return Response(content=data, media_type=record.get("content_type", content_type))
            except Exception as e:
                logging.warning(f"Failed to get from storage: {e}")
        
        # Fallback to local file (works on preview)
        images_folder = get_images_folder()
        if images_folder:
            local_path = images_folder / path
            if local_path.exists():
                ext = local_path.suffix.lower().replace('.', '')
                content_type = MIME_TYPES.get(ext, 'application/octet-stream')
                with open(local_path, 'rb') as f:
                    return Response(content=f.read(), media_type=content_type)
        
        raise HTTPException(status_code=404, detail="Image not found")
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error serving image {path}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

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

# ============== AUTO-SEED ON STARTUP ==============
async def seed_sites_on_startup():
    """Automatically seed all 7 sites when the app starts"""
    all_sites = [
        {
            "site_id": "site_cantina",
            "name": "La Cantina Italiana",
            "slug": "cantina",
            "domains": ["lacantinaitaliana.net", "www.lacantinaitaliana.net"],
            "site_type": "restaurant",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "site_id": "site_bottega",
            "name": "La Bottega Herent",
            "slug": "bottega",
            "domains": ["labottegaherent.com", "www.labottegaherent.com"],
            "site_type": "restaurant",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "site_id": "site_ascoli",
            "name": "L'Ascoli Zaventem",
            "slug": "ascoli",
            "domains": ["ascolizaventem.com", "www.ascolizaventem.com"],
            "site_type": "restaurant",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "site_id": "site_mercato",
            "name": "Ristorante Mercato",
            "slug": "mercato",
            "domains": ["ristorantemercato.be", "www.ristorantemercato.be"],
            "site_type": "restaurant",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "site_id": "site_tracemaster",
            "name": "Tracemaster Rastreadores",
            "slug": "tracemaster",
            "domains": ["tracemaster-rastreadores.com", "www.tracemaster-rastreadores.com"],
            "site_type": "business",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "site_id": "site_theobeans",
            "name": "Theo Beans Export",
            "slug": "theobeans",
            "domains": ["theobeans-export.com", "www.theobeans-export.com"],
            "site_type": "business",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "site_id": "site_fworks",
            "name": "fworksbuilders",
            "slug": "fworks",
            "domains": ["fworksbuilders.com", "www.fworksbuilders.com"],
            "site_type": "business",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "site_id": "site_smeralda",
            "name": "Résidence Villa Smeralda",
            "slug": "smeralda",
            "domains": ["smeraldavacanze.it", "www.smeraldavacanze.it"],
            "site_type": "vacation",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "site_id": "site_albertopantoja",
            "name": "Alberto Pantoja - La Voz del Campo",
            "slug": "albertopantoja",
            "domains": ["albertopantoja.com", "www.albertopantoja.com", "albertopantoja.ec", "www.albertopantoja.ec"],
            "site_type": "political",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "site_id": "site_hoteldelpacifico",
            "name": "Hotel del Pacífico",
            "slug": "hoteldelpacifico",
            "domains": ["hoteldelpacifico.com", "www.hoteldelpacifico.com"],
            "site_type": "hotel",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    added = 0
    for site in all_sites:
        existing = await db.sites.find_one({"slug": site["slug"]})
        if not existing:
            await db.sites.insert_one(site)
            added += 1
            logger.info(f"Auto-seeded site: {site['name']}")
    
    if added > 0:
        logger.info(f"Auto-seed complete: {added} sites added")
    else:
        logger.info("Auto-seed: All sites already present")
    
    # Auto-seed hotel admin if not exists
    hotel_admin = await db.site_admins.find_one({"site_id": "site_hoteldelpacifico"})
    if not hotel_admin:
        import bcrypt
        admin_dict = {
            "admin_id": f"admin_{uuid.uuid4().hex[:12]}",
            "site_id": "site_hoteldelpacifico",
            "email": "admin@hoteldelpacifico.net",
            "name": "Hotel del Pacífico Admin",
            "password_hash": bcrypt.hashpw("hotel123".encode(), bcrypt.gensalt()).decode(),
            "is_active": True,
            "permissions": {"opening_hours": True, "menu_items": True, "gallery": True, "prices": True, "contact_info": True},
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        await db.site_admins.insert_one(admin_dict)
        logger.info("Auto-seeded hotel admin: admin@hoteldelpacifico.net")
    elif hotel_admin.get("email") != "admin@hoteldelpacifico.net":
        await db.site_admins.update_one(
            {"site_id": "site_hoteldelpacifico"},
            {"$set": {"email": "admin@hoteldelpacifico.net"}}
        )
        logger.info("Updated hotel admin email to admin@hoteldelpacifico.net")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
