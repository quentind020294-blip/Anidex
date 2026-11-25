# Traductions de l’Anidex

Langues disponibles : **français** (`fr`, langue de référence), **anglais** (`en`, langue de secours) et **espagnol** (`es`).

```
src/i18n/
├── registry.ts      ← registre des langues (le seul fichier de code à modifier)
├── types.ts         ← types communs (Strings, ContentPack…)
├── index.tsx        ← contexte React : useI18n(), langue mémorisée, langue du téléphone
├── fr/ ui.ts        ← textes de l’interface (menus, boutons, messages, badges…)
│       content.ts   ← contenu des fiches : noms, habitat, description, « Le savais-tu »,
│                      régime, textes de conservation, notes des numéros de secours
├── en/ ui.ts, content.ts
└── es/ ui.ts, content.ts
```

Les fichiers de données (`src/data/*.ts`) ne contiennent plus aucun texte : ils lisent leurs
textes dans `content.ts` par numéro d’espèce.

## Ajouter une langue (ex. l’allemand, `de`)

1. Copier `src/i18n/en/` en `src/i18n/de/`.
2. Traduire `de/ui.ts` : renommer l’export (`export const de: Strings = …`) et régler
   `dateLocale` (ex. `'de-DE'`, utilisé pour les dates et les nombres).
3. Traduire `de/content.ts`. Pour le nom des animaux, n’indiquer `name` que si un nom commun
   fiable existe ; sinon, supprimer la ligne : l’appli affichera le nom anglais (le nom
   scientifique est toujours affiché).
4. Ajouter la langue dans `registry.ts` (imports + une ligne dans `LOCALES` : libellé écrit dans
   la langue elle-même et drapeau). Le sélecteur des réglages, la détection de la langue du
   téléphone et la recherche par nom la prennent en compte automatiquement.
5. Lancer `npm run check:i18n` : il signale tout texte manquant, vide, ou resté identique à
   l’anglais ou au français (oubli de traduction). TypeScript (`npx tsc --noEmit`) vérifie aussi
   que `ui.ts` a exactement la structure attendue.

## Noms espagnols

Un nom commun espagnol n’est utilisé que s’il est fiable : présent parmi les noms vernaculaires
espagnols de GBIF (vérifiés en novembre 2026), ou nom standard très répandu (ex. *canguro rojo*,
*tortuga laúd*). La source de chaque nom est indiquée en commentaire dans `es/content.ts`.
Pour 31 espèces sans nom espagnol fiable, l’appli affiche le nom anglais.
