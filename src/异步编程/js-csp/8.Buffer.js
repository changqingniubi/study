
//you'll see that all the puts happen immediately, but only the first 5 values are taken and logged. The last 10 puts just dropped the values. You may see 5 nulls printed as well because there the second process ran one last time but nothing was in the buffer.

var csp = require("js-csp");
var {go,chan,take,put,timeout,timeout,putAsync}=csp;

var start = Date.now();
var ch = chan(csp.buffers.dropping(5));
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