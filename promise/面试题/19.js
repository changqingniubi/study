async function async1 (){
    console.log(1)

    // let result = await async2()
    // console.log(3)

    new Promise(resolve => resolve(async2())).then(res => {console.log(3)})
}
async function async2 (){
    console.log(2)
}
setTimeout(()=> {
    console.log(5)
})
// 注意这里异步的执行顺序
Promise.resolve().then(res => {
    console.log(7)
})
async1()
Promise.resolve().then(res => {
    console.log(4)
})
console.log(6)


//1 2 6 7 3 4  5
