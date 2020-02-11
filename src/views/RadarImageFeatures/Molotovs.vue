<template>
  <div class="view view-radarimage-feature view-molotovs">
    <div class="fixed-width-container">
      <MolotovsOverview      
      :activeMap="activeMap"
      v-on:updatemap = "OnActiveMapUpdated"/>

      <div v-if="!samples.length && !loadingSamplesComplete" class="bordered-box no-data">
        <AjaxLoader>Loading Molotovs</AjaxLoader>
      </div>
      <div v-if="!samples.length && loadingSamplesComplete" class="bordered-box no-data">
        <DemoDataLoadRequest @buttonClicked="LoadSamples(activeMap, matchCount, true)">
          Either you don't have any matches on this map, or you just don't use any molotovs at all.
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
              :viewType="viewType"
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
                  <div
                    class="legend-description"
                  >White markers represent Molotovs that did not deal damage to enemies.</div>
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
                  <div class="legend-description">Red markers indicate damaged enemies.</div>
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
                  </div>
                </div>
              </div>
            </div>
            <div id="analysis-tab" class="sidebar-tabcontent">
              <div v-if="selectedSample" class="selected-sample-stats">
                <h4>About this Molotov</h4>

                <div class="stat-row">
                  <div class="stat-description">Round</div>
                  <div class="stat-content">{{selectedSample.Round}}</div>
                </div>

                <div class="stat-row">
                  <div class="stat-description">Enemies Burned</div>
                  <div class="stat-content">{{selectedSample.Victims.length}}</div>
                </div>

                <div class="stat-row">
                  <div class="stat-description">Total damage to enemies:</div>
                  <div class="stat-content">{{selectedSample.EnemyAmountHealth}}</div>
                </div>

                <div class="stat-row">
                  <div class="stat-description">Kills</div>
                  <div class="stat-content">{{selectedSample.KilledEnemies}}</div>
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

              <div v-if="!selectedSample" class="selected-zone-stats">
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
                  >{{selectedZone == null ? activeMap : selectedZone.Name.replace("_", " ") }}</div>
                </div>

                <h4>Summary</h4>

                <div v-if="userSelectedZonePerformance" class="stat-row">
                  <div class="stat-description">Molotovs thrown</div>
                  <div class="stat-content">{{userSelectedZonePerformance.SampleCount}}</div>
                </div>

                <div v-if="userSelectedZonePerformance" class="stat-row">
                  <div class="stat-description">Hits</div>
                  <div
                    class="stat-content"
                  >{{(userSelectedZonePerformance.DamagingNadesCount / Math.max(1, userSelectedZonePerformance.SampleCount) * 100).toFixed(0)+'%'}}</div>
                </div>

                <div v-if="userSelectedZonePerformance" class="stat-row">
                  <div class="stat-description">Avg. damage</div>
                  <div
                    class="stat-content"
                  >{{(userSelectedZonePerformance.AmountHealth / Math.max(1, userSelectedZonePerformance.SampleCount)).toFixed(0)}}</div>
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
import Molotov from "@/components/RadarImageFeatures/Molotov.vue";
import MolotovsOverview from "@/components/Overviews/MolotovsOverview.vue";

export default {
  extends: RadarImageFeature,
  components: {
    Molotov,
    MolotovsOverview,
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      config: {
        sampleType: Enums.SampleType.Moltov,
        features: {
          "zones" : true,
          "lineups" : false,
          "filterablezones" : false,
        },
      },
    };
  },
  methods:{
    ToggleZones(){
      let newViewType = this.viewType == Enums.RadarViewTypes.Sample ? Enums.RadarViewTypes.Zone : Enums.RadarViewTypes.Sample;
      this.SetViewType(newViewType);
    }
  }
}
</script>

<style lang="scss">

</style>