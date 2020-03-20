<template>
  <div class="svg-wrapper">
    <svg
      v-if="true"
      :viewBox="'0 0 2000 2000'"
      id="svgView"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMin"
      oncontextmenu="return false;"
      ref="svgElement"
    >
      <defs>
        <pattern
          id="map-background-pattern-light"
          x="0"
          y="0"
          patternUnits="userSpaceOnUse"
          :height="imageSize"
          :width="imageSize"
        >
          <image
            x="0"
            y="0"
            v-bind="{'xlink:href':getRadarImage(this.map)}"
          />
        </pattern>
      </defs>

      <!-- <g v-if="mapInfo" id="svg-child"> -->
      <image
        class="background-map-img"
        v-bind="{'xlink:href':getRadarImage(this.map)}"
        id="map-image"
        @click="OnClickBackground"
        alt="Map Radar"
        x="0"
        y="0"
        :width="imageSize"
        :height="imageSize"
        :class="{tinted : tintBackground}"
      />

      <!-- Zones -->
      <g v-if="zoneType != 'Smoke'">
        <Zone
          v-for="zoneData in enrichedZones"
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
        <Target
          v-for="targetData in enrichedTargets"
          :key="targetData.ZoneId"
          :zoneType="zoneType"
          :targetData="targetData"
          :SetSelectedTarget="SetSelectedTarget"
          :fillColor="zonePerformanceColors[targetData.ZoneId]"
          :scaleFactor="1"
        />
      </g>

      <!-- Lineups (currently for smokes only)-->
      <g v-if="zoneType == 'Smoke'">
        <Lineup
          v-for="lineupData in enrichedLineups"
          :key="lineupData.LineupId"
          :lineupData="lineupData"
          :zoneData="targets.find(x=>x.TargetId == lineupData.TargetId)"
          :scaleFactor="scaleFactor"
          :SetSelectedLineup="SetSelectedLineup"
          :fillColor="lineupPerformanceColors[lineupData.LineupId]"
        />
      </g>

      <!-- Samples -->
      <g id="flashes-group">
        <Flash
          v-for="grenadeData in enrichedFlashGrenades"
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
          v-for="grenadeData in enrichedHeGrenades"
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
          v-for="killData in enrichedKills"
          :key="killData.Id"
          :killData="killData"
          :scaleFactor="scaleFactor"
          :showTrajectories="showTrajectories"
          :SetSelectedSample="SetSelectedSample"
          :isSelected="selectedSample && selectedSample.Id==killData.Id"
        />
      </g>

      <g id="molotovs-group">
        <Molotov
          v-for="grenadeData in enrichedMolotovs"
          :key="grenadeData.Id"
          :grenadeData="grenadeData"
          :scaleFactor="scaleFactor"
          :showTrajectories="showTrajectories"
          :SetSelectedSample="SetSelectedSample"
          :isSelected="selectedSample && selectedSample.Id==grenadeData.Id"
        />
      </g>

      <g id="smokes-group">
        <Smoke
          v-for="grenadeData in enrichedSmokeGrenades"
          :key="grenadeData.Id"
          :grenadeData="grenadeData"
          :scaleFactor="scaleFactor"
          :showTrajectories="showTrajectories"
          :SetSelectedSample="SetSelectedSample"
          :isSelected="selectedSample && selectedSample.Id==grenadeData.Id"
        />
      </g>

      <!-- </g> -->
    </svg>
    <div class="svg-custom-zoom-controls">
      <i class="material-icons" title="Zoom In" @click="Zoom(1)">zoom_in</i>
      <i class="material-icons" title="Reset Zoom" @click="Zoom(0)">clear</i>
      <i class="material-icons" title="Zoom Out" @click="Zoom(-1)">zoom_out</i>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import Enums from "@/enums";
import svgPanZoom from "svg-pan-zoom";

