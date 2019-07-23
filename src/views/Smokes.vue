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
            :src="'https://test.mentor.gg/Content/Images/Overview/' + mapSummary.Map +'.jpg'"
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
            <button class="button-variant-bordered" @click="OnShowTrajectories">Toggle Trajectories</button>
            <div v-if="zonesEnabled">
              <button class="button-variant-bordered" @click="SetDetailView()">Toggle Lineups</button>
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
          <SideBar
            :sampleType="'Smoke'"
            :selectedSample="selectedSample"
            :selectedLineup="selectedLineup"
            :selectedZone="selectedZone"
            :detailView="detailView"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomSelect from "@/components/CustomSelect.vue";
import RadarImage from "@/components/GrenadesAndKills/RadarImage/RadarImage.vue";

export default {
  components: {
    CustomSelect,
    RadarImage,
  },
  data() {
    return {
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
    this.LoadSmokeOverviews(0); // matchCount is currently ignored for overviews by api
    this.LoadSmokes(this.activeMap, 10);
  },
  methods: {
    LoadSmokeOverviews(matchCount) {
      this.$api.getSmokesOverview(matchCount).then(response => {
        this.mapSummaries = response.data.MapSummaries;
      });
    },
    LoadSmokes(map, matchCount) {
      this.$api.getSmokes(map, matchCount).then(response => {
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
      });
    },
    OnShowTrajectories: function() {
      this.showTrajectories = !this.showTrajectories;
    },
    OnMatchCountUpdated: function() {
      this.LoadSmokes(this.activeMap, this.matchCount);
    },
    OnClickBackground: function() {
      this.selectedSample = null;
      this.selectedZone = null;
      this.selectedLineup = null;
    },
    OnActiveMapUpdated: function(map) {
      if (this.activeMap != map) {
        this.LoadSmokes(map, this.matchCount);
        this.activeMap = map;
      }
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
    visibleSamples() {
      if (!this.detailView){
        if(this.selectedLineup != null){
          console.log("hi")
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
      return this.zones;
    },
  }
};
</script>

<style lang="scss">
.view-smokes {
  margin-top: 40px;
}

.performances {
  display: flex;
  flex-direction: row;

  .performance {
    width: calc(100% / 7);
    margin-right: 20px;
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
    width: 65%;
    // display: flex;
    align-items: center;
    justify-content: space-between;

    .tool-menu {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .team-select {
      display: flex;
      margin: 0 20px;

      img {
        margin: 0 5px;
      }

      .t {
        transition: 0.35s;
        cursor: pointer;

        &.active,
        &:hover {
          filter: drop-shadow(0px 0px 4px rgb(168, 153, 102));
        }
      }

      .ct {
        transition: 0.35s;
        cursor: pointer;

        &.active,
        &:hover {
          filter: drop-shadow(0px 0px 4px rgb(61, 120, 204));
        }
      }
    }

    .match-count-select {
      width: 100%;
      max-width: 400px;
    }
  }

  .r {
    width: 30%;
  }
}
</style>