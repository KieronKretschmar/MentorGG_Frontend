<template>
  <div class="misplay bordered-box">
    <div class="header">
      <div class="left">
        <span class="misplay-title">{{ "Weird Bombplant" }}</span>
        
        <div class="misplay-explanation">
          Each bombsite offers different positions to plant the bomb. 
          Which position is the best strongly depends on how much map control and time you have. 
          On each bombsite, there are a few well-known spots that offer protection from certain angles when planting, while making it easy to interrupt defusing CTs.
          Another advantage of your teammates knowing the exact location of the bomb is, that it's easier to kill CTs defusing within a smoke.
        </div>
      </div>
      <!-- <hr /> -->
      <div class="right">
        <button
          class="button-variant-bordered"
          @click="ToggleMisplayVisibility(1)"
        >Show {{situationCollection.length}} Occurrences</button>
      </div>
    </div>
    
    <transition name="slide">
      <div class="body" v-if="true">
        <hr />
        <div class="row">
          <div class="l">
            <div class="col">Match</div>
            <div class="col centered">Round</div>
            <div class="col centered">Round time</div>
            <div class="col centered">Details</div>
          </div>
          <div class="r">
            <div class="col centered">Watch Misplay</div>
          </div>
        </div>

        <div class="row">
          <div class="l">
            <div class="col">
              <MatchHeader :map="situation.Map" :matchDate="situation.MatchDate"/>
            </div>
            <div class="col centered">12</div>
            <div class="col centered">00:51</div>
            <div class="col centered">Bomb defused while 2 teammates were alive.</div>
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
export default {
  props: [
    "situationCollection"
  ],

  data() {
    return {
      "isVisible" : false,
    }
  },
  
  methods: {
    ToggleMisplayVisibility: function(misplay) {
      this.IsVisible = !this.IsVisible;
      this.$forceUpdate();
    },
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