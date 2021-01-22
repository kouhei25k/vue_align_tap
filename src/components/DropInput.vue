<template>
  <div class="drop_container">
    <div v-if="isDroped">
      <!-- <img
        v-show="url"
        id="base-img"
        :src="url"
        @load="getImgSize"
      > -->
      <div>
        <ul id="listing" />
      </div>
      <button @click="submitFile()">
        Submit
      </button>
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
import axios from 'axios'
export default {
  name: 'DropInput',
  props: {
    base: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isEnter: false,
      isDroped: false,
      folder: null,
      files: null,
      url: null
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
      // this.files = event.dataTransfer.files
      var items = event.dataTransfer.items
      const files = []

      for (var i = 0; i < items.length; i++) {
        var item = items[i].webkitGetAsEntry() // Might be renamed to GetAsEntry() in 2020
        if (item) {
          if (item.isFile) {
            item.file(function (file) {
              console.log(file)
              files.push(file)
            })
          } else if (item.isDirectory) {
            console.log(item.fullPath)
            var folderName = item.fullPath // console.log(item.name)
            // Get folder contents
            var dirReader = item.createReader()
            dirReader.readEntries(function (entries) {
              for (var i = 0; i < entries.length; i++) {
                // this.getFileTree(entries[i], item.name + '/')
                if (entries[i].isFile) {
                  entries[i].file(function (file) {
                    console.log(file)
                    files.push(file)
                  })
                }
              }
            })
          }
        }
      }
      this.files = files
      this.folder = folderName
      this.isDroped = false
      this.isDroped = true
    },
    getFileTree: function (item, path) {
      if (item.isFile) {
        item.file(function (file) {
          console.log(file)
          this.files.push(file)
        })
      }
    },
    submitFile () {
      const formData = new FormData()
      // const url = 'https://server-auto-settap.herokuapp.com/api/create_processed_image/'
      const url = 'https://server-auto-settap.herokuapp.com/api/align/'
      for (var i = 0; i < this.files.length; i++) {
        formData.append('image', this.files[i])
      }
      formData.append('folder', this.folder)
      formData.append('base', this.base)
      axios
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `token ${localStorage.token}`
          }
        })
        .then(() => {
          console.log('Success!!')
        })
        .catch((error) => {
          console.log(error)
        })
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

img {
  width: 800px;
  user-select: none;
}
</style>
