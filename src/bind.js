Function.prototype.myBind = function(...args) {
  if(typeof this !== "function") {
    throw new Error('Must call with a function');
  }
  const _func = this;    // 原方法
  const realThis = args[0] || window;   // 绑定的this
  const otherArgs = args.slice(1);    // 取出后面的参数作为新函数的默认参数

  return function(...args2) {   // 返回一个方法
    return _func.apply(realThis, [...otherArgs,...args2]);  // 拼接存储参数和新参数，然后用apply执行
  }
}


function a(m, n, o) {
console.log(this.name + ' ' + m + ' ' + n + ' ' + o);
}

var b = {
name: 'kong'
};
a.myBind(b, 7, 8)(9); // kong 7 8 9