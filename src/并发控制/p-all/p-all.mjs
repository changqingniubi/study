// https://github.com/sindresorhus/p-all/blob/main/index.js
import pMap from 'p-map';

export default async function pAll(iterable, options) {
	return pMap(iterable, element => element(), options);
}
