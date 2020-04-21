<template>
  <g
    class="kill"
    :class="[ killData.UserWinner ? 'userkiller' : 'uservictim', killData.UserIsCt ? 'ct' : 'terrorist' ]"
    :id="killData.Id"
    @click="SetSelectedSample(killData.Id)"
  >
    <circle v-if="killData.UserWinner"
      class="user-circle"
      :cx="killData.PlayerPos.PosPixel.X"
      :cy="killData.PlayerPos.PosPixel.Y"
      :r="userRadius +'px'"
    />

    <circle v-if="!killData.UserWinner"
      class="user-circle"
      :cx="killData.VictimPos.PosPixel.X"
      :cy="killData.VictimPos.PosPixel.Y"
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
      return 10 / this.scaleFactor;
    },
    killConnection() {
      return (
        this.killData.PlayerPos.PosPixel.X +
        "," +
        this.killData.PlayerPos.PosPixel.Y +
        " " +
        this.killData.VictimPos.PosPixel.X +
        "," +
        this.killData.VictimPos.PosPixel.Y
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
    stroke-width: 2px;
    fill: none;
    stroke: white;
    opacity: 1;

    stroke-dasharray: 30;
    stroke-linecap: round;
    animation: dash 3000ms linear;
    animation-iteration-count: infinite;
    animation-direction: reverse;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 300;
    }
  }

  // &.userkiller .connection{
  //     stroke: $success-color;
  // }

  // &.uservictim .connection{
  //     stroke: $failure-color;
  // }
}
</style>
