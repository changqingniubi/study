
//if 块被执行，因为外部 var foo 有一个值。然而，由于词法作用域，该值在块内不可用：if 块内的标识符 foo 是 let foo。表达式 foo + 55 抛出一个 ReferenceError ，因为 let foo 的初始化尚未完成 - 它仍然位于临时死区中。

function test() {
  var foo = 33;
  if (foo) {
    let foo = foo + 55; // ReferenceError
  }
}
test();



//This phenomenon can be confusing in a situation like the following. The instruction let n of n.a is already inside the scope of the for...of loop's block. So, the identifier n.a is resolved to the property a of the n object located in the first part of the instruction itself (let n). This is still in the temporal dead zone as its declaration statement has not been reached and terminated.
function go(n) {
  // n here is defined!
  console.log(n); // { a: [1, 2, 3] }

  for (let n of n.a) {
    //          ^ ReferenceError
    console.log(n);
  }
}

go({ a: [1, 2, 3] });