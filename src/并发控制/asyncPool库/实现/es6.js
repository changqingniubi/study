function asyncPool(poolLimit, iterable, iteratorFn) {
  let i = 0;
  const ret = [];
  const executing = new Set();
  const enqueue = function() {
    if (i === iterable.length) {
      return Promise.resolve();
    }
    const item = iterable[i++];
    const p = Promise.resolve().then(() => iteratorFn(item, iterable));
    ret.push(p);
    executing.add(p);
    const clean = () => executing.delete(p);
    p.then(clean).catch(clean);
    let r = Promise.resolve();
    if (executing.size >= poolLimit) {
      r = Promise.race(executing);
    }
    return r.then(() => enqueue());
  };
  return enqueue().then(() => Promise.all(ret));
}

const timeout = i => new Promise(resolve => setTimeout(() => {
  console.log(i);
  resolve(i)
}, i));
asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(results => {
  console.log(results);
});