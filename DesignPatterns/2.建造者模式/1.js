function Model1() {}   // 模块1
function Model2() {}   // 模块2

// 最终使用的类
function Final() {
  this.model1 = new Model1();
  this.model2 = new Model2();
}
// 使用时
var obj = new Final();