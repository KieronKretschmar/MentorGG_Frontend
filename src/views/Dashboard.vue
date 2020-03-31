<template>
  <div class="view view-dashboard">
    <div class="profile-section"></div>

    <template v-if="steamId">
      <ProfileHeader :steamId="steamId" />
      <div class="fixed-width-container mc">
        <RecentMatchStats :steamId="steamId" />
        <Situations :steamId="steamId" />
        <PositionAdvice :steamId="steamId" />
        <!-- <FriendComparison /> -->
        <BetterFriendComparison :steamId="steamId" />
        <MatchHistory :steamId="steamId" />
      </div>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import ProfileHeader from "@/components/ProfileHeader.vue";
import RecentMatchStats from "@/components/RecentMatchStats.vue";
import PositionAdvice from "@/components/PositionAdvice.vue";
import FriendComparison from "@/components/FriendComparison.vue";
import BetterFriendComparison from "@/components/BetterFriendComparison.vue";
import MatchHistory from "@/components/MatchHistory.vue";
import Situations from "@/components/Situations.vue";

export default {
  components: {
    ProfileHeader,
    RecentMatchStats,
    PositionAdvice,
    FriendComparison,
    BetterFriendComparison,
    Situations,
    MatchHistory
  },
  mounted() {},
  computed: {
    steamId() {
      let steamIdParam = this.$route.params.steamId;
      return steamIdParam == 'own' ? this.$api.User.GetSteamId() : steamIdParam;
    }
  }
};
</script>

<style lang="scss">
.view-dashboard {
  .fixed-width-container {
    &.mc {
      padding: 0 20px;
    }
  }
}
</style>