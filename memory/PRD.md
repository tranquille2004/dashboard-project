# F.Works Builders - Multi-Tenant Website Platform

## Project Overzicht
Een multi-tenant applicatie die 6 websites consolideert in één beheerbare platform met super-admin en site-admin dashboards.

## Geconsolideerde Websites
1. **La Cantina Italiana** (lacantinaitaliana.net) - Direct verbonden met productie
2. **La Bottega Herent** (labottegaherent.com) - Via Cloudflare Worker
3. **L'Ascoli Zaventem** (ascolizaventem.com) - Via Cloudflare Worker
4. **Ristorante Mercato** (ristorantemercato.be) - Via Cloudflare Worker
5. **Tracemaster** (tracemaster-rastreadores.com) - Via Cloudflare Worker
6. **Theo Beans Export** (theobeans-export.com) - Via Cloudflare Worker

## Architectuur
- **Frontend:** React met React Router
- **Backend:** FastAPI
- **Database:** MongoDB
- **Hosting:** Emergent Platform
- **Domain Routing:** Cloudflare Workers (iframe methode)

## Belangrijke URLs
- **Super Admin:** fworksbuilders.com/admin → fworks-admin.preview.emergentagent.com/admin
- **Preview:** fworks-admin.preview.emergentagent.com
- **Productie (La Cantina):** lacantinaitaliana.net

## Features Geïmplementeerd
- ✅ Multi-tenant website rendering
- ✅ Super Admin Dashboard (Google OAuth login)
- ✅ Site Admin Dashboard (per restaurant)
- ✅ Speciale aankondigingen systeem
- ✅ Sluitingsberichten
- ✅ Meertalige ondersteuning (NL/FR/EN)
- ✅ SEO meta tags
- ✅ Responsive design
- ✅ Reservatie formulieren (JotForm integratie)
- ✅ Afhaal formulieren
- ✅ Foto galerijen
- ✅ Groepsmenu's

## Database Schema
- **sites**: name, hostnames, site_config_id
- **site_configs**: closure_notice, special_announcement, special_announcement_active
- **site_admins**: email, password_hash, site_id, permissions

## Cloudflare Worker (site-proxy-new)
Handelt routing af voor 5 van de 6 sites via iframe methode. La Cantina is direct verbonden.

## Bekende Beperkingen
- Preview en productie databases zijn gescheiden (by design)
- Voor La Cantina: admin via lacantinaitaliana.net/admin voor productie wijzigingen
- Voor andere sites: admin wijzigingen werken direct (zelfde preview environment)

## Laatste Updates (Maart 2026)
- Cloudflare Worker bijgewerkt naar correcte preview URL
- Navigatie links gerepareerd voor custom domains
- /admin routing gefixd voor La Cantina (nu naar eigenaren dashboard)
- fworksbuilders.com landingspagina toegevoegd

## Volgende Stap
Nieuwe promotie-website bouwen voor fworksbuilders.com
