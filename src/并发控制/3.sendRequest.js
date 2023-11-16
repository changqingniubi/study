// 设计一个函数，可以限制请求的并发，同时请求结束之后，调用callback函数
// sendRequest(requestList:,limits,callback):void


// 其中request 可以是： 
function request (url,time=1){
  console.log('请求开始:'+url);
  return new Promise((resolve,reject)=>{

      setTimeout(()=>{

          console.log('请求结束：'+url);

          if(Math.random() > 0.5){

              resolve('成功')

          }else{

              reject('错误;')

          }

      },time*1e3)

  })
}


class SendRequest{
  
  constructor(requestList,limits,callback){
      this.requestList=requestList;
      this.total=requestList.length;
      this.limits=limits;
      this.callback=callback;
      this.runningCount=0;
      this.result=[]
      this.run()
  }
  run(){
    while(this.runningCount<this.limits && this.requestList.length>0){
      let nextP = this.requestList.shift()
      this.runningCount++
      nextP().then((res)=>{
        this.result.push(res)
      },(rej)=>{
        this.result.push(rej)
      }).finally(()=>{
        this.runningCount--;
        console.log('result',this.result)
        this.run()
      })
    }
    if(this.requestList.length===0 &&this.result.length===this.total){
        this.callback(this.result)
    }
  }
}


function sendRequest(requestList,limits,callback){
  new SendRequest(requestList,limits,callback)
}


sendRequest(

  [()=>request('1'),
  
  ()=>request('2'),
  
  ()=>request('3'),
  
  ()=>request('4')],
  
  3, //并发数
  
  (res)=>{
      console.log('---最终结果---',res)
  })
  
  
  
  