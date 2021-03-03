const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate(); // Error  TypeError: this is not a Date object.

//出现以上问题的原因是因为有些原生对象的内部属性，只有通过正确的 this 才能拿到，所以 Proxy 无法代理这些原生对象的属性。那么如何解决这个问题呢？要解决这个问题，我们可以为 getDate 方法绑定正确的 this：

const target = new Date();
const handler = {
  get(target, property, receiver) {
    if (property === "getDate") {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, property, receiver);
  },
};

const proxy = new Proxy(target, handler);
console.log(proxy.getDate());