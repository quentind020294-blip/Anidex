// Charge un module TypeScript du projet (données pures, sans React Native) depuis un script Node.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import ts from 'typescript';

const cache = {};
export function loadTs(file) {
  if (cache[file]) return cache[file];
  const js = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const module = { exports: {} };
  cache[file] = module.exports;
  new Function('module', 'exports', 'require', js)(module, module.exports, (p) =>
    p.startsWith('.') ? loadTs(`${join(dirname(file), p)}.ts`) : {},
  );
  return (cache[file] = module.exports);
}
