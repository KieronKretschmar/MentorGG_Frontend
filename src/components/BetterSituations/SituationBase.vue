<template>
  <div class="situation-base">
    <div class="situation-name">
      <span v-if="situation.isHighlight">Highlight:</span>
      <span v-if="situation.isMisplay">Misplay:</span>
      {{ situation.name }}
    </div>
    <div class="description-howtoavoid">
      <div class="description">
        <h2 class="section-header">Description</h2>
        <div class="bordered-box">{{ situation.description }}</div>
      </div>
      <div class="how-to-avoid">
        <h2 class="section-header">How to avoid</h2>
        <div class="bordered-box">{{ situation.howToAvoid }}</div>
      </div>
    </div>

    <div class="chart">
      <h2 class="section-header">Occurence History Graph</h2>
      <div class="bordered-box">
        <LineChart :options="chartOptions" :data="chartData" class="history-graph-inner-wrapper" />
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart.vue";

export default {
  props: ["situation"],
  components: {
    LineChart
  },
  mounted() {
    console.log(this.situation);
  },
  data() {
    return {
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
                stepSize: 1,
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
            backgroundColor: "#ff4800",
            borderColor: "#39384a",
            data: [1, 2, 3, 2, 5, 9, 7, 8, 9, 10],
            fill: false,
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
  .situation-name {
    color: white;
    font-size: 1.75rem;
    font-weight: 700;
    margin-top: 75px;
    margin-bottom: 20px;
  }

  .description-howtoavoid {
    display: flex;
    justify-content: space-between;

    .description,
    .how-to-avoid {
      width: calc(50% - 5px);
      color: white;
      display: flex;
      flex-direction: column;

      .bordered-box {
        flex: 1 0 auto;
      }
    }
  }

  .chart {
    margin-top: 35px;
  }
}
</style>