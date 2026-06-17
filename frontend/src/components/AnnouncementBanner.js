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
    <div 
      className="announcement-banner fixed left-0 right-0 z-40 flex items-center justify-center gap-2 sm:gap-4 px-3 py-2 sm:px-8 sm:py-4 shadow-lg"
      style={{
        background: currentStyle.background,
        color: currentStyle.textColor,
        top: '80px',
      }}
      data-testid="announcement-banner"
    >
      <IconComponent 
        className="flex-shrink-0 w-4 h-4 sm:w-7 sm:h-7"
        data-testid="announcement-icon"
      />
      <p 
        className="m-0 text-xs sm:text-lg font-semibold text-center leading-snug"
        data-testid="announcement-message"
      >
        {message}
      </p>
      {dismissible && (
        <button
          onClick={handleClose}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 border-0 rounded-full p-1 sm:p-1.5 cursor-pointer flex items-center justify-center transition-colors"
          aria-label="Sluiten"
          data-testid="announcement-close-btn"
        >
          <X size={14} color={currentStyle.textColor} />
        </button>
      )}
    </div>
  );
};

export default AnnouncementBanner;
