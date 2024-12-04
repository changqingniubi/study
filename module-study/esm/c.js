let x = 10
let y = 20
setTimeout(() => {
    x = 100
    y = 200
}, 1000)
export { x }
export default y

//export {<变量>}这种方式一般称为 命名式导出 或者 具名导出，导出的是一个变量的引用。
//export default这种方式称为 默认导出 或者 匿名导出，导出的是一个值。