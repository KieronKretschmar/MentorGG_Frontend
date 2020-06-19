<template>
  <div class="view view-dashboard">
    <div class="profile-section"></div>

    <template v-if="steamId">
      <ProfileHeader
        :steamId="steamId"
        :recentMatchStats="recentMatchStats"
        @openRankHistoryGraph="$refs.recentMatchStats.OpenRankGraph()"
        @force-reload="$emit('force-reload')"
      />
      <div class="fixed-width-container mc">
        <RecentMatchStats
          ref="recentMatchStats"
          :steamId="steamId"
          @recentMatchStats="OnReceivedRecentMatchStats($event)"
        />

        <template v-if="numGames == -1 || numGames > 0">
          <!-- <Situations :steamId="steamId" /> -->
          <Situations :steamId="steamId" />
          <PositionAdvice :steamId="steamId" />
          <FriendComparison :steamId="steamId" />
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
import MatchHistory from "@/components/MatchHistory.vue";
import Situations from "@/components/Situations.vue";
import MentorUser from "../mentoruser";

export default {
  components: {
    ProfileHeader,
    RecentMatchStats,
    PositionAdvice,
    FriendComparison,
    Situations,
    MatchHistory
  },
  mounted() {
    // let steamIdParam = this.$route.params.steamId;
    // this.steamId =
    //   steamIdParam == "own" ? this.$api.User.GetSteamId() : steamIdParam;

    this.HandleUserOverride();
  },
  data() {
    return {
      numGames: -1,
      recentMatchStats: null,
      steamId: ""
    };
  },
  methods: {
    OnReceivedRecentMatchStats(recentMatchStats) {
      this.numGames = recentMatchStats.GamesTotal;
      this.recentMatchStats = recentMatchStats;
    },
    ShowDemoProfile() {
      this.$router.push({
        name: "dashboard",
        params: {
          steamId: "76561198033880857"
        }
      });
    },
    HandleUserOverride() {
      let newSteamId = this.$route.params.steamId;

      if (newSteamId != this.$api.User.GetSteamId(false)) {
        this.$api.User.ApplyOverride(new MentorUser(-1, newSteamId, 1, -1));
      } else {
        this.$api.User.ClearOverride();
      }

      this.$api.initMatchSelector(newSteamId).then(result => {
        this.steamId = newSteamId;
      });
    }
  },
  // computed: {
  //   steamId() {
  //     console.log("computed steamId");
  //     let steamIdParam = this.$route.params.steamId;
  //     return steamIdParam == "own" ? this.$api.User.GetSteamId() : steamIdParam;
  //   }
  // },
  watch: {
    "$route.params.steamId": function() {
      this.HandleUserOverride();
    }
  },
  beforeDestroy() {
    this.$api.User.ClearOverride();
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