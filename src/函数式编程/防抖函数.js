//我们有一个需求：实现一个搜索框，当用户连续输入的时候不发请求去搜索，只有当用户输入暂停超过500毫秒才发请求。实现这个需求就需要我们的防抖函数了，因为是等待500毫秒才发起请求，我们很容易就想到了setTimeout，如果timer存在，又触发了这个方法，就把timer清了继续等，直到方法不再触发，timer执行

// 发起请求的函数
const sendRequest = () => {
  console.log('request....')
};

// 防抖函数
const debounce =(fn,waitTime)=>{
    let timer = null;
    return function(...args){
      let self = this;
      if(timer){
        timer=null
      }else{
        timer=setTimeout(()={
          fn.apply(self,args)
          },waitTimer)
        } 
    }

}
const debouncedSendRequest = debounce(sendRequest, 500);