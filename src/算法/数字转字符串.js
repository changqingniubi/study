//样例输入：1234567890
//样例输出：1,234,567,890
//https://www.jianshu.com/p/bd4f7533cd29
function formatNumber(num) {
  return num.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
console.log(formatNumber(1234567890))


function formatNumber2(num) {
    // 这是最简单的写法
    // return num.toLocaleString();
    const result = [];
    const str = `${num}`.split('').reverse();
    for (let i = 0; i < str.length; i++) {
    if (i && i % 3 === 0) {
    result.push(',');
    }
    result.push(str[i]);
    }
    return result.reverse().join('');
}

function formatNumber3(num) {

  // ["0", "9", "8", "7", "6", "5", "4", "3", "2", "1"]
  return `${num}`.split("").reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + ',')) + prev
  })
}
console.log(formatNumber3(1234567890))



function formatNumber4(num) {
  return num.toLocaleString('en-US')  // 1,234,567,890
}

