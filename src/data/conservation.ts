import { localized } from '../i18n/registry';
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
    epbc: { status: 'VU', partial: true },
    vic: { status: 'EN' },
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
    epbc: { status: 'EN', partial: true },
    trend: 'down',
    threats: ['habitat', 'fire', 'roads', 'dogs', 'disease', 'climate'],
    actions: ['slow_down', 'dogs_leash', 'plant_natives', 'report_injured', 'citizen_science'],
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
    epbc: { status: 'EN', partial: true },
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
  },
  11: {
    iucn: 'NE',
    trend: 'unknown',
    threats: ['persecution', 'roads'],
    actions: ['no_feeding', 'keep_distance'],
  },
  12: {
    iucn: 'LC',
    epbc: { status: 'VU', partial: true },
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
    epbc: { status: 'EN' },
    trend: 'up',
    threats: ['cats_foxes', 'fire', 'habitat'],
    actions: ['cat_indoors', 'support_program', 'fire_safe'],
  },
  16: {
    iucn: 'VU',
    epbc: { status: 'VU' },
    trend: 'down',
    threats: ['cats_foxes', 'fire', 'invasive'],
    actions: ['support_program', 'cat_indoors'],
  },
  17: {
    iucn: 'NT',
    epbc: { status: 'EN' },
    vic: { status: 'EN' },
    trend: 'down',
    threats: ['habitat', 'cats_foxes', 'roads', 'persecution', 'fire'],
    actions: ['slow_down', 'leave_logs', 'report_injured', 'citizen_science'],
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
    epbc: { status: 'VU' },
    trend: 'stable',
    threats: ['cats_foxes', 'invasive', 'drought'],
    actions: ['keep_distance', 'support_program'],
  },
  21: {
    iucn: 'LC',
    vic: { status: 'TH', partial: true },
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
    trend: 'unknown',
    threats: [],
    actions: ['report_invasive', 'no_release'],
  },
  24: {
    iucn: 'LC',
    trend: 'unknown',
    threats: [],
    actions: ['report_invasive', 'cat_indoors'],
  },
  25: {
    iucn: 'NE',
    trend: 'unknown',
    threats: [],
    actions: ['report_invasive', 'keep_distance'],
  },
  26: {
    iucn: 'LC',
    epbc: { status: 'EX', partial: true },
    trend: 'stable',
    threats: ['roads', 'habitat', 'drought'],
    actions: ['slow_down', 'no_feeding'],
  },
  27: {
    iucn: 'LC',
    epbc: { status: 'EN' },
    trend: 'down',
    threats: ['habitat', 'roads', 'dogs', 'climate'],
    actions: ['slow_down', 'no_feeding', 'dogs_leash', 'report_injured'],
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
    epbc: { status: 'EN', partial: true },
    vic: { status: 'EN' },
    trend: 'unknown',
    threats: ['habitat', 'fire'],
    actions: ['leave_logs', 'plant_natives', 'citizen_science'],
  },
  35: {
    iucn: 'LC',
    epbc: { status: 'EN', partial: true },
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
  },
  42: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['cats_foxes', 'habitat'],
    actions: ['cat_indoors', 'plant_natives'],
  },
  43: {
    iucn: 'LC',
    epbc: { status: 'EN', partial: true },
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
    epbc: { status: 'EN' },
    trend: 'stable',
    threats: ['fire', 'habitat', 'trade'],
    actions: ['fire_safe', 'citizen_science'],
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
    epbc: { status: 'VU', partial: true },
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
    epbc: { status: 'CR', partial: true },
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
    vic: { status: 'EX' },
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
    vic: { status: 'EN' },
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
  },
  78: {
    iucn: 'LC',
    trend: 'unknown',
    threats: [],
    actions: ['report_invasive', 'no_release'],
  },
  79: {
    iucn: 'VU',
    epbc: { status: 'VU' },
    vic: { status: 'EN' },
    trend: 'unknown',
    threats: ['fishing', 'persecution'],
    actions: ['responsible_fishing', 'keep_distance'],
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
    epbc: { status: 'VU' },
    trend: 'up',
    threats: ['plastic', 'fishing', 'climate', 'coastal'],
    actions: ['no_litter', 'boat_care', 'keep_distance'],
  },
  85: {
    iucn: 'LC',
    trend: 'up',
    threats: ['fishing', 'plastic', 'disturbance'],
    actions: ['keep_distance', 'no_litter', 'boat_care'],
  },
  86: {
    iucn: 'EN',
    epbc: { status: 'EN' },
    vic: { status: 'EN' },
    trend: 'down',
    threats: ['fishing', 'small_pop', 'disturbance'],
    actions: ['keep_distance', 'responsible_fishing', 'dogs_leash'],
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
    trend: 'unknown',
    threats: [],
    actions: ['cat_indoors', 'report_invasive', 'no_release'],
  },
  108: {
    iucn: 'NE',
    trend: 'unknown',
    threats: [],
    actions: ['report_invasive', 'no_litter'],
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
  },
  117: {
    iucn: 'LC',
    epbc: { status: 'VU', partial: true },
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
    trend: 'unknown',
    threats: [],
    actions: ['report_invasive', 'slow_down'],
  },
  122: {
    iucn: 'LC',
    trend: 'stable',
    threats: ['habitat', 'roads', 'cats_foxes'],
    actions: ['slow_down', 'cat_indoors', 'leave_logs'],
  },
  123: {
    iucn: 'LC',
    epbc: { status: 'VU', partial: true },
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
    epbc: { status: 'VU' },
    vic: { status: 'VU' },
    trend: 'down',
    threats: ['disturbance', 'dogs', 'cats_foxes', 'coastal'],
    actions: ['dogs_leash', 'respect_closures', 'keep_distance'],
  },
  131: {
    iucn: 'VU',
    epbc: { status: 'VU' },
    vic: { status: 'VU' },
    trend: 'down',
    threats: ['cats_foxes', 'fire', 'habitat', 'roads'],
    actions: ['slow_down', 'fire_safe', 'citizen_science'],
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
    epbc: { status: 'VU' },
    vic: { status: 'VU' },
    trend: 'down',
    threats: ['cats_foxes', 'habitat', 'fire'],
    actions: ['cat_indoors', 'dogs_leash', 'leave_logs'],
  },
  134: {
    iucn: 'VU',
    epbc: { status: 'EN' },
    vic: { status: 'EN' },
    trend: 'up',
    threats: ['cats_foxes', 'roads'],
    actions: ['cat_indoors', 'slow_down', 'support_program'],
  },
  135: {
    iucn: 'NE',
    epbc: { status: 'CR' },
    vic: { status: 'CR' },
    trend: 'down',
    threats: ['disturbance', 'pesticides', 'climate', 'habitat'],
    actions: ['keep_distance', 'reduce_chemicals'],
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
  },
  143: {
    iucn: 'CR',
    epbc: { status: 'CR' },
    vic: { status: 'CR' },
    trend: 'down',
    threats: ['fire', 'habitat', 'climate', 'small_pop'],
    actions: ['support_program', 'leave_logs', 'fire_safe'],
  },
  144: {
    iucn: 'NE',
    epbc: { status: 'CR' },
    vic: { status: 'CR' },
    trend: 'up',
    threats: ['habitat', 'small_pop', 'competition'],
    actions: ['support_program', 'keep_distance'],
  },
  145: {
    iucn: 'CR',
    epbc: { status: 'CR' },
    vic: { status: 'CR' },
    trend: 'up',
    threats: ['small_pop', 'disease', 'habitat', 'cats_foxes'],
    actions: ['support_program', 'keep_distance', 'cat_indoors'],
  },
  146: {
    iucn: 'CR',
    epbc: { status: 'CR' },
    vic: { status: 'CR' },
    trend: 'down',
    threats: ['habitat', 'small_pop', 'competition'],
    actions: ['plant_natives', 'citizen_science', 'support_program'],
  },
  147: {
    iucn: 'CR',
    epbc: { status: 'CR' },
    vic: { status: 'CR' },
    trend: 'down',
    threats: ['disease', 'climate', 'small_pop'],
    actions: ['clean_gear', 'support_program', 'respect_closures'],
  },
  148: {
    iucn: 'CR',
    epbc: { status: 'CR' },
    vic: { status: 'CR' },
    trend: 'down',
    threats: ['habitat', 'cats_foxes', 'small_pop'],
    actions: ['cat_indoors', 'support_program', 'respect_closures'],
  },
  149: {
    iucn: 'EN',
    epbc: { status: 'CR' },
    vic: { status: 'CR' },
    trend: 'down',
    threats: ['habitat', 'cats_foxes', 'drought'],
    actions: ['cat_indoors', 'support_program'],
  },
  150: {
    iucn: 'EN',
    epbc: { status: 'VU' },
    vic: { status: 'EN' },
    trend: 'unknown',
    threats: ['habitat', 'water'],
    actions: ['respect_closures', 'water_wise'],
  },
  151: {
    iucn: 'CR',
    epbc: { status: 'CR' },
    trend: 'unknown',
    threats: ['cats_foxes', 'fire', 'habitat'],
    actions: ['support_program', 'respect_closures'],
  },
};

