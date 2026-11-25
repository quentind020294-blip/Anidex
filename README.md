# Anidex 🦘

Un **Pokédex de la faune australienne**, inspiré de l’application Seek : photographie un animal, l’Anidex l’identifie et l’ajoute à ta collection. Gagne de l’XP, monte de niveau et débloque des badges.

Application **Android / iOS et web** construite avec Expo (React Native + TypeScript). La version web est publiée automatiquement sur GitHub Pages et s’installe sur l’écran d’accueil d’un téléphone Android comme une vraie app.

## Fonctionnalités

- **Anidex de 151 espèces** australiennes, numérotées de #001 à #151 : mammifères, oiseaux, reptiles, amphibiens, vie aquatique, insectes, araignées et autres invertébrés, avec de nombreuses espèces de Victoria et de Phillip Island. Les plus rares (#142 à #151) sont « légendaires ». Pour chaque espèce : noms français, anglais, espagnol et scientifique, rareté, habitat, États où on la trouve, description et anecdote.
- **Caractéristiques** sous le nom de chaque espèce : une ligne poids · taille (hauteur, longueur ou envergure) · type, puis longévité, régime, activité, vitesse max et petits ou œufs par portée. Les 13 « types » de l’Anidex (Terrestre, Arboricole, Volant, Aquatique, Fouisseur, Nocturne, Carnivore, Herbivore, Insectivore, Omnivore, Venimeux, Toxique, Planeur) ont chacun une couleur et une icône. Chaque valeur chiffrée a été confrontée à l’article Wikipédia de l’espèce ; ce qui n’a pas pu être confirmé s’affiche « — ».
- **Cartes** : chaque fiche a une carte de répartition de l’Australie (SVG intégré, sans service payant). Les États où l’espèce vit sont colorés : foncé pour une espèce commune, clair pour une espèce rare ou localisée, hachuré pour une espèce introduite. Tes observations géolocalisées apparaissent en points (touche-les pour voir la date). Le mode « Zones réelles » affiche des carrés d’environ 100 km où l’espèce a été observée, d’après l’API publique et gratuite de l’Atlas of Living Australia ; les données sont gardées 30 jours sur l’appareil, et sans connexion la carte revient à l’affichage par États. Le Journal affiche une carte de toutes tes observations.
- **Amis** (facultatif, via Supabase) : compte avec un simple pseudo (sans e-mail), code ami à partager, liste d’amis, fiche de progression d’un ami et classement. Seuls l’espèce, le jour et l’**État** des observations sont partagés : jamais la position GPS ni le lieu précis, et aucun lieu pour les espèces menacées. Sans compte ou hors connexion, l’appli fonctionne comme avant. Mise en route pas à pas : [`supabase/GUIDE.md`](supabase/GUIDE.md).
- **Conservation** sur chaque fiche : statut mondial (UICN), national (loi EPBC) et en Victoria (loi FFG), tendance de la population, principales menaces, gestes utiles, programmes de protection et, pour les espèces introduites, leur impact. Filtres « Menacées » et « Menacées en Victoria », écran de bilan et écran « Animal blessé ? » avec les numéros de secours de chaque État.
- Une espèce est **découverte** dès qu’une observation **avec photo** est enregistrée. Avant cela, sa fiche est **verrouillée** : la grille montre le numéro, la silhouette mystère et le nom ; la fiche montre les noms (français, anglais, scientifique), la catégorie, la rareté et un bloc **Indices** (habitat, États, carte), avec un bouton qui ouvre directement l’appareil photo. Description, « Le savais-tu ? », caractéristiques, conservation et autres infos restent cachées (🔒). Au déblocage, la silhouette se colore et les infos apparaissent une à une.
- **Mode explorateur** (Réglages, désactivé par défaut) : affiche toutes les fiches sans changer la progression.
- **Observer** : prends une photo (ou importe-la depuis la galerie) et l’IA propose jusqu’à 3 espèces avec un indice de confiance. Tu confirmes d’un geste. Sans connexion ni clé API, tu peux choisir l’espèce dans la liste.
- **Journal de terrain** : toutes tes observations avec photo, date, lieu (géolocalisation) et méthode d’identification.
- **Progression** : XP selon la rareté (commun 10, peu commun 25, rare 50, légendaire 100 ; 2 XP pour une espèce déjà vue), 10 rangs, du « Touriste curieux » à la « Légende de l’Anidex ».
- **20 badges** : par catégorie, espèces rares ou légendaires, animaux dangereux (de loin !), espèces invasives, espèces menacées, États visités, etc.
- Recherche, filtres par catégorie et par statut (découverts ou à trouver).
- **Français / English / Español** : choix « Langue / Language / Idioma » dans les réglages (icône engrenage). Toute l’interface est traduite, ainsi que les fiches des 151 espèces (textes, conservation, caractéristiques, numéros de secours). Le nom affiché est le nom courant dans la langue choisie ; en espagnol, quand aucun nom commun fiable n’existe, c’est le nom anglais (le nom scientifique est toujours affiché). Dates et nombres suivent la langue (« 24 de noviembre de 2026 », « 1,5 kg »). Au premier lancement, l’app suit la langue du téléphone (français, anglais ou espagnol ; anglais pour les autres langues) ; le choix est ensuite mémorisé. Ajouter une langue : voir [src/i18n/README.md](src/i18n/README.md).
- Toutes les données restent sur l’appareil. Sur mobile, la clé API est stockée chiffrée (Keychain / Keystore) ; sur le web, elle est enregistrée dans le navigateur.

