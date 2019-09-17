<template>
<div class="misplays">
  <div class="bordered-box">
    <p>Your recent misplays</p>
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
        <NoDataAvailableDisplay>
          No misplays found for you. Either you haven't uploaded any matches, or we could not detect a single mistake you made!
          </NoDataAvailableDisplay>
      </div>
      
      <div        
        v-for="situationCollection in situationCollections"
        :key="situationCollection.Name"
      >
        <component
        v-if="$options.components[situationCollection.Name + 'Situation'] && situationCollection.Situations.length"
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

export default {
  components: {
    BadBombDropSituation,
    DeathByBombSituation,
    SelfFlashSituation,
    ShotWhileMovingSituation,
    SmokeFailSituation,
    TeamFlashSituation,
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
      this.loadingComplete = false;
      this.$api.getMisplays(isDemo ? "76561198033880857" : "", 50).then(result => {
        console.log(result.data)
        this.situationCollections = result.data.SituationCollections;
        this.loadingComplete = true;
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        this.loadingComplete = true;
      });
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
  }

  .no-misplays {
    margin-top: 10px;
  }

}
</style>