import delay, {clearDelay} from 'delay';

const delayedPromise = delay(1000, {value: 'Done'});

setTimeout(() => {
	clearDelay(delayedPromise);
}, 500);

// 500 milliseconds later
console.log(await delayedPromise);
//=> 'Done'