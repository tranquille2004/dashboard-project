"""
Backend API tests for Special Announcement feature.
Tests the announcement-related endpoints in the site admin API.
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestPublicAnnouncementAPI:
    """Test public API endpoints for announcement retrieval"""

    def test_get_cantina_config_returns_announcement_fields(self, api_client):
        """GET /api/public/site/{slug} returns announcement config fields"""
        response = api_client.get(f"{BASE_URL}/api/public/site/cantina")
        assert response.status_code == 200
        
        data = response.json()
        assert 'config' in data
        config = data['config']
        
        # Verify announcement fields exist in config
        assert 'special_announcement' in config
        assert 'special_announcement_active' in config
        assert 'special_announcement_type' in config

    def test_cantina_has_active_warning_announcement(self, api_client):
        """Cantina should have an active warning announcement"""
        response = api_client.get(f"{BASE_URL}/api/public/site/cantina")
        assert response.status_code == 200
        
        config = response.json()['config']
        assert config['special_announcement_active'] is True
        assert config['special_announcement_type'] == 'warning'
        assert config['special_announcement'] is not None
        assert len(config['special_announcement']) > 0

    def test_mercato_has_active_success_announcement(self, api_client):
        """Mercato should have an active success announcement"""
        response = api_client.get(f"{BASE_URL}/api/public/site/mercato")
        assert response.status_code == 200
        
        config = response.json()['config']
        assert config['special_announcement_active'] is True
        assert config['special_announcement_type'] == 'success'
        assert config['special_announcement'] is not None

    def test_bottega_has_no_active_announcement(self, api_client):
        """Bottega should not have an active announcement"""
        response = api_client.get(f"{BASE_URL}/api/public/site/bottega")
        assert response.status_code == 200
        
        config = response.json()['config']
        # Either None, False, or empty string means no active announcement
        assert not config.get('special_announcement_active') or config.get('special_announcement') is None

    def test_invalid_site_returns_404(self, api_client):
        """Non-existent site should return 404"""
        response = api_client.get(f"{BASE_URL}/api/public/site/nonexistent-site-xyz")
        assert response.status_code == 404


class TestSiteAdminLogin:
    """Test site admin authentication"""

    def test_valid_cantina_login(self, api_client):
        """Valid credentials should return admin and site info"""
        response = api_client.post(f"{BASE_URL}/api/site-admin/login", json={
            "email": "cantina@test.be",
            "password": "test123"
        })
        assert response.status_code == 200
        
        data = response.json()
        assert 'admin' in data
        assert 'site' in data
        assert data['admin']['email'] == 'cantina@test.be'
        assert data['site']['slug'] == 'cantina'

    def test_valid_mercato_login(self, api_client):
        """Valid Mercato credentials should work"""
        response = api_client.post(f"{BASE_URL}/api/site-admin/login", json={
            "email": "mercato@test.be",
            "password": "test123"
        })
        assert response.status_code == 200
        assert response.json()['site']['slug'] == 'mercato'

    def test_invalid_password_fails(self, api_client):
        """Invalid password should return 401"""
        response = api_client.post(f"{BASE_URL}/api/site-admin/login", json={
            "email": "cantina@test.be",
            "password": "wrongpassword"
        })
        assert response.status_code == 401

    def test_invalid_email_fails(self, api_client):
        """Non-existent email should return 401"""
        response = api_client.post(f"{BASE_URL}/api/site-admin/login", json={
            "email": "nonexistent@test.be",
            "password": "test123"
        })
        assert response.status_code == 401


class TestSiteAdminAnnouncementAPI:
    """Test site admin announcement management endpoints"""

    def test_get_own_site_config(self, site_admin_token):
        """Site admin can get their own site config"""
        response = site_admin_token.get(f"{BASE_URL}/api/site-admin/config")
        assert response.status_code == 200
        
        config = response.json()
        assert 'special_announcement' in config
        assert 'special_announcement_active' in config
        assert 'special_announcement_type' in config

    def test_update_announcement_text(self, site_admin_token):
        """Site admin can update announcement text"""
        test_message = f"TEST_announcement_{uuid.uuid4().hex[:8]}"
        
        response = site_admin_token.put(f"{BASE_URL}/api/site-admin/config", json={
            "special_announcement": test_message
        })
        assert response.status_code == 200
        
        # Verify update persisted
        get_response = site_admin_token.get(f"{BASE_URL}/api/site-admin/config")
        assert get_response.status_code == 200
        assert get_response.json()['special_announcement'] == test_message

    def test_update_announcement_active_status(self, site_admin_token):
        """Site admin can toggle announcement active status"""
        # First get current status
        current = site_admin_token.get(f"{BASE_URL}/api/site-admin/config").json()
        current_status = current.get('special_announcement_active', False)
        
        # Toggle status
        new_status = not current_status
        response = site_admin_token.put(f"{BASE_URL}/api/site-admin/config", json={
            "special_announcement_active": new_status
        })
        assert response.status_code == 200
        
        # Verify change
        updated = site_admin_token.get(f"{BASE_URL}/api/site-admin/config").json()
        assert updated['special_announcement_active'] == new_status
        
        # Restore original status
        site_admin_token.put(f"{BASE_URL}/api/site-admin/config", json={
            "special_announcement_active": current_status
        })

    def test_update_announcement_type(self, site_admin_token):
        """Site admin can change announcement type"""
        for announcement_type in ['info', 'warning', 'success']:
            response = site_admin_token.put(f"{BASE_URL}/api/site-admin/config", json={
                "special_announcement_type": announcement_type
            })
            assert response.status_code == 200
            
            # Verify
            config = site_admin_token.get(f"{BASE_URL}/api/site-admin/config").json()
            assert config['special_announcement_type'] == announcement_type

    def test_unauthenticated_cannot_update_config(self, api_client):
        """Unauthenticated requests should fail"""
        response = api_client.put(f"{BASE_URL}/api/site-admin/config", json={
            "special_announcement": "Hacker announcement"
        })
        assert response.status_code == 401


class TestHealthCheck:
    """Basic API health checks"""

    def test_api_health(self, api_client):
        """API health endpoint returns healthy"""
        response = api_client.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        assert response.json()['status'] == 'healthy'

    def test_api_root(self, api_client):
        """API root returns welcome message"""
        response = api_client.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
