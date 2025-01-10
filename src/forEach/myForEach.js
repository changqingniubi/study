const arr = [1, 2, 3];

// arr.forEach(function(item, index, arr) {
//   console.log(item, index, arr);
// });
// console.log(arr);


// arr.forEach(function(item, index, arr) {
//     arr.push(4)
//     console.log(item, index, arr);
// });
// console.log(arr);


arr.forEach(function(item, index, arr) {
    arr.splice(index, 1)
    console.log(item, index, arr);
});
console.log(arr);



/**
 *  根据规范实现forEach方法
 * @param {*} callback 
 */
Array.prototype.myForEach = function(callback) {
    const len = this.length;
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }
    let k = 0;
    function _hasProperty(obj, prop) {
      const desc = Reflect.getOwnPropertyDescriptor(obj, prop);
      //console.log("desc:",desc);
      return !!desc
    }
    while (k < len) {
      const pk = String(k);
      if (_hasProperty(this, pk)) {
          const kValue = this[pk];
          callback.call(this,kValue, k, this);
      } 
      k++;
    }
    
}

// const arr = [, , 3];
// arr.myForEach(function(item, index, arr) {
//   console.log(item, index, arr);
// });
// console.log(arr);



