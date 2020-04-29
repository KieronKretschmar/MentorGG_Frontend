<template>
  <div class="view view-radarimage-feature">
    <div class="fixed-width-container">
      <FlashesOverview :activeMap="activeMap" v-on:updatemap="OnActiveMapUpdated" />

      <div v-if="!loadingSamplesComplete" class="bordered-box no-data">
        <AjaxLoader>Loading Flashes</AjaxLoader>
      </div>
      <div v-else class="interactive-area">
        <div class="l bordered-box">
          <div class="tool-menu">
            <button
              class="button-variant-bordered"
              :class="{active: showTrajectories}"
              @click="OnShowTrajectories"
            >Trajectories</button>

            <button
              class="button-variant-bordered"
              :class="{active: viewType == Enums.RadarViewTypes.Zone}"
              @click="ToggleZones()"
              :disabled="!zonesEnabled"
            >Zones</button>

            <TeamToggle :isCt="showCt" @toggled="SetShowCt" />
          </div>
          <div>
            <RadarImage
              :map="activeMap"
              :showTrajectories="showTrajectories"
              :showCt="showCt"
              :SetSelectedSample="SetSelectedSample"
              :selectedSample="selectedSample"
              :selectedZone="selectedZone"
              :SetSelectedZone="SetSelectedZone"
              :OnClickBackground="OnClickBackground"
              :viewType="viewType"
              :zoneType="'Flash'"
              :zones="visibleZones"
              :userPerformanceData="userPerformanceData"
              :flashGrenades="visibleSamples"
            />
          </div>
        </div>
        <div class="r bordered-box">
          <div class="sidebar">
            <div id="analysis-tab" class="sidebar-tabcontent">
              <div v-if="selectedSample" class="selected-sample-stats">
                <h4>About this Flash</h4>

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
                  <div class="stat-description">Time enemies flashed:</div>
                  <div
                    class="stat-content"
                  >{{(selectedSample.Flasheds.filter(x=>!x.TeamAttack).reduce((a,b)=> a + b.TimeFlashed, 0) / 1000).toFixed(2) + "s"}}</div>
                </div>

                <div class="stat-row">
                  <div class="stat-description">Flashed Enemies died</div>
                  <div
                    class="stat-content"
                  >{{selectedSample.Flasheds.filter(x=>!x.TeamAttack && x.FlashAssist).length}}</div>
                </div>
              </div>

              <div v-if="!selectedSample" class="selection">
                <h4>Selection</h4>

                <div class="stat-row">
                  <div class="stat-description">Side</div>
                  <div class="stat-content">
                    <img v-if="showCt" class="ct" src="@/assets/ct_logo.png" />
                    <img v-else class="t" src="@/assets/t_logo.png" />
                  </div>
                </div>

                <div class="stat-row">
                  <div class="stat-description">Zone</div>
                  <div
                    class="stat-content"
                  >{{selectedZone == null ? activeMap : selectedZone.Name.split("_").join(" ") }}</div>
                </div>
              </div>

              <div v-if="!selectedSample" class="selected-zone-stats">
                <h4>Summary</h4>

                <div v-if="userSelectedZonePerformance" class="stat-row">
                  <div class="stat-description">Flashes thrown</div>
                  <div class="stat-content">{{userSelectedZonePerformance.SampleCount}}</div>
                </div>

                <div v-if="userSelectedZonePerformance" class="stat-row">
                  <div class="stat-description">Avg. Enemy flashed</div>
                  <div
                    class="stat-content"
                  >{{(userSelectedZonePerformance.TotalEnemyTimeFlashed / Math.max(1, userSelectedZonePerformance.SampleCount) / 1000).toFixed(2) + "s"}}</div>
                </div>

                <div v-if="userSelectedZonePerformance" class="stat-row">
                  <div class="stat-description">Avg. Team flashed</div>
                  <div
                    class="stat-content"
                  >{{(userSelectedZonePerformance.TotalTeamTimeFlashed / Math.max(1, userSelectedZonePerformance.SampleCount) / 1000).toFixed(2) + "s"}}</div>
                </div>

                <div v-if="userSelectedZonePerformance" class="stat-row">
                  <div class="stat-description">Avg. assisted Kills</div>
                  <div
                    class="stat-content"
                  >{{(userSelectedZonePerformance.EnemyFlashAssists / Math.max(1, userSelectedZonePerformance.SampleCount)).toFixed(2) }}</div>
                </div>
              </div>

              <div
                v-if="selectedSample"
                class="watch-button button-variant-bordered"
                @click="Watch(selectedSample.MatchId, selectedSample.Round, selectedSample.Time - watchTimePrepend)"
              >
                <div class="stat-description">Watch</div>
                <i class="material-icons watch-match-icon" title="Watch in Browser">videocam</i>
              </div>

              <div class="legend-tab">
                <h4>Legend</h4>
                
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
                          'Trajectory':[{'Time':0, 'PosPixel':{'X':5,'Y':22}},{'Time':1,'PosPixel':{'X':33,'Y':27}}],
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
                          'Trajectory':[{'Time':0, 'PosPixel':{'X':5,'Y':22}},{'Time':1,'PosPixel':{'X':33,'Y':27}}],
                          'Flasheds':[{'VictimPosPixel':{'X':42,'Y':12},'TimeFlashed':1000,'FlashAssist':false,'TeamAttack':false,'VictimIsAttacker':false}]
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
                          'Trajectory':[{'Time':0, 'PosPixel':{'X':5,'Y':22}},{'Time':1,'PosPixel':{'X':33,'Y':27}}],
                          'Flasheds':[{'VictimPosPixel':{'X':42,'Y':12},'TimeFlashed':3000,'FlashAssist':true,'TeamAttack':false,'VictimIsAttacker':false}]
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
                          'Trajectory':[{'Time':0,'X':5,'Y':22,'Z':0, 'PosPixel':{'X':5,'Y':22}},{'Time':1,'X':33,'Y':27,'Z':0, 'PosPixel':{'X':33,'Y':27}}],
                          'Flasheds':[
                          {'VictimPosPixel':{'X':42,'Y':12},'TimeFlashed':1000,'FlashAssist':false,'TeamAttack':false,'VictimIsAttacker':false},
                          {'VictimPosPixel':{'X':39,'Y':39},'TimeFlashed':1000,'FlashAssist':true,'TeamAttack':false,'VictimIsAttacker':false},]
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
                          'GeometryPixel': [{'X':10,'Y':10},{'X':50,'Y':10},{'X':50,'Y':50},{'X':30,'Y':50},{'X':30,'Y':30},{'X':10,'Y':30},{'X':10,'Y':10}],
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
import Flash from "@/components/RadarImageFeatures/Flash.vue";
import FlashesOverview from "@/components/Overviews/FlashesOverview.vue";
import TeamToggle from "@/components/RadarImageFeatures/TeamToggle.vue";

export default {
  extends: RadarImageFeature,
  components: {
    Flash,
    FlashesOverview,
    TeamToggle
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      config: {
        sampleType: Enums.SampleType.Flash,
        features: {
          zones: true,
          lineups: false,
          filterablezones: false
        }
      }
    };
  },
  methods: {
    ToggleZones() {
      let newViewType =
        this.viewType == Enums.RadarViewTypes.Sample
          ? Enums.RadarViewTypes.Zone
          : Enums.RadarViewTypes.Sample;
      this.SetViewType(newViewType);
    }
  }
};
</script>

<style lang="scss">
</style>