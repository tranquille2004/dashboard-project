import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * URLSync component - Sends navigation events to parent window (Cloudflare Worker iframe)
 * This enables URL synchronization between the iframe and the parent browser URL
 */
const URLSync = () => {
  const location = useLocation();

  useEffect(() => {
    // Only send messages if we're in an iframe
    if (window.parent !== window) {
      try {
        window.parent.postMessage({
          type: 'navigation',
          path: location.pathname + location.search + location.hash
        }, '*');
      } catch (e) {
        // Ignore cross-origin errors
      }
    }
  }, [location]);

  return null;
};

export default URLSync;
