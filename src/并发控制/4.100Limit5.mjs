//How can I run 100 async/promise-returning functions with only 5 running at once?

import pMap from 'p-map';
import delay from 'delay';
function fetchStats(index) {
  console.log('执行任务:'+index);
  return delay(1000, {value: index+'🦄'})
}
const urls = [];
for(let i=0;i<100;i++){
  urls.push(i);
}
console.log(urls.length);
//=> 100

const mapper = url => fetchStats(url); //=> Promise

const result = await pMap(urls, mapper, {concurrency: 5});

console.log(result);