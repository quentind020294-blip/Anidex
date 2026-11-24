import Anthropic from '@anthropic-ai/sdk';

import { ANIMALS, getAnimal } from '../data/animals';
import type { Animal } from '../data/types';

export interface Candidate {
  animal: Animal;
  confidence: number;
}

export interface IdentifyResult {
  containsAnimal: boolean;
  candidates: Candidate[];
  /** Espèce reconnue mais absente de l'Anidex (ex. animal domestique ou non australien). */
  outsideDex?: string;
  comment: string;
}

export class IdentifyError extends Error {}

const MODEL = 'claude-opus-5-5';

// Catalogue envoyé une fois dans le prompt système (stable → mis en cache côté API).
const CATALOGUE = ANIMALS.map((a) => `${a.id} | ${a.scientific} | ${a.nameEn} | ${a.nameFr}`).join('\n');

const SYSTEM = `Tu es le moteur d'identification de l'Anidex, une application mobile (façon Pokédex) pour découvrir la faune australienne.
L'utilisateur t'envoie une photo prise sur le terrain. Identifie l'animal visible et fais-le correspondre au catalogue ci-dessous.

Règles :
- "candidates" : jusqu'à 3 espèces du catalogue, de la plus probable à la moins probable, avec "dex_id" (le numéro du catalogue) et "confidence" entre 0 et 1.
- N'inclus que des espèces plausibles d'après ce qui est réellement visible. Si tu ne peux pas trancher entre espèces proches, baisse la confiance plutôt que d'en inventer.
- Si l'animal visible n'est pas dans le catalogue (animal domestique, espèce non australienne ou absente du catalogue), laisse "candidates" vide ou limité aux espèces vraiment plausibles, et donne son nom en français dans "outside_dex".
- Si aucun animal n'est visible (paysage, objet, personne), mets "contains_animal" à false.
- Une photo d'une peluche, d'un dessin ou d'un écran ne compte pas comme une observation : signale-le dans "comment" et garde des confiances basses.
- "comment" : une ou deux phrases en français, chaleureuses, qui expliquent les indices visuels utilisés.

Catalogue (dex_id | nom scientifique | nom anglais | nom français) :
${CATALOGUE}`;

const SCHEMA = {
  type: 'object',
  properties: {
    contains_animal: { type: 'boolean' },
    candidates: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dex_id: { type: 'integer' },
          confidence: { type: 'number' },
        },
        required: ['dex_id', 'confidence'],
        additionalProperties: false,
      },
    },
    outside_dex: { anyOf: [{ type: 'string' }, { type: 'null' }] },
    comment: { type: 'string' },
  },
  required: ['contains_animal', 'candidates', 'outside_dex', 'comment'],
  additionalProperties: false,
} as const;

interface RawResult {
  contains_animal: boolean;
  candidates: { dex_id: number; confidence: number }[];
  outside_dex: string | null;
  comment: string;
}

export async function identifyAnimal(apiKey: string, base64Jpeg: string): Promise<IdentifyResult> {
  if (!apiKey) throw new IdentifyError('Ajoute ta clé API Claude dans les réglages pour activer l’identification automatique.');

  // La clé appartient à l'utilisateur et reste sur son appareil : l'appel part directement du téléphone.
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true, maxRetries: 2 });

  let response: Anthropic.Beta.BetaMessage;
  try {
    response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'low', format: { type: 'json_schema', schema: SCHEMA } },
      system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: base64Jpeg } },
            { type: 'text', text: 'Quel animal vois-tu sur cette photo ?' },
          ],
        },
      ],
    });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      throw new IdentifyError('Clé API invalide. Vérifie-la dans les réglages.');
    } else if (error instanceof Anthropic.PermissionDeniedError) {
      throw new IdentifyError('Cette clé API n’a pas accès au modèle demandé.');
    } else if (error instanceof Anthropic.RateLimitError) {
      throw new IdentifyError('Trop de demandes d’un coup. Réessaie dans quelques instants.');
    } else if (error instanceof Anthropic.BadRequestError) {
      throw new IdentifyError('La photo n’a pas pu être analysée (format ou taille). Essaie une autre photo.');
    } else if (error instanceof Anthropic.APIConnectionError) {
      throw new IdentifyError('Pas de connexion Internet. Tu peux choisir l’espèce manuellement.');
    } else if (error instanceof Anthropic.APIError) {
      throw new IdentifyError(`Le service d’identification est indisponible (erreur ${error.status ?? '?'}).`);
    }
    throw error;
  }

  if (response.stop_reason === 'refusal') {
    throw new IdentifyError('Cette photo n’a pas pu être analysée. Choisis l’espèce manuellement.');
  }

  const text = response.content.find((b) => b.type === 'text');
  if (!text || text.type !== 'text') throw new IdentifyError('Réponse vide du service d’identification.');

  let raw: RawResult;
  try {
    raw = JSON.parse(text.text) as RawResult;
  } catch {
    throw new IdentifyError('Réponse illisible du service d’identification.');
  }

  const seen = new Set<number>();
  const candidates: Candidate[] = [];
  for (const c of raw.candidates) {
    const animal = getAnimal(c.dex_id);
    if (!animal || seen.has(animal.id)) continue;
    seen.add(animal.id);
    candidates.push({ animal, confidence: Math.max(0, Math.min(1, c.confidence)) });
  }
  candidates.sort((a, b) => b.confidence - a.confidence);

  return {
    containsAnimal: raw.contains_animal,
    candidates: candidates.slice(0, 3),
    outsideDex: raw.outside_dex ?? undefined,
    comment: raw.comment,
  };
}
