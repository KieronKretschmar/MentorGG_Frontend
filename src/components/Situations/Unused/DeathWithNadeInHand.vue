<template>
  <div class="misplay bordered-box">
    <div class="header">
      <div class="left">
        <span class="misplay-title">Death with grenade in hand</span>
        
        <div class="misplay-explanation">
          Most of the time dying while having a grenade in hand is avoidable. 
          You should use keybinds for your nades so you can select them much faster, if you haven't already done that.
          Also you should only take the nade in your hand if you either expect to throw it right away or are 100% sure that you are safe.
          Don't let yourself get caught pants down! 
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
            Type
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
          <div class="col centered">
            {{situation.NadeType}}
          </div>
          <div class="col centered">
            <i class="material-icons watch-match-icon" title="Watch in Browser" @click="Watch(situation.MatchId, situation.Round, situation.Time - 4000)">videocam</i>
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