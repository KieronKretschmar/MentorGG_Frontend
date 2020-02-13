<template>
  <div class="dv-roundtime-display">
    <router-link :to="{name: 'landingpage'}" class="logo"><img src="@/assets/logo_fullgray.svg" /></router-link>
    <div class="text-time">
      <p class="text">
        {{ map }} // {{ state.text }}
      </p>
      <p class="time">{{ timeString }}</p>
    </div>
    <button
      v-if="state.text == 'freeze time'"
      class="skip-freezetime-btn"
      @click="$emit('skipFreezetime')"
    >skip freeze time</button>
  </div>
</template>

<script>
export default {
  props: [
    "tick",
    "roundStart",
    "roundEnd",
    "roundTimer",
    "freezeTimer",
    "bomb",
    "map"
  ],
  computed: {
    state() {
      let time = 0;

      if (this.bomb.plant != null) {
        if (this.tick >= this.bomb.plant.Time) {
          //we are past bomb plant
          //check if we are past a defuse

          if (this.bomb.defuse != null) {
            if (this.tick >= this.bomb.defuse.Time) {
              //calculate round time based on defuse because round is over
              return {
                text: "bomb defused",
                time: this.bomb.defuse.Time - this.roundStart
              };
            }
          }

          //no defuse available or hasn't happened yet
          //calculate round time based on remaining time since plant
          let delta =
            (1 + this.bomb.timer) * 1000 - (this.tick - this.bomb.plant.Time);

          return {
            text: "bomb time",
            time: delta
          };
        }
      }

      if (this.tick <= this.roundStart + this.freezeTimer * 1000) {
        return {
          text: "freeze time",
          time: this.freezeTimer * 1000 - (this.tick - this.roundStart)
        };
      }

      //no events happened and we are not in freeze time
      //so we calculate regular round time
      return {
        text: "round time",
        time: this.roundTimer * 1000 - (this.tick - this.roundStart)
      };
    },
    timeString() {
      let x = this.state.time / 1000;
      let m = Math.floor(x / 60);
      let s = Math.floor(x % 60);

      m = m < 0 ? 0 : m;
      s = s < 0 ? 0 : s;

      return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    }
  }
};
</script>

<style lang="scss">
.dv-roundtime-display {
  color: white;

  .logo {
    position: absolute;
    bottom: 50px;
    left: 10px;
    user-select: none;
    z-index: 9999;

    img {
      width: 128px;
    }
  }

  .text-time {
    top: 10px;
    left: 10px;
    position: absolute;

    .text {
      font-weight: 500;
      font-size: 14px;
      margin: 0;
    }

    .time {
      font-weight: 700;
      font-size: 24px;
      margin: 0;
    }
  }

  .skip-freezetime-btn {
    position: absolute;
    bottom: 55px;
    background: $dark-3;
    color: white;
    font-weight: 500;
    font-family: inherit;
    border: 0;
    outline: 0;
    cursor: pointer;
    padding: 5px 10px;
    z-index: 10001;
    transition: 0.75s;
    left: 10px;

    &:hover {
      background: $dark-4;
    }
  }
}
</style>