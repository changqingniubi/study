//It’s possible to create generators that never end. Consider this example

function * naturalNumbers() {
  let num = 1;
  while (true) {
    yield num;
    num = num + 1
  }
}
const numbers = naturalNumbers();
console.log(numbers.next().value)
console.log(numbers.next().value)
console.log(numbers.next().value)