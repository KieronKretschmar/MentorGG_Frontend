<template>
  <div class="better-situations dashboard-unit">
    <!-- Misplays -->
    <div class="better-situation">
      <h2 class="section-header">
        <span>Misplays</span>
        <span
          class="new-count misplays"
          v-if="newOccurencesCount.Misplays > 0"
        >+{{ newOccurencesCount.Misplays }} new from last match</span>
      </h2>
      <template v-if="situations">
        <div class="bordered-box chart-container" v-if="situations">
          <p class="chart-title">Average misplays per round on a per match basis</p>
          <LineChart
            :options="chartOptions"
            :data="chartDataMisplays"
            class="situation-graph-inner-wrapper"
          />
        </div>
        <div class="bordered-box stretch-wrapper">
          <div class="situation-table" v-if="true">
            <div class="table-content">
              <div v-for="situation in misplays" :key="situation.type" class="entry misplay">
                <div class="category-wrapper">
                  <div class="cell link" @click="OpenSituationDetailView(situation.type)">
                    <img
                      class="situation-icon"
                      :src="$assetLoader.getSkillDomainIcon(situation.skillDomainName)"
                      :title="situation.skillDomainName"
                    />
                    <!-- <i class="situation-icon" :class="situation.icon"></i> -->
                    <span class="situation-name">{{ situation.name }}</span>
                    <span
                      class="occurences-badge"
                      :count="situation.occurences.length"
                    >{{ situation.occurences.length }}</span>
                  </div>
                  <div
                    class="cell occurences-toggle"
                    @click="situation.occurencesVisible = !situation.occurencesVisible"
                  >
                    <div class="new-indicator" v-if="situation.containsNew">new</div>
                    <i
                      class="fas fa-chevron-down"
                      :class="{toggled: situation.occurencesVisible}"
                      :test="situation.occurencesVisible"
                    ></i>
                  </div>
                </div>
                <div
                  class="occurences"
                  :style="{'max-height': situation.occurencesVisible ? ((situation.occurences.length * 45) + 5 + 'px') : '0px'}"
                >
                  <div
                    v-for="occurence in situation.occurences"
                    :key="occurence.id"
                    class="occurence"
                  >
                    <div class="content">
                      <span>
                        <img
                          class="map-image"
                          :src="$assetLoader.getMapPreview(situations.Matches[occurence.MatchId].Map)"
                        />
                        <span
                          class="match-date"
                        >{{ situations.Matches[occurence.MatchId].MatchDate|formatDateAndTime }}</span>
                        <span class="map">{{ situations.Matches[occurence.MatchId].Map }}</span>
                      </span>
                      <span class="watch-wrapper">
                        <span class="round">Round {{ occurence.Round }}</span>
                        <i
                          title="Watch in Browser"
                          class="material-icons watch-match-icon"
                          @click="Watch(occurence, situation)"
                        >videocam</i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="bordered-box">
          <AjaxLoader>Loading misplay data</AjaxLoader>
        </div>
      </template>
    </div>

    <!-- Highlights -->
    <div class="better-situation">
      <h2 class="section-header">
        <span>Highlights</span>
        <span
          class="new-count highlights"
          v-if="newOccurencesCount.Highlights > 0"
        >+{{ newOccurencesCount.Highlights }} new from last match</span>
      </h2>
      <template v-if="situations">
        <div class="bordered-box chart-container" v-if="situations">
          <p class="chart-title">Average highlights per round on a per match basis</p>
          <LineChart
            :options="chartOptions"
            :data="chartDataHighlights"
            class="situation-graph-inner-wrapper"
          />
        </div>
        <div class="bordered-box stretch-wrapper">
          <div class="situation-table" v-if="true">
            <div class="table-content">
              <div v-for="situation in highlights" :key="situation.type" class="entry highlight">
                <div class="category-wrapper">
                  <div class="cell link" @click="OpenSituationDetailView(situation.type)">
                    <img
                      class="situation-icon"
                      :src="$assetLoader.getSkillDomainIcon(situation.skillDomainName)"
                      :title="situation.skillDomainName"
                    />
                    <!-- <i class="situation-icon" :class="situation.icon"></i> -->
                    <span class="situation-name">{{ situation.name }}</span>
                    <span
                      class="occurences-badge"
                      :count="situation.occurences.length"
                    >{{ situation.occurences.length }}</span>
                  </div>
                  <div
                    class="cell occurences-toggle"
                    @click="situation.occurencesVisible = !situation.occurencesVisible"
                  >
                    <div class="new-indicator" v-if="situation.containsNew">new</div>
                    <i
                      class="fas fa-chevron-down"
                      :class="{toggled: situation.occurencesVisible}"
                      :test="situation.occurencesVisible"
                    ></i>
                  </div>
                </div>
                <div
                  class="occurences"
                  :style="{'max-height': situation.occurencesVisible ? ((situation.occurences.length * 45) + 5 + 'px') : '0px'}"
                >
                  <div
                    v-for="occurence in situation.occurences"
                    :key="occurence.id"
                    class="occurence"
                  >
                    <div class="content">
                      <span>
                        <img
                          class="map-image"
                          :src="$assetLoader.getMapPreview(situations.Matches[occurence.MatchId].Map)"
                        />
                        <span
                          class="match-date"
                        >{{ situations.Matches[occurence.MatchId].MatchDate|formatDateAndTime }}</span>
                        <span class="map">{{ situations.Matches[occurence.MatchId].Map }}</span>
                      </span>
                      <span class="watch-wrapper">
                        <span class="round">Round {{ occurence.Round }}</span>
                        <i
                          title="Watch in Browser"
                          class="material-icons watch-match-icon"
                          @click="Watch(occurence, situation)"
                        >videocam</i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="bordered-box">
          <AjaxLoader>Loading highlight data</AjaxLoader>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart.vue";
