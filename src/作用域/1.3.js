//let 声明不能与任何其他声明位于同一作用域，包括 let、const、class、function、var 和 import 声明。
if(true){
  let foo;
  let foo; // SyntaxError: Identifier 'foo' has already been declared
}



//函数体内的 let 声明不能与参数同名。 catch 块中的 let 声明不能与 catch 绑定标识符具有相同的名称。
function foo(a) {
  let a = 1; // SyntaxError: Identifier 'a' has already been declared
}
try {
} catch (e) {
  let e; // SyntaxError: Identifier 'e' has already been declared
}

