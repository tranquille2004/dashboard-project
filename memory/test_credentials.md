# Test Credentials — Site Admins

## Super Admin (fworksbuilders dashboard)
- URL: `https://fworksbuilders.com/admin` (Google OAuth)
- Account: owner's Google account

## Site Admins (standard pattern)
**Login URL**: `https://<domain>/admin` on each tenant site
**Email pattern**: `admin@<primary-domain>`
**Password pattern**: `<keyword>123`

| Site | Email | Password |
|---|---|---|
| Hotel del Pacífico | admin@hoteldelpacifico.net | pacifico123 |
| Il Siciliano | admin@ilsiciliano-santodomingo.com | siciliano123 |
| Hacienda San Francisco | admin@sanfrancisco-haciendaturistica.com | sanfrancisco123 |
| La Cantina Italiana | admin@lacantinaitaliana.net | cantina123 |
| La Bottega Herent | admin@labottegaherent.com | bottega123 |
| L'Ascoli Zaventem | admin@ascolizaventem.com | ascoli123 |
| Ristorante Mercato | admin@ristorantemercato.be | mercato123 |
| Tracemaster | admin@tracemaster-rastreadores.com | tracemaster123 |
| Theo Beans Export | admin@theobeans-export.com | theobeans123 |
| Fworksbuilders | admin@fworksbuilders.com | fworks123 |
| Villa Smeralda | admin@smeraldavacanze.it | smeralda123 |
| Alberto Pantoja | admin@albertopantoja.com | pantoja123 |
| RCCB Group | admin@rccbgroup.com | rccb123 |

All admins seeded with full permissions (menu, gallery, opening_hours, prices, contact_info, events, announcements, config).
Auto-seeded idempotently in `seed_sites_on_startup()` — password reset on every backend restart.
