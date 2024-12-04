let fs = require('fs');
setTimeout(() => {
    console.log(1);
    let rs = fs.createReadStream('./t.js');
    rs.on('close', () => console.log('close'));
    rs.on('data', () => {
        rs.destroy();//可读流的destroy会触发  close事件
        console.log('data');
        setImmediate(() => console.log('m1'));
        setTimeout(() => console.log('t1'));
        console.log(2);
    });
    setImmediate(() => {
        console.log('m2');
        process.nextTick(() => console.log('n1'));
    });
    console.log(3);
    setTimeout(() => {
        console.log('t2');
        process.nextTick(() => console.log('n2'));
    });
    setTimeout(() => {
        console.log('t3');
    });//1 3  m2 n1 t2 n2 t3 data 2 m1 t1 close
    //1 3 m2 n1 t2 n2 t3 data 2 m1 t1 close
}, 0);