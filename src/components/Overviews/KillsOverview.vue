<template>
  <div>
    <div v-if="mapSummaries == null" class="bordered-box no-data">
      <AjaxLoader>Computing summaries for each map</AjaxLoader>
    </div>
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
          :src="$api.resolveResource('~/Content/Images/Overview/' + mapSummary.Map +'.jpg')"
        />
        <p class="map-name">{{mapSummary.Map}}</p>

        <div class="z-layer-lo">
          <!-- TODO: Style -->
          <span class="split-title">MatchWin Rate</span>
          <div class="split">
            <span style="color:white;">{{(mapSummary.MatchWinFraction * 100).toFixed(0) }}%</span>
          </div>
        </div>

        <div class="z-layer-hi">
          <span class="split-title">ROUNDWIN RATE</span>
          <div class="split">
            <div class="ct">
              <img src="@/assets/ct_logo.png" />
              <span>{{(mapSummary.RoundWinFractionAsCt * 100).toFixed(0) }}%</span>
            </div>
            <div class="t">
              <img src="@/assets/t_logo.png" />
              <span>{{(mapSummary.RoundWinFractionAsTerrorist * 100).toFixed(0) }}%</span>
            </div>
          </div>

          <span class="split-title">KD RATIO</span>
          <div class="split">
            <div class="ct">
              <img src="@/assets/ct_logo.png" />
              <span>{{(mapSummary.KDAsCt).toFixed(2) }}</span>
            </div>
            <div class="t">
              <img src="@/assets/t_logo.png" />
              <span>{{(mapSummary.KDAsTerrorist).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OverviewBase from "@/components/Overviews/OverviewBase.vue";

export default {
  extends: OverviewBase,
  name: "KillsOverview",
  data() {
    return {
      mapSummaries: null
    };
  },
  props: ["activeMap"],
  mounted() {
    this.LoadOverviews(10000); // matchCount is currently ignored for overviews by api except for kills
  },
  methods: {
    LoadOverviews(matchCount) {
      this.mapSummaries = null;
      this.$api.getKillsOverview(matchCount).then(response => {
        this.mapSummaries = response.data.MapSummaries;
      });
    }
  }
};
</script>

<style  lang="scss" scoped>
</style>
