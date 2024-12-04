
//https://juejin.cn/post/6941023062833758222?searchId=20240307153707E2D586A117D6EF9B74EB

//await v
// await后面的v会被转化成Promise；
// 即使 v 是一个已经fulfilled的Promise，还是会新建一个Promsie，并在这个新的Promise中resolve(v);
// await v 之后的代码等于传入then函数的回调  完成新建Promise，恢复执行上下文

// 由上可对await v进行转换
// async function async1() {
//     await async2()
//     console.log('async1 end')
// }
// 等价于
// async function async1() {
//     new Promise(resolve=>resolve(async2())).then(()=>{
//         console.log('async1 end')
//     })
// }


console.log('script start')
async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
    return Promise.resolve().then(()=>{
        console.log('async2 end1')
    })
}
async1()

setTimeout(function() {
    console.log('setTimeout')
})

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
.then(function() {
    console.log('promise1')
})
.then(function() {
    console.log('promise2')
})
.then(function() {
    console.log('promise3')
})
Promise.resolve().then(function() {
    console.log('promise4')
})

console.log('script end')



// script start  

// async2 end

// Promise

// script end


// async2 end1

// promise1

// promise4

// promise2

// async1 end


// promise3

// setTimeout