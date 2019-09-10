<template>
  <div class="view view-kills">
    <div class="fixed-width-container">      
      <div v-if="mapSummaries == null" class="bordered-box no-data">
        <AjaxLoader>Computing summaries for each map</AjaxLoader>
      </div>
      <div v-if="mapSummaries != null" class="performances">
        <div
          v-for="(mapSummary,index) in mapSummaries"
          :key="index"
          class="performance"
          :class="{active: activeMap == mapSummary.Map}"
          @click="OnActiveMapUpdated(mapSummary.Map)"
        >
          <img
            class="map-image"
            :src="$api.resolveResource('~/Content/Images/Overview/' + mapSummary.Map +'.jpg')"
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
      <div v-if="!samples.length && !loadingSamplesComplete" class="bordered-box no-data">
        <AjaxLoader>Loading Kills</AjaxLoader>
      </div>
      <div v-if="!samples.length && loadingSamplesComplete" class="bordered-box no-data">
        <DemoDataLoadRequest 
        @buttonClicked="LoadSamples(activeMap, matchCount, true)">
          Either you don't have any matches on this map, or you are afk the entire round without killing or dying at all.
          <br>Wanna load someone else's kills?
          </DemoDataLoadRequest>
      </div>   
      <div v-if="samples.length" class="interactive-area">
        <div class="l bordered-box">
          <div class="tool-menu">
            <button class="button-variant-bordered" :class="{active: showTrajectories}" @click="OnShowTrajectories">Trajectories</button>

            <button class="button-variant-bordered" @click="ToggleDetailView()" :disabled="!zonesEnabled">Toggle Zones</button>

            <div id="plantfilter">
              <button
                v-if="activeFilterSettings.PlantStatus == 0"
                class="button-variant-bordered"
                @click="SetPlantStatus(1)"
              >No Filter</button>
              <button
                v-else-if="activeFilterSettings.PlantStatus == 1"
                class="button-variant-bordered active"
                @click="SetPlantStatus(2)"
              >Pre-Plant</button>
              <button
                v-else-if="activeFilterSettings.PlantStatus == 2"
                class="button-variant-bordered active"
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
              v-if="samples.length"
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
                    <div class="legend-circle green"></div>
                    <!-- <svg height="50" width="50">
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
                          'PlayerZoneId':0,
                          'VictimZoneId':0,
                          'FilterSettings':{'PlantStatus':0}}"
                        :scaleFactor="1"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="false"
                      />
                    </svg>-->
                  </div>
                  <div class="legend-description">
                    <!-- Green markers represent your kills. -->
                    Your position when you killed an enemy.
                    <!-- The enemy's position is at the other end of the line.  -->
                  </div>
                </div>
                <div class="legend-row">
                  <div class="legend-depiction">
                    <div class="legend-circle red"></div>
                    <!-- <svg height="50" width="50">
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
                          'PlayerZoneId':0,
                          'VictimZoneId':0,
                          'FilterSettings':{'PlantStatus':0}}"
                        :scaleFactor="1"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="false"
                      />
                    </svg>-->
                  </div>
                  <div class="legend-description">Your position when you died.</div>
                </div>
              </div>
              <div class="zone-legend-section">
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="40" width="40">
                      <Zone
                        :SetSelectedZone="function(){}"
                        :fillColor="'rgba(255, 255, 255, 0.15)'"
                        :isSelected="false"
                        :zoneData="{
                          'ZoneId':1,
                          'Name':'Legend_Zone',
                          'CenterXPixel':20,
                          'CenterYPixel':20,
                          'PolygonPointsX':[0,40,40,20,20,0,0],
                          'PolygonPointsY':[0,0,40,40,20,20,0],
                          'ParentZoneId':230000,
                          'Depth':1,
                          }"
                      />
                    </svg>
                  </div>
                  <div
                    class="legend-description"
                  >A zone's color corresponds to your K/D ratio inside it.</div>
                </div>
              </div>
            </div>
            <div v-if="selectedSample || selectedZone" id="analysis-tab" class="sidebar-tabcontent">
              <div v-if="selectedSample" class="selected-sample-stats">
                About this {{selectedSample.UserWinner ? "Kill" : "Death"}} of yours:
                <div class="stat-row">
                  <div class="stat-description">Round</div>
                  <div class="stat-content">{{selectedSample.Round}}</div>
                </div>
                <div class="split">
                  <div class="left">
                    <p>Watch this round</p>
                  </div>
                  <div class="right">
                    <i class="material-icons watch-match-icon" title="Watch in Browser" @click="Watch(selectedSample.MatchId, selectedSample.Round)">videocam</i>
                  </div>    
                </div>
           

                <!-- <div class="stat-row">
                  <div class="stat-description">Hier könnte man theoretisch noch sowas hin wie:</div>
                  <div class="stat-content">
                    "Tell us if you want additional information about this
                    {{selectedSample.UserWinner ? "Kill" : "Death"}}!"
                  </div>
                </div> -->
              </div>

              <div v-if="selectedZone" class="selected-zone-stats">
                About your Kills and Deaths in the {{selectedZone.Name}}-Zone as a {{this.showCt ? "CT" : "Terrorist"}}
                {{ this.activeFilterSettings.PlantStatus == 0 ? "" : " that happened "
                + (this.activeFilterSettings.PlantStatus == 1 ? "before" : "after") + " the bomb was planted"}}:
                <div class="stat-row">
                  <div class="stat-description">K/D ratio</div>
                  <div class="stat-content">
                    {{(userSelectedZonePerformance.Kills / Math.max(1, userSelectedZonePerformance.Deaths)).toFixed(2)}}
                  </div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Kills</div>
                  <div class="stat-content">
                    {{userSelectedZonePerformance.Kills}}
                  </div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Deaths</div>
                  <div class="stat-content">
                    {{userSelectedZonePerformance.Deaths}}
                  </div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Damage per Death</div>
                  <div
                    class="stat-content"
                  >{{(userSelectedZonePerformance.Damage / Math.max(1, userSelectedZonePerformance.Deaths)).toFixed(0)}}</div>
                </div>
              </div>
            </div>
            <div class="practice-tab">
              <div v-show="!selectedZone">
                Select a Zone to get advice on how to improve in that position!
              </div>
              <div v-if="selectedZone">
                <div v-if="selectedZone.VideoUrl != ''"> 
                  <p>Advice for this position: </p> 
                  <VideoOverlay v-if="selectedZone && selectedZone.VideoUrl != ''"
                  :url="selectedZone.VideoUrl"
                  
                  useThumbnail 
                  style="width: 100%; height: 100%;">
                  </VideoOverlay>                 
                </div>
                <div v-else>
                  Advice for this Zone is not yet available. 
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
import VideoOverlay from "@/components/VideoOverlay.vue";
import Zone from "@/components/GrenadesAndKills/RadarImage/Zone.vue";

