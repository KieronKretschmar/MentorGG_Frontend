<template>
  <div class="misplay bordered-box">
    <div class="header">
      <div class="left">
        <span class="misplay-title">Failed Smokes</span>
        
        <div class="misplay-explanation">
          Throwing smoke lineups accurately and consistently is vital. 
          It seems like you have failed the lineup(s) below.
          Practice them, so that you and your team will not get caught off guard by a failed smoke and possibly give away rounds you might have otherwise won.
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
            Lineup
          </div>
          <div class="col centered">
            Watch Misplay
          </div>
        </div>

        <div v-for="(situation, index) in situationCollection.Situations" 
        :key="index"
        
        class="row">
          <div class="col">
            <div class="map-and-datetime"><span class="map">{{situation.Map}}</span><span class="datetime">{{situation.MatchDate}}</span></div>
          </div>
          <div class="col centered">
            {{situation.Round}}
          </div>
          <!-- <div class="col centered">
            00:51
          </div> -->
          <div class="col centered">
            <a class="cell link" @click="NavigateToSmokes(situation.Map, situation.LineupId)">{{ situation.LineupName }}</a>
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