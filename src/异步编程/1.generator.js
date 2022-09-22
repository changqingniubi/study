function* gen(x){
  try {
    var y = yield x + 2;
  } catch (e){ 
    console.log(e);
  }
  return y;
}

var g = gen(1);
console.log(g.next())  //{ value: 3, done: false }
//g.throw（'出错了'）;
console.log(g.next(2))  // { value: 2, done: true }



