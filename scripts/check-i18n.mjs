// Vérifie les traductions :
//  1. aucun texte écrit en dur dans l'interface (hors fichiers de traduction) ;
//  2. chaque langue du registre (src/i18n/registry.ts) a tous ses textes : interface et
//     contenu des 151 fiches (textes, régime, conservation, secours) ;
//  3. aucun texte d'une langue n'est resté identique à l'anglais ou au français
//     (oubli de traduction), sauf exceptions listées dans SAME_OK.
// Usage : node scripts/check-i18n.mjs  → code de sortie 1 si un problème est trouvé.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import ts from 'typescript';

import { loadTs } from './lib/load-ts.mjs';

const ROOTS = ['src/app', 'src/components', 'src/lib'];
// Attributs JSX qui contiennent du texte vu (ou entendu) par l'utilisateur.
const TEXT_PROPS = new Set(['title', 'placeholder', 'label', 'accessibilityLabel', 'accessibilityHint', 'alt', 'description']);
// Chaînes autorisées : ce ne sont pas des mots à traduire.
const ALLOWED = [
  /^[^A-Za-zÀ-ÿ]*$/, // symboles, emojis, chiffres, ponctuation
  /^Anidex$/, /^ANIDEX$/, /^XP$/, /^sk-ant-…$/,
];

function files(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? files(p) : /\.tsx?$/.test(n) ? [p] : [];
  });
}

