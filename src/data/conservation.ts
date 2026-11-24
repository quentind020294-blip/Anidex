import { ANIMALS } from './animals';
import type { Animal, Localized } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Conservation des 151 espèces.
//
// Sources (vérifiées en novembre 2026) :
// - UICN : catégorie de la Liste rouge mondiale, lue via l'API GBIF (jeu de données
//   « IUCN Red List »), recoupée avec BirdLife / communiqués de l'UICN pour les cas douteux.
// - EPBC : liste nationale (Environment Protection and Biodiversity Conservation Act 1999),
//   copie officielle publiée par l'Atlas of Living Australia (liste dr656, mai 2026).
// - Victoria : liste du Flora and Fauna Guarantee Act 1988 (DEECA), copie de l'Atlas of
//   Living Australia (liste dr655, mai 2026).
// - Tendance de population : ESTIMATION non vérifiée (le site et l'API de l'UICN n'étaient
//   pas accessibles). L'interface l'indique clairement.
// - Menaces, gestes utiles et programmes : synthèse rédigée ; programmes cités seulement
//   quand ils sont bien établis.
// ─────────────────────────────────────────────────────────────────────────────

export const SOURCES_DATE = '2026-11';

export type IucnStatus = 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'DD' | 'NE';
/** Catégories des lois australiennes (EPBC, FFG). TH = « menacé » (ancienne catégorie générale). */
export type AuStatus = 'CR' | 'EN' | 'VU' | 'CD' | 'TH' | 'EW' | 'EX';
export type Trend = 'up' | 'stable' | 'down' | 'unknown';

export type ThreatCode =
  | 'cats_foxes' | 'fire' | 'habitat' | 'roads' | 'climate' | 'disease' | 'pollution' | 'drought' | 'dogs'
  | 'fishing' | 'plastic' | 'disturbance' | 'water' | 'invasive' | 'persecution' | 'trade' | 'cane_toads'
  | 'coastal' | 'ocean_warming' | 'pesticides' | 'light' | 'small_pop' | 'boat_strikes' | 'competition';

export type ActionCode =
  | 'slow_down' | 'cat_indoors' | 'no_feeding' | 'report_injured' | 'dogs_leash' | 'plant_natives' | 'no_litter'
  | 'keep_distance' | 'citizen_science' | 'report_invasive' | 'no_release' | 'check_pouch' | 'fire_safe'
  | 'leave_logs' | 'responsible_fishing' | 'boat_care' | 'reduce_chemicals' | 'support_program' | 'clean_gear'
  | 'water_wise' | 'respect_closures';

export interface Listing {
  status: AuStatus;
  /** Ce qui est réellement inscrit (sous-espèce, population…). */
  scope?: Localized;
  /** true si l'inscription ne concerne qu'une partie de l'espèce. */
  partial?: boolean;
}

export interface ConservationInfo {
  iucn: IucnStatus;
  iucnNote?: Localized;
  epbc?: Listing;
  vic?: Listing;
  trend: Trend;
  threats: ThreatCode[];
  actions: ActionCode[];
  programs?: Localized;
  /** Impact d'une espèce introduite / envahissante. */
  impact?: Localized;
}

