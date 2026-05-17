// Cloudflare Worker: site-proxy-new
// FINAL VERSION - Met URL synchronisatie en API proxy
const PREVIEW_URL = 'https://fworks-consolidate-1.emergent.host';

// Domeinen die alleen een "In Constructie" pagina tonen (klant nog niet akkoord)
const IN_CONSTRUCTION = {
  'sanfrancisco-haciendaturistica.com': 'sanfrancisco',
  'www.sanfrancisco-haciendaturistica.com': 'sanfrancisco',
  'ilsiciliano-santodomingo.com': 'ilsiciliano',
  'www.ilsiciliano-santodomingo.com': 'ilsiciliano'
};

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
  'ilsiciliano-santodomingo.com': '/site/ilsiciliano',
  'www.ilsiciliano-santodomingo.com': '/site/ilsiciliano',
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

// =====================================================
// IN CONSTRUCTION PAGES
// =====================================================

function renderSanFranciscoConstruction() {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Club San Francisco — Próximamente</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { min-height: 100vh; background: #0a0a0a; color: #f5efe0; font-family: 'Inter', sans-serif; overflow-x: hidden; }
    .video-bg { position: fixed; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
    .overlay { position: fixed; inset: 0; background: linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.75) 100%), radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 40%); z-index: 1; pointer-events: none; }
    .container { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem 2rem 9rem; text-align: center; }
    .sf-logo { width: clamp(180px, 22vw, 280px); height: auto; margin-bottom: 2rem; filter: drop-shadow(0 10px 40px rgba(0,0,0,0.7)); animation: fadeInLogo 1.2s ease-out; }
    @keyframes fadeInLogo { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
    .badge { display: inline-block; padding: 0.5rem 1.25rem; border: 1px solid rgba(212, 175, 55, 0.5); background: rgba(10,10,10,0.35); backdrop-filter: blur(8px); border-radius: 999px; color: #d4af37; font-size: 0.75rem; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 2rem; }
    h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 5.5vw, 4rem); font-weight: 500; line-height: 1.05; color: #f5efe0; margin-bottom: 1rem; letter-spacing: -0.02em; text-shadow: 0 4px 30px rgba(0,0,0,0.6); }
    h1 .accent { display: block; color: #d4af37; font-style: italic; font-weight: 400; }
    .divider { width: 60px; height: 1px; background: #d4af37; margin: 1.75rem auto; }
    .tagline { font-size: 1.05rem; color: rgba(245, 239, 224, 0.92); max-width: 600px; line-height: 1.7; font-weight: 300; margin-bottom: 2.25rem; text-shadow: 0 2px 20px rgba(0,0,0,0.7); }
    .cta-whatsapp { display: inline-flex; align-items: center; gap: 0.7rem; padding: 0.95rem 1.8rem; background: #25d366; color: #ffffff; border-radius: 999px; font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 600; text-decoration: none; box-shadow: 0 10px 30px rgba(37, 211, 102, 0.35), 0 4px 12px rgba(0,0,0,0.5); transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease; margin-bottom: 2rem; }
    .cta-whatsapp:hover { transform: translateY(-2px) scale(1.02); background: #1ebe5d; }
    .cta-whatsapp svg { width: 22px; height: 22px; }
    .cta-sub { font-size: 0.78rem; color: rgba(245, 239, 224, 0.72); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 2.5rem; }
    .meta { display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; font-size: 0.85rem; color: rgba(245, 239, 224, 0.9); letter-spacing: 0.15em; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.7); }
    .meta span { display: flex; align-items: center; gap: 0.5rem; }
    .meta .dot { width: 4px; height: 4px; background: #d4af37; border-radius: 50%; }
    footer { position: fixed; bottom: 1.75rem; left: 0; right: 0; z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 0.65rem; pointer-events: none; }
    footer .by { font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #f5efe0; letter-spacing: 0.18em; text-transform: uppercase; text-shadow: 0 2px 14px rgba(0,0,0,0.9); }
    footer a { pointer-events: auto; display: inline-block; text-decoration: none; transition: transform 0.3s ease; }
    footer a:hover { transform: translateY(-2px); }
    footer img { height: 38px; width: auto; display: block; filter: drop-shadow(0 4px 18px rgba(0,0,0,0.7)) brightness(1.15); transition: filter 0.3s ease; }
    footer a:hover img { filter: drop-shadow(0 6px 22px rgba(212,175,55,0.5)) brightness(1.3); }
    @media (max-width: 640px) { .sf-logo { width: 160px; margin-bottom: 1.5rem; } .cta-whatsapp { font-size: 0.9rem; padding: 0.85rem 1.5rem; } footer .by { font-size: 0.72rem; letter-spacing: 0.14em; } footer img { height: 30px; } }
  </style>
</head>
<body>
  <video class="video-bg" autoplay muted loop playsinline><source src="/images/sanfrancisco/video/hero-compilation.mp4" type="video/mp4"></video>
  <div class="overlay"></div>
  <div class="container">
    <img class="sf-logo" src="/images/sanfrancisco/logo/sanfrancisco-logo.png" alt="Club San Francisco">
    <span class="badge">Próximamente · Coming Soon</span>
    <h1>Club San Francisco<span class="accent">Hacienda Turística</span></h1>
    <div class="divider"></div>
    <p class="tagline">Estamos preparando una experiencia única en el corazón de la naturaleza ecuatoriana. Nuestro sitio web estará disponible muy pronto.</p>
    <a class="cta-whatsapp" href="https://wa.me/593999060566?text=Hola%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Club%20San%20Francisco" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.521.074-.794.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
      <span>+593 99 906 0566 · WhatsApp</span>
    </a>
    <div class="cta-sub">¿Quieres más información? Contáctanos</div>
    <div class="meta"><span><span class="dot"></span> Hospedaje</span><span><span class="dot"></span> Caballos</span><span><span class="dot"></span> Actividades</span><span><span class="dot"></span> Restaurante</span></div>
  </div>
  <footer>
    <span class="by">© ${new Date().getFullYear()} · Diseñado por</span>
    <a href="https://fworksbuilders.com" target="_blank" rel="noopener"><img src="/images/fworks-logo.png" alt="fworksbuilders"></a>
  </footer>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Cache-Control': 'no-cache, no-store, must-revalidate', 'X-Robots-Tag': 'noindex, nofollow' } });
}

function renderIlSicilianoConstruction() {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="robots" content="noindex, nofollow">
  <title>Il Siciliano — Próximamente</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; background: #0a0a0a; color: #f5efe0; font-family: 'Inter', sans-serif; overflow: hidden; position: fixed; }
    .video-bg { position: fixed; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
    .overlay { position: fixed; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.78) 100%); z-index: 1; pointer-events: none; }
    .tricolor-top { position: fixed; top: 0; left: 0; right: 0; height: 5px; display: flex; z-index: 5; }
    .tricolor-top span { flex: 1; }
    .tricolor-top .tg { background: #009246; }
    .tricolor-top .tw { background: #ffffff; }
    .tricolor-top .tr { background: #ce2b37; }
    .container { position: relative; z-index: 2; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem 1.5rem 6rem; text-align: center; }
    .logo { width: clamp(140px, 18vw, 200px); height: auto; margin-bottom: 1.5rem; filter: drop-shadow(0 10px 30px rgba(0,0,0,0.8)); animation: fadeIn 1s ease-out; border-radius: 50%; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: translateY(0); } }
    .badge { display: inline-block; padding: 0.45rem 1.1rem; border: 1px solid rgba(178, 34, 34, 0.7); background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); border-radius: 999px; color: #ff6b6b; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 1.5rem; font-weight: 500; }
    h1 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 600; line-height: 1.05; color: #f5efe0; margin-bottom: 0.5rem; letter-spacing: -0.01em; text-shadow: 0 4px 25px rgba(0,0,0,0.7); }
    h1 .accent { display: block; color: #d4af37; font-style: italic; font-weight: 400; font-size: 0.7em; margin-top: 0.4rem; }
    .divider { width: 50px; height: 1px; background: linear-gradient(90deg, transparent, #d4af37, transparent); margin: 1.25rem auto; }
    .tagline { font-size: clamp(0.95rem, 1.5vw, 1.05rem); color: rgba(245, 239, 224, 0.92); max-width: 500px; line-height: 1.6; font-weight: 300; margin-bottom: 1.75rem; text-shadow: 0 2px 12px rgba(0,0,0,0.8); }
    .cta { display: inline-flex; align-items: center; gap: 0.65rem; padding: 0.85rem 1.7rem; background: linear-gradient(135deg, #B22222, #7F0F0F); color: #ffffff; border-radius: 999px; font-size: 0.95rem; font-weight: 600; text-decoration: none; box-shadow: 0 8px 24px rgba(178, 34, 34, 0.45), 0 3px 10px rgba(0,0,0,0.5); transition: all 0.25s ease; border: 1px solid rgba(255,255,255,0.1); }
    .cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(178, 34, 34, 0.6); }
    .cta svg { width: 18px; height: 18px; }
    .cta-sub { font-size: 0.72rem; color: rgba(245, 239, 224, 0.6); letter-spacing: 0.18em; text-transform: uppercase; margin-top: 1rem; }
    footer { position: fixed; bottom: 1.25rem; left: 0; right: 0; z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; pointer-events: none; }
    footer .by { font-size: 0.7rem; color: rgba(245,239,224,0.7); letter-spacing: 0.18em; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.9); }
    footer a { pointer-events: auto; display: inline-block; transition: transform 0.3s ease; }
    footer a:hover { transform: translateY(-2px); }
    footer img { height: 30px; width: auto; display: block; filter: drop-shadow(0 4px 14px rgba(0,0,0,0.7)) brightness(1.1); transition: filter 0.3s ease; }
    footer a:hover img { filter: drop-shadow(0 6px 18px rgba(212,175,55,0.5)) brightness(1.3); }
    @media (max-width: 640px) { .container { padding: 1rem 1rem 5rem; } .logo { width: 120px; margin-bottom: 1.25rem; } .cta { font-size: 0.88rem; padding: 0.8rem 1.4rem; } footer img { height: 26px; } }
  </style>
</head>
<body>
  <video class="video-bg" autoplay muted loop playsinline preload="auto"><source src="/images/ilsiciliano/bambino/video/intro-emanuele.mp4" type="video/mp4"></video>
  <div class="overlay"></div>
  <div class="tricolor-top"><span class="tg"></span><span class="tw"></span><span class="tr"></span></div>

  <div class="container">
    <img class="logo" src="/images/ilsiciliano/logo/ilsiciliano-logo.png" alt="Il Siciliano">
    <span class="badge">Próximamente · Coming Soon</span>
    <h1>Il Siciliano<span class="accent">Trattoria · Pizzería</span></h1>
    <div class="divider"></div>
    <p class="tagline">Estamos preparando los auténticos sabores de Sicilia para ti. Nuestro sitio web estará disponible muy pronto.</p>
    <a class="cta" href="tel:+593984110781">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      <span>+593 98 411 0781</span>
    </a>
    <div class="cta-sub">Llámanos · Call us · Chiamaci</div>
  </div>

  <footer>
    <span class="by">© ${new Date().getFullYear()} · Diseñado por</span>
    <a href="https://fworksbuilders.com" target="_blank" rel="noopener"><img src="/images/fworks-logo.png" alt="fworksbuilders"></a>
  </footer>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Cache-Control': 'no-cache, no-store, must-revalidate', 'X-Robots-Tag': 'noindex, nofollow' } });
}

function renderInConstruction(siteKey) {
  if (siteKey === 'ilsiciliano') return renderIlSicilianoConstruction();
  return renderSanFranciscoConstruction();
}

// =====================================================
// MAIN HANDLER
// =====================================================

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const hostname = url.hostname;
    const pathname = url.pathname;

    // Voor "In Constructie" domeinen: serveer images/video via proxy, HTML = construction page
    if (hostname in IN_CONSTRUCTION) {
      if (pathname.startsWith('/images/')) {
        const apiUrl = PREVIEW_URL + '/api' + pathname;
        try {
          const upstream = await fetch(apiUrl, {
            headers: { 'Range': request.headers.get('Range') || '' }
          });
          const cacheControl = upstream.ok ? 'public, max-age=31536000' : 'no-cache, no-store, must-revalidate';
          const headers = new Headers();
          headers.set('Content-Type', upstream.headers.get('Content-Type') || 'image/jpeg');
          headers.set('Cache-Control', cacheControl);
          headers.set('Access-Control-Allow-Origin', '*');
          headers.set('Accept-Ranges', 'bytes');
          if (upstream.headers.get('Content-Range')) headers.set('Content-Range', upstream.headers.get('Content-Range'));
          if (upstream.headers.get('Content-Length')) headers.set('Content-Length', upstream.headers.get('Content-Length'));
          return new Response(upstream.body, { status: upstream.status, headers });
        } catch (e) {
          return new Response('Image not found', { status: 404 });
        }
      }
      return renderInConstruction(IN_CONSTRUCTION[hostname]);
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
        return new Response(response.body, { status: response.status, headers: responseHeaders });
      } catch (e) {
        return new Response('API Error: ' + e.message, { status: 500 });
      }
    }

    // IMAGES: Proxy /images/ to /api/images/ (with Range support for video scrubbing)
    if (pathname.startsWith('/images/')) {
      const apiUrl = PREVIEW_URL + '/api' + pathname;
      try {
        const upstream = await fetch(apiUrl, {
          headers: { 'Range': request.headers.get('Range') || '' }
        });
        const cacheControl = upstream.ok ? 'public, max-age=31536000' : 'no-cache, no-store, must-revalidate';
        const headers = new Headers();
        headers.set('Content-Type', upstream.headers.get('Content-Type') || 'image/jpeg');
        headers.set('Cache-Control', cacheControl);
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Accept-Ranges', 'bytes');
        if (upstream.headers.get('Content-Range')) headers.set('Content-Range', upstream.headers.get('Content-Range'));
        if (upstream.headers.get('Content-Length')) headers.set('Content-Length', upstream.headers.get('Content-Length'));
        return new Response(upstream.body, { status: upstream.status, headers });
      } catch (e) {
        return new Response('Image not found', { status: 404, headers: { 'Cache-Control': 'no-cache' } });
      }
    }

    // SEO FILES
    if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
      const apiUrl = PREVIEW_URL + '/api' + pathname;
      try {
        const response = await fetch(apiUrl, { headers: { 'Host': hostname } });
        return new Response(response.body, { headers: { 'Content-Type': pathname === '/robots.txt' ? 'text/plain' : 'application/xml', 'Cache-Control': 'public, max-age=86400' } });
      } catch (e) {
        return new Response('Error fetching ' + pathname, { status: 500 });
      }
    }

    // FWorksBuilders.com /admin -> redirect to emergent.host admin
    if ((hostname === 'fworksbuilders.com' || hostname === 'www.fworksbuilders.com') && (pathname === '/admin' || pathname.startsWith('/admin/'))) {
      return Response.redirect(PREVIEW_URL + pathname + url.search, 302);
    }

    // FWorksBuilders.com /static -> proxy for admin assets
    if ((hostname === 'fworksbuilders.com' || hostname === 'www.fworksbuilders.com') && pathname.startsWith('/static/')) {
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
        if (pathname.endsWith('.js')) newHeaders.set('Content-Type', 'application/javascript');
        else if (pathname.endsWith('.css')) newHeaders.set('Content-Type', 'text/css');
        return new Response(response.body, { status: response.status, headers: newHeaders });
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
    if (pathname !== '/' && pathname !== '') iframeSrc = iframeSrc + pathname;
    if (url.search) iframeSrc = iframeSrc + url.search;

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
    html, body { width: 100%; height: 100%; overflow: hidden; background: #ffffff; color-scheme: light only; }
    iframe { width: 100%; height: 100%; border: none; color-scheme: light only; }
    @media (prefers-color-scheme: dark) { html, body { background: #ffffff !important; } }
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
        if (newPath.startsWith(sitePrefix)) newPath = newPath.substring(sitePrefix.length) || '/';
        if (newPath !== window.location.pathname) window.history.pushState({}, '', newPath);
      }
    });
    window.addEventListener('popstate', function() {
      iframe.src = '${PREVIEW_URL}' + sitePrefix + window.location.pathname;
    });
  </script>
</body>
</html>`;

    return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Cache-Control': 'no-cache, no-store, must-revalidate' } });
  }
};
