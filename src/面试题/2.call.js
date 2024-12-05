/**
 * 都可以让函数执行并且改变函数里的this
 * //call  参数是依次传入
 * //apply  函数是以数组的形式传和
 */

//https://juejin.cn/post/7175959116605554748?searchId=202412041737226C4CCAAF4E31A9C85551

Function.prototype.apply = function (obj, args) {
    const context = obj;
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
}
// Function.prototype.call = function (obj, ...args) {
//     const xxx = Symbol();
//     obj[xxx] = this;//this=call  fn2.xxx=call
//     const result = obj[xxx](...args);//fn2.call()
//     return result;
// }

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
function fn1() { console.log(1); }
function fn2() { console.log(2); }//2
//fn1.call.call.call.call.call.call.
fn1.call.call(fn2);
//第一次的时间   this=call  context=fn2
//fn2.call
//this=fn2 context=window window.fn2();


/* function sum(amount1, amount2) {
    console.log(this.age + amount1 + amount2);
}
let obj = { age: 10 };
sum.call(obj, 20, 30);
sum.apply(obj, [20, 30]); */