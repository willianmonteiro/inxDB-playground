export interface StoreSnapshot {
  name: string;
  records: unknown[];
}

/**
 * Reads all stores and records through the raw IndexedDB API so the panel
 * shows the database exactly as the browser sees it. Opens a short-lived
 * connection to avoid blocking InxDB's version upgrades.
 */
export async function snapshotDatabase(name: string): Promise<StoreSnapshot[]> {
  const exists = (await indexedDB.databases()).some((info) => info.name === name);
  if (!exists) return [];

  const connection = await openDatabase(name);
  try {
    const storeNames = Array.from(connection.objectStoreNames);
    if (storeNames.length === 0) return [];

    const transaction = connection.transaction(storeNames, 'readonly');
    return await Promise.all(
      storeNames.map(async (storeName) => ({
        name: storeName,
        records: await promisify(transaction.objectStore(storeName).getAll()),
      })),
    );
  } finally {
    connection.close();
  }
}

function openDatabase(name: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function promisify<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
