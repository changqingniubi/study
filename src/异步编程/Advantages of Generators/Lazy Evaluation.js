function * powerSeries(number, power) {
  let base = number;
  while(true) {
    yield Math.pow(base, power);
    base++;
  }
}

//powerSeries 给出了数字的幂级数。例如，将 3 的幂级数提升为 2 将是 9(3²) 16(4²) 25(5²) 36(6²) 49(7²)。当我们执行 const powersOf2 = powerSeries(3, 2);我们只创建生成器对象。没有计算任何值。现在，如果我们调用 next()，将计算并重新调整 9。