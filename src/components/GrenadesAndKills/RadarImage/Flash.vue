<template>
  <g
    v-if="grenadeData"
    class="flash"
    :class="[{ 'enemies-flashed': enemiesFlashedDuration > 0}, {'kill-assist': killAssist}, grenadeData.UserIsCt ? 'ct' : 'terrorist' ]"
    :id="grenadeData.Id"
    @click="SetSelectedSample(grenadeData.Id)"
  >
    <circle
      v-if="isSelected || showTrajectories"
      class="attacker-circle is-user"
      :cx="grenadeData.ReleaseX"
      :cy="grenadeData.ReleaseY"
      :r="releaseRadius +'px'"
    />
    <polyline
      v-if="isSelected || showTrajectories"
      class="trajectory"
      vector-effect="non-scaling-stroke"
      :points="trajectory"
    ></polyline>
    <circle
      class="detonation"
      :cx="grenadeData.DetonationX"
      :cy="grenadeData.DetonationY"
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
        :cx="hit.VictimPosX"
        :cy="hit.VictimPosY"
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
      return 5 / this.scaleFactor;
    },
    detonationRadius() {
      var baseRadius = 5;
      var maxRadius = 14;
      var maxFlashDuration = 7000;
      var normalizedPerformance = this.$helpers.NormalizedPerformance(
        this.enemiesFlashedDuration,
        maxFlashDuration,
        0
      );
      return (
        (baseRadius + normalizedPerformance * (maxRadius - baseRadius)) /
        this.scaleFactor
      );
    },
    victimRadius() {
      return 5 / this.scaleFactor;
    },
    enemiesFlashedDuration() {
      if (this.grenadeData.Flasheds.filter(x => !x.TeamAttack).length == 0) {
        return 0;
      }

      return this.grenadeData.Flasheds.filter(x => !x.TeamAttack).reduce(
        (acc, obj) => obj.FlashedDuration + acc,
        0
      );
    },
    trajectory() {
      var trajectoryString = "";
      for (let i = 0; i < this.grenadeData.Trajectory.length; i++) {
        const element = this.grenadeData.Trajectory[i];
        trajectoryString += element.X + "," + element.Y + " ";
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
    stroke-width: 1.5px;
    stroke: $success-color;
    &.team-attack {
      stroke: $failure-color;
    }
  }

  .detonation {
    fill: black;
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
