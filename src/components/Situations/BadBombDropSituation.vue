<template>
  <div class="misplay bordered-box">
    <div class="header">
      <div class="left">
        <span class="misplay-title">Dying with Bomb</span>
        
        <div class="misplay-explanation">
          Losing the bomb on the terrorist side makes it much harder to win the round. 
          Consider dropping the bomb before facing CTs as a terrorist, to give your teammates a chance to plant it.
          This is even more important when your teammates are too far away for a refrag.
        </div>
      </div>

      <div class="right">
        <button
          class="button-variant-bordered"
          @click="ToggleMisplayVisibility()"
        >Show {{situationCollection.Misplays.length}} Occurrences</button>
      </div>
    </div>
    
    <transition name="slide">
      <div class="body" v-if="isVisible">
        <hr />
        <div class="row">
          <div class="l">
            <div class="col">Match</div>
            <div class="col centered">Round</div>
            <div class="col centered">Teammates Alive</div>
            <div class="col centered">Distance to closest teammate</div>
          </div>
          <div class="r">
            <div class="col centered">Watch Misplay</div>
          </div>
        </div>

        <div v-for="(situation, index) in situationCollection.Misplays" :key="index" class="row">
          <div class="l">
            <div class="col">
              <MatchHeader :map="situation.Map" :matchDate="situation.MatchDate"/>
            </div>
            <div class="col centered">{{situation.Round}}</div>
            <div class="col centered">{{situation.TeammatesAlive}}</div>
            <div class="col centered">{{situation.ClosestTeammateDistance}} units</div>
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