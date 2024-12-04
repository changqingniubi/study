
/* let timeEnd = Date.now() + 2;
while (Date.now() < timeEnd) {

} */
let fs = require('fs');
fs.readFile('./13.js', () => {
    setTimeout(() => {
        console.log('setTimeout');
    }, 1);//[1,2的23次方-1]
    setImmediate(() => {
        console.log('setImmediate');
    });
});