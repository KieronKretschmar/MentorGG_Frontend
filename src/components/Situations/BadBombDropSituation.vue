<template>
  <div class="misplay bordered-box">
    <div class="header">
      <div class="left">
        <span class="misplay-title">Dying with Bomb</span>
        
        <div class="misplay-explanation">
          Losing the bomb on the terrorist side makes it much harder to win the round. 
          Consider dropping the bomb before facing CTs as a terrorist, to give your teammates a chance to plant it.
          This is even more important when many teammates are alive but not close enough to get the refrag.
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
        <div class="row">
          <div class="col">
            Match
          </div>
          <div class="col centered">
            Round
          </div>
          <div class="col centered">
            Teammates Alive
          </div>
          <div class="col centered">
            Distance to closest teammate
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
          <div class="col centered">
            {{situation.TeammatesAlive}}
          </div>
          <div class="col centered">
            {{situation.ClosestTeammateDistance}} units
          </div>
          <div class="col centered">
            <i class="material-icons watch-match-icon" title="Watch in Browser" @click="Watch(situation.MatchId, situation.Round, situation.Time - 1000)">videocam</i>
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
        
        &:nth-child(1) {
          width: 20%;
        }

        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4) {
          width: 20%;
        }
      }
    }
  }
}
</style>