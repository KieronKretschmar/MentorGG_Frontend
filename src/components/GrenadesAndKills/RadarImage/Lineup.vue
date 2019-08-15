<template>
  <g
    v-if="lineupData"
    class="lineup"
    :id="lineupData.LineupId"
    @click="SetSelectedLineup(lineupData.LineupId)"
  >
    <circle
      class="release-circle "
      :cx="lineupData.PlayerPosXPixel"
      :cy="lineupData.PlayerPosYPixel"
      :r="releaseRadius +'px'"
      :style="{fill: fillColor}"
    />
    <polyline
      class="trajectory"
      vector-effect="non-scaling-stroke"
      :points="trajectory"
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
    "zoneData",
  ],
  computed: {
    releaseRadius() {
        return  10 / this.scaleFactor;
    },
    trajectory() {
        // Currently there are no trajectories for lineups stored in db
        // for (let i = 0; i < this.lineupData.Trajectory.length; i++) {
        // const element = this.lineupData.Trajectory[i];
        // trajectoryString += element.X + "," + element.Y + " ";
        // }       
        let trajectoryString = "";
        trajectoryString += this.lineupData.PlayerPosXPixel + "," + this.lineupData.PlayerPosYPixel + " ";
        trajectoryString += this.zoneData.GrenadePosXPixel + "," + this.zoneData.GrenadePosYPixel + " ";

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
    stroke-width: 2px;
    // fill: white;
    stroke-opacity: 1;
  }

}
</style>