import Zone from "@/components/RadarImageFeatures/Zone.vue";
import Target from "@/components/RadarImageFeatures/Target.vue";
import Lineup from "@/components/RadarImageFeatures/Lineup.vue";
import Molotov from "@/components/RadarImageFeatures/Molotov.vue";
import Flash from "@/components/RadarImageFeatures/Flash.vue";
import HE from "@/components/RadarImageFeatures/HE.vue";
import Kill from "@/components/RadarImageFeatures/Kill.vue";
import Smoke from "@/components/RadarImageFeatures/Smoke.vue";
export default {
  components: {
    Zone,
    Target,
    Lineup,
    Molotov,
    Flash,
    HE,
    Kill,
    Smoke
  },
  mounted() {
    // assuming maps are quadratic, set svg height to the available width.
    this.$refs.svgElement.style.height =
      this.$refs.svgElement.clientWidth + "px";

    // Activate zoom
    var panZoomRadar = svgPanZoom("#svgView", {
      zoomScaleSensitivity: 0.6,
      controlIconsEnabled: false,
      minZoom: 1,
      maxZoom: 16,
      onZoom: newScale => {
        this.scaleFactor = newScale;
      }
    });

    this.svgReference = panZoomRadar;
  },
  data() {
    return {
      ready: false,
      scaleFactor: 1,
      svgReference: null,
      imageSize: 2000,
    };
  },
  props: [
    "map",

    "showTrajectories",
    "showCt",
    "viewType",
    "SetSelectedSample",
    "selectedSample",
    "SetSelectedZone",
    "SetSelectedTarget",
    "selectedZone",
    "SetSelectedLineup",
    "selectedLineup",
    "OnClickBackground",

    "zoneType",
    "zones",
    "lineups",
    "targets",
    "userPerformanceData",

    "flashGrenades",
    "heGrenades",
    "kills",
    "molotovs",
    "smokeGrenades"
  ],
  watch: {},
  methods: {    
    getRadarImage(map){
      var radarImages = require.context('@/assets/maps/radarimages', false, /\.png$/)
      return radarImages("./" + map + ".png");
    },
    Zoom: function(x) {
      if (x == 1) {
        this.svgReference.zoomIn();
        return;
      }

      if (x == -1) {
        this.svgReference.zoomOut();
        return;
      }

      if (x == 0) {
        this.svgReference.resetZoom();
        this.svgReference.resetPan();
      }
    },
    enrichTrajectory(element){      
        for (let i = 0; i < element.Trajectory.length; i++) {
          const trajectoryPoint = element.Trajectory[i];

          // Add PosPixel
          var vec = {'X':trajectoryPoint.X, 'Y':trajectoryPoint.Y};
          trajectoryPoint.PosPixel = this.$coordinateConverter.IngameToPixel(vec, this.map);
        }
        element.isEnriched = true;
    },
  },
  computed: {
    tintBackground() {
      return this.viewType == Enums.RadarViewTypes.Zone && this.selectedZone;
    },
    isReady(){
      return this.ready;
    },

    // enriched drawables
    enrichedZones(){
      if(!this.zones){
        return [];
      }
      this.zones.forEach(element => {
        if(element.isEnriched){
          return;
        }
        element.GeometryPixel = element.Geometry.map(vec=> this.$coordinateConverter.IngameToPixel(vec, this.map));
        element.isEnriched = true;
      });

      return this.zones;
    },

    enrichedLineups(){
      if(!this.lineups){
        return [];
      }
      this.lineups.forEach(element => {
        if(element.isEnriched){
          return;
        }
        let releasePosPixel = this.$coordinateConverter.IngameToPixel(element.ExampleGrenade.PlayerPos, this.map);
        let target = this.targets.find(x=>x.TargetId == element.TargetId);
        let targetPosPixel = this.$coordinateConverter.IngameToPixel(target.Center, this.map);
        element.Trajectory = [{'Time':0, 'PosPixel':releasePosPixel},{'Time':1,'PosPixel':targetPosPixel}]

      })
      return this.lineups;
    },

    enrichedTargets(){
      if(!this.targets){
        return [];
      }
      this.targets.forEach(element => {
        element.CenterPixel = this.$coordinateConverter.IngameToPixel(element.Center, this.map);
      })      
      return this.targets;
    },

    enrichedFlashGrenades(){
      if(!this.flashGrenades){
        return [];
      }
      this.flashGrenades.forEach(element => {
        if(element.isEnriched){
          return;
        }
        this.enrichTrajectory(element);
        element.Flasheds.forEach(flashed => {
          flashed.VictimPosPixel = this.$coordinateConverter.IngameToPixel(flashed.VictimPos, this.map);
        });
      });
      return this.flashGrenades;
    },

    enrichedHeGrenades(){
      if(!this.heGrenades){
        return [];
      }
      this.heGrenades.forEach(element => {
        if(element.isEnriched){
          return;
        }
        this.enrichTrajectory(element);
        element.Hits.forEach(hit => {
          hit.VictimPosPixel = this.$coordinateConverter.IngameToPixel(hit.VictimPos, this.map);
        });
      });
      return this.heGrenades;
    },

    // "kills",
    enrichedKills(){
      if(!this.kills){
        return [];
      }
      this.kills.forEach(element => {
        if(element.isEnriched){
          return;
        }
        element.PlayerPos.PosPixel = this.$coordinateConverter.IngameToPixel(element.PlayerPos, this.map);
        element.VictimPos.PosPixel = this.$coordinateConverter.IngameToPixel(element.VictimPos, this.map);
      });
      return this.kills;
    },
    
    enrichedMolotovs(){
      if(!this.molotovs){
        return [];
      }
      this.molotovs.forEach(element => {
        if(element.isEnriched){
          return;
        }
        this.enrichTrajectory(element);
        element.Victims.forEach(victim => {
          victim.Hits.forEach(hit => {
            hit.VictimPosPixel = this.$coordinateConverter.IngameToPixel(hit.VictimPos, this.map);
          });
        });
      });
      return this.molotovs;
    },

    enrichedSmokeGrenades(){
      if(!this.smokeGrenades){
        return [];
      }
      this.smokeGrenades.forEach(element => {
        if(element.isEnriched){
          return;
        }
        this.enrichTrajectory(element);
      });
      return this.smokeGrenades;
    },

    // "smokeGrenades"



    // Zones
    zonePerformanceColors() {
      const minOpacity = 0.15;
      const maxOpacity = 0.4;
      // FireNades
      const greenHitEnemyRatio = 0.25;
      const redHitEnemyRatio = 0;
      // Flashes
      const greenBlindDuration = 3000;
      const redBlindDuration = 0;
      // HEs
      const greenDamageDealt = 20;
      const redDamageDealt = 0;
      // Kills
      const greenKillDeathRatio = 2;
      const redKillDeathRatio = 0;

      let zonePerformanceColors = {};
      switch (this.zoneType) {
        case "FireNade":
          for (let zone of this.zones) {
            const performance = this.userPerformanceData.ZonePerformances[
              zone.ZoneId
            ];

            if (performance.SampleCount == 0) {
              zonePerformanceColors[zone.ZoneId] = this.$performanceColors.neutralColor(0.15);
            } else {
              let rounds = zone.IsCtZone
                ? this.userPerformanceData.CtRounds
                : this.userPerformanceData.TerroristRounds;
              let samplesRequiredForMaxOpacity = rounds / 10;
              let opacity = this.$performanceColors.opacityFromSampleSize(
                minOpacity,
                maxOpacity,
                performance.SampleCount,
                samplesRequiredForMaxOpacity
              );

              let hitEnemyRatio =
                performance.DamagingNadesCount /
                Math.max(1, performance.SampleCount);
              zonePerformanceColors[zone.ZoneId] = this
              .$performanceColors.performanceColorGivenOpacity(
                hitEnemyRatio,
                greenHitEnemyRatio,
                redHitEnemyRatio,
                opacity
              );
            }
          }
          break;

        case "Flash":
          for (let zone of this.zones) {
            const performance = this.userPerformanceData.ZonePerformances[
              zone.ZoneId
            ];
            if (performance.SampleCount == 0) {
              zonePerformanceColors[zone.ZoneId] = this.$performanceColors.neutralColor(0.15);
            } else {
              let rounds = zone.IsCtZone
                ? this.userPerformanceData.CtRounds
                : this.userPerformanceData.TerroristRounds;
              let samplesRequiredForMaxOpacity = rounds / 10;
              let opacity = this.$performanceColors.opacityFromSampleSize(
                minOpacity,
                maxOpacity,
                performance.SampleCount,
                samplesRequiredForMaxOpacity
              );

              let blindDuration =
                performance.TotalEnemyTimeFlashed / performance.SampleCount;
              zonePerformanceColors[zone.ZoneId] = this
              .$performanceColors.performanceColorGivenOpacity(
                blindDuration,
                greenBlindDuration,
                redBlindDuration,
                opacity
              );
            }
          }
          break;

        case "HE":
          for (let zone of this.zones) {
            const performance = this.userPerformanceData.ZonePerformances[
              zone.ZoneId
            ];
            if (performance.SampleCount == 0) {
              zonePerformanceColors[zone.ZoneId] = this.$performanceColors.neutralColor(0.15);
            } else {
              let rounds = zone.IsCtZone
                ? this.userPerformanceData.CtRounds
                : this.userPerformanceData.TerroristRounds;
              let opacity = this.$performanceColors.opacityFromSampleSize(
                minOpacity,
                maxOpacity,
                performance.SampleCount,
                rounds / 10
              );

              let avgDamage =
                performance.AmountHealth / performance.SampleCount;
              zonePerformanceColors[zone.ZoneId] = this
              .$performanceColors.performanceColorGivenOpacity(
                avgDamage,
                greenDamageDealt,
                redDamageDealt,
                opacity
              );
            }
          }
          break;

        case "Kill":
          for (let zone of this.zones) {
            const performance = this.userPerformanceData.ZonePerformances[zone.ZoneId];
            let sampleCount = performance.Deaths + performance.Kills;
            if (sampleCount == 0) {
              zonePerformanceColors[zone.ZoneId] = this.$performanceColors.neutralColor(0.15);
            } else {
              // Rounds are currently not computed, thus using fixed opacity for now. Could use matches instead of rounds
              // let opacity = this.$performanceColors.opacityFromSampleSize(0.15, 0.4, sampleCount, rounds/10)
              let opacity = 0.3;
              let kdRatio = performance.Kills / Math.max(1, performance.Deaths);
              zonePerformanceColors[zone.ZoneId] = this
              .$performanceColors.performanceColorGivenOpacity(
                kdRatio,
                greenKillDeathRatio,
                redKillDeathRatio,
                opacity
              );
            }
          }
          break;

        default:
      }
      return zonePerformanceColors;
    },
    lineupPerformanceColors() {
      let lineupPerformanceColors = {};
      for (let lineup of this.lineups) {
        let opacity = 1;
        const performance = this.userPerformanceData.LineupPerformances[
          lineup.LineupId
        ];
        // use default colors if no userperformance is available for this lineup
        if(typeof performance === "undefined"){
          lineupPerformanceColors[lineup.LineupId] = this.$performanceColors.neutralColor(opacity);
        }
        // if the user attempted the lineup, compute color
        else {
          let targetHitRatio =
            performance.Insides /
            Math.max(1, performance.Attempts);
            
          lineupPerformanceColors[lineup.LineupId] = this
          .$performanceColors.performanceColorGivenOpacity(
            targetHitRatio,
            1,
            0.8,
            opacity
          );
        }      
      }
      return lineupPerformanceColors;
    }
  }
};
</script>

<style lang="scss" scoped>
.svg-wrapper {
  position: relative;

  .svg-custom-zoom-controls {
    border-radius: 3px;
    position: absolute;
    bottom: 0;
    right: -15px;
    display: flex;
    background: $purple;
    padding: 5px;

    i {
      transition: 0.35s all;
      color: white;
      cursor: pointer;
      user-select: none;
      font-size: 32px;

      &:hover {
        color: $orange;
      }
    }
  }
}

#map-background-pattern-dark {
  filter: brightness(50%);
}
#svgView {
  margin-top: 40px;
  width: 100%;

  #map-image{
    z-index: 1000;
  }

  .tinted {
    opacity: 0.2;
  }
}
</style>
