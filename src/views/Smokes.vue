<template>
  <div class="view view-smokes">
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
            :src="$api.resolveResource('~/Content/Images/Overview/' + mapSummary.Map +'.jpg')"
          />
          <p class="map-name">{{mapSummary.Map}}</p>

          <div class="z-layer-lo">
            <span class="split-title">USES</span>
            <div class="split">
              <div class="ct">
                <img src="@/assets/ct_logo.png" />
                <span>{{(mapSummary.UsageRatioAsCt* 100).toFixed(0) }}%</span>
              </div>
              <div class="t">
                <img src="@/assets/t_logo.png" />
                <span>{{(mapSummary.UsageRatioAsTerrorist* 100).toFixed(0) }}%</span>
              </div>
            </div>
          </div>

          <div class="z-layer-hi">
            
            <span class="split-title">COMPLETED LINEUPS</span>
            <div class="split">
              <div class="unisex">
                <span>{{mapSummary.CompletedCategories}}/{{mapSummary.TotalCategories}}</span>
              </div>
            </div>

            <span class="split-title">LINEUP ACCURACY</span>
            <div class="split">
              <div class="unisex">
                <span>{{(mapSummary.CategorizedSmokesAccuracy* 100).toFixed(0) }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="interactive-area">
        <div class="l bordered-box">
          <div class="tool-menu">
            <button class="button-variant-bordered" :class="{active: showTrajectories}" @click="OnShowTrajectories">Trajectories</button>
            <div v-if="zonesEnabled">
              <button class="button-variant-bordered" :class="{active: !detailView}" @click="SetDetailView">Lineups</button>
            </div>

            <div class="team-select">
              <img
                class="t"
                src="@/assets/t_logo.png"
                :class="{active: !showCt || selectedLineup}"
                @click="showCt = false"
              />
              <img
                class="ct"
                src="@/assets/ct_logo.png"
                :class="{active: showCt || selectedLineup}"
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
          <div v-if="!samples.length && !loadingSamplesComplete" class="">
            <AjaxLoader>Loading Smokes</AjaxLoader>
          </div>
          <div v-if="!samples.length && loadingSamplesComplete" class="">
            <NoDataAvailableDisplay 
            @buttonClicked="LoadSamples(activeMap, matchCount, true)">
              Either you don't have any matches on this map, or you just don't use any smokes at all. Load someone else's?
              </NoDataAvailableDisplay>
          </div>   
          <div>   
            <RadarImage
              v-if="samples.length"
              :mapInfo="mapInfo"
              :showTrajectories="showTrajectories"
              :showCt="showCt"
              :SetSelectedSample="SetSelectedSample"
              :selectedSample="selectedSample"
              :SetSelectedLineup="SetSelectedLineup"
              :selectedLineup="selectedLineup"
              :selectedZone="selectedZone"
              :SetSelectedZone="SetSelectedZone"
              :OnClickBackground="OnClickBackground"
              :detailView="detailView"
              :zoneType="'Smoke'"
              :zones="visibleZones"
              :lineups="visibleLineups"
              :userPerformanceData="userPerformanceData"
              :smokeGrenades="visibleSamples"
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
                      <Smoke 
                        :grenadeData="{
                          'Id':'Smoke-1-1',
                          'MatchId':1,
                          'Round':1,
                          'GrenadeId':1,
                          'UserIsCt':true,
                          'UserWonRound':false,
                          'Result':2,
                          'TargetId':0,
                          'LineupId':0,
                          'ReleaseX':5,
                          'ReleaseY':22,
                          'DetonationX':33,
                          'DetonationY':27,
                          'Trajectory':[{'Time':0,'X':5,'Y':22,'Z':0},{'Time':1,'X':33,'Y':27,'Z':0}]}"
                        :zoomFactor="1"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="false"
                        :fixedDetonationRadius="15"
                      />
                    </svg>
                  </div>
                  <div class="legend-description">
                    <!-- Your Smokes are represented by circular markers. Green means it reached its target. -->
                    <!-- Smokes that reached there target are colored green.  -->
                    A smoke that reached its target.
                  </div>
                </div>
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="50" width="50">
                      <Smoke 
                        :grenadeData="{
                          'Id':'Smoke-1-1',
                          'MatchId':1,
                          'Round':1,
                          'GrenadeId':1,
                          'UserIsCt':true,
                          'UserWonRound':false,
                          'Result':1,
                          'TargetId':0,
                          'LineupId':0,
                          'ReleaseX':5,
                          'ReleaseY':22,
                          'DetonationX':33,
                          'DetonationY':27,
                          'Trajectory':[{'Time':0,'X':5,'Y':22,'Z':0},{'Time':1,'X':33,'Y':27,'Z':0}]}"
                        :zoomFactor="1"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="false"
                        :fixedDetonationRadius="15"
                      />
                    </svg>
                  </div>
                  <div class="legend-description">
                    <!-- A red marker means you f'ed up the throw and maybe you should look at the lineup one more time. -->
                    You f'ed up the throw. Look at the lineup one more time.
                  </div>
                </div>
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="50" width="50">
                      <Smoke 
                        :grenadeData="{
                          'Id':'Smoke-1-1',
                          'MatchId':1,
                          'Round':1,
                          'GrenadeId':1,
                          'UserIsCt':true,
                          'UserWonRound':false,
                          'Result':0,
                          'TargetId':0,
                          'LineupId':0,
                          'ReleaseX':5,
                          'ReleaseY':22,
                          'DetonationX':33,
                          'DetonationY':27,
                          'Trajectory':[{'Time':0,'X':5,'Y':22,'Z':0},{'Time':1,'X':33,'Y':27,'Z':0}]}"
                        :zoomFactor="1"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="false"
                        :fixedDetonationRadius="15"
                      />
                    </svg>
                  </div>
                  <div class="legend-description">
                    <!-- A grey marker means the lineup of this throw is not featured on MENTOR.GG. -->
                    <!-- The lineup of this throw is not featured on MENTOR.GG. -->
                    This throw's lineup is not featured on MENTOR.GG - yet!
                  </div>
                </div>
              </div>
              <div class="zone-legend-section">
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="50" width="50">
                      <Lineup 
                        :SetSelectedLineup="function(){}"
                        :fillColor="'rgb(255, 255, 255)'"
                        :lineupData="{
                          'LineupId':1,
                          'TargetId':1,
                          'Name':'Legend Example',
                          'PlayerPosXPixel':5,
                          'PlayerPosYPixel':22,
                          'Setpos':'setpos -160.031250 887.968750 -135.26556399999998; setang -44.269619 -134.435654 0.0;',
                          'ThrowTypeString':'left-click',
                          'Images':null,
                          'Thumbnails':null}"
                        :zoneData="{
                          'ZoneId':1,
                          'CategoryIds':[1],
                          'Name':'Legend Example',
                          'GrenadePosXPixel':33,
                          'GrenadePosYPixel':27}"
                        :zoomFactor="0.5"
                      />
                      <Target
                      :fillcolor="'rgba(0, 255, 0, 1)'"
                      :zoneData="{
                        'ZoneId':1,
                        'CategoryIds':[1],
                        'Name':'Legend Example',
                        'GrenadePosXPixel':33,
                        'GrenadePosYPixel':27}"
                      :zoneType="'Smoke'"                      
                      :scaleFactor="0.5"                      
                      />
                    </svg>
                  </div>
                  <div class="legend-description">
                    Click on lineups to learn new smokes.
                    <!-- You can learn new smokes by clicking on the lineups and checking out the "Practice" section. -->
                  </div>
                </div>
                <div class="legend-row">
                  <div class="legend-depiction">
                    <svg height="50" width="50">
                      <Lineup 
                        :SetSelectedLineup="function(){}"
                        :fillColor="'rgba(0, 255, 0, 1)'"
                        :lineupData="{
                          'LineupId':1,
                          'TargetId':1,
                          'Name':'Legend Example',
                          'PlayerPosXPixel':5,
                          'PlayerPosYPixel':22,
                          'Setpos':'setpos -160.031250 887.968750 -135.26556399999998; setang -44.269619 -134.435654 0.0;',
                          'ThrowTypeString':'left-click',
                          'Images':null,
                          'Thumbnails':null}"
                        :zoneData="{
                          'ZoneId':1,
                          'CategoryIds':[1],
                          'Name':'Legend Example',
                          'GrenadePosXPixel':33,
                          'GrenadePosYPixel':27}"
                        :zoomFactor="0.5"
                      />
                      <Target
                      :fillcolor="'rgba(0, 255, 0, 1)'"
                      :zoneData="{
                        'ZoneId':1,
                        'CategoryIds':[1],
                        'Name':'Legend Example',
                        'GrenadePosXPixel':33,
                        'GrenadePosYPixel':27}"
                      :zoneType="'Smoke'"                      
                      :scaleFactor="0.5"                      
                      />
                    </svg>
                  </div>
                  <div class="legend-description">
                    <!-- As soon as you've used a lineup ingame, it is colored according to your accuracy. -->
                    Use a lineup ingame and it will be colored according to your accuracy.
                  </div>
                </div>
              </div>
            </div>
            <div v-if="selectedSample || selectedLineup" id="analysis-tab" class="sidebar-tabcontent">
              <div v-if="selectedSample" class="selected-sample-stats">
                About this smoke of yours:
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
              </div>


              <div v-if="selectedLineup" class="selected-lineup-stats">
                {{selectedLineup.Name}}-Lineup
                <div class="stat-row">
                  <div class="stat-description">Attempts</div>
                  <div class="stat-content">
                    {{userSelectedLineupPerformance.TotalAttemptsCount}}
                  </div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Accuracy</div>
                  <div class="stat-content">
                    {{(userSelectedLineupPerformance.SuccessfulAttemptsCount / Math.max(1, userSelectedLineupPerformance.TotalAttemptsCount ) * 100).toFixed(0)+ '%'}}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="selectedLineup" class="practice-tab">
              <!-- <div v-show="!selectedLineup">
                Select a Lineup to see how it's done!
              </div> -->
              <div class="setpos-wrapper" v-if="selectedLineup && selectedLineup.Setpos != ''">
                <input id="setpos-text" type="text" :value="selectedLineup.Setpos" readonly>
                <button id="setpos-copy" type="button" data-toggle="tooltip" data-placement="top" data-original-title="Copy to clipboard" @click="CopyTextToClipboard(selectedLineup.Setpos)">
                  <i class="material-icons" >file_copy</i>
                </button>
              </div>
              <div v-if="selectedLineup && selectedLineup.Images && selectedLineup.Thumbnails">
                <LightBox :images="lineupImages" :show-light-box="false" ref="lightbox"></LightBox>
                <div class="image-list">
                  <img :src="lineupImages[0].src" @click="OpenLightbox">
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
import RadarImage from "@/components/GrenadesAndKills/RadarImage/RadarImage.vue";
import Lineup from "@/components/GrenadesAndKills/RadarImage/Lineup.vue";
import Target from "@/components/GrenadesAndKills/RadarImage/Target.vue";
import Smoke from "@/components/GrenadesAndKills/RadarImage/Smoke.vue";
import LightBox from 'vue-image-lightbox'
require('vue-image-lightbox/dist/vue-image-lightbox.min.css');

