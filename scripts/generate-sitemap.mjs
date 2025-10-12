import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = 'https://www.erikleuning.nl';
const PAGES_DIR = path.resolve('src/pages');
const OUTPUT = path.resolve('public/sitemap.xml');

function toRoute(filename) {
  const name = filename.replace(/\.html$/, '');
  if (name === 'index') {
    return '/';
  }
  return `/${name}`;
}

async function main() {
  const entries = await readdir(PAGES_DIR);
  const pages = entries.filter((file) => file.endsWith('.html')).sort();
  const lastmod = new Date().toISOString();

  const urls = pages
    .map((file) => {
      const route = toRoute(file);
      const loc = new URL(route, BASE_URL).href;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  await writeFile(OUTPUT, xml);
  console.log(`Sitemap bijgewerkt: ${OUTPUT}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
