
import pFilter from "p-filter";

const inputs = [Promise.resolve(1), 2, 3];
const filterer = (x) => x % 2;

async function main() {
  const result = await pFilter(inputs, filterer, { concurrency: 1 });
  console.dir(result); // 输出结果：[ 1, 3 ]
}

main();

