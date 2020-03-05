<template>
  <div class="view view-radarimage-feature view-smokes">
    <div class="fixed-width-container">
      <SmokesOverview :activeMap="activeMap" v-on:updatemap="OnActiveMapUpdated" />

      <div v-if="!samples.length && !loadingSamplesComplete" class="bordered-box no-data">
        <AjaxLoader>Loading Smokes</AjaxLoader>
      </div>
      <div v-if="!samples.length && loadingSamplesComplete" class="bordered-box no-data">
        <DemoDataLoadRequest @buttonClicked="LoadSamples(activeMap, matchCount, true)">
          Either you don't have any matches on this map, or you just don't use any smokes at all.
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
            <div>
              <button
                class="button-variant-bordered"
                :class="{active: this.viewType == Enums.RadarViewTypes.Lineup}"
                @click="ToggleLineups()"
                :disabled="!lineupsEnabled"
              >Lineups</button>
            </div>

            <div class="team-select">
              <img
                class="t"
                src="@/assets/t_logo.png"
                :class="{active: !showCt || ShowBothTeams}"
                @click="SetShowCt(false)"
              />
              <img
                class="ct"
                src="@/assets/ct_logo.png"
                :class="{active: showCt || ShowBothTeams}"
                @click="SetShowCt(true)"
              />
            </div>
          </div>
          <div>
            <RadarImage
              v-if="samples.length"
              :map="activeMap"
              :showTrajectories="showTrajectories"
              :showCt="showCt"
              :SetSelectedSample="SetSelectedSample"
              :selectedSample="selectedSample"
              :SetSelectedLineup="SetSelectedLineup"
              :selectedLineup="selectedLineup"
              :selectedZone="selectedZone"
              :SetSelectedZone="SetSelectedZone"
              :SetSelectedTarget="SetSelectedTarget"
              :OnClickBackground="OnClickBackground"
              :viewType="viewType"
              :zoneType="'Smoke'"
              :targets="visibleTargets"
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
                          'ReleasePosPixel':{'X':5,'Y':22},
                          'DetonationPosPixel':{'X':33,'Y':27},
                          'Trajectory':[{'Time':0, 'PosPixel':{'X':5,'Y':22}},{'Time':1,'PosPixel':{'X':33,'Y':27}}]}"
                        :scaleFactor="2"
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
                          'ReleasePosPixel':{'X':5,'Y':22},
                          'DetonationPosPixel':{'X':33,'Y':27},
                          'Trajectory':[{'Time':0, 'PosPixel':{'X':5,'Y':22}},{'Time':1,'PosPixel':{'X':33,'Y':27}}]}"
                        :scaleFactor="2"
                        :showTrajectories="showTrajectories"
                        :SetSelectedSample="function(){}"
                        :isSelected="false"
                        :fixedDetonationRadius="15"
                      />
                    </svg>
                  </div>
                  <div class="legend-description">A red marker means you f'ed up.</div>
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
                          'ReleasePosPixel':{'X':5,'Y':22},
                          'DetonationPosPixel':{'X':33,'Y':27},
                          'Trajectory':[{'Time':0, 'PosPixel':{'X':5,'Y':22}},{'Time':1,'PosPixel':{'X':33,'Y':27}}]}"
                        :scaleFactor="2"
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
              <div class="lineup-legend-section">
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
                          'ReleasePosPixel':{'X':9,'Y':22},
                          'Trajectory':[{'Time':0, 'PosPixel':{'X':5,'Y':22}},{'Time':1,'PosPixel':{'X':33,'Y':27}}],
                          'Setpos':'setpos -160.031250 887.968750 -135.26556399999998; setang -44.269619 -134.435654 0.0;',
                          'ThrowTypeString':'left-click',
                          'Images':null,
                          'Thumbnails':null}"
                        :targetData="{
                          'ZoneId':1,
                          'CategoryIds':[1],
                          'Name':'Legend Example',
                          'CenterPixel':{'X':33,'Y':27}}"
                        :scaleFactor="2.5"
                      />
                      <Target
                        :fillcolor="'rgba(0, 255, 0, 1)'"
                        :targetData="{
                        'ZoneId':1,
                        'CategoryIds':[1],
                        'Name':'Legend Example',
                        'CenterPixel':{'X':33,'Y':27}}"
                        :zoneType="'Smoke'"
                        :scaleFactor="3"
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
                          'ReleasePosPixel':{'X':9,'Y':22},
                          'Trajectory':[{'Time':0, 'PosPixel':{'X':5,'Y':22}},{'Time':1,'PosPixel':{'X':33,'Y':27}}],
                          'Setpos':'setpos -160.031250 887.968750 -135.26556399999998; setang -44.269619 -134.435654 0.0;',
                          'ThrowTypeString':'left-click',
                          'Images':null,
                          'Thumbnails':null}"
                        :targetData="{
                          'ZoneId':1,
                          'CategoryIds':[1],
                          'Name':'Legend Example',
                          'CenterPixel':{'X':33,'Y':27}}"
                        :scaleFactor="2.5"
                      />
                      <Target
                        :fillcolor="'rgba(0, 255, 0, 1)'"
                        :targetData="{
                        'ZoneId':1,
                        'CategoryIds':[1],
                        'Name':'Legend Example',
                        'CenterPixel':{'X':33,'Y':27}}"
                        :zoneType="'Smoke'"
                        :scaleFactor="3"
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
            <div id="analysis-tab" class="sidebar-tabcontent">
              <div v-if="selectedSample" class="selected-sample-stats">
                <h4>About this Smoke</h4>
                <div class="stat-row">
                  <div class="stat-description">Round</div>
                  <div class="stat-content">{{selectedSample.Round}}</div>
                </div>

                <div
                  class="stat-row watch-row"
                  @click="Watch(selectedSample.MatchId, selectedSample.Round)"
                >
                  <div class="stat-description">Watch</div>
                  <div class="stat-content">
                    <i class="material-icons watch-match-icon" title="Watch in Browser">videocam</i>
                  </div>
                </div>
              </div>

              <div v-if="!selectedSample" class="selection">
                <h4>Selection</h4>

                <div class="stat-row">
                  <div class="stat-description">Side</div>
                  <div class="stat-content">
                    <img v-if="showCt || ShowBothTeams" class="ct" src="@/assets/ct_logo.png" />
                    <img v-if="!showCt || ShowBothTeams" class="t" src="@/assets/t_logo.png" />
                  </div>
                </div>
              </div>

              <div v-if="selectedLineup" class="selected-lineup-stats">
                <div class="stat-row">
                  <div class="stat-description">Lineup</div>
                  <div class="stat-content">{{selectedLineup.Name}}</div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Attempts</div>
                  <div class="stat-content">{{userSelectedLineupPerformance.Attempts}}</div>
                </div>
                <div class="stat-row">
                  <div class="stat-description">Accuracy</div>
                  <div
                    class="stat-content"
                  >{{(userSelectedLineupPerformance.Insides / Math.max(1, userSelectedLineupPerformance.Attempts ) * 100).toFixed(0)+ '%'}}</div>
                </div>
              </div>
            </div>
            <div v-if="selectedLineup" class="practice-tab">
              <div class="setpos-wrapper" v-if="selectedLineup && selectedLineup.SetposCommand != ''">
                <input id="setpos-text" type="text" :value="selectedLineup.SetposCommand" readonly />
                <button
                  id="setpos-copy"
                  type="button"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-original-title="Copy to clipboard"
                  @click="$helpers.CopyTextToClipboard(selectedLineup.SetposCommand)"
                >
                  <i class="material-icons">file_copy</i>
                </button>
              </div>
              <div v-if="selectedLineup && selectedLineup.Images && selectedLineup.Thumbnails">
                <LightBox :images="lineupImages" :show-light-box="false" ref="lightbox"></LightBox>
                <div class="image-list">
                  <img :src="lineupImages[0].src" @click="OpenLightbox" />
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
import Enums from "@/enums";
import RadarImageFeature from "@/views/RadarImageFeatures/RadarImageFeature.vue";
import Smoke from "@/components/RadarImageFeatures/Smoke.vue";
import SmokesOverview from "@/components/Overviews/SmokesOverview.vue";

export default {
  extends: RadarImageFeature,
  components: {
    Smoke,
    SmokesOverview
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      config: {
        sampleType: Enums.SampleType.Smoke,
        features: {
          zones: false,
          lineups: true,
          filterable: false
        }
      }
    };
  },
  methods: {
    ToggleLineups() {
      let newViewType =
        this.viewType == Enums.RadarViewTypes.Sample
          ? Enums.RadarViewTypes.Lineup
          : Enums.RadarViewTypes.Sample;
      this.SetViewType(newViewType);
    }
  },
  computed: {
    ShowBothTeams() {
      return this.viewType == Enums.RadarViewTypes.Lineup;
    }
  }
};
</script>

<style lang="scss">
</style>