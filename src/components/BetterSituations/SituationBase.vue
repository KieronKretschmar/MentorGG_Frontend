<template>
  <div class="situation-base">
    <div class="situation-header">
      <div class="situation-name">
        <img
          :src="$assetLoader.getSkillDomainIcon(dynamicSituationData.SituationCollection.MetaData.SkillDomainName)"
          v-if="dynamicSituationData"
        />
        <span v-if="staticSituationData.isHighlight" class="highlight">Highlight:</span>
        <span v-if="staticSituationData.isMisplay" class="misplay">Misplay:</span>
        {{ staticSituationData.name }}
      </div>
      <div
        class="situation-count"
        :class="{highlight: staticSituationData.isHighlight, misplay: staticSituationData.isMisplay}"
      >{{ dynamicSituationData.SituationCollection.Situations.length }}</div>
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
      <h2 class="section-header">Occurence History Graph</h2>
      <div class="bordered-box chart-container">
        <p class="chart-title">
          Average
          <span v-if="staticSituationData.isHighlight">highlights</span>
          <span v-if="staticSituationData.isMisplay">misplays</span> per round on a per match basis
        </p>
        <LineChart :options="chartOptions" :data="chartData" class="history-graph-inner-wrapper" />
      </div>
    </div>

    <div class="occurences">
      <h2 class="section-header">Occurences</h2>
      <div class="occurence-list">
        <div
          class="occurence bordered-box"
          v-for="occurence in dynamicSituationData.SituationCollection.Situations"
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
          </div>

          <button class="watch-button button-variant-bordered" @click="Watch(occurence, staticSituationData.typeName)">
            Watch
            <i class="material-icons">videocam</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart.vue";
import Enums from "@/enums";

export default {
  props: ["staticSituationData"],
  components: {
    LineChart
  },
  mounted() {
    console.log(this.staticSituationData);
    this.$api
      .getSituationsOfType({
        type: this.staticSituationData.type
      })
      .then(result => {
        this.dynamicSituationData = result.data;
        console.log(this.dynamicSituationData);
      });
  },
  data() {
    return {
      dynamicSituationData: null,
      chartOptions: {
        tooltips: {
          enabled: false
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
    Watch(occurence, typeName) {
        console.log(typeName);

      this.$helpers.LogEvent(this, "WatchSituation", {
        label: Enums.SituationType.ToString(typeName)
      });

      globalThis.DemoViewer.SetMatch(occurence.MatchId)
        .SetRound(occurence.Round)
        .SetTimestamp(Math.max(0, occurence.StartTime))
        .Load();
    }
  },
  computed: {
    chartLabels() {
      let labels = [];

      for (let i = 0; i < 10; i++) {
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
            backgroundColor: "#2d2c3b",
            pointBackgroundColor: "#ff4800",
            borderColor: "#39384a",
            data: [1, 2, 3, 2, 5, 9, 7, 8, 9, 10],
            fill: true,
            lineTension: 0
          }
        ]
      };
    }
  }
};
</script>

<style lang="scss">
.situation-base {
  .situation-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 75px;
    margin-bottom: 20px;

    .situation-name {
      color: white;
      font-size: 1.75rem;
      font-weight: 700;
      display: flex;
      align-items: center;

      img {
        width: 60px;
        margin-right: 10px;
      }

      span {
        margin-right: 10px;

        &.highlight {
          color: $green;
        }

        &.misplay {
          color: crimson;
        }
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

      &.misplay {
        background: crimson;
      }

      &.highlight {
        background: $green;
        color: $dark-1;
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