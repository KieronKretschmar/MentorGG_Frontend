<template>
  <div class="tooltip-overlay" :class="{visible: isVisible}">
    <div class="tooltip-arrow"></div>
    <div class="background" @click="Hide"></div>
    <div class="ov-content" :style="{width: w, height: h}">
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
      this.$emit("show");
    },
    Hide() {
      this.isVisible = false;
      this.$emit("hide");
    }
  }
};
</script>

<style lang="scss">
.tooltip-overlay {
  height: min-content;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  transition: 0.35s all;
  z-index: 9999;

  &.visible {
    opacity: 1;
    pointer-events: all;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 13px 13px 13px;
    border-color: transparent transparent $dark-1 transparent;
    position: absolute;
    top: -12px;
    left: 25px;
    z-index: 99999;
  }

  .background {
    height: 100%;
    width: calc(100% - #{$sidebar-width});
    top: 0;
    right: 0;
    position: fixed;
    background: transparent;
  }

  .ov-content {
    max-width: 100%;
    height: fit-content;
    position: relative;
    background: $dark-1;
    border: 1px solid $purple;
    padding: 20px;
    border-radius: 4px;
    overflow: hidden;
    font-weight: 300;

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
</style>