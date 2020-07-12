<template>
  <div class="view view-situation-detail-overview">
    <div class="fixed-width-container">
      <template v-if="metaData">
        <div class="split">
          <div class="l">
            <h2 class="section-header">Misplays</h2>
            <div class="chart-wrapper">
              <RadarChart :data="radarChartData" :options="radarChartOptions"></RadarChart>
            </div>
            <div class="entries">
              <div
                @click="$emit('open-detail', entry.type)"
                class="entry"
                v-for="entry in renderData.misplays"
                :key="entry.type"
              >
                <div class="icon-and-name">
                  <img
                    v-if="entry.meta"
                    :src="$assetLoader.getSkillDomainIcon(entry.meta.SkillDomainName)"
                  />
                  <div class="icon-placeholder" v-else></div>
                  {{ entry.name }}
                </div>
                <div
                  class="count"
                  v-if="situationCounts && situationCounts[entry.type]"
                >{{ situationCounts[entry.type] }}</div>
                <div class="count" v-else>0</div>
              </div>
            </div>
          </div>
          <div class="r">
            <h2 class="section-header">Highlights</h2>
            <div class="chart-wrapper">
              <RadarChart :data="radarChartData" :options="radarChartOptions"></RadarChart>
            </div>
            <div class="entries">
              <div
                @click="$emit('open-detail', entry.type)"
                class="entry"
                v-for="entry in renderData.highlights"
                :key="entry.type"
              >
                <div class="icon-and-name">
                  <img
                    v-if="entry.meta"
                    :src="$assetLoader.getSkillDomainIcon(entry.meta.SkillDomainName)"
                  />
                  <div class="icon-placeholder" v-else></div>
                  {{ entry.name }}
                </div>
                <div
                  class="count"
                  v-if="situationCounts && situationCounts[entry.type]"
                >{{ situationCounts[entry.type] }}</div>
                <div class="count" v-else>0</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Enums from "@/enums";
import SituationLoader from "@/SituationLoader";
import RadarChart from "@/components/Charts/RadarChart.vue";

export default {
  props: ["steamId"],
  components: {
    RadarChart
  },
  mounted() {
    this.$api.getSituationsMetaData({}).then(result => {
      this.metaData = result.data.Data;
    });

    this.$api
      .getSituations({
        steamId: this.steamId
      })
      .then(result => {
        this.situations = result.data;
      });
  },
  data() {
    return {
      Enums,
      metaData: null,
      situations: null,
      radarChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          position: "top"
        },
        title: {
          display: false
        },
        scale: {
          // display: false,
          pointLabels: {
            backgroundColor: "red",
            fontColor: "#ff4800",
            fontSize: 12,
            fontFamily: "Montserrat"
            // fontStyle: "bold"
          },
          gridLines: {
            color: "#15141b"
          },
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            suggestedMax: 5,
            backdropColor: "#15141b",
            fontColor: "#39384a"
          }
        }
      }
    };
  },
  methods: {
    FindSituationMetaData(type) {
      if (this.metaData == null) {
        return null;
      }

      return this.metaData.find(e => e.SituationType == type);
    }
  },
  computed: {
    radarChartData() {
      return {
        labels: ["Grenades", "Shooting", "Movement", "Tactical"],
        datasets: [
          {
            data: [1, 0, 0, 0],
            backgroundColor: "rgba(45, 44, 59 , 0.25)",
            pointBackgroundColor: "#ff4800",
            borderColor: "#39384a"
          }
        ]
      };
    },
    renderData() {
      let ret = {
        misplays: [],
        highlights: []
      };

      if (!this.metaData) {
        return ret;
      }

      let values = Enums.SituationType.Values();
      for (let situationName in values) {
        let situationType = values[situationName];
        if (situationType == Enums.SituationType.Unknown) {
          continue;
        }

        if (SituationLoader.MutedSituations.indexOf(situationType) != -1) {
          continue;
        }

        let data = SituationLoader.getSituationData(situationType);
        data.meta = this.FindSituationMetaData(situationType);

        if (data.isMisplay) {
          ret.misplays.push(data);
          continue;
        }

        if (data.isHighlight) {
          ret.highlights.push(data);
          continue;
        }
      }

      return ret;
    },
    situationCounts() {
      let ret = {};

      if (!this.situations) {
        return null;
      }

      for (let a of ["Highlights", "Misplays"]) {
        for (let key in this.situations[a]) {
          let entry = this.situations[a][key];
          ret[entry.MetaData.SituationType] = 0;

          let count = 0;

          for (let occurence of entry.Situations) {
            if (
              this.situations.Matches[occurence.MatchId].AllowedRounds.indexOf(
                occurence.Round
              ) != -1
            ) {
              count++;
            }
          }

          ret[entry.MetaData.SituationType] = count;
        }
      }

      return ret;
    }
  }
};
</script>

<style lang="scss">
.view-situation-detail-overview {
  .fixed-width-container {
    .split {
      display: flex;
      margin-top: 20px;
      margin-bottom: 60px;
      justify-content: space-between;

      .l,
      .r {
        width: calc(50% - 10px);
      }

      .l {
        .entries {
          .entry {
            padding-left: 20px;
            background: $dark-1;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;

            &:hover {
              background: lighten($dark-1, 5%);
            }

            img,
            .icon-placeholder {
              margin-right: 10px;
            }
          }
        }
      }

      .r {
        .entries {
          .entry {
            padding-left: 20px;
            background: $dark-1;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;

            &:hover {
              background: lighten($dark-1, 5%);
            }

            img,
            .icon-placeholder {
              margin-right: 10px;
            }
          }
        }
      }

      .chart-wrapper {
        // background: $dark-3;
        border: 1px solid $purple;
        border-radius: 4px;
        margin-bottom: 10px;
        padding: 10px;
        display: none;
      }

      .entries {
        display: flex;
        flex-direction: column;

        .entry {
          background: $dark-1;
          color: white;
          margin-bottom: 10px;
          padding: 10px;
          transition: 0.35s;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid $purple;
          font-size: 14px;
          cursor: pointer;
          user-select: none;

          &:last-child {
            margin-bottom: 0;
          }

          .icon-and-name {
            display: flex;
            align-items: center;
          }

          .count {
            background: $purple;
            color: white;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;           
            border-radius: 4px;
            font-weight: 500; 
          }

          img,
          .icon-placeholder {
            width: 32px;
            height: 32px;
          }
        }
      }
    }
  }
}

//responsive
@media(max-width: 800px) {
  .view-situation-detail-overview {
    .fixed-width-container {
      .split {
        flex-direction: column;

        .l,
        .r {
          width: 100%;
        }

        .r {
          margin-top: 40px;
        }
      }
    }
  }
}
</style>