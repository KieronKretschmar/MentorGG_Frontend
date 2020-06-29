<template>
  <div class="situation-base">
    <template v-if="this.dynamicSituationData">
      <div class="situation-header">
        <div class="situation-name">
          <img
            :src="$assetLoader.getSkillDomainIcon(dynamicSituationData.SituationCollection.MetaData.SkillDomainName)"
            v-if="dynamicSituationData"
          />
          <span v-if="staticSituationData.isHighlight" class="highlight">Highlight:</span>
          <span v-if="staticSituationData.isMisplay" class="misplay">Misplay:</span>
          {{ staticSituationData.name }}
          <div
            class="situation-count"
            :class="{highlight: staticSituationData.isHighlight, misplay: staticSituationData.isMisplay}"
          >{{ situations.length }}</div>
        </div>

        <div class="mini-graph">
          <span>OCCURENCE HISTORY</span>
          <LineChart
            :options="GetOccurenceHistoryGraphOptions()"
            :data="occurenceHistoryGraphData"
            class="history-graph-inner-wrapper"
          />
        </div>
      </div>
      <div class="description-howtoavoid">
        <div class="description">
          <h2 class="section-header">Description</h2>
          <div class="bordered-box">{{ staticSituationData.description }}</div>
        </div>
        <div class="fluff">
          <h2 class="section-header">Tips</h2>
          <div class="bordered-box">{{ staticSituationData.fluff }}</div>
        </div>
      </div>

      <div class="chart">
        <h2 class="section-header">Rank Comparison</h2>
        <div class="bordered-box chart-container">
          <p class="chart-title">
            Average
            <span v-if="staticSituationData.isHighlight">highlights</span>
            <span v-if="staticSituationData.isMisplay">misplays</span> per round
          </p>
          <BarChart
            class="situations-by-rank-chart-inner-wrapper"
            :data="situationByRankChartData"
            :options="situationsByRankChartOptions"
          ></BarChart>
        </div>
      </div>

      <div class="occurences">
        <h2 class="section-header">Personal Occurences</h2>
        <div
          class="bordered-box free-user-warning"
          v-if="$api.User.subscriptionStatus == Enums.SubscriptionStatus.Free"
        >
          <p>Please note that as a FREE user you may only view the occurences for the first and last round of each half.</p>
          <button
            class="button-variant-bordered upgrade"
            @click="$router.push({name: 'membership'})"
          >UPGRADE</button>
        </div>
        <div class="occurence-list">
          <div
            class="occurence bordered-box"
            :class="{highlighted: occurence.Id == highlightedOccurenceId}"
            v-for="occurence in situations"
            :key="occurence.Id"
          >
            <img
              class="map-preview"
              :src="$assetLoader.getMapPreview(dynamicSituationData.Matches[occurence.MatchId].Map)"
            />
            <div class="fields">
              <div class="field">
                <div class="key">When</div>
                <div
                  class="val"
                >{{ dynamicSituationData.Matches[occurence.MatchId].MatchDate|formatDateAndTime }}</div>
              </div>
              <div class="field">
                <div class="key">Map</div>
                <div class="val">{{ dynamicSituationData.Matches[occurence.MatchId].Map }}</div>
              </div>
              <div class="field">
                <div class="key">Round</div>
                <div class="val">{{ occurence.Round }}</div>
              </div>

              <div
                class="field"
                v-for="field in staticSituationData.additionalFields"
                :key="field.key"
              >
                <div class="key">{{ field.keyDisplay }}</div>
                <div class="val">
                  <span v-if="field.before">{{ field.before }}</span>
                  <span
                    v-html="field.render ? field.render(occurence[field.key]) : occurence[field.key]"
                  ></span>
                  <span v-if="field.after">{{field.after}}</span>
                </div>
              </div>

              <template v-if="debug">
                <div class="field debug" v-for="(val, key) in occurence" :key="key">
                  <div class="key">{{ key }}</div>
                  <div class="val">{{ val }}</div>
                </div>
              </template>
            </div>

            <button
              class="watch-button button-variant-bordered"
              :disabled="!$helpers.DemoViewerAvailable(dynamicSituationData.Matches[occurence.MatchId].Map)"
              @click="Watch(occurence, staticSituationData.typeName)"
            >
              Watch
              <i class="material-icons">videocam</i>
            </button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="bordered-box">
        <AjaxLoader>Loading situation data</AjaxLoader>
      </div>
    </template>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart.vue";
import BarChart from "@/components/BarChart.vue";
import Enums from "@/enums";
import SituationLoader from "@/SituationLoader";

