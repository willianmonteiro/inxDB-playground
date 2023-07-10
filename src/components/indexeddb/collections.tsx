import { useEffect, useState } from 'react';
import Documents from './documents';

export default function Collections() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [collections, setCollections] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const request = openIndexedDBConnection();
    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;
      const storeNames = db.objectStoreNames;
      const collections = Array.from(storeNames) as string[];
      setCollections(collections);
    };
  }, []);

  function handleSelectCollection(collection: string) {
    setActiveTab(collection);
    setData([]);

    const request = openIndexedDBConnection();
    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction(collection, 'readonly');
      const objectStore = transaction.objectStore(collection);
      const getDataRequest = objectStore.getAll();
      getDataRequest.onsuccess = () => {
        setData(getDataRequest.result);
      };
    };
  };

  return (
    <div>
      <div className="space-x-2">
        {collections.map((collection, index) => (
          <button
            key={index}
            className={`${
              collection === activeTab 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-300 text-gray-700'
            } py-2 px-4 rounded`}
            onClick={() => handleSelectCollection(collection)}
          >
            {collection}
          </button>
        ))}
      </div>

      {activeTab && <Documents data={data} />}
    </div>
  );
};

function openIndexedDBConnection() {
  // Open a connection to the IndexedDB database
  return indexedDB.open('inxdb-playground');
}
