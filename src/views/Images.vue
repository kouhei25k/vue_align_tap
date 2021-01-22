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
      img_group: null,
      img: null
    }
  },
  computed: {
    groupName () {
      return this.$route.params.group
    }
  },
  mounted () {
    axios
      .get(`https://server-auto-settap.herokuapp.com/api/${this.$route.params.group}`, {
        headers: {
          Authorization: `token ${localStorage.token}`
        }
      })
      .then((response) => {
        this.processedImages = response.data
      })
      .catch((error) => {
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
