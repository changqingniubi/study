const { parse } = require('@vue/compiler-sfc')
const fs = require('fs')
const path = require('path')
const p = path.join(__dirname,'../src/components/Demo1.vue')



const  str =`
<template>
  <div>
    <div>{{ a }}</div>
    <input type="text" v-model="a">
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    a: 'hello world'
  }),
}
</script>
`

//console.log('p',p)
//const data = fs.readFileSync(p )
//console.log('data',data)
//console.log('data.toString()',data.toString())
// const parseResult = parse(data.toString())
// console.log('parseResult',parseResult)
//  const { descriptor }=parseResult;
// // 结果包含很多项, 本文档中只展示重点字段
// console.log(Object.keys(descriptor))
