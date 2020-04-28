<template>
  <g
    class="smoke"
    :class="[
    { 'not-rated': grenadeData.Result == Enums.LineupAttemptResult.Default || grenadeData.Result == Enums.LineupAttemptResult.NoTarget}, 
    { 'target-missed': grenadeData.Result == Enums.LineupAttemptResult.Miss}, 
    { 'target-hit': grenadeData.Result == Enums.LineupAttemptResult.Inside}, 
    grenadeData.UserIsCt ? 'ct' : 'terrorist' ]"
    :id="grenadeData.Id"
    @click="SetSelectedSample(grenadeData.Id)"
  >
    <circle
      v-if="showTrajectories"
      class="attacker-circle is-user"
      :cx="releasePosPixel.X"
      :cy="releasePosPixel.Y"
      :r="releaseRadius +'px'"
    />
    <polyline
      v-if="showTrajectories || isSelected"
      class="trajectory"
      vector-effect="non-scaling-stroke"
      :points="trajectoryString"
    ></polyline>
    <circle
      class="detonation"
      :cx="detonationPosPixel.X"
      :cy="detonationPosPixel.Y"
      :r="detonationRadius +'px'"
    />
  </g>
</template>

<script>
import FeatureBase from "@/components/RadarImageFeatures/FeatureBase.vue";
import Enums from "@/enums";

export default {
  extends: FeatureBase,
  data() { 
    return {
      Enums,
    }
  },
  props: [
    "grenadeData",
    "scaleFactor",
    "showTrajectories",
    "SetSelectedSample",
    "isSelected",
    "fixedDetonationRadius",
  ],
  computed: {
    releaseRadius() {
      return 10 / this.scaleFactor;
    },
    detonationRadius() {
      if(this.fixedDetonationRadius) return this.fixedDetonationRadius;
      return 80 / this.scaleFactor;
    },
    detonationPosPixel(){
      return this.grenadeData.Trajectory[this.grenadeData.Trajectory.length - 1].PosPixel;
    },
    releasePosPixel() {
      return this.grenadeData.Trajectory[0].PosPixel;
    },
    trajectoryString() {
      let trajectoryString = "";
      for (let i = 0; i < this.grenadeData.Trajectory.length; i++) {
        const element = this.grenadeData.Trajectory[i];
        trajectoryString += element.PosPixel.X + "," + element.PosPixel.Y + " ";
      }
      return trajectoryString;
    },
  }
};
</script>

<style lang="scss">
.smoke {
  cursor: pointer;
  .attacker-circle.is-user{
    fill: $orange;
  }

  .detonation {
    opacity: 0.4;
    fill: white;
  }
  &.target-missed .detonation {
    fill: $failure-color;
  }
  &.target-hit .detonation {
    fill: $success-color;
  }
}
</style>