export default {
  components: {
    CustomSelect,
    Kill,
    RadarImage,
    VideoOverlay,
    Zone,
  },
  data() {
    return {
      loadingSamplesComplete: false,
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
      mapSummaries: null,
      detailView: true,

      zonesEnabled: false,
      zones: [],
      zoneDescendants: [],
      userPerformanceData: [],
      globalPerformanceData: [],

      mapInfo: {},
      samples: [],

      selectedSample: null,
      selectedZoneId: 0,

      activeFilterSettings: {}
    };
  },
  mounted() {
    this.LoadOverviews(10000); // matchCount is currently ignored for overviews by api except for kills
    // boolean in query param might be received as string
    if('showCt' in this.$route.query){
      this.showCt = this.$route.query.showCt == true ||  this.$route.query.showCt == "true";
    }
    if(this.$route.query.map){
      this.activeMap = this.$route.query.map;
    }
    if(this.$route.query.matchCount){
      this.matchCount = this.$route.query.matchCount;
      this.matchCountSelectOptions[this.$route.query.matchCount] = "Use last " + this.$route.query.matchCount + " matches"
    }
    this.LoadSamples(this.activeMap, this.matchCount, false);

    if(this.$route.query.zoneId){
      this.detailView = false;
      this.selectedZoneId = this.$route.query.zoneId;        
    }
  },
  methods: {
    LoadOverviews(matchCount) {
      this.mapSummaries = null;
      this.$api.getKillsOverview(matchCount).then(response => {
        this.mapSummaries = response.data.MapSummaries;
      });
    },
    LoadSamples(map, matchCount, isDemo) {
      this.samples = [];
      this.loadingSamplesComplete = false;
      this.$api.getKills(isDemo ? "76561198033880857" : "", map, matchCount)
      .then(response => {
        this.mapInfo = response.data.MapInfo;
        this.samples = response.data.Samples;
        this.userPerformanceData = response.data.UserData;
        this.activeFilterSettings = {PlantStatus : 0};
        this.globalPerformanceData = response.data.GlobalData;
        // Ignore zones where there are no samples for less clutter
        this.zones = response.data.Zones
        .filter(x => x.ParentZoneId != -1 && (this.activeUserData.ZonePerformances[x.ZoneId].Deaths != 0 || this.activeUserData.ZonePerformances[x.ZoneId].Kills != 0))
        .sort((a,b) => a.Depth - b.Depth);
        if (this.zones.length == 0) {
          this.zonesEnabled = false;
        } else {
          this.zonesEnabled = true;
        }
        this.zoneDescendants = response.data.ZoneDescendants;
        this.loadingSamplesComplete = true;
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        this.loadingSamplesComplete = true;
      });
    },
    OnShowTrajectories: function() {
      this.showTrajectories = !this.showTrajectories;
    },
    OnMatchCountUpdated: function() {
      this.LoadSamples(this.activeMap, this.matchCount, false);
    },
    OnClickBackground: function() {
      this.selectedSample = null;
      this.selectedZoneId = 0;
    },
    OnActiveMapUpdated: function(map) {
      if (this.activeMap != map) {
        this.LoadSamples(map, this.matchCount, false);
        this.activeMap = map;
      }
      this.selectedSample = null;
      this.selectedZoneId = 0;
    },
    SetSelectedSample: function(id) {
      this.selectedSample = this.samples.find(x => x.Id == id);
    },
    SetSelectedZone: function(zoneId) {
      this.selectedSample = null;
      this.selectedZoneId = zoneId;
    },
    ToggleDetailView() {
      this.selectedSample = null;
      this.selectedZoneId = 0;
      this.detailView = !this.detailView;
    },
    SetPlantStatus(status) {
      this.activeFilterSettings.PlantStatus = status;
    },
    Watch: function(matchId, round) {
      let demoviewer = this.$root.$children[0].$refs.demoviewer;
      demoviewer.Watch("", matchId, round);
    },
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
    selectedZone() {
      if(this.selectedZoneId == 0){
        return null;
      }
      return this.zones.find(x => x.ZoneId == this.selectedZoneId);
    },
    visibleSamples() {
      if (!this.samples) return [];

      if (this.selectedSample != null) return [this.selectedSample];

      let filteredKills = this.samples;
      // filter by zone (includes filtering by team)
      if(this.selectedZoneId){
        let debug = filteredKills[0];
        filteredKills = filteredKills.filter(x => 
        this.zoneDescendants[this.selectedZoneId].includes(x.UserWinner ? x.PlayerZoneId : x.VictimZoneId) 
        || (x.UserWinner ? x.PlayerZoneId : x.VictimZoneId) == this.selectedZoneId)
      }
      else{
        filteredKills = filteredKills.filter(x => x.UserIsCt == this.showCt);
      }

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
        return this.zones.filter(x => 
          x.ParentZoneId == this.selectedZone.ZoneId ||
            this.selectedZone.ZoneId == x.ZoneId);
      } else {
        return this.zones.filter(
          x => x.IsCtZone == this.showCt && x.Depth == 1
        );
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebar.scss";

.view-kills {
  margin-top: 40px;
}

.performances {
  display: flex;
  flex-direction: row;
  margin: 0 -10px;

  .performance {
    width: calc(100% / 7);
    margin: 0 10px;
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

      #plantfilter {
        button {
          width: 128px;
        }
      }

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

      :not(.active){
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
      
    .sidebar{
      color: white;

      .split {
        display: flex;

        .left {
          display: flex;
          width: 80%;
        }

        .right {
          display: flex;
          align-items: center;

          .watch-match-icon {
            color: $orange;
            margin-right: 20px;
            font-size: 26px;
            transition: .35s;
            cursor: pointer;

            &:hover {
              color: $purple;
            }
          }
        }
      }
    }  
  }
}
</style>