const arr = [1, 2, [3,4], [5, 6, [7, 8]]]
const flatArr = arr.flat(Infinity);
console.log(flatArr); // [1, 2, 3, 4, 5, 6, 7, 8]



const flat = (arr, initVal) => {
  const startVal = initVal || [];
  return arr.reduce((prevRes, item) => {
    // 如果里层还是数组，递归调用自身
    if(Array.isArray(item)){
      return flat(item, prevRes);
    }else{
      return prevRes.concat(item);
    }
  }, startVal)
}

const flatArr2 = flat(arr);
console.log(flatArr2); // [1, 2, 3, 4, 5, 6, 7, 8]


//如果我们想对递归的层数进行限制
const flat2 = (arr, depth, initVal) => {
  const startVal = initVal || [];
  return arr.reduce((prevRes, item) => {
    // 如果里层还是数组，递归调用自身
    if(Array.isArray(item) && depth > 1){
      return flat2(item, depth - 1, prevRes);
    }else{
      return prevRes.concat(item);
    }
  }, startVal)
}

const arr2 = [1, 2, [3, 4], [5, 6, [7, 8,[9]]]];
const flatArr3 = flat2(arr2, 1); // 只扁平化一层
console.log(flatArr3);