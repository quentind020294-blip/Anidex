// Textes de l'interface en français. en.ts doit avoir exactement la même structure
// (TypeScript le vérifie grâce au type Strings).

export const fr = {
  dateLocale: 'fr-FR',

  tabs: { dex: 'Anidex', observe: 'Observer', journal: 'Journal', badges: 'Badges' },
  screens: { settings: 'Réglages', notFound: 'Introuvable' },

  a11y: {
    settings: 'Réglages',
    languageSwitch: 'Changer de langue',
    deleteSighting: 'Supprimer l’observation',
  },

  language: {
    title: 'Langue',
    hint: 'Par défaut, l’Anidex utilise la langue de ton téléphone.',
  },

  categories: {
    mammifere: { label: 'Mammifère', plural: 'Mammifères' },
    oiseau: { label: 'Oiseau', plural: 'Oiseaux' },
    reptile: { label: 'Reptile', plural: 'Reptiles' },
    amphibien: { label: 'Amphibien', plural: 'Amphibiens' },
    marin: { label: 'Marin', plural: 'Vie marine' },
    invertebre: { label: 'Invertébré', plural: 'Invertébrés' },
  },

  rarities: { commun: 'Commun', 'peu-commun': 'Peu commun', rare: 'Rare', legendaire: 'Légendaire' },

  states: {
    NSW: 'Nouvelle-Galles du Sud',
    VIC: 'Victoria',
    QLD: 'Queensland',
    WA: 'Australie-Occidentale',
    SA: 'Australie-Méridionale',
    TAS: 'Tasmanie',
    NT: 'Territoire du Nord',
    ACT: 'Territoire de la capitale',
  },

  conservation: {
    LC: 'Préoccupation mineure',
    NT: 'Quasi menacée',
    VU: 'Vulnérable',
    EN: 'En danger',
    CR: 'En danger critique',
  },

  ranks: [
    'Touriste curieux',
    'Randonneur',
    'Explorateur du bush',
    'Ranger junior',
    'Ranger',
    'Naturaliste',
    'Pisteur aguerri',
    'Gardien de l’Outback',
    'Maître du Bush',
    'Légende de l’Anidex',
  ],

  dex: {
    discovered: 'Espèces découvertes',
    level: (n: number) => `Niveau ${n}`,
    search: 'Rechercher (nom, n°, nom scientifique…)',
    allCategories: 'Tous',
    showAll: 'Tout',
    showFound: 'Découverts',
    showMissing: 'À trouver',
    emptyNone: 'Aucune espèce découverte pour l’instant.\nVa dans l’onglet « Observer » pour commencer !',
    emptySearch: 'Aucune espèce ne correspond à ta recherche.',
  },

  observe: {
    title: 'Pars à la découverte !',
    subtitle: 'Photographie un animal australien : l’Anidex l’identifie et l’ajoute à ta collection.',
    takePhoto: 'Prendre une photo',
    importPhoto: 'Importer depuis la galerie',
    aiTitle: '🤖 Identification automatique',
    aiText:
      'Ajoute ta clé API Claude dans les réglages pour que l’app reconnaisse les animaux toute seule. Sans clé, tu choisis l’espèce dans la liste.',
    openSettings: 'Ouvrir les réglages',
    tipsTitle: 'Conseils de ranger',
    tips: [
      'Garde tes distances : serpents, crocodiles et araignées se photographient de loin.',
      'Ne nourris pas les animaux sauvages.',
      'Cadre l’animal en entier, bien net et éclairé.',
      'Les espèces rares rapportent plus d’XP !',
    ],
    footnote: (n: number, total: number) => `${n} / ${total} espèces découvertes`,
    analyzing: 'Analyse en cours…',
    analyzingText: (total: number) => `L’Anidex compare ta photo aux ${total} espèces du catalogue.`,
    saving: 'Enregistrement…',
    whichSpecies: 'Quelle espèce as-tu photographiée ?',
    pickOther: 'Autre espèce : choisir dans la liste',
    pickFromList: 'Choisir l’espèce dans la liste',
    retry: 'Relancer l’identification',
    cancel: 'Annuler',
    resultFound: 'Voici ce que l’Anidex a trouvé :',
    noAnimal: 'Aucun animal détecté sur cette photo.',
    outsideDex: (name: string) => `Ça ressemble à : ${name}. Cette espèce n’est pas (encore) dans l’Anidex.`,
    unknown: 'Impossible de reconnaître une espèce de l’Anidex.',
    alreadyFound: 'déjà découvert',
    newSpecies: 'nouvelle espèce !',
    itsThisOne: 'C’est lui !',
    ratherThis: 'Plutôt celui-ci',
    pickerTitle: 'Choisir l’espèce',
    pickerSearch: 'Rechercher une espèce…',
    close: 'Fermer',
    rewardNew: 'NOUVELLE ESPÈCE !',
    rewardRepeat: 'Nouvelle observation',
    levelReached: (n: number) => `Niveau ${n} atteint !`,
    nowRank: (rank: string) => `Tu es maintenant « ${rank} ».`,
    badgeUnlocked: 'Badge débloqué',
    didYouKnow: 'Le savais-tu ?',
    seeEntry: 'Voir la fiche',
    newObservation: 'Nouvelle observation',
  },

  errors: {
    openPhoto: 'Impossible d’ouvrir la photo.',
    cameraPermission: 'L’accès à l’appareil photo est nécessaire pour observer des animaux.',
    preparePhoto: 'Impossible de préparer la photo.',
    identify: {
      noKey: 'Ajoute ta clé API Claude dans les réglages pour activer l’identification automatique.',
      auth: 'Clé API invalide. Vérifie-la dans les réglages.',
      permission: 'Cette clé API n’a pas accès au modèle demandé.',
      rateLimit: 'Trop de demandes d’un coup. Réessaie dans quelques instants.',
      badRequest: 'La photo n’a pas pu être analysée (format ou taille). Essaie une autre photo.',
      connection: 'Pas de connexion Internet. Tu peux choisir l’espèce manuellement.',
      api: (status: string) => `Le service d’identification est indisponible (erreur ${status}).`,
      refusal: 'Cette photo n’a pas pu être analysée. Choisis l’espèce manuellement.',
      empty: 'Réponse vide du service d’identification.',
      parse: 'Réponse illisible du service d’identification.',
      generic: 'L’identification a échoué. Choisis l’espèce manuellement.',
    },
  },

  journal: {
    count: (n: number) => `${n} observation${n > 1 ? 's' : ''}`,
    emptyTitle: 'Ton carnet de terrain est vide',
    emptyText: 'Chaque animal que tu photographies apparaîtra ici, avec la date et le lieu.',
    firstObservation: 'Faire ma première observation',
  },

  method: {
    ai: (pct?: number) => `🤖 Identifié par l’IA${pct != null ? ` (${pct} %)` : ''}`,
    manual: '✍️ Identifié manuellement',
  },

  badgesScreen: {
    levelShort: 'NIV.',
    xpLeft: (xp: number, left: number, next: number) => `${xp} XP · encore ${left} XP pour le niveau ${next}`,
    xpMax: (xp: number) => `${xp} XP · niveau maximum !`,
    collection: 'Collection par catégorie',
    title: (n: number, total: number) => `Badges · ${n} / ${total}`,
    unlocked: 'Débloqué ✓',
  },

  badges: {
    first: { title: 'Premiers pas', desc: 'Ajoute ta première espèce à l’Anidex.' },
    ten: { title: 'Collectionneur', desc: 'Découvre 10 espèces différentes.' },
    twentyfive: { title: 'Naturaliste en herbe', desc: 'Découvre 25 espèces différentes.' },
    fifty: { title: 'Encyclopédie vivante', desc: 'Découvre 50 espèces différentes.' },
    all: { title: 'Anidex complet', desc: (total: number) => `Découvre les ${total} espèces de l’Anidex.` },
    icons: {
      title: 'Icônes australiennes',
      desc: 'Observe le kangourou roux, le koala, le wombat, l’ornithorynque, l’échidné et l’émeu.',
    },
    category: {
      mammifere: 'Ami des marsupiaux',
      oiseau: 'Ornithologue',
      reptile: 'Herpétologue',
      amphibien: 'Roi de la mare',
      marin: 'Plongeur du récif',
      invertebre: 'Entomologiste',
    },
    categoryDesc: (plural: string, goal: number, total: number) =>
      `Découvre ${goal} espèces de la catégorie « ${plural} » (sur ${total}).`,
    rare: { title: 'Œil de lynx', desc: 'Découvre 5 espèces rares.' },
    legend: { title: 'Chasseur de légendes', desc: 'Découvre une espèce légendaire.' },
    danger: { title: 'Sang-froid', desc: 'Observe (de loin !) 3 espèces dangereuses.' },
    invasive: { title: 'Sentinelle', desc: 'Signale 3 espèces introduites envahissantes.' },
    endangered: { title: 'Protecteur', desc: 'Observe 3 espèces menacées (vulnérables ou plus).' },
    states3: { title: 'Globe-trotter', desc: 'Fais des observations dans 3 États ou territoires.' },
    states8: { title: 'Tour d’Australie', desc: 'Fais des observations dans les 8 États et territoires.' },
    obs50: { title: 'Observateur assidu', desc: 'Enregistre 50 observations.' },
  },

  animal: {
    notFound: 'Espèce introuvable.',
    discovered: (n: number) => `✓ Découvert · ${n} observation${n > 1 ? 's' : ''}`,
    notSeen: 'Pas encore observé',
    dangerous: '☠️ Espèce dangereuse : observe-la de loin et ne la touche jamais.',
    introduced: '🚨 Espèce introduite : elle menace la faune locale.',
    description: 'Description',
    didYouKnow: 'Le savais-tu ?',
    habitat: 'Habitat',
    conservation: 'Statut de conservation (UICN)',
    whereToSee: 'Où l’observer',
    mySightings: 'Mes observations',
    foundIt: 'Je l’ai trouvé ! Observer',
    deleteTitle: 'Supprimer cette observation ?',
    deleteText: 'La photo sera aussi supprimée.',
    delete: 'Supprimer',
    cancel: 'Annuler',
  },

  settings: {
    aiTitle: '🤖 Identification par IA',
    aiText:
      'L’Anidex utilise Claude (Anthropic) pour reconnaître les animaux sur tes photos. Crée une clé API sur console.anthropic.com puis colle-la ici. Elle n’est envoyée qu’à l’API d’Anthropic.',
    keyStorageWeb:
      'Sur la version web, elle est enregistrée dans ce navigateur uniquement (non chiffrée) : n’utilise l’app que sur ton propre appareil, et fixe une limite de dépenses sur ta clé dans la console Anthropic.',
    keyStorageNative: 'Elle est stockée de façon chiffrée sur ton appareil.',
    keySaved: (masked: string) => `✓ Clé enregistrée (${masked})`,
    noKey: 'Aucune clé enregistrée : identification manuelle uniquement.',
    save: 'Enregistrer',
    saved: 'Enregistrée ✓',
    remove: 'Supprimer',
    autoIdentify: 'Identifier automatiquement après la photo',
    locationTitle: '📍 Localisation',
    saveLocation: 'Enregistrer le lieu de chaque observation',
    locationHint: 'Le lieu sert à ton journal et aux badges d’exploration. Il reste sur ton téléphone.',
    dataTitle: '🗂️ Données',
    dataSummary: (n: number, total: number) => `${n} observation(s) enregistrée(s) · ${total} espèces dans l’Anidex.`,
    resetAll: 'Tout effacer',
    resetTitle: 'Tout effacer ?',
    resetText: (n: number) => `Toutes tes observations (${n}) et leurs photos seront supprimées.`,
    cancel: 'Annuler',
    footer: 'Anidex · Un Pokédex de la faune australienne.\nRespecte la faune : observe sans déranger. 🦘',
  },

  notFound: {
    title: 'Cette page a filé dans le bush',
    text: 'L’adresse demandée n’existe pas.',
    back: 'Retour à l’Anidex',
  },

  // Consignes envoyées à l'IA avec chaque photo.
  ai: {
    question: 'Quel animal vois-tu sur cette photo ?',
    replyLanguage: 'Rédige « comment » et « outside_dex » en français.',
  },
};

type Widen<T> = T extends string
  ? string
  : T extends (...args: infer A) => infer R
    ? (...args: A) => Widen<R>
    : T extends readonly (infer U)[]
      ? Widen<U>[]
      : { [K in keyof T]: Widen<T[K]> };

/** Structure commune à toutes les langues. */
export type Strings = Widen<typeof fr>;
