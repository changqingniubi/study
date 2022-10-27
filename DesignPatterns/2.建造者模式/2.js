
// 编辑器本身肯定需要一个类，是给外部调用的接口
// 需要一个控制参数初始化和页面渲染的类
// 需要一个控制字体的类
// 需要一个状态管理的类

// 编辑器本身，对外暴露
function Editor() {
  // 编辑器里面就是将各个模块组合起来实现功能
  this.initer = new HtmlInit();
  this.fontController = new FontController();
  this.stateController = new StateController(this.fontController);
}

// 初始化参数，渲染页面
function HtmlInit() {
  
}
HtmlInit.prototype.initStyle = function() {}     // 初始化样式
HtmlInit.prototype.renderDom = function() {}     // 渲染DOM

// 字体控制器
function FontController() {
  
}
FontController.prototype.changeFontColor = function() {}    // 改变字体颜色
FontController.prototype.changeFontSize = function() {}     // 改变字体大小

// 状态控制器
function StateController(fontController) {
  this.states = [];       // 一个数组，存储所有状态
  this.currentState = 0;  // 一个指针，指向当前状态
  this.fontController = fontController;    // 将字体管理器注入，便于改变状态的时候改变字体
}
StateController.prototype.saveState = function() {}     // 保存状态
StateController.prototype.backState = function() {}     // 后退状态
StateController.prototype.forwardState = function() {}     // 前进状态