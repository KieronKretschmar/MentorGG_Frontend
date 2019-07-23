<template>
  <g
    v-if="grenadeData"
    class="firenade"
    :class="[{ 'enemies-hit': damageDealtToEnemies > 0}, grenadeData.UserIsCt ? 'ct' : 'terrorist' ]"
    :id="grenadeData.Id"
    @click="SetSelectedSample(grenadeData.Id)"
  >    
    <circle
      class="detonation"
      :cx="grenadeData.DetonationX"
      :cy="grenadeData.DetonationY"
      data-toggle="tooltip"
      data-placement="top"
      title="@(tooltipTitle)"
      :r="detonationRadius +'px'"
    />
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


    <g v-if="isSelected" class="victims-group">
      <g v-for="victimData in grenadeData.Victims" 
      :key=victimData.VictimId
      class="firenade-victim">
        <circle
          v-for="(hit,index) in victimData.Hits"
          :key="index"
          class="victim-circle"
          :class="[
            {'lethal' : hit.Kill}, 
            {'team-attack' : hit.TeamAttack},
            {'is-user' : hit.VictimIsAttacker},
            hit.TeamAttack == grenadeData.UserIsCt ? 'ct' : 'terrorist']"
          :cx="hit.VictimPosX"
          :cy="hit.VictimPosY"
          :r="victimRadius + 'px'"
        />
      </g>
    </g>
  </g>
</template>

<script>
export default {
  props: [
    "grenadeData",
    "zoomFactor",
    "showTrajectories",
    "SetSelectedSample",
    "isSelected",
    "fixedDetonationRadius"
  ],
  computed: {
    releaseRadius() {
      return 5 * this.zoomFactor;
    },
    detonationRadius() {
      if(this.fixedDetonationRadius) return this.fixedDetonationRadius;
      return 40 * this.zoomFactor;
    },
    victimRadius() {
      return 5 * this.zoomFactor;
    },
    damageDealtToEnemies() {
      if (this.grenadeData.Victims.filter(x => !x.TeamAttack).length == 0) {
        return 0;
      }
      return this.grenadeData.Victims.filter(x => !x.TeamAttack && x.Hits).reduce((acc, v) => 
        v.Hits.reduce((acc, obj) => obj.AmountHealth + acc, 0), 0);
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
.firenade {
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

    &.lethal {
      stroke-width: 1.5px;
      stroke: $success-color;
      &.team-attack {
        stroke: $failure-color;
      }
    }

    &.is-user {
      fill: $orange;      
    }
  }

  .detonation {
    opacity: 0.4;
    fill: white;
  }
  &.enemies-hit .detonation {
    fill: red;
  }
}
</style>
