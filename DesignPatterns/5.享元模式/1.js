// 我们有一个需求是显示多个弹窗，每个弹窗的文字和大小不同：

// 已经有一个弹窗类了
function Popup() {}

// 弹窗类有一个显示的方法
Popup.prototype.show = function() {}

var popupArr = [
  {text: 'popup 1', width: 200, height: 400},
  {text: 'popup 2', width: 300, height: 300},
]

var popup = new Popup();
for(var i = 0; i < popupArr.length; i++) {
  popup.show(popupArr[i]);    // 注意show方法需要接收参数
}
