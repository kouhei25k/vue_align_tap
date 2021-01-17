<template>
  <div class="base-clip-svg">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <rect
        :x="svg.x"
        :y="svg.y"
        :width="svg.width"
        :height="svg.height"
        style=""
      />
    </svg>
    <button @click="computeSquareSize" />
  </div>
</template>

<script>
export default {
  name: 'DrawSquareInSVG',
  props: {
    pt1: {
      default: '0,0'
    },
    pt2: {
      default: '100,135'
    },

    nw: {
      default: '1000'
    },
    nh: {
      default: '500'
    }
  },

  data () {
    return {
      svg: {
        x: '0',
        y: '0',
        width: '100%',
        height: '100%'
      }
    }
  },
  // computed:{
  //     computeSquareSize(){
  //         const pt1= JSON.parse(this.pt1);
  //         const pt2= JSON.parse(this.pt2)
  //         this.x = pt1[0];
  //         this.y = pt1[1];
  //         this.width = pt2[0]-x;
  //         this.height = pt2[1]-y;
  //     }
  // }
  // computed:{
  //     x1:function(){
  //     return this.x = 0
  //     }
  // },
  methods: {
    computeSquareSize: function () {
      var pt1 = this.pt1
      var pt2 = this.pt2
      pt1 = pt1.split(',')
      pt2 = pt2.split(',')
      console.log(`${pt2}`)

      this.svg.x = String(pt1[0])
      this.svg.y = String(pt1[1])

      var width = pt2[0] - pt1[0]
      var height = pt2[1] - pt1[1]

      width = Math.round((width / this.nw) * 100)
      height = Math.round((height / this.nh) * 100)
      console.log(this.nh)
      console.log(height)
      this.svg.width = String(width) + '%'
      this.svg.height = String(height) + '%'
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
    fill: rgb(0, 0, 0);
    fill-opacity: 0.25;
    stroke-width: 0;
    stroke: rgb(0, 0, 0);
  }
}
</style>
