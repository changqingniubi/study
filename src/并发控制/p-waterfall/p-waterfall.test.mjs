import pWaterfall from "p-waterfall";

const tasks = [
  async (val) => val + 1,
  (val) => val + 2,
  async (val) => val + 3,
];

async function main() {
  const result = await pWaterfall(tasks, 0);
  console.dir(result); // 输出结果：6
}

main();
