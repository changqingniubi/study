
//https://blog.poetries.top/browser-working-principle/guide/part4/lesson20.html#async-await
async function foo() {
    console.log(1)
    let a = await 100
    console.log(a)
    console.log(2)
}
console.log(0)
foo()
console.log(3)


//0 1 3 100 2

