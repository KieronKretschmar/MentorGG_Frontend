<template>
  <g v-if="zoneData" class="zone" @click="SetSelectedZone(zoneData.ZoneId)">

    <polyline v-show="!isSelected"
      vector-effect="non-scaling-stroke"
      :style="{fill:fillColor}"
      :points="polygonPointsPixel"
    ></polyline>

    
    <polyline v-show="isSelected" class="selected"
      vector-effect="non-scaling-stroke"
      :points="polygonPointsPixel"
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
    polygonPointsPixel() {
      var polygonPoints = "";
      for (var point of this.zoneData.GeometryPixel) {
        polygonPoints += point.X + ',' + point.Y + " ";
      }
      return polygonPoints;
    }
  }
};
</script>

<style>
polyline {
  stroke-width: 2px;
  stroke-opacity: 1;
  stroke: white;
}
polyline.selected{
  fill:url(#map-background-pattern-light); 
  stroke-width: 5px;
  stroke-opacity: 1;
  stroke: white;
}

</style>
