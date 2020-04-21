<template>
  <div class="view view-radarimage-feature view-hes">
    <div class="fixed-width-container">
      <HEsOverview :activeMap="activeMap" v-on:updatemap="OnActiveMapUpdated" />

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
              :class="{active: viewType == Enums.RadarViewTypes.Zone}"
              @click="ToggleZones()"
              :disabled="!zonesEnabled"
            >Zones</button>

            <TeamToggle
              :isCt="showCt"
              @toggled="SetShowCt"
            />

          </div>
          <div>
            <RadarImage
              v-if="samples.length"
              :map="activeMap"
              :showTrajectories="showTrajectories"
              :showCt="showCt"
              :SetSelectedSample="SetSelectedSample"
              :selectedSample="selectedSample"
              :selectedZone="selectedZone"
              :SetSelectedZone="SetSelectedZone"
              :OnClickBackground="OnClickBackground"
              :viewType="viewType"
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
                          'ReleasePosPixel':{'X':5,'Y':22},
                          'DetonationPosPixel':{'X':33,'Y':27},
                          'Trajectory':[{'Time':0, 'PosPixel':{'X':5,'Y':22}},{'Time':1,'PosPixel':{'X':33,'Y':27}}],
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
                          'ReleasePosPixel':{'X':5,'Y':22},
                          'DetonationPosPixel':{'X':33,'Y':27},
                          'Trajectory':[{'Time':0, 'PosPixel':{'X':5,'Y':22}},{'Time':1,'PosPixel':{'X':33,'Y':27}}],
                          'Hits':[{'VictimPosPixel':{'X':42,'Y':12},'AmountHealth':20,'Kill':false,'TeamAttack':false,'VictimIsAttacker':false}]
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
                          'ReleasePosPixel':{'X':5,'Y':22},
                          'DetonationPosPixel':{'X':33,'Y':27},
                          'Trajectory':[{'Time':0, 'PosPixel':{'X':5,'Y':22}},{'Time':1,'PosPixel':{'X':33,'Y':27}}],
                          'Hits':[{'VictimPosPixel':{'X':42,'Y':12},'AmountHealth':40,'Kill':true,'TeamAttack':false,'VictimIsAttacker':false}]
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
                          'ReleasePosPixel':{'X':5,'Y':22},
                          'DetonationPosPixel':{'X':33,'Y':27},
                          'Trajectory':[{'Time':0, 'PosPixel':{'X':5,'Y':22}},{'Time':1,'PosPixel':{'X':33,'Y':27}}],
                          'Hits':[
                          {'VictimPosPixel':{'X':42,'Y':12},'AmountHealth':15,'Kill':false,'TeamAttack':false,'VictimIsAttacker':false},
                          {'VictimPosPixel':{'X':39,'Y':39},'AmountHealth':35,'Kill':true,'TeamAttack':false,'VictimIsAttacker':false},]
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
                          'GeometryPixel': [{'X':10,'Y':10},{'X':50,'Y':10},{'X':50,'Y':50},{'X':30,'Y':50},{'X':30,'Y':30},{'X':10,'Y':30},{'X':10,'Y':10}],
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
            <div id="analysis-tab" class="sidebar-tabcontent">
              <div v-if="selectedSample" class="selected-sample-stats">
                <h4>About this HE</h4>

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
                  <div class="stat-description">Enemies killed</div>
                  <div
                    class="stat-content"
                  >{{selectedSample.Hits.filter(x=>!x.TeamAttack && x.Kill).length}}</div>
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
                  <div class="stat-description">HEs thrown</div>
                  <div class="stat-content">{{userSelectedZonePerformance.SampleCount}}</div>
                </div>

                <div v-if="userSelectedZonePerformance" class="stat-row">
                  <div class="stat-description">Avg. damage</div>
                  <div
                    class="stat-content"
                  >{{(userSelectedZonePerformance.AmountHealth / Math.max(1, userSelectedZonePerformance.SampleCount)).toFixed(0)}}</div>
                </div>

                <div v-if="userSelectedZonePerformance" class="stat-row">
                  <div class="stat-description">Avg. kills</div>
                  <div
                    class="stat-content"
                  >{{(userSelectedZonePerformance.Kills / Math.max(1, userSelectedZonePerformance.SampleCount)).toFixed(2)}}</div>
                </div>
              </div>
            </div>

            <div
              v-if="selectedSample"
              class="watch-button button-variant-bordered"
              @click="Watch(selectedSample.MatchId, selectedSample.Round, selectedSample.Time - watchTimePrepend)">
                <div class="stat-description">Watch</div>
                <i class="material-icons watch-match-icon" title="Watch in Browser">videocam</i>
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
import HE from "@/components/RadarImageFeatures/HE.vue";
import HEsOverview from "@/components/Overviews/HEsOverview.vue";
import TeamToggle from "@/components/RadarImageFeatures/TeamToggle.vue";

export default {
  extends: RadarImageFeature,
  components: {
    HE,
    HEsOverview,
    TeamToggle
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      config: {
        sampleType: Enums.SampleType.HE,
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