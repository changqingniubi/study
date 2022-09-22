//Code using promises and callbacks such as 

function fetchJson(url) {
  return fetch(url)
  .then(request => request.text())
  .then(text => {
      return JSON.parse(text);
  })
  .catch(error => {
      console.log(`ERROR: ${error.stack}`);
  });
}

//can be written as(with the help of libraries such as co.js)

const fetchJson = co.wrap(function * (url) {
  try {
      let request = yield fetch(url);
      let text = yield request.text();
      return JSON.parse(text);
  }
  catch (error) {
      console.log(`ERROR: ${error.stack}`);
  }
});
