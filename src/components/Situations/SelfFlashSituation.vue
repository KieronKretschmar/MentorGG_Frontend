<template>
  <div class="misplay bordered-box">
    <div class="header">
      <div class="left">
        <span class="misplay-title">Self-Flash</span>

        <div class="misplay-explanation">
          {{ randomText }}
          <!-- Save money on your next electricity bill by not watching straight into your own flashes. Easy, right? -->
          <!-- Look, we know you like flashes. But they are even more effective when not used against yourself. -->
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
        <hr />
        <div class="row">
          <div class="l">
            <div class="col">Match</div>
            <div class="col centered">Round</div>
            <div class="col centered">Time flashed</div>
            <!-- <div class="col centered">Angle to Crosshair</div> -->
            <div class="col centered">Died while blinded</div>
          </div>
          <div class="r">
            <div class="col centered">Watch Misplay</div>
          </div>
        </div>

        <div v-for="(situation, index) in situationCollection.Situations" :key="index" class="row">
          <div class="l">
            <div class="col">
              <MatchHeader :map="situation.Map" :matchDate="situation.MatchDate" />
            </div>
            <div class="col centered">{{situation.Round}}</div>
            <div class="col centered">{{situation.TimeFlashed}} ms</div>
            <!-- <div class="col centered">{{situation.AngleToCrosshair}}°</div> -->
            <div
              class="col centered"
            >{{IsBetween(situation.DeathTime, situation.Time, situation.Time + situation.TimeFlashed) ? "Yes" : "No"}}</div>
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
import SituationBase from "@/components/Situations/SituationBase.vue";

export default {
  extends: SituationBase,
  props: ["situationCollection"],
  mounted() {
    this.randomText = this.ChooseRandom([
      "Look, we know you like flashes. But they are even more effective when not used against yourself.",
      "Save money on your next electricity bill by not looking straight into your own flashes. Easy, right?"
    ]);
  },
  data() {
    return {
      randomText: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.misplay {
  .body {
    .row {
      .col {
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(5) {
          width: 20%;
        }
      }
    }
  }
}
</style>