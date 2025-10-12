import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import fetch from 'node-fetch';
import sharp from 'sharp';

const BASE_URL = 'https://www.erikleuning.nl';
const BASE = new URL(BASE_URL);
const PAGES = ['/', '/privacyverklaring'];
const TARGET_WIDTHS = [480, 768, 1024, 1600];
const OUT_DIR = path.resolve('public/images');
const SRC_DIR = path.resolve(OUT_DIR, 'src');

const IMG_TAG_REGEX = /<img\b[^>]*>/gi;

function resolveUrl(url) {
  const resolved = new URL(url, BASE);
  if (resolved.origin !== BASE.origin) {
    throw new Error('External image blocked: ' + url);
  }
  return resolved;
}

function sanitizeFilename(url) {
  if (url.pathname.includes('/pagespeed_static/')) {
    return null;
  }
  const segment = url.pathname.split('/').filter(Boolean).pop() ?? 'image';
  const noQuery = segment.split(',')[0];
  const withoutPagespeed = noQuery.replace(/\.pagespeed\..+$/, '');
  const cleaned = withoutPagespeed.replace(/^[xX](?=[^/]+)/, '');
  const ext = path.extname(cleaned) || '.jpg';
  const base = cleaned.replace(ext, '') || 'image';
  return { base: base.toLowerCase(), ext: ext.toLowerCase() };
}

async function fetchHtml(relativePath) {
  const response = await fetch(new URL(relativePath, BASE));
  if (!response.ok) {
    throw new Error(`Failed to fetch ${relativePath}: ${response.status}`);
  }
  return response.text();
}

function extractImageUrls(html) {
  const urls = new Set();
  const matches = html.matchAll(IMG_TAG_REGEX);
  for (const match of matches) {
    const tag = match[0];
    const lazy = tag.match(/data-pagespeed-lazy-src\s*=\s*"([^"]+)"/i);
    const normal = tag.match(/\ssrc\s*=\s*"([^"]+)"/i);
    const candidate = lazy?.[1] ?? normal?.[1];
    if (!candidate || candidate.startsWith('data:')) continue;
    try {
      const resolved = resolveUrl(candidate);
      const sanitized = sanitizeFilename(resolved);
      if (!sanitized) continue;
      urls.add(JSON.stringify({ href: resolved.href, base: sanitized.base, ext: sanitized.ext }));
    } catch (error) {
      if (process.env.DEBUG) {
        console.warn(error.message);
      }
    }
  }
  return Array.from(urls).map((item) => JSON.parse(item));
}

async function downloadImage(entry) {
  const response = await fetch(entry.href);
  if (!response.ok) {
    throw new Error(`Unable to download ${entry.href}: ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
}

async function saveOriginal(entry, buffer) {
  const filename = `${entry.base}${entry.ext}`;
  const filepath = path.join(SRC_DIR, filename);
  await writeFile(filepath, buffer);
  return filepath;
}

async function createWebpVariants(entry, buffer) {
  const filenameBase = entry.base;
  const image = sharp(buffer, { failOnError: false });
  const metadata = await image.metadata();
  const maxWidth = metadata.width ?? Math.max(...TARGET_WIDTHS);
  const widths = TARGET_WIDTHS.filter((size) => size <= maxWidth || metadata.width === undefined);
  const deduped = widths.length ? widths : [maxWidth];

  const tasks = deduped.map(async (width) => {
    const outPath = path.join(OUT_DIR, `${filenameBase}-${width}.webp`);
    await image
      .clone()
      .resize({ width, withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 82 })
      .toFile(outPath);
  });

  await Promise.all(tasks);
}

async function ensureDirectories() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(SRC_DIR, { recursive: true });
}

async function main() {
  await ensureDirectories();

  const downloads = new Map();

  for (const page of PAGES) {
    const html = await fetchHtml(page);
    for (const entry of extractImageUrls(html)) {
      downloads.set(entry.base, entry);
    }
  }

  for (const entry of downloads.values()) {
    console.log(`⏬  Downloading ${entry.href}`);
    const buffer = await downloadImage(entry);
    await saveOriginal(entry, buffer);
    await createWebpVariants(entry, buffer);
  }

  console.log('✅ Afbeeldingen bijgewerkt in public/images');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
