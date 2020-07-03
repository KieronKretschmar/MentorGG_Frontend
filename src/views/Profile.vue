<template>
  <div class="view view-profile">
    <template v-if="steamId">
      <ProfileHeader :steamId="steamId" :recentMatchStats="recentMatchStats" />

      <div class="fixed-width-container">
        <div class="profile-tabs">
          <div
            class="tab"
            v-for="(tab, index) in tabs"
            :key="tab.name"
            @click="activeTabIndex = index"
            :class="{active: activeTabIndex == index}"
          >{{ tab.name }}</div>
        </div>
      </div>

      <div class="fixed-width-container">
        <template v-if="recentMatchStats">
          <template v-if="recentMatchStats.GamesTotal == -1 || recentMatchStats.GamesTotal > 0">
            <component
              v-if="activeTabComponent"
              v-bind:is="activeTabComponent"
              :steamId="steamId"
              :recentMatchStats="recentMatchStats"
            ></component>
          </template>
          <div class="bordered-box no-data" v-else>
            <h3>Whoops!</h3>
            <p>We don't have any analysis for this user available :(</p>
            <p>Would you like to see what an analyzed profile looks like?</p>
            <button class="button-variant-bordered" @click="ShowDemoProfile">Yes, please!</button>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import ProfileHeader from "@/components/ProfileHeader.vue";
import RecentMatchStats from "@/components/RecentMatchStats.vue";
import PositionAdvice from "@/components/PositionAdvice.vue";
import FriendComparison from "@/components/FriendComparison.vue";
import MatchHistory from "@/components/MatchHistory.vue";
import Situations from "@/components/Situations.vue";
import MentorUser from "../mentoruser";

// Tab Components
import Overview from "@/components/Profile/Overview.vue";
import SituationDetailOverview from "@/components/Profile/SituationDetailOverview.vue";
import Smokes from "@/components/Profile/Smokes.vue";
import Molotovs from "@/components/Profile/Molotovs.vue";
import Flashes from "@/components/Profile/Flashes.vue";
import HEs from "@/components/Profile/HEs.vue";
import Kills from "@/components/Profile/Kills.vue";

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
    this.HandleUserOverride(() => {
      this.LoadData();
    });
  },
  data() {
    return {
      recentMatchStats: null,
      steamId: "",
      activeTabIndex: 0,
      tabs: [
        {
          name: "Overview",
          component: Overview
        },
        {
          name: "Situations",
          component: SituationDetailOverview
        },
        {
          name: "Smokes",
          component: Smokes
        },
        {
          name: "Molotovs",
          component: Molotovs
        },
        {
          name: "Flashes",
          component: Flashes
        },
        {
          name: "HEs",
          component: HEs
        },
        {
          name: "Kills",
          component: Kills
        }
      ]
    };
  },
  methods: {
    ShowDemoProfile() {
      this.$router.push({
        name: "dashboard",
        params: {
          steamId: "76561198033880857"
        }
      });
    },
    HandleUserOverride(fnDone) {
      let newSteamId = this.$route.params.steamId;

      if (newSteamId != this.$api.User.GetSteamId(false)) {
        this.$api.User.ApplyOverride(new MentorUser(-1, newSteamId, 1, -1));
      } else {
        this.$api.User.ClearOverride();
      }

      this.$api.initMatchSelector(newSteamId).then(result => {
        this.steamId = newSteamId;
        fnDone();
      });
    },
    LoadData() {
      this.$api
        .getRecentMatchData({ steamId: this.steamId })
        .then(response => {
          this.recentMatchStats = response.data;
        })
        .catch(error => {
          console.error(error); // eslint-disable-line no-console
        });
    }
  },
  computed: {
    activeTabComponent() {
      return this.tabs[this.activeTabIndex].component;
    }
  },
  watch: {
    "$route.params.steamId": function() {
      this.HandleUserOverride();
    }
  },
  beforeDestroy() {
    this.$api.User.ClearOverride();

    this.$api
      .initMatchSelector(this.$api.User.GetSteamId(false))
      .then(result => {});
  }
};
</script>

<style lang="scss">
.view-profile {
  .profile-tabs {
    display: flex;
    background: $dark-1;
    margin-top: -30px;
    border-left: 3px solid $purple;
    border-right: 3px solid $purple;
    // border-bottom: 1px solid $purple;
    border-radius: 4px;

    .tab {
      background: $dark-1;
      color: white;
      padding: 20px 20px;
      border-right: 1px solid $dark-3;
      height: 60px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid transparent;
      transition: 0.35s;
      cursor: pointer;

      &.active,
      &:hover {
        color: $orange;
        background: $dark-2;
        border-bottom: 1px solid $dark-1;
      }
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