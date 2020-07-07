<template>
  <div class="recent-match-stats">
    <h2 class="section-header">Recent Match Stats</h2>
    <template v-if="isReady">
      <div class="bordered-box">
        <div class="stats">
          <div class="stat">
            <div class="val">{{recentMatchStats.GamesTotal}}</div>
            <div class="txt">Matches</div>
          </div>
          <div class="stat">
            <div class="val">{{ recentMatchStats.KillDeathRatio.toFixed(2) }}</div>
            <div class="txt">K/D Ratio</div>
          </div>
          <div class="stat">
            <div class="val">{{ recentMatchStats.AverageHltvRating.toFixed(2) }}</div>
            <div class="txt">HLTV Rating</div>
          </div>
          <div class="stat">
            <div class="val">{{ Winrate.toFixed(0) }}%</div>
            <div class="txt">Winrate</div>
          </div>
          <div class="stat">
            <div
              class="val"
            >{{(recentMatchStats.HsKills / recentMatchStats.Kills * 100).toFixed(0) + '%'}}</div>
            <div class="txt">Headshot</div>
          </div>
          <div class="stat">
            <div class="val" :class="RankBalanceClass">
              {{ (0 > RankBalance ? "-" : "+") + Math.abs(RankBalance) }}
              <i
                class="material-icons"
                @click="OpenRankGraph"
              >timeline</i>
            </div>
            <div class="txt">W/L balance on this rank</div>
            <!-- Not using below, because the player may have never changed ranks since he started uploading matches. -->
            <!-- <div class="txt">W/L balance since {{recentMatchStats.RecentRankChangeWasUprank ? 'up' : 'down'}}rank</div> -->
          </div>
        </div>
      </div>

      <GenericOverlay ref="rankGraphOverlay" width="900px">
        <p class="headline">Rank History Graph</p>
        <div class="rank-graph-outer-wrapper" data-simplebar data-simplebar-auto-hide="false">
          <LineChart
            :options="chartOptions"
            :chartData="chartData"
            :style="{width: `${relevantGraphMatches.length * 80}px`}"
            class="rank-graph-inner-wrapper"
            v-if="relevantGraphMatches.length"
          />
          <p v-else class="no-graph-data">
            No data available.
            <br />Play official matchmaking games to be able to see your personal rank history graph.
          </p>
        </div>
      </GenericOverlay>
    </template>
    <template v-else>
      <div class="bordered-box">
        <AjaxLoader>Loading Recent Match Stats</AjaxLoader>
      </div>
    </template>
  </div>
</template>

<script>
import GenericOverlay from "@/components/GenericOverlay.vue";
import LineChart from "@/components/Charts/LineChart.vue";
import Enums from "@/enums";
import EventBus from "@/EventBus";

