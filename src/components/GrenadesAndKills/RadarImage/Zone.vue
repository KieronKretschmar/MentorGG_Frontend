<template>
  <g v-if="zoneData" class="zone" @click="SetSelectedZone(zoneData.ZoneId)">

    <polyline v-show="!isSelected"
      vector-effect="non-scaling-stroke"
      :style="{fill:fillColor}"
      :points="polygonPoints"
    ></polyline>

    
    <polyline v-show="isSelected" class="selected"
      vector-effect="non-scaling-stroke"
      :style="{stroke:fillColor}"
      :points="polygonPoints"
    ></polyline>

  </g>
</template>

<script>
export default {
  props: [
    "zoneData",
    "SetSelectedZone",
    "fillColor",
    "isSelected"
  ],
  computed: {
    polygonPoints() {
      var polygonPoints = "";
      for (let i = 0; i < this.zoneData.PolygonPointsX.length; i++) {
        polygonPoints +=
          this.zoneData.PolygonPointsX[i] +
          "," +
          this.zoneData.PolygonPointsY[i] +
          " ";
      }
      return polygonPoints;
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
polyline.selected{
  fill:none;
  stroke-width: 8px;
  stroke-opacity: 1;
}
</style>
