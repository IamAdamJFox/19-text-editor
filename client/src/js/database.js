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


  export const putDb = async (content) => {
    console.log("Put to the database");
  
    const jateDb = await openDB("jate", 1);//in this line we will open the "jate" IndexedDb, await will stop the code untill the result 
    //returns. the result will then be stored in "jateDb" 
    const tx = jateDb.transaction("jate", "readwrite");//in this line we will start a new read/write transaction on the "jate" object.
    //the transaction will the be stores in the "tx" constant
    const store = tx.objectStore("jate");//in this line we access the stored "object" and assign it to const store
    const request = store.put({ id: 1, value: content });//this line will put the value of id:1 into the saved object 
    console.log(request);
  
    const result = await request;
    console.log("data saved to the database", result);
    return result;
  };
  
  // TODO: Add logic for a method that gets all the content from the database
  //the following function will allow the opining of the jate database and retrieve all associated record 
  export const getDb = async () => {
    console.log("GET from the database");
  
    const jateDb = await openDB("jate", 1);//this line will allow the opening of "jate" the await keyword means the code will
    //pause untill the database has been opened. the number 1 refers to the version of the object "jate"
    const tx = jateDb.transaction("jate", "readonly");//this line will open a transaction of "jate" in read only
    const store = tx.objectStore("jate");
    const request = store.getAll();
  }

initdb();
