<template>
  <div class="profile-situations-detail">
    <div class="fixed-width-container">
      <component
        v-if="situationData"
        v-bind:is="situationData.component"
        :staticSituationData="situationData"
        :steamId="steamId"
        @back="$emit('back')"
      ></component>
    </div>
  </div>
</template>

<script>
import SituationLoader from "@/SituationLoader";
import Enums from "@/enums";

export default {
  props: ["type", "steamId"],
  mounted() {
    this.situationData =
      SituationLoader.getSituationData(this.type) ||
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