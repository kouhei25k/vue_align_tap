<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input
          id="file"
          ref="file"
          type="file"
          @change="onFileChange"
        >
      </label>
      <button @click="submitFile()">
        Submit
      </button>
      <!-- <img :src="url" v-show="url"> -->
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'FileInput',
  props: {
    destination: {
      type: String
    },
    base: {
      type: String,
      default: 'レイアウト2'
    }
  },
  data () {
    return {
      file: '',
      url: ''
    }
  },
  methods: {
    submitFile () {
      const formData = new FormData()
      const url = `http://127.0.0.1:8000/api/${this.destination}/`

      formData.append('image', this.file)
      formData.append('base', this.base)
      axios
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(function () {
          console.log('Success!!')
        })
        .catch(function () {
          console.log('Failed！')
        })
    },
    onFileChange (e) {
      this.file = e.target.files[0]
      this.url = URL.createObjectURL(this.file)
    }
  }
}
</script>
