<template>
  <div class="profile-overview">
    <RecentMatchStats :steamId="steamId" :recentMatchStats="recentMatchStats"/>
    <Situations :steamId="steamId" />
    <PositionAdvice :steamId="steamId" />
    <FriendComparison :steamId="steamId" />
    <MatchHistory :steamId="steamId" />
  </div>
</template>

<script>
import RecentMatchStats from "@/components/RecentMatchStats.vue";
import PositionAdvice from "@/components/PositionAdvice.vue";
import FriendComparison from "@/components/FriendComparison.vue";
import MatchHistory from "@/components/MatchHistory.vue";
import Situations from "@/components/Situations.vue";

export default {
  props: ["steamId", "recentMatchStats"],
  components: {
    RecentMatchStats,
    PositionAdvice,
    FriendComparison,
    MatchHistory,
    Situations
  }
};
</script>