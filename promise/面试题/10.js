let p = new Promise((resolve, reject) => {
    // resolve 的结果是一个promise  那么会让这个promise执行 将执行后的结果 再传递给resolve 或者reject中
  resolve(new Promise((resolve, reject)=>{
     resolve(100)
  }))
});
p.then(data=>{
    console.log(data)
})