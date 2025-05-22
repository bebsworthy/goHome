import { Station } from '../config/state';
import { openDB, IDBPDatabase } from 'idb';

// Database configuration
const DB_NAME = 'stations-db';
const DB_VERSION = 1;
const STORE_NAME = 'stations';

export class IndexedDBService {
  private static instance: IndexedDBService;
  private dbPromise: Promise<IDBPDatabase<unknown>>;

  private constructor() {
    this.dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Create stations store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          // Create index for searching by name
          store.createIndex('name', 'name', { unique: false });
          store.createIndex('code', 'code', { unique: true });
        }
      }
    });
  }

  public static getInstance(): IndexedDBService {
    if (!IndexedDBService.instance) {
      IndexedDBService.instance = new IndexedDBService();
    }
    return IndexedDBService.instance;
  }

  async cacheStations(stations: Station[]): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.clear();
    for (const station of stations) {
      await store.put(station);
    }
    await tx.done;
  }

  async getAllStations(): Promise<Station[]> {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE_NAME);
    const store = tx.objectStore(STORE_NAME);
    return store.getAll();
  }

  async searchStationsByName(name: string): Promise<Station[]> {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE_NAME);
    const store = tx.objectStore(STORE_NAME);
    const index = store.index('name');
    const range = IDBKeyRange.bound(name, name + '\uffff');
    return index.getAll(range);
  }

  async getStationById(id: string): Promise<Station | undefined> {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE_NAME);
    const store = tx.objectStore(STORE_NAME);
    return store.get(id);
  }

  async getStationByCode(code: string): Promise<Station | undefined> {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE_NAME);
    const store = tx.objectStore(STORE_NAME);
    const index = store.index('code');
    return index.get(code);
  }
}

// Export a singleton instance
export const indexedDBService = IndexedDBService.getInstance();
