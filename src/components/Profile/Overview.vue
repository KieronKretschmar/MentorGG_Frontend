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
import RecentMatchStats from "@/components/Profile/Overview/RecentMatchStats.vue";
import PositionAdvice from "@/components/Profile/Overview/PositionAdvice.vue";
import FriendComparison from "@/components/Profile/Overview/FriendComparison.vue";
import MatchHistory from "@/components/Profile/Overview/MatchHistory.vue";
import Situations from "@/components/Profile/Overview/Situations.vue";

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