let num = 266219;
let numStr = num.toString();
let product = parseInt(numStr[0], 10);
let numArr = numStr.split('');
for (let i=0; i< numStr.length; i++){
    num = parseInt(numArr[i], 10);
    product *= num;
}
console.log(product);

let cuboid = product ** 3;
console.log(cuboid.toString().substr(0, 2));
