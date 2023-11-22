// p-map/p-map.test.js
import delay from "delay";
import pMap from "p-map";

const inputs = [200, 100, 50];
const mapper = (value) => delay(value, { value });

async function main() {
  console.time("start");
  const result = await pMap(inputs, mapper, { concurrency: 1 });
  console.dir(result); // 输出结果：[ 200, 100, 50 ]
  console.timeEnd("start");
}

main();
