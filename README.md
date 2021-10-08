# Amusing

Amusing is a mini client-side framework, which aims to build SPA supporting offline usage ( PWA )
It was built in 2018

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
#### Controlling Elements
Navigate to your Component, Components are mainly divided into 3 parts JS, HTML, and CSS
In JS file you will find your component, there you can put your function
##### 1- Data-binding
Suppose we want to bind automatically keeps your page up-to-date based on the state, to state something like value of an input, ..etc .
```js
// Inside your Component JS file
class Input {
    constructor(){
        .
        .
        .
        this.state={
            message:"Initial value"
        }
    }
    
    inputChange(e){
        this.setState({
            message:e.value
        });
    }
    
}


```
```html
<input type="input" value={message} change="inputChange"/>
<label>{message}</label>
```
##### 2- Handing Elements
- Click Event
- Change Event

Click Event: Can be assigned for elements which can be clicked as button,...etc .
```js
// Inside your Component JS file
    clickFunc(e){
        console.log("CLICKED")
    }
```
```html
<button click="clickFunc">Click Here</button>
```
Change Event: Can be assigned for elements whose value changes as input,...etc .
```js
// Inside your Component JS file
    changeFunc(e){
        console.log("NEW VALUE IS ", e.value);
    }
```
```html
<input type="text" change="changeFunc" />
```
#### Routing System
First you need to call function ```initRouter``` into your main file
```js
import Router from 'amusing/router';
Router.initRouter();
```
To assign a specific router to a component use function ```add```
```js
// import AuthComponent
Router.add('/auth', AuthComponent); // example
```
You can also do this using ```addAll``` which takes multiple routes
```js
Router.addAll([
    { route:'/authentication', component:AuthComponent },
    { route:'/login', component:LoginComponent },
    { route:'/register', component:registerComponent },
    { route:'/home', component:HomeComponent },
    { route:'*', component:ErrorComponent }
]);
```
In the previous example '*' route means anything except for the routes provided


