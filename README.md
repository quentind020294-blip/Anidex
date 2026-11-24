# Anidex 🦘

Un **Pokédex de la faune australienne**, inspiré de l’application Seek : photographie un animal, l’Anidex l’identifie et l’ajoute à ta collection. Gagne de l’XP, monte de niveau et débloque des badges.

Application mobile **iOS / Android** construite avec Expo (React Native + TypeScript).

## Fonctionnalités

- **Anidex de 105 espèces** australiennes, numérotées de #001 à #105 : mammifères, oiseaux, reptiles, amphibiens, vie marine et invertébrés. Pour chaque espèce : noms français, anglais et scientifique, rareté, habitat, États où on la trouve, statut UICN, description et anecdote.
- Les espèces pas encore observées apparaissent comme des **silhouettes mystère** ; une fois découvertes, elles affichent **ta photo**.
- **Observer** : prends une photo (ou importe-la depuis la galerie) et l’IA propose jusqu’à 3 espèces avec un indice de confiance. Tu confirmes d’un geste. Sans connexion ni clé API, tu peux choisir l’espèce dans la liste.
- **Journal de terrain** : toutes tes observations avec photo, date, lieu (géolocalisation) et méthode d’identification.
- **Progression** : XP selon la rareté (commun 10, peu commun 25, rare 50, légendaire 100 ; 2 XP pour une espèce déjà vue), 10 rangs, du « Touriste curieux » à la « Légende de l’Anidex ».
- **20 badges** : par catégorie, espèces rares ou légendaires, animaux dangereux (de loin !), espèces invasives, espèces menacées, États visités, etc.
- Recherche, filtres par catégorie et par statut (découverts ou à trouver).
- Toutes les données restent sur le téléphone. La clé API est stockée chiffrée (Keychain / Keystore).

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
  data/animals.ts       # catalogue des 105 espèces
  data/meta.ts          # catégories, raretés, États, statuts UICN
  lib/identify.ts       # identification avec Claude
  lib/progress.ts       # XP, niveaux et badges
  lib/store.tsx         # état global + persistance
  lib/storage.ts        # AsyncStorage, SecureStore, photos
  lib/capture.ts        # appareil photo, redimensionnement, GPS
```

## Ajouter une espèce

Ajoute une entrée `sp(...)` **à la fin** de `src/data/animals.ts` : les numéros sont attribués dans l’ordre, donc en insérer une au milieu décalerait les numéros des observations déjà enregistrées.

## Vérifications

```bash
npm run typecheck
npm run lint
```
