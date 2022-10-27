//有多个菜单项，每个菜单项文字不一样，鼠标滑入滑出时文字的颜色也不一样

// 菜单项类多接收一个参数color
function menuItem(word, color) {
  this.dom = document.createElement('div');
  this.dom.innerHTML = word;
  this.color = color;        // 将接收的颜色参数作为实例属性
}

// 菜单项类添加一个实例方法，用于绑定事件
menuItem.prototype.bind = function() {
  var that = this;      // 这里的this指向menuItem实例对象
  this.dom.onmouseover = function() {
    this.style.color = that.color.colorOver;    // 注意这里的this是事件回调里面的this,指向DOM节点
  }
  this.dom.onmouseout = function() {
    this.style.color = that.color.colorOut;
  }
}

// 再建一个类存放颜色，目前这个类的比较简单，后面可以根据需要扩展
function menuColor(colorOver, colorOut) {
  this.colorOver = colorOver;
  this.colorOut = colorOut;
}

// 现在新建菜单项可以直接用一个数组来循环了
var menus = [
  {word: 'menu1', colorOver: 'red', colorOut: 'green'},
  {word: 'menu2', colorOver: 'green', colorOut: 'blue'},
  {word: 'menu3', colorOver: 'blue', colorOut: 'red'},
]

for(var i = 0; i < menus.length; i++) {
  // 将参数传进去进行实例化，最后调一下bind方法，这样就会自动绑定事件了
  new menuItem(menus[i].word, new menuColor(menus[i].colorOver, menus[i].colorOut)).bind();
}