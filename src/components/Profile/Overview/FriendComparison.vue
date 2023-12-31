<template>
  <div class="better-friend-comparison dashboard-unit">
    <h2 class="section-header">Performance when playing with friends</h2>

    <div class="comparisons">
      <div
        class="comparison bordered-box"
        v-for="comparison in comparisons"
        :key="comparison.OtherSteamId"
      >
        <div class="avatar-and-name">
          <div class="avatar">
            <img
              class="avatar"
              :src="$assetLoader.getSteamProfileImageUrl(comparison.OtherPlayerInfo.SteamUser.ImageUrl)"
            />
          </div>
            <router-link class="name"
              :to="{name: 'profile', params: {steamId: comparison.OtherPlayerInfo.SteamUser.SteamId }}"
            >{{ comparison.OtherPlayerInfo.SteamUser.SteamName }}</router-link>
        </div>
        <BarChart class="kad-chart" :data="comparison.chartData" :options="chartOptions"></BarChart>
        <div class="comparison-table">
          <div class="r">
            <div class="c header"></div>
            <div class="c header">You</div>
            <div class="c header">Them</div>
          </div>
          <div class="r">
            <div class="c">
              <img src="@/assets/t_logo.png" /> K/D
            </div>
            <div
              class="c"
            >{{ (comparison.UserData.TerroristKills / Math.max(1, comparison.UserData.TerroristDeaths)).toFixed(2) }}</div>
            <div
              class="c"
            >{{ (comparison.OtherData.TerroristKills / Math.max(1, comparison.OtherData.TerroristDeaths)).toFixed(2) }}</div>
          </div>
          <div class="r">
            <div class="c">
              <img src="@/assets/ct_logo.png" /> K/D
            </div>
            <div
              class="c"
            >{{(comparison.UserData.CtKills / Math.max(1, comparison.UserData.CtDeaths)).toFixed(2)}}</div>
            <div
              class="c"
            >{{(comparison.OtherData.CtKills / Math.max(1, comparison.OtherData.CtDeaths)).toFixed(2)}}</div>
          </div>
          <div class="r">
            <div class="c">
              <img src="@/assets/t_logo.png" /> ADR
            </div>
            <div
              class="c"
            >{{(comparison.UserData.TerroristDamage / Math.max(1, comparison.TerroristRounds)).toFixed(0)}}</div>
            <div
              class="c"
            >{{(comparison.OtherData.TerroristDamage / Math.max(1, comparison.TerroristRounds)).toFixed(0)}}</div>
          </div>
          <div class="r">
            <div class="c">
              <img src="@/assets/ct_logo.png" /> ADR
            </div>
            <div
              class="c"
            >{{(comparison.UserData.CtDamage / Math.max(1, comparison.CtRounds)).toFixed(0)}}</div>
            <div
              class="c"
            >{{(comparison.OtherData.CtDamage / Math.max(1, comparison.CtRounds)).toFixed(0)}}</div>
          </div>
          <div class="r">
            <div class="c">Enemies Flashed</div>
            <div class="c">{{comparison.UserData.EnemiesFlashed}}</div>
            <div class="c">{{comparison.OtherData.EnemiesFlashed}}</div>
          </div>
          <div class="r">
            <div class="c">Team Flashed</div>
            <div class="c">{{comparison.UserData.TeammatesFlashed}}</div>
            <div class="c">{{comparison.OtherData.TeammatesFlashed}}</div>
          </div>
          <div class="r">
            <div class="c">MVPs</div>
            <div class="c">{{comparison.UserData.MVPs}}</div>
            <div class="c">{{comparison.OtherData.MVPs}}</div>
          </div>
          <div class="r">
            <div class="c">Score</div>
            <div class="c">{{comparison.UserData.Score}}</div>
            <div class="c">{{comparison.OtherData.Score}}</div>
          </div>
        </div>

        <div class="favorite-map">
          <div class="name">Favorite Map: {{ comparison.MostPlayedMap }}</div>
          <img class="image" :src="$assetLoader.getMapPreview(comparison.MostPlayedMap)" />
          <div class="wtl">
            <div class="w">{{ comparison.MostPlayedMapMatchesWon }}</div>
            <div class="t">{{ comparison.MostPlayedMapMatchesTied }}</div>
            <div class="l">{{ comparison.MostPlayedMapMatchesLost }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loadingComplete">
      <div class="bordered-box no-comparisons" :class="{'loading-more': comparisons.length > 0}">
        <AjaxLoader>Computing Friend Comparisons</AjaxLoader>
      </div>
    </div>

    <div v-if="loadingComplete && comparisons.length == 0">
      <div class="bordered-box no-data-available">
        <p>No data available</p>
      </div>
    </div>

    <div v-if="loadingComplete && comparisons.length > 0" class="controls">
      <button class="button-variant-bordered" @click="LoadData(false)">Load 3 More</button>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/Charts/BarChart.vue";

export default {
  props: ["steamId"],
  components: {
    BarChart
  },
  mounted() {
    this.LoadData(true);
  },
  data() {
    return {
      comparisons: [],
      loadingComplete: false,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                stepValue: 1,
                stepSize: 2
              }
            }
          ]
        },
        legend: {
          display: false
        }
      }
    };
  },
  methods: {
    LoadData: function(reset = false) {
      this.loadingComplete = false;
      if (reset) {
        this.comparisons = [];
      }

      let params = {
        steamId: this.steamId, //this.$api.User.GetSteamId(),
        count: 3,
        offset: this.comparisons.length
      };

      this.$api
        .getFriendsComparison(params)
        .then(result => {
          result.data.Comparisons.forEach(comparison => {
            comparison.WinRate =
              (comparison.MatchesWon / comparison.MatchesPlayed) * 100;

            comparison.MapWinRate =
              (comparison.MostPlayedMapMatchesWon /
                comparison.MostPlayedMapMatchesPlayed) *
              100;

            comparison.chartData = {
              labels: ["Wins", "Ties", "Losses"],
              datasets: [
                {
                  barThickness: 10,
                  barPercentage: 1,
                  label: "",
                  backgroundColor: ["#72a233", "#f39c12", "#db143c"],
                  data: [
                    comparison.MatchesWon,
                    comparison.MatchesTied,
                    comparison.MatchesLost
                  ]
                }
              ]
            };

            comparison.IsVisible = false;
            this.comparisons.push(comparison);
          });

          //this.comparisons = result.data.Comparisons;
          this.loadingComplete = true;
        })
        .catch(error => {
          console.error(error); // eslint-disable-line no-console
          this.loadingComplete = true;
        });
    }
  },
  watch: {
    steamId: function(val) {
      this.LoadData(true);
    }
  }
};
</script>

