<template>
  <div class="misplay bordered-box">
    <div class="header">
      <div class="left">
        <span class="misplay-title">Team-Flash</span>
        
        <div class="misplay-explanation">
          Some people throw flashbangs without thinking of their teammates' positions. 
          Don't be one of those guys.
          <!-- Announcing flashes that might affect teammates does not only prevent them from having to look at a white screen, but also enables them to doublepeek with you after it pops. -->
          Briefly announcing "flashing X" via voice makes all the difference between pissed off teammates with white screens and strong doublepeeks right after the flash pops.
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
            Teammates flashed
          </div>
          <div class="col centered">
            Total time flashed
          </div>
          <div class="col centered">
            Died while blinded
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
            {{situation.TeammatesFlashed}}
          </div>
          <div class="col centered">
            {{situation.TimeFlashed}}
          </div>
          <div class="col centered">
            {{situation.DiedBlindCount}}
          </div>
          <div class="col centered">
            <i class="material-icons watch-match-icon" title="Watch in Browser" @click="Watch(situation.MatchId, situation.Round, situation.Time - 2000)">videocam</i>
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