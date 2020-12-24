# Amusing

Amusing is a client-side framework, which aims to build SPA supporting offline usage ( PWA )
It was built in 2018.

## New Features!

  - Building SPA with routing system.
  - PWA-Supporting which means it's installable, linkable, network independent, progressive, and more!
  - Supporting IndexedDB (IDB) for client-side storage
  - Supporting getting media (Mic and Camera), Pushing Notifications, ... etc.
  
### Tech
Amusing mainly depend on:
* [Webpack] - module bundler, bundle JavaScript files for usage in a browser, also used in streaming and running the development server.
* [Babel] - convert ECMAScript to compatible version of JavaScript, work with webpack to transpile JavaScript, HTML and CSS files

## Installation
Amusing requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install -g create-amusing-app
$ cd amusingproject
$ create-amusing-app <project-name>
```

For production environments...

```sh
$ npm run build-project
```

## Development
#### Notification
First, you should ask user for premission ( or can be done automatically when calling `displayFunction` )
Notice the `displayNotification` method is called on the service worker registration object. This creates the notification on the active service worker, so that events triggered by interactions with the notification are heard by the service worker.
The function takes 2 arguments, the options of the sent notification, and the head text of the notification `displayNotification(<options>, <head>)`
All Options can be found here
https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
```js
askForNotificationPremission();
options = {
    body:"Successfully! Created Notification, Hello Man!",
    lang:"ar-EG",
    dir:'ltr',
    actions:[
        { action:'yes', title:'Yes' },
        { action:'close', title:'Close' }
    ]
};
displayNotification(options, "Amusing App");
```
Actions can be handled using service worker in `notificationsClick` array.
For each click insert its resolve function there ( It will be like below ), and update the service worker.
```js
var notificationsClick = [
  {
      action:'yes',
      resolve:() => {
        console.log("Clicked")
        clients.openWindow('http://www.facebook.com/ahmedie404');      
      }
  },
  {
    action:'close',
    resolve:(notification) => {
      notification.close();
    }
  }
];
```



