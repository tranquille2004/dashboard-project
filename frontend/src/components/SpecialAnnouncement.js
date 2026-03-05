import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

// Herbruikbaar component voor speciale aankondiging op alle sites
const SpecialAnnouncement = ({ siteSlug }) => {
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await axios.get(`${API}/public/site/${siteSlug}/announcement`);
        if (res.data && res.data.active && res.data.message) {
          setAnnouncement(res.data);
        }
      } catch (error) {
        // Silently fail - announcement is optional
        console.log('No announcement available');
      } finally {
        setLoading(false);
      }
    };
    
    if (siteSlug) {
      fetchAnnouncement();
    }
  }, [siteSlug]);

  if (loading || !announcement) return null;

  const typeStyles = {
    info: {
      bg: 'bg-blue-50 border-blue-400',
      text: 'text-blue-800',
      icon: 'ℹ️'
    },
    warning: {
      bg: 'bg-orange-50 border-orange-400',
      text: 'text-orange-800',
      icon: '⚠️'
    },
    success: {
      bg: 'bg-green-50 border-green-400',
      text: 'text-green-800',
      icon: '✅'
    }
  };

  const style = typeStyles[announcement.type] || typeStyles.info;

  return (
    <div 
      className={`${style.bg} border-l-4 p-4 mb-6 rounded-r-lg shadow-sm`}
      data-testid="special-announcement"
    >
      <div className="flex items-start">
        <span className="text-2xl mr-3 flex-shrink-0">{style.icon}</span>
        <div className={`${style.text} flex-1`}>
          <p className="font-medium text-base whitespace-pre-line">
            {announcement.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpecialAnnouncement;
