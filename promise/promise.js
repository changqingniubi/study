var PENDING = 'pending';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';

function Promise(execute) {
  var _this = this;
  // 初始状态
  this.state = PENDING;
  // 成功后必须有一个终值
  this.value = undefined;
  // 失败后必须有一个据因
  this.reason = undefined;
  // 成功时的回调函数集
  this.onFulfilledFn = [];
  // 失败的回调函数集
  this.onRejectedFn = [];
  function resolve(value) {
    setTimeout(function() {
        if (_this.state === PENDING) {
            _this.state = FULFILLED;
            _this.value = value;
            // 执行回调函数集中的函数
            _this.onFulfilledFn.forEach(function(fn) {
                fn(_this.value);
            })
        }
    })
  }
  function reject(reason) {
      setTimeout(function() {
          if (_this.state === PENDING) {
              _this.state = REJECTED;
              _this.reason = reason;
              // 执行回调函数集中的函数
              _this.onRejectedFn.forEach(function(fn) {
                  fn(_this.reason);
              })
          }
      })
  }
  try {
      execute(resolve, reject);
  } catch (e) {
      reject(e);
  }
}
//then方法必须返回一个promise对象
// onFulfilled和onRejected不能同步调用，必须异步调用
// 实现链式调用的写法。还需要将这个promise2返回的值传递到下一个then中去。
//如果在第一个then方法中return了一个值，这个值就称为x。需要对x进行判断，从而根据x的值来改变promise2的状态，而判断x的函数叫做resolvePromise。
Promise.prototype.then = function(onFulfilled, onRejected) {
  var _this = this;
  // 如果onFulfilled不是函数，其必须被忽略
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(x) { return x; }
  // 如果onRejected不是函数，其必须被忽略
  onRejected = typeof onRejected === 'function' ? onRejected : function(e) { throw e; }
  
  var promise2=new Promise(function (resolve, reject) {
    if (_this.state === FULFILLED) {
      // 规定onFulfilled或onRejected不能同步被调用，必须异步调用。
      setTimeout(function() {
        try {
           var x = onFulfilled(_this.value);
           // 根据x的值修改promise2的状态
           resolvePromise(promise2, x, resolve, reject);
        } catch (reason) {
            reject(reason);
        }
      });
    }
    if (_this.state === REJECTED) {
      setTimeout(function() {
        try {
            var x = onRejected(_this.reason);
            // 根据x的值修改promise2的状态
           resolvePromise(promise2, x, resolve, reject);
        } catch (reason) {
            reject(reason);
        }
      });
    }
    if (_this.state === PENDING) {
       // onFulfilled传入到成功时的回调函数集
      _this.onFulfilledFn.push(function() {
          setTimeout(function(){
            try {
              var x =onFulfilled(_this.value);
              // 根据x的值修改promise2的状态
              resolvePromise(promise2, x, resolve, reject);
            } catch (reason) {
                reject(reason);
            }
          })
      })
      // onRejectedFail传入到失败时的回调函数集
      _this.onRejectedFn.push(function() {
          setTimeout(function(){
            try {
              var x =onRejected(_this.reason);
              // 根据x的值修改promise2的状态
              resolvePromise(promise2, x, resolve, reject);
            } catch (reason) {
              reject(reason);
            }
          })
      });
    }
  })
  return promise2;
}

// 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)
// 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e
// 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
// 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的拒因
function resolvePromise(promise2, x,resolve, reject) {
  //1.x 等于 promise2 TypeError 错误
  // 此时相当于 promise.then 之后 return 了自己，因为 then 会等待 return 后的 Promise，导致自己等待自己，一直处于等待。。
  if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise!'));
  }
  //2.x 是 Promise 的实例
  //如果 x 处于待定状态，Promise 会继续等待直到 x 兑现或拒绝，否则根据 x 的状态兑现/拒绝 Promise。
  //我们需要调用 Promise 在构造时的函数 resolve() 和 reject() 来改变 Promise 的状态。
  // 如果 x 为 Promise ，则使 promise 接受 x 的状态
  // 也就是继续执行x，如果执行的时候拿到一个y，还要继续解析y
  if (x instanceof Promise) {
    if (x.state === FULFILLED) {
        resolve(x.value);
    } else if (x.state === REJECTED) {
        reject(x.reason);
    } else {
        x.then(function(y) {
            resolvePromise(promise2, y, resolve, reject);
        }, reject);
    }
  }
  //3.x 是对象或函数
  //取出 x.then 并调用，调用时将 this 指向 x，将 then 回调函数中得到的结果 y 传入新的 Promise 解决过程中，递归调用。
  //如果执行报错，则将以对应的失败原因拒绝 Promise。
  //x 可能是一个 thenable 而非真正的 Promise。
  //需要设置一个变量 executed 避免重复调用。
  // 防止多次调用
  var executed;
  if ((x !== null) && ((typeof x === 'object' || (typeof x === 'function')))) {
    try {
        // 把 x.then 赋值给 then
        var then = x.then;
        // 如果then是函数，就默认是x是promise了
        // 如果 resolvePromise 和 rejectPromise 均被调用，
        // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
        // 实现这条需要前面加一个变量executed;
        if (typeof then === 'function') {
            then.call(x, function(y) {
                // 成功和失败只能调用一个
                if (executed) return;
                executed = true;
                // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
                return resolvePromise(promise2, y, resolve, reject);
            }, function (r) {  // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
                if (executed) return;
                executed = true;
                // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
                reject(r);
            }) 
        } else {// 如果 then 不是函数，以 x 为参数执行 promise
            resolve(x);
        }
    } catch (e) {
        // 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
        // 如果调用 then 方法抛出了异常 e：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
        if (executed) return;
        executed = true;
        // 否则以 e 为据因拒绝 promise
        reject(e);
    }
  }else {  
    // 4.直接将 x 作为值执行
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}

