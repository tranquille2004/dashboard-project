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
  'www.albertopantoja.ec': '/site/albertopantoja',
  'hoteldelpacifico.net': '/site/hoteldelpacifico',
  'www.hoteldelpacifico.net': '/site/hoteldelpacifico'
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
  '/site/albertopantoja': 'Alberto Pantoja - Consejal de Santo Domingo',
  '/site/hoteldelpacifico': 'Hotel del Pacífico - Santo Domingo, Ecuador'
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
    
    // API CALLS: Proxy directly to backend
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
    
    // IMAGES: Proxy /images/ to /api/images/
    // FIX: Alleen 200 responses cachen, 404s NIET cachen
    if (pathname.startsWith('/images/')) {
      const apiUrl = PREVIEW_URL + '/api' + pathname;
      try {
        const response = await fetch(apiUrl);
        const cacheControl = response.ok
          ? 'public, max-age=31536000'
          : 'no-cache, no-store, must-revalidate';
        return new Response(response.body, {
          status: response.status,
          headers: {
            'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
            'Cache-Control': cacheControl,
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (e) {
        return new Response('Image not found', { status: 404, headers: { 'Cache-Control': 'no-cache' } });
      }
    }
    
    // SEO FILES
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
    
    // FWorksBuilders.com /admin -> redirect to emergent.host admin (auth cookies only work there)
    if ((hostname === 'fworksbuilders.com' || hostname === 'www.fworksbuilders.com') && 
        (pathname === '/admin' || pathname.startsWith('/admin/'))) {
      return Response.redirect(PREVIEW_URL + pathname + url.search, 302);
    }
    
    // FWorksBuilders.com /static -> proxy for admin assets
    if ((hostname === 'fworksbuilders.com' || hostname === 'www.fworksbuilders.com') && 
        pathname.startsWith('/static/')) {
      const targetUrl = PREVIEW_URL + pathname + url.search;
      try {
        const response = await fetch(targetUrl, {
          method: request.method,
          headers: {
            'Accept': request.headers.get('Accept') || '*/*',
            'Accept-Encoding': request.headers.get('Accept-Encoding') || 'gzip, deflate, br',
            'User-Agent': request.headers.get('User-Agent') || 'Mozilla/5.0'
          }
        });
        
        const newHeaders = new Headers(response.headers);
        if (pathname.endsWith('.js')) {
          newHeaders.set('Content-Type', 'application/javascript');
        } else if (pathname.endsWith('.css')) {
          newHeaders.set('Content-Type', 'text/css');
        }
        
        return new Response(response.body, {
          status: response.status,
          headers: newHeaders
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
    
    // Build iframe for site
    let iframeSrc = PREVIEW_URL + sitePath;
    if (pathname !== '/' && pathname !== '') {
      iframeSrc = iframeSrc + pathname;
    }
    if (url.search) {
      iframeSrc = iframeSrc + url.search;
    }
    
    const siteTitle = SITE_TITLES[sitePath] || 'Laden...';
    const siteSlug = sitePath.replace('/site/', '');
    
    const html = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <meta name="theme-color" content="#ffffff">
  <title>${siteTitle}</title>
  <style>
    :root { color-scheme: light only; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #ffffff;
      color-scheme: light only;
      -webkit-text-size-adjust: 100%;
      forced-color-adjust: none;
    }
    iframe { width: 100%; height: 100%; border: none; color-scheme: light only; }
    @media (prefers-color-scheme: dark) {
      html, body { background: #ffffff !important; }
    }
  </style>
</head>
<body>
  <iframe id="site-frame" src="${iframeSrc}" allowfullscreen></iframe>
  <script>
    const iframe = document.getElementById('site-frame');
    const sitePrefix = '/site/${siteSlug}';
    
    window.addEventListener('message', function(event) {
      if (event.origin !== '${PREVIEW_URL}') return;
      if (event.data && event.data.type === 'navigation') {
        let newPath = event.data.path || '/';
        if (newPath.startsWith(sitePrefix)) {
          newPath = newPath.substring(sitePrefix.length) || '/';
        }
        if (newPath !== window.location.pathname) {
          window.history.pushState({}, '', newPath);
        }
      }
    });
    
    window.addEventListener('popstate', function() {
      iframe.src = '${PREVIEW_URL}' + sitePrefix + window.location.pathname;
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
