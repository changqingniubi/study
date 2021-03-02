promises-aplus-tests 测试手写promise过程

```javascript
// 安装promise测试插件
npm i promises-aplus-tests -D
```

```javascript
// package.json文件配置下脚本执行部分
"scripts": {
    "test": "promises-aplus-tests ./promise/promise.js"
  },
```
```javascript
//在手写的promiseXXX.js添加以下代码，其中改成自己定义promise.js名字
Promise.defer = Promise.deferred = function(){
  let dfd = {};
  dfd.promise = new PromiseKB((resolve, reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject;
  });
  return dfd;
}
module.exports =  Promise
```
```javascript
//最后测试文件
npm run test
```