## Identification par IA

L’identification utilise l’API Claude d’Anthropic (modèle `claude-opus-5-5`, vision + sortie JSON structurée). L’app envoie la photo, redimensionnée à 1280 px, avec le catalogue de l’Anidex, et Claude répond avec les numéros d’espèces les plus probables.

1. Crée une clé API sur <https://console.anthropic.com>.
2. Dans l’app, ouvre **Réglages** (roue dentée) et colle la clé.

Chaque identification est facturée sur ton compte Anthropic (une image + le catalogue ≈ quelques milliers de tokens d’entrée par photo).

> L’appel part directement du téléphone avec la clé de l’utilisateur. C’est adapté à un usage personnel. Pour publier l’app sur les stores, il faudra plutôt passer par un petit serveur qui détient la clé.

## Lancer l’app

```bash
npm install
npx expo start
```

Ensuite :
- **Sur ton téléphone** : installe *Expo Go* et scanne le QR code (ou utilise une build de développement : `npx expo run:ios` / `npx expo run:android`).
- **Dans le navigateur** (aperçu rapide) : touche `w`.

Builds de production avec EAS : `npx eas-cli@latest build -p ios|android`.

## Version web (GitHub Pages)

Chaque push sur `main` déclenche le workflow `.github/workflows/deploy-pages.yml`, qui vérifie le code (types et lint), construit la version web et la publie sur `https://<utilisateur>.github.io/<dépôt>/`.

Sur un téléphone Android, ouvre le site dans Chrome puis utilise le menu ⋮ → **Ajouter à l’écran d’accueil** (ou **Installer l’application**). Le bouton « Prendre une photo » ouvre directement l’appareil photo arrière.

Particularités du web :
- les photos sont stockées dans IndexedDB et les observations dans le stockage local du navigateur : **vider les données du site efface la collection** ;
- l’État australien est estimé à partir des coordonnées GPS (frontières simplifiées), faute de géocodage inverse dans le navigateur ;
- la clé API est enregistrée en clair dans le navigateur : n’utilise la clé que sur ton propre appareil et fixe-lui une limite de dépenses dans la console Anthropic.

Construire la version web en local :

```bash
npm run build:web                                   # site servi à la racine
EXPO_PUBLIC_BASE_URL=/Anidex npm run build:web      # comme sur GitHub Pages
npx serve dist                                      # aperçu
```

## Structure

