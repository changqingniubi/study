
/* const add = (function (total) {//参数的总个数
    let allArgs = [];
    function _add(...args) {
        allArgs = [...allArgs, ...args]
        if (allArgs.length >= total) {
            let ret = allArgs.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            allArgs.length = 0;
            return ret;
        } else {
            return _add;
        }
    }
    return _add;
})(5); */


function add(...args) {
    let _add = add.bind(null, ...args);
    _add.toString = function () {
        return args.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    }
    return _add;
}



console.log(add(1, 2, 3, 4, 5)+0);//15
console.log(add(1)(2)(3)(4)(5)+0);//15
console.log(add(1, 2)(3, 4, 5)+0);//15


const add = (...a) => {
     let res = a.reduce((pre, cur) => pre + cur);
     const add_ = (...b) => add(res, ...b);
     // 因为每次返回的都是add_，因此要给它绑toString方法
     add_.toString = () => {
       return res;
        };
     return add_;
};
// // 注意，方法前都有一个+
console.log(+add(1)(2));// 3
// console.log(+add(1)(2, 3));// 6
// console.log(+add(1)(2, 3)(4));// 10
   



function curry(fn, ...args) {//[] [1] [2] [3] [4] [5]
    //args.length=0 < fn.length=5
    return args.length < fn.length ? (...innerArgs) => {
        return curry(fn, ...args, ...innerArgs);
    } : fn(...args);
}

function curry2(fn, ...args){
    // 函数的参数个数可以直接通过函数数的.length属性来访问
    return args.length >= fn.length // 这个判断很关键！！！
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
    ? fn(...args)
    /**
     * 传入的参数小于原始函数fn的参数个数时
     * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
    */
    : (..._args) => curry(fn, ...args, ..._args);
}
    

//函数的length属性代表函数形参的个数
function addFn(a, b, c, d, e) {
    return a + b + c + d + e;
}
let add = curry(addFn);
//console.log(add(1, 2, 3, 4, 5));//15
console.log(add(1)(2)(3)(4)(5));//15
console.log(add(1, 2)(3, 4, 5));//15