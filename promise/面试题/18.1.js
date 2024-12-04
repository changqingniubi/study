
//new Promise(resolve => resolve(v))
//处理v参数分析有以下两种情况

// 1.参数不是具有then方法的对象，或者不是对象，再或者不传参数,直接返回一个resolved状态的 Promise 对象
// 2. 参数是具有then方法的对象或直接是一个Promise对象
//   通过NewPromiseResolveThenableJob()将v（thenable）包装成Promise 对象，这个过程是一个微任务，会加入微任务队列，等到下次循环发现v（thenable）是一个resolved状态的Promise，然后会执行v（thenable）对象的then方法，回调加入微任务队列等待执行。（不管v是Promise还是非Promise的thenable对象都会进行一次包装）



let v = new Promise(resolve => {
    console.log("v-begin");
    resolve("v-then");
});
// 1、new Promise(resolve => resolve(v))
//new Promise(resolve => resolve(v))
// 2、Promise.resolve(v)
 Promise.resolve(v)
.then((v) => {
    console.log(v)
});
new Promise(resolve => {
    console.log(1);
    resolve();
})
.then(() => {
    console.log(2);
})
.then(() => {
    console.log(3);
})
.then(() => {
    console.log(4);
});

/**
// 1、使用new Promise(resolve => resolve(v))输出
v-begin
1
2
3
v-then
4
按照输出可以看出微任务队列如下：
[ console.log(2) -> console.log(3) -> console.log(v) -> console.log(4) ]
*/
/**
// 2、使用Promise.resolve(v)输出
v-begin
1
v-then
2
3
4
按照输出可以看出微任务队列如下：
[ console.log(v) -> console.log(2) -> console.log(3) -> console.log(4) ]
*/

