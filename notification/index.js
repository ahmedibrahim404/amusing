/*
    Created By: Ahmed Ibrahim
    Github: ahmedibrahim404
    Twitter: @ahmedie404
*/


/**
 * Ask for Notification Premission.
 * @function
 */
export function askForNotificationPremission(){
    Notification.requestPermission(function(result){
      if(result == 'granted'){
        return true;
      } else {
        return false;
      }
    })  
}
  
/**
 * Display Notification
 * @param {object} options ( you can see it here: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification ) 
 * @param {string} headString ( head string to see in notification )
 */
export function displayNotification(options, headString){
    Notification.requestPermission(function(result){
      if(result == 'granted'){
        navigator.serviceWorker.ready.then(function(sw){
          sw.showNotification(headString, options);
        })  
      } else {
        return new Error('no Permission')
      }
    })
}
