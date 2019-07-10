<template>
    <svg v-if="this.mapInfo.CropOffsets"  :viewBox="viewBox" 
    id="svgView" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMin" oncontextmenu="return false;"
    >
        <g v-if="mapInfo" id="svg-child">
            <image v-if="mapInfo.ImageURL" v-bind="{'xlink:href':this.$api.resolveResource(this.mapInfo.ImageURL)}" id="map-image" @click="OnClickBackground"
            alt="Map Radar" x="0" y="0" width="1024" height="1024" />

            <!-- Zones -->
            <Zone v-for="zoneData in visibleZones" :key="zoneData.ZoneId" 
            :zoneType='zoneType' 
            :zoneData=zoneData 
            :SetSelectedZone=SetSelectedZone
            :isSelected="selectedZone && selectedZone.ZoneId==zoneData.ZoneId"
            :fillColor="zonePerformanceColors[zoneData.ZoneId]"
            />

            <!-- Samples -->
            <Flash v-for="grenadeData in visibleFlashGrenades" :key="grenadeData.Id" 
            :grenadeData=grenadeData 
            :zoomFactor=zoomFactor 
            :showTrajectories=showTrajectories
            :SetSelectedSample=SetSelectedSample
            :isSelected="selectedSample && selectedSample.Id==grenadeData.Id"
            /> 

            <HE v-for="grenadeData in visibleHEGrenades" :key="grenadeData.Id" 
            :grenadeData=grenadeData 
            :zoomFactor=zoomFactor 
            :showTrajectories=showTrajectories
            :SetSelectedSample=SetSelectedSample
            :isSelected="selectedSample && selectedSample.Id==grenadeData.Id"
            /> 
            
            <FireNade v-for="grenadeData in visibleFireNades" :key="grenadeData.Id" 
            :grenadeData=grenadeData 
            :zoomFactor=zoomFactor 
            :showTrajectories=showTrajectories
            :SetSelectedSample=SetSelectedSample
            :isSelected="selectedSample && selectedSample.Id==grenadeData.Id"
            /> 

        </g>
    </svg>

</template>

<script>

import Zone from "@/components/GrenadesAndKills/RadarImage/Zone.vue";
import FireNade from "@/components/GrenadesAndKills/RadarImage/FireNade.vue";
import Flash from "@/components/GrenadesAndKills/RadarImage/Flash.vue";
import HE from "@/components/GrenadesAndKills/RadarImage/HE.vue";
// import Kill from "@/components/GrenadesAndKills/RadarImage/Kill.vue";


export default {
  components: {
    Zone,
    FireNade,
    Flash,
    HE,
    // Kill,
  },
  mounted() {
  },
  data() {
    return {
      zoomFactor : 1,
  }}, 
  props:[
    'mapInfo', 

    'showTrajectories', 
    'showCt',
    'detailView',
    'SetSelectedSample',
    'selectedSample',
    'SetSelectedZone',
    'selectedZone',
    'OnClickBackground',

    'zoneType',
    'zones',
    'userPerformanceData',

    'fireNades', 
    'flashGrenades', 
    'heGrenades', 
    'kills', 
  ],
  computed: {
    viewBox() {
      return this.mapInfo.CropOffsets.MinX + ' ' 
      + this.mapInfo.CropOffsets.MinY + ' ' 
      + (this.mapInfo.CropOffsets.MaxX - this.mapInfo.CropOffsets.MinX) + ' ' 
      + (this.mapInfo.CropOffsets.MaxY - this.mapInfo.CropOffsets.MinY);
    },

    // Flashes
    activeFlashGrenades() {
      if(!this.flashGrenades) return [];
      if(this.selectedSample != null)  return [this.selectedSample];      
      return this.flashGrenades.filter(x => x.UserIsCt == this.showCt)
    },
    visibleFlashGrenades() {
      if(!this.detailView) return [];
      return this.activeFlashGrenades;
    },   

    // FireNades
    activeFireNades() {
      if(!this.fireNades) return [];
      if(this.selectedSample != null)  return [this.selectedSample];      
      return this.fireNades.filter(x => x.UserIsCt == this.showCt)
    },
    visibleFireNades() {
      if(!this.detailView) return [];
      return this.activeFireNades;
    },

    // HEs
    activeHEGrenades() {
      if(!this.heGrenades) return [];
      if(this.selectedSample != null)  return [this.selectedSample];      
      return this.heGrenades.filter(x => x.UserIsCt == this.showCt)
    },
    visibleHEGrenades() {
      if(!this.detailView) return [];
      return this.activeHEGrenades;
    },

    // Kills
    activeKills() {
      if(!this.kills) return [];
      if(this.selectedSample != null)  return [this.selectedSample];      
      return this.kills.filter(x => x.UserIsCt == this.showCt)
    },
    visibleKills() {
      if(!this.detailView) return [];
      return this.activeKills;
    },

    // Zones
    visibleZones() {
      if(this.detailView) return [];
      
      if(this.selectedZone != null){ 
        return this.zones.filter(x =>x.ParentZoneId == this.selectedZone.ZoneId);
      }
      else{
        return this.zones.filter(x => x.IsCtZone == this.showCt && x.Depth == 1 );
      }
    },
    zonePerformanceColors() {

      let zonePerformanceColors = {}
      switch(this.zoneType){
        case "Flash":
          for (let zoneId in this.userPerformanceData.DetonationZonePerformances){
            const element = this.userPerformanceData.DetonationZonePerformances[zoneId];          
            if(element.SampleCount == 0){
              zonePerformanceColors[zoneId] = this.$performanceColors.neutralColor(0.15)
            }
            else{
              let rounds = element.IsCtZone ? this.userPerformanceData.CtRounds :  this.userPerformanceData.TerroristRounds;
              let opacity = this.$performanceColors.opacityFromSampleSize(0.15, 0.4, element.SampleCount, element.IsCtZone, rounds/10)
              
              let blindDuration = element.FlashDuration / element.SampleCount;
              zonePerformanceColors[zoneId] = this.$performanceColors.performanceColorGivenOpacity(blindDuration, 4000, 500, opacity);
            }
          }
          break;

        case "HE":
          for (let zoneId in this.userPerformanceData.DetonationZonePerformances){
            const element = this.userPerformanceData.DetonationZonePerformances[zoneId];          
            if(element.SampleCount == 0){
              zonePerformanceColors[zoneId] = this.$performanceColors.neutralColor(0.15)
            }
            else{
              let rounds = element.IsCtZone ? this.userPerformanceData.CtRounds :  this.userPerformanceData.TerroristRounds;
              let opacity = this.$performanceColors.opacityFromSampleSize(0.15, 0.4, element.SampleCount, element.IsCtZone, rounds/10)
              
              let avgDamage = element.AmountHealth / element.SampleCount;
              zonePerformanceColors[zoneId] = this.$performanceColors.performanceColorGivenOpacity(avgDamage, 4000, 500, opacity);
            }
          }
          break;

        default:
      }
      return zonePerformanceColors;
    }
  }
}

</script>

<style>
#svgView {
  margin-top: 40px;
}
</style>
