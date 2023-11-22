// p-reduce/p-reduce.test.js
import delay from "delay";
import pReduce from "p-reduce";

const inputs = [Promise.resolve(1), delay(50, { value: 6 }), 8];

async function main() {
  const result = await pReduce(inputs, async (a, b) => a + b, 0);
  console.dir(result); // 输出结果：15
}

main();