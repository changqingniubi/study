console.log('start')
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
console.log('end')


// start  
// async2 end
//end
// async2 end1
// async1 end