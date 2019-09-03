<template>
  <div class="view view-flashes">
    <div class="fixed-width-container">
      <TeamSelection :teamInfos="eventData ? eventData.TeamInfos : null" :SetSelectedTeam="SetSelectedTeam"></TeamSelection>

      <div v-if="false" class="bordered-box no-data">
        <AjaxLoader>Loading tournament data</AjaxLoader>
      </div>
      <div v-if="eventData != null" class="performances">
        <div
          v-for="(map,index) in eventData.Event.MapPool"
          :key="index"
          class="performance"
          :class="{active: activeMap == map}"
          @click="OnActiveMapUpdated(map)"
        >
          <img
            class="map-image"
            :src="$api.resolveResource('~/Content/Images/Overview/' + map +'.jpg')"
          />
          <p class="map-name">{{map}}</p>

          <!-- <div class="z-layer-lo">
            <span class="split-title">UNUSED</span>
            <div class="split">
              <div class="ct">
                <img src="@/assets/ct_logo.png" />
                <span>{{(Math.max(0,1-mapSummary.UsageRatioAsCt)* 100).toFixed(0) }}%</span>
              </div>
              <div class="t">
                <img src="@/assets/t_logo.png" />
                <span>{{(Math.max(0,1-mapSummary.UsageRatioAsTerrorist)* 100).toFixed(0) }}%</span>
              </div>
            </div>
          </div>

          <div class="z-layer-hi">
            <span class="split-title">ASSISTS</span>
            <div class="split">
              <div class="ct">
                <img src="@/assets/ct_logo.png" />
                <span>{{(mapSummary.KillAssistChanceAsCt* 100).toFixed(0) }}%</span>
              </div>
              <div class="t">
                <img src="@/assets/t_logo.png" />
                <span>{{(mapSummary.KillAssistChanceAsTerrorist* 100).toFixed(0) }}%</span>
              </div>
            </div>

            <span class="split-title">BLINDED</span>
            <div class="split">
              <div class="ct">
                <img src="@/assets/ct_logo.png" />
                <span>{{mapSummary.AverageEnemiesFlashedAsCt.toFixed(2)}}</span>
              </div>
              <div class="t">
                <img src="@/assets/t_logo.png" />
                <span>{{mapSummary.AverageEnemiesFlashedAsTerrorist.toFixed(2)}}</span>
              </div>
            </div>
          </div> -->
        </div>
      </div>

      <div v-if="!samples.length && !loadingSamplesComplete" class="bordered-box no-data">
        <AjaxLoader>Loading Flashes</AjaxLoader>
      </div>
      <div v-if="!samples.length && loadingSamplesComplete" class="bordered-box no-data">
        <NoDataAvailableDisplay @buttonClicked="LoadSamples(activeMap, matchCount, true)">
          Either you don't have any matches on this map, or you just don't use any flashbangs at all.
          <br />Wanna load someone else's?
        </NoDataAvailableDisplay>
      </div>
      <div v-if="samples.length" class="interactive-area">
        <div class="l bordered-box">
          <div class="tool-menu">
            <button
              class="button-variant-bordered"
              :class="{active: showTrajectories}"
              @click="OnShowTrajectories"
            >Trajectories</button>

            <button
              class="button-variant-bordered"
              @click="ToggleDetailView()"
              :disabled="!zonesEnabled"
            >Toggle Zones</button>

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
            <div class="matchcount-display">
              <!-- {{matchInfos.length}} -->
              {{matchInfos? matchInfos.length : "?"}} match(es) of {{selectedTeam}} on {{activeMap}} 
            </div>
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
              :zoneType="'Flash'"
              :zones="visibleZones"
              :userPerformanceData="userPerformanceData"
              :flashGrenades="visibleSamples"
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
                      <Flash
                        :grenadeData="{
                          'Id':'Flash-1-1',
                          'MatchId':1,
                          'PlayerId':1,
                          'GrenadeId':1,
                          'Round':1,
                          'UserIsCt':showCt,
                          'ZoneId':0,
                          'ReleaseX':5,
                          'ReleaseY':22,
                          'DetonationX':33,
                          'DetonationY':27,
                          'Trajectory':[{'Time':0,'X':5,'Y':22,'Z':0},{'Time':1,'X':33,'Y':27,'Z':0}],
                          'Flasheds':[]
                        }"
                        :scaleFactor="2"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="false"
                      />
                    </svg>
                  </div>
                  <div
                    class="legend-description"
                  >Grey markers represent Flashes that did not blind enemies.</div>
                </div>
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="50" width="50">
                      <Flash
                        :grenadeData="{
                          'Id':'Flash-1-1',
                          'MatchId':1,
                          'PlayerId':1,
                          'GrenadeId':1,
                          'Round':1,
                          'UserIsCt':showCt,
                          'ZoneId':0,
                          'ReleaseX':5,
                          'ReleaseY':22,
                          'DetonationX':33,
                          'DetonationY':27,
                          'Trajectory':[{'Time':0,'X':5,'Y':22,'Z':0},{'Time':1,'X':33,'Y':27,'Z':0}],
                          'Flasheds':[{'VictimPosX':42,'VictimPosY':12,'TimeFlashed':1000,'FlashAssist':false,'TeamAttack':false,'VictimIsAttacker':false}]
                        }"
                        :scaleFactor="2"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="false"
                      />
                    </svg>
                  </div>
                  <div
                    class="legend-description"
                  >White markers indicate blinded enemies. Radius corresponds to duration.</div>
                </div>
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="50" width="50">
                      <Flash
                        :grenadeData="{
                          'Id':'Flash-1-1',
                          'MatchId':1,
                          'PlayerId':1,
                          'GrenadeId':1,
                          'Round':1,
                          'UserIsCt':showCt,
                          'ZoneId':0,
                          'ReleaseX':5,
                          'ReleaseY':22,
                          'DetonationX':33,
                          'DetonationY':27,
                          'Trajectory':[{'Time':0,'X':5,'Y':22,'Z':0},{'Time':1,'X':33,'Y':27,'Z':0}],
                          'Flasheds':[{'VictimPosX':42,'VictimPosY':12,'TimeFlashed':3000,'FlashAssist':true,'TeamAttack':false,'VictimIsAttacker':false}]
                        }"
                        :scaleFactor="2"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="false"
                      />
                    </svg>
                  </div>
                  <div
                    class="legend-description"
                  >Green markers indicate enemies were killed shortly after being flashed.</div>
                </div>
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="50" width="50">
                      <Flash
                        :grenadeData="{
                          'Id':'Flash-1-1',
                          'MatchId':1,
                          'PlayerId':1,
                          'GrenadeId':1,
                          'Round':1,
                          'UserIsCt':showCt,
                          'ZoneId':0,
                          'ReleaseX':5,
                          'ReleaseY':22,
                          'DetonationX':33,
                          'DetonationY':27,
                          'Trajectory':[{'Time':0,'X':5,'Y':22,'Z':0},{'Time':1,'X':33,'Y':27,'Z':0}],
                          'Flasheds':[
                          {'VictimPosX':42,'VictimPosY':12,'TimeFlashed':1000,'FlashAssist':false,'TeamAttack':false,'VictimIsAttacker':false},
                          {'VictimPosX':39,'VictimPosY':39,'TimeFlashed':1000,'FlashAssist':true,'TeamAttack':false,'VictimIsAttacker':false},]
                        }"
                        :scaleFactor="2"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="true"
                      />
                    </svg>
                  </div>
                  <div class="legend-description">
                    Click on a Flash to see the victims' positions.
                    <!-- Green border indicates a player died shortly after being flashed. -->
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
                    A zone's color corresponds to the average blind duration of your Flashes that detonated in it.
                    <!-- A zone's color corresponds to the average duration of enemies being blinded by your Flashes that detonated in it.  -->
                  </div>
                </div>
              </div>
            </div>
            <div v-if="selectedSample || selectedZone" id="analysis-tab" class="sidebar-tabcontent">
              <div v-if="selectedSample" class="selected-sample-stats">
                About this Flash:
                <div class="stat-row">
                  <div class="stat-description">Thrown by</div>
                  <div class="stat-content">{{selectedSample.PlayerName}}</div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Against</div>
                  <div class="stat-content">{{selectedSample.EnemyTeamName}}</div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Round</div>
                  <div class="stat-content">{{selectedSample.Round}}</div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Enemies Flashed</div>
                  <div
                    class="stat-content"
                  >{{selectedSample.Flasheds.filter(x=>!x.TeamAttack).length}}</div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Total time enemies flashed:</div>
                  <div
                    class="stat-content"
                  >{{(selectedSample.Flasheds.filter(x=>!x.TeamAttack).reduce((a,b)=> a + b.TimeFlashed, 0) / 1000).toFixed(2) + "s"}}</div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Enemies died shortly after being flashed:</div>
                  <div
                    class="stat-content"
                  >{{selectedSample.Flasheds.filter(x=>!x.TeamAttack && x.FlashAssist).length}}</div>
                </div>
                <div class="split">
                  <div class="left">
                    <p>Watch this round</p>
                  </div>
                  <div class="right">
                    <i
                      class="material-icons watch-match-icon"
                      title="Watch in Browser"
                      @click="Watch(selectedSample.MatchId, selectedSample.Round)"
                    >videocam</i>
                  </div>
                </div>
              </div>

              <div v-if="selectedZone" class="selected-zone-stats">
                About your Flashes in the {{selectedZone.Name}}-Zone:
                <div class="stat-row">
                  <div class="stat-description">Flashes thrown</div>
                  <div class="stat-content">{{userSelectedZonePerformance.SampleCount}}</div>
                </div>
                <!-- Temp version: -->
                <div class="stat-row">
                  <div class="stat-description">Avg. Enemy flashed</div>
                  <div
                    class="stat-content"
                  >{{(userSelectedZonePerformance.TotalEnemyTimeFlashed / Math.max(1, userSelectedZonePerformance.SampleCount) / 1000).toFixed(2) + "s"}}</div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Avg. Team flashed</div>
                  <div
                    class="stat-content"
                  >{{(userSelectedZonePerformance.TotalTeamTimeFlashed / Math.max(1, userSelectedZonePerformance.SampleCount) / 1000).toFixed(2) + "s"}}</div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Avg. assisted Kills</div>
                  <div
                    class="stat-content"
                  >{{(userSelectedZonePerformance.EnemyFlashAssists / userSelectedZonePerformance.SampleCount).toFixed(2) }}</div>
                </div>

                <!-- Richtige version die gestyled werden muss: -->
                <!-- <div class="stat-row">
                  <div class="stat-description">
                    Das hier soll wie im Overview ein links-rechts split sein, nur für enemyattack und teamattack 
                  </div>
                  <div class="stat-content-split">
                    <div class="split-right">
                      Enemy-flash             
                    </div>
                    <div class="split-left">
                      Team-flash        
                    </div>
                  </div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">
                    Avg. time flashed
                  </div>
                  <div class="stat-content-split">
                    <div class="split-left">
                      {{(userSelectedZonePerformance.TotalEnemyTimeFlashed / Math.max(1, userSelectedZonePerformance.SampleCount) / 1000).toFixed(2) + "s"}}                     
                    </div>
                    <div class="split-right">
                      {{(userSelectedZonePerformance.TotalTeamTimeFlashed / Math.max(1, userSelectedZonePerformance.SampleCount) / 1000).toFixed(2) + "s"}}                   
                    </div>
                  </div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">
                    Avg. kill-assists
                  </div>
                  <div class="stat-content-split">
                    <div class="split-left">
                      {{(userSelectedZonePerformance.EnemyFlashAssists / userSelectedZonePerformance.SampleCount).toFixed(2) }}                    
                    </div>
                    <div class="split-right">
                      {{(userSelectedZonePerformance.TeamFlashAssists / userSelectedZonePerformance.SampleCount).toFixed(2) }}                   
                    </div>
                  </div>
                </div>-->
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
import TeamSelection from "@/components/TeamSelection.vue";
import RadarImage from "@/components/GrenadesAndKills/RadarImage/RadarImage.vue";
import Flash from "@/components/GrenadesAndKills/RadarImage/Flash.vue";
import Zone from "@/components/GrenadesAndKills/RadarImage/Zone.vue";

