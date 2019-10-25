<template>
  <div class="view view-hes">
    <div class="fixed-width-container">
      <HESOverview      
      :activeMap="activeMap"
      v-on:updatemap = "OnActiveMapUpdated"/>

      <div v-if="!samples.length && !loadingSamplesComplete" class="bordered-box no-data">
        <AjaxLoader>Loading HEs</AjaxLoader>
      </div>
      <div v-if="!samples.length && loadingSamplesComplete" class="bordered-box no-data">
        <DemoDataLoadRequest @buttonClicked="LoadSamples(activeMap, matchCount, true)">
          Either you don't have any matches on this map, or you just don't use any he grenades at all.
          <br />Wanna load someone else's?
        </DemoDataLoadRequest>
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
                @click="SetShowCt(false)"
              />
              <img
                class="ct"
                src="@/assets/ct_logo.png"
                :class="{active: showCt}"
                @click="SetShowCt(true)"
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
              :zoneType="'HE'"
              :zones="visibleZones"
              :userPerformanceData="userPerformanceData"
              :heGrenades="visibleSamples"
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
                      <HE
                        :grenadeData="{
                          'Id':'HE-1-1',
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
                          'Hits':[]
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
                  >Grey markers represent HEs that did not hit enemies.</div>
                </div>
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="50" width="50">
                      <HE
                        :grenadeData="{
                          'Id':'HE-1-1',
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
                          'Hits':[{'VictimPosX':42,'VictimPosY':12,'AmountHealth':20,'Kill':false,'TeamAttack':false,'VictimIsAttacker':false}]
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
                  >White markers indicate damaged enemies. Radius corresponds to damage.</div>
                </div>
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="50" width="50">
                      <HE
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
                          'Hits':[{'VictimPosX':42,'VictimPosY':12,'AmountHealth':40,'Kill':true,'TeamAttack':false,'VictimIsAttacker':false}]
                        }"
                        :scaleFactor="2"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="false"
                      />
                    </svg>
                  </div>
                  <div class="legend-description">Green markers indicate fatal damage.</div>
                </div>
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="50" width="50">
                      <HE
                        :grenadeData="{
                          'Id':'HE-1-1',
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
                          'Hits':[
                          {'VictimPosX':42,'VictimPosY':12,'AmountHealth':15,'Kill':false,'TeamAttack':false,'VictimIsAttacker':false},
                          {'VictimPosX':39,'VictimPosY':39,'AmountHealth':35,'Kill':true,'TeamAttack':false,'VictimIsAttacker':false},]
                        }"
                        :scaleFactor="2"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="true"
                      />
                    </svg>
                  </div>
                  <div class="legend-description">Click on a HE to see the victims' positions.</div>
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
                  <div
                    class="legend-description"
                  >A zone's color corresponds to the average damage of your HEs that detonated in it.</div>
                </div>
              </div>
            </div>
            <div v-if="selectedSample || selectedZone" id="analysis-tab" class="sidebar-tabcontent">
              <div v-if="selectedSample" class="selected-sample-stats">
                About this HE:
                <div class="stat-row">
                  <div class="stat-description">Round</div>
                  <div class="stat-content">{{selectedSample.Round}}</div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Enemies Hit</div>
                  <div class="stat-content">{{selectedSample.Hits.length}}</div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Total damage dealt to enemies:</div>
                  <div
                    class="stat-content"
                  >{{selectedSample.Hits.filter(x=>!x.TeamAttack).reduce((a,b)=> a + b.AmountHealth, 0)}}</div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Enemies killed:</div>
                  <div
                    class="stat-content"
                  >{{selectedSample.Hits.filter(x=>!x.TeamAttack && x.Kill).length}}</div>
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
                About your HEs in the {{selectedZone.Name}}-Zone:
                <div class="stat-row">
                  <div class="stat-description">HEs thrown</div>
                  <div class="stat-content">{{userSelectedZonePerformance.SampleCount}}</div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Avg. damage</div>
                  <div
                    class="stat-content"
                  >{{(userSelectedZonePerformance.AmountHealth / Math.max(1, userSelectedZonePerformance.SampleCount)).toFixed(0)}}</div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Avg. kills</div>
                  <div
                    class="stat-content"
                  >{{(userSelectedZonePerformance.Kills / Math.max(1, userSelectedZonePerformance.SampleCount)).toFixed(2)}}</div>
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
import HE from "@/components/GrenadesAndKills/RadarImage/HE.vue";
import RadarImage from "@/components/GrenadesAndKills/RadarImage/RadarImage.vue";
import Zone from "@/components/GrenadesAndKills/RadarImage/Zone.vue";
import HESOverview from "@/components/Overviews/HESOverview.vue";

