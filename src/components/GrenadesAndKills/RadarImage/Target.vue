<template>
  <g v-if="zoneData" class="target" @click="SetSelectedZone(zoneData.ZoneId)">

    <!-- Images for smoke targets -->
    <image class="smoke target" v-bind="{'xlink:href':this.$api.resolveResource(filename)}"  :x="posX" :y="posY"
            :width="width" :height="height" color="#002220"/>

  </g>
</template>

<script>
export default {
  props: [
    "zoneType",
    "zoneData",
    "SetSelectedZone",
    "scaleFactor",
  ],
  data(){
      return {
        width : 50 * this.scaleFactor,
        height : 50 * this.scaleFactor,
      }
  },
  computed: {
      filename() {
          return '~/Content/Images/Icons/Smoke_Clear.png';
      },
      posX() {
          return this.zoneData.GrenadePosXPixel - (this.width /2);
      },
      posY() {
          return this.zoneData.GrenadePosYPixel - (this.height/2);
      },
  }
};
</script>

<style>
polyline {
  stroke-width: 1px;
  stroke-opacity: 0.5;
  stroke: white;
}
</style>
