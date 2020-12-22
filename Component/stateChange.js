var changes = [];
export default (f) => {
    changes.push(f);
}

export var applyFunctions = () => {
    for(let changeFunction of changes){
        changeFunction();
    }
}