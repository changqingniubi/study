import delay from "delay";
import pTimes from "p-times";

async function main() {
  console.time("start");
  const result = await pTimes(5, async (i) => delay(50, { value: i * 10 }), {
    concurrency: 3,
  });
  console.dir(result);
  console.timeEnd("start");
}

main();
