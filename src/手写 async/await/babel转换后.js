"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
// fn 是生成器函数
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

const fetchData = (data) =>
  new Promise((resolve) => setTimeout(resolve, 1000, data + 1));

const fetchResult = /*#__PURE__*/ (function () {
  var _ref = _asyncToGenerator(function* () {
    var result1 = yield fetchData(1);
    var result2 = yield fetchData(result1);
    var result3 = yield fetchData(result2);
    console.log(result3);
  });

  return function fetchResult() {
    return _ref.apply(this, arguments);
  };
})();

fetchResult();