export default {
  components: {
    CustomSelect,
    HE,
    RadarImage,
    Zone,
    HESOverview
  },
  data() {
    return {
      loadingSamplesComplete: false,
      activeMap: "de_mirage",
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
      detailView: true,

      zonesEnabled: false,
      zones: [],
      zoneDescendants: [],
      userPerformanceData: [],
      globalPerformanceData: [],

      mapInfo: {},
      samples: [],

      selectedSample: null,
      selectedZoneId: 0
    };
  },
  mounted() {
    if (this.$route.query.map) {
      this.activeMap = this.$route.query.map;
    }
    if (this.$route.query.matchCount) {
      this.matchCount = this.$route.query.matchCount;
      this.matchCountSelectOptions[this.$route.query.matchCount] =
        "Use last " + this.$route.query.matchCount + " matches";
    }
    this.LoadSamples(this.activeMap, this.matchCount, false);

    if (this.$route.query.zoneId) {
      this.detailView = false;
      this.selectedZoneId = this.$route.query.zoneId;
    }
  },
  methods: {
    LoadSamples(map, matchCount, isDemo) {
      this.samples = [];
      this.loadingSamplesComplete = false;
      this.$api
        .getHEs(isDemo ? "76561198033880857" : "", map, matchCount)
        .then(response => {
          this.mapInfo = response.data.MapInfo;
          this.samples = response.data.Samples;
          this.userPerformanceData = response.data.UserData;
          this.globalPerformanceData = response.data.GlobalData;
          // Ignore zones where there are no samples for less clutter
          this.zones = response.data.Zones.filter(
            x =>
              x.ParentZoneId != -1 &&
              this.userPerformanceData.ZonePerformances[x.ZoneId].SampleCount !=
                0
          ).sort((a, b) => a.Depth - b.Depth);
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
      
      this.$ga.event({
        eventCategory: 'HEs',
        eventAction: this.showTrajectories ? 'ShowTrajectories' : 'HideTrajectories',
      });
    },
    OnMatchCountUpdated: function() {
      this.$ga.event({
        eventCategory: 'HEs',
        eventAction: 'MatchCountUpdated',
        eventValue: this.matchCount
      });
      this.LoadSamples(this.activeMap, this.matchCount, false);
    },
    OnClickBackground: function() {
      this.selectedSample = null;
      this.selectedZoneId = 0;
      this.$ga.event({
        eventCategory: 'HEs',
        eventAction: 'ClickBackground',
        eventLabel: map,
      });
    },
    OnActiveMapUpdated: function(map) {
      this.$ga.event({
        eventCategory: 'HEs',
        eventAction: 'ActiveMapUpdated',
        eventLabel: map,
      });
      if (this.activeMap != map) {
        this.LoadSamples(map, this.matchCount, false);
        this.activeMap = map;
      }
      this.selectedSample = null;
      this.selectedZoneId = 0;
    },
    SetSelectedSample: function(id) {
      this.$ga.event({
        eventCategory: 'HEs',
        eventAction: 'SampleSelected',
      });
      this.selectedSample = this.samples.find(x => x.Id == id);
    },
    SetSelectedZone: function(zoneId) {
      this.$ga.event({
        eventCategory: 'HEs',
        eventAction: 'ZoneSelected',
        eventValue: zoneId
      });
      this.selectedSample = null;
      this.selectedZoneId = zoneId;
    },
    SetShowCt(showCt) {
      this.$ga.event({
        eventCategory: 'HEs',
        eventAction:  showCt ? 'ShowCt' : 'ShowTerrorists',
      });
      this.selectedSample = null;
      this.selectedZoneId = 0;
      this.showCt = showCt;
    },
    ToggleDetailView() {
      this.selectedSample = null;
      this.selectedZoneId = 0;
      this.detailView = !this.detailView;

      this.$ga.event({
        eventCategory: 'HEs',
        eventAction: this.detailView ? 'ShowDetails' : 'ShowZones',
      });
    },
    Watch: function(matchId, round) {
      this.$ga.event({
        eventCategory: 'HEs',
        eventAction:  'Watch',
      });
      let demoviewer = this.$root.$children[0].$refs.demoviewer;
      demoviewer.Watch("", matchId, round);
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

.view-hes {
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