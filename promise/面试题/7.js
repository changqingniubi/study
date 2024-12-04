new Promise(function(resolve, reject) {
  resolve(1)
})
.then(x=>x+1)
.then(x=>{ throw new Error('error') })
.catch(()=>1) // 处理上一步的错误  并将自己的结果传给下一个then
.then(x=>x+1) //1=>1+1   =2
.then(x=>console.log(x))  // 2
.catch(e=>console.log(e)) // 不走catch