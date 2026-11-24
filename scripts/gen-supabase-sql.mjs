// Met à jour la liste des espèces « sensibles » dans supabase/anidex.sql
// (celles dont le lieu n'est jamais partagé avec les amis), à partir des données de l'appli.
// Usage : node scripts/gen-supabase-sql.mjs [--check]
import { readFileSync, writeFileSync } from 'node:fs';
import ts from 'typescript';

const cache = {};
function load(file) {
  if (cache[file]) return cache[file];
  const js = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const module = { exports: {} };
  const dir = file.slice(0, file.lastIndexOf('/'));
  new Function('module', 'exports', 'require', js)(module, module.exports, (p) => (p.startsWith('.') ? load(`${dir}/${p.replace('./', '')}.ts`) : {}));
  return (cache[file] = module.exports);
}

const { ANIMALS } = load('src/data/animals.ts');
const { hidesLocation } = load('src/data/conservation.ts');
const ids = ANIMALS.filter(hidesLocation).map((a) => a.id);

const block = [
  '-- BEGIN SENSITIVE (généré par scripts/gen-supabase-sql.mjs — ne pas modifier à la main)',
  `-- ${ids.length} espèces sur ${ANIMALS.length}.`,
  'insert into public.sensitive_species (animal_id) values',
  ids.map((id) => `(${id})`).join(', ').replace(/(.{1,100})(, |$)/g, '  $1$2\n').trimEnd(),
  'on conflict do nothing;',
  'delete from public.sensitive_species where animal_id not in (' + ids.join(', ') + ');',
  '-- END SENSITIVE',
].join('\n');

const path = 'supabase/anidex.sql';
const sql = readFileSync(path, 'utf8');
const next = sql.replace(/-- BEGIN SENSITIVE[\s\S]*?-- END SENSITIVE/, block);
if (process.argv.includes('--check')) {
  if (next !== sql) {
    console.error('supabase/anidex.sql n’est pas à jour : lance « npm run gen:sql ».');
    process.exit(1);
  }
  console.log(`Liste des espèces sensibles à jour (${ids.length}).`);
} else {
  writeFileSync(path, next);
  console.log(`supabase/anidex.sql : ${ids.length} espèces sensibles.`);
}
