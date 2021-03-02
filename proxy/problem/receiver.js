//receiver：指向当前的 Proxy 对象或者继承于当前 Proxy 的对象
const proxy = new Proxy({},
  {
    get: function (target, property, receiver) {
      return receiver;
    },
  }
);

console.dir(proxy.getReceiver === proxy); // true
var inherits = Object.create(proxy);
console.dir(inherits.getReceiver === inherits); // true


//那么我们能否改变 receiver 指向的对象呢？答案是可以的，通过 Reflect 对象提供的 get 方法，我们可以动态设置 receiver 对象的值，具体使用方式如下所示：
console.dir(Reflect.get(proxy, "getReceiver", "阿宝哥"));

//对于对象的访问器属性来说，在执行内部代码时，Receiver 将被作为 this 的值，同样使用 Reflect 对象提供的 API，我们也可以通过设置 receiver 参数的值来改变 this 的值：
const obj = {
  get foo() {
    return this.bar;
  },
};

console.log(Reflect.get(obj, "foo")); // undefined
console.log(Reflect.get(obj, "foo", { bar: 2021 })); // 2021