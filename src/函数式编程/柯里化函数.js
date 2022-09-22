//柯里化就是将一个接收多个参数的函数转化为一系列使用一个参数的函数的技术。实现的效果就是



const fun = (a, b, c) => {return [a, b, c]};

// 观察上诉柯里化调用发现，它其实就是把参数都搜集起来了，每次调用搜集几个参数
// 当搜集的参数足够时执行主方法
const curry = (fn) => {
  // 先记录主方法原始的参数个数，fn.length就是函数接收的参数个数
  const paramsLength = fn.length;

  return executeFun = (...args) => {
    // 如果接收参数够了，执行主方法
    if(args.length >= paramsLength) {
      return fn(...args);
    } else {
      // 如果参数不够，继续接收参数
      return (...args2) => {
        // 注意executeFun接收的参数是平铺的，需要将数组解构
        return executeFun(...args.concat(args2));
      }
    }
  }
}

//上述函数经过科里化后就是
const curriedFun = curry(fun);
// curriedFun的调用变为 curriedFun(a)(b)(c)

console.log(curriedFun(1)(2)(3))
