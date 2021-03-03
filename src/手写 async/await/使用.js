//Generator 缺陷：

// 1.函数外部无法捕获异常
// 2.多个 yield 会导致调试困难


// async 函数对 Generator 函数改进如下：

// 1.内置执行器
// 2.更好的语义
// 3.更广的适用性
// 4.返回值是 Promise

//async/await 做的事情就是将 Generator 函数转换成 Promise，说白了，async 函数就是 Generator 函数的语法糖，await 命令就是内部 then 命令的语法糖。
// setTimeout(function, milliseconds, param1, param2, ...)
const fetchData = (data) => new Promise((resolve) => setTimeout(resolve, 1000, data + 1))

const fetchResult = async function () {
    var result1 = await fetchData(1);
    var result2 = await fetchData(result1);
    var result3 = await fetchData(result2);
    console.log(result3); //4
}

fetchResult();


