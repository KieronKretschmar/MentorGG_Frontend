<template>
  <div class="view view-profile">
    <template v-if="steamId">
      <ProfileHeader :steamId="steamId" :recentMatchStats="recentMatchStats" />

      <div class="padding-wrapper">
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
                :radarImageData="radarImageData"
                ref="loadedComponent"
              ></component>
            </template>
            <template v-else>
              <h2 class="section-header">Whoops!</h2>
              <div class="bordered-box no-data">
                <p>We don't have any analysis for this user available :(</p>
                <p>Would you like to see what an analyzed profile looks like?</p>
                <button class="button-variant-bordered" @click="ShowDemoProfile">Yes, please!</button>
              </div>
            </template>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import ProfileHeader from "@/components/Profile/ProfileHeader.vue";
import MentorUser from "@/mentoruser";
import EventBus from "@/EventBus";

// Tab Components
import Overview from "@/components/Profile/Overview.vue";
import Situations from "@/components/Profile/Situations.vue";
import Smokes from "@/components/Profile/Smokes.vue";
import Molotovs from "@/components/Profile/Molotovs.vue";
import Flashes from "@/components/Profile/Flashes.vue";
import HEs from "@/components/Profile/HEs.vue";
import Kills from "@/components/Profile/Kills.vue";

export default {
  components: {
    ProfileHeader
  },
  mounted() {
    this.onKillTabRequestEventHandle = EventBus.AddListener(
      "request-kill-tab",
      data => {
        this.radarImageData = data;
        this.activeTabIndex = this.tabs.findIndex(e => e.name == "Kills");
      }
    );

    this.onOpenSituationDetailViewEventHandle = EventBus.AddListener(
      "open-situation-detail-view",
      type => {
        this.activeTabIndex = this.tabs.findIndex(e => e.name == "Situations");
        this.$nextTick(() => {
          this.$refs.loadedComponent.ShowDetail(type);
        });
      }
    );

    this.onOpenOverview =EventBus.AddListener("open-overview", () => {
      this.activeTabIndex = this.tabs.findIndex(e => e.name == "Overview");
    });

    this.HandleUserOverride(() => {
      this.LoadData();
    });
  },
  data() {
    return {
      recentMatchStats: null,
      steamId: "",
      activeTabIndex: 0,
      onKillTabRequestEventHandle: null,
      onOpenSituationDetailViewEventHandle: null,
      onOpenOverview: null,
      radarImageData: null,
      tabs: [
        {
          name: "Overview",
          component: Overview
        },
        {
          name: "Situations",
          component: Situations
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
        name: "profile",
        params: {
          steamId: "76561198033880857"
        }
      });
    },
    HandleUserOverride(fnDone) {
      let newSteamId = this.$route.params.steamId;

      this.$api.initMatchSelector(newSteamId).then(result => {
        this.steamId = newSteamId;
        this.activeTabIndex = 0;

        if (fnDone) {
          fnDone();
        }
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
      //scroll to top
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;

      this.HandleUserOverride(() => {
        this.LoadData();
      });
    }
  },
  beforeDestroy() {
    this.onKillTabRequestEventHandle.Remove();
    this.onOpenSituationDetailViewEventHandle.Remove();
    this.onOpenOverview.Remove();

    if (this.$api.User) {
      this.$api
        .initMatchSelector(this.$api.User.GetSteamId(false))
        .then(result => {});
    }
  }
};
</script>

<style lang="scss">
.view-profile {
  .padding-wrapper {
    padding: 0 20px;
  }

  .profile-tabs {
    display: flex;
    background: $dark-1;
    margin-top: -30px;
    margin-bottom: 60px;
    border-left: 3px solid $orange;
    border-right: 3px solid $orange;
    border-radius: 4px;

    .tab {
      background: $dark-1;
      color: white;
      padding: 20px 20px;
      border-right: 1px solid $dark-3;
      height: 60px;
      display: flex;
      align-items: center;
      // border-bottom: 3px solid transparent;
      transition: 0.35s;
      cursor: pointer;
      position: relative;
      top: 0;
      justify-content: center;

      width: calc(100% / 6);

      &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 5px;
        background: $purple;
        top: 100%;
        left: 0;
        transition: 1s;
        opacity: 0;
      }

      &.active,
      &:hover {
        top: -5px;
        background: $dark-2;
        // border-bottom: 3px solid $purple;
        -webkit-box-shadow: 0px 3px 5px 0px rgba(57, 56, 74, 0.5);
        -moz-box-shadow: 0px 3px 5px 0px rgba(57, 56, 74, 0.5);
        box-shadow: 0px 3px 5px 0px rgba(57, 56, 74, 0.5);

        &:after {
          opacity: 1;
        }
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

//response
@media(max-width: 800px) {
  .view-profile {
    .profile-tabs {
      flex-direction: column;
      margin-top: -20px;

      .tab {
        width: 100%;
        border-right: 0;
        border-bottom: 1px solid $dark-3;
        height: 30px;

        &.active,
        &:hover {
          box-shadow: none;
          top: 0;
        }

        &:after {
          content: none;
        }
      }
    }
  }
}
</style>