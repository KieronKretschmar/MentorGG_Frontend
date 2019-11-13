<template>
  <div
    class="rendered-bomb-object"
    v-if="plantExists && wasPlanted"
    :class="{defused: wasDefused, detonated: hasDetonated}"
    :style="{left: `${position.x}px`, top: `${position.y}px`}"
  >
    <span class="icon">a</span>
  </div>
</template>

<script>
//TODO: Add fake plant / defuse
export default {
  props: ["bomb", "tick"],
  mounted() {},
  computed: {
    plantExists() {
      if (this.bomb == null) {
        return false;
      }

      if (!this.bomb.plant) {
        return false;
      }

      return true;
    },
    wasPlanted() {
      if (!this.plantExists) {
        return false;
      }

      return this.tick >= this.bomb.plant.Time;
    },
    wasDefused() {
      if (!this.bomb.defuse) {
        return false;
      }

      return this.tick >= this.bomb.defuse.Time;
    },
    hasDetonated() {
      if (!this.bomb.detonation) {
        return false;
      }

      return this.tick >= this.bomb.detonation.Time;
    },
    timeLeft() {
      if (!this.wasPlanted) {
        return 0;
      }
    },
    position() {
      if (!this.wasPlanted) {
        return { x: 0, y: 0 };
      }

      return {
        x: window.DemoViewer.RemapCoordinate(this.bomb.plant.Pos.PosX),
        y: window.DemoViewer.RemapCoordinate(this.bomb.plant.Pos.PosY)
      };
    }
  }
};
</script>

<style lang="scss">
.rendered-bomb-object {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  margin-left: -16px;
  margin-top: -16px;
  transition: 0.25s width, 0.25s height, 0.5s opacity, 0.25s margin;

  &.defused {
    .icon {
      color: lighten(green, 20%);
      transform: scale(0.4);
    }
  }

  &.detonated {
    opacity: 0;
    width: 300px;
    height: 300px;
    margin-left: -150px;
    margin-top: -150px;
    background: crimson;
  }

  .icon {
    transition: 0.3s;
    @include weapon-font;
    color: red;
    font-size: 20px;
    z-index: 110;
  }
}
</style>