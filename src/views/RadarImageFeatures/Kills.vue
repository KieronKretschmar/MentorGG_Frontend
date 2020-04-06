<template>
  <div class="view view-radarimage-feature view-kills">
    <div class="fixed-width-container">
      <KillsOverview :activeMap="activeMap" v-on:updatemap="OnActiveMapUpdated" />
      <div v-if="!samples.length && !loadingSamplesComplete" class="bordered-box no-data">
        <AjaxLoader>Loading Kills</AjaxLoader>
      </div>
      <div v-if="!samples.length && loadingSamplesComplete" class="bordered-box no-data">
        <DemoDataLoadRequest @buttonClicked="LoadSamples(activeMap, matchCount, true)">
          Either you don't have any matches on this map, or you are afk the entire round without killing or dying at all.
          <br />Wanna load someone else's kills?
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
              >Before Plant</button>
              <button
                v-else-if="activeFilterSettings.PlantStatus == 2"
                class="button-variant-bordered active"
                @click="SetPlantStatus(0)"
              >After Plant</button>
            </div>

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
                  </div>
                  <div class="legend-description">Your position when you died.</div>
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
                  >A zone's color corresponds to your K/D ratio inside it.</div>
                </div>
              </div>
            </div>
            <div id="analysis-tab" class="sidebar-tabcontent">
              <div v-if="selectedSample" class="selected-sample-stats">
                <h4>About this {{selectedSample.UserWinner ? "Kill" : "Death"}}</h4>

                <div class="stat-row">
                  <div class="stat-description">Round</div>
                  <div class="stat-content">{{selectedSample.Round}}</div>
                </div>

                <div
                  class="stat-row watch-row"
                  @click="Watch(selectedSample.MatchId, selectedSample.Round, selectedSample.Time - watchTimePrepend)"
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

                <div class="stat-row">
                  <div class="stat-description">C4 Status</div>
                  <div class="stat-content">
                    {{
                    this.activeFilterSettings.PlantStatus == 0 ? "Any"
                    : (this.activeFilterSettings.PlantStatus == 1 ? "Before Plant"
                    : "After Plant")
                    }}
                  </div>
                </div>                
              </div>

              <div v-if="!selectedSample" class="selected-zone-stats">
                <h4>Summary</h4>

                <div v-if="userSelectedZonePerformance" class="stat-row">
                  <div class="stat-description">K/D ratio</div>
                  <div
                    class="stat-content"
                  >{{(userSelectedZonePerformance.Kills / Math.max(1, userSelectedZonePerformance.Deaths)).toFixed(2)}}</div>
                </div>

                <div v-if="userSelectedZonePerformance" class="stat-row">
                  <div class="stat-description">Kills</div>
                  <div class="stat-content">{{userSelectedZonePerformance.Kills}}</div>
                </div>

                <div v-if="userSelectedZonePerformance" class="stat-row">
                  <div class="stat-description">Deaths</div>
                  <div class="stat-content">{{userSelectedZonePerformance.Deaths}}</div>
                </div>

                <div v-if="selectedZone == null" class="multikills">
                  <div class="stat-row">
                    <div class="stat-description">{{1}}k</div>
                    <div class="stat-content">{{multiKills[1] || 0}}</div>
                  </div>
                  <div class="stat-row">
                    <div class="stat-description">{{2}}k</div>
                    <div class="stat-content">{{multiKills[2] || 0}}</div>
                  </div>
                  <div class="stat-row">
                    <div class="stat-description">{{3}}k</div>
                    <div class="stat-content">{{multiKills[3] || 0}}</div>
                  </div>
                  <div class="stat-row">
                    <div class="stat-description">{{4}}k</div>
                    <div class="stat-content">{{multiKills[4] || 0}}</div>
                  </div>
                  <div class="stat-row">
                    <div class="stat-description">Aces</div>
                    <div class="stat-content">{{multiKills[5] || 0}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="selectedZone" class="practice-tab">
              <div v-if="selectedZone.VideoUrl != ''">
                <p>Advice for this position:</p>
                <VideoOverlay
                  v-if="selectedZone && selectedZone.VideoUrl != ''"
                  :url="selectedZone.VideoUrl"
                  useThumbnail
                  style="width: 100%; height: 100%;"
                ></VideoOverlay>
              </div>
              <div v-else>Advice for this Zone is not yet available.</div>
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
import Kill from "@/components/RadarImageFeatures/Kill.vue";
import KillsOverview from "@/components/Overviews/KillsOverview.vue";

export default {
  extends: RadarImageFeature,
  components: {
    Kill,
    KillsOverview
  },
  mounted() {
    this.init();

    this.activeFilterSettings = { PlantStatus: 0 };
  },
  data() {
    return {
      config: {
        sampleType: Enums.SampleType.Kill,
        features: {
          samples: true,
          zones: true,
          lineups: false,
          filterable: true
        }
      }
    };
  },
  methods: {
    // Override
    applyFilters(samples) {
      // Apply filters if active
      let filtersActive = this.activeFilterSettings.PlantStatus != 0;
      if (filtersActive) {
        // Below logic only works for one filter at a time
        return samples.filter(
          x =>
            JSON.stringify(x.FilterSettings) ==
            JSON.stringify(this.activeFilterSettings)
        );
      }
      // return all samples if no filter is selected
      return samples;
    },
    ToggleZones() {
      let newViewType =
        this.viewType == Enums.RadarViewTypes.Sample
          ? Enums.RadarViewTypes.Zone
          : Enums.RadarViewTypes.Sample;
      this.SetViewType(newViewType);
    },
    // Filterable
    SetPlantStatus(status) {
      this.$helpers.LogEvent(this, "PlantStatus", { label: status });

      this.activeFilterSettings.PlantStatus = status;
    }
  },
  computed: {
    // Override
    activeUserData() {
      // Return userData with matching killfiltersettings. Stringifying to compare by value
      return this.userPerformanceData.find(
        x =>
          JSON.stringify(x.FilterSettings) ==
          JSON.stringify(this.activeFilterSettings)
      ).ZonePerformances;
    },
    multiKills() {
      // Get all samples for the entire map and current setting (CT/T, filter)
      // Note: As of 10/02/19 we could also use this.visibleSamples(),
      // but I chose to compute explicitly because of possible future UI changes
      let allZoneSamples = this.applyFilters(
        this.samples.filter(x => x.UserIsCt == this.showCt)
      );

      // Compute multikills
      let roundKillsGroups = allZoneSamples
        .filter(kill => kill.VictimId != kill.PlayerId && !kill.TeamKill)
        .reduce(
          (p, c) => ({
            ...p,
            [`${c.MatchId}-${c.Round}`]: (p[`${c.MatchId}-${c.Round}`] || 0) + 1
          }),
          {}
        );
      let result = Object.values(roundKillsGroups).reduce(
        (p, c) => ({ ...p, [c]: (p[c] || 0) + 1 }),
        {}
      );
      return result; // {1: 30, 2: 12, 3: 4, 4: 1}
    }
  }
};
</script>

<style lang="scss">
</style>