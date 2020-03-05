<template>
  <g
    v-if="lineupData"
    class="lineup"
    :id="lineupData.LineupId"
    @click="SetSelectedLineup(lineupData.LineupId)"
  >
    <circle
      class="release-circle "
      :cx="releasePosPixel.X"
      :cy="releasePosPixel.Y"
      :r="releaseRadius +'px'"
      :style="{fill: fillColor}"
    />
    <polyline
      class="trajectory"
      vector-effect="non-scaling-stroke"
      :points="trajectoryString"
      :style="{stroke: fillColor}"
    ></polyline>
  </g>
</template>

<script>
export default {
  props: [
    "lineupData",
    "SetSelectedLineup",
    "scaleFactor",
    "fillColor",
    "targetData",
  ],
  computed: {
    releaseRadius() {
        return  20 / this.scaleFactor;
    },
    detonationPosPixel(){
      return this.lineupData.Trajectory[this.lineupData.Trajectory.length - 1].PosPixel;
    },
    releasePosPixel() {
      return this.lineupData.Trajectory[0].PosPixel;
    },
    trajectoryString() {
      let trajectoryString = "";
      for (let i = 0; i < this.lineupData.Trajectory.length; i++) {
        const element = this.lineupData.Trajectory[i];
        trajectoryString += element.PosPixel.X + "," + element.PosPixel.Y + " ";
      }
      return trajectoryString;
    }
  }
};
</script>

<style lang="scss">
.lineup {
//   .release-circle{
//     fill: $orange;
//   }

  .trajectory {
    stroke-width: 3px;
    // fill: white;
    stroke-opacity: 1;
  }

}
</style>
