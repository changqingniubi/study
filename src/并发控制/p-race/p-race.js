

// https://github.com/sindresorhus/is-empty-iterable/blob/main/index.js
function isEmptyIterable(iterable) {
	for (const _ of iterable) {
		return false;
	}

	return true;
}

// https://github.com/sindresorhus/p-race/blob/main/index.js
//import isEmptyIterable from 'is-empty-iterable';

export default async function pRace(iterable) {
	if (isEmptyIterable(iterable)) {
		throw new RangeError('Expected the iterable to contain at least one item');
	}
	return Promise.race(iterable);
}
