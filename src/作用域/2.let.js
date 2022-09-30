function f() {
  let y = 1;
  if(true) {
    var x = 2;
    let y = 2;
  }
  
  console.log(x);   // 2
  console.log(y);   // 1
}
f();