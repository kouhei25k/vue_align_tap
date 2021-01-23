<template>
  <div class="select-container">
    <span>使用するベース画像：  </span>
    <select
      v-model="selected"
      @change="selectedOption"
    >
      <option
        value=""
        hidden
      >
        Base Image
      </option>
      <option
        v-for="option in options"
        :key="option.value"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SeletOptions',
  inject: ['API_URL'],
  props: {
    options: {
      type: Array
    }
  },
  data () {
    return {
      selected: ''
    }
  },
  methods: {
    selectedOption () {
      this.$emit('selected', this.selected)
    }
  }
}
</script>
<style lang="scss" scoped>
.select-container {
  margin: 20px;
  select {
    width: 300px;
    padding: 8px 38px 8px 8px;
    color: #666666;
  }
}
</style>
