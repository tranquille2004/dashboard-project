import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn } from 'lucide-react';

const FWORKS_LOGO = 'https://customer-assets.emergentagent.com/job_c5f93e02-948a-4de4-99bb-a726a04220a7/artifacts/d9j7q5w4_fworksbuilders4.gif';

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
          <img 
            src={FWORKS_LOGO} 
            alt="fworks builders" 
            className="h-24 w-auto mx-auto mb-6"
          />
          
          <p className="text-gray-600 mb-8">Connectez-vous pour gérer vos sites</p>
          
          {loading ? (
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          ) : (
            <button
              onClick={login}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              data-testid="login-btn"
            >
              <LogIn className="w-5 h-5" />
              <span>Se connecter avec Google</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
