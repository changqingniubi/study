

//在有限的并发池中运行多个承诺返回和异步函数。一旦其中一个承诺被拒绝，它就会立即拒绝。它会尽快调用迭代器函数（在并发限制下）。它返回一个异步迭代器，一旦 Promise 完成（在并发限制下），该迭代器就会产生。

async function* asyncPool(concurrency, iterable, iteratorFn) {
  const executing = new Set();
  async function consume() {
    const [promise, value] = await Promise.race(executing);
    executing.delete(promise);
    return value;
  }
  for (const item of iterable) {
    // Wrap iteratorFn() in an async fn to ensure we get a promise.
    // Then expose such promise, so it's possible to later reference and
    // remove it from the executing pool.
    const promise = (async () => await iteratorFn(item, iterable))().then(
      value => [promise, value]
    );
    executing.add(promise);
    if (executing.size >= concurrency) {
      yield await consume();
    }
  }
  while (executing.size) {
    yield await consume();
  }
}

const timeout = ms => new Promise((resolve,reject) => setTimeout(() => {
  resolve(ms)
}, ms));

for await (const ms of asyncPool(2, [1000, 5000, 3000, 2000], timeout)) {
  console.log(ms);
}