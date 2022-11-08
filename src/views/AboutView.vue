<template>
  <div class="about">
    <h1 @click="increment">AboutView</h1>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.$axios.get('api/getNewsList')
          .then((response)=>{
            console.log(response)
          })
    }
  },

}
</script>

<style lang="scss">

</style>
