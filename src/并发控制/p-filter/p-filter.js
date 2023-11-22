// https://github.com/sindresorhus/p-filter/blob/main/index.js
const pMap = require('p-map');

const pFilter = async (iterable, filterer, options) => {
	const values = await pMap(
		iterable,
		(element, index) => Promise.all([filterer(element, index), element]),
		options
	);
	return values.filter(value => Boolean(value[0])).map(value => value[1]);
};
