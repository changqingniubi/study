// 简易版
// 定义生成器函数，入参是任意集合
function webCanteenGenerator(list) {
  var index = 0;
  var len = list.length;
  return {
      // 定义 next 方法
      // 记录每次遍历位置，实现闭包，借助自由变量做迭代过程中的“游标”
      next: function() {
          var done = index >= len; // 如果索引还没有超出集合长度，done 为 false
          var value = !done ? list[index++] : undefined; // 如果 done 为 false，则可以继续取值
          // 返回遍历是否完毕的状态和当前值
          return {
              done: done,
              value: value
          }
      }
  }
}

var canteen = webCanteenGenerator(['道路千万条', '安全第一条', '行车不规范']);
console.log(canteen.next());
console.log(canteen.next());
console.log(canteen.next());
console.log(canteen.next());
console.log(canteen.next());

// {done: false, value: "道路千万条"}
// {done: false, value: "安全第一条"}
// {done: false, value: "行车不规范"}
// {done: true, value: undefined}