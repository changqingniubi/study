
// 从这里其实可以看出let也是存在变量提升的，只是在变量显式赋值之前不能对变量进行读写，否则就会报错，这也就是所谓的let和const的暂时性死区。
//let同样存在变量提示（hoisting），只是形式与var不同，var定义的变量将会被赋予undefined的初始值，而let在被显式赋值之前不会被赋予初始值，并且在赋值之前读写变量都会导致 ReferenceError 的报错。从代码块(block)起始到变量求值(包括赋值)以前的这块区域，称为该变量的暂时性死区。

var x = 'parent value';
(function() {
   // let x 此时暂时性死区开始
  console.log(x); // Uncaught ReferenceError: x is not defined
  let x = 'child value'
  //暂时性死区结束
}())
