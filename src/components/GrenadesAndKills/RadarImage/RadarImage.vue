<template>
  <svg
    v-if="this.mapInfo.CropOffsets"
    :viewBox="viewBox"
    id="svgView"
    xmlns="http://www.w3.org/2000/svg"  
    preserveAspectRatio="xMidYMin"
    oncontextmenu="return false;"
    ref="svgElement"
  >
    <!-- <g v-if="mapInfo" id="svg-child"> -->
      <image
        v-if="mapInfo.ImageURL"
        v-bind="{'xlink:href':this.$api.resolveResource(this.mapInfo.ImageURL)}"
        id="map-image"
        @click="OnClickBackground"
        alt="Map Radar"
        x="0"
        y="0"
        width="1024"
        height="1024"
      />


      <!-- Samples -->
      <g id="firenades-group">
        <FireNade
          v-for="grenadeData in fireNades"
          :key="grenadeData.Id"
          :grenadeData="grenadeData"
          :scaleFactor="scaleFactor"
          :showTrajectories="showTrajectories"
          :SetSelectedSample="SetSelectedSample"
          :isSelected="selectedSample && selectedSample.Id==grenadeData.Id"
        />   
      </g>

      <g id="flashes-group">
        <Flash
          v-for="grenadeData in flashGrenades"
          :key="grenadeData.Id"
          :grenadeData="grenadeData"
          :scaleFactor="scaleFactor"
          :showTrajectories="showTrajectories"
          :SetSelectedSample="SetSelectedSample"
          :isSelected="selectedSample && selectedSample.Id==grenadeData.Id"
        />
      </g>

      <g id="hes-group">
        <HE
          v-for="grenadeData in heGrenades"
          :key="grenadeData.Id"
          :grenadeData="grenadeData"
          :scaleFactor="scaleFactor"
          :showTrajectories="showTrajectories"
          :SetSelectedSample="SetSelectedSample"
          :isSelected="selectedSample && selectedSample.Id==grenadeData.Id"
        />
      </g>

      <g id="kills-group">
        <Kill
          v-for="killData in kills"
          :key="killData.Id"
          :killData="killData"
          :scaleFactor="scaleFactor"
          :showTrajectories="showTrajectories"
          :SetSelectedSample="SetSelectedSample"
          :isSelected="selectedSample && selectedSample.Id==killData.Id"
        />   
      </g>

      <g id="smokes-group">
        <Smoke
          v-for="grenadeData in smokeGrenades"
          :key="grenadeData.Id"
          :grenadeData="grenadeData"
          :scaleFactor="scaleFactor"
          :showTrajectories="showTrajectories"
          :SetSelectedSample="SetSelectedSample"
          :isSelected="selectedSample && selectedSample.Id==grenadeData.Id"
        />
      </g>
      
      <!-- Zones -->
      <g v-if="zoneType != 'Smoke'">
        <Zone v-for="zoneData in zones"
          :key="zoneData.ZoneId"
          :zoneType="zoneType"
          :zoneData="zoneData"
          :SetSelectedZone="SetSelectedZone"
          :fillColor="zonePerformanceColors[zoneData.ZoneId]"
          :isSelected="selectedZone && selectedZone.ZoneId == zoneData.ZoneId"
        />
      </g>
      <!-- Smoke Zones (Targets) -->
      <g v-if="zoneType == 'Smoke'">
        <Target v-for="zoneData in zones"
          :key="zoneData.ZoneId"
          :zoneType="zoneType"
          :zoneData="zoneData"
          :SetSelectedZone="SetSelectedZone"
          :fillColor="zonePerformanceColors[zoneData.ZoneId]"
          :scaleFactor="1"
        />
      </g>

      <!-- Lineups (currently for smokes only)-->
      <g v-if="zoneType == 'Smoke'">
        <Lineup v-for="lineupData in lineups"
          :key="lineupData.LineupId"
          :lineupData="lineupData"
          :zoneData="zones.find(x=>x.ZoneId == lineupData.TargetId)"
          :scaleFactor="scaleFactor"
          :SetSelectedLineup="SetSelectedLineup"
          :fillColor="lineupPerformanceColors[lineupData.LineupId]"
        />
      </g>
    <!-- </g> -->
  </svg>
</template>


<script>
import svgPanZoom from 'svg-pan-zoom';
import Vue from 'vue';

