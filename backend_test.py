import requests
import sys
import os
import json
from datetime import datetime

class MultiTenantAPITester:
    def __init__(self, base_url="https://dutch-learn-2.preview.emergentagent.com/api"):
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