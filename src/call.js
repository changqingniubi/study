Function.prototype.myCall = function(...args) {
    // 参数检查
  if(typeof this !== "function") {
    throw new Error('Must call with a function');
  }
  const realThis = args[0] || window;
  const realArgs = args.slice(1);
  const funcSymbol = Symbol('func');
  realThis[funcSymbol] = this;   // 这里的this是原方法，保存到传入的第一个参数上
  //用传入的参数来调方法，方法里面的this就是传入的参数了
  const res = realThis[funcSymbol](...realArgs); 
  delete realThis[funcSymbol];  // 最后删掉临时存储的原方法
  return res;  // 将执行的返回值返回
}

const obj = {
  myName: "大飞哥",
  func: function(age, gender) {
    console.log(`我的名字是${this.myName}, 我的年龄是${age}，我是一个${gender}`);
  }
}

const obj2 = {
  myName: "小小飞"
}

obj.func.myCall(obj2, 18, "帅哥");  // 我的名字是小小飞, 我的年龄是18，我是一个帅哥
