
Promise.resolve().then(() => {
    console.log(1);
    return Promise.resolve(Promise.resolve('hello')) // 4次微任务
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(4);
}).then(() => {
    console.log(5);
}).then(() => {
    console.log(6);
})

// 1
// 2
// 3
// 4
// hello
// 5
// 6