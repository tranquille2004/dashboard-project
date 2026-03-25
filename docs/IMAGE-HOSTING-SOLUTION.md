# Image Hosting Oplossing - KRITIEKE DOCUMENTATIE

## Het Probleem (NOOIT VERGETEN)

Op Emergent productie deployments (`.emergent.host` domeinen) kunnen statische bestanden NIET direct worden geserveerd via `/images/` paden. Dit komt omdat:

1. De React frontend een catch-all route heeft die alle onbekende paden naar `index.html` stuurt
2. Wanneer de browser `/images/foto.jpg` opvraagt, krijgt hij HTML terug in plaats van de afbeelding
3. Dit werkt WEL op preview omdat daar lokale bestanden direct toegankelijk zijn
4. Dit werkt NIET op productie deployments

## De Oplossing (3 Onderdelen)

### 1. Emergent Object Storage
Alle 874 afbeeldingen zijn opgeslagen in Emergent Object Storage.
- Storage wordt geïnitialiseerd met `EMERGENT_LLM_KEY`
- Afbeeldingen worden opgeslagen met pad `fworks-sites/images/{path}`

### 2. Backend API Endpoint
De backend heeft een endpoint `/api/images/{path}` die:
- Eerst checkt of de afbeelding in Object Storage staat (via `migrated_images` database collectie)
- De afbeelding ophaalt uit Object Storage
- Als fallback: lokale bestanden probeert (werkt alleen op preview)

**Bestand:** `/app/backend/server.py`
**Endpoint:** `GET /api/images/{path:path}`

### 3. Frontend JavaScript Rewriter
In `/app/frontend/public/index.html` staat een script dat:
- Detecteert of we op productie zijn (hostname bevat `.emergent.host`)
- Alle `<img src="/images/...">` automatisch herschrijft naar `/api/images/...`
- Werkt via MutationObserver voor dynamisch toegevoegde afbeeldingen
- Werkt ook voor CSS `background-image` met `/images/` paden

## Database Structuur

**Collectie:** `migrated_images`
```json
{
  "original_path": "/images/smeralda/hero-pool-main.jpg",
  "storage_path": "fworks-sites/images/smeralda/hero-pool-main.jpg",
  "content_type": "image/jpeg",
  "migrated_at": "2025-03-25T02:00:00Z"
}
```

## Belangrijke Endpoints

| Endpoint | Functie |
|----------|---------|
| `GET /api/images/{path}` | Serveert afbeelding uit Object Storage |
| `GET /api/admin/migrate/status` | Toont migratie status |
| `POST /api/admin/migrate/start` | Start migratie van lokale bestanden |
| `POST /api/admin/migrate/import-records` | Importeert migratie records van andere omgeving |
| `GET /api/admin/migrate/export-records` | Exporteert migratie records als JSON |

## Na Nieuwe Deployment

Als afbeeldingen niet werken na een nieuwe deployment:

1. **Check migratie status:**
   ```
   curl https://[production-url]/api/admin/migrate/status
   ```
   Moet tonen: `migrated_count: 874`

2. **Als migrated_count = 0:**
   Ga naar `/admin/migrate` en klik "Importeer van Preview"
   OF voer de import handmatig uit via de API

3. **Cloudflare cache legen:**
   Dashboard → Caching → Purge Everything

## Troubleshooting Checklist

- [ ] Is `EMERGENT_LLM_KEY` aanwezig in backend/.env?
- [ ] Is `storage_initialized: true` in migrate/status?
- [ ] Is `migrated_count` > 0?
- [ ] Werkt `/api/images/test-image.jpg` direct? (moet 200 geven)
- [ ] Is de JavaScript rewriter aanwezig in index.html?
- [ ] Is Cloudflare cache geleegd na deploy?

## Datum Opgelost
25 maart 2025 - Na 2 weken van problemen eindelijk werkend!
