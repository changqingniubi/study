// let p = new Promise((resolve, reject) => {
//     throw new Error('Something went wrong');
// }).then(null,err => {
//     console.log(err);
//     return 100
// }).then(result => {
//     console.log(result);  
// });


let p2 = new Promise((resolve, reject) => {
    throw new Error('Something went wrong');
}).then(null,err => {
    console.log('err1',err);
    return 100
})

p2.then(result => {
    console.log('result2',result);  
},err => {
    console.log('err2',err);
});