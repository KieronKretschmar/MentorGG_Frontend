<template>
  <div class="misplay bordered-box">
    <div class="header">
      <div class="left">
        <span class="misplay-title">Death by C4</span>
        
        <div class="misplay-explanation">
          Don't lose your life and equipment by dying to the C4 explosion at the end of the round.
          Try to be aware of your HP, route of escape and time left on the ticking bomb (enabling the 
          <a class="link" href="https://www.youtube.com/watch?v=WJE9mtatb3I">10 second bomb warning</a>
          helps!)
        </div>
      </div>
      <!-- <hr /> -->

      <div class="right">
        <button
          class="button-variant-bordered"
          @click="ToggleMisplayVisibility()"
        >Show {{situationCollection.Situations.length}} Occurrences</button>
      </div>
    </div>
    
    <transition name="slide">
      <div class="body" v-if="isVisible">
        <hr />
        <div class="row">
          <div class="col">
            Match
          </div>
          <div class="col centered">
            Round
          </div>
          <!-- <div class="col centered">
            Round time
          </div> -->
          <div class="col centered">
            Lost equipment
          </div>
          <div class="col centered">
            Watch Misplay
          </div>
        </div>

        <div v-for="(situation, index) in situationCollection.Situations" 
        :key="index"
        
        class="row">
          <div class="col">
            <div class="map-thumbnail">
              <img
                :src="$api.resolveResource('~/Content/Images/Overview/' + situation.Map +'.jpg')"
                :alt="situation.Map + ' Thumbnail'"
                :title="situation.Map"
              />
            </div>
            <div class="map-and-datetime">
              <span class="map">{{ situation.Map }}</span>
              <span class="datetime">{{ situation.MatchDate|formatDate }}</span>
            </div>
          </div>
          <div class="col centered">
            {{situation.Round}}
          </div>
          <!-- <div class="col centered">
            00:51
          </div> -->
          <div class="col centered">
            {{situation.LostEqValue}}$
          </div>
          <div class="col centered">
            <i class="material-icons watch-match-icon" title="Watch in Browser" @click="Watch(situation.MatchId, situation.Round)">videocam</i>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import SituationCollectionBase from "@/components/Situations/SituationBase.vue";

export default {
  extends: SituationCollectionBase,
  props: [
    "situationCollection",
    ],
  
  methods: {
    NavigateToSmokes: function(map, lineupId){
      let params = {
        map:map,
        lineupId:lineupId,
      }
      this.$router.push({ path: 'smokes', query: params });
    }
  }
}
</script>

<style lang="scss">

</style>