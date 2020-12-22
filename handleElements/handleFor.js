/*
    Created By: Ahmed Ibrahim
    Github: ahmedibrahim404
    Twitter: @ahmedie404
*/


class createElement {
    constructor(tag, attr, children, inside=null, total=1){
        
        var ntotal=total;

        // Create Main Element
        this.mainElement = document.createElement(tag);


        // Set Element Attributes
        for(var prop in attr){
            if(!attr[prop] == false)
                this.mainElement.setAttribute(prop, attr[prop]);

            if(prop == 'style'){

                for(var styleProp in attr[prop]){
                    this.mainElement.style[styleProp] = attr[prop][styleProp];
                }

            }
        }
        
        // Create Element Children
        if(typeof children == 'string'){
            var text = document.createTextNode(children);
            this.mainElement.appendChild(text)
        } else
            // If Children are Elements ( NOT Text )
            for(var child in children){
                if(typeof children[child] == 'function'){
                    ntotal++;
                    // Call the Function and Put ( this.mainElement ) as Parent for the Element
                    children[child].bind(null, this.mainElement, ntotal, this.firstMain).call()
                }
                if(typeof children[child] == 'string'){
                    var text = document.createTextNode(children[child]);
                    this.mainElement.appendChild(text)        
                }
            }

        // Check if Element has Parent Element and Put it in
        if(inside){
            inside.appendChild(this.mainElement)
        }
        

        // Check If All Elements is ready then Render it

        if(this.mainElement.querySelectorAll('*').length == ntotal){
            document.querySelector('div.e').appendChild(this.mainElement)
            return this.mainElement;
        }

    }


}

// Function to Create new Class
export function createElement(tag, attr, children, inside=null, total){
    return new createElement(tag, attr, children, inside, total)
}


// Each Class ( For iterate and Rendering )
class each {

    constructor(array, callback, elementsCreated){

        // Check if there is Previous Elements Created OR Create a empty Array.
        this.elementsCreated = elementsCreated || []

        // Loop through the Array and Call callback Function
        for(var i in array){
            var elem = callback.bind(null, array[i], i).call();
            
            // Add Element to the Elements Created
            this.elementsCreated.push(elem);
        }

        return this.elementsCreated;
    }

}

export function each(array, callback){
    return new each(array, callback)
}