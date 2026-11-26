// Rend les PNG de l'appli (icônes, écran de démarrage, PWA) à partir des SVG du logo.
// Usage : python3 scripts/logo/gen-logo.py && node scripts/logo/render-icons.mjs
// Nécessite Playwright (Chromium), utilisé seulement sur la machine de développement.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const B = 'assets/logo/build';
const OUT = [
  // [source SVG, fichier PNG, taille]
  [`${B}/icon-full.svg`, 'assets/icon.png', 1024],
  [`${B}/adaptive-fg.svg`, 'assets/android-icon-foreground.png', 1024],
  [`${B}/adaptive-bg.svg`, 'assets/android-icon-background.png', 1024],
  [`${B}/mono.svg`, 'assets/android-icon-monochrome.png', 1024],
  [`${B}/splash.svg`, 'assets/splash-icon.png', 1024],
  [`${B}/icon-full.svg`, 'assets/favicon.png', 48],
  [`${B}/icon-full.svg`, 'public/apple-touch-icon.png', 180],
  [`${B}/icon-full.svg`, 'public/icon-192.png', 192],
  [`${B}/icon-full.svg`, 'public/icon-512.png', 512],
  [`${B}/maskable.svg`, 'public/icon-maskable-512.png', 512],
];

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
for (const [src, dest, size] of OUT) {
  const svg = readFileSync(src, 'utf8').replace(/width="\d+" height="\d+"/, `width="${size}" height="${size}"`);
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
  await page.screenshot({ path: dest, omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
  console.log(`${dest} (${size} × ${size})`);
}
await browser.close();
