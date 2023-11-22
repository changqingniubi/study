// https://github.com/sindresorhus/p-reduce/blob/main/index.js
export default async function pReduce(iterable, reducer, initialValue) {
  return new Promise((resolve, reject) => {
    const iterator = iterable[Symbol.iterator](); // 获取迭代器
    let index = 0; // 索引值

    const next = async (total) => {
      const element = iterator.next(); // 获取下一项

      if (element.done) { // 判断迭代器是否迭代完成
        resolve(total);
        return;
      }

      try {
        const [resolvedTotal, resolvedValue] = await Promise.all([
          total,
          element.value,
        ]);
        // 迭代下一项
        // reducer(previousValue, currentValue, index): Function
        next(reducer(resolvedTotal, resolvedValue, index++));
      } catch (error) {
        reject(error);
      }
    };

    // 使用初始值，开始迭代
    next(initialValue);
  });
}
