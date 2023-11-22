// https://github.com/sindresorhus/p-waterfall/blob/main/index.js
import pReduce from 'p-reduce';
export default async function pWaterfall(iterable, initialValue) {
	return pReduce(iterable, (previousValue, function_) => function_(previousValue), initialValue);
}
