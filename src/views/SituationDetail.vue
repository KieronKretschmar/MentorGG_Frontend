<template>
  <div class="view view-situation-detail">
    <div class="fixed-width-container">
      <component
        v-if="situationData"
        v-bind:is="situationData.component"
        :staticSituationData="situationData"
      ></component>
    </div>
  </div>
</template>

<script>
import SituationLoader from "@/SituationLoader";
import Enums from "@/enums";

export default {
  mounted() {
    this.situationData =
      SituationLoader.getSituationData(this.$route.params.type) ||
      SituationLoader.getSituationData(Enums.SituationType.Unknown);
  },
  data() {
    return {
      situationData: null
    };
  },
  render(h) {}
};
</script>