<style lang="scss">
.better-friend-comparison {

  .no-comparisons {
    color: white;

    &.loading-more {
      margin-top: 10px;
    }
  }

  .controls {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;

    .button-variant-bordered {
      font-size: 12px;
    }
  }

  .comparisons {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .comparison {
      
      width: calc(33.33% - 5px);
      margin-bottom: 10px;

      &:nth-last-child(-n + 3) {
        margin-bottom: 0px;
      }

      .avatar-and-name {
        display: flex;
        align-items: center;
        border-bottom: 1px solid $purple;
        padding-bottom: 10px;
        margin-bottom: 10px;

        .avatar {
          width: 24px;
          height: 24px;
          border-radius: 3px;
        }

        .name {
          color: white;
          font-weight: 500;
          font-size: 12px;
          margin-left: 10px;
          text-decoration: none;
        }
      }

      .kad-chart {
        height: 150px;
        background-color: $dark-3;
        border-radius: 4px;
      }

      .comparison-table {
        margin-top: 10px;
        background: $dark-3;
        padding: 5px 10px;
        border-radius: 4px;
        margin-bottom: 10px;

        font-weight: 500;

        .r {
          display: flex;
          align-items: center;
          font-size: 12px;
          border-bottom: 1px solid $purple;
          color: white;

          &:last-child {
            border-bottom: 0;
          }

          .header {
            color: $orange;
            font-weight: 600;
          }

          .c {
            width: 25%;
            display: flex;
            align-items: center;
            padding: 10px 0;
            justify-content: center;

            img {
              margin-right: 5px;
            }

            &:first-child {
              width: 50%;
              justify-content: flex-start;
            }
          }
        }
      }

      .favorite-map {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        margin-top: 20px;

        .name {
          color: white;
          margin-bottom: 5px;
        }

        .image {
          width: 100%;
          object-fit: cover;
          object-position: center;
          height: 55px;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
        }

        .wtl {
          color: white;
          display: flex;
          margin: 0;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          overflow: hidden;

          * {
            width: 33.33%;
            text-align: center;
            padding: 2px 0;
          }

          .w {
            background: $green-2;
          }

          .t {
            background: #f39c12;
          }

          .l {
            background: $red;
          }
        }
      }
    }
  }
}

//responsive
@media (max-width: 800px) {
  .better-friend-comparison {

    .comparisons {
      flex-wrap: wrap;

      .comparison {
        width: 100%;
        margin-bottom: 10px !important;

        .favorite-map {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>