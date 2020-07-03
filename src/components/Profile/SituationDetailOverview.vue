<template>
  <div class="view view-situation-detail-overview">
    <div class="fixed-width-container">
      <template v-if="metaData">
        <div class="filters">
          <div
            class="filter"
            v-for="(val, name) in Enums.SkillDomain.Values()"
            :key="name"
            @click="ToggleFilter(name)"
          >
            <img :src="$assetLoader.getSkillDomainIcon(name)" />
            <span class="name">
              {{ name }}
              <i class="material-icons" :class="{visible: filters[name]}">check</i>
            </span>
          </div>
        </div>

        <div class="split">
          <div class="l">
            <h2 class="section-header">Misplays</h2>
            <div class="chart-wrapper">
              <RadarChart :data="radarChartData" :options="radarChartOptions"></RadarChart>
            </div>
            <div class="entries">
              <router-link
                :to="{name: 'situation-detail', params: {type: entry.type}}"
                class="entry"
                v-for="entry in renderData.misplays"
                :key="entry.type"
              >
                <img
                  v-if="entry.meta"
                  :src="$assetLoader.getSkillDomainIcon(entry.meta.SkillDomainName)"
                />
                <div class="icon-placeholder" v-else></div>
                {{ entry.name }}
              </router-link>
            </div>
          </div>
          <div class="r">
            <h2 class="section-header">Highlights</h2>
            <div class="chart-wrapper">
              <RadarChart :data="radarChartData" :options="radarChartOptions"></RadarChart>
            </div>
            <div class="entries">
              <router-link
                :to="{name: 'situation-detail', params: {type: entry.type}}"
                class="entry"
                v-for="entry in renderData.highlights"
                :key="entry.type"
              >
                <img
                  v-if="entry.meta"
                  :src="$assetLoader.getSkillDomainIcon(entry.meta.SkillDomainName)"
                />
                <div class="icon-placeholder" v-else></div>
                {{ entry.name }}
              </router-link>
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
  components: {
    RadarChart
  },
  beforeMount() {
    for (let skillDomainName in Enums.SkillDomain.Values()) {
      this.$set(this.filters, skillDomainName, true);
    }
  },
  mounted() {
    this.$api.getSituationsMetaData({}).then(result => {
      this.metaData = result.data.Data;
    });
  },
  data() {
    return {
      Enums,
      metaData: null,
      filters: {},
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
    },
    ToggleFilter(name) {
      this.filters[name] = !this.filters[name];
      console.log(this.filters);
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

        if (!this.filters[data.meta.SkillDomainName]) {
          continue;
        }

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
    }
  }
};
</script>

<style lang="scss">
.view-situation-detail-overview {
  .fixed-width-container {
    .filters {
      display: flex;
      flex-wrap: wrap;
      margin: -10px;
      margin-top: 65px;

      .filter {
        width: calc(25% - 20px);
        margin: 10px;
        background: $dark-1;
        border: 1px solid $purple;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 4px;
        user-select: none;
        cursor: pointer;

        img {
          width: 64px;
          height: 64px;
          padding: 10px;
        }

        .name {
          padding: 5px 20px;
          color: white;
          background: $purple;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 34px;

          i {
            color: $orange;
            opacity: 0;
            transition: 0.35s;

            &.visible {
              opacity: 1;
            }
          }
        }
      }
    }

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
        .section-header {
          color: $red;
        }

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
        .section-header {
          color: $green-2;
        }

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
          border: 1px solid $purple;
          font-size: 14px;

          &:last-child {
            margin-bottom: 0;
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
</style>