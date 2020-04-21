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
      class="trajectory"
      vector-effect="non-scaling-stroke"
      :points="killConnection"
    ></polyline>
  </g>
</template>

<script>
import FeatureBase from "@/components/RadarImageFeatures/FeatureBase.vue";

export default {
  extends: FeatureBase,
  props: [
    "killData",
    "scaleFactor",
    "SetSelectedSample",
    "isSelected",
    "showTrajectories"
  ],
  computed: {
    userRadius() {
      return Math.max(5, 10 / this.scaleFactor);
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
  cursor: pointer;

  &.userkiller .user-circle {
    fill: $success-color;
  }
  &.uservictim .user-circle {
    fill: $failure-color;
  }

  &.userkiller .trajectory{
      stroke: $success-color;
  }

  &.uservictim .trajectory{
      stroke: $failure-color;
  }
}
</style>
