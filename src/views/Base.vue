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
  data () {
    return {
      base: null,
      img: null
    }
  },
  mounted () {
    axios
      .get('https://server-auto-settap.herokuapp.com/api/base_image/')
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
