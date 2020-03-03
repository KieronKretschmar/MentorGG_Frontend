<template>
<div class="misplays">
  <div class="bordered-box">
    <p>Misplays from your last match</p>
  </div>
    <div v-if="!loadingComplete" class="bordered-box no-misplays">
      <AjaxLoader>Analyzing your playstyle</AjaxLoader>
    </div>
    <!-- <div v-if="!loadingComplete">
      <div class="bordered-box no-misplays">
        <AjaxLoader>Computing your recent misplays</AjaxLoader>
      </div>
    </div> -->

    <span>
      <div v-if="loadingComplete && !situationCollections.length" class="bordered-box no-misplays">        
        <DemoDataLoadRequest @buttonClicked="LoadData(true)">
          No misplays found for you. Either you haven't uploaded any matches, or we could not detect a single mistake you made!
          <br>
          Wanna see somebody else's misplays? 
        </DemoDataLoadRequest>
      </div>
      
      <div        
        v-for="situationCollection in situationCollections"
        :key="situationCollection.Name"
      >
        <component
        v-if="$options.components[situationCollection.Name + 'Situation'] && situationCollection.Misplays.length"
        :is="situationCollection.Name + 'Situation'"
        :situationCollection="situationCollection"
        class="misplay bordered-box"
        
        />
      </div>
    </span>
</div>
</template>

<script>
import BadBombDropSituation from "@/components/Situations/BadBombDropSituation.vue";
import DeathByBombSituation from "@/components/Situations/DeathByBombSituation.vue";
import SelfFlashSituation from "@/components/Situations/SelfFlashSituation.vue";
import ShotWhileMovingSituation from "@/components/Situations/ShotWhileMovingSituation.vue";
import SmokeFailSituation from "@/components/Situations/SmokeFailSituation.vue";
import TeamFlashSituation from "@/components/Situations/TeamFlashSituation.vue";
import UnnecessaryReloadSituation from "@/components/Situations/UnnecessaryReloadSituation.vue";

export default {
  components: {
    BadBombDropSituation,
    DeathByBombSituation,
    SelfFlashSituation,
    ShotWhileMovingSituation,
    SmokeFailSituation,
    TeamFlashSituation,
    UnnecessaryReloadSituation,
  },
  mounted() {
    this.LoadData(false);
  },
  data() {
    return {
      situationCollections: [],
      loadingComplete: true,
    };
  },
  methods: {
    LoadData: function(isDemo) {
      // make sure at least one match is available before loading
      if(this.$api.MatchSelector.Build().GetMostRecentMatchId())
      {
        this.loadingComplete = false;
        
        let params = {
          steamId: this.$api.User.GetSteamId(),
        };

        this.$api.getSingleMatchMisplays(params).then(result => {
          this.situationCollections = result.data.SituationCollections;
          this.loadingComplete = true;
        })
        .catch(error => {
          console.error(error); // eslint-disable-line no-console
          this.loadingComplete = true;
        });
      }      
    },
  }
};
</script>

<style lang="scss">
.misplays {
  margin-bottom: 20px;

  p {
    color: white;
    font-weight: 500;
    text-align: center;
  }

  .no-misplays {
    margin-top: 10px;
  }

}
</style>