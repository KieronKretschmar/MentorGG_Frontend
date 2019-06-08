<template>
  <div class="view view-dashboard">
    <div class="profile-section"></div>

    <PositionAdvice/>
    <FriendComparison/>
    <MatchHistory/>
  </div>
</template>

<script>
// @ is an alias to /src
import PositionAdvice from "@/components/PositionAdvice.vue";
import FriendComparison from "@/components/FriendComparison.vue";
import MatchHistory from "@/components/MatchHistory.vue";

export default {
  components: {
    PositionAdvice,
    FriendComparison,
    MatchHistory,
  },
  mounted() {}
};
</script>
