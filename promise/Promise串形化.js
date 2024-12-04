//reduce实现

// const mergePromise = ajaxArray => {
//     let data = []  // 收集执行完的结果
//     return ajaxArray.reduce((pre, next)=> {
//         return pre.then(next).then((res)=> {
//             data.push(res)
//             return data
//         })
//     }, Promise.resolve())
// };
// mergePromise([ajax1,ajax2,ajax3]).then(res => {
//     console.log('最终按顺序输出结果为：', res)
// })


