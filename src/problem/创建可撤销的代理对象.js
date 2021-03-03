//通过 Proxy.revocable() 方法可以用来创建一个可撤销的代理对象，该方法的签名为：
//调用 Proxy.revocable 方法之后，其返回值是一个对象，其结构为：{"proxy": proxy, "revoke": revoke}，其中：
//proxy：表示新生成的代理对象本身，和用一般方式 new Proxy(target, handler) 创建的代理对象没什么不同，只是它可以被撤销掉。
//revoke：撤销方法，调用的时候不需要加任何参数，就可以撤销掉和它一起生成的那个代理对象。

const target = {}; 
const handler = {};
const { proxy, revoke } = Proxy.revocable(target, handler);

proxy.name = "阿宝哥";
console.log(proxy.name); // 阿宝哥

revoke();
console.log(proxy.name); // TypeError: Revoked  Uncaught TypeError: Cannot perform 'get' on a proxy that has been revoked
