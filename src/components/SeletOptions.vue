<template>
  <div
    id="v-model-select-dynamic"
    class="demo"
  >
    <select
      v-model="selected"
      @change="selectedOption"
    >
      <option
        v-for="option in options"
        :key="option.value"
      >
        {{ option }}
      </option>
    </select>
    <span>Selected: {{ selected }}</span>
  </div>
</template>

<script>
export default {
  name: 'SeletOptions',
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
