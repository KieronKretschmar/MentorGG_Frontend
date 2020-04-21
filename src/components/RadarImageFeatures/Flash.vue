<template>
  <g
    class="flash"
    :class="[{ 'enemies-flashed': enemiesTimeFlashed > 0}, {'kill-assist': killAssist}, grenadeData.UserIsCt ? 'ct' : 'terrorist' ]"
    :id="grenadeData.Id"
    @click="SetSelectedSample(grenadeData.Id)"
  >
    <circle
      v-if="isSelected || showTrajectories"
      class="attacker-circle is-user"
      :cx="releasePosPixel.X"
      :cy="releasePosPixel.Y"
      :r="releaseRadius +'px'"
    />
    <polyline
      v-if="isSelected || showTrajectories"
      class="trajectory"
      vector-effect="non-scaling-stroke"
      :points="trajectoryString"
    ></polyline>
    <circle
      class="detonation"
      :cx="detonationPosPixel.X"
      :cy="detonationPosPixel.Y"
      data-toggle="tooltip"
      data-placement="top"
      title="@(tooltipTitle)"
      :r="detonationRadius +'px'"
    />

    <g v-if="isSelected" class="victims-group">
      <circle
        v-for="(hit,index) in grenadeData.Flasheds"
        :key="index"
        class="victim-circle"
        :class="[
          {'kill-assist' : hit.FlashAssist}, 
          {'team-attack' : hit.TeamAttack},
          {'is-user' : hit.VictimIsAttacker},
          hit.TeamAttack == grenadeData.UserIsCt ? 'ct' : 'terrorist']"
        :cx="hit.VictimPosPixel.X"
        :cy="hit.VictimPosPixel.Y"
        :r="victimRadius + 'px'"
      />
    </g>
  </g>
</template>

<script>
export default {
  props: [
    "grenadeData",
    "scaleFactor",
    "showTrajectories",
    "SetSelectedSample",
    "isSelected"
  ],
  computed: {
    releaseRadius() {
      return 10 / this.scaleFactor;
    },
    detonationRadius() {
      var baseRadius = 10;
      var maxRadius = 28;
      var maxTimeFlashed = 7000;
      var normalizedPerformance = this.$helpers.NormalizedPerformance(
        this.enemiesTimeFlashed,
        maxTimeFlashed,
        0
      );
      return (
        (baseRadius + normalizedPerformance * (maxRadius - baseRadius)) /
        this.scaleFactor
      );
    },
    victimRadius() {
      return 10 / this.scaleFactor;
    },
    enemiesTimeFlashed() {
      if (this.grenadeData.Flasheds.filter(x => !x.TeamAttack).length == 0) {
        return 0;
      }

      return this.grenadeData.Flasheds.filter(x => !x.TeamAttack).reduce(
        (acc, obj) => obj.TimeFlashed + acc,
        0
      );
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
    killAssist() {
      return (
        this.grenadeData.Flasheds.filter(x => !x.TeamAttack && x.FlashAssist)
          .length > 0
      );
    }
  }
};
</script>

<style lang="scss">
.flash {
  cursor: pointer;
  .attacker-circle.is-user {
    fill: $orange;
  }

  .trajectory {
    stroke-width: 3.0px;
    fill: none;
    /* stroke-dasharray: 5, 3; */
    stroke: #ffffff;
    opacity: 0.5;
  }

  .ct.victim-circle {
    fill: $ct-color;
  }
  .terrorist.victim-circle {
    fill: $terrorist-color;
  }
  .is-user {
    fill: $orange !important;
  }
  & .kill-assist.victim-circle {
    stroke-width: 3.0px;
    stroke: $success-color;
    &.team-attack {
      stroke: $failure-color;
    }
  }

  .detonation {
    fill: $light-1;
  }
  &.enemies-flashed .detonation {
    fill: white;
  }
  &.enemies-flashed.kill-assist .detonation {
    fill: $success-color;
    // stroke: $success-color;
    // stroke-width: 2.5px;
  }
}
</style>
