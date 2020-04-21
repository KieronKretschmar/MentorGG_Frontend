<template>
  <g
    class="he-grenade"
    :class="[{ 'enemies-hit': damageDealtToEnemies > 0}, { 'enemies-killed': enemiesKilled }, grenadeData.UserIsCt ? 'ct' : 'terrorist' ]"
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
        v-for="(hit,index) in grenadeData.Hits"
        :key="index"
        class="victim-circle"
        :class="[
          {'fatal' : hit.Kill}, 
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
      var maxDamageDealt = 100;
      var normalizedPerformance = this.$helpers.NormalizedPerformance(
        this.damageDealtToEnemies,
        maxDamageDealt,
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
    damageDealtToEnemies() {
      if (this.grenadeData.Hits.filter(x => !x.TeamAttack).length == 0) {
        return 0;
      }

      return this.grenadeData.Hits.filter(x => !x.TeamAttack).reduce(
        (acc, obj) => obj.AmountHealth + acc,
        0
      );
    },
    enemiesKilled() {
      return (
        this.grenadeData.Hits.filter(x => !x.TeamAttack && x.Kill).length > 0
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
  }
};
</script>

<style lang="scss">
.he-grenade {
  cursor: pointer;
  
  .attacker-circle.is-user{
    fill: $orange;
  }

  .trajectory {
    stroke-width: 3.0px;
    fill: none;
    /* stroke-dasharray: 5, 3; */
    stroke: #ffffff;
    opacity: 0.5;
  }

  .victim-circle {
    &.ct {
      fill: $ct-color;
    }
    &.terrorist {
      fill: $terrorist-color;
    }

    &.fatal {
      stroke-width: 3.0px;
      stroke: $success-color;
    }

    &.fatal.team-attack {
      stroke: $failure-color;
    }

    &.is-user {
      fill: $orange;      
    }
  }

  .detonation {
    fill: $light-1;
  }
  &.enemies-hit .detonation {
    fill: white;
  }
  &.enemies-killed .detonation {
    fill: $success-color;
  }
}
</style>