export const CONSERVATION_INFO: Record<number, ConservationInfo> = {
  1: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['drought', 'roads'],
    actions: ['slow_down', 'check_pouch', 'report_injured'],
  },
  2: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['roads', 'habitat'],
    actions: ['slow_down', 'check_pouch', 'report_injured'],
  },
  3: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['roads', 'dogs'],
    actions: ['slow_down', 'check_pouch', 'dogs_leash'],
  },
  4: {
    iucn: 'LC',
    epbc: { status: 'VU', scope: { fr: "Sous-espèce de l’île Barrow (Australie-Occidentale) uniquement", en: "Barrow Island subspecies (WA) only" }, partial: true },
    vic: { status: 'EN', scope: { fr: "Sous-espèce de l’Est, celle qui vit en Victoria", en: "Eastern subspecies, the one found in Victoria" } },
    trend: 'stable',
    threats: ['drought', 'habitat'],
    actions: ['slow_down', 'check_pouch'],
  },
  5: {
    iucn: 'VU',
    epbc: { status: 'VU' },
    trend: 'down',
    threats: ['cats_foxes', 'fire', 'habitat', 'climate'],
    actions: ['no_feeding', 'keep_distance', 'fire_safe'],
  },
  6: {
    iucn: 'VU',
    epbc: { status: 'EN', scope: { fr: "Populations du Queensland, de NSW et de l’ACT ; non inscrit en Victoria ni en Australie-Méridionale", en: "Queensland, NSW and ACT populations; not listed in Victoria or South Australia" }, partial: true },
    trend: 'down',
    threats: ['habitat', 'fire', 'roads', 'dogs', 'disease', 'climate'],
    actions: ['slow_down', 'dogs_leash', 'plant_natives', 'report_injured', 'citizen_science'],
    programs: { fr: "Stratégie et plan national de rétablissement du koala (gouvernement australien)", en: "National Recovery Plan for the Koala (Australian Government)" },
  },
  7: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['roads', 'disease'],
    actions: ['slow_down', 'check_pouch', 'report_injured'],
  },
  8: {
    iucn: 'NT',
    vic: { status: 'VU' },
    trend: 'down',
    threats: ['water', 'drought', 'pollution', 'plastic', 'fishing'],
    actions: ['no_litter', 'water_wise', 'citizen_science', 'report_injured'],
  },
  9: {
    iucn: 'LC',
    epbc: { status: 'EN', scope: { fr: "Sous-espèce de Kangaroo Island uniquement", en: "Kangaroo Island subspecies only" }, partial: true },
    trend: 'stable',
    threats: ['roads', 'cats_foxes', 'habitat'],
    actions: ['slow_down', 'leave_logs', 'report_injured', 'dogs_leash'],
  },
  10: {
    iucn: 'EN',
    epbc: { status: 'EN' },
    trend: 'down',
    threats: ['disease', 'roads'],
    actions: ['slow_down', 'report_injured', 'support_program'],
    programs: { fr: "Save the Tasmanian Devil Program (gouvernement de Tasmanie)", en: "Save the Tasmanian Devil Program (Tasmanian Government)" },
  },
  11: {
    iucn: 'NE',
    iucnNote: { fr: "L’UICN n’évalue pas le dingo séparément du chien domestique.", en: "The IUCN does not assess the dingo separately from the domestic dog." },
    trend: 'unknown',
    threats: ['persecution', 'roads'],
    actions: ['no_feeding', 'keep_distance'],
  },
  12: {
    iucn: 'LC',
    epbc: { status: 'VU', scope: { fr: "Sous-espèce du nord (Territoire du Nord) uniquement", en: "Northern subspecies (Northern Territory) only" }, partial: true },
    trend: 'stable',
    threats: ['roads', 'habitat'],
    actions: ['no_feeding', 'slow_down', 'report_injured'],
  },
  13: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['cats_foxes', 'roads', 'habitat'],
    actions: ['cat_indoors', 'plant_natives', 'report_injured'],
  },
  14: {
    iucn: 'LC',
    trend: 'unknown',
    threats: ['habitat', 'cats_foxes', 'fire'],
    actions: ['cat_indoors', 'leave_logs', 'plant_natives'],
  },
  15: {
    iucn: 'NT',
    iucnNote: { fr: "Déclassé de « En danger » à « Quasi menacé » en juillet 2026 grâce aux réintroductions.", en: "Downlisted from Endangered to Near Threatened in July 2026 thanks to reintroductions." },
    epbc: { status: 'EN' },
    trend: 'up',
    threats: ['cats_foxes', 'fire', 'habitat'],
    actions: ['cat_indoors', 'support_program', 'fire_safe'],
    programs: { fr: "Plan national de rétablissement du numbat ; populations réintroduites dans des enclos sans prédateurs", en: "National Numbat Recovery Plan; populations reintroduced into predator-free sanctuaries" },
  },
  16: {
    iucn: 'VU',
    epbc: { status: 'VU' },
    trend: 'down',
    threats: ['cats_foxes', 'fire', 'invasive'],
    actions: ['support_program', 'cat_indoors'],
    programs: { fr: "Plan national de rétablissement du grand bilby ; enclos sans prédateurs", en: "National Recovery Plan for the Greater Bilby; predator-free sanctuaries" },
  },
  17: {
    iucn: 'NT',
    epbc: { status: 'EN', scope: { fr: "Sud-est continental et nord du Queensland : en danger ; Tasmanie : vulnérable", en: "South-eastern mainland and north Queensland: Endangered; Tasmania: Vulnerable" } },
    vic: { status: 'EN' },
    trend: 'down',
    threats: ['habitat', 'cats_foxes', 'roads', 'persecution', 'fire'],
    actions: ['slow_down', 'leave_logs', 'report_injured', 'citizen_science'],
    programs: { fr: "Plan national de rétablissement du quoll tacheté", en: "National Recovery Plan for the Spotted-tailed Quoll" },
  },
  18: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['cats_foxes', 'dogs', 'roads'],
    actions: ['cat_indoors', 'dogs_leash', 'plant_natives'],
  },
  19: {
    iucn: 'VU',
    epbc: { status: 'VU' },
    vic: { status: 'VU' },
    trend: 'down',
    threats: ['climate', 'habitat', 'persecution', 'pollution'],
    actions: ['plant_natives', 'report_injured', 'keep_distance'],
  },
  20: {
    iucn: 'NT',
    epbc: { status: 'VU', scope: { fr: "Les deux sous-espèces", en: "Both subspecies" } },
    trend: 'stable',
    threats: ['cats_foxes', 'invasive', 'drought'],
    actions: ['keep_distance', 'support_program'],
  },
  21: {
    iucn: 'LC',
    vic: { status: 'TH', scope: { fr: "Inscrit sur la liste de Victoria, où l’espèce ne vit plus", en: "Listed in Victoria, where the species no longer occurs" }, partial: true },
    trend: 'stable',
    threats: ['roads', 'habitat'],
    actions: ['slow_down', 'check_pouch', 'dogs_leash'],
  },
  22: {
    iucn: 'NT',
    trend: 'down',
    threats: ['habitat', 'roads', 'dogs', 'climate'],
    actions: ['slow_down', 'dogs_leash', 'citizen_science'],
  },
  23: {
    iucn: 'EN',
    iucnNote: { fr: "Statut mondial lié au déclin dans son aire d’origine (péninsule Ibérique). En Australie, c’est une espèce envahissante.", en: "Global status reflects declines in its native range (Iberian Peninsula). In Australia it is an invasive pest." },
    trend: 'unknown',
    threats: [],
    actions: ['report_invasive', 'no_release'],
    impact: { fr: "Les lapins broutent la végétation native, empêchent les arbres de repousser, aggravent l’érosion et entretiennent des populations de renards et de chats.", en: "Rabbits strip native vegetation, stop trees from regenerating, worsen erosion and help sustain populations of foxes and cats." },
  },
  24: {
    iucn: 'LC',
    trend: 'unknown',
    threats: [],
    actions: ['report_invasive', 'cat_indoors'],
    impact: { fr: "Le renard a contribué à l’extinction de plusieurs petits mammifères et menace oiseaux nichant au sol, tortues et manchots.", en: "Foxes have helped drive several small mammals to extinction and threaten ground-nesting birds, turtles and penguins." },
  },
  25: {
    iucn: 'NE',
    iucnNote: { fr: "Espèce domestique : l’UICN n’évalue pas le dromadaire.", en: "A domesticated species: the IUCN does not assess the dromedary." },
    trend: 'unknown',
    threats: [],
    actions: ['report_invasive', 'keep_distance'],
    impact: { fr: "Les dromadaires piétinent les points d’eau du désert, détruisent la végétation et abîment des sites culturels aborigènes.", en: "Camels trample desert waterholes, destroy vegetation and damage Aboriginal cultural sites." },
  },
  26: {
    iucn: 'LC',
    epbc: { status: 'EX', scope: { fr: "Seule la sous-espèce de Tasmanie est inscrite, comme éteinte", en: "Only the Tasmanian subspecies is listed, as extinct" }, partial: true },
    trend: 'stable',
    threats: ['roads', 'habitat', 'drought'],
    actions: ['slow_down', 'no_feeding'],
  },
  27: {
    iucn: 'LC',
    epbc: { status: 'EN', scope: { fr: "Population australienne", en: "Australian population" } },
    trend: 'down',
    threats: ['habitat', 'roads', 'dogs', 'climate'],
    actions: ['slow_down', 'no_feeding', 'dogs_leash', 'report_injured'],
    programs: { fr: "Plan national de rétablissement du casoar austral", en: "National Recovery Plan for the Southern Cassowary" },
  },
  28: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['habitat'],
    actions: ['no_feeding', 'leave_logs'],
  },
  29: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['persecution'],
    actions: ['no_feeding', 'leave_logs'],
  },
  30: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['roads'],
    actions: ['no_feeding', 'slow_down'],
  },
  31: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['disease'],
    actions: ['no_feeding', 'plant_natives'],
  },
  32: {
    iucn: 'LC',
    trend: 'unknown',
    threats: ['drought', 'climate'],
    actions: ['water_wise', 'citizen_science'],
  },
  33: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['drought'],
    actions: ['water_wise', 'no_release'],
  },
  34: {
    iucn: 'LC',
    epbc: { status: 'EN', scope: { fr: "Sous-espèces du sud-est (en danger) et des forêts du sud-ouest (vulnérable) uniquement", en: "South-eastern (Endangered) and south-western forest (Vulnerable) subspecies only" }, partial: true },
    vic: { status: 'EN', scope: { fr: "Sous-espèce du sud-est, celle qui vit en Victoria", en: "South-eastern subspecies, the one found in Victoria" } },
    trend: 'unknown',
    threats: ['habitat', 'fire'],
    actions: ['leave_logs', 'plant_natives', 'citizen_science'],
  },
  35: {
    iucn: 'LC',
    iucnNote: { fr: "Classement incertain : selon la taxonomie retenue, l’UICN la classe « Préoccupation mineure » ou ne l’évalue pas séparément.", en: "Uncertain: depending on the taxonomy used, the IUCN lists it as Least Concern or does not assess it separately." },
    epbc: { status: 'EN', scope: { fr: "Sous-espèce de l’Est uniquement", en: "Eastern subspecies only" }, partial: true },
    vic: { status: 'EN' },
    trend: 'down',
    threats: ['habitat', 'trade', 'fire'],
    actions: ['leave_logs', 'citizen_science'],
  },
  36: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['fire', 'cats_foxes', 'climate'],
    actions: ['dogs_leash', 'cat_indoors', 'fire_safe'],
  },
  37: {
    iucn: 'LC',
    trend: 'stable',
    threats: [],
    actions: ['no_feeding', 'keep_distance'],
  },
  38: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['water', 'plastic'],
    actions: ['no_feeding', 'no_litter', 'water_wise'],
  },
  39: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['plastic', 'fishing', 'water'],
    actions: ['no_litter', 'no_feeding', 'report_injured'],
  },
  40: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['water', 'plastic', 'roads'],
    actions: ['no_feeding', 'no_litter', 'water_wise'],
  },
  41: {
    iucn: 'LC',
    trend: 'unknown',
    threats: ['cats_foxes', 'dogs', 'roads', 'coastal', 'plastic', 'ocean_warming'],
    actions: ['dogs_leash', 'slow_down', 'keep_distance', 'no_litter'],
    programs: { fr: "Phillip Island Nature Parks : suivi de la colonie, passages protégés et éradication du renard sur l’île", en: "Phillip Island Nature Parks: colony monitoring, protected crossings and fox eradication on the island" },
  },
  42: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['cats_foxes', 'habitat'],
    actions: ['cat_indoors', 'plant_natives'],
  },
  43: {
    iucn: 'LC',
    epbc: { status: 'EN', scope: { fr: "Sous-espèce de Tasmanie uniquement", en: "Tasmanian subspecies only" }, partial: true },
    trend: 'stable',
    threats: ['roads', 'persecution', 'pesticides'],
    actions: ['reduce_chemicals', 'report_injured'],
  },
  44: {
    iucn: 'LC',
    vic: { status: 'EN' },
    trend: 'down',
    threats: ['disturbance', 'coastal', 'pesticides'],
    actions: ['keep_distance', 'reduce_chemicals', 'no_litter'],
  },
  45: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['roads', 'pesticides', 'cats_foxes'],
    actions: ['slow_down', 'reduce_chemicals', 'cat_indoors'],
  },
  46: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['pesticides', 'roads'],
    actions: ['reduce_chemicals', 'leave_logs'],
  },
  47: {
    iucn: 'LC',
    vic: { status: 'VU' },
    trend: 'down',
    threats: ['habitat', 'fire', 'pesticides'],
    actions: ['leave_logs', 'reduce_chemicals', 'citizen_science'],
  },
  48: {
    iucn: 'LC',
    vic: { status: 'EN' },
    trend: 'down',
    threats: ['water', 'habitat', 'cats_foxes'],
    actions: ['water_wise', 'keep_distance', 'citizen_science'],
  },
  49: {
    iucn: 'NT',
    iucnNote: { fr: "Incertain : BirdLife (qui évalue les oiseaux pour l’UICN) indique « Quasi menacée », GBIF indique « Préoccupation mineure ».", en: "Uncertain: BirdLife (which assesses birds for the IUCN) gives Near Threatened, GBIF gives Least Concern." },
    trend: 'down',
    threats: ['water', 'habitat', 'pollution'],
    actions: ['water_wise', 'no_litter', 'citizen_science'],
  },
  50: {
    iucn: 'LC',
    trend: 'up',
    threats: [],
    actions: ['plant_natives'],
  },
  51: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['habitat'],
    actions: ['plant_natives', 'no_litter'],
  },
  52: {
    iucn: 'LC',
    trend: 'up',
    threats: ['dogs', 'roads'],
    actions: ['no_feeding', 'dogs_leash', 'slow_down'],
  },
  53: {
    iucn: 'LC',
    iucnNote: { fr: "« Préoccupation mineure » au niveau mondial depuis 2022, mais « En danger » selon la loi australienne.", en: "Least Concern globally since 2022, but Endangered under Australian law." },
    epbc: { status: 'EN' },
    trend: 'stable',
    threats: ['fire', 'habitat', 'trade'],
    actions: ['fire_safe', 'citizen_science'],
    programs: { fr: "Plan national de rétablissement du diamant de Gould", en: "National Recovery Plan for the Gouldian Finch" },
  },
  54: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['habitat', 'cats_foxes'],
    actions: ['plant_natives', 'cat_indoors'],
  },
  55: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['cats_foxes'],
    actions: ['cat_indoors', 'plant_natives'],
  },
  56: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['habitat'],
    actions: ['no_feeding', 'plant_natives'],
  },
  57: {
    iucn: 'LC',
    epbc: { status: 'VU', scope: { fr: "Sous-espèce de Kangaroo Island uniquement", en: "Kangaroo Island subspecies only" }, partial: true },
    trend: 'stable',
    threats: ['habitat', 'fire'],
    actions: ['no_feeding', 'plant_natives'],
  },
  58: {
    iucn: 'LC',
    trend: 'up',
    threats: ['fishing', 'persecution'],
    actions: ['keep_distance', 'no_feeding'],
  },
  59: {
    iucn: 'LC',
    trend: 'down',
    threats: ['cane_toads', 'water'],
    actions: ['keep_distance', 'report_invasive'],
  },
  60: {
    iucn: 'LC',
    trend: 'unknown',
    threats: ['cane_toads', 'fire', 'cats_foxes'],
    actions: ['keep_distance', 'fire_safe'],
  },
  61: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['habitat', 'roads'],
    actions: ['slow_down', 'keep_distance'],
  },
  62: {
    iucn: 'LC',
    epbc: { status: 'CR', scope: { fr: "Sous-espèce du nord uniquement", en: "Northern subspecies only" }, partial: true },
    trend: 'stable',
    threats: ['cats_foxes', 'dogs', 'pesticides', 'roads'],
    actions: ['cat_indoors', 'reduce_chemicals', 'leave_logs'],
  },
  63: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['roads', 'habitat', 'trade'],
    actions: ['slow_down', 'leave_logs'],
  },
  64: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['roads', 'habitat', 'trade'],
    actions: ['slow_down', 'cat_indoors'],
  },
  65: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['roads', 'cats_foxes', 'dogs'],
    actions: ['no_feeding', 'dogs_leash'],
  },
  66: {
    iucn: 'LC',
    vic: { status: 'EN' },
    trend: 'down',
    threats: ['roads', 'habitat', 'cane_toads'],
    actions: ['slow_down', 'no_feeding', 'leave_logs'],
  },
  67: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['cane_toads', 'roads'],
    actions: ['slow_down', 'keep_distance'],
  },
  68: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['habitat'],
    actions: ['leave_logs', 'keep_distance'],
  },
  69: {
    iucn: 'LC',
    vic: { status: 'EX', scope: { fr: "Disparu de Victoria", en: "Extinct in Victoria" } },
    trend: 'stable',
    threats: ['habitat'],
    actions: ['keep_distance'],
  },
  70: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['persecution', 'roads'],
    actions: ['keep_distance', 'report_injured'],
  },
  71: {
    iucn: 'LC',
    trend: 'down',
    threats: ['cane_toads', 'persecution', 'water'],
    actions: ['keep_distance', 'report_invasive'],
  },
  72: {
    iucn: 'LC',
    vic: { status: 'EN', scope: { fr: "Carpet python : en danger ; diamond python (est du Gippsland) : en danger critique", en: "Carpet python: Endangered; diamond python (East Gippsland): Critically Endangered" } },
    trend: 'down',
    threats: ['habitat', 'persecution', 'roads', 'cats_foxes'],
    actions: ['keep_distance', 'leave_logs', 'report_injured'],
  },
  73: {
    iucn: 'NE',
    trend: 'down',
    threats: ['roads', 'cats_foxes', 'drought', 'water'],
    actions: ['slow_down', 'water_wise', 'report_injured'],
  },
  74: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['disease', 'habitat', 'pesticides'],
    actions: ['reduce_chemicals', 'clean_gear', 'water_wise'],
  },
  75: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['habitat', 'disease'],
    actions: ['clean_gear', 'water_wise'],
  },
  76: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['pesticides', 'habitat'],
    actions: ['reduce_chemicals', 'water_wise'],
  },
  77: {
    iucn: 'CR',
    epbc: { status: 'CR' },
    trend: 'down',
    threats: ['disease', 'climate', 'fire', 'small_pop'],
    actions: ['clean_gear', 'support_program', 'keep_distance'],
    programs: { fr: "Élevage en captivité et réintroductions (Taronga Zoo, Zoos Victoria, parcs nationaux de NSW)", en: "Captive breeding and reintroductions (Taronga Zoo, Zoos Victoria, NSW National Parks)" },
  },
  78: {
    iucn: 'LC',
    trend: 'unknown',
    threats: [],
    actions: ['report_invasive', 'no_release'],
    impact: { fr: "Toxique de l’œuf à l’adulte, il empoisonne quolls, varans, serpents et crocodiles d’eau douce qui le mangent, et a fait chuter leurs populations dans le nord.", en: "Toxic at every life stage, it poisons quolls, goannas, snakes and freshwater crocodiles that eat it, causing steep declines in the north." },
  },
  79: {
    iucn: 'VU',
    epbc: { status: 'VU' },
    vic: { status: 'EN' },
    trend: 'unknown',
    threats: ['fishing', 'persecution'],
    actions: ['responsible_fishing', 'keep_distance'],
    programs: { fr: "Plan national de rétablissement du requin blanc", en: "National Recovery Plan for the White Shark" },
  },
  80: {
    iucn: 'EN',
    epbc: { status: 'VU' },
    trend: 'down',
    threats: ['fishing', 'boat_strikes', 'plastic'],
    actions: ['boat_care', 'keep_distance', 'no_litter'],
  },
  81: {
    iucn: 'LC',
    trend: 'up',
    threats: ['boat_strikes', 'fishing', 'disturbance'],
    actions: ['boat_care', 'keep_distance'],
  },
  82: {
    iucn: 'NT',
    trend: 'unknown',
    threats: ['fishing', 'pollution', 'disturbance'],
    actions: ['boat_care', 'no_feeding', 'no_litter'],
  },
  83: {
    iucn: 'VU',
    trend: 'down',
    threats: ['fishing', 'boat_strikes', 'habitat', 'climate'],
    actions: ['boat_care', 'responsible_fishing', 'no_litter'],
  },
  84: {
    iucn: 'LC',
    iucnNote: { fr: "Statut mondial amélioré en 2025 ; certaines sous-populations restent menacées.", en: "Global status improved in 2025; some subpopulations remain threatened." },
    epbc: { status: 'VU' },
    trend: 'up',
    threats: ['plastic', 'fishing', 'climate', 'coastal'],
    actions: ['no_litter', 'boat_care', 'keep_distance'],
    programs: { fr: "Raine Island Recovery Project (Grande Barrière de corail)", en: "Raine Island Recovery Project (Great Barrier Reef)" },
  },
  85: {
    iucn: 'LC',
    iucnNote: { fr: "Évaluée au niveau de l’espèce (Arctocephalus pusillus).", en: "Assessed at species level (Arctocephalus pusillus)." },
    trend: 'up',
    threats: ['fishing', 'plastic', 'disturbance'],
    actions: ['keep_distance', 'no_litter', 'boat_care'],
  },
  86: {
    iucn: 'EN',
    epbc: { status: 'EN' },
    vic: { status: 'EN', scope: { fr: "Visiteuse occasionnelle des côtes de Victoria", en: "Occasional visitor to Victorian coasts" } },
    trend: 'down',
    threats: ['fishing', 'small_pop', 'disturbance'],
    actions: ['keep_distance', 'responsible_fishing', 'dogs_leash'],
    programs: { fr: "Plan national de rétablissement de l’otarie cendrée", en: "National Recovery Plan for the Australian Sea Lion" },
  },
  87: {
    iucn: 'LC',
    trend: 'unknown',
    threats: ['habitat', 'pollution', 'ocean_warming'],
    actions: ['keep_distance', 'no_litter'],
  },
  88: {
    iucn: 'LC',
    trend: 'unknown',
    threats: ['ocean_warming', 'trade'],
    actions: ['keep_distance', 'no_release'],
  },
  89: {
    iucn: 'EN',
    trend: 'down',
    threats: ['fishing', 'trade', 'ocean_warming'],
    actions: ['responsible_fishing', 'keep_distance'],
  },
  90: {
    iucn: 'VU',
    trend: 'down',
    threats: ['fishing', 'boat_strikes', 'disturbance'],
    actions: ['boat_care', 'keep_distance'],
  },
  91: {
    iucn: 'NT',
    trend: 'unknown',
    threats: ['fishing', 'pollution'],
    actions: ['responsible_fishing', 'keep_distance'],
  },
  92: {
    iucn: 'LC',
    trend: 'unknown',
    threats: ['pollution'],
    actions: ['keep_distance', 'no_litter'],
  },
  93: {
    iucn: 'NE',
    trend: 'unknown',
    threats: [],
    actions: ['keep_distance'],
  },
  94: {
    iucn: 'NE',
    trend: 'unknown',
    threats: ['coastal', 'pollution'],
    actions: ['keep_distance', 'no_litter'],
  },
  95: {
    iucn: 'NE',
    trend: 'unknown',
    threats: ['habitat'],
    actions: ['keep_distance'],
  },
  96: {
    iucn: 'NE',
    trend: 'unknown',
    threats: [],
    actions: ['keep_distance'],
  },
  97: {
    iucn: 'NE',
    trend: 'unknown',
    threats: [],
    actions: ['keep_distance'],
  },
  98: {
    iucn: 'NE',
    trend: 'unknown',
    threats: ['habitat', 'climate'],
    actions: ['plant_natives'],
  },
  99: {
    iucn: 'LC',
    trend: 'unknown',
    threats: ['habitat'],
    actions: ['plant_natives', 'reduce_chemicals'],
  },
  100: {
    iucn: 'CR',
    epbc: { status: 'CR' },
    trend: 'up',
    threats: ['invasive', 'small_pop'],
    actions: ['support_program', 'no_release'],
    programs: { fr: "Élevage au zoo de Melbourne depuis 2003 ; éradication des rats sur l’île Lord Howe (2019)", en: "Bred at Melbourne Zoo since 2003; rat eradication on Lord Howe Island (2019)" },
  },
  101: {
    iucn: 'NE',
    trend: 'unknown',
    threats: ['habitat'],
    actions: ['keep_distance'],
  },
  102: {
    iucn: 'NE',
    trend: 'unknown',
    threats: ['habitat'],
    actions: ['plant_natives', 'reduce_chemicals'],
  },
  103: {
    iucn: 'NE',
    trend: 'unknown',
    threats: ['pesticides', 'habitat'],
    actions: ['plant_natives', 'reduce_chemicals'],
  },
  104: {
    iucn: 'NE',
    trend: 'unknown',
    threats: ['disturbance', 'water'],
    actions: ['keep_distance'],
  },
  105: {
    iucn: 'VU',
    iucnNote: { fr: "Statut indiqué par la Liste rouge (via GBIF). L’espèce reste pourtant commune dans une grande partie de son aire : ce statut mérite d’être vérifié.", en: "Status as given by the Red List (via GBIF). The species is still common across much of its range, so this is worth double-checking." },
    trend: 'unknown',
    threats: ['water', 'drought'],
    actions: ['no_release', 'water_wise'],
  },
  106: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['roads', 'dogs'],
    actions: ['slow_down', 'check_pouch', 'dogs_leash'],
  },
  107: {
    iucn: 'NE',
    iucnNote: { fr: "Espèce domestique : l’UICN n’évalue pas le chat.", en: "A domesticated species: the IUCN does not assess the cat." },
    trend: 'unknown',
    threats: [],
    actions: ['cat_indoors', 'report_invasive', 'no_release'],
    impact: { fr: "Les chats harets tuent chaque année plus d’un milliard d’animaux natifs et ont contribué à l’extinction de plusieurs mammifères. Ils sont considérés comme la plus grande menace pour les petits mammifères australiens.", en: "Feral cats kill more than a billion native animals each year and have helped drive several mammals extinct. They are considered the biggest threat to Australia’s small mammals." },
  },
  108: {
    iucn: 'NE',
    trend: 'unknown',
    threats: [],
    actions: ['report_invasive', 'no_litter'],
    impact: { fr: "Elle chasse les insectes natifs, concurrence les abeilles et perturbe les pique-niques et les vergers.", en: "It hunts native insects, competes with bees and disrupts picnics and orchards." },
  },
  109: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['disturbance', 'dogs', 'coastal'],
    actions: ['dogs_leash', 'keep_distance', 'respect_closures'],
  },
  110: {
    iucn: 'LC',
    trend: 'unknown',
    threats: ['climate', 'plastic', 'light', 'fishing'],
    actions: ['no_litter', 'slow_down', 'keep_distance'],
  },
  111: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['habitat', 'pesticides'],
    actions: ['reduce_chemicals', 'water_wise'],
  },
  112: {
    iucn: 'NE',
    trend: 'unknown',
    threats: [],
    actions: ['keep_distance'],
  },
  113: {
    iucn: 'NE',
    trend: 'unknown',
    threats: [],
    actions: ['keep_distance'],
  },
  114: {
    iucn: 'NE',
    iucnNote: { fr: "Fiche de genre (plusieurs espèces) : pas de statut UICN unique.", en: "Genus-level entry (several species): no single IUCN status." },
    trend: 'unknown',
    threats: ['habitat', 'pesticides'],
    actions: ['plant_natives', 'reduce_chemicals'],
  },
  115: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['fishing'],
    actions: ['responsible_fishing', 'keep_distance'],
  },
  116: {
    iucn: 'NE',
    trend: 'unknown',
    threats: [],
    actions: ['report_invasive'],
    impact: { fr: "Elle dévore coquillages et autres invertébrés des fonds marins, menace l’élevage de coquillages et des espèces natives comme le poisson à mains tacheté de Tasmanie.", en: "It devours shellfish and other seabed invertebrates, threatens shellfish farming and native species such as Tasmania’s spotted handfish." },
  },
  117: {
    iucn: 'LC',
    epbc: { status: 'VU', scope: { fr: "Sous-espèce de l’archipel de la Recherche (Australie-Occidentale) uniquement", en: "Recherche Archipelago subspecies (WA) only" }, partial: true },
    trend: 'up',
    threats: ['disturbance', 'persecution'],
    actions: ['keep_distance', 'slow_down', 'dogs_leash'],
  },
  118: {
    iucn: 'LC',
    trend: 'unknown',
    threats: ['fishing', 'plastic', 'disturbance'],
    actions: ['no_litter', 'keep_distance'],
  },
  119: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['habitat', 'fire'],
    actions: ['leave_logs', 'plant_natives'],
  },
  120: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['fishing', 'cats_foxes', 'water'],
    actions: ['responsible_fishing', 'no_litter', 'water_wise'],
  },
  121: {
    iucn: 'VU',
    iucnNote: { fr: "Menacé dans son aire d’origine en Asie ; envahissant en Australie.", en: "Threatened in its native range in Asia; invasive in Australia." },
    trend: 'unknown',
    threats: [],
    actions: ['report_invasive', 'slow_down'],
    impact: { fr: "Le sambar piétine et broute les zones humides alpines et les forêts humides, abîme les berges et cause des collisions sur les routes.", en: "Sambar trample and graze alpine wetlands and rainforest, damage riverbanks and cause road collisions." },
  },
  122: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['habitat', 'roads', 'cats_foxes'],
    actions: ['slow_down', 'cat_indoors', 'leave_logs'],
  },
  123: {
    iucn: 'LC',
    epbc: { status: 'VU', scope: { fr: "Population isolée des Flinders Ranges (Australie-Méridionale) uniquement", en: "Isolated Flinders Ranges population (SA) only" }, partial: true },
    trend: 'stable',
    threats: ['habitat', 'water', 'persecution', 'roads'],
    actions: ['keep_distance', 'water_wise', 'report_injured'],
  },
  124: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['habitat', 'roads', 'persecution'],
    actions: ['keep_distance', 'water_wise'],
  },
  125: {
    iucn: 'VU',
    iucnNote: { fr: "Évaluation de 2025 dont les données sont contestées par certains chercheurs.", en: "2025 assessment whose data are disputed by some researchers." },
    trend: 'down',
    threats: ['ocean_warming', 'habitat', 'pollution'],
    actions: ['keep_distance', 'no_litter', 'citizen_science'],
  },
  126: {
    iucn: 'NE',
    trend: 'unknown',
    threats: ['habitat'],
    actions: ['plant_natives', 'citizen_science'],
  },
  127: {
    iucn: 'EN',
    trend: 'down',
    threats: ['climate', 'drought', 'pesticides', 'light'],
    actions: ['reduce_chemicals', 'citizen_science'],
  },
  128: {
    iucn: 'LC',
    epbc: { status: 'VU' },
    vic: { status: 'EN' },
    trend: 'down',
    threats: ['water', 'fishing', 'invasive', 'drought'],
    actions: ['responsible_fishing', 'water_wise', 'no_release'],
    programs: { fr: "Plan national de rétablissement de la morue de Murray ; repeuplement en alevins", en: "National Recovery Plan for the Murray Cod; fingerling restocking" },
  },
  129: {
    iucn: 'VU',
    epbc: { status: 'EN' },
    vic: { status: 'EN' },
    trend: 'down',
    threats: ['fire', 'habitat', 'climate'],
    actions: ['leave_logs', 'citizen_science', 'plant_natives'],
  },
  130: {
    iucn: 'NT',
    epbc: { status: 'VU', scope: { fr: "Sous-espèce de l’Est, celle qui vit en Victoria", en: "Eastern subspecies, the one found in Victoria" } },
    vic: { status: 'VU' },
    trend: 'down',
    threats: ['disturbance', 'dogs', 'cats_foxes', 'coastal'],
    actions: ['dogs_leash', 'respect_closures', 'keep_distance'],
    programs: { fr: "Programme « Beach-nesting Birds » de BirdLife Australia", en: "BirdLife Australia’s Beach-nesting Birds program" },
  },
  131: {
    iucn: 'VU',
    epbc: { status: 'VU' },
    vic: { status: 'VU' },
    trend: 'down',
    threats: ['cats_foxes', 'fire', 'habitat', 'roads'],
    actions: ['slow_down', 'fire_safe', 'citizen_science'],
    programs: { fr: "Équipe nationale de rétablissement du leipoa (National Malleefowl Recovery Team)", en: "National Malleefowl Recovery Team" },
  },
  132: {
    iucn: 'EN',
    epbc: { status: 'EN' },
    vic: { status: 'EN' },
    trend: 'down',
    threats: ['fire', 'habitat', 'climate'],
    actions: ['leave_logs', 'fire_safe', 'citizen_science'],
  },
  133: {
    iucn: 'NT',
    epbc: { status: 'VU', scope: { fr: "Sous-espèces du nord et du sud continental", en: "Northern and southern mainland subspecies" } },
    vic: { status: 'VU', scope: { fr: "Sous-espèce du sud continental", en: "Southern mainland subspecies" } },
    trend: 'down',
    threats: ['cats_foxes', 'habitat', 'fire'],
    actions: ['cat_indoors', 'dogs_leash', 'leave_logs'],
  },
  134: {
    iucn: 'VU',
    epbc: { status: 'EN', scope: { fr: "Population continentale : en danger ; Tasmanie : vulnérable", en: "Mainland population: Endangered; Tasmania: Vulnerable" } },
    vic: { status: 'EN' },
    trend: 'up',
    threats: ['cats_foxes', 'roads'],
    actions: ['cat_indoors', 'slow_down', 'support_program'],
    programs: { fr: "Réintroductions sur Phillip Island, French Island et Churchill Island (Zoos Victoria, Phillip Island Nature Parks et partenaires)", en: "Reintroductions to Phillip Island, French Island and Churchill Island (Zoos Victoria, Phillip Island Nature Parks and partners)" },
  },
  135: {
    iucn: 'NE',
    iucnNote: { fr: "Sous-espèce non évaluée séparément par l’UICN.", en: "Subspecies not assessed separately by the IUCN." },
    epbc: { status: 'CR' },
    vic: { status: 'CR' },
    trend: 'down',
    threats: ['disturbance', 'pesticides', 'climate', 'habitat'],
    actions: ['keep_distance', 'reduce_chemicals'],
    programs: { fr: "Plan national de rétablissement ; protection des grottes de maternité", en: "National Recovery Plan; protection of maternity caves" },
  },
  136: {
    iucn: 'VU',
    epbc: { status: 'VU' },
    vic: { status: 'VU' },
    trend: 'down',
    threats: ['disease', 'habitat', 'water', 'roads'],
    actions: ['clean_gear', 'water_wise', 'reduce_chemicals'],
  },
  137: {
    iucn: 'LC',
    epbc: { status: 'EN' },
    vic: { status: 'EN' },
    trend: 'unknown',
    threats: ['boat_strikes', 'fishing', 'disturbance', 'climate'],
    actions: ['boat_care', 'keep_distance'],
  },
  138: {
    iucn: 'NE',
    iucnNote: { fr: "Non évalué par l’UICN ; son statut d’espèce distincte est encore débattu.", en: "Not assessed by the IUCN; its status as a distinct species is still debated." },
    vic: { status: 'CR' },
    trend: 'unknown',
    threats: ['pollution', 'boat_strikes', 'fishing', 'disease'],
    actions: ['boat_care', 'no_litter', 'no_feeding'],
  },
  139: {
    iucn: 'VU',
    epbc: { status: 'EN' },
    vic: { status: 'CR' },
    trend: 'down',
    threats: ['plastic', 'fishing', 'climate', 'light'],
    actions: ['no_litter', 'boat_care', 'keep_distance'],
  },
  140: {
    iucn: 'NE',
    epbc: { status: 'VU' },
    vic: { status: 'VU' },
    trend: 'down',
    threats: ['habitat', 'invasive'],
    actions: ['plant_natives', 'respect_closures'],
  },
  141: {
    iucn: 'NE',
    iucnNote: { fr: "Sous-espèce non évaluée séparément par l’UICN.", en: "Subspecies not assessed separately by the IUCN." },
    epbc: { status: 'EN' },
    vic: { status: 'EN' },
    trend: 'down',
    threats: ['habitat', 'fire', 'small_pop'],
    actions: ['respect_closures', 'support_program'],
  },
  142: {
    iucn: 'CR',
    epbc: { status: 'EN' },
    vic: { status: 'EN' },
    trend: 'down',
    threats: ['climate', 'cats_foxes', 'fire', 'small_pop'],
    actions: ['support_program', 'reduce_chemicals', 'respect_closures'],
    programs: { fr: "Programmes de rétablissement en Victoria et en NSW (dont Zoos Victoria) ; corridors rocheux sous les pistes de ski", en: "Recovery programmes in Victoria and NSW (including Zoos Victoria); boulder-field corridors under ski runs" },
  },
  143: {
    iucn: 'CR',
    epbc: { status: 'CR' },
    vic: { status: 'CR' },
    trend: 'down',
    threats: ['fire', 'habitat', 'climate', 'small_pop'],
    actions: ['support_program', 'leave_logs', 'fire_safe'],
    programs: { fr: "Programme de rétablissement du gouvernement de Victoria et de Zoos Victoria ; nichoirs artificiels", en: "Victorian Government and Zoos Victoria recovery programme; artificial nest boxes" },
  },
  144: {
    iucn: 'NE',
    iucnNote: { fr: "L’UICN évalue l’espèce entière (méliphage à touffes jaunes, « Préoccupation mineure ») ; la sous-espèce casquée n’est pas évaluée séparément.", en: "The IUCN assesses the whole species (Yellow-tufted Honeyeater, Least Concern); the helmeted subspecies is not assessed separately." },
    epbc: { status: 'CR' },
    vic: { status: 'CR' },
    trend: 'up',
    threats: ['habitat', 'small_pop', 'competition'],
    actions: ['support_program', 'keep_distance'],
    programs: { fr: "Élevage et lâchers à Healesville Sanctuary (Zoos Victoria) ; restauration de la réserve de Yellingbo", en: "Breeding and releases at Healesville Sanctuary (Zoos Victoria); restoration of the Yellingbo reserve" },
  },
  145: {
    iucn: 'CR',
    epbc: { status: 'CR' },
    vic: { status: 'CR' },
    trend: 'up',
    threats: ['small_pop', 'disease', 'habitat', 'cats_foxes'],
    actions: ['support_program', 'keep_distance', 'cat_indoors'],
    programs: { fr: "Équipe nationale de rétablissement ; élevage en captivité (Zoos Victoria, Moonlit Sanctuary, Tasmanie) et lâchers", en: "National Recovery Team; captive breeding (Zoos Victoria, Moonlit Sanctuary, Tasmania) and releases" },
  },
  146: {
    iucn: 'CR',
    epbc: { status: 'CR' },
    vic: { status: 'CR' },
    trend: 'down',
    threats: ['habitat', 'small_pop', 'competition'],
    actions: ['plant_natives', 'citizen_science', 'support_program'],
    programs: { fr: "Élevage au Taronga Zoo et lâchers ; plan national de rétablissement", en: "Breeding at Taronga Zoo and releases; National Recovery Plan" },
  },
  147: {
    iucn: 'CR',
    epbc: { status: 'CR' },
    vic: { status: 'CR' },
    trend: 'down',
    threats: ['disease', 'climate', 'small_pop'],
    actions: ['clean_gear', 'support_program', 'respect_closures'],
    programs: { fr: "Programme d’élevage de Zoos Victoria", en: "Zoos Victoria breeding programme" },
  },
  148: {
    iucn: 'CR',
    epbc: { status: 'CR' },
    vic: { status: 'CR' },
    trend: 'down',
    threats: ['habitat', 'cats_foxes', 'small_pop'],
    actions: ['cat_indoors', 'support_program', 'respect_closures'],
    programs: { fr: "Programme d’élevage de Zoos Victoria lancé après la redécouverte", en: "Zoos Victoria breeding programme launched after the rediscovery" },
  },
  149: {
    iucn: 'EN',
    epbc: { status: 'CR' },
    vic: { status: 'CR' },
    trend: 'down',
    threats: ['habitat', 'cats_foxes', 'drought'],
    actions: ['cat_indoors', 'support_program'],
    programs: { fr: "Élevage en captivité (Zoos Victoria, Taronga Western Plains) ; plan national de rétablissement", en: "Captive breeding (Zoos Victoria, Taronga Western Plains); National Recovery Plan" },
  },
  150: {
    iucn: 'EN',
    epbc: { status: 'VU' },
    vic: { status: 'EN' },
    trend: 'unknown',
    threats: ['habitat', 'water'],
    actions: ['respect_closures', 'water_wise'],
    programs: { fr: "Plan national de rétablissement du ver de terre géant du Gippsland", en: "National Recovery Plan for the Giant Gippsland Earthworm" },
  },
  151: {
    iucn: 'CR',
    epbc: { status: 'CR' },
    trend: 'unknown',
    threats: ['cats_foxes', 'fire', 'habitat'],
    actions: ['support_program', 'respect_closures'],
    programs: { fr: "Réserve de Pullen Pullen (Bush Heritage Australia) ; équipe nationale de rétablissement", en: "Pullen Pullen Reserve (Bush Heritage Australia); National Recovery Team" },
  },
};

