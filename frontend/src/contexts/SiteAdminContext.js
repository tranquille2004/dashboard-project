import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const SiteAdminContext = createContext(null);

export const useSiteAdmin = () => {
  const context = useContext(SiteAdminContext);
  if (!context) {
    throw new Error('useSiteAdmin must be used within SiteAdminProvider');
  }
  return context;
};

export const SiteAdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/site-admin/me`, {
        withCredentials: true
      });
      setAdmin(response.data.admin);
      setSite(response.data.site);
    } catch (error) {
      setAdmin(null);
      setSite(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    const response = await axios.post(`${API}/site-admin/login`, 
      { email, password },
      { withCredentials: true }
    );
    setAdmin(response.data.admin);
    setSite(response.data.site);
    return response.data;
  };

  const logout = async () => {
    try {
      await axios.post(`${API}/site-admin/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
    setAdmin(null);
    setSite(null);
  };

  const hasPermission = (permission) => {
    return admin?.permissions?.[permission] === true;
  };

  const value = {
    admin,
    site,
    loading,
    login,
    logout,
    checkAuth,
    hasPermission
  };

  return (
    <SiteAdminContext.Provider value={value}>
      {children}
    </SiteAdminContext.Provider>
  );
};

export default SiteAdminContext;