const problems = [];
for (const file of ROOTS.flatMap(files)) {
  const src = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const report = (node, text) => {
    const t = text.trim();
    if (!t || ALLOWED.some((re) => re.test(t))) return;
    const { line } = src.getLineAndCharacterOfPosition(node.getStart());
    problems.push(`${file}:${line + 1}  ${JSON.stringify(t)}`);
  };
  const visit = (node) => {
    if (ts.isJsxText(node)) report(node, node.text);
    if (ts.isJsxAttribute(node) && TEXT_PROPS.has(node.name.getText()) && node.initializer) {
      const init = node.initializer;
      if (ts.isStringLiteral(init)) report(init, init.text);
      if (ts.isJsxExpression(init) && init.expression && (ts.isStringLiteral(init.expression) || ts.isNoSubstitutionTemplateLiteral(init.expression))) {
        report(init.expression, init.expression.text);
      }
    }
    // Textes passés à Alert / window.confirm / new Error dans l'interface.
    if (ts.isCallExpression(node) && /^(window\.confirm|Alert\.alert)$/.test(node.expression.getText())) {
      for (const arg of node.arguments) if (ts.isStringLiteral(arg) || ts.isNoSubstitutionTemplateLiteral(arg)) report(arg, arg.text);
    }
    // { text: '…' } dans les boutons d'Alert et options de navigation { title: '…' }.
    if (ts.isPropertyAssignment(node) && ['text', 'title', 'headerTitle', 'tabBarLabel'].includes(node.name.getText())) {
      const v = node.initializer;
      if (ts.isStringLiteral(v) || ts.isNoSubstitutionTemplateLiteral(v)) report(v, v.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(src);
}

// ── 2 et 3 : complétude et oublis de traduction, pour chaque langue du registre ──
const { LOCALES, LANGS, FALLBACK_LANG } = loadTs('src/i18n/registry.ts');
const REF = 'fr';
const SAMPLE = { number: 2, string: 'X' };

// Textes qui peuvent légitimement être identiques d'une langue à l'autre
// (noms propres, mots transparents). Clé : « langue:chemin ».
// Vérifiées une par une : mots identiques dans les deux langues.
const SAME_OK = new Set([
  ...['ui.tabs.journal', 'ui.tabs.badges', 'ui.screens.conservation', 'ui.rarities.rare', 'ui.trend.stable',
    'ui.threats.pollution', 'ui.ranks.4', 'ui.badgesScreen.title', 'ui.animal.description', 'ui.animal.habitat',
    'ui.animal.conservation', 'ui.friends.badgesTitle', 'ui.traits.type', 'ui.traits.types.carnivore',
    'ui.traits.types.herbivore', 'ui.traits.types.insectivore', 'ui.traits.types.omnivore'].map((k) => `fr:${k}`),
  ...['ui.badges.endangered.title', 'ui.traits.activities.crepuscular', 'ui.friends.levelShort'].map((k) => `es:${k}`),
]);
const SAME_OK_PATTERNS = [
  /^ui\.dateLocale$/, /^ui\.tabs\.dex$/, /^ui\.friends\.sortXp$/, /^ui\.friends\.xp$/, /^ui\.summary\.seen$/,
  /^ui\.map\.point(WithName)?$/, /^ui\.traits\.(male|female)$/, /^ui\.badgesScreen\.levelShort$/,
  /^ui\.language\.title$/, /^ui\.states\.(VIC|QLD|TAS)$/, /^ui\.conservation\.VU$/, /^ui\.auStatus\.VU$/,
  /^ui\.friends\.pseudoPlaceholder$/,
];
const SAME_WORDS = new Set(['Anidex', 'Victoria', 'Queensland', 'Tasmania', 'Vulnerable', 'Reptiles', 'Reptile', 'Terrestre', 'Insectes', 'Termites', 'Insects', 'Krill', 'Plancton', 'Plankton', 'Melaleuca', 'Eucalyptus', 'Selvas', 'XP']);

/** Aplatit un objet de textes : { chemin: texte }. Les fonctions sont appelées avec des exemples. */
function flatten(obj, prefix, out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const path = `${prefix}.${k}`;
    if (typeof v === 'string') out[path] = v;
    else if (typeof v === 'function') out[path] = String(v(...Array.from({ length: v.length }, (_, i) => (i === 0 ? SAMPLE.number : SAMPLE.number + i))));
    else if (v && typeof v === 'object') flatten(v, path, out);
  }
  return out;
}
const texts = Object.fromEntries(LANGS.map((l) => [l, { ...flatten(LOCALES[l].ui, 'ui'), ...flatten(LOCALES[l].content, 'content') }]));
const ref = texts[REF];
const species = Object.keys(LOCALES[REF].content.species);
const issues = [];

for (const lang of LANGS) {
  const t = texts[lang];
  const content = LOCALES[lang].content;
  // Complétude : mêmes clés que la langue de référence (le nom peut manquer hors fr/en : nom anglais affiché).
  for (const key of Object.keys(ref)) {
    if (key in t) continue;
    if (/^content\.species\.\d+\.name$/.test(key) && lang !== REF && lang !== FALLBACK_LANG) continue;
    issues.push(`[${lang}] texte manquant : ${key}`);
  }
  for (const key of Object.keys(t)) if (!(key in ref)) issues.push(`[${lang}] texte en trop (absent en ${REF}) : ${key}`);
  if (Object.keys(content.species).length !== species.length) issues.push(`[${lang}] ${Object.keys(content.species).length} fiches au lieu de ${species.length}`);
  for (const [key, value] of Object.entries(t)) if (!value.trim()) issues.push(`[${lang}] texte vide : ${key}`);

  // Oublis : texte identique à l'anglais (langue de secours) ou au français.
  for (const other of [FALLBACK_LANG, REF]) {
    if (other === lang || (lang === FALLBACK_LANG && other === REF)) continue;
    for (const [key, value] of Object.entries(t)) {
      if (texts[other][key] !== value) continue;
      if (/^content\.species\.\d+\.name$/.test(key)) continue; // un nom commun peut être identique (Koala, Dingo…)
      if (SAME_OK.has(`${lang}:${key}`) || SAME_OK_PATTERNS.some((re) => re.test(key))) continue;
      if (/^[^A-Za-zÀ-ÿ]*$/.test(value) || SAME_WORDS.has(value.trim())) continue;
      issues.push(`[${lang}] identique en ${other} (non traduit ?) : ${key} = ${JSON.stringify(value)}`);
    }
  }
}

if (problems.length) console.error(`Textes écrits en dur dans l'interface (${problems.length}) :\n${problems.join('\n')}`);
if (issues.length) console.error(`Problèmes de traduction (${issues.length}) :\n${issues.join('\n')}`);
if (problems.length || issues.length) process.exit(1);
console.log(`Aucun texte en dur dans l’interface. Traductions complètes pour : ${LANGS.join(', ')} (${Object.keys(ref).length} textes chacune).`);
