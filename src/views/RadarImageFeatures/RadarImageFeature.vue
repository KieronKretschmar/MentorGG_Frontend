<template></template>

<script>
/**
 * This is a base class for Radar Image Features, i.e. features centered around
 * drawing samples (e.g. grenades or kills) on a radar image.
 *
 */

// General
import Enums from "@/enums";
import CustomSelect from "@/components/CustomSelect.vue";
import RadarImage from "@/components/RadarImageFeatures/RadarImage.vue";
import VideoOverlay from "@/components/VideoOverlay.vue";
require("vue-image-lightbox/dist/vue-image-lightbox.min.css");
import LightBox from "vue-image-lightbox";
// Zones
import Zone from "@/components/RadarImageFeatures/Zone.vue";
// Lineups
import Lineup from "@/components/RadarImageFeatures/Lineup.vue";
import Target from "@/components/RadarImageFeatures/Target.vue";

export default {
  components: {
    // General
    CustomSelect,
    RadarImage,
    VideoOverlay,
    LightBox,
    // Zones
    Zone,
    // Lineups
    Lineup,
    Target
  },
  data() {
    return {
      // overriden by inheriting class
      config: {
        // Enums.SampleType
        sampleType: null,
        features: {
          zones: false,
          lineups: false,
          filterable: false
        }
      },

      // General
      loadingSamplesComplete: false,
      showCt: true,
      matchCount: 10,
      matchCountSelectOptions: {
        1: "Use last match",
        5: "Use last 5 matches",
        10: "Use last 10 matches",
        50: "Use last 50 matches",
        100: "Use last 100 matches"
      },
      showTrajectories: false,
      viewType: Enums.RadarViewTypes.Sample,
      activeMap: "de_mirage",
      mapInfo: {},
      samples: [],
      selectedSample: null,
      // Add enums so we can reference it in template
      Enums: Enums,
      userPerformanceData: null,

      // Zones
      zonesEnabled: false,
      zones: [],
      zoneDescendants: [],
      selectedZoneId: null,
      mainZones: [],

      // Lineup
      lineupsEnabled: false,
      lineups: [],
      selectedSample: null,
      selectedLineupId: null,

      // Filters
      activeFilterSettings: null
    };
  },
  mounted() {},
  methods: {
    // use init() to be called by inheriting class instead of mounted(),
    // because this way it uses this.config of the inheriting class instead of this classes default config
    init() {
      if (this.$route.query.map) {
        this.activeMap = this.$route.query.map;
      }
      if (this.$route.query.matchCount) {
        this.matchCount = this.$route.query.matchCount;
        this.matchCountSelectOptions[this.$route.query.matchCount] =
          "Use last " + this.$route.query.matchCount + " matches";
      }
      this.LoadSamples(this.activeMap, this.matchCount, false);
    },
    // General
    LoadSamples(map, matchCount, isDemo) {
      this.samples = [];
      this.loadingSamplesComplete = false;
      this.$api
        .getSamples(
          this.config.sampleType,
          isDemo ? "76561198033880857" : "",
          map,
          matchCount
        ) // TODO: Change api to accept type
        .then(response => {
          // General
          this.mapInfo = response.data.MapInfo;
          this.samples = response.data.Samples;
          this.userPerformanceData = response.data.UserData;

          // (hierarchichal) Zones
          if (this.config.features.zones) {
            // Ignore zones where there are no samples for less clutter
            this.zones = response.data.Zones.filter(x =>
              // TODO: Kills does not have samplecount yet. Remove conditional computation and replace Kills+Deaths with SampleCount for new backend
              this.config.sampleType == Enums.SampleType.Kill
                ? this.activeUserData.ZonePerformances[x.ZoneId].Kills +
                    this.activeUserData.ZonePerformances[x.ZoneId].Deaths !=
                  0
                : this.activeUserData.ZonePerformances[x.ZoneId].SampleCount !=
                  0
            ).sort((a, b) => a.Depth - b.Depth);
            if (this.zones.length == 0) {
              this.zonesEnabled = false; // TODO: rename to hierarchicalZones?
            } else {
              this.zonesEnabled = true;
            }

            // Compute mainZones (CT and T)
            this.mainZones = this.zones.filter(x => x.ParentZoneId == -1);

            this.zoneDescendants = response.data.ZoneDescendants;
          }

          // Filterable
          if (this.config.features.filterable) {
          }

          // Lineups & target Zones
          if (this.config.features.lineups) {
            this.lineups = response.data.Lineups;
            this.zones = response.data.Zones.filter(
              x => x.CategoryIds.length > 0
            );

            if (this.lineups.length == 0) {
              this.lineupsEnabled = false;
            } else {
              this.lineupsEnabled = true;
            }
          }

          this.loadingSamplesComplete = true;
        })
        .catch(error => {
          console.error(error); // eslint-disable-line no-console
          this.loadingSamplesComplete = true;
        });
    },
    OnShowTrajectories: function() {
      let showTrajectories = !this.showTrajectories;
      this.$helpers.LogEvent(
        this,
        showTrajectories ? "ShowTrajectories" : "HideTrajectories"
      );

      this.showTrajectories = showTrajectories;
    },
    OnMatchCountUpdated: function() {
      this.$helpers.LogEvent(this, "MatchCountUpdated", {
        label: this.matchCount
      });

      this.LoadSamples(this.activeMap, this.matchCount, false);
    },
    OnClickBackground: function() {
      this.$helpers.LogEvent(this, "ClickBackground"); // TODO: Check ob component richtig geloggt wird

      this.ResetSelection();
    },
    OnActiveMapUpdated: function(map) {
      this.$helpers.LogEvent(this, "ActiveMapUpdated", { label: map });

      if (this.activeMap != map) {
        this.LoadSamples(map, this.matchCount, false);
        this.activeMap = map;
      }
      this.ResetSelection();
    },
    ResetSelection() {
      this.selectedSample = null;
      this.selectedZoneId = null;
      this.selectedLineupId = null;
    },
    SetSelectedSample: function(id) {
      this.$helpers.LogEvent(this, "SampleSelected");

      this.selectedSample = this.samples.find(x => x.Id == id);
    },
    SetShowCt(showCt) {
      this.$helpers.LogEvent(this, showCt ? "ShowCt" : "ShowTerrorists");

      this.ResetSelection();
      this.showCt = showCt;
    },
    SetViewType(viewType) {
      this.$helpers.LogEvent(this, "SetViewType", { label: viewType });

      this.ResetSelection();
      this.viewType = viewType;
    },
    Watch: function(matchId, round, time = null) {
      this.$helpers.LogEvent(this, "Watch");

      let dv = globalThis.DemoViewer.SetMatch(matchId).SetRound(round);
      if (time) {
        dv.SetTimestamp(Math.max(0, time));
      }
      dv.Load();
    },

    // Zones
    SetSelectedZone: function(zoneId) {
      this.$helpers.LogEvent(this, "ZoneSelected", { label: zoneId });

      this.ResetSelection();
      this.selectedZoneId = zoneId;
    },

    // Lineups
    OpenLightbox() {
      this.$refs.lightbox.showImage(0);
    },
    SetSelectedLineup: function(lineupId) {
      this.$helpers.LogEvent(this, "LineupSelected", { label: lineupId });
      this.selectedLineupId = lineupId;
    },

    // Filterable
    applyFilters() {
      // To be overriden by inheriting class
    }
  },
  computed: {
    // Samples
    activeUserData() {
      // override this method when enabling filtering
      return this.userPerformanceData;
    },
    visibleSamples() {
      if (!this.samples) return [];

      // If a sample is selected, return it
      if (this.selectedSample != null) return [this.selectedSample];

      let res;
      // SampleView
      if (this.viewType == Enums.RadarViewTypes.Sample) {
        // All samples of the given team
        res = this.samples.filter(x => x.UserIsCt == this.showCt);
      }

      // ZoneView
      if (this.viewType == Enums.RadarViewTypes.Zone) {
        // All samples of the given team
        res = this.samples.filter(x => x.UserIsCt == this.showCt);

        // If a zone is selected, remove all samples not included
        if (this.selectedZoneId) {
          // Filtering by KillZones is different than by other zones
          if (this.config.sampleType == Enums.SampleType.Kill) {
            // Filter by Player or VictimZone, depending on whether the user was killer or victim
            res = res.filter(
              x =>
                this.zoneDescendants[this.selectedZoneId].includes(
                  x.UserWinner ? x.PlayerZoneId : x.VictimZoneId
                ) ||
                (x.UserWinner ? x.PlayerZoneId : x.VictimZoneId) ==
                  this.selectedZoneId
            );
          } else {
            // Filter by whether the sample is included in the selected Zone
            res = this.samples.filter(
              x =>
                this.zoneDescendants[this.selectedZoneId].includes(x.ZoneId) ||
                x.ZoneId == this.selectedZoneId
            );
          }
        }
      }

      // LineupView
      if (this.viewType == Enums.RadarViewTypes.Lineup) {
        // If a lineup is selected, return all the samples of this lineup (no matter the team)
        if (this.selectedLineup != null) {
          res = this.samples.filter(x => x.LineupId == this.selectedLineupId);
        } else {
          // If no lineup is selected, return no samples
          res = [];
        }
      }

      if (this.config.features.filterable) {
        // apply filter on
        // applyFilters() is implemented by inherting class
        res = this.applyFilters(res);
      }

      return res;
    },

    // Zones
    mainZoneId() {
      if (!this.mainZones.length > 0) {
        return null;
      }
      return this.mainZones.find(x => x.IsCtZone == this.showCt).ZoneId;
    },
    userSelectedZonePerformance() {
      if (this.selectedZoneId == null) {
        return this.activeUserData.ZonePerformances[this.mainZoneId];
      }
      return this.activeUserData.ZonePerformances[this.selectedZone.ZoneId];
    },
    userTotalRounds() {
      return this.showCt
        ? this.activeUserData.TotalCtRounds
        : this.activeUserData.TotalTerroristRounds;
    },
    selectedZone() {
      if (this.selectedZoneId == null) {
        return null;
      }
      return this.zones.find(x => x.ZoneId == this.selectedZoneId);
    },
    visibleZones() {
      if (
        this.viewType != Enums.RadarViewTypes.Zone &&
        this.viewType != Enums.RadarViewTypes.Lineup
      )
        return [];

      // ZoneView
      if (this.viewType == Enums.RadarViewTypes.Zone) {
        // If a zone is selected, return its subzones
        if (this.selectedZone != null) {
          return this.zones.filter(
            x =>
              x.ParentZoneId == this.selectedZone.ZoneId ||
              this.selectedZone.ZoneId == x.ZoneId
          );
          // If not, return all subzones of the main zone
        } else {
          return this.zones.filter(
            x => x.IsCtZone == this.showCt && x.Depth == 1
          );
        }
      }

      // LineupView
      if (this.viewType == Enums.RadarViewTypes.Lineup) {
        // If a zone is selected, return it
        if (this.selectedZone != null) return [this.selectedZone];
        // If a lineup is selected, return its target zone
        if (this.selectedLineup != null)
          return [
            this.zones.find(x => x.ZoneId == this.selectedLineup.TargetId)
          ];
        // If none are selected, return all target zones
        return this.zones;
      }
    },

    // Lineups
    userSelectedLineupPerformance() {
      if (this.selectedLineup == null) return null;
      return this.activeUserData.LineupPerformances[
        this.selectedLineup.LineupId
      ];
    },
    selectedLineup() {
      if (this.selectedLineupId == null) {
        return null;
      }
      return this.lineups.find(x => x.LineupId == this.selectedLineupId);
    },
    visibleLineups() {
      // If lineups are not enabled, hide them
      if (this.viewType != Enums.RadarViewTypes.Lineup) return [];
      if (!this.lineupsEnabled) return [];
      // If a lineup is selected, return it
      if (this.selectedLineup != null) return [this.selectedLineup];
      // If a target zone is selected, return its lineups
      if (this.selectedZone != null)
        return this.lineups.filter(x => x.TargetId == this.selectedZone.ZoneId);
      // If not, return all lineups
      return this.lineups;
    },
    lineupImages() {
      let ret = [];
      if (this.selectedLineup == null) {
        return ret;
      }

      if (
        this.selectedLineup.Images.length !=
        this.selectedLineup.Thumbnails.length
      ) {
        return ret;
      }

      for (let i = 0; i < this.selectedLineup.Images.length; i++) {
        let basePath = `~/assets/radarimagefeatures/lineups/${Enums.SampleType.ToString(this.sampleType).toLowerCase()}/${this.activeMap}/${this.selectedLineup.LineupId}`;
        ret.push({
          src: this.$api.resolveResource(`${basePath}/${i}.jpg`),
          thumb: this.$api.resolveResource(`${basePath}/${i}_thumb.jpg`),
        });
      }

      return ret;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebar.scss";

.view-radarimage-feature {
  margin-top: 40px;
}

.no-data {
  margin-top: 20px;
}

.interactive-area {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .l {
    width: calc(70% - 20px);
    // display: flex;
    align-items: center;
    justify-content: space-between;

    .tool-menu {
      display: flex;
      flex-direction: row;
      align-items: center;

      > button {
        margin-right: 20px;
      }
    }

    .team-select {
      display: flex;
      margin: 0 20px;

      img {
        margin: 0 5px;
      }

      :not(.active) {
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
        filter: grayscale(100%);
      }

      :hover {
        -webkit-filter: none;
        -moz-filter: none;
        -ms-filter: none;
        filter: none;
      }

      .t {
        transition: 0.35s;
        cursor: pointer;

        &.active,
        &:hover {
          filter: drop-shadow(0px 0px 7px rgb(168, 153, 102));
        }
      }

      .ct {
        transition: 0.35s;
        cursor: pointer;

        &.active,
        &:hover {
          filter: drop-shadow(0px 0px 7px rgb(61, 120, 204));
        }
      }
    }

    .match-count-select {
      width: 100%;
      // max-width: 400px;
    }
  }

  .r {
    width: 30%;

    .sidebar {
      color: white;
    }
  }
}
</style>