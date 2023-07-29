import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function to save content to the "jate" IndexedDB
export const putDb = async (content) => {
  console.log("Putting data to the database");

  // Open the "jate" IndexedDB and wait until it's opened.
  const jateDb = await openDB("jate", 1);

  // Start a new read/write transaction on the "jate" object store.
  const tx = jateDb.transaction("jate", "readwrite");

  // Access the "jate" object store to store data.
  const store = tx.objectStore("jate");

  // Put the given content with an ID of 1 into the "jate" object store.
  const request = store.put({ id: 1, value: content });

  // Log the request object, which represents the put operation.
  console.log(request);

  // Await the result of the put operation.
  const result = await request;

  // Log a success message and return the saved value.
  console.log("Data saved to the database", result);
  return result?.value;
};

// Function to get all content from the "jate" IndexedDB
export const getDb = async () => {
  console.log("Getting data from the database");

  // Open the "jate" IndexedDB and wait until it's opened.
  const jateDb = await openDB("jate", 1);

  // Start a new read-only transaction on the "jate" object store.
  const tx = jateDb.transaction("jate", "readonly");

  // Access the "jate" object store to retrieve data.
  const store = tx.objectStore("jate");

  // Get all records from the "jate" object store.
  const request = store.getAll();

  // Await the result of the getAll() operation to retrieve data.
  const result = await request;

  // Return the retrieved data.
  return result;
};


initdb();
