<template>
  <div class="context-menu">
    <div class="menu-item">
      <img
        src="@/assets/save_icon.png"
        class="save-icon"
      >
      <DownloadZipFile :folder="item" />
    </div>
    <div
      class="menu-item"
      @click.left.prevent="onDelete"
    >
      <img
        src="@/assets/delete_icon.png"
        class="delete-icon"
      >
      <span><del>削除</del></span>
    </div>
  </div>
</template>

<script>
import DownloadZipFile from '@/components/DownloadZipFile.vue'
export default {
  name: 'ContextMenu',
  components: {
    DownloadZipFile

  },
  props: {
    item: {}
  },
  data () {
    return {}
  },

  methods: {
    onDelete () {
      alert('削除はまだ未実装（；´д｀ ）')
    }
  }
}
</script>

<style lang="scss" scoped>
.context-menu {
  padding-top: 10px;
  padding-bottom: 10px;
  width: 170px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.3);

  .menu-item {
    padding: 5px 10px;
    display: block;
    text-align: left;
    &:hover {
      background-color: #e6e6e6;
    }
    img {
      width: 24px;
      vertical-align: middle;
    }
    span {
      margin-left: 15px;
      font-size: 16px;
      line-height: 24px;
      vertical-align: middle;
    }
  }
}
</style>
