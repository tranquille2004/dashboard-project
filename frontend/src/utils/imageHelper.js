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

/**
 * Build an EXTERNAL link URL — used for `<a target="_blank">` and downloads.
 *
 * Problem: when this app runs inside the Cloudflare Worker iframe,
 *   window.location.hostname === 'fworks-consolidate-1.emergent.host'
 * but the visitor's address bar shows e.g. 'hoteldelpacifico.net'.
 * Using a relative path in `<a target="_blank">` would open the iframe-host URL
 * in a new tab, exposing the internal Emergent URL.
 *
 * Solution: when inside an iframe, use `document.referrer` to get the parent's
 * origin (the public domain), and prepend it. The Worker then proxies the
 * /images/... path transparently.
 *
 * @param {string} path - e.g. '/images/hoteldelpacifico/documents/menu.pdf'
 * @returns {string} - Public URL like 'https://hoteldelpacifico.net/images/...'
 */
export const EXTERNAL_URL = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (typeof window === 'undefined') return path;
  // Inside an iframe? Use the parent (public) origin
  if (window !== window.top && document.referrer) {
    try {
      const parentOrigin = new URL(document.referrer).origin;
      return parentOrigin + path;
    } catch (e) { /* fall through */ }
  }
  // Top-level (preview or direct): build absolute from current origin
  return window.location.origin + path;
};

export default getImageUrl;

