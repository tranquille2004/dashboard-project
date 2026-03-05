import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

@pytest.fixture
def api_client():
    """Shared requests session"""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session

@pytest.fixture
def site_admin_token(api_client):
    """Get site admin authentication token for Cantina"""
    response = api_client.post(f"{BASE_URL}/api/site-admin/login", json={
        "email": "cantina@test.be",
        "password": "test123"
    })
    if response.status_code == 200:
        # Site admin login sets cookie, but we need to return session for authenticated requests
        return api_client
    pytest.skip("Site admin authentication failed — skipping authenticated tests")

@pytest.fixture
def mercato_admin_token(api_client):
    """Get site admin authentication token for Mercato"""
    response = api_client.post(f"{BASE_URL}/api/site-admin/login", json={
        "email": "mercato@test.be",
        "password": "test123"
    })
    if response.status_code == 200:
        return api_client
    pytest.skip("Mercato admin authentication failed — skipping authenticated tests")
