import asyncPool from "tiny-async-pool";

const timeout = ms => new Promise(resolve => setTimeout(() => resolve(ms), ms));

// const timeout = ms => new Promise((resolve,reject) => setTimeout(() => {
//   if(ms===5000) {
//     reject('timeout')
//   }
//   resolve(ms)
// }, ms));

// for await (const ms of asyncPool(2, [1000, 5000, 3000, 2000], timeout)) {
//   console.log(ms);
// }


async function asyncPoolAll(...args) {
  const results = [];
  for await (const result of asyncPool(...args)) {
    console.log(result);
    results.push(result);
  }
  return results;
}

// ES7 API style available on our previous 1.x version
//const results = await asyncPoolAll(concurrency, iterable, iteratorFn);

// ES6 API style available on our previous 1.x version
asyncPoolAll(2, [1000, 5000, 3000, 2000], timeout).then(results => {
  console.log(results);
});


// 1000
// 3000
// 5000
// 2000
// [ 1000, 3000, 5000, 2000 ]