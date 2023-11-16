//使用 let、const 或 class 声明的变量被认为处于从块开始到代码执行到达声明和初始化变量的位置的“暂时死区”(TDZ)。 在 TDZ 内部时，该变量尚未用值进行初始化，任何访问它的尝试都将导致引用错误。当执行到达代码中声明该变量的位置时，该变量将被初始化为一个值。如果变量声明中未指定初始值，则将使用未定义的值进行初始化。 这与 var 变量不同，如果在声明之前访问它们，则 var 变量将返回 undefined 值。下面的代码演示了在声明位置之前的代码中访问 let 和 var 时的不同结果。

{
  // TDZ starts at beginning of scope
  console.log(bar); // "undefined"
  console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  var bar = 1;
  let foo = 2; // End of TDZ (for foo)
}

//使用术语“时间”是因为区域取决于执行顺序（时间）而不是代码写入顺序（位置）。例如，下面的代码之所以有效，是因为即使使用 let 变量的函数出现在声明该变量之前，该函数也会在 TDZ 之外被调用。

// TDZ starts at beginning of scope
const func = () => console.log(letVar); // OK

// Within the TDZ letVar access throws `ReferenceError`

let letVar = 3; // End of TDZ (for letVar)
func(); // Called outside TDZ!