// Cloudflare Worker: site-proxy-new
// FINAL VERSION - Met URL synchronisatie en API proxy
const PREVIEW_URL = 'https://fworks-consolidate-1.emergent.host';

const SITE_MAPPING = {
  'labottegaherent.com': '/site/bottega',
  'www.labottegaherent.com': '/site/bottega',
  'lacantinaitaliana.net': '/site/cantina',
  'www.lacantinaitaliana.net': '/site/cantina',
  'ascolizaventem.com': '/site/ascoli',
  'www.ascolizaventem.com': '/site/ascoli',
  'ristorantemercato.be': '/site/mercato',
  'www.ristorantemercato.be': '/site/mercato',
  'tracemaster-rastreadores.com': '/site/tracemaster',
  'www.tracemaster-rastreadores.com': '/site/tracemaster',
  'theobeans-export.com': '/site/theobeans',
  'www.theobeans-export.com': '/site/theobeans',
  'fworksbuilders.com': '/site/fworks',
  'www.fworksbuilders.com': '/site/fworks',
  'smeraldavacanze.it': '/site/smeralda',
  'www.smeraldavacanze.it': '/site/smeralda',
  'albertopantoja.com': '/site/albertopantoja',
  'www.albertopantoja.com': '/site/albertopantoja',
  'albertopantoja.ec': '/site/albertopantoja',
  'www.albertopantoja.ec': '/site/albertopantoja'
};

const SITE_TITLES = {
  '/site/bottega': 'La Bottega Italiana Herent',
  '/site/cantina': 'La Cantina Italiana Tervuren',
  '/site/ascoli': "L'Ascoli Zaventem",
  '/site/mercato': 'Ristorante Mercato',
  '/site/tracemaster': 'Tracemaster GPS',
  '/site/theobeans': 'Theo Beans Export',
  '/site/fworks': 'fworksbuilders - Web Design',
  '/site/smeralda': 'Résidence Villa Smeralda - Sardinia',
  '/site/albertopantoja': 'Alberto Pantoja - La Voz del Campo'
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const hostname = url.hostname;
    const pathname = url.pathname;
    
    const sitePath = SITE_MAPPING[hostname];
    
    if (!sitePath) {
      return new Response('Site not found', { status: 404 });
    }
    
    // API CALLS: Proxy directly to backend (for auth, etc.)
    if (pathname.startsWith('/api/')) {
      const apiUrl = PREVIEW_URL + pathname + url.search;
      try {
        const response = await fetch(apiUrl, {
          method: request.method,
          headers: {
            'Content-Type': request.headers.get('Content-Type') || 'application/json',
            'Host': hostname,
            'Origin': request.headers.get('Origin') || '',
            'Cookie': request.headers.get('Cookie') || ''
          },
          body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.text() : undefined
        });
        
        // Copy response headers and add CORS
        const responseHeaders = new Headers(response.headers);
        responseHeaders.set('Access-Control-Allow-Origin', request.headers.get('Origin') || '*');
        responseHeaders.set('Access-Control-Allow-Credentials', 'true');
        
        return new Response(response.body, {
          status: response.status,
          headers: responseHeaders
        });
      } catch (e) {
        return new Response('API Error: ' + e.message, { status: 500 });
      }
    }
    
    // IMAGES: Proxy to backend API which serves from Object Storage
    if (pathname.startsWith('/images/')) {
      const apiUrl = PREVIEW_URL + '/api' + pathname;
      try {
        const response = await fetch(apiUrl);
        return new Response(response.body, {
          status: response.status,
          headers: {
            'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
            'Cache-Control': 'public, max-age=31536000',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (e) {
        return new Response('Image not found', { status: 404 });
      }
    }
    
    // SEO FILES: Proxy directly to backend API
    if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
      const apiUrl = PREVIEW_URL + '/api' + pathname;
      try {
        const response = await fetch(apiUrl, {
          headers: { 'Host': hostname }
        });
        return new Response(response.body, {
          headers: {
            'Content-Type': pathname === '/robots.txt' ? 'text/plain' : 'application/xml',
            'Cache-Control': 'public, max-age=86400'
          }
        });
      } catch (e) {
        return new Response('Error fetching ' + pathname, { status: 500 });
      }
    }
    
    // FWorksBuilders.com /admin -> super admin dashboard (direct proxy, no iframe)
    if ((hostname === 'fworksbuilders.com' || hostname === 'www.fworksbuilders.com') && 
        (pathname === '/admin' || pathname.startsWith('/admin'))) {
      const targetUrl = PREVIEW_URL + pathname + url.search + url.hash;
      try {
        const response = await fetch(targetUrl, {
          method: request.method,
          headers: request.headers
        });
        return new Response(response.body, {
          status: response.status,
          headers: response.headers
        });
      } catch (e) {
        return new Response('Error loading admin: ' + e.message, { status: 500 });
      }
    }
    
    // Restaurant /admin -> restaurant login
    if (sitePath !== '/site/fworks' && (pathname === '/admin' || pathname === '/admin/')) {
      const siteSlug = sitePath.replace('/site/', '');
      return Response.redirect(PREVIEW_URL + '/restaurant-login?site=' + siteSlug, 302);
    }
    
    // Build iframe URL - include the pathname from the request
    let iframeSrc = PREVIEW_URL + sitePath;
    if (pathname !== '/' && pathname !== '') {
      iframeSrc = iframeSrc + pathname;
    }
    if (url.search) {
      iframeSrc = iframeSrc + url.search;
    }
    
    // Get the correct title for this site
    const siteTitle = SITE_TITLES[sitePath] || 'Laden...';
    const siteSlug = sitePath.replace('/site/', '');
    
    // Return iframe HTML with URL sync script
    const html = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${siteTitle}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; }
    iframe { width: 100%; height: 100%; border: none; }
  </style>
</head>
<body>
  <iframe id="site-frame" src="${iframeSrc}" allowfullscreen></iframe>
  <script>
    // URL Synchronization Script
    const iframe = document.getElementById('site-frame');
    const sitePrefix = '/site/${siteSlug}';
    
    // Listen for navigation messages from the iframe
    window.addEventListener('message', function(event) {
      // Only accept messages from our app
      if (event.origin !== '${PREVIEW_URL}') return;
      
      if (event.data && event.data.type === 'navigation') {
        let newPath = event.data.path || '/';
        // Remove the site prefix to get the clean path
        if (newPath.startsWith(sitePrefix)) {
          newPath = newPath.substring(sitePrefix.length) || '/';
        }
        // Update browser URL without reload
        if (newPath !== window.location.pathname) {
          window.history.pushState({}, '', newPath);
        }
      }
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
      const newPath = window.location.pathname;
      iframe.src = '${PREVIEW_URL}' + sitePrefix + newPath;
    });
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }
};
