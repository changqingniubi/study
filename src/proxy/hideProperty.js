const hideProperty = (target, prefix = "_") =>
  new Proxy(target, {
    has: (obj, prop) => !prop.startsWith(prefix) && prop in obj,
    ownKeys: (obj) =>
      Reflect.ownKeys(obj).filter(
        (prop) => typeof prop !== "string" || !prop.startsWith(prefix)
      ),
    get: (obj, prop, rec) => (prop in rec ? obj[prop] : undefined),
});


const man = hideProperty({
    name: "阿宝哥",
    _pwd: "www.semlinker.com",
});
  
  console.log(man._pwd); // undefined
  console.log('_pwd' in man); // false
  console.log(Object.keys(man)); // [ 'name' ]