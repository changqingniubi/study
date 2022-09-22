var csp = require("js-csp");
var {go,chan,take,put,timeout,timeout}=csp;
var ch = chan();

go(function*() {
  var v;
  while((v = yield take(ch)) !== csp.CLOSED) {
    console.log('one',v);
    yield take(timeout(300));
    yield put(ch, 2);
  }
});

go(function*() {
  var v;
  yield put(ch, 1);
  while((v = yield take(ch)) !== csp.CLOSED) {
    console.log('two',v);
    yield take(timeout(200));
    yield put(ch, 3);
  }
});

go(function*() {
  yield take(timeout(5000));
  ch.close();
});
