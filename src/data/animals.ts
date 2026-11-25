import { localized } from '../i18n/registry';
import type { SpeciesText } from '../i18n/types';
import type { Animal, Lang, Localized } from './types';

type Raw = Omit<Animal, 'id' | 'name' | 'habitat' | 'description' | 'funFact'>;

const ALL: Animal['states'] = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT'];

// Catalogue des espèces (données sans texte). Les noms et textes de chaque espèce sont dans
// les fichiers de langue : src/i18n/<langue>/content.ts (clé = numéro de l'espèce).
// Ajoute toujours les nouvelles espèces à la FIN (les numéros suivent l'ordre du tableau).
const RAW: Raw[] = [
  // ───────────── Mammifères ─────────────
  {
    scientific: "Osphranter rufus",
    category: 'mammifere', rarity: 'commun', emoji: "🦘",
    states: ['NSW', 'QLD', 'SA', 'WA', 'NT'],
  },
  {
    scientific: "Macropus giganteus",
    category: 'mammifere', rarity: 'commun', emoji: "🦘",
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
  },
  {
    scientific: "Notamacropus rufogriseus",
    category: 'mammifere', rarity: 'commun', emoji: "🦘",
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
  },
  {
    scientific: "Osphranter robustus",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🦘",
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
  },
  {
    scientific: "Setonix brachyurus",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🦘",
    states: ['WA'],
  },
  {
    scientific: "Phascolarctos cinereus",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🐨",
    states: ['QLD', 'NSW', 'VIC', 'SA', 'ACT'],
  },
  {
    scientific: "Vombatus ursinus",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🐻",
    states: ['NSW', 'VIC', 'TAS', 'SA', 'ACT'],
  },
  {
    scientific: "Ornithorhynchus anatinus",
    category: 'mammifere', rarity: 'rare', emoji: "🦫",
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
  },
  {
    scientific: "Tachyglossus aculeatus",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🦔",
    states: ALL,
  },
  {
    scientific: "Sarcophilus harrisii",
    category: 'mammifere', rarity: 'rare', emoji: "😈",
    states: ['TAS'],
  },
  {
    scientific: "Canis dingo",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🐕",
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
  },
  {
    scientific: "Trichosurus vulpecula",
    category: 'mammifere', rarity: 'commun', emoji: "🐿️",
    states: ALL,
  },
  {
    scientific: "Pseudocheirus peregrinus",
    category: 'mammifere', rarity: 'commun', emoji: "🐿️",
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
  },
  {
    scientific: "Petaurus breviceps",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🐿️",
    states: ALL,
  },
  {
    scientific: "Myrmecobius fasciatus",
    category: 'mammifere', rarity: 'legendaire', emoji: "🐾",
    states: ['WA', 'SA'],
  },
  {
    scientific: "Macrotis lagotis",
    category: 'mammifere', rarity: 'legendaire', emoji: "🐰",
    states: ['WA', 'NT', 'QLD'],
  },
  {
    scientific: "Dasyurus maculatus",
    category: 'mammifere', rarity: 'rare', emoji: "🐆",
    states: ['QLD', 'NSW', 'VIC', 'TAS'],
  },
  {
    scientific: "Perameles nasuta",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🐀",
    states: ['QLD', 'NSW', 'VIC'],
  },
  {
    scientific: "Pteropus poliocephalus",
    category: 'mammifere', rarity: 'commun', emoji: "🦇",
    states: ['QLD', 'NSW', 'VIC', 'SA', 'ACT'],
  },
  {
    scientific: "Petrogale xanthopus",
    category: 'mammifere', rarity: 'rare', emoji: "🦘",
    states: ['SA', 'NSW', 'QLD'],
  },
  {
    scientific: "Thylogale billardierii",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🦘",
    states: ['TAS'],
  },
  {
    scientific: "Dendrolagus lumholtzi",
    category: 'mammifere', rarity: 'legendaire', emoji: "🦘",
    states: ['QLD'],
  },
  {
    scientific: "Oryctolagus cuniculus",
    category: 'mammifere', rarity: 'commun', emoji: "🐇",
    states: ALL,
    introduced: true,
  },
  {
    scientific: "Vulpes vulpes",
    category: 'mammifere', rarity: 'commun', emoji: "🦊",
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
    introduced: true,
  },
  {
    scientific: "Camelus dromedarius",
    category: 'mammifere', rarity: 'rare', emoji: "🐫",
    states: ['WA', 'SA', 'NT', 'QLD'],
    introduced: true,
  },
  // ───────────── Oiseaux ─────────────
  {
    scientific: "Dromaius novaehollandiae",
    category: 'oiseau', rarity: 'commun', emoji: "🐦",
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
  },
  {
    scientific: "Casuarius casuarius",
    category: 'oiseau', rarity: 'legendaire', emoji: "🦤",
    states: ['QLD'],
    dangerous: true,
  },
  {
    scientific: "Dacelo novaeguineae",
    category: 'oiseau', rarity: 'commun', emoji: "🐦",
    states: ['QLD', 'NSW', 'VIC', 'SA', 'TAS', 'ACT', 'WA'],
  },
  {
    scientific: "Cacatua galerita",
    category: 'oiseau', rarity: 'commun', emoji: "🦜",
    states: ALL,
  },
  {
    scientific: "Eolophus roseicapilla",
    category: 'oiseau', rarity: 'commun', emoji: "🦜",
    states: ALL,
  },
  {
    scientific: "Trichoglossus moluccanus",
    category: 'oiseau', rarity: 'commun', emoji: "🦜",
    states: ['QLD', 'NSW', 'VIC', 'SA', 'TAS', 'ACT'],
  },
  {
    scientific: "Melopsittacus undulatus",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🦜",
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
  },
  {
    scientific: "Nymphicus hollandicus",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🦜",
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
  },
  {
    scientific: "Calyptorhynchus banksii",
    category: 'oiseau', rarity: 'rare', emoji: "🐦‍⬛",
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
  },
  {
    scientific: "Lophochroa leadbeateri",
    category: 'oiseau', rarity: 'rare', emoji: "🦜",
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT'],
  },
  {
    scientific: "Menura novaehollandiae",
    category: 'oiseau', rarity: 'rare', emoji: "🐦",
    states: ['VIC', 'NSW', 'QLD', 'ACT', 'TAS'],
  },
  {
    scientific: "Gymnorhina tibicen",
    category: 'oiseau', rarity: 'commun', emoji: "🐦‍⬛",
    states: ALL,
  },
  {
    scientific: "Threskiornis molucca",
    category: 'oiseau', rarity: 'commun', emoji: "🦩",
    states: ['QLD', 'NSW', 'VIC', 'SA', 'NT', 'WA', 'ACT'],
  },
  {
    scientific: "Pelecanus conspicillatus",
    category: 'oiseau', rarity: 'commun', emoji: "🐦",
    states: ALL,
  },
  {
    scientific: "Cygnus atratus",
    category: 'oiseau', rarity: 'commun', emoji: "🦢",
    states: ALL,
  },
  {
    scientific: "Eudyptula minor",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🐧",
    states: ['NSW', 'VIC', 'TAS', 'SA', 'WA'],
  },
  {
    scientific: "Malurus cyaneus",
    category: 'oiseau', rarity: 'commun', emoji: "🐦",
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
  },
  {
    scientific: "Aquila audax",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🦅",
    states: ALL,
  },
  {
    scientific: "Haliaeetus leucogaster",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🦅",
    states: ALL,
  },
  {
    scientific: "Podargus strigoides",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🦉",
    states: ALL,
  },
  {
    scientific: "Ninox boobook",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🦉",
    states: ALL,
  },
  {
    scientific: "Ninox strenua",
    category: 'oiseau', rarity: 'rare', emoji: "🦉",
    states: ['QLD', 'NSW', 'VIC', 'ACT'],
  },
  {
    scientific: "Antigone rubicunda",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🦩",
    states: ['QLD', 'NT', 'WA', 'NSW', 'VIC'],
  },
  {
    scientific: "Ephippiorhynchus asiaticus",
    category: 'oiseau', rarity: 'rare', emoji: "🦩",
    states: ['QLD', 'NT', 'WA', 'NSW'],
  },
  {
    scientific: "Manorina melanocephala",
    category: 'oiseau', rarity: 'commun', emoji: "🐦",
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
  },
  {
    scientific: "Ptilonorhynchus violaceus",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🐦‍⬛",
    states: ['QLD', 'NSW', 'VIC', 'ACT'],
  },
  {
    scientific: "Alectura lathami",
    category: 'oiseau', rarity: 'commun', emoji: "🦃",
    states: ['QLD', 'NSW'],
  },
  {
    scientific: "Chloebia gouldiae",
    category: 'oiseau', rarity: 'legendaire', emoji: "🐦",
    states: ['WA', 'NT', 'QLD'],
  },
  {
    scientific: "Pardalotus punctatus",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🐦",
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'WA', 'ACT'],
  },
  {
    scientific: "Rhipidura leucophrys",
    category: 'oiseau', rarity: 'commun', emoji: "🐦‍⬛",
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
  },
  {
    scientific: "Alisterus scapularis",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🦜",
    states: ['QLD', 'NSW', 'VIC', 'ACT'],
  },
  {
    scientific: "Platycercus elegans",
    category: 'oiseau', rarity: 'commun', emoji: "🦜",
    states: ['QLD', 'NSW', 'VIC', 'SA', 'ACT'],
  },
  // ───────────── Reptiles ─────────────
  {
    scientific: "Crocodylus porosus",
    category: 'reptile', rarity: 'rare', emoji: "🐊",
    states: ['QLD', 'NT', 'WA'],
    dangerous: true,
  },
  {
    scientific: "Crocodylus johnstoni",
    category: 'reptile', rarity: 'peu-commun', emoji: "🐊",
    states: ['QLD', 'NT', 'WA'],
  },
  {
    scientific: "Chlamydosaurus kingii",
    category: 'reptile', rarity: 'rare', emoji: "🦎",
    states: ['QLD', 'NT', 'WA'],
  },
  {
    scientific: "Moloch horridus",
    category: 'reptile', rarity: 'legendaire', emoji: "🦎",
    states: ['WA', 'SA', 'NT', 'QLD'],
  },
  {
    scientific: "Tiliqua scincoides",
    category: 'reptile', rarity: 'commun', emoji: "🦎",
    states: ['QLD', 'NSW', 'VIC', 'SA', 'NT', 'WA', 'ACT'],
  },
  {
    scientific: "Tiliqua rugosa",
    category: 'reptile', rarity: 'peu-commun', emoji: "🦎",
    states: ['WA', 'SA', 'NSW', 'VIC', 'QLD'],
  },
  {
    scientific: "Pogona vitticeps",
    category: 'reptile', rarity: 'peu-commun', emoji: "🦎",
    states: ['QLD', 'NSW', 'VIC', 'SA', 'NT'],
  },
  {
    scientific: "Intellagama lesueurii",
    category: 'reptile', rarity: 'commun', emoji: "🦎",
    states: ['QLD', 'NSW', 'VIC', 'ACT'],
  },
  {
    scientific: "Varanus varius",
    category: 'reptile', rarity: 'peu-commun', emoji: "🦎",
    states: ['QLD', 'NSW', 'VIC', 'SA', 'ACT'],
  },
  {
    scientific: "Varanus giganteus",
    category: 'reptile', rarity: 'rare', emoji: "🦎",
    states: ['WA', 'SA', 'NT', 'QLD'],
  },
  {
    scientific: "Saltuarius cornutus",
    category: 'reptile', rarity: 'rare', emoji: "🦎",
    states: ['QLD'],
  },
  {
    scientific: "Oxyuranus microlepidotus",
    category: 'reptile', rarity: 'legendaire', emoji: "🐍",
    states: ['QLD', 'SA'],
    dangerous: true,
  },
  {
    scientific: "Pseudonaja textilis",
    category: 'reptile', rarity: 'peu-commun', emoji: "🐍",
    states: ['QLD', 'NSW', 'VIC', 'SA', 'NT', 'ACT'],
    dangerous: true,
  },
  {
    scientific: "Pseudechis porphyriacus",
    category: 'reptile', rarity: 'peu-commun', emoji: "🐍",
    states: ['QLD', 'NSW', 'VIC', 'SA', 'ACT'],
    dangerous: true,
  },
  {
    scientific: "Morelia spilota",
    category: 'reptile', rarity: 'peu-commun', emoji: "🐍",
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
  },
  {
    scientific: "Chelodina longicollis",
    category: 'reptile', rarity: 'peu-commun', emoji: "🐢",
    states: ['QLD', 'NSW', 'VIC', 'SA', 'ACT'],
  },
  // ───────────── Amphibiens ─────────────
  {
    scientific: "Ranoides caerulea",
    category: 'amphibien', rarity: 'commun', emoji: "🐸",
    states: ['QLD', 'NSW', 'NT', 'WA', 'SA'],
  },
  {
    scientific: "Litoria chloris",
    category: 'amphibien', rarity: 'peu-commun', emoji: "🐸",
    states: ['QLD', 'NSW'],
  },
  {
    scientific: "Limnodynastes peronii",
    category: 'amphibien', rarity: 'commun', emoji: "🐸",
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
  },
  {
    scientific: "Pseudophryne corroboree",
    category: 'amphibien', rarity: 'legendaire', emoji: "🐸",
    states: ['NSW', 'ACT'],
  },
  {
    scientific: "Rhinella marina",
    category: 'amphibien', rarity: 'commun', emoji: "🐸",
    states: ['QLD', 'NSW', 'NT', 'WA'],
    introduced: true,
    dangerous: true,
  },
  // ───────────── Vie marine ─────────────
  {
    scientific: "Carcharodon carcharias",
    category: 'marin', rarity: 'legendaire', emoji: "🦈",
    states: ['NSW', 'VIC', 'TAS', 'SA', 'WA', 'QLD'],
    dangerous: true,
  },
  {
    scientific: "Rhincodon typus",
    category: 'marin', rarity: 'legendaire', emoji: "🦈",
    states: ['WA', 'QLD', 'NT'],
  },
  {
    scientific: "Megaptera novaeangliae",
    category: 'marin', rarity: 'rare', emoji: "🐋",
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'WA', 'NT'],
  },
  {
    scientific: "Tursiops aduncus",
    category: 'marin', rarity: 'peu-commun', emoji: "🐬",
    states: ALL,
  },
  {
    scientific: "Dugong dugon",
    category: 'marin', rarity: 'rare', emoji: "🐄",
    states: ['QLD', 'NT', 'WA'],
  },
  {
    scientific: "Chelonia mydas",
    category: 'marin', rarity: 'peu-commun', emoji: "🐢",
    states: ['QLD', 'NT', 'WA', 'NSW'],
  },
  {
    scientific: "Arctocephalus pusillus doriferus",
    category: 'marin', rarity: 'peu-commun', emoji: "🦭",
    states: ['VIC', 'TAS', 'NSW', 'SA'],
  },
  {
    scientific: "Neophoca cinerea",
    category: 'marin', rarity: 'rare', emoji: "🦭",
    states: ['SA', 'WA'],
  },
  {
    scientific: "Phycodurus eques",
    category: 'marin', rarity: 'legendaire', emoji: "🐉",
    states: ['SA', 'WA', 'VIC'],
  },
  {
    scientific: "Amphiprion percula",
    category: 'marin', rarity: 'peu-commun', emoji: "🐠",
    states: ['QLD'],
  },
  {
    scientific: "Cheilinus undulatus",
    category: 'marin', rarity: 'rare', emoji: "🐟",
    states: ['QLD', 'WA'],
  },
  {
    scientific: "Mobula alfredi",
    category: 'marin', rarity: 'rare', emoji: "🐟",
    states: ['QLD', 'WA'],
  },
  {
    scientific: "Sepia apama",
    category: 'marin', rarity: 'rare', emoji: "🦑",
    states: ['SA', 'WA', 'VIC', 'TAS', 'NSW', 'QLD'],
  },
  {
    scientific: "Hapalochlaena maculosa",
    category: 'marin', rarity: 'rare', emoji: "🐙",
    states: ['NSW', 'VIC', 'TAS', 'SA', 'WA'],
    dangerous: true,
  },
  {
    scientific: "Chironex fleckeri",
    category: 'marin', rarity: 'rare', emoji: "🪼",
    states: ['QLD', 'NT', 'WA'],
    dangerous: true,
  },
  {
    scientific: "Mictyris longicarpus",
    category: 'marin', rarity: 'commun', emoji: "🦀",
    states: ['QLD', 'NSW'],
  },
  // ───────────── Invertébrés ─────────────
  {
    scientific: "Atrax robustus",
    category: 'arachnide', rarity: 'rare', emoji: "🕷️",
    states: ['NSW'],
    dangerous: true,
  },
  {
    scientific: "Latrodectus hasselti",
    category: 'arachnide', rarity: 'commun', emoji: "🕷️",
    states: ALL,
    dangerous: true,
  },
  {
    scientific: "Holconia immanis",
    category: 'arachnide', rarity: 'commun', emoji: "🕷️",
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
  },
  {
    scientific: "Papilio ulysses",
    category: 'insecte', rarity: 'rare', emoji: "🦋",
    states: ['QLD'],
  },
  {
    scientific: "Extatosoma tiaratum",
    category: 'insecte', rarity: 'peu-commun', emoji: "🦗",
    states: ['QLD', 'NSW'],
  },
  {
    scientific: "Dryococelus australis",
    category: 'insecte', rarity: 'legendaire', emoji: "🦗",
    states: ['NSW'],
  },
  {
    scientific: "Myrmecia gulosa",
    category: 'insecte', rarity: 'commun', emoji: "🐜",
    states: ['QLD', 'NSW', 'VIC', 'ACT'],
    dangerous: true,
  },
  {
    scientific: "Cyclochila australasiae",
    category: 'insecte', rarity: 'commun', emoji: "🦗",
    states: ['QLD', 'NSW', 'VIC', 'SA', 'ACT'],
  },
  {
    scientific: "Amegilla cingulata",
    category: 'insecte', rarity: 'peu-commun', emoji: "🐝",
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'ACT'],
  },
  {
    scientific: "Arachnocampa richardsae",
    category: 'insecte', rarity: 'rare', emoji: "✨",
    states: ['NSW', 'QLD'],
  },
  {
    scientific: "Cherax destructor",
    category: 'invertebre', rarity: 'peu-commun', emoji: "🦞",
    states: ['NSW', 'VIC', 'QLD', 'SA', 'NT', 'ACT'],
  },
  // ───────────── Nouvelles espèces (#106 à #151) ─────────────
  {
    scientific: "Wallabia bicolor",
    category: 'mammifere', rarity: 'commun', emoji: "🦘",
    states: ['QLD', 'NSW', 'VIC', 'SA', 'ACT'],
  },
  {
    scientific: "Felis catus",
    category: 'mammifere', rarity: 'commun', emoji: "🐈",
    states: ALL,
    introduced: true,
  },
  {
    scientific: "Vespula germanica",
    category: 'insecte', rarity: 'commun', emoji: "🐝",
    states: ['NSW', 'VIC', 'TAS', 'SA', 'WA', 'ACT'],
    introduced: true,
  },
  {
    scientific: "Haematopus longirostris",
    category: 'oiseau', rarity: 'commun', emoji: "🐦",
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT'],
  },
  {
    scientific: "Ardenna tenuirostris",
    category: 'oiseau', rarity: 'commun', emoji: "🐦",
    states: ['NSW', 'VIC', 'TAS', 'SA'],
  },
  {
    scientific: "Crinia signifera",
    category: 'amphibien', rarity: 'commun', emoji: "🐸",
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
  },
  {
    scientific: "Trichonephila edulis",
    category: 'arachnide', rarity: 'commun', emoji: "🕷️",
    states: ['QLD', 'NSW', 'VIC', 'WA', 'SA', 'NT', 'ACT'],
  },
  {
    scientific: "Badumna insignis",
    category: 'arachnide', rarity: 'commun', emoji: "🕷️",
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'WA', 'ACT'],
  },
  {
    scientific: "Anoplognathus",
    category: 'insecte', rarity: 'commun', emoji: "🪲",
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
  },
  {
    scientific: "Heterodontus portusjacksoni",
    category: 'marin', rarity: 'commun', emoji: "🦈",
    states: ['NSW', 'VIC', 'TAS', 'SA', 'WA', 'QLD'],
  },
  {
    scientific: "Asterias amurensis",
    category: 'marin', rarity: 'commun', emoji: "⭐",
    states: ['VIC', 'TAS'],
    introduced: true,
  },
  {
    scientific: "Cereopsis novaehollandiae",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🪿",
    states: ['VIC', 'TAS', 'SA', 'WA'],
  },
  {
    scientific: "Morus serrator",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🐦",
    states: ['NSW', 'VIC', 'TAS', 'SA', 'WA'],
  },
  {
    scientific: "Zanda funerea",
    category: 'oiseau', rarity: 'peu-commun', emoji: "🐦‍⬛",
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'ACT'],
  },
  {
    scientific: "Hydromys chrysogaster",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🐀",
    states: ALL,
  },
  {
    scientific: "Rusa unicolor",
    category: 'mammifere', rarity: 'peu-commun', emoji: "🦌",
    states: ['VIC', 'NSW', 'QLD', 'SA', 'ACT'],
    introduced: true,
  },
  {
    scientific: "Tiliqua nigrolutea",
    category: 'reptile', rarity: 'peu-commun', emoji: "🦎",
    states: ['NSW', 'VIC', 'TAS', 'SA', 'ACT'],
  },
  {
    scientific: "Notechis scutatus",
    category: 'reptile', rarity: 'peu-commun', emoji: "🐍",
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS'],
    dangerous: true,
  },
  {
    scientific: "Austrelaps superbus",
    category: 'reptile', rarity: 'peu-commun', emoji: "🐍",
    states: ['NSW', 'VIC', 'TAS', 'SA'],
    dangerous: true,
  },
  {
    scientific: "Phyllopteryx taeniolatus",
    category: 'marin', rarity: 'peu-commun', emoji: "🐉",
    states: ['NSW', 'VIC', 'TAS', 'SA', 'WA'],
  },
  {
    scientific: "Maratus volans",
    category: 'arachnide', rarity: 'peu-commun', emoji: "🕷️",
    states: ['QLD', 'NSW', 'VIC', 'ACT'],
  },
  {
    scientific: "Agrotis infusa",
    category: 'insecte', rarity: 'peu-commun', emoji: "🦋",
    states: ['QLD', 'NSW', 'VIC', 'SA', 'TAS', 'ACT'],
  },
  {
    scientific: "Maccullochella peelii",
    category: 'marin', rarity: 'peu-commun', emoji: "🐟",
    states: ['QLD', 'NSW', 'VIC', 'SA', 'ACT'],
  },
  {
    scientific: "Callocephalon fimbriatum",
    category: 'oiseau', rarity: 'rare', emoji: "🦜",
    states: ['NSW', 'VIC', 'ACT'],
  },
  {
    scientific: "Thinornis cucullatus",
    category: 'oiseau', rarity: 'rare', emoji: "🐦",
    states: ['NSW', 'VIC', 'TAS', 'SA', 'WA'],
  },
  {
    scientific: "Leipoa ocellata",
    category: 'oiseau', rarity: 'rare', emoji: "🦃",
    states: ['NSW', 'VIC', 'WA', 'SA'],
  },
  {
    scientific: "Petauroides volans",
    category: 'mammifere', rarity: 'rare', emoji: "🐿️",
    states: ['QLD', 'NSW', 'VIC', 'ACT'],
  },
  {
    scientific: "Potorous tridactylus",
    category: 'mammifere', rarity: 'rare', emoji: "🐀",
    states: ['QLD', 'NSW', 'VIC', 'TAS'],
  },
  {
    scientific: "Perameles gunnii",
    category: 'mammifere', rarity: 'rare', emoji: "🐀",
    states: ['VIC', 'TAS'],
  },
  {
    scientific: "Miniopterus orianae bassanii",
    category: 'mammifere', rarity: 'rare', emoji: "🦇",
    states: ['VIC', 'SA'],
  },
  {
    scientific: "Litoria raniformis",
    category: 'amphibien', rarity: 'rare', emoji: "🐸",
    states: ['NSW', 'VIC', 'TAS', 'SA', 'ACT'],
  },
  {
    scientific: "Eubalaena australis",
    category: 'marin', rarity: 'rare', emoji: "🐋",
    states: ['NSW', 'VIC', 'TAS', 'SA', 'WA'],
  },
  {
    scientific: "Tursiops australis",
    category: 'marin', rarity: 'rare', emoji: "🐬",
    states: ['VIC', 'SA', 'TAS'],
  },
  {
    scientific: "Dermochelys coriacea",
    category: 'marin', rarity: 'rare', emoji: "🐢",
    states: ['QLD', 'NSW', 'VIC', 'TAS', 'SA', 'WA', 'NT'],
  },
  {
    scientific: "Synemon plana",
    category: 'insecte', rarity: 'rare', emoji: "🦋",
    states: ['NSW', 'VIC', 'ACT'],
  },
  {
    scientific: "Paralucia pyrodiscus lucida",
    category: 'insecte', rarity: 'rare', emoji: "🦋",
    states: ['VIC'],
  },
  {
    scientific: "Burramys parvus",
    category: 'mammifere', rarity: 'legendaire', emoji: "🐭",
    states: ['NSW', 'VIC'],
  },
  {
    scientific: "Gymnobelideus leadbeateri",
    category: 'mammifere', rarity: 'legendaire', emoji: "🐿️",
    states: ['VIC'],
  },
  {
    scientific: "Lichenostomus melanops cassidix",
    category: 'oiseau', rarity: 'legendaire', emoji: "🐦",
    states: ['VIC'],
  },
  {
    scientific: "Neophema chrysogaster",
    category: 'oiseau', rarity: 'legendaire', emoji: "🦜",
    states: ['TAS', 'VIC', 'SA'],
  },
  {
    scientific: "Anthochaera phrygia",
    category: 'oiseau', rarity: 'legendaire', emoji: "🐦",
    states: ['QLD', 'NSW', 'VIC', 'ACT'],
  },
  {
    scientific: "Philoria frosti",
    category: 'amphibien', rarity: 'legendaire', emoji: "🐸",
    states: ['VIC'],
  },
  {
    scientific: "Tympanocryptis pinguicolla",
    category: 'reptile', rarity: 'legendaire', emoji: "🦎",
    states: ['VIC'],
  },
  {
    scientific: "Pedionomus torquatus",
    category: 'oiseau', rarity: 'legendaire', emoji: "🐦",
    states: ['NSW', 'VIC', 'QLD', 'SA', 'NT'],
  },
  {
    scientific: "Megascolides australis",
    category: 'invertebre', rarity: 'legendaire', emoji: "🪱",
    states: ['VIC'],
  },
  {
    scientific: "Pezoporus occidentalis",
    category: 'oiseau', rarity: 'legendaire', emoji: "🦜",
    states: ['WA', 'QLD', 'SA', 'NT'],
  },
];

function text(id: number, key: keyof SpeciesText): Localized {
  const t = localized((c) => c.species[id]?.[key]);
  if (!t) throw new Error(`Texte « ${key} » manquant pour l'espèce ${id} (src/i18n/fr/content.ts)`);
  return t;
}

export const ANIMALS: Animal[] = RAW.map((raw, index) => {
  const id = index + 1;
  return { ...raw, id, name: text(id, 'name'), habitat: text(id, 'habitat'), description: text(id, 'description'), funFact: text(id, 'funFact') };
});

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
