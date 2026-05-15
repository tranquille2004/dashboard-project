// Cloudflare Worker: site-proxy-new
// FINAL VERSION - Met URL synchronisatie en API proxy
const PREVIEW_URL = 'https://fworks-consolidate-1.emergent.host';

// Domeinen die alleen een "In Constructie" pagina tonen (klant nog niet akkoord)
const IN_CONSTRUCTION = new Set([
  'sanfrancisco-haciendaturistica.com',
  'www.sanfrancisco-haciendaturistica.com'
]);

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
  'www.hoteldelpacifico.net': '/site/hoteldelpacifico',
  'rccb.fworksbuilders.com': '/site/rccb',
  'rccbgroup.be': '/site/rccb',
  'www.rccbgroup.be': '/site/rccb',
  'ilsiciliano.fworksbuilders.com': '/site/ilsiciliano',
  'ilsiciliano.ec': '/site/ilsiciliano',
  'www.ilsiciliano.ec': '/site/ilsiciliano',
  'sanfrancisco.fworksbuilders.com': '/site/sanfrancisco',
  'sanfrancisco-haciendaturistica.com': '/site/sanfrancisco',
  'www.sanfrancisco-haciendaturistica.com': '/site/sanfrancisco'
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
  '/site/hoteldelpacifico': 'Hotel del Pacífico - Santo Domingo, Ecuador',
  '/site/rccb': 'RCCB - Retail Cleaning Care Belgium',
  '/site/ilsiciliano': 'Il Siciliano — Trattoria Pizzería — Santo Domingo, Ecuador',
  '/site/sanfrancisco': 'Club San Francisco — Hacienda Turística'
};

function renderInConstruction() {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Club San Francisco — Próximamente</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      min-height: 100vh;
      background: #0a0a0a;
      color: #f5efe0;
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
    }
    .bg {
      position: fixed; inset: 0;
      background: radial-gradient(ellipse at top, #1a3a2a 0%, #0a0a0a 60%);
      z-index: 0;
    }
    .bg::after {
      content: '';
      position: absolute; inset: 0;
      background-image:
        radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.06) 0%, transparent 40%);
    }
    .container {
      position: relative; z-index: 1;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
    }
    .badge {
      display: inline-block;
      padding: 0.5rem 1.25rem;
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 999px;
      color: #d4af37;
      font-size: 0.75rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      margin-bottom: 2.5rem;
    }
    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2.5rem, 7vw, 5.5rem);
      font-weight: 500;
      line-height: 1.05;
      color: #f5efe0;
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }
    h1 .accent {
      display: block;
      color: #d4af37;
      font-style: italic;
      font-weight: 400;
    }
    .divider {
      width: 60px;
      height: 1px;
      background: #d4af37;
      margin: 2rem auto;
    }
    .tagline {
      font-size: 1.1rem;
      color: rgba(245, 239, 224, 0.7);
      max-width: 600px;
      line-height: 1.7;
      font-weight: 300;
      margin-bottom: 3rem;
    }
    .meta {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
      justify-content: center;
      font-size: 0.85rem;
      color: rgba(245, 239, 224, 0.5);
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }
    .meta span { display: flex; align-items: center; gap: 0.5rem; }
    .meta .dot { width: 4px; height: 4px; background: #d4af37; border-radius: 50%; }
    footer {
      position: absolute;
      bottom: 1.5rem;
      left: 0; right: 0;
      text-align: center;
      font-size: 0.75rem;
      color: rgba(245, 239, 224, 0.35);
      letter-spacing: 0.1em;
    }
    footer a { color: #d4af37; text-decoration: none; }
  </style>
</head>
<body>
  <div class="bg"></div>
  <div class="container">
    <span class="badge">Próximamente · Coming Soon</span>
    <h1>
      Club San Francisco
      <span class="accent">Hacienda Turística</span>
    </h1>
    <div class="divider"></div>
    <p class="tagline">
      Estamos preparando una experiencia única en el corazón de la naturaleza ecuatoriana.
      Nuestro sitio web estará disponible muy pronto.
    </p>
    <div class="meta">
      <span><span class="dot"></span> Hospedaje</span>
      <span><span class="dot"></span> Caballos</span>
      <span><span class="dot"></span> Actividades</span>
      <span><span class="dot"></span> Restaurante</span>
    </div>
  </div>
  <footer>
    © ${new Date().getFullYear()} Club San Francisco · Diseñado por <a href="https://fworksbuilders.com">fworksbuilders</a>
  </footer>
</body>
</html>`;
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow'
    }
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const hostname = url.hostname;
    const pathname = url.pathname;
    
    // BLOK: "In Constructie" pagina voor domeinen waar klant nog niet akkoord is
    if (IN_CONSTRUCTION.has(hostname)) {
      return renderInConstruction();
    }
    
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
