<template>
  <g v-if="zoneData" class="zone" @click="SetSelectedZone(zoneData.ZoneId)">

    <polyline
      vector-effect="non-scaling-stroke"
      :style="{fill:fillColor}"
      :points="polygonPoints"
    ></polyline>

  </g>
</template>

<script>
export default {
  props: [
    "zoneType",
    "zoneData",
    "userPerformanceData",
    "SetSelectedZone",
    "fillColor"
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
  stroke-width: 1px;
  stroke-opacity: 0.5;
  stroke: white;
}
</style>
