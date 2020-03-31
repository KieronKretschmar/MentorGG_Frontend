<template>
  <div class="view view-dashboard">
    <div class="profile-section"></div>

    <template v-if="steamId">
      <ProfileHeader :steamId="steamId" />
      <div class="fixed-width-container mc">
        <RecentMatchStats :steamId="steamId" @gamesTotal="OnReceivedGamesTotal($event)" />

        <template v-if="numGames == -1 || numGames > 0">
          <Situations :steamId="steamId" />
          <PositionAdvice :steamId="steamId" />
          <!-- <FriendComparison /> -->
          <BetterFriendComparison :steamId="steamId" />
          <MatchHistory :steamId="steamId" />
        </template>
        <div class="bordered-box no-data" v-else>
          <h3>Whoops!</h3>
          <p>We don't have any analysis for this user available :(</p>
          <p>Would you like to see what an analyzed profile looks like?</p>
          <button class="button-variant-bordered" @click="ShowDemoProfile">Yes, please!</button>
        </div>
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
  data() {
    return {
      numGames: -1
    };
  },
  methods: {
    OnReceivedGamesTotal(numGames) {
      this.numGames = numGames;
    },
    ShowDemoProfile() {
      this.$router.push({
        name: "dashboard",
        params: {
          steamId: "76561198033880857"
        }
      });
    }
  },
  computed: {
    steamId() {
      let steamIdParam = this.$route.params.steamId;
      return steamIdParam == "own" ? this.$api.User.GetSteamId() : steamIdParam;
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

  .no-data {
    text-align: center;
    color: white;
    padding-bottom: 15px;

    h3 {
      margin-top: 0;
    }
  }
}
</style>