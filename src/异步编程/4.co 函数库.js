// https://github.com/tj/co

//用于 Generator 函数的自动执行。

//比如，有一个 Generator 函数，用于依次读取两个文件。

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

//co 函数库可以让你不用编写 Generator 函数的执行器。

var co = require('co');
co(gen);

//co 函数返回一个 Promise 对象，因此可以用 then 方法添加回调函数。
co(gen).then(function (){
  console.log('Generator 函数执行完成');
})

//co 函数库的原理

//为什么 co 可以自动执行 Generator 函数？
//前面文章说过，Generator 函数就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。
//两种方法可以做到这一点。
//(1）回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
//（2）Promise 对象。将异步操作包装成 Promise 对象，用 then 方法交回执行权。

//co 函数库其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个库。使用 co 的前提条件是，Generator 函数的 yield 命令后面，只能是 Thunk 函数或 Promise 对象。



//下面来看，基于 Promise 对象的自动执行器

//还是沿用上面的例子。首先，把 fs 模块的 readFile 方法包装成一个 Promise 对象

var fs = require('fs');
var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
//然后，手动执行上面的 Generator 函数。
var g = gen();
g.next().value.then(function(data){
  g.next(data).value.then(function(data){
    g.next(data);
  });
})

// 手动执行其实就是用 then 方法，层层添加回调函数。理解了这一点，就可以写出一个自动执行器。

function run(gen){
  var g = gen();
  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }
  next();
}
run(gen);

//上面代码中，只要 Generator 函数还没执行到最后一步，next 函数就调用自身，以此实现自动执行。

//并发的异步操作

//co 支持并发的异步操作，即允许某些操作同时进行，等到它们全部完成，才进行下一步。
//这时，要把并发的操作都放在数组或对象里面。

// 数组的写法
co(function* () {
  var res = yield [
    Promise.resolve(1),
    Promise.resolve(2)
  ];
  console.log(res); 
}).catch(onerror);

// 对象的写法
co(function* () {
  var res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2),
  };
  console.log(res); 
}).catch(onerror);

