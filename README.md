# Erik Leuning – Begeleiding en Ondersteuning

Deze repository bevat nu een volledig statische versie van [erikleuning.nl](https://www.erikleuning.nl). De site draait op gewone HTML-bestanden met een vooraf gecompileerde Tailwind-stylesheet en een klein Alpine.js-script voor de navigatie, thematoggle en cookie-banner.

## Structuur

- `index.html` – hoofdpagina met alle secties.
- `privacyverklaring.html` – privacy- en disclaimerpagina.
- `assets/css/main.css` – samengevoegde Tailwind + maatwerk CSS (geen buildstap nodig).
- `assets/js/main.js` – Alpine.js initialisatie en hulpfuncties.
- `images/`, `robots.txt`, `sitemap.xml` – statische assets.
- Favicons in de root (`android-chrome-192x192.png`, `android-chrome-512x512.png`, `apple-touch-icon.png`, `favicon-16x16.png`, `favicon-32x32.png`, `favicon.ico`, `site.webmanifest`) – gegenereerd uit dezelfde logo-bron.

## Aanpassen

Je kunt de bestanden rechtstreeks in een editor aanpassen en vervolgens `index.html` of `privacyverklaring.html` in de browser openen. Eventuele stijlwijzigingen voer je door in `assets/css/main.css` (of door nieuwe Tailwind utility‑klassen toe te voegen in de HTML). De interactiviteit zit in `assets/js/main.js`; Alpine.js wordt via een CDN geladen.

## Favicons

De favicon-set is gegenereerd uit `images/logo256x256-256.webp`. Met ImageMagick kun je ze bijwerken:

```bash
magick images/logo256x256-256.webp -resize 512x512 android-chrome-512x512.png
magick images/logo256x256-256.webp -resize 192x192 android-chrome-192x192.png
magick images/logo256x256-256.webp -resize 180x180 apple-touch-icon.png
magick images/logo256x256-256.webp -resize 32x32 favicon-32x32.png
magick images/logo256x256-256.webp -resize 16x16 favicon-16x16.png
magick images/logo256x256-256.webp -resize 256x256 -define icon:auto-resize=256,128,64,48,32,16 favicon.ico
```

## Social preview

De Open Graph- en Twitter-cards gebruiken `images/social-card-1200x630.webp`. Pas dit bestand aan als je een andere afbeelding voor linkpreviews wilt gebruiken.

## Analytics

Google Analytics (Universal Analytics) is ingeladen via het standaard gtag.js-script in zowel `index.html` als `privacyverklaring.html` met tracking-ID `UA-58599156-1`. Pas de ID aan in beide bestanden als je een andere property wilt gebruiken.

## Hosting

Omdat er geen buildstap meer nodig is, kan de volledige mapstructuur direct naar GitHub Pages of elke andere statische hosting worden geüpload. Zorg dat `index.html` en `privacyverklaring.html` in de root staan en dat de `assets/`- en `images/`-mappen meegekopieerd worden.
