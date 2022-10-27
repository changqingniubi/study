//单例模式适用于全局只能有一个实例对象的场景，单例模式的一般结构如下：

function store() {
  // 加一个instanceof检测
  if(!(this instanceof store)) {
    return new store();
  }
  if(store.instance) {
    return store.instance;
  }
  
  store.instance = this;
}


let  a= new store();
let b = store();
console.log(a===b);