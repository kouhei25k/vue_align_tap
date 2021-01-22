<template>
  <div>
    <p>processed_image_grops</p>
    <div class="group-conteinar">
      <div
        v-for="processed_group in processedGroups"
        :key="processed_group.name"
        class="group"
      >
        <a :href="`processed/${processed_group.name}`">
          <img
            class="folder-icon"
            src="@/assets/folder_icon.png"
          >
          <p>{{ processed_group.name }}</p>
        </a>
        <DownloadZipFile :folder="processed_group.name" />
      </div>
    </div>

    <div>
      <!-- <DrawSquareInSVG :pt1="pt1" :pt2=pt2 /> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import DownloadZipFile from '@/components/DownloadZipFile.vue'

export default {
  components: {
    DownloadZipFile
  },
  data () {
    return {
      processedImages: null,
      processedGroups: null,
      href: null,
      img: null
    }
  },
  computed: {
    gethref (groupname) {
      return function () {
        return 'processed/' + groupname
      }
    }
  },

  mounted () {
    axios
      .get('http://127.0.0.1:8000/api/image_group', {
        headers: {
          Authorization: `token ${localStorage.token}`
        }
      })
      .then((response) => {
        this.processedGroups = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style lang="scss" scoped>
.group-conteinar {
  display: flex;
}
.group {
  text-align: center;
  display: inline-block;
  p {
    margin: 0;
  }
}
</style>
