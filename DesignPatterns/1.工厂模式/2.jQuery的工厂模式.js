(function(){
  var jQuery = function(selector) {
    return new jQuery.fn.init(selector);   // new一下init, init才是真正的构造函数
  }

  jQuery.fn = jQuery.prototype;     // jQuery.fn就是jQuery.prototype的简写

  jQuery.fn.init = function(selector) {
    // 这里面实现真正的构造函数
  }

  // 让init和jQuery的原型指向同一个对象，便于挂载实例方法
  jQuery.fn.init.prototype = jQuery.fn;  

  // 最后将jQuery挂载到window上
  window.$ = window.jQuery = jQuery;
})();

//----
var jQuery = function(selector) {
  if(!(this instanceof jQuery)) {
    return new jQuery(selector);
  }
  
  // 下面进行真正构造函数的执行
}
