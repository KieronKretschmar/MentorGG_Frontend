<template>
  <div class="rendered-smoke-object" :style="{left: `${position.x}px`, top: `${position.y}px`}">
    <div class="projectile" v-show="tick >= startTime && tick <= endTime">g</div>
    <div
      class="smokecloud"
      v-show="tick >= endTime && tick <= goneTime"
      :style="{background: `rgba(255, 255, 255, ${alpha})`}"
    >
      <svg class="progress-ring" width="60" height="60">
        <circle
          class="circle"
          stroke-width="2"
          fill="transparent"
          :r="progressRadius"
          cx="30"
          cy="30"
          stroke="#333"
          :style="{strokeDashoffset: progress, strokeDasharray: `${progressCircumference} ${progressCircumference}`}"
          shape-rendering="geometricPrecision"
        />
      </svg>
    </div>
  </div>
</template>


<script>
export default {
  props: ["smoke", "tick"],
  mounted() {},
  data() {
    return {
      lastPositionIndex: 0,
      position: {
        x: 0,
        y: 0
      },
      startAlpha: 0.7,
      progressRadius: 27,
      visibleTime: 18000
    };
  },
  computed: {
    endTime() {
      return this.smoke.Trajectory[this.smoke.Trajectory.length - 1].Time;
    },
    startTime() {
      return this.smoke.Trajectory[0].Time;
    },
    goneTime() {
      return this.endTime + this.visibleTime;
    },
    fadeTime() {
      return this.goneTime - 1700;
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
      let percent = ((this.goneTime - this.tick) / this.visibleTime) * 100;
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
        idx < this.smoke.Trajectory.length;
        idx++
      ) {
        let position = this.smoke.Trajectory[idx];
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
.rendered-smoke-object {
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
  }

  .smokecloud {
    background: white;
    width: 60px;
    height: 60px;
    margin-left: -30px;
    margin-top: -30px;
    border-radius: 50%;

    .progress-ring {
      .circle {
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
      }
    }
  }
}
</style>