<template>
  <div class="view view-molotovs">
    <div class="fixed-width-container">   
            <TeamSelection 
        :teams="eventData ? eventData.Teams : null" 
        :SetSelectedTeam="SetSelectedTeam"
        :selectedTeamName="selectedTeamName"
        />
   
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
            
            <span class="split-title">HIT CHANCE</span>
            <div class="split">
              <div class="ct">
                <img src="@/assets/ct_logo.png" />
                <span>{{(mapSummary.HitChanceAsCt* 100).toFixed(0) }}%</span>
              </div>
              <div class="t">
                <img src="@/assets/t_logo.png" />
                <span>{{(mapSummary.HitChanceAsTerrorist* 100).toFixed(0) }}%</span>
              </div>
            </div>

            <span class="split-title">DAMAGE</span>
            <div class="split">
              <div class="ct">
                <img src="@/assets/ct_logo.png" />
                <span>{{mapSummary.AverageDamageAsCt.toFixed(1)}}</span>
              </div>
              <div class="t">
                <img src="@/assets/t_logo.png" />
                <span>{{mapSummary.AverageDamageAsTerrorist.toFixed(1)}}</span>
              </div>
            </div>
          </div> -->
        </div>
      </div>

      <div v-if="!samples.length && !loadingSamplesComplete" class="bordered-box no-data">
        <AjaxLoader>Loading Molotovs</AjaxLoader>
      </div>
      <div v-if="!samples.length && loadingSamplesComplete" class="bordered-box no-data">
        <NoDataAvailableDisplay>
          Seems like we have no matches for {{selectedTeamName}} on {{activeMap}} from {{eventData.Event.EventNameLong}}
        </NoDataAvailableDisplay>
      </div>   
      <div v-if="samples.length" class="interactive-area">
        <div class="l bordered-box">
          <div class="tool-menu">
            <button class="button-variant-bordered" :class="{active: showTrajectories}" @click="OnShowTrajectories">Trajectories</button>
            <button class="button-variant-bordered" @click="ToggleDetailView()" :disabled="!zonesEnabled">Toggle Zones</button>

            <div class="team-select">
              <img
                class="t"
                src="@/assets/t_logo.png"
                :class="{active: !showCt}"
                @click="SetShowCt(false)"
              />
              <img
                class="ct"
                src="@/assets/ct_logo.png"
                :class="{active: showCt}"
                @click="SetShowCt(true)"
              />
            </div>
            <div class="matchcount-display">
              {{matchInfos? matchInfos.length : "?"}} match(es) of {{selectedTeamName}} on {{activeMap}} 
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
              :zoneType="'FireNade'"
              :zones="visibleZones"
              :userPerformanceData="userPerformanceData"
              :molotovs="visibleSamples"
            />
          </div>
        </div>
        <div class="r bordered-box">
          <div class="sidebar">
            <div class="legend-tab">
              <div class="detail-legend-section">
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="50" width="50">
                      <Molotov 
                        :grenadeData="{
                          'Id':'FireNade-1-1',
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
                          'Victims':[]
                        }"
                        :scaleFactor="2"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="false" 
                        :fixedDetonationRadius="15" 
                      />
                    </svg>
                  </div>
                  <div class="legend-description">
                    White markers represent Molotovs that did not deal damage to enemies.
                  </div>
                </div>
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="50" width="50">
                      <Molotov 
                        :grenadeData="{
                          'Id':'FireNade-1-1',
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
                          'Victims':[{'Hits': [{'VictimId':1,'VictimPosX':42,'VictimPosY':12,'AmountHealth':5,'AmountArmor':0,'Kill':false,'TeamAttack':false,'VictimIsAttacker':false},]}]
                        }"
                        :scaleFactor="2"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="false" 
                        :fixedDetonationRadius="15" 
                      />
                    </svg>
                  </div>                
                  <div class="legend-description">
                    Red markers indicate damaged enemies.
                  </div>
                </div>
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="50" width="50">
                      <Molotov 
                        :grenadeData="{
                          'Id':'FireNade-1-1',
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
                          'Victims':[{'Hits': [
                          {'VictimId':1,'VictimPosX':43,'VictimPosY':27,'AmountHealth':5,'AmountArmor':0,'Kill':false,'TeamAttack':false,'VictimIsAttacker':false},
                          {'VictimId':1,'VictimPosX':37,'VictimPosY':25,'AmountHealth':5,'AmountArmor':0,'Kill':false,'TeamAttack':false,'VictimIsAttacker':false},
                          {'VictimId':1,'VictimPosX':32,'VictimPosY':21,'AmountHealth':5,'AmountArmor':0,'Kill':false,'TeamAttack':false,'VictimIsAttacker':false},
                          {'VictimId':1,'VictimPosX':27,'VictimPosY':15,'AmountHealth':5,'AmountArmor':0,'Kill':false,'TeamAttack':false,'VictimIsAttacker':false},
                          ]}]
                        }"
                        :scaleFactor="2"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="true" 
                        :fixedDetonationRadius="15" 
                      />
                    </svg>
                  </div>
                  <div class="legend-description">
                    Click on a Molotov to see the victims' path through the fire. 
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
                    A zone's color corresponds to the chance of your Molotovs burning at least one enemy. 
                    <!-- A zone's color corresponds to the chance of your Molotovs inside that burned at least one enemy.  -->
                  </div>
                </div>
              </div>
            </div>
            <div v-if="selectedSample || selectedZone" id="analysis-tab" class="sidebar-tabcontent">
              <div v-if="selectedSample" class="selected-sample-stats"> 
                About this Molotov:
                <div class="stat-row">
                  <div class="stat-description">Thrown by</div>
                  <div class="stat-content">{{selectedSample.PlayerName}}</div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Against</div>
                  <div class="stat-content">{{selectedSample.EnemyTeamName}}</div>
                </div>
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
                    Enemies Burned
                  </div>
                  <div class="stat-content">
                    {{selectedSample.Victims.length}}
                  </div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">
                    Total damage to enemies:
                  </div>
                  <div class="stat-content">
                    {{selectedSample.EnemyAmountHealth}}
                  </div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">
                    Kills:
                  </div>
                  <div class="stat-content">
                    {{selectedSample.KilledEnemies}}
                  </div>
                </div>
                <div class="split">
                  <div class="left">
                    <p>Watch this round</p>
                  </div>
                  <div class="right">
                    <i class="material-icons watch-match-icon" title="Watch in Browser" @click="Watch(selectedSample.MatchId, selectedSample.Round)">videocam</i>
                  </div>    
                </div>
              </div>

              <div v-if="selectedZone" class="selected-zone-stats"> 
                About your Molotovs in the {{selectedZone.Name}}-Zone:
                <div class="stat-row">
                  <div class="stat-description">
                    Molotovs thrown
                  </div>
                  <div class="stat-content">
                    {{userSelectedZonePerformance.SampleCount}}
                  </div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">
                    Hits
                  </div>
                  <div class="stat-content">
                    {{(userSelectedZonePerformance.DamagingNadesCount / Math.max(1, userSelectedZonePerformance.SampleCount) * 100).toFixed(0)+'%'}}                     
                  </div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">
                    Avg. damage
                  </div>
                  <div class="stat-content">
                    {{(userSelectedZonePerformance.AmountHealth / Math.max(1, userSelectedZonePerformance.SampleCount)).toFixed(0)}}                     
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
import TeamSelection from "@/components/TeamSelection.vue";
import Molotov from "@/components/GrenadesAndKills/RadarImage/Molotov.vue";
import RadarImage from "@/components/GrenadesAndKills/RadarImage/RadarImage.vue";
import Zone from "@/components/GrenadesAndKills/RadarImage/Zone.vue";

