import type { Animal, Lang } from './types';

type Raw = Omit<Animal, 'id'>;

const ALL: Animal['states'] = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT'];

// Catalogue bilingue. Chaque texte existe en français (fr) et en anglais (en) :
// TypeScript refuse la compilation s'il en manque un.
// Ajoute toujours les nouvelles espèces à la FIN (les numéros suivent l'ordre du tableau).
const RAW: Raw[] = [
  // ───────────── Mammifères ─────────────
  {
    name: { fr: "Kangourou roux", en: "Red Kangaroo" },
    scientific: "Osphranter rufus",
    category: 'mammifere', rarity: 'commun', emoji: "🦘", conservation: 'LC',
    states: ['NSW', 'QLD', 'SA', 'WA', 'NT'],
    habitat: {
      fr: "Plaines arides et semi-arides de l’intérieur",
      en: "Arid and semi-arid inland plains",
    },
    description: {
      fr: "Le plus grand marsupial vivant : un mâle peut dépasser 1,8 m debout. Il vit en groupes appelés « mobs ».",
      en: "The largest living marsupial: a male can stand over 1.8 m tall. It lives in groups called “mobs”.",
    },
    funFact: {
      fr: "Il peut faire des bonds de 8 m et atteindre 60 km/h.",
      en: "It can leap 8 m in a single bound and reach 60 km/h.",
    },
  },
  {
    name: { fr: "Kangourou gris de l’Est", en: "Eastern Grey Kangaroo" },
    scientific: "Macropus giganteus",
    category: 'mammifere', rarity: 'commun', emoji: "🦘", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
    habitat: {
      fr: "Forêts claires, prairies, terrains de golf",
      en: "Open forests, grasslands, golf courses",
    },
    description: {
      fr: "Kangourou très répandu dans l’est du pays, au pelage gris-brun et au museau velu.",
      en: "A very widespread kangaroo of eastern Australia, with grey-brown fur and a hairy muzzle.",
    },
    funFact: {
      fr: "On en croise souvent au crépuscule en train de brouter sur les pelouses.",
      en: "You often see them grazing on lawns at dusk.",
    },
  },
  {
    name: { fr: "Wallaby à cou rouge", en: "Red-necked Wallaby" },
    scientific: "Notamacropus rufogriseus",
    category: 'mammifere', rarity: 'commun', emoji: "🦘", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
    habitat: {
      fr: "Forêts d’eucalyptus et lisières",
      en: "Eucalypt forests and forest edges",
    },
    description: {
      fr: "Wallaby de taille moyenne reconnaissable à la teinte rousse de sa nuque et de ses épaules.",
      en: "A medium-sized wallaby recognisable by the reddish tint on its neck and shoulders.",
    },
    funFact: {
      fr: "En Tasmanie, on l’appelle « Bennett’s wallaby » et son pelage est plus épais.",
      en: "In Tasmania it is called “Bennett’s wallaby” and has a thicker coat.",
    },
  },
  {
    name: { fr: "Wallaroo commun", en: "Common Wallaroo" },
    scientific: "Osphranter robustus",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🦘", conservation: 'LC',
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
    habitat: {
      fr: "Zones rocheuses et escarpements",
      en: "Rocky areas and escarpments",
    },
    description: {
      fr: "Macropode trapu aux épaules puissantes, adapté aux terrains rocailleux.",
      en: "A stocky macropod with powerful shoulders, adapted to rocky terrain.",
    },
    funFact: {
      fr: "Il peut survivre plusieurs mois sans boire en s’abritant de la chaleur dans les grottes.",
      en: "It can go months without drinking by sheltering from the heat in caves.",
    },
  },
  {
    name: { fr: "Quokka", en: "Quokka" },
    scientific: "Setonix brachyurus",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🦘", conservation: 'VU',
    states: ['WA'],
    habitat: {
      fr: "Île de Rottnest et forêts du sud-ouest",
      en: "Rottnest Island and south-western forests",
    },
    description: {
      fr: "Petit macropode à l’air souriant, devenu la star des selfies sur l’île de Rottnest.",
      en: "A small macropod with a smiling face, famous for selfies on Rottnest Island.",
    },
    funFact: {
      fr: "Il est interdit de le toucher ou de le nourrir : amende salée à la clé !",
      en: "Touching or feeding it is forbidden — and the fines are steep!",
    },
  },
  {
    name: { fr: "Koala", en: "Koala" },
    scientific: "Phascolarctos cinereus",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🐨", conservation: 'VU',
    states: ['QLD', 'NSW', 'VIC', 'SA', 'ACT'],
    habitat: {
      fr: "Forêts d’eucalyptus",
      en: "Eucalypt forests",
    },
    description: {
      fr: "Marsupial arboricole qui se nourrit presque exclusivement de feuilles d’eucalyptus.",
      en: "A tree-dwelling marsupial that feeds almost exclusively on eucalyptus leaves.",
    },
    funFact: {
      fr: "Il dort jusqu’à 20 heures par jour pour économiser son énergie.",
      en: "It sleeps up to 20 hours a day to save energy.",
    },
  },
  {
    name: { fr: "Wombat commun", en: "Common Wombat" },
    scientific: "Vombatus ursinus",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🐻", conservation: 'LC',
    states: ['NSW', 'VIC', 'TAS', 'SA', 'ACT'],
    habitat: {
      fr: "Forêts, landes et prairies tempérées",
      en: "Temperate forests, heathland and grassland",
    },
    description: {
      fr: "Marsupial fouisseur massif qui creuse de longs terriers. Sa poche s’ouvre vers l’arrière.",
      en: "A hefty burrowing marsupial that digs long tunnels. Its pouch opens backwards.",
    },
    funFact: {
      fr: "Ses crottes sont cubiques, ce qui les empêche de rouler !",
      en: "Its droppings are cube-shaped, which stops them from rolling away!",
    },
  },
  {
    name: { fr: "Ornithorynque", en: "Platypus" },
    scientific: "Ornithorhynchus anatinus",
    category: 'mammifere', rarity: 'rare', emoji: "🦫", conservation: 'NT',
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
    habitat: {
      fr: "Rivières et ruisseaux d’eau douce",
      en: "Freshwater rivers and creeks",
    },
    description: {
      fr: "Mammifère qui pond des œufs, doté d’un bec de canard et d’une queue de castor.",
      en: "An egg-laying mammal with a duck’s bill and a beaver’s tail.",
    },
    funFact: {
      fr: "Le mâle possède un éperon venimeux sur les pattes arrière.",
      en: "Males have a venomous spur on their hind legs.",
    },
  },
  {
    name: { fr: "Échidné à nez court", en: "Short-beaked Echidna" },
    scientific: "Tachyglossus aculeatus",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🦔", conservation: 'LC',
    states: ALL,
    habitat: {
      fr: "Presque tous les milieux, du désert à la forêt",
      en: "Almost every habitat, from desert to forest",
    },
    description: {
      fr: "Mammifère ovipare couvert de piquants qui se nourrit de fourmis et de termites.",
      en: "An egg-laying mammal covered in spines that feeds on ants and termites.",
    },
    funFact: {
      fr: "Sa langue collante peut faire 18 cm de long.",
      en: "Its sticky tongue can be 18 cm long.",
    },
  },
  {
    name: { fr: "Diable de Tasmanie", en: "Tasmanian Devil" },
    scientific: "Sarcophilus harrisii",
    category: 'mammifere', rarity: 'rare', emoji: "😈", conservation: 'EN',
    states: ['TAS'],
    habitat: {
      fr: "Forêts et bocages de Tasmanie",
      en: "Tasmanian forests and farmland",
    },
    description: {
      fr: "Le plus grand marsupial carnivore actuel, connu pour ses cris terrifiants la nuit.",
      en: "The largest living carnivorous marsupial, known for its terrifying screeches at night.",
    },
    funFact: {
      fr: "Sa mâchoire est l’une des plus puissantes du règne animal par rapport à sa taille.",
      en: "Relative to its size, its jaw is one of the most powerful in the animal kingdom.",
    },
  },
  {
    name: { fr: "Dingo", en: "Dingo" },
    scientific: "Canis dingo",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🐕", conservation: 'LC',
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
    habitat: {
      fr: "Déserts, forêts, côtes",
      en: "Deserts, forests, coasts",
    },
    description: {
      fr: "Canidé sauvage arrivé en Australie il y a environ 4 000 ans, superprédateur du continent.",
      en: "A wild dog that arrived in Australia about 4,000 years ago; the continent’s top predator.",
    },
    funFact: {
      fr: "Le dingo n’aboie presque pas : il hurle.",
      en: "Dingoes hardly ever bark: they howl.",
    },
  },
  {
    name: { fr: "Phalanger renard", en: "Common Brushtail Possum" },
    scientific: "Trichosurus vulpecula",
    category: 'mammifere', rarity: 'commun', emoji: "🐿️", conservation: 'LC',
    states: ALL,
    habitat: {
      fr: "Forêts, parcs et… greniers urbains",
      en: "Forests, parks… and suburban roofs",
    },
    description: {
      fr: "Possum nocturne à la queue touffue, très bien adapté à la vie en ville.",
      en: "A nocturnal possum with a bushy tail, very well adapted to city life.",
    },
    funFact: {
      fr: "Il adore squatter les toits des maisons australiennes.",
      en: "It loves moving into the roofs of Australian houses.",
    },
  },
  {
    name: { fr: "Pseudocheire commun", en: "Common Ringtail Possum" },
    scientific: "Pseudocheirus peregrinus",
    category: 'mammifere', rarity: 'commun', emoji: "🐿️", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
    habitat: {
      fr: "Forêts, broussailles et jardins",
      en: "Forests, scrub and gardens",
    },
    description: {
      fr: "Petit possum à la queue préhensile au bout blanc, qui construit des nids appelés « dreys ».",
      en: "A small possum with a white-tipped prehensile tail that builds nests called “dreys”.",
    },
    funFact: {
      fr: "Il mange ses propres crottes molles pour mieux digérer les feuilles.",
      en: "It eats its own soft droppings to digest leaves better.",
    },
  },
  {
    name: { fr: "Phalanger volant", en: "Sugar Glider" },
    scientific: "Petaurus breviceps",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🐿️", conservation: 'LC',
    states: ALL,
    habitat: {
      fr: "Forêts d’eucalyptus",
      en: "Eucalypt forests",
    },
    description: {
      fr: "Petit marsupial planeur qui glisse d’arbre en arbre grâce à une membrane entre ses pattes.",
      en: "A small gliding marsupial that sails from tree to tree using a membrane between its legs.",
    },
    funFact: {
      fr: "Il peut planer sur plus de 50 mètres.",
      en: "It can glide more than 50 metres.",
    },
  },
  {
    name: { fr: "Numbat", en: "Numbat" },
    scientific: "Myrmecobius fasciatus",
    category: 'mammifere', rarity: 'legendaire', emoji: "🐾", conservation: 'EN',
    states: ['WA', 'SA'],
    habitat: {
      fr: "Forêts de wandoo du sud-ouest",
      en: "Wandoo woodlands of the south-west",
    },
    description: {
      fr: "Marsupial rayé et diurne qui mange jusqu’à 20 000 termites par jour. Emblème de l’Australie-Occidentale.",
      en: "A striped, day-active marsupial that eats up to 20,000 termites a day. Emblem of Western Australia.",
    },
    funFact: {
      fr: "Il reste moins de 1 000 numbats adultes à l’état sauvage.",
      en: "Fewer than 1,000 adult numbats remain in the wild.",
    },
  },
  {
    name: { fr: "Grand bilby", en: "Greater Bilby" },
    scientific: "Macrotis lagotis",
    category: 'mammifere', rarity: 'legendaire', emoji: "🐰", conservation: 'VU',
    states: ['WA', 'NT', 'QLD'],
    habitat: {
      fr: "Déserts et savanes arides",
      en: "Arid deserts and grasslands",
    },
    description: {
      fr: "Marsupial nocturne aux grandes oreilles de lapin, symbole de la lutte contre les espèces invasives.",
      en: "A nocturnal marsupial with rabbit-like ears, a symbol of the fight against invasive species.",
    },
    funFact: {
      fr: "En Australie, on offre des bilbies en chocolat à Pâques plutôt que des lapins.",
      en: "In Australia, people give chocolate bilbies at Easter instead of bunnies.",
    },
  },
  {
    name: { fr: "Quoll tacheté", en: "Spotted-tailed Quoll" },
    scientific: "Dasyurus maculatus",
    category: 'mammifere', rarity: 'rare', emoji: "🐆", conservation: 'NT',
    states: ['QLD', 'NSW', 'VIC', 'TAS'],
    habitat: {
      fr: "Forêts humides et sclérophylles",
      en: "Rainforests and wet sclerophyll forests",
    },
    description: {
      fr: "Marsupial carnivore au pelage brun moucheté de blanc, excellent grimpeur.",
      en: "A carnivorous marsupial with brown fur dotted with white spots, and an excellent climber.",
    },
    funFact: {
      fr: "C’est le deuxième plus grand marsupial carnivore après le diable de Tasmanie.",
      en: "It is the second-largest carnivorous marsupial after the Tasmanian devil.",
    },
  },
  {
    name: { fr: "Bandicoot à nez long", en: "Long-nosed Bandicoot" },
    scientific: "Perameles nasuta",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🐀", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC'],
    habitat: {
      fr: "Forêts, landes et jardins",
      en: "Forests, heathland and gardens",
    },
    description: {
      fr: "Petit marsupial au museau pointu qui creuse de petits trous coniques pour trouver des insectes.",
      en: "A small marsupial with a pointed snout that digs small cone-shaped holes to find insects.",
    },
    funFact: {
      fr: "Sa gestation dure à peine 12 jours, l’une des plus courtes chez les mammifères.",
      en: "Its pregnancy lasts just 12 days, one of the shortest of any mammal.",
    },
  },
  {
    name: { fr: "Renard volant à tête grise", en: "Grey-headed Flying-fox" },
    scientific: "Pteropus poliocephalus",
    category: 'mammifere', rarity: 'commun', emoji: "🦇", conservation: 'VU',
    states: ['QLD', 'NSW', 'VIC', 'SA', 'ACT'],
    habitat: {
      fr: "Forêts côtières, parcs urbains",
      en: "Coastal forests, city parks",
    },
    description: {
      fr: "Grande chauve-souris frugivore au col roux qui forme d’immenses colonies en ville.",
      en: "A large fruit bat with a russet collar that forms huge colonies in cities.",
    },
    funFact: {
      fr: "Elle pollinise les eucalyptus sur des dizaines de kilomètres chaque nuit.",
      en: "It pollinates eucalypts across dozens of kilometres every night.",
    },
  },
  {
    name: { fr: "Wallaby des rochers à pieds jaunes", en: "Yellow-footed Rock-wallaby" },
    scientific: "Petrogale xanthopus",
    category: 'mammifere', rarity: 'rare', emoji: "🦘", conservation: 'NT',
    states: ['SA', 'NSW', 'QLD'],
    habitat: {
      fr: "Gorges et falaises de l’intérieur",
      en: "Inland gorges and cliffs",
    },
    description: {
      fr: "L’un des plus beaux macropodes, au pelage rayé gris, blanc, jaune et orange.",
      en: "One of the most beautiful macropods, with fur striped in grey, white, yellow and orange.",
    },
    funFact: {
      fr: "Ses pattes rugueuses lui donnent une adhérence parfaite sur la roche.",
      en: "Its rough-soled feet give it perfect grip on rock.",
    },
  },
  {
    name: { fr: "Pademelon de Tasmanie", en: "Tasmanian Pademelon" },
    scientific: "Thylogale billardierii",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🦘", conservation: 'LC',
    states: ['TAS'],
    habitat: {
      fr: "Sous-bois humides de Tasmanie",
      en: "Damp Tasmanian undergrowth",
    },
    description: {
      fr: "Petit macropode trapu et discret, au pelage épais et à la queue courte.",
      en: "A small, stocky and shy macropod with thick fur and a short tail.",
    },
    funFact: {
      fr: "Il a disparu du continent et ne survit plus qu’en Tasmanie.",
      en: "It has vanished from the mainland and now survives only in Tasmania.",
    },
  },
  {
    name: { fr: "Kangourou arboricole de Lumholtz", en: "Lumholtz’s Tree-kangaroo" },
    scientific: "Dendrolagus lumholtzi",
    category: 'mammifere', rarity: 'legendaire', emoji: "🦘", conservation: 'NT',
    states: ['QLD'],
    habitat: {
      fr: "Forêts tropicales des Atherton Tablelands",
      en: "Rainforests of the Atherton Tablelands",
    },
    description: {
      fr: "Kangourou qui vit dans les arbres ! Il grimpe grâce à ses pattes avant musclées.",
      en: "A kangaroo that lives in trees! It climbs using its muscular forelimbs.",
    },
    funFact: {
      fr: "Il peut sauter d’une branche au sol depuis 15 m de haut sans se blesser.",
      en: "It can jump to the ground from 15 m up without getting hurt.",
    },
  },
  {
    name: { fr: "Lapin de garenne", en: "European Rabbit" },
    scientific: "Oryctolagus cuniculus",
    category: 'mammifere', rarity: 'commun', emoji: "🐇", conservation: 'LC',
    states: ALL,
    introduced: true,
    habitat: {
      fr: "Prairies, champs, zones dégradées",
      en: "Grasslands, fields, degraded land",
    },
    description: {
      fr: "Introduit en 1859, il est devenu l’une des pires espèces invasives du pays.",
      en: "Introduced in 1859, it became one of the country’s worst invasive species.",
    },
    funFact: {
      fr: "La plus longue clôture du monde (plus de 3 000 km) a été construite pour l’arrêter.",
      en: "The world’s longest fence (over 3,000 km) was built to stop it.",
    },
  },
  {
    name: { fr: "Renard roux", en: "Red Fox" },
    scientific: "Vulpes vulpes",
    category: 'mammifere', rarity: 'commun', emoji: "🦊", conservation: 'LC',
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
    introduced: true,
    habitat: {
      fr: "Presque partout sauf le grand nord tropical",
      en: "Almost everywhere except the tropical far north",
    },
    description: {
      fr: "Introduit au XIXᵉ siècle pour la chasse, il menace aujourd’hui de nombreux petits marsupiaux.",
      en: "Introduced in the 19th century for hunting, it now threatens many small marsupials.",
    },
    funFact: {
      fr: "On estime qu’il y a plus de 1,7 million de renards en Australie.",
      en: "There are estimated to be more than 1.7 million foxes in Australia.",
    },
  },
  {
    name: { fr: "Dromadaire sauvage", en: "Feral Camel" },
    scientific: "Camelus dromedarius",
    category: 'mammifere', rarity: 'rare', emoji: "🐫", conservation: 'LC',
    states: ['WA', 'SA', 'NT', 'QLD'],
    introduced: true,
    habitat: {
      fr: "Déserts du centre",
      en: "Central deserts",
    },
    description: {
      fr: "Importés au XIXᵉ siècle pour explorer l’Outback, leurs descendants vivent aujourd’hui à l’état sauvage.",
      en: "Imported in the 19th century to explore the Outback, their descendants now roam wild.",
    },
    funFact: {
      fr: "L’Australie abrite la plus grande population de dromadaires sauvages au monde.",
      en: "Australia has the largest population of wild dromedaries in the world.",
    },
  },
  // ───────────── Oiseaux ─────────────
  {
    name: { fr: "Émeu d’Australie", en: "Emu" },
    scientific: "Dromaius novaehollandiae",
    category: 'oiseau', rarity: 'commun', emoji: "🐦", conservation: 'LC',
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
    habitat: {
      fr: "Plaines, savanes et forêts claires",
      en: "Plains, savannas and open woodland",
    },
    description: {
      fr: "Deuxième plus grand oiseau du monde après l’autruche, incapable de voler.",
      en: "The second-largest bird in the world after the ostrich, and unable to fly.",
    },
    funFact: {
      fr: "C’est le mâle qui couve les œufs pendant 8 semaines sans manger.",
      en: "The male incubates the eggs for 8 weeks without eating.",
    },
  },
  {
    name: { fr: "Casoar à casque", en: "Southern Cassowary" },
    scientific: "Casuarius casuarius",
    category: 'oiseau', rarity: 'legendaire', emoji: "🦤", conservation: 'LC',
    states: ['QLD'],
    dangerous: true,
    habitat: {
      fr: "Forêts tropicales humides du nord du Queensland",
      en: "Tropical rainforests of northern Queensland",
    },
    description: {
      fr: "Oiseau géant au casque osseux et au cou bleu vif, jardinier essentiel de la forêt tropicale.",
      en: "A giant bird with a bony casque and a bright blue neck, an essential gardener of the rainforest.",
    },
    funFact: {
      fr: "Ses griffes de 12 cm en font l’un des oiseaux les plus dangereux du monde.",
      en: "Its 12 cm claws make it one of the most dangerous birds in the world.",
    },
  },
  {
    name: { fr: "Martin-chasseur géant", en: "Laughing Kookaburra" },
    scientific: "Dacelo novaeguineae",
    category: 'oiseau', rarity: 'commun', emoji: "🐦", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'SA', 'TAS', 'ACT', 'WA'],
    habitat: {
      fr: "Forêts claires, parcs et jardins",
      en: "Open woodland, parks and gardens",
    },
    description: {
      fr: "Le célèbre kookaburra, dont le chant ressemble à un éclat de rire.",
      en: "The famous kookaburra, whose call sounds like a burst of laughter.",
    },
    funFact: {
      fr: "Il chasse les serpents en les lâchant depuis une hauteur.",
      en: "It hunts snakes by dropping them from a height.",
    },
  },
  {
    name: { fr: "Cacatoès à huppe jaune", en: "Sulphur-crested Cockatoo" },
    scientific: "Cacatua galerita",
    category: 'oiseau', rarity: 'commun', emoji: "🦜", conservation: 'LC',
    states: ALL,
    habitat: {
      fr: "Forêts, parcs et villes",
      en: "Forests, parks and cities",
    },
    description: {
      fr: "Grand cacatoès blanc à la crête jaune, bruyant et très intelligent.",
      en: "A large white cockatoo with a yellow crest, noisy and very intelligent.",
    },
    funFact: {
      fr: "À Sydney, ils ont appris à ouvrir les poubelles… et se transmettent la technique !",
      en: "In Sydney they have learned to open wheelie bins… and teach the trick to each other!",
    },
  },
  {
    name: { fr: "Cacatoès rosalbin", en: "Galah" },
    scientific: "Eolophus roseicapilla",
    category: 'oiseau', rarity: 'commun', emoji: "🦜", conservation: 'LC',
    states: ALL,
    habitat: {
      fr: "Plaines, champs et villes",
      en: "Plains, farmland and towns",
    },
    description: {
      fr: "Cacatoès rose et gris très commun, souvent vu en grandes bandes au sol.",
      en: "A pink-and-grey cockatoo, very common and often seen in large flocks on the ground.",
    },
    funFact: {
      fr: "En argot australien, « galah » veut dire… « idiot » !",
      en: "In Australian slang, “galah” means… “fool”!",
    },
  },
  {
    name: { fr: "Loriquet arc-en-ciel", en: "Rainbow Lorikeet" },
    scientific: "Trichoglossus moluccanus",
    category: 'oiseau', rarity: 'commun', emoji: "🦜", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'SA', 'TAS', 'ACT'],
    habitat: {
      fr: "Forêts côtières, jardins fleuris",
      en: "Coastal forests, flowering gardens",
    },
    description: {
      fr: "Perroquet aux couleurs éclatantes qui se nourrit de nectar grâce à sa langue en brosse.",
      en: "A brilliantly coloured parrot that feeds on nectar with its brush-tipped tongue.",
    },
    funFact: {
      fr: "Ils forment des dortoirs de plusieurs milliers d’oiseaux en ville.",
      en: "They gather in roosts of several thousand birds in cities.",
    },
  },
  {
    name: { fr: "Perruche ondulée", en: "Budgerigar" },
    scientific: "Melopsittacus undulatus",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🦜", conservation: 'LC',
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
    habitat: {
      fr: "Savanes et prairies arides",
      en: "Arid savannas and grasslands",
    },
    description: {
      fr: "Petite perruche verte et jaune, nomade, qui suit la pluie dans l’intérieur des terres.",
      en: "A small green-and-yellow nomadic parrot that follows the rain across the inland.",
    },
    funFact: {
      fr: "À l’état sauvage, elles volent en nuées de dizaines de milliers d’individus.",
      en: "In the wild, they fly in flocks of tens of thousands.",
    },
  },
  {
    name: { fr: "Calopsitte élégante", en: "Cockatiel" },
    scientific: "Nymphicus hollandicus",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🦜", conservation: 'LC',
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
    habitat: {
      fr: "Zones arides proches de l’eau",
      en: "Arid areas close to water",
    },
    description: {
      fr: "Petit cacatoès gris à la crête jaune et aux joues orange.",
      en: "A small grey cockatoo with a yellow crest and orange cheeks.",
    },
    funFact: {
      fr: "C’est le plus petit membre de la famille des cacatoès.",
      en: "It is the smallest member of the cockatoo family.",
    },
  },
  {
    name: { fr: "Cacatoès banksien", en: "Red-tailed Black Cockatoo" },
    scientific: "Calyptorhynchus banksii",
    category: 'oiseau', rarity: 'rare', emoji: "🐦‍⬛", conservation: 'LC',
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
    habitat: {
      fr: "Forêts claires et savanes",
      en: "Open woodland and savanna",
    },
    description: {
      fr: "Grand cacatoès noir dont la queue révèle des bandes rouges vif en vol.",
      en: "A large black cockatoo whose tail flashes bright red bands in flight.",
    },
    funFact: {
      fr: "Il peut vivre plus de 50 ans.",
      en: "It can live for more than 50 years.",
    },
  },
  {
    name: { fr: "Cacatoès de Leadbeater", en: "Major Mitchell’s Cockatoo" },
    scientific: "Lophochroa leadbeateri",
    category: 'oiseau', rarity: 'rare', emoji: "🦜", conservation: 'LC',
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT'],
    habitat: {
      fr: "Bush aride et zones de mallee",
      en: "Arid bush and mallee",
    },
    description: {
      fr: "Cacatoès rose saumon à la crête rouge, jaune et blanche : l’un des plus beaux du monde.",
      en: "A salmon-pink cockatoo with a red, yellow and white crest: one of the most beautiful in the world.",
    },
    funFact: {
      fr: "Sa crête dépliée ressemble à un éventail de feu.",
      en: "When raised, its crest looks like a fan of fire.",
    },
  },
  {
    name: { fr: "Ménure superbe", en: "Superb Lyrebird" },
    scientific: "Menura novaehollandiae",
    category: 'oiseau', rarity: 'rare', emoji: "🐦", conservation: 'LC',
    states: ['VIC', 'NSW', 'QLD', 'ACT', 'TAS'],
    habitat: {
      fr: "Forêts humides de montagne",
      en: "Wet mountain forests",
    },
    description: {
      fr: "Oiseau-lyre à la queue spectaculaire, champion mondial de l’imitation.",
      en: "A lyrebird with a spectacular tail, the world champion of mimicry.",
    },
    funFact: {
      fr: "Il imite les autres oiseaux, mais aussi les appareils photo et les tronçonneuses !",
      en: "It imitates other birds, but also camera shutters and chainsaws!",
    },
  },
  {
    name: { fr: "Cassican flûteur", en: "Australian Magpie" },
    scientific: "Gymnorhina tibicen",
    category: 'oiseau', rarity: 'commun', emoji: "🐦‍⬛", conservation: 'LC',
    states: ALL,
    habitat: {
      fr: "Parcs, terrains de sport, campagnes",
      en: "Parks, sports fields, countryside",
    },
    description: {
      fr: "Oiseau noir et blanc au chant mélodieux, emblématique des matins australiens.",
      en: "A black-and-white bird with a melodious song, iconic of Australian mornings.",
    },
    funFact: {
      fr: "Au printemps, certains mâles attaquent les cyclistes qui s’approchent de leur nid.",
      en: "In spring, some males swoop on cyclists who come near their nest.",
    },
  },
  {
    name: { fr: "Ibis blanc d’Australie", en: "Australian White Ibis" },
    scientific: "Threskiornis molucca",
    category: 'oiseau', rarity: 'commun', emoji: "🦩", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'SA', 'NT', 'WA', 'ACT'],
    habitat: {
      fr: "Zones humides, parcs urbains",
      en: "Wetlands, city parks",
    },
    description: {
      fr: "Grand échassier blanc au bec courbé, devenu un habitué des poubelles urbaines.",
      en: "A large white wading bird with a curved bill that has become a regular at city bins.",
    },
    funFact: {
      fr: "Surnommé affectueusement « bin chicken » (le poulet des poubelles).",
      en: "Affectionately nicknamed the “bin chicken”.",
    },
  },
  {
    name: { fr: "Pélican à lunettes", en: "Australian Pelican" },
    scientific: "Pelecanus conspicillatus",
    category: 'oiseau', rarity: 'commun', emoji: "🐦", conservation: 'LC',
    states: ALL,
    habitat: {
      fr: "Lacs, estuaires et côtes",
      en: "Lakes, estuaries and coasts",
    },
    description: {
      fr: "Grand pélican blanc et noir, au bec le plus long de tous les oiseaux.",
      en: "A large black-and-white pelican with the longest bill of any bird.",
    },
    funFact: {
      fr: "Son bec peut mesurer jusqu’à 50 cm.",
      en: "Its bill can be up to 50 cm long.",
    },
  },
  {
    name: { fr: "Cygne noir", en: "Black Swan" },
    scientific: "Cygnus atratus",
    category: 'oiseau', rarity: 'commun', emoji: "🦢", conservation: 'LC',
    states: ALL,
    habitat: {
      fr: "Lacs, marais et estuaires",
      en: "Lakes, swamps and estuaries",
    },
    description: {
      fr: "Cygne entièrement noir au bec rouge vif, emblème de l’Australie-Occidentale.",
      en: "An all-black swan with a bright red bill, emblem of Western Australia.",
    },
    funFact: {
      fr: "Les Européens croyaient que les cygnes noirs n’existaient pas… jusqu’en 1697.",
      en: "Europeans believed black swans did not exist… until 1697.",
    },
  },
  {
    name: { fr: "Manchot pygmée", en: "Little Penguin" },
    scientific: "Eudyptula minor",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🐧", conservation: 'LC',
    states: ['NSW', 'VIC', 'TAS', 'SA', 'WA'],
    habitat: {
      fr: "Côtes et îles du sud",
      en: "Southern coasts and islands",
    },
    description: {
      fr: "Le plus petit manchot du monde, au plumage bleuté, qui rentre au nid à la tombée de la nuit.",
      en: "The world’s smallest penguin, with bluish plumage, that waddles home to its burrow at nightfall.",
    },
    funFact: {
      fr: "La « parade des manchots » de Phillip Island attire des milliers de visiteurs chaque soir.",
      en: "The Phillip Island “penguin parade” draws thousands of visitors every evening.",
    },
  },
  {
    name: { fr: "Mérion superbe", en: "Superb Fairywren" },
    scientific: "Malurus cyaneus",
    category: 'oiseau', rarity: 'commun', emoji: "🐦", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
    habitat: {
      fr: "Buissons, jardins et parcs",
      en: "Shrubs, gardens and parks",
    },
    description: {
      fr: "Minuscule passereau dont le mâle arbore un plumage bleu électrique en période nuptiale.",
      en: "A tiny songbird whose male wears electric-blue plumage in the breeding season.",
    },
    funFact: {
      fr: "Les femelles apprennent un « mot de passe » à leurs œufs avant l’éclosion.",
      en: "Females teach a “password” to their eggs before they hatch.",
    },
  },
  {
    name: { fr: "Aigle d’Australie", en: "Wedge-tailed Eagle" },
    scientific: "Aquila audax",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🦅", conservation: 'LC',
    states: ALL,
    habitat: {
      fr: "Presque tous les milieux ouverts",
      en: "Almost all open habitats",
    },
    description: {
      fr: "Le plus grand rapace d’Australie, à la queue en forme de losange.",
      en: "Australia’s largest bird of prey, with a diamond-shaped tail.",
    },
    funFact: {
      fr: "Son envergure peut atteindre 2,8 m.",
      en: "Its wingspan can reach 2.8 m.",
    },
  },
  {
    name: { fr: "Pygargue blagre", en: "White-bellied Sea-Eagle" },
    scientific: "Haliaeetus leucogaster",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🦅", conservation: 'LC',
    states: ALL,
    habitat: {
      fr: "Côtes, grands lacs et rivières",
      en: "Coasts, large lakes and rivers",
    },
    description: {
      fr: "Grand aigle blanc et gris qui chasse poissons et serpents d’eau près des côtes.",
      en: "A large white-and-grey eagle that hunts fish and sea snakes near the coast.",
    },
    funFact: {
      fr: "Les couples réutilisent le même nid géant pendant des années.",
      en: "Pairs reuse the same giant nest for years.",
    },
  },
  {
    name: { fr: "Podarge gris", en: "Tawny Frogmouth" },
    scientific: "Podargus strigoides",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🦉", conservation: 'LC',
    states: ALL,
    habitat: {
      fr: "Forêts claires et parcs",
      en: "Open woodland and parks",
    },
    description: {
      fr: "Oiseau nocturne au camouflage parfait qui imite une branche cassée le jour.",
      en: "A nocturnal bird with perfect camouflage that mimics a broken branch by day.",
    },
    funFact: {
      fr: "Ce n’est pas un hibou : il est plus proche des engoulevents.",
      en: "It is not an owl: it is more closely related to nightjars.",
    },
  },
  {
    name: { fr: "Ninoxe boubouk", en: "Southern Boobook" },
    scientific: "Ninox boobook",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🦉", conservation: 'LC',
    states: ALL,
    habitat: {
      fr: "Forêts et zones boisées",
      en: "Forests and woodland",
    },
    description: {
      fr: "Petite chouette brune dont le cri « boo-book » a donné son nom.",
      en: "A small brown owl whose “boo-book” call gave it its name.",
    },
    funFact: {
      fr: "C’est la plus petite et la plus répandue des chouettes d’Australie.",
      en: "It is Australia’s smallest and most widespread owl.",
    },
  },
  {
    name: { fr: "Ninoxe puissante", en: "Powerful Owl" },
    scientific: "Ninox strenua",
    category: 'oiseau', rarity: 'rare', emoji: "🦉", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'ACT'],
    habitat: {
      fr: "Forêts humides à grands arbres",
      en: "Wet forests with tall trees",
    },
    description: {
      fr: "La plus grande chouette d’Australie, capable de capturer des possums.",
      en: "Australia’s largest owl, able to catch possums.",
    },
    funFact: {
      fr: "Elle garde souvent sa proie entre ses serres toute la journée.",
      en: "It often keeps its prey in its talons all day long.",
    },
  },
  {
    name: { fr: "Grue brolga", en: "Brolga" },
    scientific: "Antigone rubicunda",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🦩", conservation: 'LC',
    states: ['QLD', 'NT', 'WA', 'NSW', 'VIC'],
    habitat: {
      fr: "Zones humides et prairies inondables",
      en: "Wetlands and floodplains",
    },
    description: {
      fr: "Grande grue grise à la tête rouge, célèbre pour ses danses nuptiales.",
      en: "A large grey crane with a red head, famous for its courtship dances.",
    },
    funFact: {
      fr: "Sa danse a inspiré de nombreuses danses aborigènes.",
      en: "Its dance has inspired many Aboriginal dances.",
    },
  },
  {
    name: { fr: "Jabiru d’Asie", en: "Black-necked Stork" },
    scientific: "Ephippiorhynchus asiaticus",
    category: 'oiseau', rarity: 'rare', emoji: "🦩", conservation: 'NT',
    states: ['QLD', 'NT', 'WA', 'NSW'],
    habitat: {
      fr: "Marais et billabongs tropicaux",
      en: "Tropical swamps and billabongs",
    },
    description: {
      fr: "Grande cigogne au cou noir irisé et aux pattes rouges, appelée « jabiru » en Australie.",
      en: "A large stork with an iridescent black neck and red legs, known as the “jabiru” in Australia.",
    },
    funFact: {
      fr: "C’est la seule cigogne d’Australie.",
      en: "It is Australia’s only stork.",
    },
  },
  {
    name: { fr: "Méliphage bruyant", en: "Noisy Miner" },
    scientific: "Manorina melanocephala",
    category: 'oiseau', rarity: 'commun', emoji: "🐦", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
    habitat: {
      fr: "Parcs, jardins et forêts claires",
      en: "Parks, gardens and open woodland",
    },
    description: {
      fr: "Passereau gris au masque jaune, très territorial et… très bavard.",
      en: "A grey honeyeater with a yellow mask, very territorial and very chatty.",
    },
    funFact: {
      fr: "Ils chassent ensemble les autres oiseaux de leur territoire.",
      en: "They team up to chase other birds out of their territory.",
    },
  },
  {
    name: { fr: "Jardinier satiné", en: "Satin Bowerbird" },
    scientific: "Ptilonorhynchus violaceus",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🐦‍⬛", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'ACT'],
    habitat: {
      fr: "Forêts humides et jardins",
      en: "Rainforests and gardens",
    },
    description: {
      fr: "Le mâle bleu-noir construit une tonnelle décorée d’objets bleus pour séduire la femelle.",
      en: "The blue-black male builds a bower decorated with blue objects to attract a female.",
    },
    funFact: {
      fr: "Il collectionne bouchons, pinces à linge et pailles… tant qu’ils sont bleus !",
      en: "It collects bottle caps, pegs and straws… as long as they are blue!",
    },
  },
  {
    name: { fr: "Talégalle de Latham", en: "Australian Brushturkey" },
    scientific: "Alectura lathami",
    category: 'oiseau', rarity: 'commun', emoji: "🦃", conservation: 'LC',
    states: ['QLD', 'NSW'],
    habitat: {
      fr: "Forêts humides, jardins de banlieue",
      en: "Rainforests, suburban gardens",
    },
    description: {
      fr: "Gros oiseau noir à tête rouge qui construit un énorme tas de compost pour incuber ses œufs.",
      en: "A big black bird with a red head that builds a huge compost mound to incubate its eggs.",
    },
    funFact: {
      fr: "Le mâle vérifie la température du nid avec son bec.",
      en: "The male checks the nest temperature with its beak.",
    },
  },
  {
    name: { fr: "Diamant de Gould", en: "Gouldian Finch" },
    scientific: "Chloebia gouldiae",
    category: 'oiseau', rarity: 'legendaire', emoji: "🐦", conservation: 'NT',
    states: ['WA', 'NT', 'QLD'],
    habitat: {
      fr: "Savanes tropicales du nord",
      en: "Tropical savannas of the north",
    },
    description: {
      fr: "Petit passereau aux couleurs incroyables : violet, vert, jaune et rouge.",
      en: "A small finch with incredible colours: purple, green, yellow and red.",
    },
    funFact: {
      fr: "Il en reste seulement quelques milliers à l’état sauvage.",
      en: "Only a few thousand remain in the wild.",
    },
  },
  {
    name: { fr: "Pardalote pointillé", en: "Spotted Pardalote" },
    scientific: "Pardalotus punctatus",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🐦", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'WA', 'ACT'],
    habitat: {
      fr: "Forêts d’eucalyptus",
      en: "Eucalypt forests",
    },
    description: {
      fr: "Minuscule oiseau couvert de points blancs, qui niche dans des tunnels creusés dans la terre.",
      en: "A tiny bird covered in white spots that nests in tunnels dug into the ground.",
    },
    funFact: {
      fr: "Il pèse à peine 8 grammes.",
      en: "It weighs barely 8 grams.",
    },
  },
  {
    name: { fr: "Rhipidure hochequeue", en: "Willie Wagtail" },
    scientific: "Rhipidura leucophrys",
    category: 'oiseau', rarity: 'commun', emoji: "🐦‍⬛", conservation: 'LC',
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
    habitat: {
      fr: "Partout sauf en forêt dense",
      en: "Everywhere except dense forest",
    },
    description: {
      fr: "Petit oiseau noir et blanc qui agite sans cesse sa queue en éventail.",
      en: "A small black-and-white bird that constantly wags its fan-shaped tail.",
    },
    funFact: {
      fr: "Il n’hésite pas à harceler des aigles bien plus grands que lui.",
      en: "It doesn’t hesitate to harass eagles far bigger than itself.",
    },
  },
  {
    name: { fr: "Perruche royale", en: "Australian King-Parrot" },
    scientific: "Alisterus scapularis",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🦜", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'ACT'],
    habitat: {
      fr: "Forêts humides et jardins",
      en: "Rainforests and gardens",
    },
    description: {
      fr: "Grand perroquet dont le mâle a la tête et le ventre rouge vif et le dos vert.",
      en: "A large parrot whose male has a bright red head and belly and a green back.",
    },
    funFact: {
      fr: "Seul le mâle a la tête rouge : la femelle est verte.",
      en: "Only the male has a red head: the female is green.",
    },
  },
  {
    name: { fr: "Rosella de Pennant", en: "Crimson Rosella" },
    scientific: "Platycercus elegans",
    category: 'oiseau', rarity: 'commun', emoji: "🦜", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'SA', 'ACT'],
    habitat: {
      fr: "Forêts de montagne et parcs",
      en: "Mountain forests and parks",
    },
    description: {
      fr: "Perruche rouge cramoisi aux joues et ailes bleues.",
      en: "A crimson parrot with blue cheeks and wings.",
    },
    funFact: {
      fr: "Les jeunes sont presque entièrement verts.",
      en: "Young birds are almost entirely green.",
    },
  },
  // ───────────── Reptiles ─────────────
  {
    name: { fr: "Crocodile marin", en: "Saltwater Crocodile" },
    scientific: "Crocodylus porosus",
    category: 'reptile', rarity: 'rare', emoji: "🐊", conservation: 'LC',
    states: ['QLD', 'NT', 'WA'],
    dangerous: true,
    habitat: {
      fr: "Estuaires, rivières et côtes tropicales",
      en: "Tropical estuaries, rivers and coasts",
    },
    description: {
      fr: "Le plus grand reptile vivant : les mâles peuvent dépasser 6 m et 1 000 kg.",
      en: "The largest living reptile: males can exceed 6 m and 1,000 kg.",
    },
    funFact: {
      fr: "Sa morsure est la plus puissante jamais mesurée chez un animal.",
      en: "Its bite is the most powerful ever measured in an animal.",
    },
  },
  {
    name: { fr: "Crocodile de Johnston", en: "Freshwater Crocodile" },
    scientific: "Crocodylus johnstoni",
    category: 'reptile', rarity: 'peu-commun', emoji: "🐊", conservation: 'LC',
    states: ['QLD', 'NT', 'WA'],
    habitat: {
      fr: "Rivières et gorges d’eau douce",
      en: "Freshwater rivers and gorges",
    },
    description: {
      fr: "Crocodile au museau fin, plus petit et plus timide que son cousin marin.",
      en: "A slender-snouted crocodile, smaller and shyer than its saltwater cousin.",
    },
    funFact: {
      fr: "Il peut « galoper » sur terre pour fuir le danger.",
      en: "It can “gallop” on land to escape danger.",
    },
  },
  {
    name: { fr: "Lézard à collerette", en: "Frill-necked Lizard" },
    scientific: "Chlamydosaurus kingii",
    category: 'reptile', rarity: 'rare', emoji: "🦎", conservation: 'LC',
    states: ['QLD', 'NT', 'WA'],
    habitat: {
      fr: "Savanes et forêts tropicales sèches",
      en: "Savannas and dry tropical woodland",
    },
    description: {
      fr: "Lézard qui déploie une énorme collerette autour de son cou pour intimider ses ennemis.",
      en: "A lizard that spreads a huge frill around its neck to scare off enemies.",
    },
    funFact: {
      fr: "Quand il fuit, il court debout sur ses pattes arrière.",
      en: "When it flees, it runs upright on its hind legs.",
    },
  },
  {
    name: { fr: "Diable cornu", en: "Thorny Devil" },
    scientific: "Moloch horridus",
    category: 'reptile', rarity: 'legendaire', emoji: "🦎", conservation: 'LC',
    states: ['WA', 'SA', 'NT', 'QLD'],
    habitat: {
      fr: "Déserts de sable",
      en: "Sandy deserts",
    },
    description: {
      fr: "Petit lézard couvert d’épines qui se nourrit uniquement de fourmis.",
      en: "A small lizard covered in spines that eats nothing but ants.",
    },
    funFact: {
      fr: "Il boit par la peau : l’eau remonte jusqu’à sa bouche par de minuscules canaux.",
      en: "It drinks through its skin: water travels to its mouth through tiny channels.",
    },
  },
  {
    name: { fr: "Scinque à langue bleue", en: "Eastern Blue-tongued Lizard" },
    scientific: "Tiliqua scincoides",
    category: 'reptile', rarity: 'commun', emoji: "🦎", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'SA', 'NT', 'WA', 'ACT'],
    habitat: {
      fr: "Jardins, forêts claires, prairies",
      en: "Gardens, open woodland, grassland",
    },
    description: {
      fr: "Gros lézard placide qui tire une langue bleu cobalt pour effrayer les prédateurs.",
      en: "A large, placid lizard that sticks out a cobalt-blue tongue to scare predators.",
    },
    funFact: {
      fr: "Les jardiniers l’adorent : il mange les escargots.",
      en: "Gardeners love it: it eats snails.",
    },
  },
  {
    name: { fr: "Scinque à queue courte", en: "Shingleback Lizard" },
    scientific: "Tiliqua rugosa",
    category: 'reptile', rarity: 'peu-commun', emoji: "🦎", conservation: 'LC',
    states: ['WA', 'SA', 'NSW', 'VIC', 'QLD'],
    habitat: {
      fr: "Zones semi-arides et mallee",
      en: "Semi-arid areas and mallee",
    },
    description: {
      fr: "Lézard trapu aux écailles en forme de pomme de pin et à la queue en forme de tête.",
      en: "A stocky lizard with pine-cone-like scales and a tail shaped like its head.",
    },
    funFact: {
      fr: "Les couples restent fidèles pendant plus de 20 ans.",
      en: "Pairs stay together for more than 20 years.",
    },
  },
  {
    name: { fr: "Dragon barbu", en: "Central Bearded Dragon" },
    scientific: "Pogona vitticeps",
    category: 'reptile', rarity: 'peu-commun', emoji: "🦎", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'SA', 'NT'],
    habitat: {
      fr: "Zones arides et bois secs",
      en: "Arid areas and dry woodland",
    },
    description: {
      fr: "Lézard à la « barbe » épineuse qu’il gonfle et noircit lorsqu’il est menacé.",
      en: "A lizard with a spiny “beard” that it puffs up and darkens when threatened.",
    },
    funFact: {
      fr: "Il salue ses congénères en faisant des cercles avec sa patte avant.",
      en: "It greets others by waving one of its front legs in circles.",
    },
  },
  {
    name: { fr: "Dragon d’eau australien", en: "Australian Water Dragon" },
    scientific: "Intellagama lesueurii",
    category: 'reptile', rarity: 'commun', emoji: "🦎", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'ACT'],
    habitat: {
      fr: "Berges des cours d’eau, parcs urbains",
      en: "Creek banks, city parks",
    },
    description: {
      fr: "Grand lézard semi-aquatique souvent vu en train de se dorer au soleil près de l’eau.",
      en: "A large semi-aquatic lizard often seen basking in the sun near water.",
    },
    funFact: {
      fr: "Il peut rester sous l’eau jusqu’à 90 minutes.",
      en: "It can stay underwater for up to 90 minutes.",
    },
  },
  {
    name: { fr: "Varan bigarré", en: "Lace Monitor" },
    scientific: "Varanus varius",
    category: 'reptile', rarity: 'peu-commun', emoji: "🦎", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'SA', 'ACT'],
    habitat: {
      fr: "Forêts et aires de pique-nique",
      en: "Forests and picnic grounds",
    },
    description: {
      fr: "Grand « goanna » noir et crème qui grimpe aux arbres pour piller les nids.",
      en: "A large black-and-cream goanna that climbs trees to raid nests.",
    },
    funFact: {
      fr: "Il peut mesurer plus de 2 m.",
      en: "It can grow longer than 2 m.",
    },
  },
  {
    name: { fr: "Perentie", en: "Perentie" },
    scientific: "Varanus giganteus",
    category: 'reptile', rarity: 'rare', emoji: "🦎", conservation: 'LC',
    states: ['WA', 'SA', 'NT', 'QLD'],
    habitat: {
      fr: "Déserts rocheux du centre",
      en: "Rocky deserts of the centre",
    },
    description: {
      fr: "Le plus grand lézard d’Australie et le quatrième plus grand au monde.",
      en: "Australia’s largest lizard and the fourth largest in the world.",
    },
    funFact: {
      fr: "Il peut atteindre 2,5 m et courir très vite sur ses pattes arrière.",
      en: "It can reach 2.5 m and run very fast on its hind legs.",
    },
  },
  {
    name: { fr: "Gecko à queue de feuille", en: "Northern Leaf-tailed Gecko" },
    scientific: "Saltuarius cornutus",
    category: 'reptile', rarity: 'rare', emoji: "🦎", conservation: 'LC',
    states: ['QLD'],
    habitat: {
      fr: "Forêts tropicales du nord-est",
      en: "Tropical rainforests of the north-east",
    },
    description: {
      fr: "Gecko au camouflage incroyable qui se confond avec l’écorce des arbres.",
      en: "A gecko with incredible camouflage that blends into tree bark.",
    },
    funFact: {
      fr: "Sa queue plate ressemble à une feuille morte.",
      en: "Its flat tail looks like a dead leaf.",
    },
  },
  {
    name: { fr: "Taïpan du désert", en: "Inland Taipan" },
    scientific: "Oxyuranus microlepidotus",
    category: 'reptile', rarity: 'legendaire', emoji: "🐍", conservation: 'LC',
    states: ['QLD', 'SA'],
    dangerous: true,
    habitat: {
      fr: "Plaines inondables arides du centre-est",
      en: "Arid floodplains of the central east",
    },
    description: {
      fr: "Serpent au venin le plus puissant du monde, mais très timide et rarement vu.",
      en: "The snake with the most potent venom in the world, but very shy and rarely seen.",
    },
    funFact: {
      fr: "Sa peau change de couleur selon les saisons : plus sombre en hiver.",
      en: "Its skin changes colour with the seasons: darker in winter.",
    },
  },
  {
    name: { fr: "Serpent brun de l’Est", en: "Eastern Brown Snake" },
    scientific: "Pseudonaja textilis",
    category: 'reptile', rarity: 'peu-commun', emoji: "🐍", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'SA', 'NT', 'ACT'],
    dangerous: true,
    habitat: {
      fr: "Champs, prairies et banlieues",
      en: "Fields, grassland and suburbs",
    },
    description: {
      fr: "Serpent très venimeux et rapide, responsable de la plupart des morsures graves en Australie.",
      en: "A highly venomous, fast snake responsible for most serious snakebites in Australia.",
    },
    funFact: {
      fr: "Il chasse les souris, ce qui l’attire près des fermes.",
      en: "It hunts mice, which draws it close to farms.",
    },
  },
  {
    name: { fr: "Serpent noir à ventre rouge", en: "Red-bellied Black Snake" },
    scientific: "Pseudechis porphyriacus",
    category: 'reptile', rarity: 'peu-commun', emoji: "🐍", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'SA', 'ACT'],
    dangerous: true,
    habitat: {
      fr: "Zones humides et bords de rivière",
      en: "Wetlands and riverbanks",
    },
    description: {
      fr: "Serpent noir brillant aux flancs rouges, venimeux mais peu agressif.",
      en: "A glossy black snake with red flanks, venomous but not aggressive.",
    },
    funFact: {
      fr: "Il chasse les grenouilles et peut rester 20 minutes sous l’eau.",
      en: "It hunts frogs and can stay underwater for 20 minutes.",
    },
  },
  {
    name: { fr: "Python tapis", en: "Carpet Python" },
    scientific: "Morelia spilota",
    category: 'reptile', rarity: 'peu-commun', emoji: "🐍", conservation: 'LC',
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
    habitat: {
      fr: "Forêts, zones rocheuses et greniers",
      en: "Forests, rocky areas and roof spaces",
    },
    description: {
      fr: "Grand python non venimeux aux motifs de tapis, souvent trouvé dans les toits.",
      en: "A large non-venomous python with carpet-like patterns, often found in roofs.",
    },
    funFact: {
      fr: "Il détecte la chaleur de ses proies grâce à des fossettes sur ses lèvres.",
      en: "It senses the heat of its prey through pits on its lips.",
    },
  },
  {
    name: { fr: "Chélodine à long cou", en: "Eastern Long-necked Turtle" },
    scientific: "Chelodina longicollis",
    category: 'reptile', rarity: 'peu-commun', emoji: "🐢", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'SA', 'ACT'],
    habitat: {
      fr: "Marais, étangs et barrages",
      en: "Swamps, ponds and farm dams",
    },
    description: {
      fr: "Tortue d’eau douce dont le cou est presque aussi long que sa carapace.",
      en: "A freshwater turtle whose neck is almost as long as its shell.",
    },
    funFact: {
      fr: "Elle replie son cou sur le côté plutôt que de le rentrer.",
      en: "It folds its neck sideways instead of pulling it in.",
    },
  },
  // ───────────── Amphibiens ─────────────
  {
    name: { fr: "Rainette de White", en: "Australian Green Tree Frog" },
    scientific: "Ranoides caerulea",
    category: 'amphibien', rarity: 'commun', emoji: "🐸", conservation: 'LC',
    states: ['QLD', 'NSW', 'NT', 'WA', 'SA'],
    habitat: {
      fr: "Forêts, jardins et… toilettes !",
      en: "Forests, gardens and… toilets!",
    },
    description: {
      fr: "Grosse grenouille verte et dodue, au sourire permanent, qui adore les maisons.",
      en: "A big, chubby green frog with a permanent smile that loves houses.",
    },
    funFact: {
      fr: "Sa peau sécrète des substances étudiées pour lutter contre les bactéries.",
      en: "Its skin produces substances studied for fighting bacteria.",
    },
  },
  {
    name: { fr: "Rainette aux yeux rouges", en: "Red-eyed Tree Frog" },
    scientific: "Litoria chloris",
    category: 'amphibien', rarity: 'peu-commun', emoji: "🐸", conservation: 'LC',
    states: ['QLD', 'NSW'],
    habitat: {
      fr: "Forêts humides de la côte est",
      en: "Rainforests of the east coast",
    },
    description: {
      fr: "Rainette vert vif aux yeux orangés et aux cuisses bleutées.",
      en: "A bright green tree frog with orange eyes and bluish thighs.",
    },
    funFact: {
      fr: "Elle n’apparaît en nombre qu’après les gros orages d’été.",
      en: "It only appears in large numbers after big summer storms.",
    },
  },
  {
    name: { fr: "Grenouille rayée des marais", en: "Striped Marsh Frog" },
    scientific: "Limnodynastes peronii",
    category: 'amphibien', rarity: 'commun', emoji: "🐸", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
    habitat: {
      fr: "Étangs, fossés et mares de jardin",
      en: "Ponds, ditches and garden ponds",
    },
    description: {
      fr: "Grenouille brune rayée dont le cri ressemble à un « tok » de balle de ping-pong.",
      en: "A striped brown frog whose call sounds like the “tok” of a ping-pong ball.",
    },
    funFact: {
      fr: "Elle pond ses œufs dans un nid de mousse flottante.",
      en: "It lays its eggs in a floating foam nest.",
    },
  },
  {
    name: { fr: "Grenouille corroboree", en: "Southern Corroboree Frog" },
    scientific: "Pseudophryne corroboree",
    category: 'amphibien', rarity: 'legendaire', emoji: "🐸", conservation: 'CR',
    states: ['NSW', 'ACT'],
    habitat: {
      fr: "Tourbières alpines du Kosciuszko",
      en: "Alpine bogs of Kosciuszko",
    },
    description: {
      fr: "Minuscule grenouille aux rayures jaune vif et noir, l’une des plus menacées au monde.",
      en: "A tiny frog with bright yellow and black stripes, one of the most endangered in the world.",
    },
    funFact: {
      fr: "Elle fabrique elle-même son poison, contrairement à la plupart des grenouilles toxiques.",
      en: "It makes its own poison, unlike most toxic frogs.",
    },
  },
  {
    name: { fr: "Crapaud buffle", en: "Cane Toad" },
    scientific: "Rhinella marina",
    category: 'amphibien', rarity: 'commun', emoji: "🐸", conservation: 'LC',
    states: ['QLD', 'NSW', 'NT', 'WA'],
    introduced: true,
    dangerous: true,
    habitat: {
      fr: "Presque tous les milieux tropicaux",
      en: "Almost every tropical habitat",
    },
    description: {
      fr: "Introduit en 1935 pour lutter contre un coléoptère, il est devenu un fléau toxique.",
      en: "Introduced in 1935 to control a beetle, it became a toxic plague.",
    },
    funFact: {
      fr: "Ses glandes à venin peuvent tuer un crocodile ou un quoll qui le mange.",
      en: "Its poison glands can kill a crocodile or a quoll that eats it.",
    },
  },
  // ───────────── Vie marine ─────────────
  {
    name: { fr: "Requin blanc", en: "Great White Shark" },
    scientific: "Carcharodon carcharias",
    category: 'marin', rarity: 'legendaire', emoji: "🦈", conservation: 'VU',
    states: ['NSW', 'VIC', 'TAS', 'SA', 'WA', 'QLD'],
    dangerous: true,
    habitat: {
      fr: "Eaux tempérées côtières",
      en: "Temperate coastal waters",
    },
    description: {
      fr: "Grand prédateur des océans, pouvant dépasser 6 m de long.",
      en: "The great predator of the oceans, which can exceed 6 m in length.",
    },
    funFact: {
      fr: "Il peut détecter une goutte de sang dans 100 litres d’eau.",
      en: "It can detect a drop of blood in 100 litres of water.",
    },
  },
  {
    name: { fr: "Requin-baleine", en: "Whale Shark" },
    scientific: "Rhincodon typus",
    category: 'marin', rarity: 'legendaire', emoji: "🦈", conservation: 'EN',
    states: ['WA', 'QLD', 'NT'],
    habitat: {
      fr: "Récif de Ningaloo et eaux tropicales",
      en: "Ningaloo Reef and tropical waters",
    },
    description: {
      fr: "Le plus grand poisson du monde, un géant inoffensif qui filtre le plancton.",
      en: "The largest fish in the world, a harmless giant that filters plankton.",
    },
    funFact: {
      fr: "Chaque requin-baleine a un motif de taches unique, comme une empreinte digitale.",
      en: "Every whale shark has a unique pattern of spots, like a fingerprint.",
    },
  },
  {
    name: { fr: "Baleine à bosse", en: "Humpback Whale" },
    scientific: "Megaptera novaeangliae",
    category: 'marin', rarity: 'rare', emoji: "🐋", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'WA', 'NT'],
    habitat: {
      fr: "Côtes est et ouest lors des migrations",
      en: "East and west coasts during migration",
    },
    description: {
      fr: "Baleine acrobatique qui migre chaque hiver le long des côtes australiennes.",
      en: "An acrobatic whale that migrates along the Australian coast every winter.",
    },
    funFact: {
      fr: "Les mâles chantent des mélodies complexes qui changent chaque année.",
      en: "Males sing complex songs that change every year.",
    },
  },
  {
    name: { fr: "Grand dauphin de l’Indo-Pacifique", en: "Indo-Pacific Bottlenose Dolphin" },
    scientific: "Tursiops aduncus",
    category: 'marin', rarity: 'peu-commun', emoji: "🐬", conservation: 'LC',
    states: ALL,
    habitat: {
      fr: "Baies et eaux côtières",
      en: "Bays and coastal waters",
    },
    description: {
      fr: "Dauphin côtier très sociable, souvent observé depuis les plages et les ports.",
      en: "A very sociable coastal dolphin, often seen from beaches and harbours.",
    },
    funFact: {
      fr: "À Shark Bay, certains utilisent des éponges pour protéger leur rostre en chassant.",
      en: "At Shark Bay, some use sponges to protect their beaks while foraging.",
    },
  },
  {
    name: { fr: "Dugong", en: "Dugong" },
    scientific: "Dugong dugon",
    category: 'marin', rarity: 'rare', emoji: "🐄", conservation: 'VU',
    states: ['QLD', 'NT', 'WA'],
    habitat: {
      fr: "Herbiers marins tropicaux",
      en: "Tropical seagrass meadows",
    },
    description: {
      fr: "Mammifère marin herbivore, cousin du lamantin, qui broute les herbiers.",
      en: "A plant-eating marine mammal, cousin of the manatee, that grazes on seagrass.",
    },
    funFact: {
      fr: "Les marins d’autrefois l’auraient pris pour une sirène.",
      en: "Sailors of old may have mistaken it for a mermaid.",
    },
  },
  {
    name: { fr: "Tortue verte", en: "Green Sea Turtle" },
    scientific: "Chelonia mydas",
    category: 'marin', rarity: 'peu-commun', emoji: "🐢", conservation: 'EN',
    states: ['QLD', 'NT', 'WA', 'NSW'],
    habitat: {
      fr: "Récifs coralliens et herbiers",
      en: "Coral reefs and seagrass beds",
    },
    description: {
      fr: "Grande tortue marine qui pond sur les plages du Queensland, comme à Raine Island.",
      en: "A large sea turtle that nests on Queensland beaches, such as Raine Island.",
    },
    funFact: {
      fr: "Sa carapace n’est pas verte : c’est sa graisse qui lui donne son nom.",
      en: "Its shell isn’t green: its name comes from the colour of its fat.",
    },
  },
  {
    name: { fr: "Otarie à fourrure d’Australie", en: "Australian Fur Seal" },
    scientific: "Arctocephalus pusillus doriferus",
    category: 'marin', rarity: 'peu-commun', emoji: "🦭", conservation: 'LC',
    states: ['VIC', 'TAS', 'NSW', 'SA'],
    habitat: {
      fr: "Îles rocheuses du détroit de Bass",
      en: "Rocky islands of Bass Strait",
    },
    description: {
      fr: "Otarie robuste qui se repose en grandes colonies sur les rochers.",
      en: "A sturdy fur seal that rests in large colonies on the rocks.",
    },
    funFact: {
      fr: "Elle peut plonger à plus de 200 m pour chasser.",
      en: "It can dive deeper than 200 m to hunt.",
    },
  },
  {
    name: { fr: "Otarie cendrée", en: "Australian Sea Lion" },
    scientific: "Neophoca cinerea",
    category: 'marin', rarity: 'rare', emoji: "🦭", conservation: 'EN',
    states: ['SA', 'WA'],
    habitat: {
      fr: "Plages et îles du sud",
      en: "Southern beaches and islands",
    },
    description: {
      fr: "Lion de mer endémique, curieux et joueur avec les plongeurs.",
      en: "An endemic sea lion, curious and playful with divers.",
    },
    funFact: {
      fr: "Son cycle de reproduction dure 18 mois, un cas unique chez les pinnipèdes.",
      en: "Its breeding cycle lasts 18 months, unique among seals and sea lions.",
    },
  },
  {
    name: { fr: "Dragon de mer feuillu", en: "Leafy Seadragon" },
    scientific: "Phycodurus eques",
    category: 'marin', rarity: 'legendaire', emoji: "🐉", conservation: 'LC',
    states: ['SA', 'WA', 'VIC'],
    habitat: {
      fr: "Forêts de kelp du sud",
      en: "Southern kelp forests",
    },
    description: {
      fr: "Cousin de l’hippocampe orné d’appendices en forme de feuilles d’algue.",
      en: "A cousin of the seahorse decorated with leaf-like appendages that look like seaweed.",
    },
    funFact: {
      fr: "C’est le mâle qui porte les œufs sous sa queue.",
      en: "The male carries the eggs under its tail.",
    },
  },
  {
    name: { fr: "Poisson-clown", en: "Orange Clownfish" },
    scientific: "Amphiprion percula",
    category: 'marin', rarity: 'peu-commun', emoji: "🐠", conservation: 'LC',
    states: ['QLD'],
    habitat: {
      fr: "Anémones de la Grande Barrière de corail",
      en: "Anemones of the Great Barrier Reef",
    },
    description: {
      fr: "Petit poisson orange et blanc qui vit en symbiose avec les anémones de mer.",
      en: "A small orange-and-white fish that lives in partnership with sea anemones.",
    },
    funFact: {
      fr: "Tous naissent mâles ; le plus grand du groupe devient femelle.",
      en: "They are all born male; the largest in the group becomes female.",
    },
  },
  {
    name: { fr: "Napoléon", en: "Humphead Wrasse" },
    scientific: "Cheilinus undulatus",
    category: 'marin', rarity: 'rare', emoji: "🐟", conservation: 'EN',
    states: ['QLD', 'WA'],
    habitat: {
      fr: "Récifs coralliens",
      en: "Coral reefs",
    },
    description: {
      fr: "Énorme labre bleu-vert à la bosse frontale, pouvant dépasser 2 m.",
      en: "A huge blue-green wrasse with a bump on its forehead, which can exceed 2 m.",
    },
    funFact: {
      fr: "Il fait partie des rares prédateurs de l’étoile de mer couronne-d’épines.",
      en: "It is one of the few predators of the crown-of-thorns starfish.",
    },
  },
  {
    name: { fr: "Raie manta de récif", en: "Reef Manta Ray" },
    scientific: "Mobula alfredi",
    category: 'marin', rarity: 'rare', emoji: "🐟", conservation: 'VU',
    states: ['QLD', 'WA'],
    habitat: {
      fr: "Récifs et stations de nettoyage",
      en: "Reefs and cleaning stations",
    },
    description: {
      fr: "Raie géante et gracieuse au cerveau le plus gros de tous les poissons.",
      en: "A graceful giant ray with the largest brain of any fish.",
    },
    funFact: {
      fr: "Son envergure peut atteindre 5 m.",
      en: "Its wingspan can reach 5 m.",
    },
  },
  {
    name: { fr: "Seiche géante d’Australie", en: "Giant Australian Cuttlefish" },
    scientific: "Sepia apama",
    category: 'marin', rarity: 'rare', emoji: "🦑", conservation: 'NT',
    states: ['SA', 'WA', 'VIC', 'TAS', 'NSW', 'QLD'],
    habitat: {
      fr: "Récifs rocheux du golfe de Spencer",
      en: "Rocky reefs of Spencer Gulf",
    },
    description: {
      fr: "La plus grande seiche du monde, maîtresse du changement de couleur.",
      en: "The largest cuttlefish in the world, a master of colour change.",
    },
    funFact: {
      fr: "À Whyalla, des milliers se rassemblent chaque hiver pour se reproduire.",
      en: "At Whyalla, thousands gather every winter to breed.",
    },
  },
  {
    name: { fr: "Pieuvre à anneaux bleus", en: "Southern Blue-ringed Octopus" },
    scientific: "Hapalochlaena maculosa",
    category: 'marin', rarity: 'rare', emoji: "🐙", conservation: 'LC',
    states: ['NSW', 'VIC', 'TAS', 'SA', 'WA'],
    dangerous: true,
    habitat: {
      fr: "Flaques et rochers de bord de mer",
      en: "Rock pools and rocky shores",
    },
    description: {
      fr: "Petite pieuvre aux anneaux bleus fluorescents, au venin mortel.",
      en: "A small octopus with fluorescent blue rings and deadly venom.",
    },
    funFact: {
      fr: "Elle tient dans une main… mais il ne faut surtout jamais la toucher.",
      en: "It fits in your hand… but you must never touch it.",
    },
  },
  {
    name: { fr: "Méduse-boîte", en: "Box Jellyfish" },
    scientific: "Chironex fleckeri",
    category: 'marin', rarity: 'rare', emoji: "🪼", conservation: 'LC',
    states: ['QLD', 'NT', 'WA'],
    dangerous: true,
    habitat: {
      fr: "Eaux côtières tropicales (oct. à mai)",
      en: "Tropical coastal waters (Oct. to May)",
    },
    description: {
      fr: "Méduse quasi transparente parmi les animaux les plus venimeux de la planète.",
      en: "An almost transparent jellyfish, among the most venomous animals on the planet.",
    },
    funFact: {
      fr: "Elle possède 24 yeux, dont certains forment de vraies images.",
      en: "It has 24 eyes, some of which form real images.",
    },
  },
  {
    name: { fr: "Crabe soldat", en: "Soldier Crab" },
    scientific: "Mictyris longicarpus",
    category: 'marin', rarity: 'commun', emoji: "🦀", conservation: 'LC',
    states: ['QLD', 'NSW'],
    habitat: {
      fr: "Vasières et plages abritées",
      en: "Mudflats and sheltered beaches",
    },
    description: {
      fr: "Petit crabe bleu qui se déplace en « armées » de milliers d’individus à marée basse.",
      en: "A small blue crab that marches in “armies” of thousands at low tide.",
    },
    funFact: {
      fr: "Contrairement aux autres crabes, il marche vers l’avant.",
      en: "Unlike other crabs, it walks forwards.",
    },
  },
  // ───────────── Invertébrés ─────────────
  {
    name: { fr: "Atrax de Sydney", en: "Sydney Funnel-web Spider" },
    scientific: "Atrax robustus",
    category: 'invertebre', rarity: 'rare', emoji: "🕷️", conservation: 'LC',
    states: ['NSW'],
    dangerous: true,
    habitat: {
      fr: "Sols humides autour de Sydney",
      en: "Moist soil around Sydney",
    },
    description: {
      fr: "Mygale noire brillante au venin extrêmement puissant pour l’homme.",
      en: "A glossy black spider whose venom is extremely dangerous to humans.",
    },
    funFact: {
      fr: "Depuis l’antivenin de 1981, aucun décès n’a été enregistré.",
      en: "No deaths have been recorded since the antivenom was introduced in 1981.",
    },
  },
  {
    name: { fr: "Veuve à dos rouge", en: "Redback Spider" },
    scientific: "Latrodectus hasselti",
    category: 'invertebre', rarity: 'commun', emoji: "🕷️", conservation: 'LC',
    states: ALL,
    dangerous: true,
    habitat: {
      fr: "Abris de jardin, boîtes aux lettres, toilettes extérieures",
      en: "Garden sheds, letterboxes, outdoor toilets",
    },
    description: {
      fr: "Petite araignée noire marquée d’une bande rouge sur le dos, cousine de la veuve noire.",
      en: "A small black spider with a red stripe on its back, cousin of the black widow.",
    },
    funFact: {
      fr: "Le mâle se sacrifie parfois en se plaçant dans la bouche de la femelle.",
      en: "The male sometimes sacrifices itself by placing itself in the female’s mouth.",
    },
  },
  {
    name: { fr: "Araignée chasseresse", en: "Grey Huntsman Spider" },
    scientific: "Holconia immanis",
    category: 'invertebre', rarity: 'commun', emoji: "🕷️", conservation: 'LC',
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
    habitat: {
      fr: "Écorces d’arbres, murs et pare-soleil de voiture",
      en: "Tree bark, walls and car sun visors",
    },
    description: {
      fr: "Grande araignée plate et rapide, impressionnante mais inoffensive.",
      en: "A large, flat and fast spider: impressive but harmless.",
    },
    funFact: {
      fr: "Elle peut dépasser 15 cm d’envergure, pattes comprises.",
      en: "It can measure more than 15 cm across, legs included.",
    },
  },
  {
    name: { fr: "Papillon Ulysse", en: "Ulysses Butterfly" },
    scientific: "Papilio ulysses",
    category: 'invertebre', rarity: 'rare', emoji: "🦋", conservation: 'LC',
    states: ['QLD'],
    habitat: {
      fr: "Forêts tropicales du nord du Queensland",
      en: "Tropical rainforests of northern Queensland",
    },
    description: {
      fr: "Grand papillon aux ailes bleu électrique, emblème du tourisme du Queensland.",
      en: "A large butterfly with electric-blue wings, emblem of Queensland tourism.",
    },
    funFact: {
      fr: "Il est attiré par tout ce qui est bleu vif, même un parapluie.",
      en: "It is drawn to anything bright blue, even an umbrella.",
    },
  },
  {
    name: { fr: "Phasme épineux géant", en: "Macleay’s Spectre" },
    scientific: "Extatosoma tiaratum",
    category: 'invertebre', rarity: 'peu-commun', emoji: "🦗", conservation: 'LC',
    states: ['QLD', 'NSW'],
    habitat: {
      fr: "Forêts humides",
      en: "Rainforests",
    },
    description: {
      fr: "Phasme imitant une feuille morte épineuse, qui se balance comme une feuille dans le vent.",
      en: "A stick insect disguised as a spiny dead leaf, which sways like a leaf in the wind.",
    },
    funFact: {
      fr: "Ses œufs sont transportés par des fourmis qui les confondent avec des graines.",
      en: "Its eggs are carried off by ants, which mistake them for seeds.",
    },
  },
  {
    name: { fr: "Phasme de Lord Howe", en: "Lord Howe Island Stick Insect" },
    scientific: "Dryococelus australis",
    category: 'invertebre', rarity: 'legendaire', emoji: "🦗", conservation: 'CR',
    states: ['NSW'],
    habitat: {
      fr: "Ball’s Pyramid et programmes d’élevage",
      en: "Ball’s Pyramid and breeding programmes",
    },
    description: {
      fr: "L’« insecte-homard », cru éteint pendant 80 ans avant d’être redécouvert en 2001.",
      en: "The “tree lobster”, thought extinct for 80 years before being rediscovered in 2001.",
    },
    funFact: {
      fr: "Toute l’espèce sauvage tenait sous un seul buisson sur un rocher en pleine mer.",
      en: "The entire wild species lived under a single bush on a rock in the middle of the sea.",
    },
  },
  {
    name: { fr: "Fourmi bouledogue", en: "Red Bull Ant" },
    scientific: "Myrmecia gulosa",
    category: 'invertebre', rarity: 'commun', emoji: "🐜", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'ACT'],
    dangerous: true,
    habitat: {
      fr: "Forêts claires et sols sablonneux",
      en: "Open woodland and sandy soils",
    },
    description: {
      fr: "Grande fourmi aux mandibules impressionnantes et à la piqûre très douloureuse.",
      en: "A large ant with impressive jaws and a very painful sting.",
    },
    funFact: {
      fr: "Elle a une excellente vue et peut suivre vos mouvements.",
      en: "It has excellent eyesight and can follow your movements.",
    },
  },
  {
    name: { fr: "Cigale verte", en: "Green Grocer Cicada" },
    scientific: "Cyclochila australasiae",
    category: 'invertebre', rarity: 'commun', emoji: "🦗", conservation: 'LC',
    states: ['QLD', 'NSW', 'VIC', 'SA', 'ACT'],
    habitat: {
      fr: "Arbres des parcs et forêts",
      en: "Trees in parks and forests",
    },
    description: {
      fr: "Grande cigale verte dont le chant assourdissant est la bande-son de l’été australien.",
      en: "A large green cicada whose deafening song is the soundtrack of the Australian summer.",
    },
    funFact: {
      fr: "Son chant peut dépasser 120 décibels, autant qu’un concert de rock.",
      en: "Its song can exceed 120 decibels, as loud as a rock concert.",
    },
  },
  {
    name: { fr: "Abeille à bandes bleues", en: "Blue-banded Bee" },
    scientific: "Amegilla cingulata",
    category: 'invertebre', rarity: 'peu-commun', emoji: "🐝", conservation: 'LC',
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
    habitat: {
      fr: "Jardins et lisières fleuries",
      en: "Gardens and flowering edges",
    },
    description: {
      fr: "Abeille solitaire au corps rayé de bleu métallique.",
      en: "A solitary bee with a body striped in metallic blue.",
    },
    funFact: {
      fr: "Elle pollinise les tomates en faisant vibrer les fleurs (« buzz pollination »).",
      en: "It pollinates tomatoes by making the flowers vibrate (“buzz pollination”).",
    },
  },
  {
    name: { fr: "Ver luisant", en: "Glow-worm" },
    scientific: "Arachnocampa richardsae",
    category: 'invertebre', rarity: 'rare', emoji: "✨", conservation: 'LC',
    states: ['NSW', 'QLD'],
    habitat: {
      fr: "Grottes et ravins humides",
      en: "Caves and damp gullies",
    },
    description: {
      fr: "Larve de moucheron qui brille dans l’obscurité pour attirer ses proies dans des fils collants.",
      en: "A fungus-gnat larva that glows in the dark to lure prey into sticky threads.",
    },
    funFact: {
      fr: "Les voûtes de certaines grottes ressemblent à un ciel étoilé.",
      en: "The ceilings of some caves look like a starry sky.",
    },
  },
  {
    name: { fr: "Yabby", en: "Common Yabby" },
    scientific: "Cherax destructor",
    category: 'invertebre', rarity: 'peu-commun', emoji: "🦞", conservation: 'LC',
    states: ['NSW', 'VIC', 'QLD', 'SA', 'NT', 'ACT'],
    habitat: {
      fr: "Barrages, rivières et marais",
      en: "Farm dams, rivers and swamps",
    },
    description: {
      fr: "Écrevisse d’eau douce très résistante, capable de survivre à la sécheresse dans son terrier.",
      en: "A very hardy freshwater crayfish that can survive drought in its burrow.",
    },
    funFact: {
      fr: "Les enfants australiens les pêchent avec un morceau de viande au bout d’une ficelle.",
      en: "Australian kids catch them with a piece of meat tied to a string.",
    },
  },
];

export const ANIMALS: Animal[] = RAW.map((raw, index) => ({ ...raw, id: index + 1 }));

export const ANIMALS_BY_ID = new Map(ANIMALS.map((a) => [a.id, a]));

export function getAnimal(id: number): Animal | undefined {
  return ANIMALS_BY_ID.get(id);
}

export function dexNumber(id: number): string {
  return `#${String(id).padStart(3, '0')}`;
}

/** Nom courant de l'espèce dans la langue choisie. */
export function animalName(animal: Animal, lang: Lang): string {
  return animal.name[lang];
}
