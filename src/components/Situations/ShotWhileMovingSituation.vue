<template>
  <div class="misplay bordered-box">
    <div class="header">
      <div class="left">
        <span class="misplay-title">Shooting while running</span>
        
        <div class="misplay-explanation">
          Rifles shoot inaccurately when you move faster than a third of the maximum movement speed possible with the rifle.
          So unless the enemy is right in your face and accuracy doesn't matter, stop firing.

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
            <div class="col centered">Weapon</div>
            <div class="col centered">Died After</div>
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
              {{situation.WeaponAsString.replace('_silencer', '-s').toUpperCase()}}
              </div>
            <div class="col centered">
              {{IsBetween(situation.DeathTime, situation.Time, situation.Time + 2000) ? (situation.DeathTime - situation.Time) + " ms" : "/" }}
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