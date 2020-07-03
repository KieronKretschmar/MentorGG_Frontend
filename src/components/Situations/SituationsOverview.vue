<template>
  <div class="better-situation" :class="typeClass">
    <h2 class="section-header">
      <span>{{ title }}</span>
      <span class="new-count" v-if="nNewOccurences > 0">+{{ nNewOccurences }} new from last match</span>
    </h2>
    <template v-if="situations">
      <template v-if="situations.length > 0">
        <div
          class="bordered-box chart-container"
          v-if="situations && chartData.datasets[0].data.length > 1"
        >
          <p class="chart-title">{{ chartTitle }}</p>
          <LineChart
            :options="chartOptions"
            :data="chartData"
            class="situation-graph-inner-wrapper"
          />
        </div>
        <div class="bordered-box stretch-wrapper">
          <div class="situation-table">
            <div class="table-content">
              <div v-for="situation in situations" :key="situation.type" class="entry">
                <div class="category-wrapper">
                  <router-link :to="{name: 'situation-detail', params: {type: situation.type}}">
                    <div class="cell link">
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
                  </router-link>
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
                  v-if="situation.occurences.length > 0"
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
                          :src="$assetLoader.getMapPreview(matches[occurence.MatchId].Map)"
                        />
                        <span
                          class="match-date"
                        >{{ matches[occurence.MatchId].MatchDate|formatDateAndTime }}</span>
                        <span class="map">{{ matches[occurence.MatchId].Map }}</span>
                      </span>
                      <span class="watch-wrapper">
                        <span class="round">Round {{ occurence.Round }}</span>
                        <i
                          title="Watch in Browser"
                          class="material-icons watch-match-icon"
                          @click="Watch(occurence, situation)"
                          :class="{disabled: !$helpers.DemoViewerAvailable(matches[occurence.MatchId].Map)}"
                        >videocam</i>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="occurences"
                  :style="{'max-height': situation.occurencesVisible ? '45px' : '0px'}"
                  v-else
                >
                  <p>{{ noOccurencesText }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="bordered-box no-data-available">
          <p>No data available.</p>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="bordered-box">
        <AjaxLoader>{{ loaderText }}</AjaxLoader>
      </div>
    </template>
  </div>
</template>

<script>
import LineChart from "@/components/Charts/LineChart.vue";
import Enums from "@/enums";

export default {
  props: [
    "title",
    "nNewOccurences",
    "situations",
    "matches",
    "chartData",
    "chartTitle",
    "typeClass",
    "loaderText",
    "noOccurencesText"
  ],
  components: {
    LineChart
  },
  mounted() {
    console.log(this.situations);
  },
  data() {
    let self = this;

    return {
      prependTime: 4000,
      chartOptions: {
        tooltips: {
          enabled: true,
          callbacks: {
            title: function(tooltipItems, data) {
              let xLabel = tooltipItems[0].xLabel;

              if (!self.situations) {
                return "Match #" + xLabel;
              } else {
                let matchId = Object.keys(self.matches)[+xLabel - 1];
                let match = self.matches[matchId];

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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: ""
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
                labelString: ""
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
    Watch(occurence, situation) {
      this.$helpers.LogEvent(this, "WatchSituation", {
        label: Enums.SituationType.ToString(situation.type)
      });

      globalThis.DemoViewer.SetMatch(occurence.MatchId)
        .SetRound(occurence.Round)
        .SetTimestamp(Math.max(0, occurence.StartTime - this.prependTime))
        .Load();
    }
  }
};
</script>

<style lang="scss">
.better-situation {
  width: calc(50% - 5px);
  display: flex;
  flex-direction: column;

  .chart-container {
    margin-bottom: 10px;

    .chart-title {
      color: $orange;
      font-size: 12px;
      text-align: center;
      background: $dark-3;
      border-radius: 4px;
      padding: 5px 10px;
      margin-top: 0;
      white-space: normal;
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

        .category-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;

          a {
            text-decoration: none;
          }

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
            background: $dark-1;
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

              &.disabled {
                color: $gray;
                pointer-events: none;
                cursor: default;
              }
            }
          }

          p {
            margin: 0;
            margin-top: 10px;
            background: $dark-1;
            border-radius: 4px;
            text-align: center;
            padding: 10px 10px;
            font-size: 12px;
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

  &.misplay {
    .new-indicator,
    .new-count {
      background: crimson;
      color: white;
    }
  }

  &.highlight {
    .new-indicator,
    .new-count {
      background: $green-2;
      color: white;
    }
  }
}
</style>