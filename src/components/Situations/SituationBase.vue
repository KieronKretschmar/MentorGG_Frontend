<template></template>

<script>
import MatchHeader from "@/components/MatchHeader.vue";

export default {
  components: {
    MatchHeader
  },
  data() {
    return {
      isVisible: false
    };
  },

  methods: {
    IsBetween(x, start, end) {
      return end >= x && x >= start;
    },
    ToggleMisplayVisibility: function() {
      let visibility = !this.isVisible;
      this.$helpers.LogEvent(this, visibility ? 'ShowSituation' : 'HideSituation', {category: "Situation", label: this.$options._componentTag});

      this.isVisible = visibility;
      this.$forceUpdate();
    },
    Watch: function(matchId, round = 1, time = 0) {
      this.$helpers.LogEvent(this, "WatchSituation", {category: "Situation", label: this.$options._componentTag});

      globalThis.DemoViewer.SetMatch(matchId)
        .SetRound(round)
        .SetTimestamp(Math.max(0, time))
        .Load();
    },
    ChooseRandom(items) {
      let randomItem = items[Math.floor(Math.random() * items.length)];
      return randomItem;
    }
  }
};
</script>

<style lang="scss">
.misplay {
  border-bottom: 1px solid $purple;
  margin-top: 10px;

  .header {
    display: flex;
    color: white;
    font-size: 14px;
    font-weight: 500;
    justify-content: space-between;
    padding: 10px 0;

    .left {
      display: flex;
      align-items: center;
      width: 80%;

      .misplay-title {
        width: 20%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .misplay-explanation {
        font-weight: 300;
        width: 70%;
        margin-left: 20px;
        text-overflow: ellipsis;
        line-height: 20px;

        .link {
          &.link-inline {
            background: $dark-1;
            color: white;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            border: 1px solid $dark-1;
            transition: 0.35s;
            text-decoration: none;
            cursor: pointer;

            color: $orange;
          }
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
    }
  }

  .body {
    hr {
      border: 1px solid $purple;
      border-bottom: none;
      margin: 15px 0;
    }

    .subtitle {
      color: $orange;
      text-transform: uppercase;
      font-size: 12px;
    }

    .row {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid $purple;

      &:first-child,
      &:last-child {
        border-bottom: none;
      }

      &:first-of-type {
        border-bottom: none;

        .col {
          color: $orange;
          font-size: 12px;
        }
      }

      .l,
      .r {
        display: flex;
      }

      .l {
        flex: 1 1 auto;

        .col {
          &:nth-child(1) {
            width: 30%;
          }

          &:nth-child(2) {
            width: 10%;
          }
        }
      }

      .r {
        width: 10%;

        .col {
          width: 100%;
        }
      }

      .col {
        color: white;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;

        &.centered {
          justify-content: center;
        }

        img {
          margin-right: 5px;
        }

        .watch-match-icon {
          color: $orange;
          font-size: 26px;
          transition: 0.35s;
          cursor: pointer;

          &:hover {
            color: $purple;
          }
        }

        .link {
          display: flex;
          align-items: center;
          background: $dark-1;
          color: white;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          border: 1px solid $dark-1;
          transition: 0.35s;
          text-decoration: none;
          cursor: pointer;

          &:hover {
            color: $orange;
          }
        }
      }
    }
  }
}

//responsive
</style>