
import delay from "delay";
import pAll from "p-all";

const inputs = [
  () => delay(200, { value: 1 }),
  async () => {
    await delay(100);
    return 2;
  },
  async () => 8,
];

async function main() {
  console.time("start");
  const result = await pAll(inputs, { concurrency: 1 });
  console.dir(result); // 输出结果：[ 1, 2, 8 ]
  console.timeEnd("start");
}

main();
