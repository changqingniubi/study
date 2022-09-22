//斐波拉契数列

const fibonacci = (x) => {
  if(x === 1 || x === 2){
    return 1;
  }

  return fibonacci(x - 1) + fibonacci(x - 2);
}

// 第一个参数是需要缓存的函数，第二个参数是用来生成缓存key的方法，如果不传就用第一个参数做key
const memo = function(fn, hasher) {
  const cache = {};
  const memoFun = function(){
    const args = [].slice.apply(arguments);
    const hashKey = hasher ? hasher.apply(this, arguments) : args[0];
    if(!cache[hashKey]){
      cache[hashKey] = fn.apply(this, arguments);
    }
    return cache[hashKey];
  }
  return memoFun;
}

const cachedfFibonacci = memo(fibonacci);

// 然后看下效果
let startTime = new Date().getTime();
cachedfFibonacci(40);
let needTime = new Date().getTime() - startTime;

console.log(needTime); // 第一次运行时间还是959毫秒

// 再调一次
startTime = new Date().getTime();
cachedfFibonacci(40);
needTime = new Date().getTime() - startTime;

console.log(needTime); // 时间直接变为0了，直接取缓存，快到1毫秒都不要
