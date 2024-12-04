// 如何终止一个promise？ promise的终止有两种情况：
// 1. 成功：当promise的状态为fulfilled时，调用resolve()方法，则promise的终止。
// 2. 失败：当promise的状态为rejected时，调用reject()方法，则promise的终止。
// 如何终止一个promise？可以通过调用reject()方法来终止一个promise。


const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 3000);
});

function wrap(promise){
    let abort;
    let newPromise = new Promise((resolve, reject) => {
        abort = () => {
            reject(new Error('aborted'));
        };
    });
    let p =Promise.race([newPromise, promise]);
    p.abort=abort
    return p
}  

let p2 =wrap(p)
p2.then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  }
);

setTimeout(() => {
    //让 newPromise 变成失败态 从而终端p2的执行
  p2.abort();
}, 1000);