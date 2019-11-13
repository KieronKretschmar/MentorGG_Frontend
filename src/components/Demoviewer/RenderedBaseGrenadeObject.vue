<template>
  <div
    class="rendered-base-grenade-object"
    :style="{left: `${position.x}px`, top: `${position.y}px`}"
  >
    <div class="projectile" v-show="tick >= startTime && tick <= endTime">
      <span v-if="isFlash">e</span>
      <span v-if="!isFlash">b</span>
      <svg class="progress-ring" width="30" height="30">
        <circle
          class="circle"
          stroke-width="2"
          fill="transparent"
          :r="progressRadius"
          cx="15"
          cy="15"
          stroke="red"
          :style="{strokeDashoffset: progress, strokeDasharray: `${progressCircumference} ${progressCircumference}`}"
          shape-rendering="geometricPrecision"
        />
      </svg>
    </div>
    <div
      class="detonation-trigger"
      :type="isFlash ? 'flash' : 'he'"
      v-show="tick >= endTime && tick <= goneTime"
      :style="{background: isFlash ? `rgba(255, 255, 255, ${alpha})` :  `rgba(255, 0, 0, ${alpha})`}"
    ></div>
  </div>
</template>


<script>
export default {
  props: ["grenade", "isFlash", "tick"],
  mounted() {},
  data() {
    return {
      lastPositionIndex: 0,
      position: {
        x: 0,
        y: 0
      },
      startAlpha: 1,
      progressRadius: 12,
      visibleTime: 250
    };
  },
  computed: {
    endTime() {
      return this.grenade.Trajectory[this.grenade.Trajectory.length - 1].Time;
    },
    startTime() {
      return this.grenade.Trajectory[0].Time;
    },
    goneTime() {
      return this.endTime + this.visibleTime; //smokes stay for 18 seconds
    },
    fadeTime() {
      return this.goneTime - 250; //start fading at 15 seconds
    },
    alpha() {
      if (this.tick < this.fadeTime) {
        return this.startAlpha;
      }

      return (
        (this.startAlpha / (this.goneTime - this.fadeTime)) *
        (this.goneTime - this.tick)
      );
    },
    progressCircumference() {
      return this.progressRadius * 2 * Math.PI;
    },
    progress() {
      let totalTime = this.endTime - this.startTime;
      let currentTime = this.tick - this.startTime;

      let percent = (currentTime / totalTime) * 100;
      return (
        this.progressCircumference -
        (percent / 100) * this.progressCircumference
      );
    }
  },
  methods: {
    UpdatePosition() {
      for (
        let idx = this.lastPositionIndex;
        idx < this.grenade.Trajectory.length;
        idx++
      ) {
        let position = this.grenade.Trajectory[idx];
        if (this.tick >= position.Time) {
          this.position.x = window.DemoViewer.RemapCoordinate(position.X);
          this.position.y = window.DemoViewer.RemapCoordinate(position.Y);

          this.lastPositionIndex = idx;
        } else {
          break;
        }
      }
    }
  },
  watch: {
    tick: {
      handler(cur, old) {
        this.UpdatePosition();

        if (cur < old) {
          this.lastPositionIndex = 0;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.rendered-base-grenade-object {
  position: absolute;

  .projectile {
    width: 50px;
    height: 50px;
    margin-left: -25px;
    margin-top: -25px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    @include weapon-font;

    .progress-ring {
      position: absolute;

      .circle {
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
      }
    }
  }

  .detonation-trigger {
    width: 100px;
    height: 100px;
    margin-left: -50px;
    margin-top: -50px;
    border-radius: 50%;
  }
}
</style>