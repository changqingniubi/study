const deepCopy = (originObj) => {
  // 全局只能有一个记录的map，所以里面又嵌了一个方法
  const map = new WeakMap();
  function dp(obj){
    const result = Array.isArray(obj) ? [] : {};

    const existObj = map.get(obj);
    // 检查map中是不是已经有这个对象了，有了就直接返回，不再递归
    if(existObj){
      return existObj;
    }

    // 没有就记录下来
    map.set(obj, result);

    for(let key of Reflect.ownKeys(obj)) {
      if(obj.hasOwnProperty(key)){
        if(obj[key] && typeof obj[key] === 'object'){
          result[key] = dp(obj[key])
        } else {
          result[key] = obj[key];
        }
      }
    }

    return result;
  }

  return dp(originObj);
}


let obj1 = {
  [Symbol('name')]: 'John',
  age: 20,
  drive: () => {},
  girlFriend: undefined
}
obj1.target = obj1;

obj2=deepCopy(obj1)
console.log(obj2);