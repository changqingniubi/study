


var csp = require("js-csp");
var {go,chan,take,put,timeout,timeout}=csp;

var ch = chan();

go(function*() {
  while(yield put(ch, 1)) { yield take(timeout(250)); }
});

go(function*() {
  while(yield put(ch, 2)) { yield take(timeout(300)); }
});

go(function*() {
  while(yield put(ch, 3)) { yield take(timeout(1000)); }
});

go(function*() {
  for(var i=0; i<10; i++) {
    console.log(yield take(ch));
  }
  ch.close();
});