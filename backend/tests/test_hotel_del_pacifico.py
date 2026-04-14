"""
Test Suite for Hotel del Pacifico Features
- Site admin login and authentication
- Room prices management (Kamerprijzen)
- Public API for room prices
- FWorks portfolio inclusion
"""

import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://image-restore-21.preview.emergentagent.com')

# Test credentials from test_credentials.md
HOTEL_ADMIN_EMAIL = "hotel@hoteldelpacifico.com"
HOTEL_ADMIN_PASSWORD = "hotel123"


class TestHotelDelPacificoPublicAPI:
    """Test public API endpoints for Hotel del Pacifico"""
    
    def test_public_site_exists(self):
        """Verify Hotel del Pacifico site exists in public sites list"""
        response = requests.get(f"{BASE_URL}/api/public/sites")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        sites = response.json()
        hotel_site = next((s for s in sites if s.get('slug') == 'hoteldelpacifico'), None)
        
        assert hotel_site is not None, "Hotel del Pacifico not found in public sites"
        assert hotel_site.get('site_type') == 'hotel', f"Expected site_type 'hotel', got {hotel_site.get('site_type')}"
        assert hotel_site.get('name') == 'Hotel del Pacífico', f"Expected name 'Hotel del Pacífico', got {hotel_site.get('name')}"
        print(f"PASS: Hotel del Pacifico found - {hotel_site}")
    
    def test_public_site_data_by_slug(self):
        """Verify public API returns complete site data including room_prices"""
        response = requests.get(f"{BASE_URL}/api/public/site/hoteldelpacifico")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        
        # Verify site data
        assert 'site' in data, "Response missing 'site' field"
        assert data['site'].get('slug') == 'hoteldelpacifico'
        assert data['site'].get('site_type') == 'hotel'
        
        # Verify config exists
        assert 'config' in data, "Response missing 'config' field"
        config = data['config']
        
        # Verify room_prices in config
        assert 'room_prices' in config, "Config missing 'room_prices' field"
        room_prices = config['room_prices']
        
        assert isinstance(room_prices, list), "room_prices should be a list"
        assert len(room_prices) >= 3, f"Expected at least 3 room types, got {len(room_prices)}"
        
        print(f"PASS: Public API returns room_prices with {len(room_prices)} room types")
    
    def test_room_prices_have_correct_structure(self):
        """Verify room prices have all required fields"""
        response = requests.get(f"{BASE_URL}/api/public/site/hoteldelpacifico")
        assert response.status_code == 200
        
        room_prices = response.json().get('config', {}).get('room_prices', [])
        
        required_fields = ['id', 'name_es', 'price', 'features']
        
        for room in room_prices:
            for field in required_fields:
                assert field in room, f"Room missing required field: {field}"
            
            # Verify price is a number > 0 (not $0)
            assert isinstance(room['price'], (int, float)), f"Price should be numeric, got {type(room['price'])}"
            assert room['price'] > 0, f"Room {room.get('name_es')} has price $0 - should have actual price"
            
            # Verify features is a list
            assert isinstance(room['features'], list), f"Features should be a list"
        
        print(f"PASS: All {len(room_prices)} rooms have correct structure with prices > $0")
    
    def test_room_prices_values(self):
        """Verify specific room prices match expected values"""
        response = requests.get(f"{BASE_URL}/api/public/site/hoteldelpacifico")
        assert response.status_code == 200
        
        room_prices = response.json().get('config', {}).get('room_prices', [])
        
        # Expected prices from agent context
        expected_prices = {
            'Habitación Clásica': 35,
            'Habitación Superior': 55,
            'Suite Ejecutiva': 85
        }
        
        for room in room_prices:
            name = room.get('name_es')
            if name in expected_prices:
                assert room['price'] == expected_prices[name], \
                    f"Room {name} expected price ${expected_prices[name]}, got ${room['price']}"
        
        print(f"PASS: Room prices match expected values - Clásica: $35, Superior: $55, Suite: $85")


