/*
    Created By: Ahmed Ibrahim
    Github: ahmedibrahim404
    Twitter: @ahmedie404
*/

var dbPromise = false;
var idb = require('./idb');

/**
 * Initialize IndexedDB ( must have keyPath property )
 * @function
 */

export let initIDB = (storeName, stores) => {
    if(dbPromise == false){
        dbPromise = idb.open(storeName, 1, function (db) {
            for(var store of stores){
                if(store.storeName && store.keyPath){
                    if (!db.objectStoreNames.contains(store.storeName)) {
                        db.createObjectStore(store.storeName, { keyPath:store.keyPath });
                    }
                }
            }
        });    
    } else {
        return new Error('IDB Already initialized!')
    } 
}
  

/**
 * write data to indexedDB
 * @param {string} st ( the table in your indexedDB )
 * @param {any} data ( the data u wanna write )
 */
export function writeData(st, data){
    return dbPromise
        .then(function(db) {
            var tx = db.transaction(st, 'readwrite');
            var store = tx.objectStore(st);
            store.put(data);
            return tx.complete;
        });
}

/**
 * read all data from table in indexedDB
 * @param {string} st ( the table in your indexedDB )
 */

export function readAllData(st){
    return dbPromise
        .then(function(db) {
            var tx = db.transaction(st, 'readonly');
            var store = tx.objectStore(st);
            return store.getAll();
        });
}

/**
 * clear all data from table in indexedDB
 * @param {string} st ( the table in your indexedDB )
 */
export function clearAllData(st){
    return dbPromise.then(function(db){
        var tx = db.transaction(st, 'readwrite');
        var store = tx.objectStore(st);
        store.clear();
        return tx.complete;
    })
}

/**
 * read all data from table in indexedDB
 * @param {string} st ( the table in your indexedDB )
 * @param {id} id ( id of item in indexedDB )
 */
export function clearItemFromData(st,id){
    return dbPromise.then(function(db){
        var tx = db.transaction(st, 'readwrite');
        var store = tx.objectStore(st);
        store.delete(id);
        return tx.complete;
    })
}

