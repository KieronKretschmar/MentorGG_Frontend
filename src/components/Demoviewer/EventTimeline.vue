<template>
  <div class="dv-event-timeline" v-if="this.events">
    <div v-if="this.events.bomb" class="dv-event-bomb" :style="bombStyle" :class="bombClass">
      <div class="spot-indicator">{{ bombSite }}</div>
    </div>
    <div
      v-for="kill in events.kills"
      :key="kill.VictimId"
      class="dv-event-kill"
      :style="{left: `${CalculateLeftOffset(kill.Time)}%`}"
      :class="{ct: kill.VictimTeam == 'CT'}"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["events", "min", "max"],
  mounted() {},
  methods: {
    CalculateLeftOffset(t) {
      return (100 / (this.max - this.min)) * (t - this.min);
    }
  },
  computed: {
    bombStyle() {
      if (!this.events || !this.events.bomb) {
        return { display: "none" };
      }

      let start = this.CalculateLeftOffset(this.events.bomb.plant.Time);
      let width = 0;

      if (this.events.bomb.defuse) {
        width = this.CalculateLeftOffset(this.events.bomb.defuse.Time) - start;
      }

      if (this.events.bomb.detonation) {
        width =
          this.CalculateLeftOffset(this.events.bomb.detonation.Time) - start;
      }

      return {
        left: `${start}%`,
        width: `${width}%`
      };
    },
    bombClass() {
      if (!this.events || !this.events.bomb) {
        return {};
      }

      return { defused: this.events.bomb.defuse != null };
    },
    bombSite() {
      if (!this.events || !this.events.bomb) {
        return "";
      }

      return this.events.bomb.plant.Site == 1 ? "A" : "B";
    }
  }
};
</script>

<style lang="scss">
.dv-event-timeline {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;

  .dv-event-bomb {
    position: absolute;
    height: 100%;
    top: 0;
    width: 4px;
    background: fade-out(crimson, 0.8);

    &.defused {
      &:after {
        background: green;
      }
    }

    &:before,
    &:after {
      content: "";
      width: 2px;
      background: crimson;
      position: absolute;
      height: 100%;
      left: 0;
    }

    &:after {
      right: 0;
      left: unset;
    }

    .spot-indicator {
      width: 24px;
      height: 60%;
      display: flex;
      color: white;
      justify-content: center;
      align-items: center;
      position: absolute;
      background: crimson;
      left: 50%;
      margin-left: -12px;
      top: 20%;
      border-radius: 3px;

      &:after {
        content: "";
        position: absolute;
        left: 50%;
        width: 1px;
        height: 35%;
        background: crimson;
        top: -32%;
      }

      &:before {
        content: "";
        position: absolute;
        left: 50%;
        width: 1px;
        height: 35%;
        background: crimson;
        bottom: -32%;
      }
    }
  }

  .dv-event-kill {
    position: absolute;
    width: 2px;
    height: 100%;
    background: $ct-color;
    margin-left: 1px;
    top: 0;

    &.ct {
      background: $terrorist-color;
    }
  }
}
</style>