export default {
  components: {
    CustomSelect,
    RadarImage,
    Lineup,
    Target,
    Smoke,
    LightBox
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
      mapSummaries: [],
      detailView: true,

      zonesEnabled: false,
      zones: [],
      lineups: [],

      userPerformanceData: [],
      globalPerformanceData: [],

      mapInfo: {},
      samples: [],

      selectedSample: null,
      selectedLineup: null,
      selectedZone: null,
    };
  },
  mounted() {
    this.LoadOverviews(0); // matchCount is currently ignored for overviews by api
    this.LoadSamples(this.activeMap, this.matchCount, false);
  },
  methods: {
    LoadOverviews(matchCount) {
      this.$api.getSmokesOverview(matchCount).then(response => {
        this.mapSummaries = response.data.MapSummaries;
      });
    },
    LoadSamples(map, matchCount, isDemo) {
      this.loadingSamplesComplete = false;
      this.$api.getSmokes(isDemo ? "76561198033880857" : "", map, matchCount)
      .then(response => {
        this.mapInfo = response.data.MapInfo;
        this.samples = response.data.Samples;
        this.lineups = response.data.Lineups;
        this.zones = response.data.Zones.filter(x=>x.CategoryIds.length > 0);
        this.userPerformanceData = response.data.UserData; // Filtered (if applicable)
        this.globalPerformanceData = response.data.GlobalData;
        if (this.zones.length == 0) {
          this.zonesEnabled = false;
          this.detailView = true;
        } else {
          this.zonesEnabled = true;
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
      this.selectedZone = null;
      this.selectedLineup = null;
    },
    OnActiveMapUpdated: function(map) {
      if (this.activeMap != map) {
        this.LoadSamples(map, this.matchCount, false);
        this.activeMap = map;
      }
      this.selectedSample = null;
      this.selectedLineup = null;
    },
    SetSelectedSample: function(id) {
      this.selectedSample = this.samples.find(x => x.Id == id);
    },
    SetSelectedLineup: function(lineupId) {
      this.selectedLineup = this.lineups.find(x => x.LineupId == lineupId);
    },
    SetSelectedZone: function(zoneId) {
      this.selectedZone = this.zones.find(x => x.ZoneId == zoneId);
    },
    SetDetailView() {
      this.selectedSample = null;
      this.selectedLineup = null;
      this.selectedZone = null;
      this.detailView = !this.detailView;
    },
    CopyTextToClipboard(text) {
      // See https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
      if (!navigator.clipboard) {
          this.fallbackCopyTextToClipboard(text);
          return;
      }
      navigator.clipboard.writeText(text).then(function() {
      }, function(error) {
        console.error(error); // eslint-disable-line no-console
      });
    },
    fallbackCopyTextToClipboard(text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
          document.execCommand('copy');
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      }

      document.body.removeChild(textArea);
    },
    OpenLightbox() {
      this.$refs.lightbox.showImage(0);
    },
    Watch: function(matchId, round) {
      let demoviewer = this.$root.$children[0].$refs.demoviewer;
      demoviewer.Watch("", matchId, round);
    },
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
    userSelectedLineupPerformance() {
      if (this.selectedLineup == null) return null;
      return this.activeUserData.LineupPerformances[this.selectedLineup.LineupId];
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
    globalSelectedLineupPerformance() {
      if (this.selectedLineup == null) return null;
      return this.activeGlobalData.LineupPerformances[this.selectedLineup.LineupId];
    },
    globalTotalRounds() {
      return this.showCt
        ? this.activeGlobalData.TotalCtRounds
        : this.activeGlobalData.TotalTerroristRounds;
    },
    visibleSamples() {
      if (!this.detailView){
        if(this.selectedLineup != null){
          return this.samples.filter(x=>x.LineupId == this.selectedLineup.LineupId)
        }
        return [];
      } 
      if (!this.samples) return [];
      if (this.selectedSample != null) return [this.selectedSample];
      return this.samples.filter(x => x.UserIsCt == this.showCt);
    },    
    visibleLineups() {
      if (this.detailView) return [];
      if (!this.lineups) return [];
      if (this.selectedLineup != null) return [this.selectedLineup];
      if (this.selectedZone != null) return this.lineups.filter(x => x.TargetId == this.selectedZone.ZoneId);
      return this.lineups;
    },    
    visibleZones() {
      if (this.detailView) return [];
      if (this.selectedZone != null) return [this.selectedZone];
      if (this.selectedLineup != null) return [this.zones.find(x=>x.ZoneId == this.selectedLineup.TargetId)]
      return this.zones;
    },
    lineupImages() {
      let ret = [];
      if ( this.selectedLineup == null ) {
        return ret;
      }

      if ( this.selectedLineup.Images.length != this.selectedLineup.Thumbnails.length ) {
        return ret;
      }

      for ( let i = 0; i < this.selectedLineup.Images.length; i++ ) {
        ret.push({
          src: this.$api.resolveResource('~' + this.selectedLineup.Images[i]),
          thumb: this.$api.resolveResource('~' + this.selectedLineup.Thumbnails[i])
        });
      }

      return ret;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebar.scss";

.view-smokes {
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
      .t,
      .unisex {
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