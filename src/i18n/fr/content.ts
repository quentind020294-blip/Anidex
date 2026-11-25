// Contenu des fiches en français : noms, textes des espèces, conservation et secours.
// Chaque langue a un fichier de même structure (src/i18n/<langue>/content.ts).
import type { ContentPack } from '../types';

export const content: ContentPack = {
  species: {
    // #001 Osphranter rufus
    1: {
      name: "Kangourou roux",
      habitat: "Plaines arides et semi-arides de l’intérieur",
      description: "Le plus grand marsupial vivant : un mâle peut dépasser 1,8 m debout. Il vit en groupes appelés « mobs ».",
      funFact: "Il peut faire des bonds de 8 m et atteindre 60 km/h.",
      diet: "Herbes et feuillages",
    },
    // #002 Macropus giganteus
    2: {
      name: "Kangourou gris de l’Est",
      habitat: "Forêts claires, prairies, terrains de golf",
      description: "Kangourou très répandu dans l’est du pays, au pelage gris-brun et au museau velu.",
      funFact: "On en croise souvent au crépuscule en train de brouter sur les pelouses.",
      diet: "Herbes et feuillages",
    },
    // #003 Notamacropus rufogriseus
    3: {
      name: "Wallaby à cou rouge",
      habitat: "Forêts d’eucalyptus et lisières",
      description: "Wallaby de taille moyenne reconnaissable à la teinte rousse de sa nuque et de ses épaules.",
      funFact: "En Tasmanie, on l’appelle « Bennett’s wallaby » et son pelage est plus épais.",
      diet: "Herbes et feuillages",
    },
    // #004 Osphranter robustus
    4: {
      name: "Wallaroo commun",
      habitat: "Zones rocheuses et escarpements",
      description: "Macropode trapu aux épaules puissantes, adapté aux terrains rocailleux.",
      funFact: "Il peut survivre plusieurs mois sans boire en s’abritant de la chaleur dans les grottes.",
      diet: "Herbes et feuillages",
    },
    // #005 Setonix brachyurus
    5: {
      name: "Quokka",
      habitat: "Île de Rottnest et forêts du sud-ouest",
      description: "Petit macropode à l’air souriant, devenu la star des selfies sur l’île de Rottnest.",
      funFact: "Il est interdit de le toucher ou de le nourrir : amende salée à la clé !",
      diet: "Herbes et feuillages",
    },
    // #006 Phascolarctos cinereus
    6: {
      name: "Koala",
      habitat: "Forêts d’eucalyptus",
      description: "Marsupial arboricole qui se nourrit presque exclusivement de feuilles d’eucalyptus.",
      funFact: "Il dort jusqu’à 20 heures par jour pour économiser son énergie.",
      diet: "Feuilles d’eucalyptus",
    },
    // #007 Vombatus ursinus
    7: {
      name: "Wombat commun",
      habitat: "Forêts, landes et prairies tempérées",
      description: "Marsupial fouisseur massif qui creuse de longs terriers. Sa poche s’ouvre vers l’arrière.",
      funFact: "Ses crottes sont cubiques, ce qui les empêche de rouler !",
      diet: "Herbes",
    },
    // #008 Ornithorhynchus anatinus
    8: {
      name: "Ornithorynque",
      habitat: "Rivières et ruisseaux d’eau douce",
      description: "Mammifère qui pond des œufs, doté d’un bec de canard et d’une queue de castor.",
      funFact: "Le mâle possède un éperon venimeux sur les pattes arrière.",
      diet: "Larves, vers et crevettes d’eau douce",
    },
    // #009 Tachyglossus aculeatus
    9: {
      name: "Échidné à nez court",
      habitat: "Presque tous les milieux, du désert à la forêt",
      description: "Mammifère ovipare couvert de piquants qui se nourrit de fourmis et de termites.",
      funFact: "Sa langue collante peut faire 18 cm de long.",
      diet: "Fourmis et termites",
    },
    // #010 Sarcophilus harrisii
    10: {
      name: "Diable de Tasmanie",
      habitat: "Forêts et bocages de Tasmanie",
      description: "Le plus grand marsupial carnivore actuel, connu pour ses cris terrifiants la nuit.",
      funFact: "Sa mâchoire est l’une des plus puissantes du règne animal par rapport à sa taille.",
      diet: "Charognes et petits animaux",
    },
    // #011 Canis dingo
    11: {
      name: "Dingo",
      habitat: "Déserts, forêts, côtes",
      description: "Canidé sauvage arrivé en Australie il y a environ 4 000 ans, superprédateur du continent.",
      funFact: "Le dingo n’aboie presque pas : il hurle.",
    },
    // #012 Trichosurus vulpecula
    12: {
      name: "Phalanger renard",
      habitat: "Forêts, parcs et… greniers urbains",
      description: "Possum nocturne à la queue touffue, très bien adapté à la vie en ville.",
      funFact: "Il adore squatter les toits des maisons australiennes.",
      diet: "Feuilles, fleurs et fruits",
    },
    // #013 Pseudocheirus peregrinus
    13: {
      name: "Pseudocheire commun",
      habitat: "Forêts, broussailles et jardins",
      description: "Petit possum à la queue préhensile au bout blanc, qui construit des nids appelés « dreys ».",
      funFact: "Il mange ses propres crottes molles pour mieux digérer les feuilles.",
      diet: "Feuilles, fleurs et fruits",
    },
    // #014 Petaurus breviceps
    14: {
      name: "Phalanger volant",
      habitat: "Forêts d’eucalyptus",
      description: "Petit marsupial planeur qui glisse d’arbre en arbre grâce à une membrane entre ses pattes.",
      funFact: "Il peut planer sur plus de 50 mètres.",
      diet: "Sève, nectar et insectes",
    },
    // #015 Myrmecobius fasciatus
    15: {
      name: "Numbat",
      habitat: "Forêts de wandoo du sud-ouest",
      description: "Marsupial rayé et diurne qui mange jusqu’à 20 000 termites par jour. Emblème de l’Australie-Occidentale.",
      funFact: "Il reste moins de 1 000 numbats adultes à l’état sauvage.",
      diet: "Termites",
    },
    // #016 Macrotis lagotis
    16: {
      name: "Grand bilby",
      habitat: "Déserts et savanes arides",
      description: "Marsupial nocturne aux grandes oreilles de lapin, symbole de la lutte contre les espèces invasives.",
      funFact: "En Australie, on offre des bilbies en chocolat à Pâques plutôt que des lapins.",
      diet: "Insectes, graines, bulbes et champignons",
    },
    // #017 Dasyurus maculatus
    17: {
      name: "Quoll tacheté",
      habitat: "Forêts humides et sclérophylles",
      description: "Marsupial carnivore au pelage brun moucheté de blanc, excellent grimpeur.",
      funFact: "C’est le deuxième plus grand marsupial carnivore après le diable de Tasmanie.",
      diet: "Petits mammifères et oiseaux",
    },
    // #018 Perameles nasuta
    18: {
      name: "Bandicoot à nez long",
      habitat: "Forêts, landes et jardins",
      description: "Petit marsupial au museau pointu qui creuse de petits trous coniques pour trouver des insectes.",
      funFact: "Sa gestation dure à peine 12 jours, l’une des plus courtes chez les mammifères.",
      diet: "Insectes et invertébrés",
    },
    // #019 Pteropus poliocephalus
    19: {
      name: "Renard volant à tête grise",
      habitat: "Forêts côtières, parcs urbains",
      description: "Grande chauve-souris frugivore au col roux qui forme d’immenses colonies en ville.",
      funFact: "Elle pollinise les eucalyptus sur des dizaines de kilomètres chaque nuit.",
      diet: "Nectar, pollen et fruits",
    },
    // #020 Petrogale xanthopus
    20: {
      name: "Wallaby des rochers à pieds jaunes",
      habitat: "Gorges et falaises de l’intérieur",
      description: "L’un des plus beaux macropodes, au pelage rayé gris, blanc, jaune et orange.",
      funFact: "Ses pattes rugueuses lui donnent une adhérence parfaite sur la roche.",
    },
    // #021 Thylogale billardierii
    21: {
      name: "Pademelon de Tasmanie",
      habitat: "Sous-bois humides de Tasmanie",
      description: "Petit macropode trapu et discret, au pelage épais et à la queue courte.",
      funFact: "Il a disparu du continent et ne survit plus qu’en Tasmanie.",
      diet: "Herbes",
    },
    // #022 Dendrolagus lumholtzi
    22: {
      name: "Kangourou arboricole de Lumholtz",
      habitat: "Forêts tropicales des Atherton Tablelands",
      description: "Kangourou qui vit dans les arbres ! Il grimpe grâce à ses pattes avant musclées.",
      funFact: "Il peut sauter d’une branche au sol depuis 15 m de haut sans se blesser.",
      diet: "Feuilles",
    },
    // #023 Oryctolagus cuniculus
    23: {
      name: "Lapin de garenne",
      habitat: "Prairies, champs, zones dégradées",
      description: "Introduit en 1859, il est devenu l’une des pires espèces invasives du pays.",
      funFact: "La plus longue clôture du monde (plus de 3 000 km) a été construite pour l’arrêter.",
      diet: "Herbes et feuillages",
    },
    // #024 Vulpes vulpes
    24: {
      name: "Renard roux",
      habitat: "Presque partout sauf le grand nord tropical",
      description: "Introduit au XIXᵉ siècle pour la chasse, il menace aujourd’hui de nombreux petits marsupiaux.",
      funFact: "On estime qu’il y a plus de 1,7 million de renards en Australie.",
      diet: "Petits mammifères, oiseaux, insectes, fruits",
    },
    // #025 Camelus dromedarius
    25: {
      name: "Dromadaire sauvage",
      habitat: "Déserts du centre",
      description: "Importés au XIXᵉ siècle pour explorer l’Outback, leurs descendants vivent aujourd’hui à l’état sauvage.",
      funFact: "L’Australie abrite la plus grande population de dromadaires sauvages au monde.",
      diet: "Plantes du désert",
    },
    // #026 Dromaius novaehollandiae
    26: {
      name: "Émeu d’Australie",
      habitat: "Plaines, savanes et forêts claires",
      description: "Deuxième plus grand oiseau du monde après l’autruche, incapable de voler.",
      funFact: "C’est le mâle qui couve les œufs pendant 8 semaines sans manger.",
      diet: "Graines, fruits, insectes",
    },
    // #027 Casuarius casuarius
    27: {
      name: "Casoar à casque",
      habitat: "Forêts tropicales humides du nord du Queensland",
      description: "Oiseau géant au casque osseux et au cou bleu vif, jardinier essentiel de la forêt tropicale.",
      funFact: "Ses griffes de 12 cm en font l’un des oiseaux les plus dangereux du monde.",
      diet: "Fruits tombés",
    },
    // #028 Dacelo novaeguineae
    28: {
      name: "Martin-chasseur géant",
      habitat: "Forêts claires, parcs et jardins",
      description: "Le célèbre kookaburra, dont le chant ressemble à un éclat de rire.",
      funFact: "Il chasse les serpents en les lâchant depuis une hauteur.",
      diet: "Insectes, lézards, serpents, rongeurs",
    },
    // #029 Cacatua galerita
    29: {
      name: "Cacatoès à huppe jaune",
      habitat: "Forêts, parcs et villes",
      description: "Grand cacatoès blanc à la crête jaune, bruyant et très intelligent.",
      funFact: "À Sydney, ils ont appris à ouvrir les poubelles… et se transmettent la technique !",
      diet: "Graines et fruits",
    },
    // #030 Eolophus roseicapilla
    30: {
      name: "Cacatoès rosalbin",
      habitat: "Plaines, champs et villes",
      description: "Cacatoès rose et gris très commun, souvent vu en grandes bandes au sol.",
      funFact: "En argot australien, « galah » veut dire… « idiot » !",
      diet: "Graines",
    },
    // #031 Trichoglossus moluccanus
    31: {
      name: "Loriquet arc-en-ciel",
      habitat: "Forêts côtières, jardins fleuris",
      description: "Perroquet aux couleurs éclatantes qui se nourrit de nectar grâce à sa langue en brosse.",
      funFact: "Ils forment des dortoirs de plusieurs milliers d’oiseaux en ville.",
      diet: "Nectar, pollen et fruits",
    },
    // #032 Melopsittacus undulatus
    32: {
      name: "Perruche ondulée",
      habitat: "Savanes et prairies arides",
      description: "Petite perruche verte et jaune, nomade, qui suit la pluie dans l’intérieur des terres.",
      funFact: "À l’état sauvage, elles volent en nuées de dizaines de milliers d’individus.",
      diet: "Graines de graminées",
    },
    // #033 Nymphicus hollandicus
    33: {
      name: "Calopsitte élégante",
      habitat: "Zones arides proches de l’eau",
      description: "Petit cacatoès gris à la crête jaune et aux joues orange.",
      funFact: "C’est le plus petit membre de la famille des cacatoès.",
      diet: "Graines",
    },
    // #034 Calyptorhynchus banksii
    34: {
      name: "Cacatoès banksien",
      habitat: "Forêts claires et savanes",
      description: "Grand cacatoès noir dont la queue révèle des bandes rouges vif en vol.",
      funFact: "Il peut vivre plus de 50 ans.",
      diet: "Graines d’eucalyptus et de banksia",
    },
    // #035 Lophochroa leadbeateri
    35: {
      name: "Cacatoès de Leadbeater",
      habitat: "Bush aride et zones de mallee",
      description: "Cacatoès rose saumon à la crête rouge, jaune et blanche : l’un des plus beaux du monde.",
      funFact: "Sa crête dépliée ressemble à un éventail de feu.",
    },
    // #036 Menura novaehollandiae
    36: {
      name: "Ménure superbe",
      habitat: "Forêts humides de montagne",
      description: "Oiseau-lyre à la queue spectaculaire, champion mondial de l’imitation.",
      funFact: "Il imite les autres oiseaux, mais aussi les appareils photo et les tronçonneuses !",
      diet: "Insectes et invertébrés",
    },
    // #037 Gymnorhina tibicen
    37: {
      name: "Cassican flûteur",
      habitat: "Parcs, terrains de sport, campagnes",
      description: "Oiseau noir et blanc au chant mélodieux, emblématique des matins australiens.",
      funFact: "Au printemps, certains mâles attaquent les cyclistes qui s’approchent de leur nid.",
      diet: "Vers et insectes du sol",
    },
    // #038 Threskiornis molucca
    38: {
      name: "Ibis blanc d’Australie",
      habitat: "Zones humides, parcs urbains",
      description: "Grand échassier blanc au bec courbé, devenu un habitué des poubelles urbaines.",
      funFact: "Surnommé affectueusement « bin chicken » (le poulet des poubelles).",
      diet: "Écrevisses et restes alimentaires",
    },
    // #039 Pelecanus conspicillatus
    39: {
      name: "Pélican à lunettes",
      habitat: "Lacs, estuaires et côtes",
      description: "Grand pélican blanc et noir, au bec le plus long de tous les oiseaux.",
      funFact: "Son bec peut mesurer jusqu’à 50 cm.",
      diet: "Poissons",
    },
    // #040 Cygnus atratus
    40: {
      name: "Cygne noir",
      habitat: "Lacs, marais et estuaires",
      description: "Cygne entièrement noir au bec rouge vif, emblème de l’Australie-Occidentale.",
      funFact: "Les Européens croyaient que les cygnes noirs n’existaient pas… jusqu’en 1697.",
      diet: "Plantes aquatiques et algues",
    },
    // #041 Eudyptula minor
    41: {
      name: "Manchot pygmée",
      habitat: "Côtes et îles du sud",
      description: "Le plus petit manchot du monde, au plumage bleuté, qui rentre au nid à la tombée de la nuit.",
      funFact: "La « parade des manchots » de Phillip Island attire des milliers de visiteurs chaque soir.",
      diet: "Petits poissons et calmars",
    },
    // #042 Malurus cyaneus
    42: {
      name: "Mérion superbe",
      habitat: "Buissons, jardins et parcs",
      description: "Minuscule passereau dont le mâle arbore un plumage bleu électrique en période nuptiale.",
      funFact: "Les femelles apprennent un « mot de passe » à leurs œufs avant l’éclosion.",
      diet: "Insectes",
    },
    // #043 Aquila audax
    43: {
      name: "Aigle d’Australie",
      habitat: "Presque tous les milieux ouverts",
      description: "Le plus grand rapace d’Australie, à la queue en forme de losange.",
      funFact: "Son envergure peut atteindre 2,8 m.",
      diet: "Lapins, wallabies, charognes",
    },
    // #044 Haliaeetus leucogaster
    44: {
      name: "Pygargue blagre",
      habitat: "Côtes, grands lacs et rivières",
      description: "Grand aigle blanc et gris qui chasse poissons et serpents d’eau près des côtes.",
      funFact: "Les couples réutilisent le même nid géant pendant des années.",
      diet: "Poissons, serpents de mer, oiseaux",
    },
    // #045 Podargus strigoides
    45: {
      name: "Podarge gris",
      habitat: "Forêts claires et parcs",
      description: "Oiseau nocturne au camouflage parfait qui imite une branche cassée le jour.",
      funFact: "Ce n’est pas un hibou : il est plus proche des engoulevents.",
      diet: "Insectes et invertébrés",
    },
    // #046 Ninox boobook
    46: {
      name: "Ninoxe boubouk",
      habitat: "Forêts et zones boisées",
      description: "Petite chouette brune dont le cri « boo-book » a donné son nom.",
      funFact: "C’est la plus petite et la plus répandue des chouettes d’Australie.",
      diet: "Insectes et petits mammifères",
    },
    // #047 Ninox strenua
    47: {
      name: "Ninoxe puissante",
      habitat: "Forêts humides à grands arbres",
      description: "La plus grande chouette d’Australie, capable de capturer des possums.",
      funFact: "Elle garde souvent sa proie entre ses serres toute la journée.",
      diet: "Possums et grands planeurs",
    },
    // #048 Antigone rubicunda
    48: {
      name: "Grue brolga",
      habitat: "Zones humides et prairies inondables",
      description: "Grande grue grise à la tête rouge, célèbre pour ses danses nuptiales.",
      funFact: "Sa danse a inspiré de nombreuses danses aborigènes.",
      diet: "Insectes et grenouilles",
    },
    // #049 Ephippiorhynchus asiaticus
    49: {
      name: "Jabiru d’Asie",
      habitat: "Marais et billabongs tropicaux",
      description: "Grande cigogne au cou noir irisé et aux pattes rouges, appelée « jabiru » en Australie.",
      funFact: "C’est la seule cigogne d’Australie.",
      diet: "Poissons et grenouilles",
    },
    // #050 Manorina melanocephala
    50: {
      name: "Méliphage bruyant",
      habitat: "Parcs, jardins et forêts claires",
      description: "Passereau gris au masque jaune, très territorial et… très bavard.",
      funFact: "Ils chassent ensemble les autres oiseaux de leur territoire.",
      diet: "Nectar, insectes et fruits",
    },
    // #051 Ptilonorhynchus violaceus
    51: {
      name: "Jardinier satiné",
      habitat: "Forêts humides et jardins",
      description: "Le mâle bleu-noir construit une tonnelle décorée d’objets bleus pour séduire la femelle.",
      funFact: "Il collectionne bouchons, pinces à linge et pailles… tant qu’ils sont bleus !",
      diet: "Fruits et insectes",
    },
    // #052 Alectura lathami
    52: {
      name: "Talégalle de Latham",
      habitat: "Forêts humides, jardins de banlieue",
      description: "Gros oiseau noir à tête rouge qui construit un énorme tas de compost pour incuber ses œufs.",
      funFact: "Le mâle vérifie la température du nid avec son bec.",
    },
    // #053 Chloebia gouldiae
    53: {
      name: "Diamant de Gould",
      habitat: "Savanes tropicales du nord",
      description: "Petit passereau aux couleurs incroyables : violet, vert, jaune et rouge.",
      funFact: "Il en reste seulement quelques milliers à l’état sauvage.",
      diet: "Graines de graminées",
    },
    // #054 Pardalotus punctatus
    54: {
      name: "Pardalote pointillé",
      habitat: "Forêts d’eucalyptus",
      description: "Minuscule oiseau couvert de points blancs, qui niche dans des tunnels creusés dans la terre.",
      funFact: "Il pèse à peine 8 grammes.",
    },
    // #055 Rhipidura leucophrys
    55: {
      name: "Rhipidure hochequeue",
      habitat: "Partout sauf en forêt dense",
      description: "Petit oiseau noir et blanc qui agite sans cesse sa queue en éventail.",
      funFact: "Il n’hésite pas à harceler des aigles bien plus grands que lui.",
      diet: "Insectes et invertébrés",
    },
    // #056 Alisterus scapularis
    56: {
      name: "Perruche royale",
      habitat: "Forêts humides et jardins",
      description: "Grand perroquet dont le mâle a la tête et le ventre rouge vif et le dos vert.",
      funFact: "Seul le mâle a la tête rouge : la femelle est verte.",
      diet: "Graines et fruits",
    },
    // #057 Platycercus elegans
    57: {
      name: "Rosella de Pennant",
      habitat: "Forêts de montagne et parcs",
      description: "Perruche rouge cramoisi aux joues et ailes bleues.",
      funFact: "Les jeunes sont presque entièrement verts.",
      diet: "Graines et fruits",
    },
    // #058 Crocodylus porosus
    58: {
      name: "Crocodile marin",
      habitat: "Estuaires, rivières et côtes tropicales",
      description: "Le plus grand reptile vivant : les mâles peuvent dépasser 6 m et 1 000 kg.",
      funFact: "Sa morsure est la plus puissante jamais mesurée chez un animal.",
      diet: "Poissons, oiseaux, mammifères",
    },
    // #059 Crocodylus johnstoni
    59: {
      name: "Crocodile de Johnston",
      habitat: "Rivières et gorges d’eau douce",
      description: "Crocodile au museau fin, plus petit et plus timide que son cousin marin.",
      funFact: "Il peut « galoper » sur terre pour fuir le danger.",
      diet: "Poissons, insectes, grenouilles",
    },
    // #060 Chlamydosaurus kingii
    60: {
      name: "Lézard à collerette",
      habitat: "Savanes et forêts tropicales sèches",
      description: "Lézard qui déploie une énorme collerette autour de son cou pour intimider ses ennemis.",
      funFact: "Quand il fuit, il court debout sur ses pattes arrière.",
      diet: "Insectes et invertébrés",
    },
    // #061 Moloch horridus
    61: {
      name: "Diable cornu",
      habitat: "Déserts de sable",
      description: "Petit lézard couvert d’épines qui se nourrit uniquement de fourmis.",
      funFact: "Il boit par la peau : l’eau remonte jusqu’à sa bouche par de minuscules canaux.",
      diet: "Fourmis",
    },
    // #062 Tiliqua scincoides
    62: {
      name: "Scinque à langue bleue",
      habitat: "Jardins, forêts claires, prairies",
      description: "Gros lézard placide qui tire une langue bleu cobalt pour effrayer les prédateurs.",
      funFact: "Les jardiniers l’adorent : il mange les escargots.",
      diet: "Escargots, insectes et fruits",
    },
    // #063 Tiliqua rugosa
    63: {
      name: "Scinque à queue courte",
      habitat: "Zones semi-arides et mallee",
      description: "Lézard trapu aux écailles en forme de pomme de pin et à la queue en forme de tête.",
      funFact: "Les couples restent fidèles pendant plus de 20 ans.",
      diet: "Plantes, fleurs, escargots",
    },
    // #064 Pogona vitticeps
    64: {
      name: "Dragon barbu",
      habitat: "Zones arides et bois secs",
      description: "Lézard à la « barbe » épineuse qu’il gonfle et noircit lorsqu’il est menacé.",
      funFact: "Il salue ses congénères en faisant des cercles avec sa patte avant.",
      diet: "Insectes et végétaux",
    },
    // #065 Intellagama lesueurii
    65: {
      name: "Dragon d’eau australien",
      habitat: "Berges des cours d’eau, parcs urbains",
      description: "Grand lézard semi-aquatique souvent vu en train de se dorer au soleil près de l’eau.",
      funFact: "Il peut rester sous l’eau jusqu’à 90 minutes.",
      diet: "Insectes, petits animaux, fruits",
    },
    // #066 Varanus varius
    66: {
      name: "Varan bigarré",
      habitat: "Forêts et aires de pique-nique",
      description: "Grand « goanna » noir et crème qui grimpe aux arbres pour piller les nids.",
      funFact: "Il peut mesurer plus de 2 m.",
      diet: "Œufs et charognes",
    },
    // #067 Varanus giganteus
    67: {
      name: "Perentie",
      habitat: "Déserts rocheux du centre",
      description: "Le plus grand lézard d’Australie et le quatrième plus grand au monde.",
      funFact: "Il peut atteindre 2,5 m et courir très vite sur ses pattes arrière.",
      diet: "Lézards, mammifères, oiseaux",
    },
    // #068 Saltuarius cornutus
    68: {
      name: "Gecko à queue de feuille",
      habitat: "Forêts tropicales du nord-est",
      description: "Gecko au camouflage incroyable qui se confond avec l’écorce des arbres.",
      funFact: "Sa queue plate ressemble à une feuille morte.",
      diet: "Insectes",
    },
    // #069 Oxyuranus microlepidotus
    69: {
      name: "Taïpan du désert",
      habitat: "Plaines inondables arides du centre-est",
      description: "Serpent au venin le plus puissant du monde, mais très timide et rarement vu.",
      funFact: "Sa peau change de couleur selon les saisons : plus sombre en hiver.",
      diet: "Rongeurs",
    },
    // #070 Pseudonaja textilis
    70: {
      name: "Serpent brun de l’Est",
      habitat: "Champs, prairies et banlieues",
      description: "Serpent très venimeux et rapide, responsable de la plupart des morsures graves en Australie.",
      funFact: "Il chasse les souris, ce qui l’attire près des fermes.",
      diet: "Rongeurs, lézards, oiseaux",
    },
    // #071 Pseudechis porphyriacus
    71: {
      name: "Serpent noir à ventre rouge",
      habitat: "Zones humides et bords de rivière",
      description: "Serpent noir brillant aux flancs rouges, venimeux mais peu agressif.",
      funFact: "Il chasse les grenouilles et peut rester 20 minutes sous l’eau.",
      diet: "Grenouilles et petits animaux",
    },
    // #072 Morelia spilota
    72: {
      name: "Python tapis",
      habitat: "Forêts, zones rocheuses et greniers",
      description: "Grand python non venimeux aux motifs de tapis, souvent trouvé dans les toits.",
      funFact: "Il détecte la chaleur de ses proies grâce à des fossettes sur ses lèvres.",
      diet: "Rongeurs et oiseaux",
    },
    // #073 Chelodina longicollis
    73: {
      name: "Chélodine à long cou",
      habitat: "Marais, étangs et barrages",
      description: "Tortue d’eau douce dont le cou est presque aussi long que sa carapace.",
      funFact: "Elle replie son cou sur le côté plutôt que de le rentrer.",
      diet: "Insectes, crustacés, têtards",
    },
    // #074 Ranoides caerulea
    74: {
      name: "Rainette de White",
      habitat: "Forêts, jardins et… toilettes !",
      description: "Grosse grenouille verte et dodue, au sourire permanent, qui adore les maisons.",
      funFact: "Sa peau sécrète des substances étudiées pour lutter contre les bactéries.",
      diet: "Insectes",
    },
    // #075 Litoria chloris
    75: {
      name: "Rainette aux yeux rouges",
      habitat: "Forêts humides de la côte est",
      description: "Rainette vert vif aux yeux orangés et aux cuisses bleutées.",
      funFact: "Elle n’apparaît en nombre qu’après les gros orages d’été.",
    },
    // #076 Limnodynastes peronii
    76: {
      name: "Grenouille rayée des marais",
      habitat: "Étangs, fossés et mares de jardin",
      description: "Grenouille brune rayée dont le cri ressemble à un « tok » de balle de ping-pong.",
      funFact: "Elle pond ses œufs dans un nid de mousse flottante.",
    },
    // #077 Pseudophryne corroboree
    77: {
      name: "Grenouille corroboree",
      habitat: "Tourbières alpines du Kosciuszko",
      description: "Minuscule grenouille aux rayures jaune vif et noir, l’une des plus menacées au monde.",
      funFact: "Elle fabrique elle-même son poison, contrairement à la plupart des grenouilles toxiques.",
      diet: "Fourmis et petits insectes",
    },
    // #078 Rhinella marina
    78: {
      name: "Crapaud buffle",
      habitat: "Presque tous les milieux tropicaux",
      description: "Introduit en 1935 pour lutter contre un coléoptère, il est devenu un fléau toxique.",
      funFact: "Ses glandes à venin peuvent tuer un crocodile ou un quoll qui le mange.",
      diet: "Insectes, petits animaux, croquettes",
    },
    // #079 Carcharodon carcharias
    79: {
      name: "Requin blanc",
      habitat: "Eaux tempérées côtières",
      description: "Grand prédateur des océans, pouvant dépasser 6 m de long.",
      funFact: "Il peut détecter une goutte de sang dans 100 litres d’eau.",
      diet: "Phoques, poissons, raies",
    },
    // #080 Rhincodon typus
    80: {
      name: "Requin-baleine",
      habitat: "Récif de Ningaloo et eaux tropicales",
      description: "Le plus grand poisson du monde, un géant inoffensif qui filtre le plancton.",
      funFact: "Chaque requin-baleine a un motif de taches unique, comme une empreinte digitale.",
      diet: "Plancton et petits poissons",
    },
    // #081 Megaptera novaeangliae
    81: {
      name: "Baleine à bosse",
      habitat: "Côtes est et ouest lors des migrations",
      description: "Baleine acrobatique qui migre chaque hiver le long des côtes australiennes.",
      funFact: "Les mâles chantent des mélodies complexes qui changent chaque année.",
      diet: "Krill et petits poissons",
    },
    // #082 Tursiops aduncus
    82: {
      name: "Grand dauphin de l’Indo-Pacifique",
      habitat: "Baies et eaux côtières",
      description: "Dauphin côtier très sociable, souvent observé depuis les plages et les ports.",
      funFact: "À Shark Bay, certains utilisent des éponges pour protéger leur rostre en chassant.",
      diet: "Poissons et calmars",
    },
    // #083 Dugong dugon
    83: {
      name: "Dugong",
      habitat: "Herbiers marins tropicaux",
      description: "Mammifère marin herbivore, cousin du lamantin, qui broute les herbiers.",
      funFact: "Les marins d’autrefois l’auraient pris pour une sirène.",
      diet: "Herbiers marins",
    },
    // #084 Chelonia mydas
    84: {
      name: "Tortue verte",
      habitat: "Récifs coralliens et herbiers",
      description: "Grande tortue marine qui pond sur les plages du Queensland, comme à Raine Island.",
      funFact: "Sa carapace n’est pas verte : c’est sa graisse qui lui donne son nom.",
      diet: "Herbiers marins et algues",
    },
    // #085 Arctocephalus pusillus doriferus
    85: {
      name: "Otarie à fourrure d’Australie",
      habitat: "Îles rocheuses du détroit de Bass",
      description: "Otarie robuste qui se repose en grandes colonies sur les rochers.",
      funFact: "Elle peut plonger à plus de 200 m pour chasser.",
      diet: "Poissons et calmars",
    },
    // #086 Neophoca cinerea
    86: {
      name: "Otarie cendrée",
      habitat: "Plages et îles du sud",
      description: "Lion de mer endémique, curieux et joueur avec les plongeurs.",
      funFact: "Son cycle de reproduction dure 18 mois, un cas unique chez les pinnipèdes.",
      diet: "Poissons, calmars, crustacés",
    },
    // #087 Phycodurus eques
    87: {
      name: "Dragon de mer feuillu",
      habitat: "Forêts de kelp du sud",
      description: "Cousin de l’hippocampe orné d’appendices en forme de feuilles d’algue.",
      funFact: "C’est le mâle qui porte les œufs sous sa queue.",
      diet: "Petits crustacés (mysidacés)",
    },
    // #088 Amphiprion percula
    88: {
      name: "Poisson-clown",
      habitat: "Anémones de la Grande Barrière de corail",
      description: "Petit poisson orange et blanc qui vit en symbiose avec les anémones de mer.",
      funFact: "Tous naissent mâles ; le plus grand du groupe devient femelle.",
      diet: "Algues et zooplancton",
    },
    // #089 Cheilinus undulatus
    89: {
      name: "Napoléon",
      habitat: "Récifs coralliens",
      description: "Énorme labre bleu-vert à la bosse frontale, pouvant dépasser 2 m.",
      funFact: "Il fait partie des rares prédateurs de l’étoile de mer couronne-d’épines.",
      diet: "Mollusques, crustacés, oursins",
    },
    // #090 Mobula alfredi
    90: {
      name: "Raie manta de récif",
      habitat: "Récifs et stations de nettoyage",
      description: "Raie géante et gracieuse au cerveau le plus gros de tous les poissons.",
      funFact: "Son envergure peut atteindre 5 m.",
      diet: "Plancton",
    },
    // #091 Sepia apama
    91: {
      name: "Seiche géante d’Australie",
      habitat: "Récifs rocheux du golfe de Spencer",
      description: "La plus grande seiche du monde, maîtresse du changement de couleur.",
      funFact: "À Whyalla, des milliers se rassemblent chaque hiver pour se reproduire.",
      diet: "Poissons et crustacés",
    },
    // #092 Hapalochlaena maculosa
    92: {
      name: "Pieuvre à anneaux bleus",
      habitat: "Flaques et rochers de bord de mer",
      description: "Petite pieuvre aux anneaux bleus fluorescents, au venin mortel.",
      funFact: "Elle tient dans une main… mais il ne faut surtout jamais la toucher.",
      diet: "Crabes et crevettes",
    },
    // #093 Chironex fleckeri
    93: {
      name: "Méduse-boîte",
      habitat: "Eaux côtières tropicales (oct. à mai)",
      description: "Méduse quasi transparente parmi les animaux les plus venimeux de la planète.",
      funFact: "Elle possède 24 yeux, dont certains forment de vraies images.",
      diet: "Crevettes et petits poissons",
    },
    // #094 Mictyris longicarpus
    94: {
      name: "Crabe soldat",
      habitat: "Vasières et plages abritées",
      description: "Petit crabe bleu qui se déplace en « armées » de milliers d’individus à marée basse.",
      funFact: "Contrairement aux autres crabes, il marche vers l’avant.",
      diet: "Débris organiques du sable",
    },
    // #095 Atrax robustus
    95: {
      name: "Atrax de Sydney",
      habitat: "Sols humides autour de Sydney",
      description: "Mygale noire brillante au venin extrêmement puissant pour l’homme.",
      funFact: "Depuis l’antivenin de 1981, aucun décès n’a été enregistré.",
      diet: "Insectes",
    },
    // #096 Latrodectus hasselti
    96: {
      name: "Veuve à dos rouge",
      habitat: "Abris de jardin, boîtes aux lettres, toilettes extérieures",
      description: "Petite araignée noire marquée d’une bande rouge sur le dos, cousine de la veuve noire.",
      funFact: "Le mâle se sacrifie parfois en se plaçant dans la bouche de la femelle.",
      diet: "Insectes",
    },
    // #097 Holconia immanis
    97: {
      name: "Araignée chasseresse",
      habitat: "Écorces d’arbres, murs et pare-soleil de voiture",
      description: "Grande araignée plate et rapide, impressionnante mais inoffensive.",
      funFact: "Elle peut dépasser 15 cm d’envergure, pattes comprises.",
    },
    // #098 Papilio ulysses
    98: {
      name: "Papillon Ulysse",
      habitat: "Forêts tropicales du nord du Queensland",
      description: "Grand papillon aux ailes bleu électrique, emblème du tourisme du Queensland.",
      funFact: "Il est attiré par tout ce qui est bleu vif, même un parapluie.",
      diet: "Chenille : feuilles",
    },
    // #099 Extatosoma tiaratum
    99: {
      name: "Phasme épineux géant",
      habitat: "Forêts humides",
      description: "Phasme imitant une feuille morte épineuse, qui se balance comme une feuille dans le vent.",
      funFact: "Ses œufs sont transportés par des fourmis qui les confondent avec des graines.",
      diet: "Feuilles d’eucalyptus et de ronces",
    },
    // #100 Dryococelus australis
    100: {
      name: "Phasme de Lord Howe",
      habitat: "Ball’s Pyramid et programmes d’élevage",
      description: "L’« insecte-homard », cru éteint pendant 80 ans avant d’être redécouvert en 2001.",
      funFact: "Toute l’espèce sauvage tenait sous un seul buisson sur un rocher en pleine mer.",
      diet: "Mélaleuca",
    },
    // #101 Myrmecia gulosa
    101: {
      name: "Fourmi bouledogue",
      habitat: "Forêts claires et sols sablonneux",
      description: "Grande fourmi aux mandibules impressionnantes et à la piqûre très douloureuse.",
      funFact: "Elle a une excellente vue et peut suivre vos mouvements.",
      diet: "Insectes",
    },
    // #102 Cyclochila australasiae
    102: {
      name: "Cigale verte",
      habitat: "Arbres des parcs et forêts",
      description: "Grande cigale verte dont le chant assourdissant est la bande-son de l’été australien.",
      funFact: "Son chant peut dépasser 120 décibels, autant qu’un concert de rock.",
      diet: "Sève des arbres",
    },
    // #103 Amegilla cingulata
    103: {
      name: "Abeille à bandes bleues",
      habitat: "Jardins et lisières fleuries",
      description: "Abeille solitaire au corps rayé de bleu métallique.",
      funFact: "Elle pollinise les tomates en faisant vibrer les fleurs (« buzz pollination »).",
      diet: "Nectar et pollen",
    },
    // #104 Arachnocampa richardsae
    104: {
      name: "Ver luisant",
      habitat: "Grottes et ravins humides",
      description: "Larve de moucheron qui brille dans l’obscurité pour attirer ses proies dans des fils collants.",
      funFact: "Les voûtes de certaines grottes ressemblent à un ciel étoilé.",
      diet: "Petits insectes",
    },
    // #105 Cherax destructor
    105: {
      name: "Yabby",
      habitat: "Barrages, rivières et marais",
      description: "Écrevisse d’eau douce très résistante, capable de survivre à la sécheresse dans son terrier.",
      funFact: "Les enfants australiens les pêchent avec un morceau de viande au bout d’une ficelle.",
    },
    // #106 Wallabia bicolor
    106: {
      name: "Wallaby des marais",
      habitat: "Forêts denses, sous-bois et landes",
      description: "Wallaby sombre et trapu qui se déplace tête basse dans les sous-bois. Très présent sur Phillip Island.",
      funFact: "La femelle peut redevenir gestante avant même la naissance de son petit : un cas unique chez les mammifères.",
      diet: "Fougères et arbustes",
    },
    // #107 Felis catus
    107: {
      name: "Chat haret",
      habitat: "Partout, du désert aux forêts et aux îles",
      description: "Chat domestique retourné à l’état sauvage, présent sur presque tout le territoire australien.",
      funFact: "Les chats harets tueraient plus d’un milliard d’animaux natifs chaque année en Australie.",
      diet: "Petits mammifères, oiseaux, reptiles",
    },
    // #108 Vespula germanica
    108: {
      name: "Guêpe germanique",
      habitat: "Jardins, parcs, aires de pique-nique",
      description: "Guêpe jaune et noire arrivée en Australie à la fin des années 1950, agressive près de son nid souterrain.",
      funFact: "Contrairement à l’abeille, elle peut piquer plusieurs fois.",
      diet: "Insectes",
    },
    // #109 Haematopus longirostris
    109: {
      name: "Huîtrier pie australien",
      habitat: "Plages de sable et estuaires",
      description: "Oiseau de rivage noir et blanc au long bec orange vif et aux pattes roses.",
      funFact: "Malgré son nom anglais (« attrapeur d’huîtres »), il mange surtout des coquillages comme les pipis.",
      diet: "Coquillages",
    },
    // #110 Ardenna tenuirostris
    110: {
      name: "Puffin à bec grêle",
      habitat: "Îles et côtes du sud ; haute mer le reste de l’année",
      description: "Oiseau marin surnommé « muttonbird » qui niche par centaines de milliers dans des terriers sur Phillip Island et les îles du détroit de Bass.",
      funFact: "Chaque année, il fait un aller-retour de plus de 30 000 km jusqu’au Pacifique Nord.",
    },
    // #111 Crinia signifera
    111: {
      name: "Grenouille criquet de l’Est",
      habitat: "Mares, fossés, jardins humides",
      description: "Minuscule grenouille brune, l’une des plus communes du sud-est, qu’on entend bien plus qu’on ne la voit.",
      funFact: "Son chant ressemble au « crick-crick-crick » d’un grillon.",
      diet: "Insectes",
    },
    // #112 Trichonephila edulis
    112: {
      name: "Néphile dorée",
      habitat: "Jardins, lisières et forêts claires",
      description: "Grande araignée dont la toile dorée et très solide peut dépasser un mètre de large.",
      funFact: "Le mâle est beaucoup plus petit que la femelle et vit souvent en bordure de sa toile.",
      diet: "Insectes",
    },
    // #113 Badumna insignis
    113: {
      name: "Araignée noire des maisons",
      habitat: "Coins de fenêtres, murs et écorces",
      description: "Araignée noire et trapue qui tisse des toiles en entonnoir désordonnées autour des fenêtres.",
      funFact: "Sa morsure est douloureuse mais rarement grave.",
      diet: "Insectes",
    },
    // #114 Anoplognathus
    114: {
      name: "Hanneton de Noël",
      habitat: "Eucalyptus des parcs et des forêts",
      description: "Gros scarabées aux reflets dorés, verts ou bruns qui apparaissent en nombre autour de Noël, en plein été austral. (Cette fiche regroupe tout le genre.)",
      funFact: "Il en existe environ 35 espèces, presque toutes en Australie.",
      diet: "Eucalyptus",
    },
    // #115 Heterodontus portusjacksoni
    115: {
      name: "Requin de Port Jackson",
      habitat: "Fonds rocheux et sableux peu profonds",
      description: "Petit requin inoffensif au front proéminent et aux motifs en harnais, qui broie oursins et coquillages.",
      funFact: "La femelle coince ses œufs en forme de tire-bouchon entre les rochers.",
      diet: "Oursins et mollusques",
    },
    // #116 Asterias amurensis
    116: {
      name: "Étoile de mer du Pacifique Nord",
      habitat: "Baie de Port Phillip et estuaires de Tasmanie",
      description: "Étoile de mer arrivée d’Asie du Nord dans les eaux de ballast des navires, devenue une espèce envahissante majeure.",
      funFact: "Une seule femelle peut pondre jusqu’à 20 millions d’œufs par an.",
      diet: "Coquillages",
    },
    // #117 Cereopsis novaehollandiae
    117: {
      name: "Céréopse de Nouvelle-Hollande (oie de Cape Barren)",
      habitat: "Îles côtières, prairies et pâturages",
      description: "Oie grise au bec presque entièrement couvert d’une cire vert citron, souvent vue en groupes sur Phillip Island.",
      funFact: "Elle peut boire de l’eau saumâtre, ce qui lui permet de vivre sur des îles sans eau douce.",
      diet: "Herbes et plantes succulentes",
    },
    // #118 Morus serrator
    118: {
      name: "Fou austral",
      habitat: "Mers côtières ; colonies sur des îles et des caps",
      description: "Grand oiseau marin blanc à la tête jaune pâle qui plonge en piqué pour pêcher.",
      funFact: "Il plonge depuis plusieurs dizaines de mètres et entre dans l’eau à près de 100 km/h.",
      diet: "Poissons",
    },
    // #119 Zanda funerea
    119: {
      name: "Cacatoès funèbre",
      habitat: "Forêts, plantations de pins et parcs",
      description: "Grand cacatoès noir aux taches jaunes sur les joues et la queue, au cri plaintif.",
      funFact: "Il déchiquette pommes de pin et écorces pour trouver graines et larves.",
      diet: "Graines et larves",
    },
    // #120 Hydromys chrysogaster
    120: {
      name: "Rakali (rat d’eau)",
      habitat: "Rivières, lacs, estuaires et ports",
      description: "Rongeur aquatique natif aux pattes palmées et à la queue au bout blanc, surnommé la « loutre australienne ».",
      funFact: "Il sait retourner les crapauds buffles pour n’en manger que les parties non toxiques.",
      diet: "Poissons, crustacés, grenouilles",
    },
    // #121 Rusa unicolor
    121: {
      name: "Sambar",
      habitat: "Forêts de montagne de Victoria et de NSW",
      description: "Grand cerf d’Asie introduit au XIXᵉ siècle, aujourd’hui très répandu dans les Alpes victoriennes.",
      funFact: "Il abîme les zones humides alpines en les piétinant et en se vautrant dans la boue.",
      diet: "Herbes et feuilles",
    },
    // #122 Tiliqua nigrolutea
    122: {
      name: "Scinque à langue bleue tacheté",
      habitat: "Forêts, landes et prairies fraîches du sud-est",
      description: "Scinque à langue bleue sombre, tacheté de rose, de crème ou d’orange, adapté aux régions fraîches.",
      funFact: "Comme les autres langues bleues, la femelle donne naissance à des petits déjà formés.",
      diet: "Escargots, insectes, fruits",
    },
    // #123 Notechis scutatus
    123: {
      name: "Serpent-tigre",
      habitat: "Zones humides, bords de lacs et îles côtières",
      description: "Serpent très venimeux, souvent rayé de bandes claires et sombres, fréquent autour des marais de Melbourne.",
      funFact: "Sur certaines îles, les serpents-tigres sont devenus très grands en se nourrissant de poussins d’oiseaux marins.",
    },
    // #124 Austrelaps superbus
    124: {
      name: "Serpent à tête cuivrée des plaines",
      habitat: "Marais et prairies humides du sud-est",
      description: "Serpent venimeux brun-cuivré, actif même par temps frais.",
      funFact: "Il supporte mieux le froid que la plupart des serpents australiens.",
      diet: "Grenouilles et lézards",
    },
    // #125 Phyllopteryx taeniolatus
    125: {
      name: "Dragon de mer commun",
      habitat: "Herbiers et récifs rocheux du sud",
      description: "Emblème marin de Victoria, ce cousin rouge et jaune de l’hippocampe est orné de petites expansions en forme d’algues.",
      funFact: "Comme chez le dragon de mer feuillu, c’est le mâle qui porte les œufs.",
      diet: "Petits crustacés",
    },
    // #126 Maratus volans
    126: {
      name: "Araignée paon",
      habitat: "Landes et broussailles côtières",
      description: "Araignée sauteuse d’environ 5 mm dont le mâle déploie un abdomen coloré lors d’une danse de séduction.",
      funFact: "Si la danse ne lui plaît pas, la femelle peut dévorer le mâle.",
      diet: "Insectes",
    },
    // #127 Agrotis infusa
    127: {
      name: "Papillon de nuit Bogong",
      habitat: "Plaines du sud-est l’hiver, grottes des Alpes l’été",
      description: "Papillon de nuit brun qui migre chaque printemps vers les grottes des Alpes australiennes pour y passer l’été.",
      funFact: "Il se repère la nuit grâce aux étoiles et au champ magnétique terrestre.",
      diet: "Nectar (chenille : plantes)",
    },
    // #128 Maccullochella peelii
    128: {
      name: "Morue de Murray",
      habitat: "Rivières du bassin Murray-Darling",
      description: "Le plus grand poisson d’eau douce d’Australie, figure importante des récits aborigènes.",
      funFact: "Il peut vivre plus de 50 ans et dépasser un mètre de long.",
      diet: "Poissons, écrevisses, grenouilles",
    },
    // #129 Callocephalon fimbriatum
    129: {
      name: "Cacatoès à tête rouge",
      habitat: "Forêts de montagne ; parcs de Canberra l’hiver",
      description: "Petit cacatoès gris dont le mâle a la tête rouge vif ; emblème du Territoire de la capitale australienne.",
      funFact: "Son cri ressemble au grincement d’une porte qui s’ouvre.",
    },
    // #130 Thinornis cucullatus
    130: {
      name: "Pluvier à camail",
      habitat: "Plages océaniques exposées",
      description: "Petit oiseau de plage qui pond directement dans le sable, en plein été, là où passent baigneurs et chiens.",
      funFact: "Ses œufs ressemblent tant au sable qu’on peut marcher dessus sans les voir.",
      diet: "Petits invertébrés des plages",
    },
    // #131 Leipoa ocellata
    131: {
      name: "Leipoa ocellé",
      habitat: "Mallee et bois secs du sud",
      description: "Oiseau terrestre qui construit un énorme tas de sable et de feuilles pour incuber ses œufs.",
      funFact: "Le mâle passe la plus grande partie de l’année à régler la température du nid, autour de 33 °C.",
    },
    // #132 Petauroides volans
    132: {
      name: "Grand phalanger volant",
      habitat: "Vieilles forêts d’eucalyptus à grands arbres creux",
      description: "Le plus grand marsupial planeur, nocturne, aux grandes oreilles duveteuses, qui ne mange que des feuilles d’eucalyptus.",
      funFact: "Il peut planer sur une centaine de mètres en se dirigeant avec ses membres.",
    },
    // #133 Potorous tridactylus
    133: {
      name: "Potoroo à long nez",
      habitat: "Sous-bois denses et humides",
      description: "Petit marsupial sauteur au long museau qui déterre des champignons souterrains.",
      funFact: "En mangeant des truffes, il dissémine leurs spores, indispensables à la santé des forêts.",
      diet: "Champignons souterrains et insectes",
    },
    // #134 Perameles gunnii
    134: {
      name: "Bandicoot rayé de l’Est",
      habitat: "Prairies et bocages ; îles sans renards",
      description: "Petit bandicoot aux rayures pâles sur l’arrière-train, disparu à l’état sauvage sur le continent puis réintroduit sur des îles de Victoria comme Phillip Island.",
      funFact: "En 2021, il est devenu le premier mammifère australien dont le statut est passé de « éteint à l’état sauvage » à « en danger ».",
      diet: "Invertébrés",
    },
    // #135 Miniopterus orianae bassanii
    135: {
      name: "Minioptère du Sud",
      habitat: "Grottes et forêts du sud-ouest de Victoria et du sud-est de l’Australie-Méridionale",
      description: "Petite chauve-souris insectivore qui dépend de quelques grottes de maternité seulement.",
      funFact: "Les femelles se rassemblent pour mettre bas surtout dans deux grottes, à Naracoorte et près de Warrnambool.",
    },
    // #136 Litoria raniformis
    136: {
      name: "Rainette grognante",
      habitat: "Mares et zones humides herbeuses",
      description: "Grande grenouille verte et dorée au chant grave et grondant, autrefois commune autour de Melbourne.",
      funFact: "Elle mange aussi d’autres grenouilles, parfois de sa propre espèce.",
      diet: "Grenouilles",
    },
    // #137 Eubalaena australis
    137: {
      name: "Baleine franche australe",
      habitat: "Baies abritées de la côte sud (juin à octobre)",
      description: "Grande baleine noire sans nageoire dorsale, aux callosités blanches sur la tête, qui vient mettre bas près des côtes.",
      funFact: "On peut l’observer depuis la plage à Warrnambool (Logans Beach).",
      diet: "Krill",
    },
    // #138 Tursiops australis
    138: {
      name: "Dauphin de Burrunan",
      habitat: "Baie de Port Phillip et lacs du Gippsland",
      description: "Dauphin décrit en 2011 dont il ne resterait que quelques centaines d’individus. Sa reconnaissance comme espèce à part est encore discutée.",
      funFact: "Son nom vient d’un mot aborigène qui signifierait « grand poisson de mer de l’espèce des marsouins ».",
      diet: "Poissons",
    },
    // #139 Dermochelys coriacea
    139: {
      name: "Tortue luth",
      habitat: "Haute mer ; visiteuse des côtes australiennes",
      description: "La plus grande tortue du monde, à la carapace souple et sans écailles.",
      funFact: "Elle peut plonger à plus de 1 000 m pour chasser les méduses.",
      diet: "Méduses",
    },
    // #140 Synemon plana
    140: {
      name: "Papillon soleil doré",
      habitat: "Prairies naturelles de graminées",
      description: "Papillon de jour dont l’adulte n’a pas de bouche fonctionnelle : il ne vit que quelques jours, juste pour se reproduire.",
      funFact: "Les femelles volent à peine ; elles attirent les mâles en montrant leurs ailes postérieures dorées.",
      diet: "Aucun (adulte) ; chenille : racines de graminées",
    },
    // #141 Paralucia pyrodiscus lucida
    141: {
      name: "Cuivré d’Eltham",
      habitat: "Quelques bois secs de Victoria (Eltham, Castlemaine…)",
      description: "Petit papillon aux reflets cuivrés qui ne vit que dans quelques bois de Victoria.",
      funFact: "Ses chenilles sont gardées par des fourmis, qui les protègent en échange d’un liquide sucré.",
    },
    // #142 Burramys parvus
    142: {
      name: "Phalanger pygmée des montagnes",
      habitat: "Éboulis rocheux des Alpes australiennes",
      description: "Le seul marsupial australien qui vit uniquement en haute montagne, sous la neige l’hiver.",
      funFact: "Il hiberne jusqu’à 7 mois et dépend des papillons Bogong pour refaire ses réserves au printemps.",
      diet: "Papillons Bogong, graines et fruits",
    },
    // #143 Gymnobelideus leadbeateri
    143: {
      name: "Phalanger de Leadbeater",
      habitat: "Vieilles forêts de frênes des Central Highlands",
      description: "Emblème faunique de Victoria, ce petit possum était cru éteint jusqu’à sa redécouverte en 1961.",
      funFact: "Il vit en petites colonies dans les creux de très vieux arbres, souvent âgés de plus de 150 ans.",
      diet: "Sève, gomme et insectes",
    },
    // #144 Lichenostomus melanops cassidix
    144: {
      name: "Méliphage casqué",
      habitat: "Forêts marécageuses de Yellingbo",
      description: "Emblème aviaire de Victoria, au front orné d’une huppe dorée ; il ne reste qu’une seule population sauvage.",
      funFact: "La population sauvage dépend d’un programme d’élevage et de lâchers lancé à la fin des années 1980.",
      diet: "Insectes, sève et nectar",
    },
    // #145 Neophema chrysogaster
    145: {
      name: "Perruche à ventre orange",
      habitat: "Landes de Tasmanie (été), marais salés de la côte sud (hiver)",
      description: "Petite perruche verte au ventre orange qui migre chaque année à travers le détroit de Bass.",
      funFact: "En 2017, seuls 17 adultes sont revenus nicher à l’état sauvage.",
      diet: "Graines de plantes des marais salés",
    },
    // #146 Anthochaera phrygia
    146: {
      name: "Méliphage régent",
      habitat: "Forêts claires de « box » et d’« ironbark » du sud-est",
      description: "Méliphage noir et jaune vif, autrefois commun, aujourd’hui l’un des oiseaux les plus menacés d’Australie.",
      funFact: "Devenus si rares, certains mâles chantent « faux » : ils n’ont plus d’adultes de leur espèce pour apprendre leur chant.",
      diet: "Nectar et insectes",
    },
    // #147 Philoria frosti
    147: {
      name: "Grenouille de Baw Baw",
      habitat: "Tourbières du plateau de Baw Baw",
      description: "Grenouille brune qui ne vit que sur un seul plateau des Alpes victoriennes.",
      funFact: "Ses têtards se développent sans se nourrir, grâce aux réserves de l’œuf.",
    },
    // #148 Tympanocryptis pinguicolla
    148: {
      name: "Dragon sans oreilles des prairies victoriennes",
      habitat: "Prairies indigènes de basalte à l’ouest de Melbourne",
      description: "Petit dragon d’environ 15 cm, cru disparu pendant plus de 50 ans et redécouvert en 2023.",
      funFact: "Il se cache dans les terriers d’araignées et les fissures du sol.",
    },
    // #149 Pedionomus torquatus
    149: {
      name: "Pédionome errant",
      habitat: "Prairies plates et clairsemées de l’intérieur",
      description: "Oiseau unique au monde, seul représentant de sa famille, qui court plutôt que de voler.",
      funFact: "Chez lui, c’est la femelle qui est la plus colorée et le mâle qui couve.",
      diet: "Graines",
    },
    // #150 Megascolides australis
    150: {
      name: "Ver de terre géant du Gippsland",
      habitat: "Sols argileux humides du sud du Gippsland",
      description: "Ver de terre géant qui mesure souvent un mètre, et ne vit que dans une petite région de Victoria.",
      funFact: "On l’entend parfois glouglouter sous terre quand il se déplace dans ses galeries.",
      diet: "Matière organique du sol",
    },
    // #151 Pezoporus occidentalis
    151: {
      name: "Perruche nocturne",
      habitat: "Touffes de spinifex des déserts",
      description: "Perruche nocturne si discrète qu’aucune photo d’un oiseau vivant n’existait avant 2013.",
      funFact: "Elle passe la journée cachée à l’intérieur des touffes de spinifex.",
      diet: "Graines de spinifex",
    },
  },

  conservation: {
    4: {
      epbcScope: "Sous-espèce de l’île Barrow (Australie-Occidentale) uniquement",
      vicScope: "Sous-espèce de l’Est, celle qui vit en Victoria",
    },
    6: {
      epbcScope: "Populations du Queensland, de NSW et de l’ACT ; non inscrit en Victoria ni en Australie-Méridionale",
      programs: "Stratégie et plan national de rétablissement du koala (gouvernement australien)",
    },
    9: {
      epbcScope: "Sous-espèce de Kangaroo Island uniquement",
    },
    10: {
      programs: "Save the Tasmanian Devil Program (gouvernement de Tasmanie)",
    },
    11: {
      iucnNote: "L’UICN n’évalue pas le dingo séparément du chien domestique.",
    },
    12: {
      epbcScope: "Sous-espèce du nord (Territoire du Nord) uniquement",
    },
    15: {
      iucnNote: "Déclassé de « En danger » à « Quasi menacé » en juillet 2026 grâce aux réintroductions.",
      programs: "Plan national de rétablissement du numbat ; populations réintroduites dans des enclos sans prédateurs",
    },
    16: {
      programs: "Plan national de rétablissement du grand bilby ; enclos sans prédateurs",
    },
    17: {
      epbcScope: "Sud-est continental et nord du Queensland : en danger ; Tasmanie : vulnérable",
      programs: "Plan national de rétablissement du quoll tacheté",
    },
    20: {
      epbcScope: "Les deux sous-espèces",
    },
    21: {
      vicScope: "Inscrit sur la liste de Victoria, où l’espèce ne vit plus",
    },
    23: {
      iucnNote: "Statut mondial lié au déclin dans son aire d’origine (péninsule Ibérique). En Australie, c’est une espèce envahissante.",
      impact: "Les lapins broutent la végétation native, empêchent les arbres de repousser, aggravent l’érosion et entretiennent des populations de renards et de chats.",
    },
    24: {
      impact: "Le renard a contribué à l’extinction de plusieurs petits mammifères et menace oiseaux nichant au sol, tortues et manchots.",
    },
    25: {
      iucnNote: "Espèce domestique : l’UICN n’évalue pas le dromadaire.",
      impact: "Les dromadaires piétinent les points d’eau du désert, détruisent la végétation et abîment des sites culturels aborigènes.",
    },
    26: {
      epbcScope: "Seule la sous-espèce de Tasmanie est inscrite, comme éteinte",
    },
    27: {
      epbcScope: "Population australienne",
      programs: "Plan national de rétablissement du casoar austral",
    },
    34: {
      epbcScope: "Sous-espèces du sud-est (en danger) et des forêts du sud-ouest (vulnérable) uniquement",
      vicScope: "Sous-espèce du sud-est, celle qui vit en Victoria",
    },
    35: {
      iucnNote: "Classement incertain : selon la taxonomie retenue, l’UICN la classe « Préoccupation mineure » ou ne l’évalue pas séparément.",
      epbcScope: "Sous-espèce de l’Est uniquement",
    },
    41: {
      programs: "Phillip Island Nature Parks : suivi de la colonie, passages protégés et éradication du renard sur l’île",
    },
    43: {
      epbcScope: "Sous-espèce de Tasmanie uniquement",
    },
    49: {
      iucnNote: "Incertain : BirdLife (qui évalue les oiseaux pour l’UICN) indique « Quasi menacée », GBIF indique « Préoccupation mineure ».",
    },
    53: {
      iucnNote: "« Préoccupation mineure » au niveau mondial depuis 2022, mais « En danger » selon la loi australienne.",
      programs: "Plan national de rétablissement du diamant de Gould",
    },
    57: {
      epbcScope: "Sous-espèce de Kangaroo Island uniquement",
    },
    62: {
      epbcScope: "Sous-espèce du nord uniquement",
    },
    69: {
      vicScope: "Disparu de Victoria",
    },
    72: {
      vicScope: "Carpet python : en danger ; diamond python (est du Gippsland) : en danger critique",
    },
    77: {
      programs: "Élevage en captivité et réintroductions (Taronga Zoo, Zoos Victoria, parcs nationaux de NSW)",
    },
    78: {
      impact: "Toxique de l’œuf à l’adulte, il empoisonne quolls, varans, serpents et crocodiles d’eau douce qui le mangent, et a fait chuter leurs populations dans le nord.",
    },
    79: {
      programs: "Plan national de rétablissement du requin blanc",
    },
    84: {
      iucnNote: "Statut mondial amélioré en 2025 ; certaines sous-populations restent menacées.",
      programs: "Raine Island Recovery Project (Grande Barrière de corail)",
    },
    85: {
      iucnNote: "Évaluée au niveau de l’espèce (Arctocephalus pusillus).",
    },
    86: {
      vicScope: "Visiteuse occasionnelle des côtes de Victoria",
      programs: "Plan national de rétablissement de l’otarie cendrée",
    },
    100: {
      programs: "Élevage au zoo de Melbourne depuis 2003 ; éradication des rats sur l’île Lord Howe (2019)",
    },
    105: {
      iucnNote: "Statut indiqué par la Liste rouge (via GBIF). L’espèce reste pourtant commune dans une grande partie de son aire : ce statut mérite d’être vérifié.",
    },
    107: {
      iucnNote: "Espèce domestique : l’UICN n’évalue pas le chat.",
      impact: "Les chats harets tuent chaque année plus d’un milliard d’animaux natifs et ont contribué à l’extinction de plusieurs mammifères. Ils sont considérés comme la plus grande menace pour les petits mammifères australiens.",
    },
    108: {
      impact: "Elle chasse les insectes natifs, concurrence les abeilles et perturbe les pique-niques et les vergers.",
    },
    114: {
      iucnNote: "Fiche de genre (plusieurs espèces) : pas de statut UICN unique.",
    },
    116: {
      impact: "Elle dévore coquillages et autres invertébrés des fonds marins, menace l’élevage de coquillages et des espèces natives comme le poisson à mains tacheté de Tasmanie.",
    },
    117: {
      epbcScope: "Sous-espèce de l’archipel de la Recherche (Australie-Occidentale) uniquement",
    },
    121: {
      iucnNote: "Menacé dans son aire d’origine en Asie ; envahissant en Australie.",
      impact: "Le sambar piétine et broute les zones humides alpines et les forêts humides, abîme les berges et cause des collisions sur les routes.",
    },
    123: {
      epbcScope: "Population isolée des Flinders Ranges (Australie-Méridionale) uniquement",
    },
    125: {
      iucnNote: "Évaluation de 2025 dont les données sont contestées par certains chercheurs.",
    },
    128: {
      programs: "Plan national de rétablissement de la morue de Murray ; repeuplement en alevins",
    },
    130: {
      epbcScope: "Sous-espèce de l’Est, celle qui vit en Victoria",
      programs: "Programme « Beach-nesting Birds » de BirdLife Australia",
    },
    131: {
      programs: "Équipe nationale de rétablissement du leipoa (National Malleefowl Recovery Team)",
    },
    133: {
      epbcScope: "Sous-espèces du nord et du sud continental",
      vicScope: "Sous-espèce du sud continental",
    },
    134: {
      epbcScope: "Population continentale : en danger ; Tasmanie : vulnérable",
      programs: "Réintroductions sur Phillip Island, French Island et Churchill Island (Zoos Victoria, Phillip Island Nature Parks et partenaires)",
    },
    135: {
      iucnNote: "Sous-espèce non évaluée séparément par l’UICN.",
      programs: "Plan national de rétablissement ; protection des grottes de maternité",
    },
    138: {
      iucnNote: "Non évalué par l’UICN ; son statut d’espèce distincte est encore débattu.",
    },
    141: {
      iucnNote: "Sous-espèce non évaluée séparément par l’UICN.",
    },
    142: {
      programs: "Programmes de rétablissement en Victoria et en NSW (dont Zoos Victoria) ; corridors rocheux sous les pistes de ski",
    },
    143: {
      programs: "Programme de rétablissement du gouvernement de Victoria et de Zoos Victoria ; nichoirs artificiels",
    },
    144: {
      iucnNote: "L’UICN évalue l’espèce entière (méliphage à touffes jaunes, « Préoccupation mineure ») ; la sous-espèce casquée n’est pas évaluée séparément.",
      programs: "Élevage et lâchers à Healesville Sanctuary (Zoos Victoria) ; restauration de la réserve de Yellingbo",
    },
    145: {
      programs: "Équipe nationale de rétablissement ; élevage en captivité (Zoos Victoria, Moonlit Sanctuary, Tasmanie) et lâchers",
    },
    146: {
      programs: "Élevage au Taronga Zoo et lâchers ; plan national de rétablissement",
    },
    147: {
      programs: "Programme d’élevage de Zoos Victoria",
    },
    148: {
      programs: "Programme d’élevage de Zoos Victoria lancé après la redécouverte",
    },
    149: {
      programs: "Élevage en captivité (Zoos Victoria, Taronga Western Plains) ; plan national de rétablissement",
    },
    150: {
      programs: "Plan national de rétablissement du ver de terre géant du Gippsland",
    },
    151: {
      programs: "Réserve de Pullen Pullen (Bush Heritage Australia) ; équipe nationale de rétablissement",
    },
  },

  rescue: {
    "wildlife-victoria": "Service d’urgence 24 h/24, 7 j/7, pour toute la Victoria.",
    "deeca": "Gouvernement de Victoria : animaux blessés lors d’incendies, d’inondations ou de canicules.",
    "wires": "Ligne de secours 24 h/24, 365 jours par an.",
    "rspca-qld-1300-animal": "Animaux sauvages blessés ou orphelins (sauf crocodiles, casoars et animaux marins).",
    "queensland-wildlife-hotline": "Tortues, dauphins, dugongs et baleines échoués (option 1), crocodiles et casoars.",
    "wildcare-helpline": "Met en contact avec le soigneur agréé le plus proche, partout en Australie-Occidentale.",
    "fauna-rescue-of-south-australia": "Ligne d’urgence 24 h/24 pour tous les animaux sauvages.",
    "bonorong-wildlife-rescue": "Service de secours 24 h/24 pour toute la Tasmanie.",
    "nre-tas-wildlife-services": "Service du gouvernement de Tasmanie (heures de bureau).",
    "wildcare-nt": "Bénévoles de la région de Darwin ; ils peuvent ne pas répondre immédiatement.",
    "act-wildlife": "Ligne 24 h/24 pour les animaux natifs blessés, malades ou orphelins.",
    "access-canberra": "Kangourous blessés, accidents avec des kangourous, et urgences en dehors des heures.",
    "emergency-animal-disease-hotline": "Oiseaux ou animaux trouvés malades ou morts (suspicion de grippe aviaire H5).",
  },
};
