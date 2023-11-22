import pCatchIf from 'p-catch-if';

// Error constructor
getData().catch(pCatchIf(TimeoutError, () => retry(getData)));

// Multiple error constructors
getData().catch(pCatchIf([NetworkError, TimeoutError], () => retry(getData)));

// Boolean
getData().catch(pCatchIf(isProduction, error => recordError(error)));

// Function
const hasUnicornMessage = error => error.message.includes('unicorn');
getData().catch(pCatchIf(hasUnicornMessage, console.error));

// Promise-returning function
const handler = error => sendError(error).then(checkResults);
getData().catch(pCatchIf(handler, console.error));

// Can also be nested
const validateMessage = error => error.message === 'Too many rainbows';
getData().catch(pCatchIf(UnicornError, pCatchIf(validateMessage, console.error)));status