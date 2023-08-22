
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

class SuperTask {
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
let superTask = new SuperTask();

function addTask(time,name) {
  superTask.add(()=>timeout(time)).then(()=>console.log(`任务${name}完成`));
}

addTask(10000,1); // 10000ms后输出:任务1完成
addTask(5000,2);  // 5000ms后输出:任务1完成
addTask(3000,3);  // 8000ms后输出:任务1完成
addTask(4000,4);  // 12000ms后输出:任务1完成
addTask(5000,5);  // 15000ms后输出:任务1完成