import pSeries from "p-series";

const tasks = [async () => 1 + 1, () => 2 + 2, async () => 3 + 3];

async function main() {
  const result = await pSeries(tasks);
  console.dir(result); // 输出结果：[2, 4, 6]
}

main();