export default {
  props: ["staticSituationData"],
  components: {
    LineChart,
    BarChart
  },
  mounted() {
    this.debug = true;

    if (this.debug) {
      this.$api
        .getSituationSamplesByMatchIds({
          type: this.staticSituationData.type
        })
        // .getSituationSamplesByMatchCount({
        //   type: this.staticSituationData.type,
        //   matchCount: 10,
        // })
        .then(result => {
          this.PrepareData(result.data);
        });
    } else {
      this.$api
        .getSituationsOfType({
          type: this.staticSituationData.type,
          steamId: this.$api.User.GetSteamId(false)
        })
        .then(result => {
          this.PrepareData(result.data);
        });
    }
  },
  data() {
    let self = this;

    return {
      Enums,
      dynamicSituationData: null,
      situations: [],
      debug: false,
      highlightedOccurenceId: null,
      prependTime: 4000
    };
  },
  methods: {
    Watch(occurence, typeName) {
      this.highlightedOccurenceId = occurence.Id;

      this.$helpers.LogEvent(this, "WatchSituation", {
        label: Enums.SituationType.ToString(typeName)
      });

      globalThis.DemoViewer.SetMatch(occurence.MatchId)
        .SetRound(occurence.Round)
        .SetTimestamp(Math.max(0, occurence.StartTime - this.prependTime))
        .Load();
    },
    PrepareData(data) {
      this.dynamicSituationData = data;
      this.situations = this.dynamicSituationData.SituationCollection.Situations.filter(
        e => this.IsRoundAllowed(e.MatchId, e.Round)
      ).sort((first, second) =>
        this.$helpers.ShowFirstSituationLast(
          first,
          this.dynamicSituationData.Matches[first.MatchId],
          second,
          this.dynamicSituationData.Matches[second.MatchId]
        )
      );
    },
    IsRoundAllowed(matchId, round) {
      if (!this.matches || this.matches[matchId] == undefined) {
        return false;
      }

      return this.matches[matchId].AllowedRounds.indexOf(round) != -1;
    },
    GetOccurenceHistoryGraphOptions() {
      return {
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
      };
    }
  },
  computed: {
    matches() {
      if (!this.dynamicSituationData) {
        return null;
      }

      return this.dynamicSituationData.Matches;
    },
    occurenceHistoryGraphPreparedData() {
      if (!this.dynamicSituationData) {
        return null;
      }

      let map = {};
      let ret = {};

      map = {};
      ret = [];

      for (let situation of this.situations) {
        //hide occurences that took place in non allowed
        if (!this.IsRoundAllowed(situation.MatchId, situation.Round)) {
          continue;
        }

        if (map[situation.MatchId] == undefined) {
          map[situation.MatchId] = {
            totalOccurences: 0,
            averageOccurences: 0,
            rounds: {}
          };
        }

        map[situation.MatchId].rounds[situation.Round] =
          ++map[situation.MatchId].rounds[situation.Round] || 1;
        map[situation.MatchId].totalOccurences++;

        //update averageOccurences
        map[situation.MatchId].averageOccurences = (
          map[situation.MatchId].totalOccurences /
          this.matches[situation.MatchId].TotalRounds
        ).toFixed(2);
      }

      Object.keys(this.matches).forEach(key => {
        if (map[key] == undefined) {
          ret.push(0);
        } else {
          ret.push(map[key].averageOccurences);
        }
      });

      return ret.slice(Math.max(ret.length - 10, 0));
    },
    occurenceHistoryGraphData() {
      let labels = [];
      for (let i = 0; i < this.occurenceHistoryGraphPreparedData.length; i++) {
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
            data: this.occurenceHistoryGraphPreparedData,
            fill: false,
            lineTension: 0
          }
        ]
      };
    },
    situationByRankChartPreparedData() {
      let data = SituationLoader.getSituationsByRank();
      if (data.Data[this.staticSituationData.typeName] == undefined) {
        return null;
      }

      let typeData = data.Data[this.staticSituationData.typeName];

      let ret = {
        data: [],
        labels: [],
        colors: []
      };

      for (let idx in typeData) {
        let entry = typeData[idx];
        ret.data.push(entry.SituationsPerPlayerAndRound);
        ret.labels.push(this.$helpers.RankIdToRankName(entry.RankBeforeMatch));

        if (this.staticSituationData.isMisplay) {
          ret.colors.push("#8b0923");
        }

        if (this.staticSituationData.isHighlight) {
          ret.colors.push("#72a233");
        }
      }

      return ret;
    },
    situationByRankChartData() {
      return {
        labels: this.situationByRankChartPreparedData.labels,
        datasets: [
          {
            barThickness: 10,
            barPercentage: 1,
            label: "",
            backgroundColor: this.situationByRankChartPreparedData.colors,
            data: this.situationByRankChartPreparedData.data
          }
        ]
      };
    },
    situationsByRankChartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                callback: val => {
                  return this.$helpers.ShortenRankName(val);
                }
              }
            }
          ]
        },
        legend: {
          display: false
        },
        annotation: {
          annotations: [
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.situationByRankChartPersonalValue.total,
              borderColor: "#ff4800",
              borderWidth: 1,
              label: {
                enabled: true,
                content: "You (total)",
                backgroundColor: "#ff4800"
              }
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.situationByRankChartPersonalValue.last5,
              borderColor: this.last5Color,
              borderWidth: 1,
              label: {
                enabled: true,
                content: "You (last 5)",
                backgroundColor: this.last5Color
              }
            }
          ]
        }
      };
    },
    situationByRankChartPersonalValue() {
      if (!this.dynamicSituationData) {
        return 0;
      }

      let sumTotalRounds = 0;

      let matchCount = Object.keys(this.dynamicSituationData.Matches).length;
      let gimmeTheLoopz = 0;
      let last5SituationCount = 0;
      let last5RoundCount = 0;

      for (let matchId in this.dynamicSituationData.Matches) {
        sumTotalRounds += this.dynamicSituationData.Matches[matchId]
          .AllowedRounds.length;

        if (gimmeTheLoopz >= matchCount - 5) {
          last5RoundCount += this.dynamicSituationData.Matches[matchId]
            .AllowedRounds.length;

          let situationCount = this.dynamicSituationData.SituationCollection.Situations.reduce(
            (prev, curr) => {
              if (
                matchId == curr.MatchId &&
                this.IsRoundAllowed(matchId, curr.Round)
              ) {
                return prev + 1;
              }

              return prev;
            },
            0
          );

          last5SituationCount += situationCount;
        }

        gimmeTheLoopz++;
      }

      return {
        total:
          this.dynamicSituationData.SituationCollection.Situations.length /
          sumTotalRounds,
        last5: last5SituationCount / last5RoundCount
      };
    },
    last5Color() {
      if (this.staticSituationData.isMisplay) {
        if (this.situationByRankChartPersonalValue.last5 > this.situationByRankChartPersonalValue.total) {
          return "crimson";
        } else {
          return "#72a233";
        }
      }

      if (this.staticSituationData.isHighlight) {
        if (this.situationByRankChartPersonalValue.last5 > this.situationByRankChartPersonalValue.total) {
          return "#72a233";
        } else {
          return "crimson";
        }
      }
    }
  }
};
</script>

