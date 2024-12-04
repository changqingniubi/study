setTimeout(() => {
    console.log('setTimeout1');//s1
    Promise.resolve().then(() => console.log('promise1'))//p1
}, 25);
setTimeout(() => {
    console.log('setTimeout2');//s2
    Promise.resolve().then(() => console.log('promise2'))//p2
}, 25);
setImmediate(() => {
    console.log('setImmediate1');//i1
    Promise.resolve().then(() => console.log('promise3'))//p3
});
process.nextTick(() => {
    console.log('nextTick1');//n1
    Promise.resolve().then(() => console.log('promise4'))//p4
    process.nextTick(() => {
        console.log('nextTick2');//n2
        Promise.resolve().then(() => console.log('promise5'))//p5
        process.nextTick(() => {
            console.log('nextTick3');//n3
        });
    });
});//nextTick1 nextTick2 nextTick3 promise4 promise5 setTimeout1 promise1 
//setTimeout2 promise2 setImmediate1 promise3
//setTimeout宏任务  setTimeout1 setTimeout2
//setImmediate宏任务 setImmediate1
//nextTick队列 nextTick
//微任务队列 promise