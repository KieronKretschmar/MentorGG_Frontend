<template>
  <div class="generic-overlay" :class="{visible: isVisible}">
    <div class="background" @click="Hide"></div>

    <div class="ov-content" :style="{width: w, height: h}">
      <div class="close-button" @click="Hide">×</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["width", "height"],
  mounted() {
    this.w = this.width || "100%";
    this.h = this.height || "auto";
  },
  data() {
    return {
      w: 0,
      h: 0,
      isVisible: false
    };
  },
  methods: {
    Show() {
      this.isVisible = true;
      this.$emit('show');
    },
    Hide() {
      this.isVisible = false;
      this.$emit('hide');
    }
  }
};
</script>

<style lang="scss">
.generic-overlay {
  height: 100%;
  width: calc(100% - #{$sidebar-width});
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: fixed;
  left: $sidebar-width;
  top: 0;
  opacity: 0;
  pointer-events: none;
  transition: 0.35s all;
  z-index: 9999;

  &.visible {
    opacity: 1;
    pointer-events: all;
  }

  .background {
    background: rgba(0, 0, 0, 0.9);
    position: fixed;
    left: inherit;
    top: 0;
    width: inherit;
    height: 100%;
  }

  .ov-content {
    background: $dark-1;
    padding: 20px;
    position: relative;
    max-width: 100%;
    max-height: 100%;
    margin-top: -20vh;
    border-radius: 3px;
    overflow: hidden;
    font-weight: 300;

    .close-button {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 0;
      right: 0;
      border-bottom-left-radius: 3px;
      background: $purple;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      transition: 0.35s all;
      user-select: none;

      &:hover {
        background: $dark-4;
      }
    }

    .headline {
      color: white;
      border-bottom: 1px solid $purple;
      margin-top: 0;
      width: 80%;
      font-weight: 500;
      padding-bottom: 5px;
      text-align: left;
    }

    p {
      color: white;
    }

    a {
      color: $orange;
      text-decoration: none;
    }

    b {
      color: $dark-4;
    }
  }
}

//responsive
@media (max-width: 1100px) {
  .generic-overlay {
    width: 100%;
    left: 0;

    .ov-content {
      margin-top: 0;
    }
  }
}
</style>