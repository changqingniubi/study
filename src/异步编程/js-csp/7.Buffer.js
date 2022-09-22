
//There are 3 types of buffers: fixed, dropping, and sliding. When an operation is performed on a fixed buffer, if it is full it will always block like normal. However, dropping and sliding buffers will never block. If the buffer is full when a put is performed, a dropping buffer will simply drop the value and it's lost forever, and a sliding buffer will remove the oldest value to make room for the new value.

var csp = require("js-csp");
var {go,chan,take,put,timeout,timeout,putAsync}=csp;

var start = Date.now();
var ch = chan(13);
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