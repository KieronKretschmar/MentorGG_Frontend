<template>
  <div class="better-situations dashboard-unit">
    <div class="situations-split">
      <SituationsOverview
        title="Misplays"
        :nNewOccurences="nNewOccurences.Misplays"
        :situations="misplays"
        :matches="matches"
        :chartData="chartDataMisplays"
        chartTitle="Average misplays per round on a per match basis"
        typeClass="misplay"
        loaderText="Loading Misplay Data"
        noOccurencesText="There are no misplays available for this situation. Good job!"
      />

      <SituationsOverview
        title="Highlights"
        :nNewOccurences="nNewOccurences.Highlights"
        :situations="highlights"
        :matches="matches"
        :chartData="chartDataHighlights"
        chartTitle="Average highlights per round on a per match basis"
        typeClass="highlight"
        loaderText="Loading Highlight Data"
        noOccurencesText="There are no highlights available for this situation. What a bummer!"
      />
    </div>

    <div class="bordered-box hidden-occurences-info" v-if="totalHiddenOccurences > 0">
      <p>
        <i class="material-icons">error_outline</i>FREE users may only access misplays and highlights that took place in either the first or last round of each half of a match.
      </p>
      <button
        class="button-variant-bordered upgrade"
        @click="OpenMembershipPage"
      >Upgrade now to see {{ totalHiddenOccurences }} more misplay{{ totalHiddenOccurences > 1 ? 's' : '' }} / highlight{{ totalHiddenOccurences > 1 ? 's' : '' }}</button>
    </div>
  </div>
</template>

<script>
import SituationsOverview from "@/components/Situations/SituationsOverview.vue";
import LineChart from "@/components/Charts/LineChart.vue";
import SituationLoader from "@/SituationLoader";
import Enums from "@/enums";

export default {
  props: ["steamId"],
  components: {
    SituationsOverview,
    LineChart
  },
  mounted() {
    this.LoadData();
  },
  data() {
    return {
      situations: null,
      misplays: null,
      highlights: null,
      lastMatchId: this.$api.MatchSelector.Build().GetMostRecentMatchId(),
      nNewOccurences: {
        Misplays: 0,
        Highlights: 0
      },
      nHiddenOccurences: {
        Misplays: 0,
        Highlights: 0
      }
    };
  },
  methods: {
    LoadData() {
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
    PrepareData(dataKey) {
      let ret = [];

      this.nNewOccurences[dataKey] = 0;
      this.nHiddenOccurences[dataKey] = 0;

      Object.keys(this.situations[dataKey]).forEach(key => {
        let entry = this.situations[dataKey][key];

        if (SituationLoader.MutedSituations.indexOf(entry.MetaData.SituationType) != -1) {
          return;
        }

        let staticData = SituationLoader.getSituationData(
          entry.MetaData.SituationType
        );

        if (staticData == null) {
          return;
        }

        let temp = {
          name: staticData.name,
          occurencesVisible: false,
          type: entry.MetaData.SituationType,
          occurences: [],
          skillDomainName: entry.MetaData.SkillDomainName,
          containsNew: false
        };

        let orderedOccurences = entry.Situations.sort((first, second) =>
          this.$helpers.ShowFirstSituationLast(
            first,
            this.matches[first.MatchId],
            second,
            this.matches[second.MatchId]
          )
        );

        //filter occurences based on allowed rounds
        for (let occurence of orderedOccurences) {
          if (this.IsRoundAllowed(occurence.MatchId, occurence.Round)) {
            temp.occurences.push(occurence);
          } else {
            this.nHiddenOccurences[dataKey]++;
          }
        }

        // check if any of the occurences happened in the last match
        // to indicate if the situation category contains "new" occurences
        for (let occurence of temp.occurences) {
          if (occurence.MatchId == this.lastMatchId) {
            occurence.isNew = true;
            temp.containsNew = true;
            this.nNewOccurences[dataKey]++;
          }
        }

        // hide situations without occurences
        if (temp.occurences.length > 0) {
          ret.push(temp);
        }
      });

      return ret;
    },
    IsRoundAllowed(matchId, round) {
      if (!this.matches || this.matches[matchId] == undefined) {
        return false;
      }

      return this.matches[matchId].AllowedRounds.indexOf(round) != -1;
    },
    OpenMembershipPage() {
      this.$helpers.LogEvent(this, "SituationUpgrade");
      this.$router.push({
        name: "membership"
      });
    }
  },
  computed: {
    chartDataMisplays() {
      if (!this.situations) {
        return null;
      }

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
      if (!this.situations) {
        return null;
      }

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
      if (!this.situations) {
        return null;
      }

      let map = {};
      let ret = {};

      for (let dataKey of ["Misplays", "Highlights"]) {
        map[dataKey] = {};
        ret[dataKey] = [];

        Object.keys(this.situations[dataKey]).forEach(key => {
          let entry = this.situations[dataKey][key];

          for (let situation of entry.Situations) {
            //hide occurences that took place in non allowed
            if (!this.IsRoundAllowed(situation.MatchId, situation.Round)) {
              continue;
            }

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
    },
    matches() {
      if (!this.situations) {
        return null;
      }

      return this.situations.Matches;
    },
    totalHiddenOccurences() {
      return (
        this.nHiddenOccurences.Misplays + this.nHiddenOccurences.Highlights
      );
    }
  },
  watch: {
    steamId: function(val) {
      this.situations = null;
      this.misplays = [];
      this.highlights = [];
      this.LoadData();
    }
  }
};
</script>

<style lang="scss">
.better-situations {
  .situations-split {
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
  }

  .hidden-occurences-info {
    margin-top: 10px;
    text-align: center;

    p {
      margin-top: 0;
      margin-bottom: 10px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        color: $orange;
        margin-right: 5px;
      }
    }
  }
}

//responsive
@media (max-width: 800px) {
  .better-situations {
    .situations-split {
      flex-direction: column;

      .better-situation {
        width: 100%;

        &:first-child {
          margin-bottom: 20px;
        }
      }
    }
  }
}

@media (max-width: 450px) {
  .better-situation {
    .situation-table {
      .table-content {
        .entry {
          .occurences {
            .occurence {
              .content {
                overflow-x: scroll;

                .watch-wrapper {
                  margin-left: 20px;
                }
              }
            }
          }

          .cell {
            .situation-icon {
              display: none;
            }

            .situation-name {
              margin-left: 0;
              max-width: 140px;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}
</style>