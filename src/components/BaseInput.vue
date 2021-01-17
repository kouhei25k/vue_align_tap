<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>タイトル
        <input
          v-model="name"
          type="text"
        >
      </label>
      <label>File
        <input
          id="file"
          ref="file"
          type="file"
          @change="onFileChange"
        >
      </label>
      <label>pt1
        <input
          v-model="pt1"
          type="text"
          @change="drawSvg"
        >
      </label>
      <label>pt2
        <input
          v-model="pt2"
          type="text"
          @change="drawSvg"
        >
      </label>
      <button @click="submitFile()">
        Submit
      </button>
    </div>
    <div class="base-image-field">
      <DrawSquareInSVG
        ref="drawsvg"
        :pt1="pt1"
        :pt2="pt2"
        :nw="imgNaWidth"
        :nh="imgNaHeight"
      />
      <img
        v-show="url"
        id="base-img"
        :src="url"
        @load="getImgSize"
      >
    </div>
  </div>
</template>
<script>
import DrawSquareInSVG from '@/components/DrawSquareInSVG.vue'
import axios from 'axios'
export default {
  name: 'BaseInput',
  components: {
    DrawSquareInSVG
  },
  data () {
    return {
      file: '',
      name: '',
      pt1: '',
      pt2: '',
      imgNaWidth: '',
      imgNaHeight: '',
      url: ''
    }
  },
  methods: {
    getImgSize () {
      const obj = document.getElementById('base-img')
      const nw = obj.naturalWidth
      const nh = obj.naturalHeight

      this.imgNaWidth = nw
      this.imgNaHeight = nh
    },
    drawSvg () {
      this.$refs.drawsvg.computeSquareSize()
    },
    submitFile () {
      const formData = new FormData()
      const url = 'http://127.0.0.1:8000/api/base_image/'
      this.pt1 = this.pt1.split(',')
      this.pt2 = this.pt2.split(',')
      formData.append('name', this.name)
      formData.append('image', this.file)
      formData.append('pt1', this.pt1)
      formData.append('pt2', this.pt2)
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

<style lang="scss" scoped>
.base-image-field {
  position: relative;
  display: inline-block;
  border: 1px solid #4a4a4a;
}
img {
  width: 800px;
}
</style>
