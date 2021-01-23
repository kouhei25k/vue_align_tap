<template>
  <div class="images-container">
    <h3>{{ $route.params.group }}</h3>
    <div class="images">
      <div
        v-for="processed_image in processedImages"
        :key="processed_image.name"
        class="image"
      >
        <img
          :src="processed_image.image"
          alt=""
        >
        <p>{{ getImageName(processed_image.image) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import DrawSquareInSVG from '@/components/DrawSquareInSVG.vue'

export default {
  inject: ['API_URL'],
  data () {
    return {
      processedImages: null,
      img_group: null,
      img_name: null
    }
  },
  computed: {
    groupName () {
      return this.$route.params.group
    },
    getImageName () {
      return function (imageUrl) {
        const imageName = imageUrl.split('/').pop()
        return imageName
      }
    }
  },
  mounted () {
    axios
      .get(`${this.API_URL}/api/${this.$route.params.group}`, {
        headers: {
          Authorization: `token ${localStorage.token}`
        }
      })
      .then(response => {
        this.processedImages = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang="scss" scoped>
.images-container {
  .images {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    .image {
      margin: 20px;
      img {
        width: 300px;
      }
    }
  }
}
</style>
