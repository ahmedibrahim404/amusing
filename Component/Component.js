/*
    Created By: Ahmed Ibrahim
    Github: ahmedibrahim404
    Twitter: @ahmedie404
*/

import { checkElements } from '../handleElements/checkElements';
import onStateChange, { applyFunctions } from './stateChange';

/** Class for a component */
export default class Component {

    constructor(){
        this.renderElements=[];
        onStateChange(() => {
            this.clearRenderedElements();
            if(this.render){
                const elements = this.render();
                for(var functionCreate of elements){
                    if(typeof functionCreate == 'function')
                        this.renderElements.push(functionCreate());
                }
            }
            this.checkElement();    
        })
    }


    /**
     * Represent the assets of current component
     * @method
     * @returns {object} the assets of component
     */

    getAssets(){
        return this.assets;
    }


    /**
     * Bind a key to value in current component
     * @param {string} prop 
     * @param {any} val 
     */

    setBind(prop,val){
        this[prop] = val;
    }

    /**
     * Clear rendered Elements ( element that was created using render() method )
     */
    clearRenderedElements(){
        
        // get the rendered elements
        for(var elementsGroup of this.renderElements){
            // check if element remove it
            if(elementsGroup.mainElement){
                elementsGroup.mainElement.parentNode.removeChild(elementsGroup.mainElement);
            } else if( elementsGroup.parentNode ){
                elementsGroup.parentNode.removeChild(elementsGroup.mainElement);
            } else {
                // if array of elements loop over it and remove it.
                for(var element of elementsGroup){    
                    if(typeof element == 'object' && element != null){
                        if(element.mainElement){
                            element.mainElement.parentNode.removeChild(element.mainElement);
                        } else if(element.parentNode) {
                            element.parentNode.removeChild(element);
                        }
                    }
                }        
            }
        }

        // empty render elements array.
        this.renderElements.splice(0, this.renderElements.length);
    }

    /**
     * check new elements that were created using render() method
     */

    checkElement(){

        // loop through elements;
        for(var elementsGroup of this.renderElements){
            // pass element and all its children to checkElements method.
            if(elementsGroup.mainElement){
                checkElements([ elementsGroup.mainElement, ...elementsGroup.mainElement.querySelectorAll('*') ], this, true);
            } else if(elementsGroup.parentNode){
                checkElements([ elementsGroup, ...elementsGroup.querySelectorAll('*') ], this, true);
            } else {
                for(var element of elementsGroup){
                    if(typeof element == 'object' && element != null){
                        var elm;
                        if(element.mainElement){
                            elm = element.mainElement;
                        } else if(element.parentNode) {
                            elm= element;
                        }
    
                        checkElements([ elm, ...elm.querySelectorAll('*') ], this, true);
    
                    }
                } 
            }
   
        }
    }

    /**
     * put/change value for any property(state) in current component.
     * @param {object} e 
     */
    setState(e){

        for(var i in e){
            this.state[i] = e[i];
        }

        // Apply State Change Functions.
        if(this.render)
            applyFunctions();
        
    }

}