<style lang="scss">
.situation-base {
  margin-top: 75px;

  .situation-header {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .situation-name {
      color: white;
      font-size: 1.75rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      margin-right: 30px;

      img {
        width: 60px;
        margin-right: 10px;
      }

      span {
        margin-right: 10px;

        &.highlight {
          color: $green-2;
        }

        &.misplay {
          color: crimson;
        }
      }

      .situation-count {
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-weight: 500;
        margin-left: 10px;

        &.misplay {
          background: crimson;
        }

        &.highlight {
          background: $green-2;
        }
      }
    }

    .mini-graph {
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      color: $orange;
      font-size: 12px;
      width: 200px;
      padding-left: 25px;
      border-left: 1px solid $purple;

      span {
        margin: 5px 0;
      }

      .history-graph-inner-wrapper {
        height: 44px;
        margin: 5px 0;
        padding: 5px;
      }
    }
  }

  .description-howtoavoid {
    display: flex;
    justify-content: space-between;

    .description,
    .fluff {
      width: calc(50% - 5px);
      color: white;
      display: flex;
      flex-direction: column;
      white-space: pre-line;

      .bordered-box {
        flex: 1 0 auto;
      }
    }
  }

  .chart,
  .occurences {
    margin-top: 35px;
  }

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
      white-space: normal;
    }
  }

  .free-user-warning {
    margin-bottom: 10px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      margin-left: 20px;
    }
  }

  .occurence-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;

    .occurence {
      width: calc(33.33% - 10px);
      display: flex;
      flex-direction: column;
      margin: 0 5px;
      margin-bottom: 10px;

      &.highlighted {
        border: 1px solid $orange;
      }

      .map-preview {
        width: 100%;
        height: 100px;
        object-fit: cover;
        object-position: center;
      }

      .fields {
        background: $dark-3;
        display: flex;
        flex-direction: column;
        border-radius: 4px;
        margin-top: 10px;
        padding: 0 10px;

        .field {
          display: flex;
          justify-content: space-between;
          color: white;
          border-bottom: 1px solid $purple;
          padding: 10px 0px;
          font-size: 12px;
          font-weight: 500;
          align-items: center;

          a {
            color: $orange;
            text-decoration: none;
          }

          .val {
            .weapon {
              @include weapon-font;
              font-size: 20px;
            }
          }

          &.debug {
            background: black;
          }

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }

  .watch-button {
    font-size: 12px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      margin-left: 5px;
      font-size: 20px;
      line-height: 12px;
      color: lightgray;
    }
  }
}
</style>