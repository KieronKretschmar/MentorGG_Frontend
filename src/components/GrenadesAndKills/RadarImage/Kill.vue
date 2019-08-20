<template>
  <g
    v-if="killData"
    class="kill"
    :class="[ killData.UserWinner ? 'userkiller' : 'uservictim', killData.UserIsCt ? 'ct' : 'terrorist' ]"
    :id="killData.Id"
    @click="SetSelectedSample(killData.Id)"
  >
    <circle v-if="killData.UserWinner"
      class="user-circle"
      :cx="killData.PlayerPosX"
      :cy="killData.PlayerPosY"
      :r="userRadius +'px'"
    />

    <circle v-if="!killData.UserWinner"
      class="user-circle"
      :cx="killData.VictimPosX"
      :cy="killData.VictimPosY"
      :r="userRadius +'px'"
    />

    <polyline
      v-if="isSelected || showTrajectories"
      class="connection"
      vector-effect="non-scaling-stroke"
      :points="killConnection"
    ></polyline>
  </g>
</template>

<script>
export default {
  props: [
    "killData",
    "scaleFactor",
    "SetSelectedSample",
    "isSelected",
    "showTrajectories"
  ],
  computed: {
    userRadius() {
      return 5 / this.scaleFactor;
    },
    killConnection() {
      return (
        this.killData.PlayerPosX +
        "," +
        this.killData.PlayerPosY +
        " " +
        this.killData.VictimPosX +
        "," +
        this.killData.VictimPosY
      );
    }
  }
};
</script>

<style lang="scss">
.kill {
  // &.ct .user-circle{
  //     fill: $ct-color;
  // }
  // &.terrorist .user-circle{
  //     fill: $terrorist-color;
  // }

  &.userkiller .user-circle {
    fill: $success-color;
  }
  &.uservictim .user-circle {
    fill: $failure-color;
  }

  .connection {
    stroke-width: 1.5px;
    fill: none;
    stroke: white;
    opacity: 1;
  }

  // &.userkiller .connection{
  //     stroke: $success-color;
  // }

  // &.uservictim .connection{
  //     stroke: $failure-color;
  // }
}
</style>
