// Helper for production image paths
export const IMG = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  // Check if window exists (server-side rendering check)
  if (typeof window === 'undefined') return path;
  
  // On production domains, route through the API proxy
  const hostname = window.location.hostname.toLowerCase();
  const isProduction = hostname.includes('.emergent.host') || 
                       hostname.includes('theobeans-export.com') || 
                       hostname.includes('theobeans.expert');
  
  if (isProduction && path.startsWith('/images/')) {
    return '/api' + path;
  }
  return path;
};

export default IMG;
