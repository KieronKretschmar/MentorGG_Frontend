<template>
  <div class="view view-flashes">
    <div class="fixed-width-container">
      <div class="performances">
        <div
          v-for="(mapSummary,index) in mapSummaries"
          :key="index"
          class="performance"
          :class="{active: activeMap == 0}"
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
          </div>
        </div>
      </div>

      <div class="interactive-area">
        <div class="l bordered-box">
          <div class="tool-menu">
            <button class="button-variant-bordered" @click="OnShowTrajectories">Toggle Trajectories</button>

            <div v-if="zonesEnabled">
              <button class="button-variant-bordered" @click="SetDetailView()">Toggle Zones</button>
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
              :selectedZone="selectedZone"
              :SetSelectedZone="SetSelectedZone"
              :OnClickBackground="OnClickBackground"
              :detailView="detailView"
              :zoneType="'Flash'"
              :zones="zones.filter(x => x.ParentZoneId != -1)"
              :userPerformanceData="userPerformanceData"
              :flashGrenades="samples"
            />
          </div>
        </div>
        <div class="r bordered-box">
          <SideBar
            :sampleType="'Flash'"
            :selectedSample="selectedSample"
            :selectedZone="selectedZone"
            :userSelectedZonePerformance="userSelectedZonePerformance"
            :userTotalRounds="userTotalRounds"
            :globalTotalRounds="globalTotalRounds"
            :globalSelectedZonePerformance="globalSelectedZonePerformance"
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
import SideBar from "@/components/GrenadesAndKills/SideBar.vue";

export default {
  components: {
    CustomSelect,
    RadarImage,
    SideBar
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
      showTrajectories: true,
      mapSummaries: [],
      detailView: true,

      zonesEnabled: false,
      zones: [],
      userPerformanceData: [],
      globalPerformanceData: [],

      mapInfo: {},
      samples: [],

      selectedSample: null,
      selectedZone: null
    };
  },
  mounted() {
    this.LoadFlashOverviews(0); // matchCount is currently ignored for overviews by api
    this.LoadFlashes(this.activeMap, 10);
  },
  methods: {
    LoadFlashOverviews(matchCount) {
      this.$api.getFlashesOverview(matchCount).then(response => {
        this.mapSummaries = response.data.MapSummaries;
      });
    },
    LoadFlashes(map, matchCount) {
      this.$api.getFlashes(map, matchCount).then(response => {
        this.mapInfo = response.data.MapInfo;
        this.samples = response.data.Samples;
        this.zones = response.data.Zones;
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
      this.LoadFlashes(this.activeMap, this.matchCount);
    },
    OnClickBackground: function() {
      this.selectedSample = null;
      this.selectedZone = null;
    },
    OnActiveMapUpdated: function(map) {
      if (this.activeMap != map) {
        this.LoadFlashes(map, this.matchCount);
        this.activeMap = map;
      }
    },
    SetSelectedSample: function(id) {
      this.selectedSample = this.samples.find(x => x.Id == id);
    },
    SetSelectedZone: function(zoneId) {
      this.selectedZone = this.zones.find(x => x.ZoneId == zoneId);
    },
    SetDetailView() {
      this.selectedSample = null;
      this.selectedZone = null;
      this.detailView = !this.detailView;
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
      console.log("uSZP");
      console.log(this.selectedZone);
      console.log(this.selectedZone.ZoneId);
      return this.activeUserData.ZonePerformances[this.selectedZone.ZoneId];
    },
    userTotalRounds() {
      return this.showCt
        ? this.activeUserData.TotalCtRounds
        : this.activeUserData.TotalTerroristRounds;
    },
    globalSelectedZonePerformance() {
      console.log("gSZP");
      if (this.selectedZone == null) return null;
      console.log(this.selectedZone);
      console.log(this.selectedZone.ZoneId);
      
      return this.activeGlobalData.ZonePerformances[this.selectedZone.ZoneId];
    },
    globalTotalRounds() {
      return this.showCt
        ? this.activeGlobalData.TotalCtRounds
        : this.activeGlobalData.TotalTerroristRounds;
    }
  }
};
</script>

<style lang="scss">
.view-flashes {
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