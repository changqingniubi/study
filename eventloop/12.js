let { fork } = require('child_process');
//宏任务队列
const macroTasks = [];
//微任务队列 promise.then 
const microTasks = []
class XMLHttpRequest {
    constructor() {
        this.options = {};
    }
    open(method, url) {
        this.options.method = method;
        this.options.url = url;
    }
    send() {
        let child = fork('./eventloop/XMLHttpRequest.js');
        child.on('message', (message) => {//message={type,data}
            if (message.type === 'response') {
                this.response = message.data;
                macroTasks.push(this.onload);
            }
        });
        child.send({ type: 'send', options: this.options })
    }
}

function fetchData() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/data');
    xhr.onload = function () {
        console.log(xhr.response);
    }
    xhr.send();
}
class Promise {
    constructor(executor) {
        executor(this.resolve);
    }
    //resolve的执行会放入微任务 延时绑定 
    resolve = (value) => {
        /*  setTimeout(() => {
             this._onSuccess(value);
         }, 0); */
        microTasks.push(() => this._onSuccess(value));
    }
    then = (onSuccess) => {
        this._onSuccess = onSuccess;
    }
}
console.log(1);
fetchData();//ok
console.log(2);
new Promise((resolve) => {
    resolve('promise1');
}).then(result => {
    console.log(result);
    new Promise(resolve => {
        resolve('promise2');
    }).then(result2 => console.log(result2));
});//promise1
console.log(3);
// 1 2 3 p1 p2 ok  
setInterval(() => {
    let macroTask = macroTasks.shift();
    macroTask && macroTask();
    //每次宏任务执行完成后，要清空所有的微任务
    let task = microTasks.shift();
    while (task) {
        task();
        task = microTasks.shift();
    }
}, 0);
//