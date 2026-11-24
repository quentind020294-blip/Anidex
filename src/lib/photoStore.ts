// Version native (iOS / Android) : les photos sont copiées dans le dossier Documents de l'app.
// La version web se trouve dans photoStore.web.ts (Metro choisit le bon fichier automatiquement).
import { Directory, File, Paths } from 'expo-file-system';

function photoDir(): Directory {
  const dir = new Directory(Paths.document, 'photos');
  if (!dir.exists) dir.create({ intermediates: true, idempotent: true });
  return dir;
}

/** Copie la photo dans le stockage permanent de l'app et renvoie l'URI à enregistrer. */
export async function persistPhoto(uri: string, id: string, _base64?: string | null): Promise<string> {
  const dest = new File(photoDir(), `${id}.jpg`);
  await new File(uri).copy(dest);
  return dest.uri;
}

export function deletePhoto(uri: string | null): void {
  if (!uri) return;
  try {
    const file = new File(uri);
    if (file.exists) file.delete();
  } catch {
    // Photo déjà supprimée : rien à faire.
  }
}

/** Renvoie une URI affichable par <Image> (sur natif, l'URI enregistrée l'est déjà). */
export function usePhotoUri(uri: string | null | undefined): string | null {
  return uri ?? null;
}
