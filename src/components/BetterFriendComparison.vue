<template>
  <div class="better-friend-comparison">
    <div class="bordered-box headline">
      <p>Performance when playing with friends</p>
    </div>

    <div v-if="!loadingComplete">
      <div class="bordered-box no-comparisons">
        <AjaxLoader>Computing Friend Comparisons</AjaxLoader>
      </div>
    </div>
    <div v-else class="comparisons">
      <div
        class="comparison bordered-box"
        v-for="comparison in comparisons"
        :key="comparison.OtherSteamId"
      >
        <div class="avatar-and-name">
          <div class="avatar">
            <img class="avatar" :src="comparison.OtherPlayerInfo.SteamUser.ImageUrl || $helpers.getDefaultSteamProfileImageUrl()" />
          </div>
          <div class="name">{{ comparison.OtherPlayerInfo.SteamUser.SteamName }}</div>
        </div>
        <BarChart class="kad-chart" :data="comparison.chartData" :options="chartOptions"></BarChart>
        <div class="comparison-table">
          <div class="r">
            <div class="c"></div>
            <div class="c">You</div>
            <div class="c">Them</div>
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
          <img
            class="image"
            :src="$helpers.resolveMapPreview(comparison.MostPlayedMap)"
          />
          <div class="wtl">
            <div class="w">{{ comparison.MostPlayedMapMatchesWon }}</div>
            <div class="t">{{ comparison.MostPlayedMapMatchesTied }}</div>
            <div class="l">{{ comparison.MostPlayedMapMatchesLost }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";

export default {
  components: {
    BarChart
  },
  mounted() {
    this.LoadData(false);
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
                stepSize: 1
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
    LoadData: function(isDemo) {
      this.loadingComplete = false;

      let params = {
        steamId: isDemo ? "76561198033880857" : this.$api.User.GetSteamId(),
        count: 3,
        offset: this.comparisons.length
      };
      this.$api
        .getFriendsComparison(params)
        .then(result => {
          this.comparisons = result.data.Comparisons;
          this.comparisons.forEach(comparison => {
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
                  data: [comparison.MatchesWon, comparison.MatchesTied, comparison.MatchesLost]
                }
              ]
            };

            comparison.IsVisible = false;
          });
          this.loadingComplete = true;
        })
        .catch(error => {
          console.error(error); // eslint-disable-line no-console
          this.loadingComplete = true;
        });
    }
  }
};
</script>

<style lang="scss">
.better-friend-comparison {
  margin-bottom: 20px;

  .headline {
      font-weight: 500 !important;
      color: white;
  }

  .no-comparisons {
      margin-top: 10px;
  }

  .comparisons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    .comparison {
      width: calc(33.33% - 10px);

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
        }
      }

      .kad-chart {
        height: 150px;
      }

      .comparison-table {
        margin-top: 10px;
        background: $dark-3;
        padding: 5px 10px;
        border-radius: 3px;
        margin-bottom: 10px;

        .r {
          display: flex;
          align-items: center;
          font-size: 12px;
          border-bottom: 1px solid $purple;
          color: white;

          &:last-child {
            border-bottom: 0;
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
</style>