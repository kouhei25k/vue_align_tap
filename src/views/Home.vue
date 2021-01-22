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
      .get('https://server-auto-settap.herokuapp.com/api/base_image/', {
        headers: {
          Authorization: `token ${localStorage.token}`
        }
      })
      .then((response) => {
        this.baseImagesName = response.data.map(value => value.name)
      })
      .catch((error) => {
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
