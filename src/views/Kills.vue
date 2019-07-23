<template>
  <div class="view view-kills">
    <div class="fixed-width-container">
      <div class="performances">
        <div
          v-for="(mapSummary,index) in mapSummaries"
          :key="index"
          class="performance"
          :class="{active: activeMap == mapSummary.Map}"
          @click="OnActiveMapUpdated(mapSummary.Map)"
        >
          <img
            class="map-image"
            :src="'https://test.mentor.gg/Content/Images/Overview/' + mapSummary.Map +'.jpg'"
          />
          <p class="map-name">{{mapSummary.Map}}</p>

          <div class="z-layer-lo">
            <!-- TODO: Style -->
            <span class="split-title">MatchWin Rate</span>
            <div class="split">
              <span style="color:white;">{{(mapSummary.MatchWinFraction * 100).toFixed(0) }}%</span>
            </div>
          </div>

          <div class="z-layer-hi">
            <span class="split-title">ROUNDWIN RATE</span>
            <div class="split">
              <div class="ct">
                <img src="@/assets/ct_logo.png" />
                <span>{{(mapSummary.RoundWinFractionAsCt * 100).toFixed(0) }}%</span>
              </div>
              <div class="t">
                <img src="@/assets/t_logo.png" />
                <span>{{(mapSummary.RoundWinFractionAsTerrorist * 100).toFixed(0) }}%</span>
              </div>
            </div>

            <span class="split-title">KD RATIO</span>
            <div class="split">
              <div class="ct">
                <img src="@/assets/ct_logo.png" />
                <span>{{(mapSummary.KDAsCt).toFixed(2) }}</span>
              </div>
              <div class="t">
                <img src="@/assets/t_logo.png" />
                <span>{{(mapSummary.KDAsTerrorist).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="interactive-area">
        <div class="l bordered-box">
          <div class="tool-menu">
            <button class="button-variant-bordered" @click="OnShowTrajectories">Toggle Trajectories</button>

            <div v-if="zonesEnabled">
              <button class="button-variant-bordered" @click="SetDetailView()">Toggle Zones</button>
            </div>

            <div id="plantfilter">
              <button
                v-if="activeFilterSettings.PlantStatus == 0"
                class="button-variant-bordered"
                @click="SetPlantStatus(1)"
              >No Filter</button>
              <button
                v-else-if="activeFilterSettings.PlantStatus == 1"
                class="button-variant-bordered"
                @click="SetPlantStatus(2)"
              >Pre-Plant</button>
              <button
                v-else-if="activeFilterSettings.PlantStatus == 2"
                class="button-variant-bordered"
                @click="SetPlantStatus(0)"
              >Post-Plant</button>
            </div>

            <div class="team-select">
              <img
                class="t"
                src="@/assets/t_logo.png"
                :class="{active: !showCt}"
                @click="showCt = false"
              />
              <img
                class="ct"
                src="@/assets/ct_logo.png"
                :class="{active: showCt}"
                @click="showCt = true"
              />
            </div>
            <CustomSelect
              class="match-count-select"
              v-model="matchCount"
              :options="matchCountSelectOptions"
              v-on:input="OnMatchCountUpdated"
            ></CustomSelect>
          </div>
          <div>
            <RadarImage
              :mapInfo="mapInfo"
              :showTrajectories="showTrajectories"
              :showCt="showCt"
              :SetSelectedSample="SetSelectedSample"
              :selectedSample="selectedSample"
              :selectedZone="selectedZone"
              :SetSelectedZone="SetSelectedZone"
              :OnClickBackground="OnClickBackground"
              :detailView="detailView"
              :zoneType="'Kill'"
              :zones="visibleZones"
              :userPerformanceData="activeUserData"
              :kills="visibleSamples"
            />
          </div>
        </div>
        <div class="r bordered-box">
          <div class="sidebar">
            <div class="legend-tab">
              <div class="details-legend-section">
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="50" width="50">
                      <Kill 
                        :killData="{
                          'Id':'Kill-1-1',
                          'MatchId':1,
                          'KillId':1,
                          'Round':1,
                          'UserIsCt':showCt,
                          'PlayerPosX':5,
                          'PlayerPosY':22,
                          'VictimPosX':33,
                          'VictimPosY':27,
                          'UserWinner':true,
                          'PlayerZoneByTeam':0,
                          'VictimZoneByTeam':0,
                          'FilterSettings':{'PlantStatus':0}}"
                        :zoomFactor="1"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="false" 
                      />
                    </svg>
                  </div>
                  <div class="legend-description">
                    <!-- Green markers represent your kills. -->
                    Green markers represent your position when you killed an enemy. 
                    <!-- The enemy's position is at the other end of the line.  -->
                  </div>
                </div>
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="50" width="50">
                      <Kill 
                        :killData="{
                          'Id':'Kill-1-1',
                          'MatchId':1,
                          'KillId':1,
                          'Round':1,
                          'UserIsCt':showCt,
                          'PlayerPosX':5,
                          'PlayerPosY':22,
                          'VictimPosX':33,
                          'VictimPosY':27,
                          'UserWinner':false,
                          'PlayerZoneByTeam':0,
                          'VictimZoneByTeam':0,
                          'FilterSettings':{'PlantStatus':0}}"
                        :zoomFactor="1"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="false" 
                      />
                    </svg>
                  </div>                
                  <div class="legend-description">
                    Red markers represent your deaths.
                  </div>
                </div>
              </div>
              <div class="zone-legend-section">
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="50" width="50">
                      <Zone 
                        :SetSelectedZone="function(){}"
                        :fillColor="'rgba(255, 255, 255, 0.15)'"
                        :isSelected="false" 
                        :zoneData="{
                          'ZoneId':1,
                          'Name':'Legend_Zone',
                          'CenterXPixel':15,
                          'CenterYPixel':15,
                          'PolygonPointsX':[10,50,50,30,30,10,10],
                          'PolygonPointsY':[10,10,50,50,30,30,10],
                          'ParentZoneId':230000,
                          'Depth':1,
                          }"
                      />
                    </svg>
                  </div>
                  <div class="legend-description">
                    A zone's color corresponds to your K/D ratio inside it. 
                  </div>
                </div>
              </div>
            </div>
            <div id="analysis-tab" class="sidebar-tabcontent">
              <div v-if="selectedSample" class="selected-sample-stats"> 
                About this {{selectedSample.UserWinner ? "Kill" : "Death"}} of yours:
                <div class="stat-row">
                  <div class="stat-description">
                    Round
                  </div>
                  <div class="stat-content">
                    {{selectedSample.Round}}
                  </div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">
                    Hier könnte man theoretisch noch sowas hin wie: 
                  </div>
                  <div class="stat-content">
                    "Tell us if you want additional information about this 
                    {{selectedSample.UserWinner ? "Kill" : "Death"}}!"
                  </div>
                </div>
              </div>

              <div v-if="selectedZone" class="selected-sample-stats"> 
                About your Kills and Deaths in the {{selectedZone.Name}}-Zone as a {{this.showCt ? "CT" : "Terrorist"}} 
                {{ this.activeFilterSettings.PlantStatus == 0 ? "" : " that happened " 
                + (this.activeFilterSettings.PlantStatus == 1 ? "before" : "after") + " the bomb was planted"}}:
                <div class="stat-row">
                  <div class="stat-description">
                    K/D ratio
                  </div>
                  <div class="stat-content">
                    {{(userSelectedZonePerformance.Kills / Math.max(1, userSelectedZonePerformance.Deaths)).toFixed(2)}} 
                    ({{userSelectedZonePerformance.Kills}} Kills / {{userSelectedZonePerformance.Deaths}} Deaths)
                  </div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">
                    Damage per Death::
                  </div>
                  <div class="stat-content">
                    {{(userSelectedZonePerformance.Damage / Math.max(1, userSelectedZonePerformance.Deaths)).toFixed(0)}}                     
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomSelect from "@/components/CustomSelect.vue";
import Kill from "@/components/GrenadesAndKills/RadarImage/Kill.vue";
import RadarImage from "@/components/GrenadesAndKills/RadarImage/RadarImage.vue";
import Zone from "@/components/GrenadesAndKills/RadarImage/Zone.vue";

