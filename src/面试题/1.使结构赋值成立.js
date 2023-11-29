// const obj = {
//   a:'1',
//   b:'2',
// }

// const [a,b] = obj



// const array = [1,2,3]
// var [a,b,c] = array
// // 本质上是
// const iterator = array[Symbol.iterator]()
// var a = iterator.next().value
// var b = iterator.next().value
// var c = iterator.next().value

const obj = {
  a: '1',
  b: '2',
  [Symbol.iterator]() {
      let index = 0
      const keys = Object.keys(this)
      return {
          next() {
              if (index < keys.length) {
                  return {
                      done: false,
                      value: obj[keys[index++]]
                  }
              }
              return {done:true,value:undefined}
          }
      }
  }
}

const [a, b] = obj
console.log('---解构---'a, b)