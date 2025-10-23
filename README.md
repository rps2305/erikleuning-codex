# Erik Leuning – Begeleiding en Ondersteuning

Deze repository bevat nu een volledig statische versie van [erikleuning.nl](https://www.erikleuning.nl). De site draait op gewone HTML-bestanden met een vooraf gecompileerde Tailwind-stylesheet en een klein Alpine.js-script voor de navigatie, thematoggle en cookie-banner.

## Structuur

- `index.html` – hoofdpagina met alle secties.
- `privacyverklaring.html` – privacy- en disclaimerpagina.
- `assets/css/main.css` – samengevoegde Tailwind + maatwerk CSS (geen buildstap nodig).
- `assets/js/main.js` – Alpine.js initialisatie en hulpfuncties.
- `images/`, `favicon.ico`, `apple-touch-icon.png`, `robots.txt`, `site.webmanifest`, `sitemap.xml` – statische assets voor de site.

## Aanpassen

Je kunt de bestanden rechtstreeks in een editor aanpassen en vervolgens `index.html` of `privacyverklaring.html` in de browser openen. Eventuele stijlwijzigingen voer je door in `assets/css/main.css` (of door nieuwe Tailwind utility‑klassen toe te voegen in de HTML). De interactiviteit zit in `assets/js/main.js`; Alpine.js wordt via een CDN geladen.

## Hosting

Omdat er geen buildstap meer nodig is, kan de volledige mapstructuur direct naar GitHub Pages of elke andere statische hosting worden geüpload. Zorg dat `index.html` en `privacyverklaring.html` in de root staan en dat de `assets/`- en `images/`-mappen meegekopieerd worden.
