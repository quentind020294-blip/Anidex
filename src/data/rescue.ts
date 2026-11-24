import type { Localized, StateCode } from './types';

/**
 * Numéros pour signaler un animal sauvage blessé, vérifiés en novembre 2026.
 * - official : numéro lu directement sur la page officielle de l'État ou de l'organisme ;
 * - multiple : page officielle inaccessible depuis l'outil de vérification, mais numéro
 *   confirmé par plusieurs sources concordantes (organisme, mairies, gouvernement) ;
 * - unconfirmed : à confirmer (page officielle inaccessible, sources secondaires seulement).
 */
export type Verification = 'official' | 'multiple' | 'unconfirmed';

export interface RescueContact {
  name: string;
  phone: string;
  /** Numéro au format national australien pour le lien « tel: » (les 13, 1300 et 1800 ne fonctionnent pas avec +61). */
  tel: string;
  url?: string;
  note: Localized;
  verified: Verification;
}

export const RESCUE_CONTACTS: Record<StateCode, RescueContact[]> = {
  VIC: [
    {
      name: 'Wildlife Victoria',
      phone: '03 8400 7300',
      tel: '0384007300',
      url: 'https://www.wildlifevictoria.org.au/',
      note: { fr: 'Service d’urgence 24 h/24, 7 j/7, pour toute la Victoria.', en: '24/7 emergency response service for all of Victoria.' },
      verified: 'multiple',
    },
    {
      name: 'DEECA (gouvernement de Victoria)',
      phone: '136 186',
      tel: '136186',
      url: 'https://www.wildlife.vic.gov.au/wildlife-emergencies/reporting-injured-wildlife-during-emergencies',
      note: { fr: 'Animaux blessés lors d’incendies, d’inondations ou de canicules.', en: 'Wildlife injured in fires, floods or heatwaves.' },
      verified: 'multiple',
    },
  ],
  NSW: [
    {
      name: 'WIRES',
      phone: '1300 094 737',
      tel: '1300094737',
      url: 'https://www.wires.org.au/report-a-rescue',
      note: { fr: 'Ligne de secours 24 h/24, 365 jours par an.', en: 'Rescue line open 24/7, 365 days a year.' },
      verified: 'official',
    },
  ],
  QLD: [
    {
      name: 'RSPCA Qld — 1300 ANIMAL',
      phone: '1300 264 625',
      tel: '1300264625',
      url: 'https://www.qld.gov.au/environment/plants-animals/wildlife/injured-and-orphaned-wildlife/injured',
      note: { fr: 'Animaux sauvages blessés ou orphelins (sauf crocodiles, casoars et animaux marins).', en: 'Injured or orphaned wildlife (except crocodiles, cassowaries and marine animals).' },
      verified: 'official',
    },
    {
      name: 'Queensland Wildlife Hotline',
      phone: '1300 130 372',
      tel: '1300130372',
      url: 'https://www.qld.gov.au/environment/plants-animals/wildlife/injured-and-orphaned-wildlife/injured',
      note: { fr: 'Tortues, dauphins, dugongs et baleines échoués (option 1), crocodiles et casoars.', en: 'Stranded turtles, dolphins, dugongs and whales (option 1), crocodiles and cassowaries.' },
      verified: 'official',
    },
  ],
  WA: [
    {
      name: 'Wildcare Helpline (DBCA)',
      phone: '08 9474 9055',
      tel: '0894749055',
      url: 'https://www.dbca.wa.gov.au/wildcare',
      note: { fr: 'Met en contact avec le soigneur agréé le plus proche, partout en Australie-Occidentale.', en: 'Puts you in touch with the nearest registered carer anywhere in Western Australia.' },
      verified: 'official',
    },
  ],
  SA: [
    {
      name: 'Fauna Rescue of South Australia',
      phone: '08 8289 0896',
      tel: '0882890896',
      url: 'https://www.environment.sa.gov.au/goodliving/posts/2021/11/wildlife-rescue-contacts-south-australia',
      note: { fr: 'Ligne d’urgence 24 h/24 pour tous les animaux sauvages.', en: '24-hour hotline for all wildlife.' },
      verified: 'multiple',
    },
  ],
  TAS: [
    {
      name: 'Bonorong Wildlife Rescue',
      phone: '0447 264 625',
      tel: '0447264625',
      note: { fr: 'Service de secours 24 h/24 pour toute la Tasmanie.', en: '24-hour rescue service for all of Tasmania.' },
      verified: 'multiple',
    },
    {
      name: 'NRE Tas — Wildlife Services',
      phone: '03 6165 4305',
      tel: '0361654305',
      url: 'https://nre.tas.gov.au/wildlife-management/what-to-do-if-you-find-a-sick-injured-or-orphaned-animals',
      note: { fr: 'Service du gouvernement de Tasmanie (heures de bureau).', en: 'Tasmanian Government service (business hours).' },
      verified: 'official',
    },
  ],
  NT: [
    {
      name: 'Wildcare NT',
      phone: '0408 885 341',
      tel: '0408885341',
      url: 'https://nt.gov.au/environment/animals/report-injured-wildlife-or-rescue',
      note: { fr: 'Bénévoles de la région de Darwin ; ils peuvent ne pas répondre immédiatement.', en: 'Darwin-area volunteers; they may not answer straight away.' },
      verified: 'unconfirmed',
    },
  ],
  ACT: [
    {
      name: 'ACT Wildlife',
      phone: '0432 300 033',
      tel: '0432300033',
      url: 'https://actwildlife.net/',
      note: { fr: 'Ligne 24 h/24 pour les animaux natifs blessés, malades ou orphelins.', en: '24-hour line for injured, sick or orphaned native animals.' },
      verified: 'multiple',
    },
    {
      name: 'Access Canberra',
      phone: '13 22 81',
      tel: '132281',
      url: 'https://www.act.gov.au/',
      note: { fr: 'Kangourous blessés, accidents avec des kangourous, et urgences en dehors des heures.', en: 'Injured kangaroos, kangaroo collisions and after-hours emergencies.' },
      verified: 'multiple',
    },
  ],
};

/** Valable partout en Australie. */
export const NATIONAL_CONTACTS: RescueContact[] = [
  {
    name: 'Emergency Animal Disease Hotline',
    phone: '1800 675 888',
    tel: '1800675888',
    note: { fr: 'Oiseaux ou animaux trouvés malades ou morts (suspicion de grippe aviaire H5).', en: 'Sick or dead birds or animals (suspected H5 bird flu).' },
    verified: 'official',
  },
];