export default {
  components: {
    CustomSelect,
    Kill,
    RadarImage,
    Zone,
  },
  data() {
    return {
      activeMap: "de_mirage",
      showCt: true,
      matchCount: 10,
      matchCountSelectOptions: {
        5: "Use last 5 matches",
        10: "Use last 10 matches",
        50: "Use last 50 matches",
        100: "Use last 100 matches"
      },
      showTrajectories: false,
      mapSummaries: [],
      detailView: true,

      zonesEnabled: false,
      zones: [],
      userPerformanceData: [],
      globalPerformanceData: [],

      mapInfo: {},
      samples: [],

      selectedSample: null,
      selectedZone: null,

      activeFilterSettings: {}
    };
  },
  mounted() {
    this.LoadKillsOverviews(10000); // matchCount is currently ignored for overviews by api except for kills
    this.LoadKills(this.activeMap, 10);
  },
  methods: {
    LoadKillsOverviews(matchCount) {
      this.$api.getKillsOverview(matchCount).then(response => {
        this.mapSummaries = response.data.MapSummaries;
      });
    },
    LoadKills(map, matchCount) {
      this.$api.getKills(map, matchCount).then(response => {
        this.mapInfo = response.data.MapInfo;
        this.samples = response.data.Samples;
        this.zones = response.data.Zones.filter(x => x.ParentZoneId != -1);
        this.userPerformanceData = response.data.UserData; // Filtered (if applicable)
        this.activeFilterSettings = JSON.parse(
          JSON.stringify(response.data.UserData[0].FilterSettings)
        ); // Make a deepcopy of the first (default) filtersettings
        this.globalPerformanceData = response.data.GlobalData;
        if (this.zones.length == 0) {
          this.zonesEnabled = false;
          this.detailView = true;
        } else {
          this.zonesEnabled = true;
        }
      });
    },
    OnShowTrajectories: function() {
      this.showTrajectories = !this.showTrajectories;
    },
    OnMatchCountUpdated: function() {
      this.LoadKills(this.activeMap, this.matchCount);
    },
    OnClickBackground: function() {
      this.selectedSample = null;
      this.selectedZone = null;
    },
    OnActiveMapUpdated: function(map) {
      if (this.activeMap != map) {
        this.LoadKills(map, this.matchCount);
        this.activeMap = map;
      }
    },
    SetSelectedSample: function(id) {
      this.selectedSample = this.samples.find(x => x.Id == id);
    },
    SetSelectedZone: function(zoneId) {
      this.selectedZone = this.zones.find(x => x.ZoneId == zoneId);
    },
    SetDetailView() {
      this.selectedSample = null;
      this.selectedZone = null;
      this.detailView = !this.detailView;
    },
    SetPlantStatus(status) {
      this.activeFilterSettings.PlantStatus = status;
    }
    // Deactivated because userPerformances for different combinations of filtersettings don't need to be computed in JS;
    // All userPerformances for every FilterCombination are provided by api
    // // Takes an array of userDatas and returns the ones that match this.activeFilterSettings
    // FilterUserDatas(userDatas){
    //   let filteredUserDatas = userDatas;

    //   // Only retain performances matching activePlantFilter
    //   filteredUserDatas = filteredUserDatas.filter(x=>this.activeFilterSettings.PlantStatus == 0 || x.FilterSettings.PlantStatus == this.activeFilterSettings.PlantStatus);

    //   return filteredUserDatas;
    // },
    // SumUserDatas(applicableUserDatas){
    //     //// Compute sum of all applicable performances by initializing results as a copy of the
    //     //// first applicable performance and add values of all other applicable performances on top
    //     for (let i = 0; i < applicableUserDatas.length; i++) {
    //         if (i == 0) {
    //             // stringify and parse to obtain deepcopy
    //             var accumulatedUserData = JSON.parse(JSON.stringify(applicableUserDatas[0].ZonePerformances));
    //         }
    //         else {
    //           // Sum over all positions
    //           for (let positionId in accumulatedUserData) {
    //               let applicablePositionPerformance = applicableUserDatas[i].ZonePerformances[positionId];
    //               let filteredPositionPerformance = accumulatedUserData[positionId];

    //               filteredPositionPerformance.Kills += applicablePositionPerformance.Kills;
    //               filteredPositionPerformance.Deaths += applicablePositionPerformance.Deaths;
    //               filteredPositionPerformance.Damage += applicablePositionPerformance.Damage;
    //           }
    //         }
    //     }
    //     return accumulatedUserData;
    // }
  },
  computed: {
    activeUserData() {
      // Return userData with matching killfiltersettings. Stringifying to compare by value
      return this.userPerformanceData.find(
        x =>
          JSON.stringify(x.FilterSettings) ==
          JSON.stringify(this.activeFilterSettings)
      );
    },
    activeGlobalData() {
      // Return userData with matching killfiltersettings. Stringifying to compare by value
      return this.globalPerformanceData.find(
        x =>
          JSON.stringify(x.FilterSettings) ==
          JSON.stringify(this.activeFilterSettings)
      );
    },

    userSelectedZonePerformance() {
      if (this.selectedZone == null) return null;
      return this.activeUserData.ZonePerformances[this.selectedZone.ZoneId];
    },
    userTotalRounds() {
      return this.showCt
        ? this.activeUserData.TotalCtRounds
        : this.activeUserData.TotalTerroristRounds;
    },
    globalSelectedZonePerformance() {
      if (this.selectedZone == null) return null;
      return this.activeGlobalData.ZonePerformances[this.selectedZone.ZoneId];
    },
    globalTotalRounds() {
      return this.showCt
        ? this.activeGlobalData.TotalCtRounds
        : this.activeGlobalData.TotalTerroristRounds;
    },
    visibleSamples() {
      if (!this.detailView) return [];
      if (!this.samples) return [];

      if (this.selectedSample != null) return [this.selectedSample];

      let filteredKills = this.samples;
      // filter by team
      filteredKills = filteredKills.filter(x => x.UserIsCt == this.showCt);

      // apply other filters by PlantStatus
      // Check whether one or more filters are active
      let filtersActive = this.activeFilterSettings.PlantStatus != 0;
      if (filtersActive) {
        filteredKills = filteredKills.filter(
          x =>
            JSON.stringify(x.FilterSettings) ==
            JSON.stringify(this.activeFilterSettings)
        );
      }

      return filteredKills;
    },    
    visibleZones() {
      if (this.detailView) return [];

      if (this.selectedZone != null) {
        return this.zones.filter(
          x => x.ParentZoneId == this.selectedZone.ZoneId || this.selectedZone.ZoneId == x.ZoneId
        );
      } else {
        return this.zones.filter(
          x => x.IsCtZone == this.showCt && x.Depth == 1
        );
      }
    },
  }
};
</script>

