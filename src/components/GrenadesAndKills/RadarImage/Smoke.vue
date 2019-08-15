<template>
  <g
    v-if="grenadeData"
    class="smoke"
    :class="[
    { 'not-rated': grenadeData.Result == 0 || grenadeData.Result == 4}, 
    { 'target-missed': grenadeData.Result == 1}, 
    { 'target-hit': grenadeData.Result == 2}, 
    grenadeData.UserIsCt ? 'ct' : 'terrorist' ]"
    :id="grenadeData.Id"
    @click="SetSelectedSample(grenadeData.Id)"
  >
    <circle
      v-if="showTrajectories"
      class="attacker-circle is-user"
      :cx="grenadeData.ReleaseX"
      :cy="grenadeData.ReleaseY"
      :r="releaseRadius +'px'"
    />
    <polyline
      v-if="showTrajectories"
      class="trajectory"
      vector-effect="non-scaling-stroke"
      :points="trajectory"
    ></polyline>
    <circle
      class="detonation"
      :cx="grenadeData.DetonationX"
      :cy="grenadeData.DetonationY"
      :r="detonationRadius +'px'"
    />
  </g>
</template>

<script>
export default {
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
      return 5 / this.scaleFactor;
    },
    detonationRadius() {
      if(this.fixedDetonationRadius) return this.fixedDetonationRadius;
      return 40;
    },
    trajectory() {
      var trajectoryString = "";
      for (let i = 0; i < this.grenadeData.Trajectory.length; i++) {
        const element = this.grenadeData.Trajectory[i];
        trajectoryString += element.X + "," + element.Y + " ";
      }
      return trajectoryString;
    }
  }
};
</script>

<style lang="scss">
.smoke {
  .attacker-circle.is-user{
    fill: $orange;
  }

  .trajectory {
    stroke-width: 1.5px;
    fill: none;
    /* stroke-dasharray: 5, 3; */
    stroke: #ffffff;
    opacity: 0.5;
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
