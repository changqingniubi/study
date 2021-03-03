// 先来简单回顾下 Generator 的使用：

function* webCanteenGenerator() {
  yield '店小二儿，给我切两斤牛肉来';
  yield '再来十八碗酒';
  return '好酒！这酒有力气！';
}

var canteen = webCanteenGenerator();
console.log(canteen.next());
console.log(canteen.next());
console.log(canteen.next());
console.log(canteen.next());

// canteen.next();
// canteen.next();
// canteen.next();
// canteen.next();

// {value: "店小二儿，给我切两斤牛肉来", done: false}
// {value: "再来十八碗酒", done: false}
// {value: "好酒！这酒有力气！", done: true}
// {value: undefined, done: true}