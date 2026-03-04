import requests
import sys
import os
import json
from datetime import datetime

class MultiTenantAPITester:
    def __init__(self, base_url="https://bottega-staging-1.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.errors = []
        self.site_admin_token = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        request_headers = {'Content-Type': 'application/json'}
        if headers:
            request_headers.update(headers)

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=request_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=request_headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=request_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=request_headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, dict):
                        # Show key information about the response
                        if 'site' in response_data:
                            site = response_data['site']
                            print(f"   Site: {site.get('name')} ({site.get('slug')})")
                        elif 'status' in response_data:
                            print(f"   Status: {response_data['status']}")
                        elif 'message' in response_data:
                            print(f"   Message: {response_data['message']}")
                except:
                    pass
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_body = response.json()
                    print(f"   Error: {error_body}")
                    self.errors.append({
                        "endpoint": endpoint,
                        "expected": expected_status,
                        "actual": response.status_code,
                        "error": error_body
                    })
                except:
                    print(f"   Raw response: {response.text[:200]}")
                    self.errors.append({
                        "endpoint": endpoint,
                        "expected": expected_status,
                        "actual": response.status_code,
                        "error": response.text[:200]
                    })

            return success, response

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.errors.append({
                "endpoint": endpoint,
                "error": str(e)
            })
            return False, None

    def test_health(self):
        """Test health endpoint"""
        return self.run_test("Health Check", "GET", "health", 200)

    def test_root_api(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_cantina_site(self):
        """Test La Cantina site data"""
        success, response = self.run_test("La Cantina Site", "GET", "public/site/cantina", 200)
        if success and response:
            try:
                data = response.json()
                site = data.get('site', {})
                config = data.get('config', {})
                
                # Verify this is La Cantina
                if 'cantina' not in site.get('name', '').lower():
                    print(f"⚠️  Warning: Expected La Cantina, got {site.get('name')}")
                
                # Check reservation feature
                has_reservations = config.get('has_reservations', False)
                has_takeaway = config.get('has_takeaway', False)
                print(f"   Features: Reservations={has_reservations}, Takeaway={has_takeaway}")
                
                if has_reservations and not has_takeaway:
                    print("✅ Cantina correctly configured: Reservations only")
                else:
                    print("⚠️  Warning: Cantina should have reservations=True, takeaway=False")
                    
            except Exception as e:
                print(f"   Error parsing response: {e}")
        
        return success, response

    def test_bottega_site(self):
        """Test La Bottega site data"""
        success, response = self.run_test("La Bottega Site", "GET", "public/site/bottega", 200)
        if success and response:
            try:
                data = response.json()
                site = data.get('site', {})
                config = data.get('config', {})
                
                # Verify this is La Bottega
                if 'bottega' not in site.get('name', '').lower():
                    print(f"⚠️  Warning: Expected La Bottega, got {site.get('name')}")
                
                # Check both features should be enabled
                has_reservations = config.get('has_reservations', False)
                has_takeaway = config.get('has_takeaway', False)
                print(f"   Features: Reservations={has_reservations}, Takeaway={has_takeaway}")
                
                if has_reservations and has_takeaway:
                    print("✅ Bottega correctly configured: Both Reservations and Takeaway")
                else:
                    print("⚠️  Warning: Bottega should have both reservations=True and takeaway=True")
                    
            except Exception as e:
                print(f"   Error parsing response: {e}")
        
        return success, response

    def test_public_sites_list(self):
        """Test public sites listing"""
        return self.run_test("Public Sites List", "GET", "public/sites", 200)

    def test_site_admin_login_invalid(self):
        """Test site admin login with invalid credentials"""
        success, response = self.run_test(
            "Site Admin Login (Invalid)",
            "POST",
            "site-admin/login",
            401,
            {"email": "invalid@test.com", "password": "wrongpass"}
        )
        return success, response

    def test_site_admin_login_valid(self):
        """Test site admin login with valid test credentials"""
        print(f"\n🔍 Testing Site Admin Login (Valid)...")
        url = f"{self.base_url}/site-admin/login"
        print(f"   URL: {url}")
        
        self.tests_run += 1
        try:
            response = requests.post(
                url,
                json={"email": "bottega@test.be", "password": "test123"},
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            success = response.status_code == 200
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Extract session token from cookies
                self.site_admin_token = response.cookies.get('site_admin_token')
                if self.site_admin_token:
                    print(f"   Session token obtained: {self.site_admin_token[:10]}...")
                
                # Verify response data
                try:
                    data = response.json()
                    if 'admin' in data and 'site' in data:
                        admin = data['admin']
                        site = data['site']
                        print(f"   Admin: {admin['name']} ({admin['email']})")
                        print(f"   Site: {site['name']} ({site.get('slug', 'no-slug')})")
                        
                        # Verify it's the correct test account
                        if admin['email'] == 'bottega@test.be' and site['name'] == 'La Bottega':
                            print(f"   ✅ Correct test account and site data")
                        else:
                            print(f"   ⚠️  Unexpected data: expected bottega@test.be/La Bottega")
                            
                        # Check permissions
                        if 'permissions' in admin:
                            perms = admin['permissions']
                            enabled_perms = [k for k, v in perms.items() if v]
                            print(f"   Permissions: {', '.join(enabled_perms)}")
                    else:
                        print(f"   ⚠️  Missing admin or site data in response")
                except Exception as e:
                    print(f"   Error parsing response: {e}")
            else:
                print(f"❌ Failed - Status: {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                    self.errors.append({
                        'endpoint': 'site-admin/login',
                        'error': f"Status {response.status_code}: {error_data}"
                    })
                except:
                    print(f"   Raw response: {response.text}")
                    self.errors.append({
                        'endpoint': 'site-admin/login', 
                        'error': f"Status {response.status_code}: {response.text}"
                    })
                    
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.errors.append({
                'endpoint': 'site-admin/login',
                'error': str(e)
            })
        
        return success, response if 'response' in locals() else None

    def test_site_admin_me(self):
        """Test site admin /me endpoint"""
        if not self.site_admin_token:
            print(f"\n🔍 Testing Site Admin Me...")
            print(f"❌ Failed - No session token available")
            self.tests_run += 1
            return False, None
        
        print(f"\n🔍 Testing Site Admin Me...")
        url = f"{self.base_url}/site-admin/me"
        print(f"   URL: {url}")
        
        self.tests_run += 1
        try:
            response = requests.get(
                url,
                cookies={'site_admin_token': self.site_admin_token},
                timeout=10
            )
            
            success = response.status_code == 200
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                try:
                    data = response.json()
                    if 'admin' in data and 'site' in data:
                        admin = data['admin']
                        site = data['site']
                        print(f"   Admin: {admin['name']} ({admin['email']})")
                        print(f"   Site: {site['name']} ({site.get('slug', 'no-slug')})")
                        
                        # Verify consistency with login
                        if admin['email'] == 'bottega@test.be' and site['name'] == 'La Bottega':
                            print(f"   ✅ Consistent with login data")
                        else:
                            print(f"   ⚠️  Data inconsistency detected")
                    else:
                        print(f"   ⚠️  Missing admin or site data")
                except Exception as e:
                    print(f"   Error parsing response: {e}")
            else:
                print(f"❌ Failed - Status: {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Raw response: {response.text}")
                    
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            success = False
        
        return success, response if 'response' in locals() else None

    def test_site_admin_protected_endpoints(self):
        """Test that site admin endpoints are protected"""
        print(f"\n🔍 Testing Site Admin Protected Endpoints...")
        
        endpoints = [
            "site-admin/me",
            "site-admin/config", 
            "site-admin/menu",
            "site-admin/gallery"
        ]
        
        all_protected = True
        
        for endpoint in endpoints:
            self.tests_run += 1
            try:
                url = f"{self.base_url}/{endpoint}"
                response = requests.get(url, timeout=10)
                
                if response.status_code == 401:
                    self.tests_passed += 1
                    print(f"   ✅ {endpoint}: Protected (401)")
                else:
                    print(f"   ❌ {endpoint}: Not protected ({response.status_code})")
                    all_protected = False
                    self.errors.append({
                        'endpoint': endpoint,
                        'error': f"Not protected - returned {response.status_code} instead of 401"
                    })
            except Exception as e:
                print(f"   ❌ {endpoint}: Error - {str(e)}")
                all_protected = False
                self.errors.append({
                    'endpoint': endpoint,
                    'error': str(e)
                })
        
        return all_protected

    def run_all_tests(self):
        """Run all API tests"""
        print(f"🚀 Starting Multi-Tenant API Testing...")
        print(f"📍 Base URL: {self.base_url}")
        print("=" * 60)

        # Basic API tests
        self.test_health()
        self.test_root_api()
        
        # Site-specific tests  
        self.test_cantina_site()
        self.test_bottega_site()
        
        # Public endpoints
        self.test_public_sites_list()
        
        # Site Admin Authentication Tests
        print(f"\n🔐 SITE ADMIN AUTHENTICATION TESTS")
        print("=" * 60)
        
        self.test_site_admin_protected_endpoints()
        self.test_site_admin_login_invalid()
        
        # Test valid login and authenticated access
        login_success, _ = self.test_site_admin_login_valid()
        if login_success:
            self.test_site_admin_me()
        else:
            print(f"⚠️  Skipping authenticated site admin tests due to login failure")

        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.errors:
            print("\n❌ Errors found:")
            for error in self.errors:
                print(f"   • {error.get('endpoint', 'Unknown')}: {error.get('error', 'Unknown error')}")
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"✅ Success rate: {success_rate:.1f}%")
        
        return self.tests_passed == self.tests_run

def main():
    tester = MultiTenantAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())