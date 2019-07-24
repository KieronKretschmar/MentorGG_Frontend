<template>
  <svg
    v-if="this.mapInfo.CropOffsets"
    :viewBox="viewBox"
    id="svgView"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMin"
    oncontextmenu="return false;"
  >
    <g v-if="mapInfo" id="svg-child">
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
      <FireNade
        v-for="grenadeData in fireNades"
        :key="grenadeData.Id"
        :grenadeData="grenadeData"
        :zoomFactor="zoomFactor"
        :showTrajectories="showTrajectories"
        :SetSelectedSample="SetSelectedSample"
        :isSelected="selectedSample && selectedSample.Id==grenadeData.Id"
      />   

      <Flash
        v-for="grenadeData in flashGrenades"
        :key="grenadeData.Id"
        :grenadeData="grenadeData"
        :zoomFactor="zoomFactor"
        :showTrajectories="showTrajectories"
        :SetSelectedSample="SetSelectedSample"
        :isSelected="selectedSample && selectedSample.Id==grenadeData.Id"
      />

      <HE
        v-for="grenadeData in heGrenades"
        :key="grenadeData.Id"
        :grenadeData="grenadeData"
        :zoomFactor="zoomFactor"
        :showTrajectories="showTrajectories"
        :SetSelectedSample="SetSelectedSample"
        :isSelected="selectedSample && selectedSample.Id==grenadeData.Id"
      />

      <Kill
        v-for="killData in kills"
        :key="killData.Id"
        :killData="killData"
        :zoomFactor="zoomFactor"
        :showTrajectories="showTrajectories"
        :SetSelectedSample="SetSelectedSample"
        :isSelected="selectedSample && selectedSample.Id==killData.Id"
      />   

      <Smoke
        v-for="grenadeData in smokeGrenades"
        :key="grenadeData.Id"
        :grenadeData="grenadeData"
        :zoomFactor="zoomFactor"
        :showTrajectories="showTrajectories"
        :SetSelectedSample="SetSelectedSample"
        :isSelected="selectedSample && selectedSample.Id==grenadeData.Id"
      />
      
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
          :zoomFactor="zoomFactor"
          :SetSelectedLineup="SetSelectedLineup"
          :fillColor="lineupPerformanceColors[lineupData.LineupId]"
        />
      </g>
    </g>
  </svg>
</template>


<script>
import svgPanZoom from 'svg-pan-zoom';

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
    // var panZoomRadar = svgPanZoom('#svgView', {
    //   zoomScaleSensitivity: 0.6,
    //   minZoom: 1, 
    // });
  },
  data() {
    return {
      zoomFactor: 1,
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
        case "Flash":
          for (let zoneId in this.userPerformanceData.ZonePerformances) {
            const element = this.userPerformanceData.ZonePerformances[zoneId];
            if (element.SampleCount == 0) {
              zonePerformanceColors[
                zoneId
              ] = this.$performanceColors.neutralColor(0.15);
            } else {
              let rounds = element.IsCtZone
                ? this.userPerformanceData.CtRounds
                : this.userPerformanceData.TerroristRounds;
              console.log(this.userPerformanceData.TerroristRounds);
              let opacity = this.$performanceColors.opacityFromSampleSize(
                0.15,
                0.4,
                element.SampleCount,
                rounds / 10
              );

              let blindDuration = element.FlashDuration / element.SampleCount;
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
              zonePerformanceColors[
                zoneId
              ] = this.$performanceColors.neutralColor(0.15);
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
                4000,
                500,
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
              zonePerformanceColors[
                zoneId
              ] = this.$performanceColors.neutralColor(0.15);
            } else {
              // Rounds are currently not computed, thus using fixed opacity for now. Could use matches instead of rounds
              // let opacity = this.$performanceColors.opacityFromSampleSize(0.15, 0.4, sampleCount, rounds/10)
              let opacity = 0.3;
              let kdRatio = element.Kills / Math.max(1, sampleCount);
              zonePerformanceColors[zoneId] = 
              this.$performanceColors.performanceColorGivenOpacity(kdRatio,4000,500,opacity);
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
}
</style>
