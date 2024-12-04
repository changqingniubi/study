setTimeout(() => {
    console.log('setTimeout1');//t1
    setTimeout(() => {
        console.log('setTimeout3');//t3
    }, 0);
    setImmediate(() => {
        console.log('setImmediate1');//i1
    });
}, 1);
process.nextTick(() => {
    process.nextTick(() => {
        process.nextTick(() => {
            process.nextTick(() => {

            });
        });
    });
});