<template>
  <div class="drop_container">
    <div v-if="isDroped">
      <div>
        <div class="droped_area">
          <div
            v-show="folder"
            class="folder"
          >
            <img
              src="@/assets/folder_icon.png"
              class="folder-icon"
            >
            <span>{{ folder }}</span>
          </div>
          <div class="image-list">
            <div
              v-for="file in files"
              :key="file.name"
              class="image-name"
            >
              <img
                src="@/assets/image_icon.png"
                class="image-icon"
              ><span>{{
                file.name
              }}</span>
            </div>
          </div>
        </div>
        <div
          class="button"
          @click="submitFile()"
        >
          画像を揃える
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
import axios from 'axios'
export default {
  name: 'DropInput',
  inject: ['API_URL'],
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
      files: [],
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
      var items = event.dataTransfer.items

      for (var i = 0; i < items.length; i++) {
        var item = items[i].webkitGetAsEntry()
        if (item) {
          if (item.isFile) {
            item.file(file => {
              this.files.push(file)
            })
          } else if (item.isDirectory) {
            console.log(item.fullPath)
            var folderName = item.fullPath.substr(1)

            var dirReader = item.createReader()
            dirReader.readEntries(entries => {
              for (var i = 0; i < entries.length; i++) {
                this.getFileTree(entries[i], item.name + '/')
                // if (entries[i].isFile) {
                //   entries[i].file((file) => {
                //     console.log(file.name)
                //     files.push(file)
                //   })
                // }
              }
            })
          }
        }
      }
      this.folder = folderName
      this.isDroped = false
      this.isDroped = true
    },
    getFileTree: function (item, path) {
      if (item.isFile) {
        item.file(file => {
          console.log(file)
          this.files.push(file)
        })
      }
    },
    submitFile () {
      if (!this.base) {
        alert('使用するベース画像を選択してください')
      } else {
        const formData = new FormData()
        const url = `${this.API_URL}/api/align/`
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
            this.$router.push('/processed')
          })
          .catch(error => {
            console.log(error)
            alert('ファイルを送信出来ませんでした。')
            this.isDroped = false
          })
      }
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
  display: flex;
  font-size: 1.2em;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 300px;
  border: 5px solid #505050;
  border-radius: 10px;
}
.droped_area {
  color: #505050;
  font-weight: bold;
  font-size: 1.2em;
  width: 500px;
  height: 300px;
  border: 3px solid #505050;
  position: relative;
  border-radius: 10px;
}

.enter {
  border: 10px dotted powderblue;
}
.folder {
  position: absolute;
  text-align: center;
  display: inline-block;
  top: 30px;
  left: 50px;
  .folder-icon {
    width: 36px;
    margin-right: 3px;
    vertical-align: middle;
  }
  span {
    font-size: 24px;
    line-height: 36px;
    vertical-align: middle;
  }
}
.image-list {
  position: absolute;
  margin: 10px;
  top: 60px;
  left: 70px;
  .image-name {
    margin-bottom: 3px;
    span {
      line-height: 24px;
      vertical-align: middle;
    }
    .image-icon {
      width: 24px;
      margin-right: 3px;
      vertical-align: middle;
    }
  }
}
.button {
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
</style>
