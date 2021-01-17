<template>
  <div>
    <p>processed_image</p>
    <div
      v-for="processed_image in processedImages"
      :key="processed_image.name"
    >
      <p>{{ processed_image.base }}</p>
      <img
        :src="processed_image.image"
        alt=""
      >
    </div>
    <div>
      <!-- <DrawSquareInSVG :pt1="pt1" :pt2=pt2 /> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import DrawSquareInSVG from '@/components/DrawSquareInSVG.vue'

export default {
  data () {
    return {
      processedImages: null,
      img: null
    }
  },
  mounted () {
    axios
      .get('http://127.0.0.1:8000/api/processed_image/')
      .then(function (response) {
        console.log(response.data)
        this.processedImages = response.data
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style lang="scss" scoped>
img{
    width: 800px;
}
</style>
