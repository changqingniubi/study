// p-pipe/p-pipe.test.js
import pPipe from "p-pipe";

const addUnicorn = async (string) => `${string} Unicorn`;
const addRainbow = async (string) => `${string} Rainbow`;

const pipeline = pPipe(addUnicorn, addRainbow);

(async () => {
  console.log(await pipeline("❤️")); // 输出结果：❤️ Unicorn Rainbow
})();
