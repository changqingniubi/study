console.log('1');

setTimeout(function () {
    console.log('t1');
}, 0);

Promise.resolve().then(function () {
    console.log('p1');
}).then(function () {
    console.log('p2');
});

console.log('2');


// 1  2 p1  p2  t1