import SituationLoader from "@/SituationLoader";
import Enums from "@/enums";

export default {
  props: ["steamId"],
  components: {
    LineChart
  },
  mounted() {
    this.$api
      .getSituations({
        steamId: this.steamId
      })
      .then(result => {
        this.situations = result.data;
        this.misplays = this.PrepareData("Misplays");
        this.highlights = this.PrepareData("Highlights");
      });
  },
  data() {
    let self = this;

    return {
      situations: null,
      misplays: [],
      highlights: [],
      lastMatchId: 107169, //TODO: Replace with actual last match id
      newOccurencesCount: {
        Misplays: 0,
        Highlights: 0
      },
      chartOptions: {
        tooltips: {
          enabled: true,
          callbacks: {
            title: function(tooltipItems, data) {
              let xLabel = tooltipItems[0].xLabel;

              if (!self.situations) {
                return "Match #" + xLabel;
              } else {
                let matchId = Object.keys(self.situations.Matches)[+xLabel - 1];
                let match = self.situations.Matches[matchId];

                return (
                  "Match #" +
                  xLabel +
                  "\nMap: " +
                  match.Map +
                  "\nDate: " +
                  new Date(match.MatchDate).toLocaleString([], {
                    timeStyle: "short",
                    dateStyle: "short"
                  })
                );
              }
            }
          }
        },
        hover: {
          animationDuration: 0
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "avg. misplays per round"
              },
              ticks: {
                // beginAtZero: true,
                // stepValue: 1,
                stepSize: 0.1
              }
            }
          ],
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "matches"
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
    OpenSituationDetailView(type) {
      this.$router.push({
        name: "situation-detail",
        params: {
          type: type
        }
      });
    },
    PrepareData(dataKey) {
      let ret = [];

      //Add anything of type Enums.SituationType 
      //to the following array to hide the respective situation on the frontend
      let mutedSituations = [];

      Object.keys(this.situations[dataKey]).forEach(key => {
        let entry = this.situations[dataKey][key];

        if  (mutedSituations.indexOf(entry.MetaData.SituationType) != -1) {
          return;
        }

        let staticData = SituationLoader.getSituationData(
          entry.MetaData.SituationType
        );

        let temp = {
          name: staticData.name,
          occurencesVisible: false,
          type: entry.MetaData.SituationType,
          occurences: entry.Situations,
          skillDomainName: entry.MetaData.SkillDomainName,
          containsNew: false
        };

        // check if any of the occurences happened in the last match
        // to indicate if the situation category contains "new" occurences
        for (let occurence of temp.occurences) {
          if (occurence.MatchId == this.lastMatchId) {
            occurence.isNew = true;
            temp.containsNew = true;
            this.newOccurencesCount[dataKey]++;
          }
        }

        ret.push(temp);
      });

      return ret;
    },
    Watch(occurence, situation) {
      this.$helpers.LogEvent(this, "WatchSituation", {
        label: Enums.SituationType.ToString(situation.type)
      });

      globalThis.DemoViewer.SetMatch(occurence.MatchId)
        .SetRound(occurence.Round)
        .SetTimestamp(Math.max(0, occurence.StartTime))
        .Load();
    }
  },
  computed: {
    chartDataMisplays() {
      let labels = [];
      for (let i = 0; i < this.chartDataPoints.Misplays.length; i++) {
        labels.push(i + 1);
      }

      return {
        labels: labels,
        datasets: [
          {
            label: "avg. misplays per round",
            backgroundColor: "#2d2c3b",
            pointBackgroundColor: "#ff4800",
            borderColor: "#39384a",
            data: this.chartDataPoints.Misplays,
            fill: true,
            lineTension: 0
          }
        ]
      };
    },
    chartDataHighlights() {
      let labels = [];
      for (let i = 0; i < this.chartDataPoints.Highlights.length; i++) {
        labels.push(i + 1);
      }

      return {
        labels: labels,
        datasets: [
          {
            label: "avg. highlights per round",
            backgroundColor: "#2d2c3b",
            pointBackgroundColor: "#ff4800",
            borderColor: "#39384a",
            data: this.chartDataPoints.Highlights,
            fill: true,
            lineTension: 0
          }
        ]
      };
    },
    chartDataPoints() {
      let map = {};
      let ret = {};

      for (let dataKey of ["Misplays", "Highlights"]) {
        map[dataKey] = {};
        ret[dataKey] = [];

        Object.keys(this.situations[dataKey]).forEach(key => {
          let entry = this.situations[dataKey][key];

          for (let situation of entry.Situations) {
            if (map[dataKey][situation.MatchId] == undefined) {
              map[dataKey][situation.MatchId] = {
                totalOccurences: 0,
                averageOccurences: 0,
                rounds: {}
              };
            }

            map[dataKey][situation.MatchId].rounds[situation.Round] =
              ++map[dataKey][situation.MatchId].rounds[situation.Round] || 1;
            map[dataKey][situation.MatchId].totalOccurences++;

            //update averageOccurences
            map[dataKey][situation.MatchId].averageOccurences = (
              map[dataKey][situation.MatchId].totalOccurences /
              this.situations.Matches[situation.MatchId].TotalRounds
            ).toFixed(2);
          }
        });

        Object.keys(this.situations.Matches).forEach(key => {
          if (map[dataKey][key] == undefined) {
            ret[dataKey].push(0);
          } else {
            ret[dataKey].push(map[dataKey][key].averageOccurences);
          }
        });
      }

      return ret;
    }
  },
  watch: {
    steamId: function(val) {}
  }
};
</script>

