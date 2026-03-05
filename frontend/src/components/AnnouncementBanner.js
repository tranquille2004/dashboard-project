import React, { useState, useEffect } from 'react';
import { Info, AlertTriangle, CheckCircle, X } from 'lucide-react';

/**
 * AnnouncementBanner - Displays a special announcement banner on the website
 * 
 * @param {string} message - The announcement text to display
 * @param {string} type - The type of announcement: 'info' | 'warning' | 'success'
 * @param {boolean} active - Whether the announcement should be displayed
 * @param {function} onClose - Optional callback when user closes the banner
 * @param {boolean} dismissible - Whether the banner can be dismissed (default: false)
 */
const AnnouncementBanner = ({ 
  message, 
  type = 'info', 
  active = false, 
  onClose,
  dismissible = false 
}) => {
  const [dismissed, setDismissed] = useState(false);

  // Reset dismissed state when message changes
  useEffect(() => {
    setDismissed(false);
  }, [message]);

  if (!active || !message || dismissed) {
    return null;
  }

  const styles = {
    info: {
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      textColor: '#ffffff',
      icon: Info,
      borderColor: '#1e3a8a'
    },
    warning: {
      background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
      textColor: '#ffffff',
      icon: AlertTriangle,
      borderColor: '#b45309'
    },
    success: {
      background: 'linear-gradient(135deg, #047857 0%, #10b981 100%)',
      textColor: '#ffffff',
      icon: CheckCircle,
      borderColor: '#065f46'
    }
  };

  const currentStyle = styles[type] || styles.info;
  const IconComponent = currentStyle.icon;

  const handleClose = () => {
    setDismissed(true);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Fixed banner at top */}
      <div 
        className="announcement-banner"
        style={{
          background: currentStyle.background,
          color: currentStyle.textColor,
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 1100
        }}
        data-testid="announcement-banner"
      >
        <IconComponent 
          size={20} 
          style={{ flexShrink: 0 }}
          data-testid="announcement-icon"
        />
        <p 
          style={{
            margin: 0,
            fontSize: '15px',
            fontWeight: 500,
            textAlign: 'center',
            lineHeight: 1.5
          }}
          data-testid="announcement-message"
        >
          {message}
        </p>
        {dismissible && (
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            aria-label="Sluiten"
            data-testid="announcement-close-btn"
          >
            <X size={16} color={currentStyle.textColor} />
          </button>
        )}
      </div>
      {/* Spacer to push content down */}
      <div style={{ height: '48px' }} data-testid="announcement-spacer" />
    </>
  );
};

export default AnnouncementBanner;
