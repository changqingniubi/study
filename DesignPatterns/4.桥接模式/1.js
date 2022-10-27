//桥接模式人如其名，其实就相当于一个桥梁，把不同维度的变量桥接在一起来实现功能。假设我们需要实现三种形状（长方形，圆形，三角形），每种形状有三种颜色（红色，绿色，蓝色

function rectangle(color) {     // 长方形
  showColor(color);
}

function circle(color) {     // 圆形
  showColor(color);
}

function triangle(color) {   // 三角形
  showColor(color);
}

function showColor(color) {   // 显示颜色的方法
  
}

// 使用时，需要一个红色的圆形
let obj = new circle('red');