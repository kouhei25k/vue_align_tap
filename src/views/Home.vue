<template>
  <div class="home">
    <div>
      <DropInput
        :base="useBase"
      />
      <SeletOptions
        :options="baseImagesName"
        @selected="selectedBase"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import DropInput from '@/components/DropInput.vue'
import SeletOptions from '@/components/SeletOptions.vue'

export default {
  name: 'Home',
  components: {
    DropInput,
    SeletOptions
  },
  data () {
    return {
      baseImagesName: [],
      useBase: ''
    }
  },
  mounted () {
    axios
      .get('http://127.0.0.1:8000/api/base_image/')
      .then(function (response) {
        this.baseImagesName = response.data.map(value => value.name)
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    selectedBase (value) {
      this.useBase = value
    }
  }
}
</script>
