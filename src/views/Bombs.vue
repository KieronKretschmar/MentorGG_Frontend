<template>
  <div class="view view-bombs">
    <div class="fixed-width-container">
      <div class="bordered-box">
        <div class="tool_row">
          <CustomSelect v-model="rankSelect"
                        :options="rankOptions"
                        v-on:input="OnRankChange"
                        ></CustomSelect>
          <CustomSelect class="match-count-select"
                        v-model="matchCount"
                        :options="matchCountSelectOptions"
                        v-on:input="OnMatchCountUpdated"></CustomSelect>
          <CustomSelect v-model="mapSelect"
                        :options="mapSelectOptions"
                        v-on:input="OnMapChange"></CustomSelect>

          <span style="color:white">samples {{sampleCount}}</span>
          <span style="color:white">matches {{matchesAnalyzed}}</span>
         
        </div>
        <div class="svg-wrapper">
          <svg v-if="this.mapInfo.CropOffsets"
               :viewBox="'0 0 2000 2000'"
               id="svgView"
               xmlns="http://www.w3.org/2000/svg"
               preserveAspectRatio="xMidYMin"
               oncontextmenu="return false;"
               ref="svgElement">

            <defs>
              <pattern id="map-background-pattern-light"
                       x="0"
                       y="0"
                       patternUnits="userSpaceOnUse"
                       :height="imageSize"
                       :width="imageSize">
                <image x="0"
                       y="0"
                       v-bind="{'xlink:href':this.$api.getAsset(this.mapInfo.ImageURL)}" />
              </pattern>
            </defs>

            <image class="background-map-img"
                   v-if="mapInfo.ImageURL"
                   v-bind="{'xlink:href':this.$api.getAsset(this.mapInfo.ImageURL)}"
                   id="map-image"
                   alt="Map Radar"
                   x="0"
                   y="0"
                   :width="imageSize"
                   :height="imageSize"
                   :class="{tinted : !detailView && selectedZone}" />
          </svg>

          <canvas v-if="this.samples" id="heatmap_overlay" class="overlay"
                  x="0"
                  y="0"
                  :width="imageSize"
                  :height="imageSize">
          </canvas>

          <img :src="$api.getAsset(CurrentRankIconURL)" alt="CS:GO Rank Image" class="overlay"
               id="rankIconOverlay"/>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import simpleheat from "simpleheat";
  import CustomSelect from "@/components/CustomSelect.vue";


  export default {
    components: {
      CustomSelect
    },
    data() {
      return {
        imageSize: 2000,
        sampleCount: -1,
        matchesAnalyzed:-1,


        matchCount: 300,
        matchCountSelectOptions: {
          5: "Use last 5 matches",
          10: "Use last 10 matches",
          50: "Use last 50 matches",
          100: "Use last 100 matches",
          300: "Use last 300 matches",
          500: "Use last 500 matches",
          1000: "Use last 1000 matches",
          5000: "Use last 5000 matches",
          10000: "Use last 10000 matches",
        },

        rankSelect: 1,
        currentRank: 1, // rank whose data is currently shown
        rankOptions: {
          17: "Global Elite",
          16: "Supreme Master First Class",
          15: "Legendary Eagle Master",
          14: "Legendary Eagle",
          13: "Distinguished Master Guardian",
          12: "Master Guardian Elite",
          11: "Master Guardian 2",
          10: "Master Guardian 1",
          9: "Gold Nova 4",
          8: "Gold Nova 3",
          7: "Gold Nova 2",
          6: "Gold Nova 1",
          5: "Silver Elite Master",
          4: "Silver Elite",
          3: "Silver 4",
          2: "Silver 3",
          1: "Silver 2",
          0: "Silver 1",
        },

        mapSelect: "de_mirage",
        mapSelectOptions: {
          "de_mirage": "de_mirage",
          "de_cache": "de_cache",
          "de_inferno": "de_inferno",
          "de_dust2": "de_dust2",
          "de_overpass": "de_overpass",
          "de_train": "de_train",
        },

        loadingSamplesComplete: false,
        activeMap: "de_mirage",

        detailView: true,
        zonesEnabled: false,
        zones: [],
        zoneDescendants: [],


        mapInfo: {},
        samples: [],

        selectedSample: null,
        selectedZoneId: 0,
      };
    },

    mounted() {
      // boolean in query param might be received as string
      if (this.$route.query.map) {
        this.activeMap = this.$route.query.map;
      }
      if (this.$route.query.matchCount) {
        this.matchCount = this.$route.query.matchCount;
        this.matchCountSelectOptions[this.$route.query.matchCount] =
          "Use last " + this.$route.query.matchCount + " matches";
      }
      this.LoadSamplesByRank(this.activeMap, this.rankSelect, this.matchCount, false);

      //timer 
      let interval = setInterval(() => {
        this.rankSelect = (this.rankSelect + 1) % 19;
        this.LoadSamplesByRank(this.activeMap, this.rankSelect, this.matchCount, false);
      }, 12000);
    },

    methods: {
      LoadSamples(map, matchCount, isDemo) {
        this.samples = [];
        this.loadingSamplesComplete = false;
        this.$api
          .getAllBombPlants(map, matchCount)
          .then(response => {
            this.mapInfo = response.data.MapInfo;
            this.samples = response.data.Samples;
            if (this.zones.length == 0) {
              this.zonesEnabled = false;
            } else {
              this.zonesEnabled = true;
            }

            this.loadingSamplesComplete = true;
            this.redrawByRank();
          })
          .catch(error => {
            console.error(error); // eslint-disable-line no-console
            this.loadingSamplesComplete = true;
          });
      },


      LoadSamplesByRank(map, rankSelect, matchCount, isDemo) {
        this.samples = [];
        this.loadingSamplesComplete = false;
        this.$api
          .getAllBombPlantsByRank(map,rankSelect, matchCount)
          .then(response => {
            this.mapInfo = response.data.MapInfo;
            this.samples = response.data.Samples;
            if (this.zones.length == 0) {
              this.zonesEnabled = false;
            } else {
              this.zonesEnabled = true;
            }

            this.loadingSamplesComplete = true;

            this.sampleCount = response.data.Samples.length;
            this.matchesAnalyzed = response.data.RecentMatchesAnalyzedCount;
            this.redrawByRank();
            this.currentRank = rankSelect;
          })
          .catch(error => {
            console.error(error); // eslint-disable-line no-console
            this.loadingSamplesComplete = true;
          });
      },

      OnMapChange() {
        this.LoadSamplesByRank(this.mapSelect,this.rankSelect, this.matchCount, false);
        this.activeMap = this.mapSelect;
      },

      OnMatchCountUpdated: function () {
        this.LoadSamplesByRank(this.activeMap, this.rankSelect,this.matchCount, false);
      },

      OnRankChange() {
         this.LoadSamplesByRank(this.activeMap, this.rankSelect,this.matchCount, false);
      },

      redrawByRank() {
        let ranked_samples = this.FilterSamplesByRank(this.samples, this.rankSelect);

        this.drawSamplesToHeatmap(ranked_samples);
      },

      FilterSamplesByRank(samples, rank) {
        let ranked_samples = samples.filter(x => Math.round(x.AverageRank) == rank);
        return ranked_samples;
      },

      drawSamplesToHeatmap(samples) {
        let heatmap = simpleheat('heatmap_overlay');
        heatmap = this.addPointsToHeatmap(heatmap, samples);
        heatmap.radius(3, 3);

        //TODO find explanation for hardcoded value
        let max_limit = samples.length;
        max_limit = (max_limit < 3) ? 3 : max_limit;
        heatmap.max(max_limit);
        heatmap.draw();
      },

      addPointsToHeatmap(heatmap, samples) {
        if (typeof samples !== 'undefined') {
          for (let i = 0; i < samples.length; i++) {
            heatmap.add([samples[i].PlantPosX, samples[i].PlantPosY, 1]);
          }
          return heatmap;
        }
      },
    },
    computed: {
      
      CurrentRankIconURL() {
        let prefixedRank = this.currentRank > 9 ? this.currentRank + "" : "0" + this.currentRank;

        return this.$assetLoader.getMapPreview(prefixedRank);
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/sidebar.scss";

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .map-image {
    filter: blur(2px) grayscale(0%);
  }

  .map-image {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -2;
    transition: 0.35s;
    filter: blur(2px) grayscale(100%);
    top: 0;
    left: 0;
  }

  .svg-wrapper {
    position: relative;
  }

  .match-count-select {
    margin: 5px,5px,5px,5px;
  }

  #map-background-pattern-dark {
    filter: brightness(50%);
  }

  #svgView {
    width: 100%;
  }

  #rankIconOverlay{
    left:auto;
    top:auto;
    padding-top:15px;
    right:5%;
    max-width:15%;
    height:auto;
  }

  .tinted {
    opacity: 0.2;
  }

  .tool_row {
    display: inline-flex;
    width: calc(70% - 20px);
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    > * {
          margin-left: 20px;
        }
  }

  #heatmap_overlay{
    width: 100%;
    height: 100%;
  }

</style>