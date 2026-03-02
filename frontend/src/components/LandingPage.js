import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Globe, LogIn } from 'lucide-react';

const LandingPage = () => {
  const { user, login, loading } = useAuth();

  // Als ingelogd, direct naar admin
  if (!loading && user) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe className="w-8 h-8 text-blue-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Website Beheer</h1>
          <p className="text-gray-600 mb-8">Log in om je websites te beheren</p>
          
          {loading ? (
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          ) : (
            <button
              onClick={login}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              data-testid="login-btn"
            >
              <LogIn className="w-5 h-5" />
              <span>Inloggen met Google</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
