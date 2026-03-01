import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const hasProcessed = useRef(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use ref to prevent double processing in StrictMode
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processAuth = async () => {
      try {
        // Extract session_id from URL fragment
        const hash = location.hash;
        const sessionIdMatch = hash.match(/session_id=([^&]+)/);
        
        if (!sessionIdMatch) {
          throw new Error('No session_id found');
        }

        const sessionId = sessionIdMatch[1];

        // Exchange session_id for session_token
        const response = await axios.post(
          `${API}/auth/session`,
          { session_id: sessionId },
          { withCredentials: true }
        );

        setUser(response.data);
        
        // Clear the hash and redirect to admin
        window.history.replaceState(null, '', '/admin');
        navigate('/admin', { replace: true, state: { user: response.data } });
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(err.message);
        setTimeout(() => navigate('/'), 3000);
      }
    };

    processAuth();
  }, [location, navigate, setUser]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-red-500 text-xl mb-4">Authenticatie Mislukt</div>
          <p className="text-gray-600">{error}</p>
          <p className="text-gray-500 mt-2">Doorsturen naar homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Aanmelden...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
