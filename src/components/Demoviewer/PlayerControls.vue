<template>
  <div class="player-controls">
    <div class="play-pause-button" @click="isPlaying = !isPlaying">
      <i v-if="isPlaying" class="material-icons">pause</i>
      <i v-else class="material-icons">play_arrow</i>
    </div>
    <div class="playback-progress">
      <input type="range" :min="min" :max="max" v-model.number="cur" @input="$emit('warp', cur)" />
      <slot></slot>
    </div>
    <div class="time-display">
      <span class="cur">{{ currentTime }}</span>
      <span class="max">{{ maximumTime }}</span>
    </div>
    <div class="buttons">
      <span class="speed-button" @click="speedMenuVisible = !speedMenuVisible">
        <ul v-if="speedMenuVisible">
          <li @click.stop="SetSpeed(0.25)">x0.25</li>
          <li @click.stop="SetSpeed(0.50)">x0.50</li>
          <li @click.stop="SetSpeed(1.00)">x1.00</li>
          <li @click.stop="SetSpeed(1.50)">x1.50</li>
          <li @click.stop="SetSpeed(2.00)">x2.00</li>
        </ul>
        x{{ this.speed.toFixed(2) }}
      </span>
      <i class="material-icons fullscreen-btn" @click="ToggleFullscreenMode">fullscreen</i>
      <i class="material-icons share-btn" @click="OnShare">share</i>
      <div class="share-menu" v-if="shareMenuVisible">
        <span @click="EmitShare(false)">Share from start</span>
        <span @click="EmitShare(true)">Share this moment</span>
      </div>
    </div>    
  </div>
</template>

<script>
//TODO: Add hotkeys for controlling the player
export default {
  props: ["min", "max"],
  mounted() {
    this.cur = parseInt(this.min);
    this.$emit("update", this.cur);
    this.PlayerLoop();
  },
  data() {
    return {
      isPlaying: false,
      cur: 0,
      speed: 1.0,
      speedMenuVisible: false,
      shareMenuVisible: false
    };
  },
  computed: {
    currentTime() {
      let x = (this.cur - this.min) / 1000;
      let m = Math.floor(x / 60);
      let s = Math.floor(x % 60);

      m = m < 0 ? 0 : m;
      s = s < 0 ? 0 : s;

      return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    },
    maximumTime() {
      let x = (this.max - this.min) / 1000;
      let m = Math.floor(x / 60);
      let s = Math.floor(x % 60);

      m = m < 0 ? 0 : m;
      s = s < 0 ? 0 : s;

      return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    }
  },
  methods: {
    SetSpeed(speed) {
      this.speed = speed;
      this.speedMenuVisible = false;
    },
    OnShare() {
      this.isPlaying = false;
      this.shareMenuVisible = !this.shareMenuVisible;
    },
    EmitShare(thisMoment) {
      this.shareMenuVisible = false;
      this.$emit('share', thisMoment ? (this.cur - this.min) : 0);
    },
    ToggleFullscreenMode() {
      if (document.fullscreenElement) {
        this.LeaveFullscreen();
      } else {
        this.EnterFullscreen();
      }
    },
    SetTimestamp(t) {
      this.cur = this.min + t;
      this.$emit("update", this.cur);
    },
    PlayerLoop() {
      if (this.isPlaying) {
        this.cur += 16.66 * this.speed;
        if (this.cur > this.max) {
          this.cur = this.max;
          this.isPlaying = false;
        }

        this.$emit("update", this.cur);
      }

      //~60 FPS
      setTimeout(this.PlayerLoop, 16.66);
    },
    EnterFullscreen() {
      let elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    },
    LeaveFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
    }
  }
};
</script>

<style lang="scss">
@mixin thumb {
  height: $demoviewer-controls-height;
  background: white;
  width: 3px;
  cursor: pointer;
  appearance: none;
  position: relative;
  z-index: 99999;
}

.player-controls {
  display: flex;

  .play-pause-button {
    background: $dark-3;
    color: white;
    cursor: pointer;
    width: 60px;
    height: $demoviewer-controls-height;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;

    i {
      font-size: 38px;
      line-height: 38px;
    }
  }

  .playback-progress {
    position: relative;
    height: $demoviewer-controls-height;
    flex: 1 1 auto;

    input[type="range"] {
      appearance: none;
      width: 100%;
      height: 100%;
      background: $dark-1;
      outline: 0;
      margin: 0;
    }
  }

  .time-display {
    color: white;
    width: 110px;
    font-size: 14px;
    display: flex;
    align-items: center;
    text-align: center;
    padding: 0 20px;
    background: $dark-3;

    .cur {
      &:after {
        content: "/";
        margin: 0 3px;
      }
    }
  }

  .buttons {
    background: $dark-3;
    display: flex;
    align-items: center;
    color: white;
    padding: 0 20px;
    position: relative;

    .fullscreen-btn {
      font-size: 28px;
      margin: 0 5px;
    }

    i {
      cursor: pointer;
      transition: 0.35s;

      &:hover {
        color: $purple;
      }
    }

    .speed-button {
      background: $purple;
      cursor: pointer;
      position: relative;
      color: white;
      font-size: 14px;
      padding: 3px 5px;
      border-radius: 3px;
      width: 50px;

      ul {
        position: absolute;
        bottom: 100%;
        left: 0;
        list-style: none;
        padding: 0;
        background: $dark-4;
        color: white;
        border-radius: 3px;
        margin: 0;
        width: 50px;
        border-bottom: 1px solid $dark-2;

        li {
          padding: 3px 5px;
          transition: 0.35s;

          &:hover {
            background: $purple;
          }
        }
      }
    }

    .share-menu {
      background: $dark-4;
      position: absolute;
      padding: 3px 0;
      bottom: calc(100% + 10px);
      right: -35px;
      display: flex;
      white-space: nowrap;
      flex-direction: column;
      font-size: 14px;
      border-radius: 3px;

      &:after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 10px 0 10px;
        border-color: $dark-4 transparent transparent transparent;
        top: 100%;
        right: 39%;
      }

      span {
        transition: 0.35s;
        padding: 3px 5px;
        cursor: pointer;

        &:hover {
          background: $purple;
        }
      }

    }
  }
}

input[type="range"]::-webkit-slider-thumb {
  @include thumb;
}

input[type="range"]::-moz-range-thumb {
  @include thumb;
}
</style>