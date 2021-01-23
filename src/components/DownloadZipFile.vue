<template>
  <span @click="downloadZipFile">ダウンロード</span>
</template>

<script>
import axios from 'axios'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export default {
  name: 'DownlodZipFileVue',
  inject: ['API_URL'],
  props: { folder: String },
  data () {
    return {
      images: null
    }
  },
  mounted () {
    axios
      .get(`${this.API_URL}/api/${this.folder}`, {
        headers: {
          Authorization: `token ${localStorage.token}`
        }
      })
      .then((response) => {
        this.images = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    downloadZipFile () {
      console.log(this.folder)
      const zip = new JSZip()
      for (var i in this.images) {
        const imageName = this.images[i].image.split('/').pop()
        const imageBlob = fetch(this.images[i].image).then(response => response.blob())
        zip.folder(this.folder).file(imageName, imageBlob)
      }
      const zipName = this.folder + '.zip'
      zip.generateAsync({ type: 'blob' })
        .then(function (blob) {
          saveAs(blob, zipName)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
img{
    width: 800px;
}
</style>
