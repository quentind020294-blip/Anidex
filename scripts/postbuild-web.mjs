// Finalise l'export web (dossier dist/) pour GitHub Pages :
// - ajoute le manifeste PWA, la couleur de thème et la langue à chaque page HTML ;
// - crée 404.html pour les adresses inconnues ;
// - ajoute .nojekyll pour que GitHub Pages serve le dossier _expo tel quel.
import { copyFileSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const base = process.env.EXPO_PUBLIC_BASE_URL ?? '';

if (!existsSync(join(dist, 'index.html'))) {
  console.error('dist/index.html introuvable : lance d’abord « npx expo export --platform web ».');
  process.exit(1);
}

const head = [
  `<link rel="manifest" href="${base}/manifest.json"/>`,
  `<link rel="apple-touch-icon" href="${base}/apple-touch-icon.png"/>`,
  '<meta name="theme-color" content="#D7263D"/>',
  '<meta name="mobile-web-app-capable" content="yes"/>',
  '<meta name="apple-mobile-web-app-title" content="Anidex"/>',
  '<meta name="description" content="Un Pokédex de la faune australienne : photographie, identifie et collectionne les animaux."/>',
  '<style>body{background-color:#F4F1EA}</style>',
].join('');

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === '_expo' ? [] : htmlFiles(path);
    return name.endsWith('.html') ? [path] : [];
  });
}

let count = 0;
for (const file of htmlFiles(dist)) {
  let html = readFileSync(file, 'utf8');
  if (html.includes('rel="manifest"')) continue;
  html = html.replace(/<html lang="[^"]*"/, '<html lang="fr"');
  if (!html.includes('<title>')) html = html.replace('</head>', '<title>Anidex</title></head>');
  html = html.replace('</head>', `${head}</head>`);
  writeFileSync(file, html);
  count++;
}

// Page « introuvable » générée par Expo Router, sinon la page d'accueil.
const notFound = existsSync(join(dist, '+not-found.html')) ? '+not-found.html' : 'index.html';
copyFileSync(join(dist, notFound), join(dist, '404.html'));
writeFileSync(join(dist, '.nojekyll'), '');
console.log(`Export web finalisé : ${count} pages HTML, 404.html et .nojekyll créés (base « ${base || '/'} »).`);
