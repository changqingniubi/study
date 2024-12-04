function * a() {
  let x = yield 100;
  console.log(x);
  let y = yield 200;
  console.log(y);
  let z = yield 300;
  return z
}
let it = a();
let flag = false;
let v;
do {
  let {done,value} = it.next(v);
  v=value;
  flag = done;
} while (!flag);

// promise