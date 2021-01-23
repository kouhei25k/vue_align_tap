<template>
  <div>
    <p>base_image</p>
    <div>
      <!-- <BaseInput /> -->
      <DropBaseInput />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import DropBaseInput from '@/components/DropBaseInput.vue'

export default {
  components: {
    DropBaseInput
  },
  inject: ['API_URL'],
  data () {
    return {
      base: null,
      img: null
    }
  },
  mounted () {
    axios
      .get(`${this.API_URL}/api/base_image/`)
      .then(
        function (response) {
          console.log(response.data)
          this.unprocessedImages = response.data
        }.bind(this)
      )
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 800px;
}
</style>
