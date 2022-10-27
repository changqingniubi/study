// 先来三个笔的类
function smallPen(color) {
  this.color = color;
}
smallPen.prototype.draw = function() {
  drawWithColor(this.color);    // 用color颜色来画画
}

function middlePen(color) {
  this.color = color;
}
middlePen.prototype.draw = function() {
  drawWithColor(this.color);    // 用color颜色来画画
}

function bigPen(color) {
  this.color = color;
}
bigPen.prototype.draw = function() {
  drawWithColor(this.color);    // 用color颜色来画画
}

// 再来一个颜色类
function color(color) {
  this.color = color;
}

function drawWithColor(color){
  console.log(color)
}; 

// 使用时
new middlePen(new color('red')).draw();    // 画一个中号的红线
new bigPen(new color('green')).draw();     // 画一个大号的绿线