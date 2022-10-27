var arrayProto = Array.prototype;    // 先拿到原生数组的原型
var arrObj = Object.create(arrayProto);     // 用原生数组的原型创建一个新对象，免得污染原生数组
var methods = ['push', 'shift'];    // 需要扩展的方法，这里只写了两个，但是不止这两个

// 循环methods数组，扩展他们
methods.forEach(function(method) {
  // 用扩展的方法替换arrObj上的方法
  arrObj[method] = function() {
    var result = arrayProto[method].apply(this, arguments);    // 先执行老方法
    dep.notify();     // 这个是Vue的方法，用来做响应式
    return result;
  }
});

// 对于用户定义的数组，手动将它的原型指向扩展了的arrObj
var a = [1, 2, 3];
a.__proto__ = arrObj;