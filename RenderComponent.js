/*
    Created By: Ahmed Ibrahim
    Github: ahmedibrahim404
    Twitter: @ahmedie404
*/

import { checkElements } from './handleElements/checkElements';
var Components = [];

/**
 * Register components
 * @param {object} components 
 */

export function registerComponents(components){
    Components = [ ... components ];
}


/**
 * Render Component
 * @function
 * @param {object} component ( Component to Render ) 
 * @param {element} elem ( Element to render in )
 * @param {boolean} isReload ( if reload or not )
 * @param {object} props ( props to be in component )
 */
export default function renderComponent(component, elem, isReload=false, props){

    if(props){
        var newProps={};
        for(var i in props){
            if(props[i].name != undefined && props[i].value != undefined){
                newProps[props[i].name] = props[i].value
            }
        }
        component.props = newProps;
    }


    if(component){
        var assets = component.getAssets();

        // to make it asynchronous function.
        setTimeout(() => {
            if(component.componentBeforeRender)
                component.componentBeforeRender();
        }, 10);

        if(assets.template && assets.template != ''){
            var contain = document.querySelector('router-component');
        
            var isParent = document.querySelector(`div#${assets.tag}`);
            if(isParent){
                assets.tag += Math.ceil(Math.random()*1500)
            }
        
            if(isReload == true){
                contain.innerHTML = ''
            }


            if(elem && elem!==null){
                elem.insertAdjacentHTML('beforeend',`<div id="${assets.tag}">${assets.template}</div>`);
            } else {
                contain.insertAdjacentHTML('beforeend',`<div id="${assets.tag}">${assets.template}</div>`);
            }

            var elements = document.getElementById(assets.tag).querySelectorAll('*');
            checkElements(elements, component);

        }

        if(component.render){
            var functionRendering = component.render();
            for(var render of functionRendering){
                if(typeof render == 'function')
                    component.renderElements.push(render())
            }
            component.checkElement();
        }


        if(component.componentHasRendered)
            component.componentHasRendered();
            
    }
}

export { Components };
