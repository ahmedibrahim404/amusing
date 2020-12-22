/*
    Created By: Ahmed Ibrahim
    Github: ahmedibrahim404
    Twitter: @ahmedie404
*/
import { addRoute } from './functions';

import { renderComponent } from '../index';
var Router = {
    routes:[],
    init:false,
    // Initialize Router.
    initRouter:function(){
        this.init = true;
    },
    // Add new Route with Component.
    add:function(route, component){
        addRoute(route, component, this);
        this.check();
    },
    addAll:function(arrayComp){
        for(let component of arrayComp){
            addRoute(component.route, component.component, this);
        }
        this.check();
    },
    // check if route exists and render its component. 
    check:function(){
        if(this.init == true){
            var route = window.location.pathname;
            // if the last character is "/" delete it.
            while(route[route.length-1] == '/'){
                route = route.slice(0,-1)
            }

            // loop over routes
            for(var routeObj of this.routes){
                
                // check if the route is exists.
                if(routeObj.route === route){
                    // render it.
                    renderComponent(new routeObj.component, null, true);
                    return true;
                } else {
                    var routeArr = routeObj.route.split('/');
                    var currentRouteArr = route.split('/');
                    for(var routeStr in routeArr){
                        for(var curretRouteStr in currentRouteArr){
                            if(routeArr[routeStr] == currentRouteArr[curretRouteStr]){
                            } else {
                                if(routeArr[routeStr] && routeArr[routeStr].match(/param_\d/)){
                                    routeArr[routeStr] = routeArr[routeStr].replace(/param_\d/g, currentRouteArr[routeStr]);
                                }
                            }
                        }
                    }
                    if(routeArr.toString() === currentRouteArr.toString()){
                        renderComponent(new routeObj.component, null, true);
                        return true;
                    }
    
                }
            }
        }

        if(this.error)
            renderComponent(new this.error, null, true);
        else
            return false;
    },
    isInArray:function(arr,elm){
        for(var element of arr){
            if(element == elm){
                return true;
            }
        }
        return false;   
    },

    // check if two routes are equivalent.
    validate:function(arr1,arr2){
        if(this.init == true){
            var success = false;
            if(arr1.length === arr2.length){
                for(var item in arr1){
                    
                    if(arr1[item].match(/param_\d/) == false && arr1[item] === arr2[item]){
                        success = true;
                    } else {
                        if(this.isInArray(arr2, arr1[item])){
                            success = true;
                        } else {
                            if(arr1[item].match(/param_\d/)){
                                success = true;
                            } else {
                                return false;
                            }
                        }
                    }
                }
            } else {
                return false;
            }
            return success;
        }
    },

    // get the parameters of route.
    params:function(){
        if(this.init == true){
            var checked = [];
            var route = window.location.pathname;
            route = route.replace(/\\[^\\]+$/,"");
            if(route[route.length-1] == '/'){
                route = route.slice(0,-1)
            }
            var params = [];
            if(this.check()){
                for(var routeObj of this.routes){
                        
                    var routeArr = routeObj.route.split('/');
                    var currentRouteArr = route.split('/');
                    var routesDid = [];

                    if(routeArr.length === currentRouteArr.length && this.isInArray(routesDid, routeObj.route) == false && this.validate(routeArr, currentRouteArr) == true){
                        routesDid.push(routeObj.route)
                        

                        for(var routeStr in routeArr){
                            for(var curretRouteStr in currentRouteArr){
                                if(routeArr[curretRouteStr] && routeArr[curretRouteStr].match(/param_\d/)){
                                    routeArr[curretRouteStr] = routeArr[curretRouteStr].replace(/param_\d/g, currentRouteArr[curretRouteStr]);
                                    params.push(routeArr[curretRouteStr]);
                                }
                            }
                        }
                    } else {
                        checked.push(routeObj.route);
                    }    
                        
                }
                return params; 
            }
        }
    },
    // navigate to route.
    navigate:function(url) {
        if( window.location.pathname !== url ){
            if(this.init == true){
                window.history.pushState({urlPath:url},"",url)
            }
        }
        this.check();
    }
}

window.onpopstate = function() {
    Router.check();
};


export default Router;