```
src/
  app/                  # écrans (Expo Router)
    (tabs)/index.tsx    # l’Anidex (grille des espèces)
    (tabs)/observer.tsx # photo → identification → récompense
    (tabs)/journal.tsx  # carnet d’observations
    (tabs)/badges.tsx   # niveau, statistiques et badges
    animal/[id].tsx     # fiche d’une espèce
    reglages.tsx        # clé API, localisation, données
  data/animals.ts       # catalogue des 151 espèces
  data/conservation.ts  # statuts UICN / EPBC / FFG, menaces, gestes, programmes
  data/rescue.ts        # numéros de secours pour la faune, par État
  data/traits.ts        # poids, taille, types, longévité… des 151 espèces
  data/animalTypes.ts   # les 13 types : couleur et icône
  data/australiaMap.ts  # contours SVG des États (généré par npm run gen:map, Natural Earth)
  lib/alaGrid.ts        # zones réelles de présence (Atlas of Living Australia) + cache
  lib/supabase.ts       # connexion Supabase (clé publique uniquement)
  lib/friends.ts        # API amis : compte, code, amis, synchronisation
  lib/friendsStore.tsx  # état du système d’amis, cache hors connexion
supabase/anidex.sql     # tables, règles RLS et fonctions (à coller dans Supabase)
supabase/GUIDE.md       # guide de mise en route depuis un téléphone
supabase/tests/         # tests des règles de sécurité sur PostgreSQL
  data/meta.ts          # couleurs, XP et ordres d’affichage
  i18n/registry.ts      # registre des langues (fr, en, es)
  i18n/<langue>/ui.ts   # textes de l’interface (même structure, vérifiée par TypeScript)
  i18n/<langue>/content.ts # textes des 151 fiches, conservation, secours
  i18n/index.tsx        # langue choisie, langue du téléphone, mémorisation
  lib/identify.ts       # identification avec Claude
  lib/progress.ts       # XP, niveaux et badges
  lib/store.tsx         # état global + persistance
  lib/storage.ts        # observations, réglages, clé API
  lib/photoStore.ts     # photos : fichiers (mobile) ou IndexedDB (photoStore.web.ts)
  lib/capture.ts        # appareil photo, redimensionnement, GPS
scripts/postbuild-web.mjs  # finalise l’export web (manifeste PWA, 404.html)
scripts/check-i18n.mjs     # textes en dur, traductions manquantes ou oubliées (toutes les langues)
```

## Ajouter une espèce

Ajoute une entrée **à la fin** de `src/data/animals.ts` : les numéros sont attribués dans l’ordre, donc en insérer une au milieu décalerait les numéros des observations déjà enregistrées. Ajoute ensuite ses textes (nom, habitat, description, anecdote, régime) sous son numéro dans chaque `src/i18n/<langue>/content.ts` ; `npm run check:i18n` signale ceux qui manquent.

## Sources des données de conservation

Vérifiées en novembre 2026 :
- **UICN** : catégorie de la Liste rouge lue via l’API GBIF, recoupée avec BirdLife et les communiqués de l’UICN pour les cas douteux.
- **EPBC** (national) et **FFG** (Victoria) : copies officielles des listes publiées par l’Atlas of Living Australia (listes `dr656` et `dr655`, synchronisées en mai 2026). Les sites du gouvernement australien et de Victoria bloquent l’accès automatisé.
- **Tendance de la population** : estimation, affichée comme telle. Elle n’a pas pu être vérifiée, car le site et l’API de l’UICN nécessitent un compte.
- **Numéros de secours** : chaque numéro indique son niveau de vérification (page officielle, plusieurs sources, ou à confirmer).

Quand une information est incertaine (taxonomie débattue, évaluation contestée, inscription limitée à une sous-espèce), la fiche le précise.

## Ajouter ou modifier un texte

Ajoute la clé dans chaque `src/i18n/<langue>/ui.ts` (TypeScript signale celle qui manque), puis utilise-la via `const { s } = useI18n()`. `npm run check:i18n` signale tout texte resté en dur dans les écrans.

## Vérifications

```bash
npm run typecheck
npm run lint
npm run check:i18n
npm run gen:sql -- --check   # liste des espèces sensibles à jour dans le SQL
```
