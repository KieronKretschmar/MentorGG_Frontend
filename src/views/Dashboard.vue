<template>
  <div class="view view-dashboard">
    <div class="profile-section"></div>

    <PositionAdvice/>
    <MatchHistory/>
  </div>
</template>

<script>
// @ is an alias to /src
import MatchHistory from "@/components/MatchHistory.vue";
import PositionAdvice from "@/components/PositionAdvice.vue";

export default {
  name: "dashboard",
  components: {
    MatchHistory,
    PositionAdvice
  },
  mounted() {}
};
</script>
