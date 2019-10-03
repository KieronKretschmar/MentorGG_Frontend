<template>
  <div class="misplay bordered-box">
    <div class="header">
      <div class="left">
        <span class="misplay-title">Death by Bomb</span>
        
        <div class="misplay-explanation">
          Don't lose your life and equipment by dying to the bomb explosion at the end of the round.
          Try to be aware of your HP, route of escape and time left on the ticking bomb (enabling the 
          <a class="link link-inline" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=WJE9mtatb3I">
            10 second bomb warning
          </a>
          helps!)
        </div>
      </div>

      <div class="right">
        <button
          class="button-variant-bordered"
          @click="ToggleMisplayVisibility()"
        >Show {{situationCollection.Situations.length}} Occurrences</button>
      </div>
    </div>
    
    <transition name="slide">
      <div class="body" v-if="isVisible">
        <hr/>
        <div class="row">
          <div class="l">
            <div class="col">Match</div>
            <div class="col centered">Round</div>
            <div class="col centered">Lost equipment</div>
          </div>
          <div class="r">
            <div class="col centered">Watch Misplay</div>
          </div>
        </div>

        <div v-for="(situation, index) in situationCollection.Situations" 
        :key="index"
        
        class="row">
          <div class="l">
            <div class="col">
              <MatchHeader :map="situation.Map" :matchDate="situation.MatchDate"/>
            </div>
            <div class="col centered">{{situation.Round}}</div>
            <div class="col centered">{{situation.LostEqValue}}$</div>
          </div>
          <div class="r">
            <div class="col centered">
              <i 
                v-if="$helpers.DemoViewerAvailable(situation.Map)"
                class="material-icons watch-match-icon" 
                title="Watch in Browser" 
                @click="Watch(situation.MatchId, situation.Round, situation.Time - 4000)"
              >videocam</i>
            </div>
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

<style lang="scss" scoped>
.misplay{
  .body{
    .row{
      .col{
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(5)
        {
          width: 20%;
        }
      }
    }
  }
}
</style>