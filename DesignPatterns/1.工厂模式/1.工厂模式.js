// 我们项目需要一个弹窗，弹窗有几种：消息型弹窗，确认型弹窗，取消型弹窗，他们的颜色和内容可能是不一样的。

function popup(type, content, color) {
  // 如果是通过new调用的，返回对应类型的弹窗
  if(this instanceof popup) {
    return new this[type](content, color);
  } else {
    // 如果不是new调用的，使用new调用，会走到上面那行代码
    return new popup(type, content, color);
  }
}
// 各种类型的弹窗全部挂载在原型上成为实例方法
popup.prototype.infoPopup = function(content, color) {}
popup.prototype.confirmPopup = function(content, color) {}
popup.prototype.cancelPopup = function(content, color) {}

let infoPopup1 = popup('infoPopup', content, color); 