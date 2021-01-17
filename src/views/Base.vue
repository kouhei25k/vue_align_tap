<template>
  <div>
    <p>base_image</p>
    <div>
      <BaseInput />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import DrawSquareInSVG from '@/components/DrawSquareInSVG.vue'
import BaseInput from '@/components/BaseInput.vue'

export default {
  components: {
    BaseInput
  },
  data () {
    return {
      base: null,
      img: null
    }
  },
  mounted () {
    axios
      .get('http://127.0.0.1:8000/api/base_image/')
      .then(
        function (response) {
          console.log(response.data)
          this.unprocessedImages = response.data
        }.bind(this)
      )
      .catch(function (error) {
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
