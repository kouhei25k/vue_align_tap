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
  inject: ['API_URL'],
  data () {
    return {
      baseImagesName: [],
      useBase: ''
    }
  },
  mounted () {
    console.log(this.API_URL)
    axios
      .get(`${this.API_URL}/api/base_image/`, {
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
