<template>
  <div>
    <p>unprocessed_image</p>
    <div
      v-for="unprocessed_image in unprocessedImages"
      :key="unprocessed_image.name"
    >
      <img
        :src="unprocessed_image.image"
        alt=""
      >
      <button @click="postImage" />
    </div>

    <div>
      <FileInput destination="unprocessed_image" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import DrawSquareInSVG from '@/components/DrawSquareInSVG.vue'
import FileInput from '@/components/FileInput.vue'

export default {
  components: {
    // DrawSquareInSVG,
    FileInput
  },
  data () {
    return {
      unprocessedImages: null,
      unprocessedImagesId: 3,
      img: null
    }
  },
  mounted () {
    axios
      .get('http://127.0.0.1:8000/api/unprocessed_image/')
      .then(function (response) {
        console.log(response.data)
        this.unprocessedImages = response.data
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    postImage () {
      const formData = new FormData()
      formData.append('unprocessed_image_id', this.unprocessedImagesId)
      axios
        .post('http://127.0.0.1:8000/align/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        .then()
    }
  }
}
</script>

<style lang="scss" scoped>
img{
    width: 800px;
}
</style>
