import onStateChange from '../../Component/stateChange';

export default function check(element, component){
    // store element attributes
    var attributesOfElement=[];
    for (var i = 0, atts = element.attributes, n = atts.length; i < n; i++){
        attributesOfElement.push(atts[i].nodeName);
    }

    // loop over attributes.
    if(attributesOfElement && attributesOfElement.length > 0){
        for(var attr of attributesOfElement){
            var attribute = element.getAttribute(attr);
            // if element has attribute that start with "{" and end with "}" ( {value} )
            if(attribute && attribute[0] == '{' && attribute[attribute.length - 1] == '}'){
                attribute = attribute.split('{').pop().split('}').shift();
                if(attribute){
                    // change it to the value!
                    if(!component[attribute]) throw Error("NO value was found!");
                    element.setAttribute(attr, component[attribute]);
                    var data= [element, attr, attribute];
                    onStateChange(() => {
                        data[0].setAttribute(data[1], component[data[2]]);
                    });
                }
            }
        }
    }
}