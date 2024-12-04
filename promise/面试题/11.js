
//finally 的特点 无论如何都执行  但是如果返回的是promise 则会等到promise执行完才执行

new Promise(function(resolve, reject) {
    reject(100)
}).finally(()=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(200)
            console.log('finally')
        }, 3000)
    })
}).then(data=>{console.log(data)}, error=>{console.log(error)})
    

// finally
//100




