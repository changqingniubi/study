//看了优秀框架对职责链模式的运用，我们再看看在我们平时工作中这个模式怎么运用起来。现在假设有这样一个需求是做一个表单验证，这个验证需要前端先对格式等内容进行校验，然后API发给后端进行合法性校验。我们先分析下这个需求，前端校验是同步的，后端验证是异步的，整个流程是同步异步交织的，为了能兼容这种情况，我们的每个验证方法的返回值都需要包装成promise才行

// 前端验证先写个方法
function frontEndValidator(inputValue) {
  return Promise.resolve(inputValue);      // 注意返回值是个promise
}

// 后端验证也写个方法
function backEndValidator(inputValue) {
  return Promise.resolve(inputValue);      
}

// 写一个验证器
function validator(inputValue) {
  // 仿照Axios，将各个步骤放入一个数组
  const validators = [frontEndValidator, backEndValidator];
  
  // 前面Axios是循环调用promise.then来执行的职责链，我们这里换个方式，用async来执行下
  async function runValidate() {
    let result = inputValue;
    while(validators.length&&result) {
      result = await validators.shift()(result);
    }
    
    return result;
  }
  
  // 执行runValidate，注意返回值也是一个promise
  runValidate().then((res) => {console.log(res)});
}

// 上述代码已经可以执行了，只是我们没有具体的校验逻辑，输入值会原封不动的返回
validator(123);     // 输出: 123