export default {
  components: {
    CustomSelect,
    TeamSelection,
    Flash,
    RadarImage,
    Zone
  },
  data() {
    return {
      loadingSamplesComplete: false,
      activeMap: "de_mirage",
      showCt: true,
      // matchCount: 10,
      // matchCountSelectOptions: {
      //   5: "Use last 5 matches",
      //   10: "Use last 10 matches",
      //   50: "Use last 50 matches",
      //   100: "Use last 100 matches"
      // },
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

      eventData: null,
      matchInfos: [],
      selectedTeam: "Astralis",
      // selectedEvent: "StarladderBerlin2019",
      selectedEvent: "IEMKatowice2019",
    };
  },
  mounted() {
    this.LoadEventInfo(this.selectedEvent);

    if (this.$route.query.map) {
      this.activeMap = this.$route.query.map;
    }
    if (this.$route.query.matchCount) {
      this.matchCount = this.$route.query.matchCount;
      this.matchCountSelectOptions[this.$route.query.matchCount] =
        "Use last " + this.$route.query.matchCount + " matches";
    }
    this.LoadSamples(this.selectedEvent, this.selectedTeam, this.activeMap);

  },
  methods: {
    LoadEventInfo(eventNameShort) {
      this.mapSummaries = null;
      this.$api.getEventInfo(eventNameShort).then(response => {
        this.eventData = response.data;
      });
    },
    LoadSamples(eventName, teamName, map) {
      this.samples = [];
      this.loadingSamplesComplete = false;
      this.$api
        .getEventFlashes(eventName, teamName, map)
        .then(response => {
          this.mapInfo = response.data.MapInfo;
          this.samples = response.data.Samples;
          this.matchInfos = response.data.MatchInfos;

          // Add EnemyTeam to each sample
          for(let i=0; i<this.samples.length; i++){
            let sample = this.samples[i];
            for (let enemyTeamName in this.matchInfos.filter(x=>x.MatchId == sample.MatchId)[0].Scoreboard.Teams){
              if(enemyTeamName != this.selectedTeam){
                sample.EnemyTeamName = enemyTeamName;
                break;
              }
            }
          }
          
          // this.userPerformanceData = response.data.UserData;
          // this.globalPerformanceData = response.data.GlobalData;
          // Ignore zones where there are no samples for less clutter
          // this.zones = response.data.Zones.filter(
          //   x =>
          //     x.ParentZoneId != -1 &&
          //     this.userPerformanceData.ZonePerformances[x.ZoneId].SampleCount !=
          //       0
          // ).sort((a, b) => a.Depth - b.Depth);
          // if (this.zones.length == 0) {
          //   this.zonesEnabled = false;
          // } else {
          //   this.zonesEnabled = true;
          // }
          // this.zoneDescendants = response.data.ZoneDescendants;
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
    Watch: function(matchId, round) {
      let demoviewer = this.$root.$children[0].$refs.demoviewer;
      demoviewer.Watch("", matchId, round);
    },
    SetSelectedTeam(teamName) {
      if (teamName != this.selectedTeam) {
        this.selectedTeam = teamName;
        this.LoadSamples(this.selectedEvent, this.selectedTeam, this.activeMap);
      }
    }
  },
  computed: {
    activeUserData() {
      // Filter (if applicable)
      return this.userPerformanceData;
    },
    activeGlobalData() {
      // Filter (if applicable)
      return this.globalPerformanceData;
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
      if (this.selectedZoneId == 0) {
        return null;
      }
      return this.zones.find(x => x.ZoneId == this.selectedZoneId);
    },
    visibleSamples() {
      if (!this.samples) return [];
      if (this.selectedSample != null) return [this.selectedSample];
      if (this.selectedZoneId) {
        return this.samples.filter(
          x =>
            this.zoneDescendants[this.selectedZoneId].includes(x.ZoneId) ||
            x.ZoneId == this.selectedZoneId
        );
      }
      return this.samples.filter(x => x.UserIsCt == this.showCt);
    },
    visibleZones() {
      if (this.detailView) return [];

      if (this.selectedZone != null) {
        return this.zones.filter(
          x =>
            x.ParentZoneId == this.selectedZone.ZoneId ||
            this.selectedZone.ZoneId == x.ZoneId
        );
      } else {
        return this.zones.filter(
          x => x.IsCtZone == this.showCt && x.Depth == 1
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebar.scss";

.view-flashes {
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

    .matchcount-display {
      background: $dark-4;
      position: relative;
      padding: 8px 20px;
      cursor: pointer;
      border-radius: 4px;
      color: white;
      font-size: 14px;
    }
  }

  .r {
    width: 30%;

    .sidebar {
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
            transition: 0.35s;
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