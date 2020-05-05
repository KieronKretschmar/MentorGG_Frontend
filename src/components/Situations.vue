<template>
<div class="misplays dashboard-unit">
  <h2 class="section-header">Misplays from the last match</h2>
    <div v-if="!loadingComplete" class="bordered-box no-misplays">
      <AjaxLoader>Analyzing playstyle</AjaxLoader>
    </div>
    
    <span>
      <div v-if="loadingComplete && !situationCollections.length" class="bordered-box no-misplays">
        <p>No Misplays found!</p>
        <p class="sub">Don't get too confident. We're adding more analysis soon, Then we'll really see where you're messing up.</p>
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

  p {
    font-weight: 500;
  }

  .misplay {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .no-misplays {
    padding: 20px;

    p {
      font-weight: 600;
      color: white;
      text-align: center;
      margin: 0;
    }

    .sub {
      font-weight: 400;
      font-size: 0.8em;

    }
  }

}

//responsive
@media (max-width: 800px) {
  .misplays {

  p {
    text-align: center;
  }

}
}
</style>