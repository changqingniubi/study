import delay from 'delay';

const abortController = new AbortController();

setTimeout(() => {
	abortController.abort();
}, 500);

try {
	await delay(1000, {signal: abortController.signal});
} catch (error) {
	// 500 milliseconds later
	console.log(error.name)
	//=> 'AbortError'
}