import Zone from "@/components/GrenadesAndKills/RadarImage/Zone.vue";
import Target from "@/components/GrenadesAndKills/RadarImage/Target.vue";
import Lineup from "@/components/GrenadesAndKills/RadarImage/Lineup.vue";
import FireNade from "@/components/GrenadesAndKills/RadarImage/FireNade.vue";
import Flash from "@/components/GrenadesAndKills/RadarImage/Flash.vue";
import HE from "@/components/GrenadesAndKills/RadarImage/HE.vue";
import Kill from "@/components/GrenadesAndKills/RadarImage/Kill.vue";
import Smoke from "@/components/GrenadesAndKills/RadarImage/Smoke.vue";
export default {
  components: {
    Zone,
    Target,
    Lineup,
    FireNade,
    Flash,
    HE,
    Kill,
    Smoke,
  },
  mounted() {
    // assuming maps are quadratic, set svg height to the available width.
    this.$refs.svgElement.style.height = this.$refs.svgElement.clientWidth;
    // Activate zoom
    var panZoomRadar = svgPanZoom('#svgView', {
      zoomScaleSensitivity: 0.6,
      controlIconsEnabled: true,
      minZoom: 1, 
      maxZoom: 16,
      onZoom: (newScale) => {
        this.scaleFactor = newScale;
      }
    });
  },
  data() {
    return {
      scaleFactor: 1,
    };
  },
  props: [
    "mapInfo",

    "showTrajectories",
    "showCt",
    "detailView",
    "SetSelectedSample",
    "selectedSample",
    "SetSelectedZone",
    "selectedZone",
    "SetSelectedLineup",
    "selectedLineup",
    "OnClickBackground",

    "zoneType",
    "zones",
    "lineups",
    "userPerformanceData",

    "fireNades",
    "flashGrenades",
    "heGrenades",
    "kills",
    "smokeGrenades",
  ],
  watch: {
  },
  methods: {
  },
  computed: {
    viewBox() {
      return (
        this.mapInfo.CropOffsets.MinX +
        " " +
        this.mapInfo.CropOffsets.MinY +
        " " +
        (this.mapInfo.CropOffsets.MaxX - this.mapInfo.CropOffsets.MinX) +
        " " +
        (this.mapInfo.CropOffsets.MaxY - this.mapInfo.CropOffsets.MinY)
      );
    },

    // Zones    
    zonePerformanceColors() {
      let zonePerformanceColors = {};
      switch (this.zoneType) {
        case "FireNade":
          for (let zoneId in this.userPerformanceData.ZonePerformances) {
            const element = this.userPerformanceData.ZonePerformances[zoneId];
            if (element.SampleCount == 0) {
              zonePerformanceColors[zoneId] = this.$performanceColors.neutralColor(0.15);
            } else {
              let rounds = element.IsCtZone
                ? this.userPerformanceData.CtRounds
                : this.userPerformanceData.TerroristRounds;
              let opacity = this.$performanceColors.opacityFromSampleSize(
                0.15,
                0.4,
                element.SampleCount,
                rounds / 10
              );

              let hitEnemyRatio = element.DamagingNadesCount / Math.max(1, element.SampleCount);
              zonePerformanceColors[zoneId] = this.$performanceColors.performanceColorGivenOpacity(
                hitEnemyRatio,
                0.25,
                0,
                opacity
              );
            }
          }
          break;

        case "Flash":
          for (let zoneId in this.userPerformanceData.ZonePerformances) {
            const element = this.userPerformanceData.ZonePerformances[zoneId];
            if (element.SampleCount == 0) {
              zonePerformanceColors[zoneId] = this.$performanceColors.neutralColor(0.15);
            } else {
              let rounds = element.IsCtZone
                ? this.userPerformanceData.CtRounds
                : this.userPerformanceData.TerroristRounds;
              let opacity = this.$performanceColors.opacityFromSampleSize(
                0.15,
                0.4,
                element.SampleCount,
                rounds / 10
              );

              let blindDuration = element.TotalEnemyFlashDuration / element.SampleCount;
              zonePerformanceColors[
                zoneId
              ] = this.$performanceColors.performanceColorGivenOpacity(
                blindDuration,
                4000,
                500,
                opacity
              );
            }
          }
          break;

        case "HE":
          for (let zoneId in this.userPerformanceData.ZonePerformances) {
            const element = this.userPerformanceData.ZonePerformances[zoneId];
            if (element.SampleCount == 0) {
              zonePerformanceColors[zoneId] = this.$performanceColors.neutralColor(0.15);
            } else {
              let rounds = element.IsCtZone
                ? this.userPerformanceData.CtRounds
                : this.userPerformanceData.TerroristRounds;
              let opacity = this.$performanceColors.opacityFromSampleSize(
                0.15,
                0.4,
                element.SampleCount,
                rounds / 10
              );

              let avgDamage = element.AmountHealth / element.SampleCount;
              zonePerformanceColors[
                zoneId
              ] = this.$performanceColors.performanceColorGivenOpacity(
                avgDamage,
                20,
                0,
                opacity
              );
            }
          }
          break;

        case "Kill":
          for (let zoneId in this.userPerformanceData.ZonePerformances) {
            const element = this.userPerformanceData.ZonePerformances[zoneId];
            let sampleCount = element.Deaths + element.Kills;
            if (sampleCount == 0) {
              zonePerformanceColors[zoneId] = this.$performanceColors.neutralColor(0.15);
            } else {
              // Rounds are currently not computed, thus using fixed opacity for now. Could use matches instead of rounds
              // let opacity = this.$performanceColors.opacityFromSampleSize(0.15, 0.4, sampleCount, rounds/10)
              let opacity = 0.3;
              let kdRatio = element.Kills / Math.max(1, element.Deaths);
              zonePerformanceColors[zoneId] = 
              this.$performanceColors.performanceColorGivenOpacity(kdRatio,2,0,opacity);
            }
          }
          break;

        default:
      }
      return zonePerformanceColors;
    },
    lineupPerformanceColors() {
      let lineupPerformanceColors = {};
      for (let lineupId in this.userPerformanceData.LineupPerformances) {
        const element = this.userPerformanceData.LineupPerformances[lineupId];
        let opacity = 1;
        if (element.TotalAttemptsCount == 0) {
          lineupPerformanceColors[lineupId] = this.$performanceColors.neutralColor(opacity);
        } else {
          let targetHitRatio = element.SuccessfulAttemptsCount / Math.max(1, element.TotalAttemptsCount);
          lineupPerformanceColors[lineupId] = this.$performanceColors.performanceColorGivenOpacity(targetHitRatio,1,0.8,opacity);
        }
      }
      return lineupPerformanceColors;
    }
  }
};
</script>

<style>
#svgView {
  margin-top: 40px;
  width: 100%;
}
</style>
