const add = x => x + 10;
const multiply = x => x * 10;


const pipe = function(){
  // 将接收的参数存到一个数组， args == [multiply, add]
  const args = [].slice.apply(arguments);
  return function(x) {
    return args.reduce((res, cb) => cb(res), x);
  }
}

//上面的pipee函数使用ES6的话会更加简洁：
//const pipe = (...args) => x => args.reduce((res, cb) => cb(res), x);

// 我们来验证下这个方法
let calculate = pipe(add,multiply);
let res = calculate(10);
console.log(res);    // 结果还是200
