//惰性评估的直接后果是生成器具有内存效率。我们只生成需要的值。对于普通函数，我们需要预先生成所有值并保留它们以防我们以后使用它们。但是，使用生成器，我们可以将计算推迟到需要时。

//我们可以创建组合函数来作用于生成器。组合器是组合现有迭代器以创建新迭代器的函数。其中一个这样的组合器就是 take。它需要可迭代的前 n 个元素。这是一个实现—


function * naturalNumbers() {
  let num = 1;
  while (true) {
    yield num;
    num = num + 1
  }
}

function * powerSeries(number, power) {
  let base = number;
  while(true) {
    yield Math.pow(base, power);
    base++;
  }
}
function * take(n, iter) {
  let index = 0;
  for (const val of iter) {
    if (index >= n) {
      return;
    }
    index = index + 1;
    yield val;
  }
}
take(3, ['a', 'b', 'c', 'd', 'e'])
// a b c
take(7, naturalNumbers());
// 1 2 3 4 5 6 7
take(5, powerSeries(3, 2));
// 9 16 25 36 49



//这是循环库的实现

function * cycled(iter) {
  const arrOfValues = [...iter]
  while (true) {
    for (const val of arrOfValues) {
      yield val
    }
  }
}
console.log(...take(10, cycled(take(3, naturalNumbers()))))


// 1 2 3 1 2 3 1 2 3 1