<style lang="scss">
.view-kills {
  margin-top: 40px;
}

.performances {
  display: flex;
  flex-direction: row;

  .performance {
    width: calc(100% / 7);
    margin-right: 20px;
    background-position: center;
    background-size: cover;
    position: relative;
    z-index: 1;
    overflow: hidden;
    border: 1px solid $purple;
    border-radius: 4px;
    cursor: pointer;

    &.active,
    &:hover {
      &:after {
        background: rgba(0, 0, 0, 0.3);
      }

      .map-image {
        filter: blur(2px) grayscale(0%);
      }
    }

    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.7);
      pointer-events: none;
      z-index: -1;
      transition: 0.35s;
    }

    .map-image {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -2;
      object-fit: cover;
      object-position: center;
      transition: 0.35s;
      filter: blur(2px) grayscale(100%);
    }

    .map-name {
      color: white;
      font-weight: 700;
      font-size: 1.125rem;
      margin: 5px 0;
      padding: 10px;
    }

    .split-title {
      color: $gray;
      font-size: 8px;
      margin-bottom: 1em;
      display: block;
      font-weight: 600;
    }

    .z-layer-lo {
      padding: 0 10px;
      padding-bottom: 20px;
    }

    .z-layer-hi {
      background: $dark-1;
      padding: 20px 10px;
      opacity: 0.8;
      position: relative;

      .split {
        &:first-of-type {
          border-bottom: 1px solid $purple;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
      }
    }

    .split {
      display: flex;
      justify-content: space-between;
      font-size: 12px;

      .ct,
      .t {
        display: flex;
        align-items: center;

        span {
          margin-left: 5px;
          color: white;
        }

        img {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
}

.interactive-area {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .l {
    width: 65%;
    // display: flex;
    align-items: center;
    justify-content: space-between;

    .tool-menu {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .team-select {
      display: flex;
      margin: 0 20px;

      img {
        margin: 0 5px;
      }

      .t {
        transition: 0.35s;
        cursor: pointer;

        &.active,
        &:hover {
          filter: drop-shadow(0px 0px 4px rgb(168, 153, 102));
        }
      }

      .ct {
        transition: 0.35s;
        cursor: pointer;

        &.active,
        &:hover {
          filter: drop-shadow(0px 0px 4px rgb(61, 120, 204));
        }
      }
    }

    .match-count-select {
      width: 100%;
      max-width: 400px;
    }
  }

  .r {
    width: 30%;
  }
  
  .sidebar{
    color: white;
  }
}
</style>