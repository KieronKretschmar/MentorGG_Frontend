<template>
  <g
    class="molotov"
    :class="[{ 'enemies-hit': damageDealtToEnemies > 0}, grenadeData.UserIsCt ? 'ct' : 'terrorist' ]"
    :id="grenadeData.Id"
    @click="SetSelectedSample(grenadeData.Id)"
  >    
    <circle
      class="detonation"
      :cx="detonationPosPixel.X"
      :cy="detonationPosPixel.Y"
      data-toggle="tooltip"
      data-placement="top"
      title="@(tooltipTitle)"
      :r="detonationRadius +'px'"
    />
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


    <g v-if="isSelected" class="victims-group">
      <g v-for="victimData in grenadeData.Victims" 
      :key=victimData.VictimId
      class="molotov-victim">
        <circle
          v-for="(hit,index) in victimData.Hits"
          :key="index"
          class="victim-circle"
          :class="[
            {'fatal' : hit.Kill}, 
            {'team-attack' : hit.TeamAttack},
            {'is-user' : hit.VictimIsAttacker},
            victimData.TeamAttack == grenadeData.UserIsCt ? 'ct' : 'terrorist']"
          :cx="hit.VictimPos.PosPixel.X"
          :cy="hit.VictimPos.PosPixel.Y"
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
    victimRadius() {
      return 10 / this.scaleFactor;
    },
    damageDealtToEnemies() {
      if (this.grenadeData.Victims.filter(x => !x.TeamAttack).length == 0) {
        return 0;
      }
      return this.grenadeData.Victims.filter(x => !x.TeamAttack && x.Hits).reduce((acc, v) => 
        v.Hits.reduce((acc, obj) => obj.AmountHealth + acc, 0), 0);
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
.molotov {
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
