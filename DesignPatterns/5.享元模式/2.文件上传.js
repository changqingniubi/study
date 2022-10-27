
// 文件数据扔到一个数组里面
var data = [
  {filetype: 'img', file: file1},
  {filetype: 'txt', file: file2},
  {filetype: 'mp3', file: file3},
];

// Uploader类改造一下, 构造函数不再接收参数
function Uploader() {}

// 原型上的其他方法保持不变
Uploader.prototype.init = function() {}

// 文件类型和文件数据其实是上传的时候才用，作为upload的参数
Uploader.prototype.upload = function(fileType, file) {}

// 调用时只需要一个实例，循环调用upload就行
var uploader = new Uploader();
for(var i = 0; i < data.length; i++) {
  uploader.upload(data[i].filetype, data[i].file)
}