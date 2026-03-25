/**
 * Image URL Helper
 * 
 * On production (.emergent.host), static /images/ paths don't work 
 * because the frontend catches all routes. We use /api/images/ instead.
 */

// Check if we're on the Emergent production deployment
const isProduction = () => {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  return hostname.includes('.emergent.host');
};

/**
 * Convert an image path to the correct URL
 * @param {string} path - Image path like '/images/smeralda/hero.jpg'
 * @returns {string} - Correct URL for the environment
 */
export const getImageUrl = (path) => {
  if (!path) return '';
  
  // If it's already an absolute URL, return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // If it starts with /images/, convert to /api/images/ on production
  if (path.startsWith('/images/') && isProduction()) {
    return '/api' + path;
  }
  
  return path;
};

// Shorthand alias
export const IMG = getImageUrl;

export default getImageUrl;

