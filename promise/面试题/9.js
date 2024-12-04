let p =new Promise((resolve, reject) => {
  resolve()
});

let promise2=p.then(function (){
    return new Promise((resolve, reject) => {
        //resolve(100)
        // 如果 then的 resolve 里面返回一个 promise，那么 promise2 就会等这个 promise 结束才会继续执行
        // 内部 会 递归解析出  里面的 promise 的返回值  100
        resolve(new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(100)
            }, 1000)
        }))
    })
})

promise2.then(function (value) {
    console.log(value)
})