<template>
  <div class="profile-header">
    <div class="fixed-width-container mc" v-if="user">
      <div class="avatar">
        <img :src="$assetLoader.getSteamProfileImageUrl(user.SteamUser.ImageUrl)" />
      </div>
      <div class="name">
        <span>PROFILE NAME</span>
        <span>{{ user.SteamUser.SteamName }}</span>
      </div>
      <div class="csgo-rank">
        <span>CS:GO RANK</span>
        <img :src="$assetLoader.getRankIcon(user.Rank)" alt="CS:GO Rank Image" />
      </div>

      <div class="mini-rank-graph" title="Open Rank History Graph" @click="$emit('openRankHistoryGraph')">
        <span>MATCHMAKING RESULTS</span>
        <LineChart
          :options="chartOptions"
          :data="chartData"
          class="mini-rank-graph-inner-wrapper"
          v-if="relevantGraphMatches.length"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart.vue";
import Enums from "@/enums";

export default {
  props: ["steamId", "recentMatchStats"],
  components: {
    LineChart
  },
  mounted() {
    this.Init();
  },
  methods: {
    Init() {
      let params = {
        steamId: this.steamId //this.$api.User.GetSteamId()
      };

      this.$api.getPlayerInfo(params).then(response => {
        this.user = response.data;
      });
    }
  },
  data() {
    return {
      user: null,
      chartOptions: {
        tooltips: {
          enabled: false
        },
        hover: {
          animationDuration: 0
        },
        layout: {
          padding: {
            top: 5,
            left: 5,
            bottom: 5,
            right: 5
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              display: false,
              gridLines: {
                zeroLineColor: "#444"
                // zeroLineWidth: 1
              },
              ticks: {
                beginAtZero: true,
                stepValue: 1,
                stepSize: 1,
                padding: 40
              }
            }
          ],
          xAxes: [
            {
              display: false
            }
          ]
        },
        legend: {
          display: false
        }
      }
    };
  },
  computed: {
    relevantGraphMatches() {
      if (!this.recentMatchStats) {
        return [];
      }

      let matches = this.recentMatchStats.Matches.filter(match => {
        return match.Source == Enums.Source.Valve;
      }).reverse();

      //9 instead of 10 because we start at 0
      return matches.slice(Math.max(matches.length - 9, 0));
    },
    graphData() {
      let wins = 0;
      let data = [0];

      for (let match of this.relevantGraphMatches) {
        switch (match.PlayerMatchOutcome) {
          case Enums.WinTieLoss.Win:
            wins++;
            break;
          case Enums.WinTieLoss.Loss:
            wins--;
            break;
        }

        data.push(wins);
      }

      return data;
    },
    chartLabels() {
      let labels = [];

      for (let i = 0; i < this.graphData.length; i++) {
        labels.push(i + 1);
      }

      return labels;
    },
    chartData() {
      return {
        labels: this.chartLabels,
        datasets: [
          {
            label: "W/L balance",
            backgroundColor: "#ff4800",
            borderColor: "#39384a",
            data: this.graphData,
            fill: false,
            lineTension: 0
          }
        ]
      };
    }
  },
  watch: {
    steamId: function(val) {
      this.Init();
    }
  }
};
</script>

<style lang="scss">
.profile-header {
  background: $dark-3;
  padding: 40px 0px;
  border-bottom: 1px solid $purple;
  padding-bottom: 90px;

  .fixed-width-container {
    display: flex;
    align-items: center;

    .avatar {
      border-radius: 5px;
      overflow: hidden;

      img {
        width: 110px;
        height: 110px;
      }
    }

    .name {
      display: flex;
      flex-direction: column;
      margin-left: 25px;
      padding-right: 100px;
      border-right: 1px solid $purple;
      height: 80px;
      justify-content: center;

      span {
        margin: 5px 0;

        &:first-child {
          color: $orange;
          font-size: 12px;
        }

        &:last-child {
          color: white;
          font-size: 1.75rem;
          font-weight: 700;
        }
      }
    }

    .csgo-rank {
      display: flex;
      flex-direction: column;
      margin: 0 25px;
      text-align: center;

      span {
        margin: 5px 0;

        &:first-child {
          color: $orange;
          font-size: 12px;
        }
      }

      img {
        height: 44px;
        margin: 5px 0;
      }
    }

    .mini-rank-graph {
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 12px;
      color: $orange;
        width: 200px;
        border-left: 1px solid $purple;
        padding-left: 25px;
      
      span {
        margin: 5px 0;
      }

      .mini-rank-graph-inner-wrapper {
        height: 44px;
        margin: 5px 0;        
        padding: 5px;
        border: 1px solid transparent;
        border-radius: 4px;
        cursor: pointer;
        transition: .35s;

        &:hover {
          border: 1px solid $purple;
          background: $dark-1;
        }
      }
    }

  }
}

//responsive
@media (max-width: 800px) {
  .profile-header {
    padding: 20px 0 0 0;
    border-bottom: 1px solid $purple;
    padding-bottom: 90px;

    .fixed-width-container {
      align-items: flex-start;
      height: 60px;

      .avatar {
        border-radius: 5px;
        overflow: hidden;

        img {
          max-width: 60px;
          height: 60px;
        }
      }

      .name {
        margin-left: 10px;
        padding-right: 10px;
        border-right: none;
        height: 60px;
        max-width: 125px;

        span {
          margin: 5px;

          &:first-child {
            font-size: 10px;
          }

          &:last-child {
            font-size: 12px;
            font-weight: 700;
          }
        }
      }

      .csgo-rank {
        display: flex;
        flex-direction: column;
        margin-left: 0;
        padding-left: 10px;
        text-align: center;
        border-left: 1px solid $purple;
        max-width: 125px;
        height: 60px;

        span {
          margin: 5px 0;

          &:first-child {
            font-size: 10px;
          }
        }

        img {
          height: 30px;
        }
      }
    }
  }
}
</style>