<style lang="scss">
.better-situations {
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .new-count {
      font-size: 12px;
      padding: 5px;
      border-radius: 4px;
      font-weight: 500;

      &.misplays {
        background: crimson;
      }

      &.highlights {
        background: $green-2;
      }
    }
  }

  .better-situation {
    width: calc(50% - 5px);
    display: flex;
    flex-direction: column;

    .chart-container {
      margin-bottom: 10px;

      .chart-title {
        color: $orange;
        // text-transform: uppercase;
        font-size: 12px;
        text-align: center;
        background: $dark-3;
        border-radius: 4px;
        padding: 5px 10px;
        margin-top: 0;
      }

      .situation-graph-inner-wrapper {
        max-height: 200px;
      }
    }

    .stretch-wrapper {
      flex: 1 1 auto;
    }

    p {
      color: white;
      font-weight: 500;
    }

    .situation-table {
      .table-content {
        background: $dark-3;
        padding: 5px 10px;
        border-radius: 4px;

        .entry {
          display: flex;
          color: white;
          font-weight: 500;
          padding: 10px 0;
          border-bottom: 1px solid $purple;
          font-size: 14px;
          flex-direction: column;

          &:last-child {
            border-bottom: none;
          }

          &.misplay {
            .new-indicator {
              background: crimson;
              color: white;
            }
          }

          &.highlight {
            .new-indicator {
              background: $green-2;
              color: white;
            }
          }

          .category-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .situation-icon {
              font-size: 20px;
            }

            .occurences-toggle {
              color: $orange;
              font-size: 20px;
              cursor: pointer;
              display: flex;
              align-items: center;

              .new-indicator {
                font-size: 12px;
                padding: 5px;
                border-radius: 4px;
                margin-right: 10px;
              }

              i {
                transition: 0.35s;

                &.toggled {
                  transform: rotate(180deg);
                }
              }
            }
          }

          .occurences {
            overflow: hidden;
            transition: 0.35s;

            .occurence {
              background: $purple;
              padding: 20px 10px;
              margin-bottom: 5px;
              border-radius: 4px;
              background: $dark-1 !important;
              // background-position: center;
              // background-size: cover;
              // background-repeat: no-repeat;
              position: relative;
              overflow: hidden;

              .content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(0, 0, 0, 0.5);
                color: white;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                padding: 0 10px;
                padding-left: 0;

                span {
                  &:first-child {
                    display: flex;
                    align-items: center;
                  }
                }
              }

              &:first-child {
                margin-top: 10px;
              }

              &:last-child {
                margin-bottom: 10px;
              }

              .map-image {
                width: 100px;
                height: 40px;
                object-fit: cover;
                object-position: center;
                margin-right: 10px;
                border-radius: 4px;
                overflow: hidden;
              }

              .map,
              .match-date,
              .round {
                color: white;
                font-weight: 500;
                font-size: 12px;
              }

              .watch-wrapper {
                display: flex;
                align-items: center;

                .round {
                  margin-right: 5px;
                  width: 60px;
                  text-align: right;
                }
              }

              .match-date {
                border-right: 1px solid $purple;
                padding: 5px 0;
                padding-right: 5px;
                width: 100px;
              }

              .map {
                margin-left: 10px;
              }

              .watch-match-icon {
                color: $orange;
                cursor: pointer;
              }
            }
          }

          .cell {
            .situation-name {
              margin-left: 10px;
            }

            .occurences-badge {
              margin-left: 10px;
              width: 26px;
              height: 26px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 4px;
              background: $purple;
              color: white;
            }
          }

          .link {
            display: flex;
            align-items: center;
            color: white;
            transition: 0.35s;
            text-decoration: none;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            img {
              width: 30px;
              margin-right: 5px;
            }

            &:hover {
              color: $orange;
            }
          }
        }
      }
    }
  }
}

//responsive
@media (max-width: 800px) {
  .advice-container {
    flex-direction: column;

    .advice {
      width: 100%;
      margin-bottom: 10px;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;

      &:last-child {
        margin-bottom: 0;
      }

      .position-table {
        min-width: 580px;
        .table-header {
          margin-right: 25px;

          span {
            &:nth-child(n + 1) {
              width: 140px;
            }
            &:nth-child(n + 3) {
              width: 100px;
              text-align: center;
            }
          }
        }

        .table-content {
          margin-top: 10px;
          margin-right: 10px;

          .entry {
            margin-right: 25px;
            font-size: 12px !important;

            &:last-child {
              border-bottom: none;
            }

            .cell {
              &:nth-child(n + 1) {
                width: 140px;
              }
              &:nth-child(n + 3) {
                width: 100px;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>