<template>
  <div class="misplay bordered-box">
    <div class="header">
      <div class="left">
        <span class="misplay-title">Failed Smoke</span>
        
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
          <div class="l">
            <div class="col">Match</div>
            <div class="col centered">Round</div>
            <div class="col centered">Lineup</div>
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
            <div class="col centered">
              <a class="cell link" @click="NavigateToSmokes(situation.Map, situation.LineupId)">{{ situation.LineupName }}</a>
            </div>
          </div>
          <div class="r">
            <div class="col centered">
              <i
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