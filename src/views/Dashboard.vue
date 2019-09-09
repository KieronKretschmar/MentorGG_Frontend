<template>
  <div class="view view-dashboard">
    <div class="profile-section"></div>
    <ProfileHeader />
    <div class="fixed-width-container">
      <RecentMatchStats />
      <PositionAdvice />
      <FriendComparison />
      <MatchHistory />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProfileHeader from "@/components/ProfileHeader.vue";
import RecentMatchStats from "@/components/RecentMatchStats.vue";
import PositionAdvice from "@/components/PositionAdvice.vue";
import FriendComparison from "@/components/FriendComparison.vue";
import MatchHistory from "@/components/MatchHistory.vue";

export default {
  components: {
    ProfileHeader,
    RecentMatchStats,
    PositionAdvice,
    FriendComparison,
    MatchHistory
  },
  mounted() {}
};
</script>
