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
</template>

<script>
import OverviewBase from "@/components/Overviews/OverviewBase.vue";

export default {
  extends: OverviewBase,
  name: "SmokesOverview",
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
      this.$api.getSmokesOverview(matchCount).then(response => {
        this.mapSummaries = response.data.MapSummaries;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.performances {
  .performance {
    &.active,
    .split {
      .ct,
      .t,
      .unisex {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>