//Promise.resolve() 可以实例化一个解决(fulfilled) 的 Promise。

Promise.resolve = function(value) {
  if (value instanceof Promise) {
      return value;
  }

  return new Promise(function(resolve, reject) {
      resolve(value);
  });
}

// Promise.reject() 可以实例化一个 rejected 的 Promise 并抛出一个异步错误（这个错误不能通过try/catch捕获，只能通过拒绝处理程序捕获）

Promise.reject = function(reason) {
  return new Promise(function(resolve, reject) {
      reject(reason);
  });
}

// Promise.prototype.catch() 方法用于给 Promise 添加拒绝时的回调函数。
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}

//Promise.prototype.finally() 方法用于给 Promise 添加一个不管最终状态如何都会执行的操作

Promise.prototype.finally = function(fn) {
  return this.then(function(value) {
      return Promise.resolve(fn()).then(function() {
          return value;
      });
  }, function(error) {
      return Promise.resolve(fn()).then(function() {
          throw error;
      });
  });
}

//Promise.all() 方法会将多个 Promise 实例组合成一个新的 Promise 实例。
//组合后的 Promise 实例只有当每个包含的 Promise 实例都解决(fulfilled)后才解决(fulfilled)，如果有一个包含的 Promise 实例拒绝(rejected)了，则合成的 Promise 也会拒绝(rejected)。

//两个注意点：
// 1.传入的是可迭代对象，用 for...of 遍历 Iterable 更安全
// 2.传入的每个实例不一定是 Promise，需要用 Promise.resolve() 包装

Promise.all = function(promiseArr) {
  return new Promise(function(resolve, reject) {
      const length = promiseArr.length;
      const result = [];
      let count = 0;
      if (length === 0) {
          return resolve(result);
      }
      promiseArr.forEach(function(promise, index) {
        Promise.resolve(promise).then(function(value){
          count++;
          result[index] = value;
          if(count === length) {
            resolve(result);
          }
        }, function(reason){
          reject(reason);
        });
      });

  });
}

// Promise.race() 同样返回一个合成的 Promise 实例，其会返回这一组中最先解决(fulfilled)或拒绝(rejected)的 Promise 实例的返回值。

Promise.race = function(promiseArr) {
  return new Promise(function(resolve, reject) {
      const length = promiseArr.length;
      if (length === 0) {
          return resolve();
      } 

      for (let item of promiseArr) {
          Promise.resolve(item).then(function(value) {
              return resolve(value);
          }, function(reason) {
              return reject(reason);
          });
      }
  });
}

//Promise.any() 相当于 Promise.all() 的反向操作，同样返回一个合成的 Promise 实例，只要其中包含的任何一个 Promise 实例解决(fulfilled)了，合成的 Promise 就解决(fulfilled)。
//只有当每个包含的 Promise 都拒绝(rejected)了，合成的 Promise 才拒绝(rejected)。

Promise.any = function(promiseArr) {
  return new Promise(function(resolve, reject) {
      const length = promiseArr.length;
      const result = [];
      let count = 0;
      if (length === 0) {
          return resolve(result);
      } 

      for (let item of promiseArr) {
          Promise.resolve(item).then((value) => {
              return resolve(value);
          }, (reason) => {
              result[count++] = reason;
              if (count === length) {
                  reject(result);
              }
          });
      }
  });
}

//Promise.allSettled() 方法也是返回一个合成的 Promise，不过只有等到所有包含的每个 Promise 实例都返回结果落定时，不管是解决(fulfilled)还是拒绝(rejected)，合成的 Promise 才会结束。一旦结束，状态总是 fulfilled。

//其返回的是一个对象数组，每个对象表示对应的 Promise 结果。

//对于每个结果对象，都有一个 status 字符串。如果它的值为 fulfilled，则结果对象上存在一个 value 。如果值为 rejected，则存在一个 reason 。


// 使用 Promise.finally 实现
Promise.allSettled = function(promises) {
    // 也可以使用扩展运算符将 Iterator 转换成数组
    // const promiseArr = [...promises]
    const promiseArr = Array.from(promises)
    return new Promise(resolve => {
        const result = []
        const len = promiseArr.length;
        let count = len;
        if (len === 0) {
          return resolve(result);
        }
        for (let i = 0; i < len; i++) {
            promiseArr[i].then((value) => {
                result[i] = { status: 'fulfilled', value: value };
            }, (reason) => {
                result[i] = { status: 'rejected', reason: reason };
            }).finally(() => { 
                if (!--count) {
                    resolve(result);
                }
            });
        }
    });
}

// 使用 Promise.all 实现
Promise.allSettled2 = function(promises) {
    // 也可以使用扩展运算符将 Iterator 转换成数组
    // const promiseArr = [...promises]
    const promiseArr = Array.from(promises)
    return Promise.all(promiseArr.map(p => Promise.resolve(p).then(res => {
      return { status: 'fulfilled', value: res }
    }, error => {
      return { status: 'rejected', reason: error }
    })));
};

//在手写的promiseXXX.js添加以下代码，其中改成自己定义promise.js名字
Promise.defer = Promise.deferred = function(){
  let dfd = {};
  dfd.promise = new Promise((resolve, reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject;
  });
  return dfd;
}
module.exports =  Promise;