// Garde-fou : chaque espèce du catalogue doit avoir sa fiche de conservation.
// (L'export web statique échoue si ce n'est pas le cas.)
const missing = ANIMALS.filter((a) => !CONSERVATION_INFO[a.id]).map((a) => a.id);
if (missing.length) throw new Error(`Conservation data missing for: ${missing.join(', ')}`);

// Textes (notes, portée des inscriptions, programmes, impact) : src/i18n/<langue>/content.ts.
for (const [key, info] of Object.entries(CONSERVATION_INFO)) {
  const id = Number(key);
  info.iucnNote = localized((c) => c.conservation[id]?.iucnNote);
  info.programs = localized((c) => c.conservation[id]?.programs);
  info.impact = localized((c) => c.conservation[id]?.impact);
  if (info.epbc) info.epbc.scope = localized((c) => c.conservation[id]?.epbcScope);
  if (info.vic) info.vic.scope = localized((c) => c.conservation[id]?.vicScope);
}

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

/**
 * Espèce dont on ne partage jamais le lieu, même approximatif (État), avec les amis :
 * menacée au niveau mondial, national ou en Victoria, ou inscrite sur une liste
 * de protection (même si l'inscription ne concerne qu'une sous-espèce ou une population).
 * La même liste est appliquée côté serveur (supabase/anidex.sql, table sensitive_species).
 */
export function hidesLocation(animal: Animal): boolean {
  const c = conservationOf(animal);
  return isThreatened(animal) || isThreatenedInVictoria(animal) || !!c.epbc || !!c.vic;
}
