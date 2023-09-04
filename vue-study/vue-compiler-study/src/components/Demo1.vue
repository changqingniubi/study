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