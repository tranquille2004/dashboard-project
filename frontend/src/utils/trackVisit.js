// Track website visits
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const trackVisit = async (siteSlug) => {
  try {
    await fetch(`${BACKEND_URL}/api/public/track-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site_slug: siteSlug })
    });
  } catch (error) {
    // Silent fail - don't affect user experience
    console.debug('Visit tracking failed:', error);
  }
};
