<template>
  <div class="friend-comparison">
    <div class="bordered-box">
      <p>Performance when playing with friends</p>
    </div>

    <div
      v-for="comparison in comparisons"
      :key="comparison.OtherSteamId"
      class="comparison bordered-box"
    >
      <div class="header">
        <div class="left">
          <img
            class="avatar"
            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/43/430946ee3998cc0e8ca4f3cc0df1b88127fa3d63_medium.jpg"
          >
          <span class="name">bahne | mentor.gg</span>
          <span class="winrate" :class="{good: comparison.WinRate >= 50}">
            {{ comparison.WinRate.toFixed(0) }}% win rate
            <br>
            <span>{{ comparison.MatchesPlayedTogether }} matches</span>
          </span>
          <span class="favorite-map">
            <div class="map-text">
              <span>Favorite Map</span>
              <br>
              {{ comparison.MostPlayedMap }}
            </div>
          </span>
          <div
            class="winrate"
            :class="{good: comparison.MapWinRate}"
          >{{ comparison.MapWinRate.toFixed(0) }}% win rate<br><span>{{ comparison.MostPlayedMapMatchesPlayed }} matches</span></div>
        </div>
        <div class="right">
          <button
            class="button-variant-bordered"
            @click="ToggleComparisonVisibility(comparison)"
          >Friend details</button>
        </div>
      </div>
      <transition name="slide">
        <div class="body" v-if="comparison.IsVisible">
          <hr>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$api.getFriendsComparison().then(result => {
      this.comparisons = result.data.Rows;
      this.comparisons.forEach(comparison => {
        comparison.WinRate =
          (comparison.MatchesWonTogether / comparison.MatchesPlayedTogether) *
          100;

        comparison.MapWinRate =
          (comparison.MostPlayedMapMatchesWon /
            comparison.MostPlayedMapMatchesPlayed) *
          100;

        comparison.IsVisible = false;
      });
      console.log(this.comparisons);
    });
  },
  data() {
    return {
      comparisons: []
    };
  },
  methods: {
    ToggleComparisonVisibility: function(comparison) {
      comparison.IsVisible = !comparison.IsVisible;
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss">
.friend-comparison {
  margin-bottom: 20px;

  p {
    color: white;
    font-weight: 500;
  }

  .comparison {
    border-bottom: 1px solid $purple;
    margin-top: 10px;

    .header {
      display: flex;
      color: white;
      font-size: 14px;
      font-weight: 500;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;
        width: 80%;

        .avatar {
          width: 32px;
          height: 32px;
        }

        .name {
          width: 20%;
          margin-left: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .winrate {
          margin-left: 20px;
          border-left: 1px solid $purple;
          color: $red;
          width: 20%;
          text-align: center;

          &.good {
            color: $green;
          }

          span {
            color: $purple;
            font-size: 12px;
          }
        }

        .favorite-map {
          display: flex;
          align-items: center;
          width: 15%;
          border-left: 1px solid $purple;    

          .map-text {
            padding: 0 25px;
            color: white;

            span {
              font-size: 12px;
            }
          }
        }

        .map-winrate {
          color: $red;
          font-size: 14px;
          font-weight: 500;

          &.good {
            color: $green;
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
    }
  }
}
</style>