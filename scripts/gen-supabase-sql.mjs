// Met à jour la liste des espèces « sensibles » dans supabase/anidex.sql
// (celles dont le lieu n'est jamais partagé avec les amis), à partir des données de l'appli.
// Usage : node scripts/gen-supabase-sql.mjs [--check]
import { readFileSync, writeFileSync } from 'node:fs';
import { loadTs as load } from './lib/load-ts.mjs';

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
