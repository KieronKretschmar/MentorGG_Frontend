<template>
  <div ref="drawingOverlay" class="drawing-overlay">
    <canvas ref="drawingCanvas"></canvas>
    <!-- drawing controls -->
    <div class="drawing-controls">
      <div
        class="color-picker"
        title="Use color"

        v-for="color in colors" :key="color"

        :style="{background: color}"
        :class="{active: activeColor == color}"
        @click="SetActiveColor(color)"
      ></div>

      <i class="material-icons" title="Clear All Drawings" @click="ClearCanvas">clear</i>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$refs.drawingCanvas.width = this.$refs.drawingOverlay.clientWidth;
    this.$refs.drawingCanvas.height = this.$refs.drawingOverlay.clientHeight;

    this.context2d = this.$refs.drawingCanvas.getContext("2d");
    this.context2d.imageSmoothingQuality = "high";
    this.context2d.lineWidth = 2;

    this.SetActiveColor(this.colors[0]);
    this.$refs.drawingCanvas.addEventListener("mousedown", e => {
      this.mouse.down = true;

      this.context2d.beginPath();
      this.context2d.moveTo(this.offsetX, this.offsetY);
    });

    this.$refs.drawingCanvas.addEventListener("mousemove", e => {
      if (this.mouse.down) {
        this.context2d.lineTo(e.offsetX, e.offsetY);
        this.context2d.stroke();
        this.context2d.moveTo(e.offsetX, e.offsetY);
      }
    });

    this.$refs.drawingCanvas.addEventListener("mouseup", () => {
      this.mouse.down = false;
    });
  },
  data() {
    return {
      context2d: null,
      mouse: {
        down: false
      },
      colors: ['#DC143C', '#725619', '#1D7180'],
      activeColor: null
    };
  },
  methods: {
    SetActiveColor(color) {
        this.activeColor = color;
        this.context2d.strokeStyle = this.activeColor;
    },
    ClearCanvas() {
        this.context2d.clearRect(0, 0, this.$refs.drawingCanvas.width, this.$refs.drawingCanvas.height);
    }
  }
};
</script>

<style lang="scss">
.drawing-overlay {
  position: absolute;
  left: 0;
  top: 0;
  height: calc(100vh - #{$demoviewer-controls-height});
  width: 100%;
  z-index: 9999;

  .drawing-controls {
    position: absolute;
    right: 20px;
    bottom: 10px;
    color: white;
    display: flex;
    align-items: center;
    user-select: none;
    flex-direction: column;

    .color-picker {
      width: 16px;
      height: 16px;
      cursor: pointer;
      margin: 3px 0;
      cursor: pointer;

      &.active {
        border: 1px solid white;
      }
    }

    i {
      cursor: pointer;
    }
  }
}
</style>