export default {
  components: {
    CustomSelect,
    TeamSelection,
    Molotov,
    RadarImage,
    Zone,
  },
  data() {
    return {
      loadingSamplesComplete: false,
      activeMap: "de_dust2",
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
      selectedTeamName: "Astralis",
      selectedEventName: "StarladderBerlin2019",
      // selectedEventName: "IEMKatowice2019",
    };
  },
  mounted() {
    this.LoadEventInfo(this.selectedEventName);

    if (this.$route.query.map) {
      this.activeMap = this.$route.query.map;
    }
    this.LoadSamples(this.selectedEventName, this.selectedTeamName, this.activeMap);
  },
  methods: {
    LoadEventInfo(eventName) {
      this.mapSummaries = null;
      this.$api.getEvent(eventName).then(response => {
        this.eventData = response.data;
      });
    },
    LoadOverviews(matchCount) {
      this.mapSummaries = null;
      this.$api.getFireNadesOverview(matchCount).then(response => {
        this.mapSummaries = response.data.MapSummaries;
      });
    },
    LoadSamples(eventName, teamName, map) {
      this.samples = [];
      this.loadingSamplesComplete = false;
      this.$api
        .getEventMolotovs(eventName, teamName, map)
        .then(response => {
          this.mapInfo = response.data.MapInfo;
          this.samples = response.data.Samples;
          this.matchInfos = response.data.MatchInfos;

          // Add EnemyTeam to each sample
          for(let i=0; i<this.samples.length; i++){
            let sample = this.samples[i];
            for (let teamInfo in this.matchInfos.filter(x=>x.MatchId == sample.MatchId)[0].Scoreboard.TeamInfos){
              if(teamInfo.TeamName != this.selectedTeamName){
                sample.EnemyTeamName = teamInfo.TeamName;
                break;
              }
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
        this.LoadSamples(this.selectedEventName, this.selectedTeamName, map);
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
    SetShowCt(showCt) {
      this.selectedSample = null;
      this.selectedZoneId = 0;
      this.showCt = showCt;
    },
    ToggleDetailView() {
      this.selectedSample = null;
      this.selectedZoneId = 0;
      this.detailView = !this.detailView;
    },
    Watch: function(matchId, round) {
      globalThis.DemoViewer.SetMatch(matchId)
        .SetRound(round)
        .Load();
    },
    SetSelectedTeam(teamName) {
      if (teamName != this.selectedTeamName) {
        this.selectedTeamName = teamName;
        this.LoadSamples(this.selectedEventName, this.selectedTeamName, this.activeMap);
      }
    }
  },
  computed: {
    activeUserData() {
      // Filter (if applicable)
      return this.userPerformanceData;
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
      if(this.selectedZoneId){
        return this.samples.filter(x => this.zoneDescendants[this.selectedZoneId].includes(x.ZoneId) || x.ZoneId == this.selectedZoneId)
      }
      return this.samples.filter(x => x.UserIsCt == this.showCt);
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebar.scss";

.view-molotovs {
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
      font-weight: 500;
      font-size: 16px;
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