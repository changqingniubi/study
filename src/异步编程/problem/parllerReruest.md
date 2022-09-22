1. This exercise calls for you to write some async flow-control code. To start off with, you'll use callbacks only.

2. Expected behavior:
	- Request all 3 files at the same time (in "parallel").
	- Render them ASAP (don't just blindly wait for all to finish loading)
	- BUT, render them in proper (obvious) order: "file1", "file2", "file3".
	- After all 3 are done, output "Complete!".


3. 模拟请求
```javascript
function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way

function getFile(file) {
	fakeAjax(file,function(text){
		// what do we do here?
	});
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");

```

4. 输出

```javascript
Requesting: file1
Requesting: file2
Requesting: file3
The first text
The middle text
The last text
complete
```


5.参考文章 

[Thunk 函数的含义和用法](https://www.ruanyifeng.com/blog/2015/05/thunk.html)

[Understanding Generators in ES6 JavaScript with Examples](https://codeburst.io/understanding-generators-in-es6-javascript-with-examples-6728834016d5)
[A Simple Guide to ES6 Iterators in JavaScript with Examples](https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e)
[co库](https://github.com/tj/co)