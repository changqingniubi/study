
//you get the last 5 values instead.

var csp = require("js-csp");
var {go,chan,take,put,timeout,timeout,putAsync}=csp;

var start = Date.now();
var ch = chan(csp.buffers.sliding(5));
go(function*() {
  for(var x=0; x<15; x++) {
    yield put(ch, x);
    console.log('put ' + x);
  }
});

go(function*() {
  while(!ch.closed) {
    yield take(timeout(200));
    for(var i=0; i<5; i++) {
      console.log(yield take(ch));
    }
  }
});

go(function*() {
  yield take(timeout(1000));
  ch.close();
});