//我们想要创建一个自定义的迭代器，它返回 This、is 和 iterable.. 这是一个使用迭代器的实现

// const iterableObj = {
//   [Symbol.iterator]() {
//     let step = 0;
//     return {
//       next() {
//         step++;
//         if (step === 1) {
//           return { value: 'This', done: false};
//         } else if (step === 2) {
//           return { value: 'is', done: false};
//         } else if (step === 3) {
//           return { value: 'iterable.', done: false};
//         }
//         return { value: '', done: true };
//       }
//     }
//   },
// }
// for (const val of iterableObj) {
//   console.log(val);
// }



function * iterableObj() {
  yield 'This';
  yield 'is';
  yield 'iterable.'
}
for (const val of iterableObj()) {
  console.log(val);
}
// This
// is 
// iterable.