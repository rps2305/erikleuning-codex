import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { readdirSync, readFileSync } from 'node:fs';

const rootDir = resolve(__dirname, 'src/pages');
const pageFiles = readdirSync(rootDir).filter((file) => file.endsWith('.html'));

function normalizeBase(path) {
  if (!path) {
    return '';
  }
  let value = String(path).trim();
  if (!value.startsWith('/')) {
    value = `/${value}`;
  }
  if (!value.endsWith('/')) {
    value = `${value}/`;
  }
  return value;
}

const customBase = normalizeBase(process.env.VITE_BASE_PATH);
const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
const githubBase = process.env.GITHUB_ACTIONS && repoName ? `/${repoName}/` : '/';
const basePath = customBase || githubBase;

const inputEntries = pageFiles.reduce((entries, file) => {
  entries[file.replace(/\.html$/, '')] = resolve(rootDir, file);
  return entries;
}, {});

function applyTemplate(content, data = {}) {
  return content.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
    if (!(key in data)) {
      return '';
    }
    const value = data[key];
    return typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
  });
}

function htmlIncludePlugin() {
  return {
    name: 'html-include-plugin',
    enforce: 'pre',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const currentDir = ctx?.filename ? dirname(ctx.filename) : rootDir;
        return html.replace(/<!--\s*include\(([^,\s)]+)(?:,\s*(\{[\s\S]*?\}))?\)\s*-->/g, (full, includePath, dataJson) => {
          const resolvedPath = resolve(currentDir, includePath);
          const partialContent = readFileSync(resolvedPath, 'utf-8');
          const data = dataJson ? JSON.parse(dataJson) : {};
          return applyTemplate(partialContent, data);
        });
      }
    }
  };
}

export default defineConfig({
  root: rootDir,
  base: basePath,
  publicDir: resolve(__dirname, 'public'),
  plugins: [htmlIncludePlugin()],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: inputEntries
    }
  },
  server: {
    open: '/index.html'
  },
  preview: {
    open: '/index.html'
  }
});
