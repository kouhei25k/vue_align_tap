<template>
  <div
    class="drop_container"
    @mouseup="baseClipDrop()"
  >
    <div v-if="isDroped">
      <div class="base-image-field">
        <BaseClip
          ref="drop"
          @pt="getClipPt"
        />
        <img
          v-show="url"
          id="base-img"
          :src="url"
          @load="getImgSize"
        >
      </div>

      <div>
        <div class="base-name">
          <span
            for="name"
          >名前:   </span>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Base Name"
          >
        </div>

        <div
          class="button"
          @click="submitFile()"
        >
          ベース画像を追加する
        </div>
      </div>
    </div>
    <div
      v-else
      class="drop_area"
      :class="{ enter: isEnter }"
      @dragenter="dragEnter"
      @dragleave="dragLeave"
      @dragover.prevent
      @drop.prevent="dropFile"
      @drop.stop="dragLeave"
    >
      ファイルアップロード
    </div>
  </div>
</template>
<script>
import BaseClip from '@/components/BaseClip.vue'
import axios from 'axios'
export default {
  name: 'DropBaseInput',
  components: {
    BaseClip
  },
  inject: ['API_URL'],
  data () {
    return {
      isEnter: false,
      isDroped: false,
      file: '',
      name: '',
      pt1: '',
      pt2: '',
      imgNaWidth: '',
      imgNaHeight: '',
      scaling: null,
      url: ''
    }
  },
  methods: {
    dragEnter () {
      this.isEnter = true
    },
    dragLeave () {
      this.isEnter = false
    },
    dropFile () {
      const files = event.dataTransfer.files
      if (files.length !== 1 || files[0].type.indexOf('image') !== 0) {
        console.log('画像ファイル1つをドロップしてください')
        return
      }
      this.file = files[0]
      // this.name = this.file.name.split('.')[0]
      this.url = URL.createObjectURL(this.file)
      this.isDroped = false
      this.isDroped = true
    },
    getImgSize () {
      const obj = document.getElementById('base-img')
      const nw = obj.naturalWidth
      const nh = obj.naturalHeight

      this.imgNaWidth = nw
      this.imgNaHeight = nh
      this.scaling = 800 / nw
    },
    submitFile () {
      if (!this.name) {
        alert('追加するベース画像の名前を追加してください')
      } else {
        const formData = new FormData()
        const url = `${this.API_URL}/api/base_image/`
        // this.pt1 = this.pt1.split(',')
        // this.pt2 = this.pt2.split(',')
        formData.append('name', this.name)
        formData.append('image', this.file)
        formData.append('pt1', this.pt1)
        formData.append('pt2', this.pt2)

        axios
          .post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `token ${localStorage.token}`
            }
          })
          .then(() => {
            console.log('Success!!')
            this.$router.push('/')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },

    baseClipDrop () {
      this.$refs.drop.drop()
      this.$refs.drop.cDrop()
    },
    getClipPt (...value) {
      const [x, y, w, h] = value
      this.pt1 = [Math.floor(x / this.scaling), Math.floor(y / this.scaling)]
      this.pt2 = [Math.floor((x + w) / this.scaling), Math.floor((y + h) / this.scaling)]
    }
  }
}
</script>

<style lang="scss" scoped>
.drop_container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.drop_area {
  color: #505050;
  font-weight: bold;
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 300px;
  border: 5px solid #505050;
  border-radius: 15px;
}

.enter {
  border: 10px dotted powderblue;
}
.base-image-field {
  position: relative;
  display: inline-block;
  border: 1px solid #4a4a4a;
}
img {
  width: 800px;
  user-select: none;
}.button {
  margin-top: 20px;
  font-size: 20px;
  color: #42b983;
  border: 2px solid #42b983;
  border-radius: 10px;
  background: #fff;
  padding: 10px;
  &:hover {
    color: #fff;
    background:#42b983;
  }
}
.base-name{
  margin-top: 20px;
  input{
    width: 300px;
    padding: 8px 38px 8px 8px;
  }
}
</style>
