export function isClass(component) {
    return component.prototype.__proto__.getAssets ? true : false;
}

export function addRoute(route, component, obj){
    if(route[0] != '/')
        route = '/'+route;

    if(route == '/*'){
        obj.error = component;
        return;
    }
    // check if route and component
    if(route && component){
        var routeAr = route.split('/');
        var param = 1;
        // loop over our router parts and check if is paramerter.
        for(var str in routeAr){
            if(routeAr[str].match(/:\w+/)){
                routeAr[str] = routeAr[str].replace(/:\w+/, `param_${param}`)
                param++;
            }
        }
        routeAr = routeAr.toString().replace(/,/g,'/');
        // push new route to our routes array.
        obj.routes.push({
            route: routeAr,
            component:isClass(component) ? component : component()
        });
    }
}