class TestSiteAdminLogin:
    """Test site admin authentication for Hotel del Pacifico"""
    
    def test_login_with_valid_credentials(self):
        """Test login with correct hotel admin credentials"""
        session = requests.Session()
        
        response = session.post(
            f"{BASE_URL}/api/site-admin/login",
            json={
                "email": HOTEL_ADMIN_EMAIL,
                "password": HOTEL_ADMIN_PASSWORD
            }
        )
        
        assert response.status_code == 200, f"Login failed with status {response.status_code}: {response.text}"
        
        data = response.json()
        assert 'admin' in data, "Response missing 'admin' field"
        assert 'site' in data, "Response missing 'site' field"
        
        admin = data['admin']
        assert admin.get('email') == HOTEL_ADMIN_EMAIL
        assert admin.get('site_id') is not None
        
        site = data['site']
        assert site.get('slug') == 'hoteldelpacifico'
        assert site.get('site_type') == 'hotel'
        
        # Verify permissions include prices
        permissions = admin.get('permissions', {})
        assert permissions.get('prices') == True, f"Admin should have 'prices' permission, got {permissions}"
        
        print(f"PASS: Login successful for {HOTEL_ADMIN_EMAIL}")
        print(f"  - Admin permissions: {permissions}")
        return session
    
    def test_login_with_invalid_credentials(self):
        """Test login fails with wrong password"""
        response = requests.post(
            f"{BASE_URL}/api/site-admin/login",
            json={
                "email": HOTEL_ADMIN_EMAIL,
                "password": "wrongpassword"
            }
        )
        
        assert response.status_code == 401, f"Expected 401 for invalid credentials, got {response.status_code}"
        print("PASS: Invalid credentials correctly rejected with 401")


class TestSiteAdminDashboard:
    """Test site admin dashboard functionality"""
    
    @pytest.fixture
    def authenticated_session(self):
        """Get authenticated session for hotel admin"""
        session = requests.Session()
        response = session.post(
            f"{BASE_URL}/api/site-admin/login",
            json={
                "email": HOTEL_ADMIN_EMAIL,
                "password": HOTEL_ADMIN_PASSWORD
            }
        )
        if response.status_code != 200:
            pytest.skip(f"Login failed: {response.text}")
        return session
    
    def test_get_admin_me(self, authenticated_session):
        """Test /api/site-admin/me endpoint returns admin info"""
        response = authenticated_session.get(f"{BASE_URL}/api/site-admin/me")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert 'admin' in data
        assert 'site' in data
        assert data['site'].get('site_type') == 'hotel'
        
        print(f"PASS: /api/site-admin/me returns correct data")
    
    def test_get_site_config(self, authenticated_session):
        """Test getting site config with room_prices"""
        response = authenticated_session.get(f"{BASE_URL}/api/site-admin/config")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        config = response.json()
        assert 'room_prices' in config, "Config should contain room_prices"
        
        room_prices = config['room_prices']
        assert len(room_prices) >= 3, f"Expected at least 3 room types"
        
        print(f"PASS: Site config contains {len(room_prices)} room prices")
    
    def test_update_room_prices(self, authenticated_session):
        """Test updating room prices via PUT /api/site-admin/config"""
        # First get current config
        get_response = authenticated_session.get(f"{BASE_URL}/api/site-admin/config")
        assert get_response.status_code == 200
        
        current_config = get_response.json()
        current_room_prices = current_config.get('room_prices', [])
        
        # Modify a price (add $1 to first room)
        if current_room_prices:
            original_price = current_room_prices[0]['price']
            test_price = original_price + 1
            current_room_prices[0]['price'] = test_price
            
            # Update config
            update_response = authenticated_session.put(
                f"{BASE_URL}/api/site-admin/config",
                json={"room_prices": current_room_prices}
            )
            
            assert update_response.status_code == 200, f"Update failed: {update_response.text}"
            
            # Verify update persisted
            verify_response = authenticated_session.get(f"{BASE_URL}/api/site-admin/config")
            assert verify_response.status_code == 200
            
            updated_prices = verify_response.json().get('room_prices', [])
            assert updated_prices[0]['price'] == test_price, "Price update not persisted"
            
            # Restore original price
            current_room_prices[0]['price'] = original_price
            authenticated_session.put(
                f"{BASE_URL}/api/site-admin/config",
                json={"room_prices": current_room_prices}
            )
            
            print(f"PASS: Room price update works (tested {original_price} -> {test_price} -> {original_price})")


class TestFWorksPortfolio:
    """Test FWorks portfolio includes Hotel del Pacifico"""
    
    def test_fworks_site_exists(self):
        """Verify FWorks site exists"""
        response = requests.get(f"{BASE_URL}/api/public/site/fworks")
        assert response.status_code == 200, f"FWorks site not found: {response.status_code}"
        
        data = response.json()
        assert data['site'].get('slug') == 'fworks'
        print("PASS: FWorks site exists")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