export default {
  props: ["steamId", "recentMatchStats"],
  components: {
    GenericOverlay,
    LineChart
  },
  beforeDestroy() {
    this.openRankHistoryGraphEventHandle.Remove();
  },
  mounted() {
    this.openRankHistoryGraphEventHandle = EventBus.AddListener(
      "open-rank-history-graph",
      () => {
        this.$refs.rankGraphOverlay.Show();
      }
    );

    let nImagesLoaded = 0;

    for (let i = 0; i < 19; i++) {
      let image = new Image();
      image.src = this.$assetLoader.getRankIcon(i);

      image.onload = () => {
        nImagesLoaded++;
        if (nImagesLoaded == 19) {
          this.rankImagesLoaded = true;
        }
      };

      this.rankImages.push(image);
    }
  },
  data() {
    let self = this;

    return {
      loadingComplete: false,
      rankImagesLoaded: false,
      rankImages: [],
      openRankHistoryGraphEventHandle: null,
      chartOptions: {
        tooltips: {
          enabled: false
        },
        hover: {
          animationDuration: 0
        },
        layout: {
          padding: {
            top: 100
          }
        },
        animation: {
          duration: 0,
          onComplete: function() {
            if (!self.recentMatchStats) {
              return;
            }

            var ctx = this.chart.ctx;
            ctx.font = Chart.helpers.fontString(
              Chart.defaults.global.defaultFontFamily,
              "normal",
              Chart.defaults.global.defaultFontFamily
            );

            ctx.font = "40px Montserrat";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";

            for (let i = 0; i < self.relevantGraphMatches.length; i++) {
              let match = self.relevantGraphMatches[i];

              let dataObj = this.data.datasets[0];
              let model =
                dataObj._meta[Object.keys(dataObj._meta)[0]].data[i]._model;

              let drawRankChange = arrowText => {};

              let arrowText = "-";
              let color = "gray";

              //uprank
              if (match.RankAfterMatch > match.RankBeforeMatch) {
                color = "#a2ff35";
                arrowText = "↑";
              }

              //downrank
              if (match.RankAfterMatch < match.RankBeforeMatch) {
                color = "#db143c";
                arrowText = "↓";
              }

              if (match.RankAfterMatch != match.RankBeforeMatch || i == 0) {
                ctx.fillStyle = color;

                ctx.drawImage(
                  self.rankImages[match.RankAfterMatch],
                  model.x - 35,
                  model.y - 90,
                  70,
                  28
                );

                if (i > 0) {
                  ctx.fillText(arrowText, model.x, model.y - 25);
                }

                ctx.strokeStyle = color;
                ctx.beginPath();
                ctx.moveTo(model.x, model.y - 5);
                ctx.lineTo(model.x, model.y - (i == 0 ? 50 : 25));
                ctx.stroke();
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              display: true,
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
          ]
        },
        legend: {
          display: false
        }
      }
    };
  },
  computed: {
    Winrate: function() {
      return (
        (this.recentMatchStats.GamesWon /
          (this.recentMatchStats.GamesWon + this.recentMatchStats.GamesLost)) *
        100
      );
    },
    RankBalance: function() {
      return (
        this.recentMatchStats.GamesWonAfterRankChange -
        this.recentMatchStats.GamesLostAfterRankChange
      );
    },
    RankBalanceClass: function() {
      if (this.RankBalance < 0) {
        return "n";
      }

      if (this.RankBalance > 0) {
        return "p";
      }

      return "e";
    },
    relevantGraphMatches() {
      if (!this.recentMatchStats) {
        return [];
      }

      let matches = this.recentMatchStats.Matches.filter(match => {
        return match.Source == Enums.Source.Valve;
      }).reverse();

      return matches;
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
    },
    isReady() {
      return this.rankImagesLoaded && this.recentMatchStats != null;
    }
  },
  methods: {
    OpenRankGraph: function() {
      this.$refs.rankGraphOverlay.Show();
    }
  },
  watch: {
    steamId: function(val) {
      // this.LoadData();
    }
  }
};
</script>

<style lang="scss">
.recent-match-stats {
  .bordered-box {
    padding: 10px;
  }

  .no-graph-data {
    padding-top: 20px;
    text-align: center;
  }

  .stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background: $dark-3;
    border-radius: 4px;
    padding: 10px 30px;

    .stat {
      display: flex;
      flex-direction: column;
      text-align: center;
      margin: 10px;

      .val {
        font-size: 24px;
        // font-weight: 700;
        color: white;

        &.p {
          color: $green;
        }

        &.n {
          color: $red;
        }

        &.e {
          color: $purple;
        }

        i {
          color: $orange;
          cursor: pointer;
          position: relative;
          top: 3px;
        }
      }

      .txt {
        font-size: 12px;
        margin-top: 0.5em;
        color: white;
      }
    }
  }

  .rank-graph-outer-wrapper {
    padding-bottom: 20px;

    .rank-graph-inner-wrapper {
      canvas {
        background: $dark-3;
        padding: 20px;
        border-radius: 4px;
      }
    }
  }
}

//responsive
@media (max-width: 800px) {
  .recent-match-stats {
    margin-bottom: 20px;
    margin-top: -64px;

    .bordered-box {
      padding: 20px 20px;
    }

    .stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      .stat {
        display: flex;
        flex-direction: column;
        text-align: center;
        margin: 10px;
        flex: 1 1 43%;
      }
    }
  }
}
</style>