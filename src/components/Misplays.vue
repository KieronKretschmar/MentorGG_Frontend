<template>
  <div class="misplays">
    <div class="bordered-box">
      <p>Your recent misplays</p>
    </div>

    <!-- <div v-if="!loadingComplete">
      <div class="bordered-box no-misplays">
        <AjaxLoader>Computing your recent misplays</AjaxLoader>
      </div>
    </div> -->

    <span>
      <div v-if="loadingComplete && !situationCollections.length" class="bordered-box no-misplays">        
        <NoDataAvailableDisplay @buttonClicked="LoadData(true)">
          You have no matches played with your steam-friends in the database :(. Wanna see somebody else's shitty ass random stats? 
          </NoDataAvailableDisplay>
      </div>
<!-- 
      <div
        v-else
        v-for="misplay in misplays"
        :key="misplay.OtherSteamId"
        class="misplay bordered-box"
      > -->
      <div class="misplay bordered-box">
        <div class="header">
          <div class="left">
            <span class="misplay-title">{{ "Unnecessary Reload" }}</span>
            
            <div class="misplay-explanation">
              It's a bad habit to reload your gun when you're not completely safe and still have many bullets left in the current mag. 
              Stop that shit. 
              If you <i>really</i> depend on having more than 20 bullets to kill somebody, go practice tapping and bursting on an aim map. 
            </div>
          </div>
          <!-- <hr /> -->
          <div class="right">
            <button
              class="button-variant-bordered"
              @click="ToggleMisplayVisibility(1)"
            >Show 12 Occurrences</button>
          </div>
        </div>
        <transition name="slide">
          <div class="body" v-if="true">
            <hr />

            <div class="row">
              <div class="col">
                Match
              </div>
              <div class="col centered">
                Round
              </div>
              <div class="col centered">
                Round time
              </div>
              <div class="col centered">
                Details
              </div>
              <div class="col centered">
                Watch Misplay
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="map-and-datetime"><span class="map">de_inferno</span><span class="datetime">24.8.2019, 12:34:27</span></div>
              </div>
              <div class="col centered">
                17
              </div>
              <div class="col centered">
                00:33
              </div>
              <div class="col centered">
                AK47 with 23/30 bullets
              </div>
              <div class="col centered">
                <i class="material-icons watch-match-icon" title="Watch in Browser" @click="Watch(selectedSample.MatchId, selectedSample.Round)">videocam</i>
              </div>
            </div>

            

            <div class="row">
              <div class="col">
                <div class="map-and-datetime"><span class="map">de_mirage</span><span class="datetime">24.8.2019, 15:32:1127</span></div>
              </div>
              <div class="col centered">
                14
              </div>
              <div class="col centered">
                01:22
              </div>
              <div class="col centered">
                glock with 18/20 bullets
              </div>
              <div class="col centered">
                <i class="material-icons watch-match-icon" title="Watch in Browser" @click="Watch(selectedSample.MatchId, selectedSample.Round)">videocam</i>
              </div>
            </div>

          </div>
        </transition>
      </div>
    </span>
  </div>
</template>

<script>
import MisplayCollection from "@/components/MisplayCollection.vue";

export default {
  mounted() {
    this.LoadData(false);
  },
  data() {
    return {
      situationCollections: [],
      loadingComplete: true,
    };
  },
  methods: {
    LoadData: function(isDemo) {
      this.loadingComplete = false;
      this.$api.getMisplays(isDemo ? "76561198033880857" : "").then(result => {
        this.situationCollections = result.data.SituationCollections;
        this.loadingComplete = true;
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        this.loadingComplete = true;
      });
    },
  }
};
</script>

<style lang="scss">
.misplays {
  margin-bottom: 20px;

  p {
    color: white;
    font-weight: 500;
  }

  .no-misplays {
    margin-top: 10px;
  }

}
</style>