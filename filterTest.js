var data = [{a:1,b:2},{a:1,b:2},{a:1,b:4},{a:1,b:3}];

function isValueTwo(elem) {
    return elem.b === 2;
}

const filtered = data.filter(isValueTwo); 

console.log(filtered);