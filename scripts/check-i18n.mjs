// Repère les textes écrits en dur dans l'interface (hors fichiers de traduction).
// Usage : node scripts/check-i18n.mjs  → code de sortie 1 si un texte suspect est trouvé.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import ts from 'typescript';

const ROOTS = ['src/app', 'src/components', 'src/lib'];
// Attributs JSX qui contiennent du texte vu (ou entendu) par l'utilisateur.
const TEXT_PROPS = new Set(['title', 'placeholder', 'label', 'accessibilityLabel', 'accessibilityHint', 'alt', 'description']);
// Chaînes autorisées : ce ne sont pas des mots à traduire.
const ALLOWED = [
  /^[^A-Za-zÀ-ÿ]*$/, // symboles, emojis, chiffres, ponctuation
  /^Anidex$/, /^ANIDEX$/, /^XP$/, /^Français$/, /^English$/, /^sk-ant-…$/,
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

if (problems.length) {
  console.error(`Textes non traduits trouvés (${problems.length}) :\n${problems.join('\n')}`);
  process.exit(1);
}
console.log('Aucun texte en dur trouvé dans l’interface.');
