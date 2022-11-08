<template>
  <div class="home">
    <h3>HomeView</h3>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',

}
</script>

<style scoped lang="scss">

/* For demo */
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}

</style>
