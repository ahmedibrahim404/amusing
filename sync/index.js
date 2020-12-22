/*
    Created By: Ahmed Ibrahim
    Github: ahmedibrahim404
    Twitter: @ahmedie404
*/

/**
 * @param {string} tag 
 */
export function registerSync(tag){
    navigator.serviceWorker.ready.then((sw) => {
        return sw.sync.register(tag)
    })    
}