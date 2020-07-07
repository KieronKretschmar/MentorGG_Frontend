<template>
  <div>
    <div v-if="mapSummaries == null" class="bordered-box no-data">
      <AjaxLoader>Computing summaries for each map</AjaxLoader>
    </div>
    <div class="performances">
      <div class="performance-inline">
        <div
          v-for="(mapSummary,map) in mapSummaries"
          :key="map"
          class="performance"
          :class="{active: activeMap == map}"
          @click="OnActiveMapUpdated(map)"
        >
          <img class="map-image" :src="$assetLoader.getMapPreview(map)" />
          <p class="map-name">{{map}}</p>

          <div class="z-layer-lo">
            <span class="split-title">UNUSED</span>
            <div class="split">
              <div class="ct">
                <img src="@/assets/ct_logo.png" />
                <span>{{(Math.max(0,1-mapSummary.UsageRatioAsCt)* 100).toFixed(0) }}%</span>
              </div>
              <div class="t">
                <img src="@/assets/t_logo.png" />
                <span>{{(Math.max(0,1-mapSummary.UsageRatioAsTerrorist)* 100).toFixed(0) }}%</span>
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
    </div>
  </div>
</template>

<script>
import Enums from "@/enums";
import OverviewBase from "@/components/Overviews/OverviewBase.vue";

export default {
  extends: OverviewBase,
  name: "SmokesOverview",
  data() {
    return {
      mapSummaries: null
    };
  },
  props: ["activeMap", "steamId"],
  mounted() {
    this.LoadOverviews(10000); // matchCount is currently ignored for overviews by api except for kills
  },
  methods: {
    LoadOverviews(matchCount) {
      this.mapSummaries = null;
      let params = {
        steamId: this.steamId,
        type: Enums.SampleType.Smoke
      };
      this.$api.getOverview(params, {}).then(response => {
        this.mapSummaries = response.data.MapSummaries;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>