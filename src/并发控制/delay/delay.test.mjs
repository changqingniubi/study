//https://github.com/sindresorhus/delay

import delay from 'delay';

const result = await delay(100, {value: '🦄'});

// Executed after 100 milliseconds
console.log(result);
//=> '🦄'