<template>
  <div
    class="processed"
    @click.left.prevent="onleftClick"
  >
    <div class="group-conteinar">
      <div
        v-for="processed_group in processedGroups"
        :key="processed_group.name"
        @click.right.prevent="onRightClick($event,processed_group.name)"
      >
        <a
          :href="`processed/${processed_group.name}`"
          @click.left.stop="onleftClick"
        ><div
          class="group"
        >
          <div class="group-item">
            <img
              class="folder-icon"
              src="@/assets/folder_icon.png"
            >
            <span>{{ processed_group.name }}</span>
          </div>
        </div></a>
      </div>
    </div>
    <div v-show="isRightClick">
      <ContextMenu
        class="ContextMenu"
        :style="contextMenuStyle"
        :item="clickedItem"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ContextMenu from '@/components/ContextMenu.vue'
export default {
  components: {
    ContextMenu
  },
  inject: ['API_URL'],
  data () {
    return {
      processedImages: null,
      processedGroups: null,
      href: null,
      img: null,
      isRightClick: false,
      clickedItem: null,
      contextMenuStyle: {
        top: null,
        left: null
      }
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
      .get(`${this.API_URL}/api/image_group`, {
        headers: {
          Authorization: `token ${localStorage.token}`
        }
      })
      .then(response => {
        this.processedGroups = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    onRightClick (event, item) {
      this.isRightClick = true
      this.contextMenuStyle.left = event.clientX + 'px'
      this.contextMenuStyle.top = event.clientY + 'px'
      this.clickedItem = item
    },
    onleftClick () {
      this.isRightClick = false
    }
  }
}
</script>

<style lang="scss" scoped>
.processed {
  height: 100%;
}
.ContextMenu {
  position: fixed;
}
.group-conteinar {
  display: flex;
  padding-left: 100px;
   padding-right:  100px;
  a {
    text-decoration: none;
    color: #2c3e50;
  }
  .group {
    margin-left: 20px;
    color: #929292;
    border: 2px solid #929292;
    border-radius: 5px;
    background: #fff;
    padding: 5px;
    width: 300px;
    box-sizing: border-box;
    float: left;
    .group-item {
       margin-left: 20px;
      float: left;
      span {
        margin-left: 10px;
        line-height: 30px;
        vertical-align: middle;
        font-size: 20px;
      }
      .folder-icon {
        width: 30px;
        margin-right: 3px;
        vertical-align: middle;
      }
    }
  }
}
</style>
