let asyncToGenerator =require('./asyncToGenerator实现.js');


const fetchData = (data) =>
  new Promise((resolve) => setTimeout(resolve, 1000, data + 1));
let generator = function* webCanteenGenerator() {
  var result1 = yield fetchData(1);
  var result2 = yield fetchData(result1);
  var result3 = yield fetchData(result2);
  console.log(result3); 
}
let asyncFn = asyncToGenerator(generator)
asyncFn()

