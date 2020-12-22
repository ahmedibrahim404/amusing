/*
    Created By: Ahmed Ibrahim
    Github: ahmedibrahim404
    Twitter: @ahmedie404
*/

import renderComponent, { Components } from '../RenderComponent';
import checkQuotesAttributes from './functions/checkQuotesAttributes';

/**
 * this function is used to loop over all elements and check its attributes
 * @function
 * @param {object} elements 
 * @param {object} component 
 * @param {variable} dynamic ( This Variable is temporary to solve bug in check Dynamic Elements especially inputs )
 */
export function checkElements(elements, component, dynamic=false){

    for(var element of elements) {

        if(element == undefined){
            continue;
        }


        // this part is used to check if any of element attributes have a dynamic property        
        checkQuotesAttributes(element, component);
    
        // if it has "change" attribute ( for input elements. )
        
        if(element.getAttribute('change') != null){
            element.addEventListener('input', function(e){
                component[e.target.getAttribute('change')].call(component, e);
            })
        }
        
        // if it has "click" attribute ( for clickable elements ).
        if(element.getAttribute('click') !== null && element.getAttribute('click') !== false){
            element.addEventListener('click', function(e){
                var attrs=[];
                if(e.target.getAttribute('clickAttributes')){
                    attrs = e.target.getAttribute('clickAttributes').split(',');
                }
                component[e.target.getAttribute('click')].call(component, attrs)
            })
        }

        // if it has "cdModel" attribute then it binds a key to value in current component
        if(element.getAttribute('cdModel') !== null){
            element['cdModel'] = element.getAttribute('cdModel');
            element.addEventListener("input", function (e) {
                component.setBind( e.target['cdModel'] , e.target.value );
            });
            element.removeAttribute('cdModel');
        }

        // if you wanna refer to element in your component.
        if(element.getAttribute('cdElement') !== null){
            if(!element['cdElement']){
                element['cdElement'] = element.getAttribute('cdElement') 
                element.removeAttribute('cdElement');    
            }
            component.setBind(element['cdElement'], element);
        }
        
        // if element is ( component ), render it!
        var tag = element.tagName;
        for(var componentIndex in Components)
            if(Components[componentIndex].tag.toLowerCase() === tag.toLowerCase())
                renderComponent(new Components[componentIndex].component(), element, false, element.attributes);

    }
}