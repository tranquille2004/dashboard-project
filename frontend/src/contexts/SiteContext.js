import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const SiteContext = createContext(null);

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within SiteProvider');
  }
  return context;
};

export const SiteProvider = ({ children }) => {
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSite = async () => {
      try {
        // Check if we're on the admin panel
        if (window.location.pathname.startsWith('/admin')) {
          setLoading(false);
          return;
        }

        // Get current hostname
        const hostname = window.location.hostname;
        
        // Check for slug in URL (for preview: /site/cantina)
        const pathMatch = window.location.pathname.match(/^\/site\/([^/]+)/);
        
        if (pathMatch) {
          // Load by slug
          const response = await axios.get(`${API}/public/site/${pathMatch[1]}`);
          setSiteData(response.data);
        } else if (hostname !== 'localhost' && !hostname.includes('preview.emergentagent.com')) {
          // Load by domain (production)
          const response = await axios.get(`${API}/public/site-by-domain?domain=${hostname}`);
          if (response.data) {
            setSiteData(response.data);
          }
        }
      } catch (err) {
        console.error('Error loading site:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSite();
  }, []);

  const value = {
    siteData,
    setSiteData,
    loading,
    error,
    site: siteData?.site,
    config: siteData?.config,
    menuItems: siteData?.menu_items || [],
    groupMenus: siteData?.group_menus || [],
    gallery: siteData?.gallery || []
  };

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
};

export default SiteContext;
