<template>
  <g v-if="targetData" class="target" @click="SetSelectedTarget(targetData.ZoneId)">

    <!-- Images for smoke targets -->
    <image class="smoke target" 
      v-bind="{'xlink:href':require('@/assets/radarimagefeatures/Smoke_Clear.png')}"  
      :x="x" 
      :y="y" 
      :width="width" 
      :height="height" 
      color="#002220"
      />

  </g>
</template>

<script>
export default {
  props: [
    "zoneType",
    "targetData",
    "SetSelectedTarget",
    "scaleFactor",
  ],
  data(){
      return {
        width : 100 / this.scaleFactor,
        height : 100 / this.scaleFactor,
      }
  },
  computed: {
    x() {
      return this.targetData.CenterPixel.X - (this.width /2);
    },
    y() {
      return this.targetData.CenterPixel.Y - (this.height /2);
    }
  }
};
</script>

<style>
polyline {
  stroke-width: 2px;
  stroke-opacity: 0.5;
  stroke: white;
}
</style>
