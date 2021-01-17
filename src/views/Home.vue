<template>
  <div class="home">
    <div>
      <FileInput
        destination="align"
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
import FileInput from '@/components/FileInput.vue'
import SeletOptions from '@/components/SeletOptions.vue'

export default {
  name: 'Home',
  components: {
    FileInput,
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
        console.log(response.data)
        this.baseImagesName = response.data.map(value => value.name)
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    selectedBase (value) {
      console.log(value)
      this.useBase = value
    }
  }
}
</script>
