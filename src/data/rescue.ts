import { localized } from '../i18n/registry';
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
  /** Clé du texte `rescue` dans src/i18n/<langue>/content.ts. */
  id: string;
  name: string;
  phone: string;
  /** Numéro au format national australien pour le lien « tel: » (les 13, 1300 et 1800 ne fonctionnent pas avec +61). */
  tel: string;
  url?: string;
  /** Rempli depuis les fichiers de langue. */
  note?: Localized;
  verified: Verification;
}

export const RESCUE_CONTACTS: Record<StateCode, RescueContact[]> = {
  VIC: [
    {
      id: 'wildlife-victoria',
      name: 'Wildlife Victoria',
      phone: '03 8400 7300',
      tel: '0384007300',
      url: 'https://www.wildlifevictoria.org.au/',
      verified: 'multiple',
    },
    {
      id: 'deeca',
      name: 'DEECA',
      phone: '136 186',
      tel: '136186',
      url: 'https://www.wildlife.vic.gov.au/wildlife-emergencies/reporting-injured-wildlife-during-emergencies',
      verified: 'multiple',
    },
  ],
  NSW: [
    {
      id: 'wires',
      name: 'WIRES',
      phone: '1300 094 737',
      tel: '1300094737',
      url: 'https://www.wires.org.au/report-a-rescue',
      verified: 'official',
    },
  ],
  QLD: [
    {
      id: 'rspca-qld-1300-animal',
      name: 'RSPCA Qld — 1300 ANIMAL',
      phone: '1300 264 625',
      tel: '1300264625',
      url: 'https://www.qld.gov.au/environment/plants-animals/wildlife/injured-and-orphaned-wildlife/injured',
      verified: 'official',
    },
    {
      id: 'queensland-wildlife-hotline',
      name: 'Queensland Wildlife Hotline',
      phone: '1300 130 372',
      tel: '1300130372',
      url: 'https://www.qld.gov.au/environment/plants-animals/wildlife/injured-and-orphaned-wildlife/injured',
      verified: 'official',
    },
  ],
  WA: [
    {
      id: 'wildcare-helpline',
      name: 'Wildcare Helpline (DBCA)',
      phone: '08 9474 9055',
      tel: '0894749055',
      url: 'https://www.dbca.wa.gov.au/wildcare',
      verified: 'official',
    },
  ],
  SA: [
    {
      id: 'fauna-rescue-of-south-australia',
      name: 'Fauna Rescue of South Australia',
      phone: '08 8289 0896',
      tel: '0882890896',
      url: 'https://www.environment.sa.gov.au/goodliving/posts/2021/11/wildlife-rescue-contacts-south-australia',
      verified: 'multiple',
    },
  ],
  TAS: [
    {
      id: 'bonorong-wildlife-rescue',
      name: 'Bonorong Wildlife Rescue',
      phone: '0447 264 625',
      tel: '0447264625',
      verified: 'multiple',
    },
    {
      id: 'nre-tas-wildlife-services',
      name: 'NRE Tas — Wildlife Services',
      phone: '03 6165 4305',
      tel: '0361654305',
      url: 'https://nre.tas.gov.au/wildlife-management/what-to-do-if-you-find-a-sick-injured-or-orphaned-animals',
      verified: 'official',
    },
  ],
  NT: [
    {
      id: 'wildcare-nt',
      name: 'Wildcare NT',
      phone: '0408 885 341',
      tel: '0408885341',
      url: 'https://nt.gov.au/environment/animals/report-injured-wildlife-or-rescue',
      verified: 'unconfirmed',
    },
  ],
  ACT: [
    {
      id: 'act-wildlife',
      name: 'ACT Wildlife',
      phone: '0432 300 033',
      tel: '0432300033',
      url: 'https://actwildlife.net/',
      verified: 'multiple',
    },
    {
      id: 'access-canberra',
      name: 'Access Canberra',
      phone: '13 22 81',
      tel: '132281',
      url: 'https://www.act.gov.au/',
      verified: 'multiple',
    },
  ],
};

/** Valable partout en Australie. */
export const NATIONAL_CONTACTS: RescueContact[] = [
  {
    id: 'emergency-animal-disease-hotline',
    name: 'Emergency Animal Disease Hotline',
    phone: '1800 675 888',
    tel: '1800675888',
    verified: 'official',
  },
];

// Notes (textes) : src/i18n/<langue>/content.ts.
for (const contact of [...Object.values(RESCUE_CONTACTS).flat(), ...NATIONAL_CONTACTS]) {
  contact.note = localized((c) => c.rescue[contact.id]);
  if (!contact.note) throw new Error(`Note de secours manquante : ${contact.id}`);
}
