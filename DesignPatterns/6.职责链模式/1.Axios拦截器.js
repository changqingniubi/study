// 先从用法入手，一般我们添加拦截器是这样写的 
// instance.interceptors.request.use(fulfilled, rejected)
// 根据这个用法我们先写一个Axios类。
function Axios() {
  // 实例上有个interceptors对象，里面有request和response两个属性
  // 这两个属性都是InterceptorManager的实例
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

// 然后是实现InterceptorManager类
function InterceptorManager() {
  // 实例上有一个数组，存储拦截器方法
  this.handlers = [];
}

// InterceptorManager有一个实例方法use
InterceptorManager.prototype.use = function(fulfilled, rejected) {
  // 这个方法很简单，把传入的回调放到handlers里面就行
  this.handlers.push({
    fulfilled,
    rejected
  })
}


Axios.prototype.request = function(config) {
  // chain里面存的就是我们要执行的方法链条
  // dispatchRequest是发起网络请求的方法，本文主要讲设计模式，这个方法就不实现了
  // chain里面先把发起网络请求的方法放进去，他的位置应该在chain的中间
  const chain = [dispatchRequest, undefined];
  
  // chain前面是请求拦截器的方法,从request.handlers里面取出来放进去
  this.interceptors.request.handlers.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  
  // chain后面是响应拦截器的方法，从response.handlers里面取出来放进去
  this.interceptors.response.handlers.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });
  
  // 经过上述代码的组织，chain这时候是这样的：
  // [request.fulfilled, request.rejected, dispatchRequest, undefined, response.fulfilled,  
  // response.rejected]
  // 这其实已经按照请求拦截器 -> 发起请求 -> 响应拦截器的顺序排好了，拿来执行就行
  
  let promise = Promise.resolve(config);   // 先来个空的promise，好开启then
  while (chain.length) {
    // 用promise.then进行链式调用
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
}