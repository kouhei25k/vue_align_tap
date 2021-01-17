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
        <label for="name">name</label>
        <input
          id="name"
          type="text"
          :value="name"
        >
        <p>{{ pt1 }},{{ pt2 }}</p>
        <button @click="submitFile()">
          Submit
        </button>
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
      this.name = this.file.name.split('.')[0]
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
    },
    submitFile () {
      const formData = new FormData()
      const url = 'http://127.0.0.1:8000/api/base_image/'
      // this.pt1 = this.pt1.split(',')
      // this.pt2 = this.pt2.split(',')
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

    baseClipDrop () {
      this.$refs.drop.drop()
      this.$refs.drop.cDrop()
    },
    getClipPt (...value) {
      const [x, y, w, h] = value
      this.pt1 = [x, y]
      this.pt2 = [x + w, y + h]
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
  color: gray;
  font-weight: bold;
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 300px;
  border: 5px solid gray;
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
}
</style>
