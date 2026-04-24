# 🎨 Fix kleur-verandering op custom domains (fworksbuilders, etc.)

## Probleem
Wanneer iemand op een link naar fworksbuilders.com klikt (vanuit WhatsApp, een andere site, of zelfs een normale browser met dark mode actief), worden de kleuren van de site "geforceerd donker" of anders weergegeven dan bedoeld.

## Oorzaak
De Cloudflare Worker die de iframe-wrapper genereert voor custom domains (fworksbuilders.com, rccbgroup.be, hoteldelpacifico.net, etc.) miste:
- `<meta name="color-scheme" content="light only">` 
- `color-scheme: light only` in de CSS
- Expliciete `background: #ffffff` op `<html>` en `<body>`

Gevolg: browsers zoals **Chrome Mobile (Force Dark)**, **iOS Safari in dark mode**, **WhatsApp's in-app browser** en **Facebook/Instagram in-app browsers** pasten een automatisch dark-mode filter toe op de wrapper, wat de kleuren verstoorde.

## Oplossing (al gedaan in deze repo)
De Worker HTML template in `/app/docs/cloudflare-worker-final.js` (en `cloudflare-worker-FIXED.js`) is aangepast met de juiste meta tags en CSS regels.

## Wat je nu moet doen om het LIVE te krijgen

Deze Worker draait op **jouw Cloudflare account** — de aanpassingen hier hebben pas effect nadat jij ze opnieuw naar Cloudflare deployed.

### Stap-voor-stap:

1. **Log in** op [dash.cloudflare.com](https://dash.cloudflare.com)
2. Ga naar **Workers & Pages** in het linkermenu
3. Klik op je Worker (waarschijnlijk iets als `fworks-router`, `site-proxy`, `emergent-worker` of vergelijkbaar — de Worker die routes van fworksbuilders.com / hoteldelpacifico.net / etc afhandelt)
4. Klik op **Edit code** (de `</>` knop rechtsboven)
5. **Open** het bestand `/app/docs/cloudflare-worker-final.js` uit deze repo
6. **Kopieer de volledige inhoud** en plak het in de Cloudflare editor (vervang alles wat daar stond)
7. Klik rechtsboven op **Save and Deploy**
8. Bevestig met **Deploy** in de pop-up

### Test direct na deploy
Open op je **mobiele telefoon** (of in WhatsApp):
- https://www.fworksbuilders.com
- https://www.hoteldelpacifico.net

De kleuren moeten nu stabiel/correct zijn, ongeacht dark/light mode van het toestel.

---

## Extra tip
Als je meerdere Workers hebt (bijv. één per domein), moet je dezelfde update in elke Worker doorvoeren. Maar meestal is het één gedeelde Worker die alle domeinen afhandelt.

Als je twijfelt welke Worker het is, kijk op Cloudflare → **Workers & Pages** → klik op een Worker → tab **Triggers/Routes** → daar zie je welke domains hem gebruiken. De Worker waarvan `*fworksbuilders.com/*` onder Routes staat is de juiste.
