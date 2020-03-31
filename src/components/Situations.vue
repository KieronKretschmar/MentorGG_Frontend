<template>
<div class="misplays">
  <div class="bordered-box">
    <p>Misplays from your last match</p>
  </div>
    <div v-if="!loadingComplete" class="bordered-box no-misplays">
      <AjaxLoader>Analyzing playstyle</AjaxLoader>
    </div>
    <!-- <div v-if="!loadingComplete">
      <div class="bordered-box no-misplays">
        <AjaxLoader>Computing your recent misplays</AjaxLoader>
      </div>
    </div> -->

    <span>
      <div v-if="loadingComplete && !situationCollections.length" class="bordered-box no-misplays">        
        <p>No data available</p>
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
  props: ['steamId'],
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
    this.LoadData();
  },
  data() {
    return {
      situationCollections: [],
      loadingComplete: true,
    };
  },
  methods: {
    LoadData: function() {
      this.loadingComplete = false;
      this.situationCollections = [];      

      // make sure at least one match is available before loading
      if(this.$api.MatchSelector.Build().GetMostRecentMatchId())
      {
        this.loadingComplete = false;
        
        let params = {
          steamId: this.steamId//this.$api.User.GetSteamId(),
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
  },
  watch: {
    steamId: function(val) {      
      this.LoadData(false);
    }
  }
};
</script>

<style lang="scss">
.misplays {
  margin-bottom: 20px;

  p {
    color: white;
    font-weight: 500;
  }

  .no-misplays {
    margin-top: 10px;

    p {
      font-weight: 400;
    }
  }

}

//responsive
@media (max-width: 800px) {
  .misplays {

  p {
    color: white;
    font-weight: 500;
    text-align: center;
  }

}
}
</style>