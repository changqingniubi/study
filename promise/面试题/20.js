
// https://juejin.cn/post/7171002835016892453?searchId=20240307153707E2D586A117D6EF9B74EB
async function async1() {
	console.log('async1 start');
	await async2();
	console.log('asnyc1 end');
}
async function async2() {
	console.log('async2');
}
console.log('script start');
setTimeout(() => {
	console.log('setTimeOut');
}, 0);
async1();
new Promise(function (reslove) {
	console.log('promise1');
	reslove();
}).then(function () {
	console.log('promise2');
})
console.log('script end');


// script start
// async1 start
// async2
// promise1
// script end
// asnyc1 end
// promise2
// setTimeOut



async function test () {
    console.log(1);
    await new Promise((resolve, reject) => {
       resolve()
    })
    console.log(2);
}
test();
console.log(3);
Promise.resolve()
    .then(() => console.log(4))
    .then(() => console.log(5))
    .then(() => console.log(6))
    .then(() => console.log(7));
// 最终结果👉: 1 3 2 4 5 6 7
   