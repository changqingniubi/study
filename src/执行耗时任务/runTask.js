/**
 * 运行一个耗时任务
 * 如果要异步执行，请返回Promise
 * 要尽快完成任务，同时不要让页面卡顿
 * 尽量兼容更多的浏览器
 */

function runTask(task) {            
    // 耗时任务代码 
    //task() // 同步 卡顿
    //return Promise.resolve().then(()=>task()) // 异步 渲染帧延后 也卡顿   
   
    // 牺牲渲染帧 执行宏任务  有可能卡顿
    // return new Promise(resolve=>{
    //     setTimeout(()=>{
    //         task();
    //         resolve();            
    //     },0);
    // })

    return new Promise(resolve=>{
       _run(task,resolve);
    })
}

function _run(task,callback){
    // requestIdleCallback((deadline)=>{
    //     if(deadline.timeRemaining()>0){
    //       task()
    //       callback();
    //     }else{
    //         _run(task,callback)
    //     }
    // })

    let start=performance.now();
    requestAnimationFrame(()=>{
        if(performance.now()-start<16.6){
           task()
           callback()
        }else{
            _run(task,callback) 
        }
    })
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const n=1000;

const tasks=new Array(n).fill(0).map((_,i)=>{return ()=>delay(i*100)});

Promise.all(
    tasks.map(task=>runTask(task))
).then(()=>console.log('任务全部完成'));