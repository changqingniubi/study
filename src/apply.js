
Function.prototype.myApply = function(...args) {
  if(typeof this !== "function") {
    throw new Error('Must call with a function');
  }

  const realThis = args[0] || window;
  // 直接取第二个参数，是一个数组
  const realArgs = args[1];        
  const funcSymbol = Symbol('func');
  realThis[funcSymbol] = this;   

  const res = realThis[funcSymbol](...realArgs); 

  delete realThis[funcSymbol]; 

  return res; 
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
obj.func.myApply(obj2, [18, "帅哥"]);// 我的名字是小小飞, 我的年龄是18，我是一个帅哥