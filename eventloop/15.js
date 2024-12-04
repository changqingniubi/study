setTimeout(() => {
    console.log('setTimeout1');//t1
    setTimeout(() => {
        console.log('setTimeout3');//t3
    }, 0);
    setImmediate(() => {
        console.log('setImmediate1');//i1
    });
}, 1);
setTimeout(() => {
    console.log('setTimeout2');//t2
},1);
//主栈清空的时候放了2个setTimeout t1  t2
// setTimeout1  setImmediate1 setTimeout2 setTimeout3