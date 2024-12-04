//https://www.zhihu.com/question/453677175
//就是创建 NewPromiseResolveThenableJob，多了一个 microtask；运行 NewPromiseResolveThenableJob 又多了一个 microtask，这两个 microtask 不执行 JS 代码。

//最终现象是:若then方法的参数回调函数的返回值为Promise对象，则会影响then方法返回值Promise对象的pending状态延迟2个微任务后改变。
Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})

//转化为
// Promise.resolve().then(() => {
//     console.log(0);
//     return 4;
// })
// .then()
// .then()
// .then((res) => {
//     console.log(res)
// })

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})

// 0
// 1
// 2
// 3
// 4
// 5
// 6