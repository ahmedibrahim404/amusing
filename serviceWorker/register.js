/*
    Created By: Ahmed Ibrahim
    Github: ahmedibrahim404
    Twitter: @ahmedie404
*/

export default () => {
    // Check if Browser Support ( Service Worker )
    if('serviceWorker' in navigator){
        // Register Service Worker
        navigator.serviceWorker.register('/sw.js').catch((err) => console.log('Error!'))
    }
}