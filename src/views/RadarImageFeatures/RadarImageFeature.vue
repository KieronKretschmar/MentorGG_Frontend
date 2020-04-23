<template></template>

<script>
/**
 * This is a base class for Radar Image Features, i.e. features centered around
 * drawing samples (e.g. grenades or kills) on a radar image.
 *
 */

// General
import Enums from "@/enums";
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
      showTrajectories: false,
      viewType: Enums.RadarViewTypes.Sample,
      activeMap: "de_mirage",
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
      targets: [],
      selectedSample: null,
      selectedLineupId: null,
      selectedTargetId: null,

      // Filters
      activeFilterSettings: null,

      // DemoViewer
      watchTimePrepend: 4000
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
      this.LoadSamples(this.activeMap, false).then(() => {
        if (this.$route.query.showCt != null) {
          this.showCt = this.$route.query.showCt;
        }

        if (this.$route.query.zoneId) {
          this.selectedZoneId = this.$route.query.zoneId;
          this.viewType = Enums.RadarViewTypes.Zone;
        }
      });
    },
    // General
    LoadSamples(map, isDemo) {
      return new Promise((resolve, reject) => {
        this.samples = [];
        this.loadingSamplesComplete = false;

        let params = {
          type: this.config.sampleType,
          map: map,
          steamId: isDemo ? "76561198033880857" : this.$api.User.GetSteamId()
        };
        let overrides = { maps: [map] };

        this.$api
          .getSamples(params, overrides)
          .then(response => {
            // General
            this.samples = response.data.Samples;

            // (hierarchichal) Zones
            if (this.config.features.zones) {
              this.userPerformanceData = response.data.ZonePerformanceSummary;

              this.AssignZones(response.data.ZoneInfos);
            }

            // Filterable
            if (this.config.features.filterable) {
              this.userPerformanceData =
                response.data.FilterableZonePerformanceData;
              this.AssignZones(response.data.ZoneInfos);
            }

            // Lineups & target Zones
            if (this.config.features.lineups) {
              this.userPerformanceData = response.data.LineupPerformanceSummary;

              this.AssignLineups(response.data.LineupCollection);
            }

            this.loadingSamplesComplete = true;
            resolve();
          })
          .catch(error => {
            console.error(error); // eslint-disable-line no-console
            this.loadingSamplesComplete = true;
            resolve();
          });
      });
    },
    AssignLineups(lineupCollection) {
      // store targets as list instead of json
      let targetList = [];
      for (const id in lineupCollection.Targets) {
        targetList.push(lineupCollection.Targets[id]);
      }
      // ignore targets that don't have lineups pointing to them
      this.targets = targetList.filter(x => x.LineupIds.length > 0);

      // store lineups as list instead of json
      let lineupList = [];
      for (const id in lineupCollection.Lineups) {
        lineupList.push(lineupCollection.Lineups[id]);
      }
      this.lineups = lineupList;

      this.lineupsEnabled = this.lineups.length > 0 ? true : false;
    },
    AssignZones(zoneInfos) {
      // sort zones to guarantee that those with the lowest depth come first
      // if the zones are unordered, they will be rendered in the wrong order, which will cause unexpected behaviour when clicking on a zone
      // this is because the order in which items are rendered in an <svg> acts like a z-index
      this.zones = zoneInfos.sort((a, b) => a.ZoneDepth - b.ZoneDepth);
      if (this.zones.length == 0) {
        this.zonesEnabled = false; // TODO: rename to hierarchicalZones?
      } else {
        this.zonesEnabled = true;
      }

      // Compute mainZones (CT and T)
      this.mainZones = this.zones.filter(x => x.ParentZoneId == -1);
      this.zoneDescendants = this.getZoneDescendants(this.zones);
    },
    ResetSelection() {
      this.selectedSample = null;
      this.selectedZoneId = null;
      this.selectedLineupId = null;
      this.selectedTargetId = null;
    },

    // Event handlers
    OnShowTrajectories: function() {
      let showTrajectories = !this.showTrajectories;
      this.$helpers.LogEvent(
        this,
        showTrajectories ? "ShowTrajectories" : "HideTrajectories"
      );

      this.showTrajectories = showTrajectories;
    },
    OnClickBackground: function() {
      this.$helpers.LogEvent(this, "ClickBackground"); // TODO: Check ob component richtig geloggt wird

      this.ResetSelection();
    },
    OnActiveMapUpdated: function(map) {
      this.$helpers.LogEvent(this, "ActiveMapUpdated", { label: map });

      if (this.activeMap != map) {
        this.LoadSamples(map, false);
        this.activeMap = map;
      }
      this.ResetSelection();
    },

    // Setters
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

    // Zone
    SetSelectedZone: function(zoneId) {
      this.$helpers.LogEvent(this, "ZoneSelected", { label: zoneId });

      this.ResetSelection();
      this.selectedZoneId = zoneId;
    },
    // returns an object mapping each zone to all its descendants {<zoneId> : [<descendantZoneId>, <descendantZoneId>, ...], <zoneId> : [...], ...}
    getZoneDescendants(zones) {
      let zoneDescendants = {};

      // Create empty entry for each zone
      zones.forEach(zone => {
        zoneDescendants[zone.ZoneId] = [];
      });

      // Iterate through zones from highest depth to lowest depth
      zones
        .sort((a, b) => b.ZoneDepth - a.ZoneDepth)
        .forEach(zone => {
          // skip main zones, as they're not descendants of any other zone
          if (this.mainZones.some(x => x.ZoneId == zone.ZoneId)) {
            return;
          }

          // add this zone as a descendant of its parent zone
          zoneDescendants[zone.ParentZoneId].push(zone.ZoneId);

          // add all descendants of this zone as descendants of its parent zone
          zoneDescendants[zone.ParentZoneId].push(
            ...zoneDescendants[zone.ZoneId]
          );
        });
      zones.sort((a, b) => a.ZoneDepth - b.ZoneDepth);
      return zoneDescendants;
    },

    // Lineups
    OpenLightbox() {
      this.$refs.lightbox.showImage(0);
    },
    SetSelectedLineup: function(lineupId) {
      this.$helpers.LogEvent(this, "LineupSelected", { label: lineupId });
      this.selectedLineupId = lineupId;
    },
    SetSelectedTarget: function(targetId) {
      this.$helpers.LogEvent(this, "TargetSelected", { label: targetId });

      this.ResetSelection();
      this.selectedTargetId = targetId;
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
      return this.mainZones.find(x => x.IsCt == this.showCt).ZoneId;
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
      ) {
        return [];
      }

      // ZoneView
      if (this.viewType == Enums.RadarViewTypes.Zone) {
        // If a zone is selected, return itself, and all its direct subzones that contain samples
        if (this.selectedZone != null) {
          return this.zones.filter(
            x =>
              this.selectedZone.ZoneId == x.ZoneId ||
              (x.ParentZoneId == this.selectedZone.ZoneId &&
                this.activeUserData.ZonePerformances[x.ZoneId].SampleCount != 0)
          );
          // If not, return all subzones of the main zone
        } else {
          return this.zones.filter(
            x => x.IsCt == this.showCt && x.ZoneDepth == 1
          );
        }
      }
    },
    // Lineups
    visibleTargets() {
      if (this.viewType != Enums.RadarViewTypes.Lineup) {
        return [];
      }

      // If a zone is selected, return it
      if (this.selectedTarget != null) return [this.selectedTarget];
      // If a lineup is selected, return its target zone
      if (this.selectedLineup != null)
        return [
          this.targets.find(x => x.TargetId == this.selectedLineup.TargetId)
        ];
      // If none are selected, return all target zones
      return this.targets;
    },
    userSelectedLineupPerformance() {
      if (this.selectedLineup == null) return null;
      if (
        this.activeUserData.LineupPerformances.hasOwnProperty(
          this.selectedLineup.LineupId
        )
      ) {
        return this.activeUserData.LineupPerformances[
          this.selectedLineup.LineupId
        ];
      } else {
        // return empty performance if performance is not available
        return {
          LineupId: this.selectedLineup.LineupId,
          Attempts: 0,
          Misses: 0,
          Insides: 0
        };
      }
    },
    selectedLineup() {
      if (this.selectedLineupId == null) {
        return null;
      }
      return this.lineups.find(x => x.LineupId == this.selectedLineupId);
    },
    selectedTarget() {
      if (this.selectedTargetId == null) {
        return null;
      }
      return this.targets.find(x => x.Id == this.selectedTargetId);
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
      if (this.selectedLineup == null) {
        return [];
      }

      let images = this.$assetLoader.getLineupInstructionImages(
        this.config.sampleType,
        this.activeMap,
        this.selectedLineup.LineupId
      );
      return images;
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

      .team-toggle {
        margin-left: auto;
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

    .watch-button {
      margin-top: auto;
      justify-self: flex-end;
      display: flex;
      justify-content: space-between;
      align-items: center;

      font-weight: 600;
      font-size: 1em;

      cursor: pointer;

      .watch-match-icon {
        color: $orange;
        font-size: 26px;
        transition: all 300ms $anim-button;
        cursor: pointer;
      }

      &:hover .watch-match-icon {
        color: white;
      }
    }
  }
}

@media (max-width: 800px) {
  .view-radarimage-feature {
    margin-top: 0;
  }

  .no-data {
    margin-top: 20px;
  }

  .interactive-area {
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    margin: 0;
    flex-wrap: wrap;

    .l {
      width: calc(100% - 20px);
      margin: 10px;

      .tool-menu {
        display: flex;
        flex-direction: row;
        align-items: center; 

        > button {
          margin-right: 5px;
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
      width: calc(100% - 20px);
      margin: 0 10px;

      .sidebar {
        color: white;
      }
    }
  }
}
</style>