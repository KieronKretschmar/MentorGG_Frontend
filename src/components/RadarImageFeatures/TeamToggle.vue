<template>
  <label class="switch-wrap team-toggle" @click="toggleTeam()">
    <div class="switch" :class="{ right: isCt, left:!isCt}">
      <img :src="require(`@/assets/${teamImage}`)" />
    </div>
  </label>
</template>

<script>
export default {

  props: ["isCt", "SetShowCt"],
  computed: {
    teamImage() {
      return this.isCt ? "ct_logo.png" : "t_logo.png";
    }
  },
  methods : {
    toggleTeam(){
      this.$emit('toggled', !this.isCt);
    }
  }
};
</script>

<style lang="scss">
$iconSize: 28;
$width: 60px;
$height: $iconSize;

$ct-glow: #3d78cc;
$t-glow: #a89966;

.switch-wrap {
  cursor: pointer;

  display: flex;
  justify-content: center;
  flex-direction: column;

  width: $width;
  height: $height;

  background-color: $dark-3;
  border-radius: 25px;
  border: 2px solid $purple;

  user-select: none;

  // When the wrapper is hovered, apply changed to the switch
  &:hover div.switch {
    filter: brightness(1.25);
  }

  .right {
    transform: translateX($width - $iconSize - 4px);

    img {
      filter: drop-shadow(0px 0px 5px $ct-glow);
    }
  }

  .left {
    img {
      filter: drop-shadow(0px 0px 5px $t-glow);
    }
  }

  .switch {
    transition: all 300ms cubic-bezier(0.46, 0.33, 0, 1.4);
    vertical-align: middle;

    height: unquote($iconSize + "px");
    width: unquote($iconSize + "px");

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>