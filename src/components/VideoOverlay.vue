<template>
  <div class="video-overlay">
    <div class="slot-trigger" @click="ToggleVisibility(true)" title="Watch Video">
      <template v-if="useThumbnail != undefined">
        <img :src="`https://img.youtube.com/vi/${videoId}/0.jpg`" />
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </div>

    <div class="overlay-content" :class="{visible: overlayVisible}">
      <iframe
        :src="`https://www.youtube-nocookie.com/embed/${videoId}?start=${videoTimestamp}`"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div class="close-button">
        <i class="material-icons" title="Stop Watching" @click="ToggleVisibility(false)">close</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.startAt == undefined) {
      this.videoTimestamp = 0;
    } else {
      let arr = this.startAt.split(":");
      this.videoTimestamp = +arr[0] * 60 + +arr[1];
    }
  },
  props: ["startAt", "videoId", "useThumbnail"],
  data() {
    return {
      videoTimestamp: 0,
      overlayVisible: false
    };
  },
  methods: {
    ToggleVisibility(visibility) {
        this.overlayVisible = visibility;

        if ( visibility ) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

    }
  }
};
</script>

<style lang="scss" scoped>
.slot-trigger {
  width: 100%;
  height: 100%;
  cursor: pointer;

  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }
}

.overlay-content {
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.75s;
  pointer-events: none;
  z-index: 9999;
  padding: 20px;

  &.visible {
    pointer-events: all;
    opacity: 1;
  }

  iframe {
    width: 100%;
    height: 100%;
    max-width: 1000px;
    max-height: 700px;
  }

  .close-button {
    background: $purple;
    color: white;
    position: fixed;
    top: 0;
    right: 0;
    width: 48px;
    height: 48px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>