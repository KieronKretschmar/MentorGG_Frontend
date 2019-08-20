<template>
  <g
    v-if="grenadeData"
    class="he-grenade"
    :class="[{ 'enemies-hit': damageDealtToEnemies > 0}, { 'enemies-killed': enemiesKilled }, grenadeData.UserIsCt ? 'ct' : 'terrorist' ]"
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
        v-for="(hit,index) in grenadeData.Hits"
        :key="index"
        class="victim-circle"
        :class="[
          {'fatal' : hit.Kill}, 
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
      return 5 / this.scaleFactor;
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
.he-grenade {

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

  .victim-circle {
    &.ct {
      fill: $ct-color;
    }
    &.terrorist {
      fill: $terrorist-color;
    }

    &.fatal {
      stroke-width: 1.5px;
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
    fill: black;
  }
  &.enemies-hit .detonation {
    fill: white;
  }
  &.enemies-killed .detonation {
    fill: $success-color;
  }
}
</style>
