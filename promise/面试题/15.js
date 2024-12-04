
//https://www.zhihu.com/question/430549238


//resolve 的参数为 Promise 时，要额外消耗两个 microtask，第一个 microtask 是规范要求的 PromiseResolveThenableJob；第二个 microtask 的功能是把 resolvedPromise 的状态同步给 p0。
//推迟两个时序（即先打印promise2）只是因为resolve一个promise时，v8会创建一个promiseResolveThenableJob，这又是一个microtask，消耗一个then时序。
//另外不仅仅是then参数回调函数的返回值为Promise对象会开启两次微任务，对于excutor执行器的形参resolve，reject函数，如果它们也接受道一个Promise对象为入参，则同样会开启两次微任务，
new Promise(resolve => {
    let resolvedPromise = Promise.resolve()
    resolve(resolvedPromise)
}).then(() => {
    console.log('resolvePromise resolved')
})

Promise.resolve()
   .then(() => { console.log('promise1') })
   .then(() => { console.log('promise2') })
   .then(() => { console.log('promise3') })


// promise1
// promise2
// resolvePromise resolved
// promise3