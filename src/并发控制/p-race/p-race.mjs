import delay from "delay";
import pRace from "p-race";

const inputs = [delay(50, { value: 1 }), delay(100, { value: 2 })];

async function main() {
  const result = await pRace(inputs);
  console.dir(result); // 输出结果：1
}

main();