// Garde-fou : chaque espèce du catalogue doit avoir sa fiche de conservation.
// (L'export web statique échoue si ce n'est pas le cas.)
const missing = ANIMALS.filter((a) => !CONSERVATION_INFO[a.id]).map((a) => a.id);
if (missing.length) throw new Error(`Conservation data missing for: ${missing.join(', ')}`);

export function conservationOf(animal: Animal): ConservationInfo {
  return CONSERVATION_INFO[animal.id];
}

const THREATENED_IUCN: IucnStatus[] = ['VU', 'EN', 'CR'];
const THREATENED_AU: AuStatus[] = ['VU', 'EN', 'CR', 'TH', 'EW'];

function listedAsThreatened(l?: Listing): boolean {
  return !!l && !l.partial && THREATENED_AU.includes(l.status);
}

/**
 * Espèce menacée : catégorie menacée sur la Liste rouge mondiale (UICN) ou inscription
 * nationale (EPBC) qui concerne toute l'espèce. Les inscriptions limitées à une
 * sous-espèce ou une population ne comptent pas.
 */
export function isThreatened(animal: Animal): boolean {
  const c = conservationOf(animal);
  return THREATENED_IUCN.includes(c.iucn) || listedAsThreatened(c.epbc);
}

/** Menacée en Victoria (liste du Flora and Fauna Guarantee Act). */
export function isThreatenedInVictoria(animal: Animal): boolean {
  return listedAsThreatened(conservationOf(animal).vic);
}
