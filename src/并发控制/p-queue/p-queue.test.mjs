//https://github.com/sindresorhus/p-queue
import PQueue from 'p-queue';
import got from 'got';

const queue = new PQueue({concurrency: 1});

function getSindresorhusTask(){
  return new Promise((resolve, reject) => {
    resolve(1);
  });
}
(async () => {
  const task = await getSindresorhusTask();
  await queue.add(task);
	console.log('Done: sindresorhus.com');
})();

function getUnicornTask(){
  return new Promise((resolve, reject) => {
    resolve(2);
  });
}

(async () => {
	const task = await getUnicornTask();
	await queue.add(task);
	console.log('Done: Unicorn task');
})();