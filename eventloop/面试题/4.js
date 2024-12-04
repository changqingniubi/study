console.log(1);
setTimeout(() => {
    console.log(2);
}, 10);
new Promise(function (resolve) {
    console.log(3);
    resolve();
    console.log(4);
}).then(function () {
    console.log(5);
});
console.log(6);
requestIdleCallback(() => console.log(7));
requestAnimationFrame(() => console.log(8));




//1  3 4 6 5  8 7  2