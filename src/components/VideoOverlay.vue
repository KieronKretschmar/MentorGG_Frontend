<template>
  <div class="video-overlay">
    <div class="slot-trigger" @click="ToggleVisibility(true)" title="Watch Video">
      <template v-if="useThumbnail != undefined">
        <img :src="`https://img.youtube.com/vi/${getVideoId()}/0.jpg`" />
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </div>

    <div class="overlay-content" :class="{visible: overlayVisible}">
      <iframe
        :src="`https://www.youtube-nocookie.com/embed/${getVideoId()}?start=${videoTimestamp}`"
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
    // Determine videoTimestamp
    if (this.startAt == undefined) {
      if (this.url == undefined) {
        this.videoTimestamp = 0;
      } else {
        this.videoTimestamp = this.timestampFromUrl(this.url);
      }
    } else {
      let arr = this.startAt.split(":");
      this.videoTimestamp = +arr[0] * 60 + +arr[1];
    }
  },
  props: ["startAt", "videoId", "useThumbnail", "url"],
  data() {
    return {
      videoTimestamp: 0,
      overlayVisible: false
    };
  },
  computed: {
    a: function() {
      return this.getVideoId();
    }
  },
  methods: {
    ToggleVisibility(visibility) {
      this.$helpers.LogEvent(this, visibility ? 'ShowVideo' : 'HideVideo', {label: this.a});
      this.overlayVisible = visibility;

      if (visibility) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    },
    getVideoId() {
      if (this.videoId) {
        return this.videoId;
      } else {
        return this.videoIdFromUrl(this.url);
      }
    },
    videoIdFromUrl(url) {
      if (url.includes("youtu.be")) {
        // cases https://youtu.be/mcpPyGl_5fw or https://youtu.be/mcpPyGl_5fw?t=39
        let firstIndex = url.lastIndexOf("/") + 1;
        let lastIndex = url.includes("?") ? url.lastIndexOf("?") : url.length;
        let identifier = url.substring(firstIndex, lastIndex);
        return identifier;
      } else if (url.includes("youtube")) {
        // case https://www.youtube.com/watch?v=mcpPyGl_5fw
        let identifier = url.substring(url.lastIndexOf("v=") + 2, url.length);
        return identifier;
      }
      return "";
    },
    timestampFromUrl(url) {
      if (url.includes("youtu.be")) {
        // cases https://youtu.be/mcpPyGl_5fw or https://youtu.be/mcpPyGl_5fw?t=39

        // transform timeFormat from https://youtu.be/eKuvx1qfztY?t=1m53s -> 113 seconds
        var timeStart = url.search(/t=[\d]*m[\d]*s/i);
        if (timeStart !== -1) {
          let timeEnd = url.substr(timeStart + 2).indexOf("s"); // +2 to avoid 't=' in "start"
          let timeString = url.substr(timeStart + 2, timeEnd + 1); // "1m53s"
          let minutes = parseInt(timeString.substr(0, timeString.indexOf("m"))); // 1
          let secondsString = timeString.substr(timeString.indexOf("m") + 1); // "53s"
          let seconds = parseInt(
            secondsString.substr(0, secondsString.length - 1)
          ); // 53
          let timeInSeconds = minutes * 60 + seconds; // 113
          return timeInSeconds;
        }
        return 0;
      }
      return 0;
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