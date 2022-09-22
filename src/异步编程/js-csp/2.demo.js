var csp = require("js-csp");
var {go}=csp;
var c =csp.chan();
go(function* () {
  for(var i = 0; i < 10; i++) {
    yield csp.put(c, i);
    console.log("process one put", i);
  }
  yield csp.take(csp.timeout(1000));
  yield c.close();
});
    
go(function* () {
  while((val = yield csp.take(c)) !== csp.CLOSED) {
    console.log("process two took", val);
  }
});