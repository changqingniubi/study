 //Js 实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有2个。


/**
 *  同一时间并行执行 parallelCount个任务
 * @param {*} ms 
 * @returns 
 */

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

class Scheluler {
  constructor(parallelCount=2) {
    this.parallelCount=parallelCount;
    this.task=[];
    this.runningCount=0;
  }
  add(task) {
    return new Promise((resolve,reject) => {
      this.task.push(
        {
          task,
          resolve,
          reject
        }
      );
      this._run();
    })
  }
  _run() {
    while (this.task.length>0 && this.runningCount < this.parallelCount) {
      const { task, resolve, reject} = this.task.shift();
      this.runningCount++;
      task().then(resolve, reject).finally(() => {
         this.runningCount--;
         this._run()
      })
    }
  }
}
let scheluler = new Scheluler();

function addTask(time,name) {
  scheluler.add(()=>timeout(time)).then(()=>console.log(`任务${name}完成`));
}

addTask(1000,1); 
addTask(500,2);  
addTask(300,3);  
addTask(400,4);


// 任务2完成
// 任务3完成
// 任务1完成
// 任务4完成