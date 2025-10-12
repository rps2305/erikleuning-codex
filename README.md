# Erik Leuning – Begeleiding en Ondersteuning

Vite + Tailwind CSS v4 + Alpine.js herbouw van [erikleuning.nl](https://www.erikleuning.nl) met de oorspronkelijke Nederlandstalige inhoud, geoptimaliseerde afbeeldingen en schema.org-mark-up.

## Vereisten

- Node.js 18+
- npm 9+

## Installatie en ontwikkeling

1. Installeer dependencies:
   ```bash
   npm install
   ```
2. Start de ontwikkelserver:
   ```bash
   npm run dev
   ```
   De site wordt geserveerd op `http://localhost:5173/index.html`. De privacyverklaring is bereikbaar via `http://localhost:5173/privacyverklaring.html`.
3. Bouw de statische output:
   ```bash
   npm run build
   ```
   Resultaat komt terecht in `dist/`.

## Afbeeldingen ophalen en optimaliseren

Het project bevat een script dat de originele beelden ophaalt, bewaart en omzet naar WebP-varianten in de vereiste resoluties.

```bash
npm run images
```

- Bronnen worden opgeslagen onder `public/images/src/`.
- Voor elk beeld worden varianten (`-480/-768/-1024/-1600.webp`) in `public/images/` aangemaakt.
- Vereist netwerktoegang en het `sharp`-pakket (wordt tijdens `npm install` opgehaald).

> Tip: voer het script opnieuw uit wanneer de afbeeldingen op de bronwebsite wijzigen.

## Sitemap bijwerken

Genereer een actuele sitemap voor publicatie:

```bash
npm run sitemap
```

De sitemap komt in `public/sitemap.xml` terecht en wordt door `robots.txt` opgepikt.

## Structuur en contentbeheer

- HTML-pagina's staan in `src/pages/`. De website bestaat uit één hoofdpagina (`index.html`) met anchors voor alle secties en een aparte disclaimer/privacy-pagina (`privacyverklaring.html`). Beide gebruiken HTML-include commentaren om `src/partials/header.html`, `footer.html` en `breadcrumbs.html` in te voegen.
- Aanpassingen aan navigatie-items gebeuren in `src/js/main.js` (store) en worden automatisch doorgezet naar header en footer.
- JSON-LD-partials bevinden zich in `schemas/` en krijgen data mee via de include-syntax.
- Extra JavaScript staat in `src/js/`. `main.js` initialiseert Alpine.js, thema-toggle, navigatie en de Leaflet-kaart.

## Deploy

- Na `npm run build` kan de inhoud van `dist/` rechtstreeks worden ingezet op Netlify, Vercel of elke statische hosting.
- Netlify-formulieren werken meteen dankzij `data-netlify` en de honeypot-velddefinitie.

## GitHub Pages

Deze repository bevat een workflow (`.github/workflows/deploy.yml`) die bij elke push naar `main` de site bouwt en naar GitHub Pages deployt.

1. Zet GitHub Pages in de repository-instellingen op "GitHub Actions".
2. Commit en push de laatste wijzigingen naar `main`.
3. De workflow bouwt automatisch met `npm run build` en publiceert de inhoud van `dist/`.
4. De `vite.config.js` past de `base` dynamisch aan, dus de site wordt geserveerd onder `https://<gebruikersnaam>.github.io/<repo>/` zonder extra configuratie.

## Andere hostingopties

Omdat `npm run build` een volledig statische output oplevert, kan de website op elke statische webserver worden geplaatst:

1. Bouw de site lokaal (de standaard build gebruikt een relatieve `./` base, dus werkt ook vanuit een submap):
   ```bash
   npm run build
   ```
2. Upload de inhoud van de map `dist/` naar je server (bijvoorbeeld via FTP/SFTP, rsync of een CI/CD-pipeline).
3. Zorg dat de server `index.html` als standaardbestand serveert en dat `privacyverklaring.html` in dezelfde map staat.
4. Host je de site in een submap (bv. `https://domein.nl/site/`), stel dan tijdens het builden `GITHUB_REPOSITORY` of `VITE_BASE_PATH` in zodat Vite de juiste `base` gebruikt:
   ```bash
   VITE_BASE_PATH=/site/ npm run build
   ```
   of configureer een eigen environment variabele en lees die in `vite.config.js` uit.

Voor previews op een andere server kun je ook de output lokaal testen met:
```bash
npm run preview
```
Dit start een statische server op basis van de gegenereerde `dist/`-map.
