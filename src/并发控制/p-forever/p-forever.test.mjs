import delay from "delay";
import pForever from "p-forever";



function testP(p) {
  console.log(p)
  return ++p
}

async function main() {
  let index = 0;
  let result = await pForever(async (p) => (++index === 10 ? pForever.end : testP(p)),1);
  console.log("当前result: ", result); // 输出结果：当前result: 的值
  console.log("当前index的值: ", index); // 输出结果：当前index的值: 10
}

main();
