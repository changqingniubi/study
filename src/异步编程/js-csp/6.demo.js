var csp = require("js-csp");
var {go,chan,take,put,timeout,timeout,putAsync}=csp;
function httpRequest(url) {
  var ch = chan();
  var req = new XMLHttpRequest();
  req.onload = function() {
    if(req.status === 200) {
      csp.putAsync(ch, this.responseText);
    }
    else {
      csp.putAsync(ch, new Error(this.responseText));
    }
  }
  req.open('get', url, true);
  req.send();
  return ch;
}

function jsonRequest(url) {
  return go(function*() {
    var value = yield take(httpRequest(url));
    if(!(value instanceof Error)) {
      value = JSON.parse(value);
    }
    return value;
  });
}

go(function*() {
  var data = yield takem(jsonRequest('sample.json'));
  console.log(JSON.stringify(data));
});