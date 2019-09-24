<template>
    <div class="view view-bombs">
        <div class="fixed-width-container">
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
                                   v-bind="{'xlink:href':this.$api.resolveResource(this.mapInfo.ImageURL)}" />
                        </pattern>
                    </defs>

                    <image class="background-map-img"
                           v-if="mapInfo.ImageURL"
                           v-bind="{'xlink:href':this.$api.resolveResource(this.mapInfo.ImageURL)}"
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

            </div>
        </div>
    </div>
</template>

<script>
    import simpleheat from "simpleheat";

    export default {
        components: {

        },
        data() {
            return {
                imageSize: 2000,


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
            this.LoadSamples(this.activeMap, this.matchCount, false);
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

                        //draw heatmap
                        var heatmap = simpleheat('heatmap_overlay');
                        heatmap = this.addPointsToHeatmap(heatmap, response.data.Samples);
                        //heatmap.add([100, 100, 1]);
                        heatmap.radius(10, 15);
                        //TODO find explanation for hardcoded value
                        var max_limit = response.data.Samples.length / 30;
                        heatmap.max(max_limit);
                        heatmap.draw();


                    })
                    .catch(error => {
                        console.error(error); // eslint-disable-line no-console
                        this.loadingSamplesComplete = true;
                    });
            },

            addPointsToHeatmap(heatmap, samples) {
                if (typeof samples !== 'undefined') {
                    for (var i = 0; i < samples.length; i++) {
                        heatmap.add([samples[i].PlantPosX, samples[i].PlantPosY, 1]);
                    }
                    return heatmap;
                }
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/sidebar.scss";

    .overlay {
        width: 100%;
        height: 100%;
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

    #map-background-pattern-dark {
        filter: brightness(50%);
    }

    #svgView {
        width: 100%;
        .tinted

    {
        opacity: 0.2;
    }
    }
</style>