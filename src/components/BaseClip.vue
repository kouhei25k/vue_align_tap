<template>
  <div class="base-clip-svg">
    <svg
      id="svg"
      ref="svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        :x="shape.x"
        :y="shape.y"
        :width="shape.w"
        :height="shape.h"
        :stroke-opacity="opacity"
        @mousedown.stop="drag($event)"
        @mouseup.stop="drop()"
      />
      <circle
        :cx="shape.x"
        :cy="shape.y"
        :fill-opacity="opacity"
        r="8"
        @mousedown.stop="cDrag($event, 1)"
        @mouseup.stop="cDrop()"
      />
      <circle
        :cx="shape.x + shape.w"
        :cy="shape.y"
        :fill-opacity="opacity"
        r="8"
        @mousedown.stop="cDrag($event, 2)"
        @mouseup.stop="cDrop()"
      />
      <circle
        :cx="shape.x"
        :cy="shape.y + shape.h"
        :fill-opacity="opacity"
        r="8"
        @mousedown.stop="cDrag($event, 3)"
        @mouseup.stop="cDrop()"
      />
      <circle
        :cx="shape.x + shape.w"
        :cy="shape.y + shape.h"
        :fill-opacity="opacity"
        r="8"
        @mousedown.stop="cDrag($event, 4)"
        @mouseup.stop="cDrop()"
      />
    </svg>
  </div>
</template>

<script>
export default {
  inject: ['API_URL'],
  data () {
    return {
      // setting for Rect object
      shape: {
        x: 100,
        y: 100,
        w: 150,
        h: 150
      },
      opacity: 0,
      dragOffsetX: null,
      dragOffsetY: null,
      dragoffsetW: null,
      dragoffsetH: null,
      circleId: null
    }
  },
  methods: {
    // For drag start event
    drag (e) {
      // temporarily save
      this.dragOffsetX = e.offsetX - this.shape.x
      this.dragOffsetY = e.offsetY - this.shape.y
      this.opacity = 1
      // Add Event
      this.$refs.svg.addEventListener('mousemove', this.move)
    },
    // For drag End event
    drop () {
      // Reset variable
      this.dragOffsetX = this.dragOffsetY = null
      this.opacity = 0
      // Remove Event
      this.$emit('pt', this.shape.x, this.shape.y, this.shape.w, this.shape.h)
      this.$refs.svg.removeEventListener('mousemove', this.move)
    },
    // For move(dragging) Event
    move ({ offsetX, offsetY }) {
      // Update position
      var svg = document.getElementById('svg')
      var pX = offsetX - this.dragOffsetX
      var pY = offsetY - this.dragOffsetY
      var mX = svg.clientWidth - this.shape.w
      var mY = svg.clientHeight - this.shape.h

      if (pX < 0) {
        this.shape.x = 0
      } else if (pX > mX) {
        this.shape.x = mX
      } else {
        this.shape.x = pX
      }

      if (pY < 0) {
        this.shape.y = 0
      } else if (pY > mY) {
        this.shape.y = mY
      } else {
        this.shape.y = pY
      }
    },

    cDrag (e, index) {
      this.circleId = index
      this.dragOffsetX = this.shape.x
      this.dragOffsetY = this.shape.y
      this.dragoffsetW = this.shape.w
      this.dragoffsetH = this.shape.h
      this.opacity = 1
      this.$refs.svg.addEventListener('mousemove', this.resize)
    },
    cDrop () {
      this.circleId = null
      this.dragOffsetX = this.dragOffsetY = this.dragoffsetW = this.dragoffsetH = null
      this.opacity = 0
      this.$emit('pt', this.shape.x, this.shape.y, this.shape.w, this.shape.h)
      this.$refs.svg.removeEventListener('mousemove', this.resize)
    },
    resize ({ offsetX, offsetY }) {
      var svg = document.getElementById('svg')
      var mX = svg.clientWidth
      var mY = svg.clientHeight

      if (this.shape.w > mX) {
        this.shape.w = mX
      } else {
        switch (this.circleId) {
          case 1:
          case 3:
            this.shape.x = offsetX
            this.shape.w = this.dragoffsetW + (this.dragOffsetX - offsetX)

            break
          case 2:
          case 4:
            this.shape.w = offsetX - this.shape.x
            break
        }
      }

      if (this.shape.h > mY) {
        this.shape.h = mY
      } else {
        switch (this.circleId) {
          case 1:
          case 2:
            this.shape.y = offsetY
            this.shape.h = this.dragoffsetH + (this.dragOffsetY - offsetY)
            break
          case 3:
          case 4:
            this.shape.h = offsetY - this.shape.y
            break
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.base-clip-svg {
    position: absolute;
    z-index: 10;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
svg {
    width: 100%;
    height: 100%;
  rect {
    fill: #333333;
    fill-opacity: 0.4;
    stroke: #4782ff;
    stroke-width: 3;
  }
  circle {
    fill: #4782ff;
  }
}
</style>
