// Version web : les photos sont stockées dans IndexedDB.
// localStorage est limité à environ 5 Mo, ce qui ne suffirait que pour une vingtaine de photos.
// Les observations référencent alors leur photo par « idb:<id> ».
import { useEffect, useState } from 'react';

const DB_NAME = 'anidex';
const STORE = 'photos';
const PREFIX = 'idb:';

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(STORE);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  return dbPromise;
}

async function run<T>(mode: IDBTransactionMode, op: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = op(db.transaction(STORE, mode).objectStore(STORE));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function persistPhoto(uri: string, id: string, base64?: string | null): Promise<string> {
  const source = base64 ? `data:image/jpeg;base64,${base64}` : uri;
  const blob = await (await fetch(source)).blob();
  await run('readwrite', (s) => s.put(blob, id));
  // Demande au navigateur de ne pas effacer ces données quand l'espace disque manque.
  void navigator.storage?.persist?.().catch(() => undefined);
  return `${PREFIX}${id}`;
}

export function deletePhoto(uri: string | null): void {
  if (!uri?.startsWith(PREFIX)) return;
  const id = uri.slice(PREFIX.length);
  const cached = objectUrls.get(id);
  if (cached) {
    URL.revokeObjectURL(cached);
    objectUrls.delete(id);
  }
  void run('readwrite', (s) => s.delete(id)).catch(() => undefined);
}

// Cache des URL « blob: » déjà créées, partagé entre tous les écrans.
const objectUrls = new Map<string, string>();

async function resolve(uri: string): Promise<string | null> {
  if (!uri.startsWith(PREFIX)) return uri;
  const id = uri.slice(PREFIX.length);
  const cached = objectUrls.get(id);
  if (cached) return cached;
  const blob = await run<Blob | undefined>('readonly', (s) => s.get(id) as IDBRequest<Blob | undefined>);
  if (!blob) return null;
  const url = URL.createObjectURL(blob);
  objectUrls.set(id, url);
  return url;
}

/** Transforme une référence « idb:… » en URL affichable par <Image>. */
export function usePhotoUri(uri: string | null | undefined): string | null {
  const [entry, setEntry] = useState<{ key: string; url: string | null } | null>(null);

  useEffect(() => {
    if (!uri?.startsWith(PREFIX)) return;
    let alive = true;
    resolve(uri)
      .then((url) => alive && setEntry({ key: uri, url }))
      .catch(() => alive && setEntry({ key: uri, url: null }));
    return () => {
      alive = false;
    };
  }, [uri]);

  if (!uri) return null;
  if (!uri.startsWith(PREFIX)) return uri;
  const cached = objectUrls.get(uri.slice(PREFIX.length));
  if (cached) return cached;
  return entry?.key === uri ? entry.url : null;
}
