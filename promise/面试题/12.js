// 如何终止promise  chain? 返回一个等待的promise
new Promise(function(resolve, reject) {
    reject(100)
}).finally(()=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('finally')
        }, 3000)
    })
}).then(data=>{console.log(data)}, error=>{console.log(error)})
    

// --------------------------

let promise = new Promise(function(resolve, reject) {
    resolve()
});
promise.then(() => {
    //走到这 后面的then不要执行了
    console.log(1);
    return new Promise((resolve, reject) => {})
}).then(() => {
    console.log(2);    
});



