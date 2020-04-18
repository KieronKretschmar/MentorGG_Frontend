<template>
  <!-- Workaround for showing landingpage without SideNavigation Pt. 1 -->
  <div id="app" v-if="this.$route.name != 'landingpage'">
    <template v-if="!this.$inputBlock">
      <DemoViewer />
      <NotAuthorized />
      <div class="l-app" :class="{toggled: menuVisible}">
        <SideNavigation />
      </div>
      <div class="r-app">
        <header>
          <router-link to="/" class="logo">
            <img src="@/assets/logo_white.svg" />
          </router-link>

          <i class="fas fa-bars" @click="menuVisible = !menuVisible"></i>
        </header>
        <main>
          <transition name="page" mode="out-in">
            <router-view :key="reloadHack" />
          </transition>
        </main>
        <footer>
          <Footer :showPartnerships="false" />
        </footer>
      </div>

      <div class="open-filters">
        <i
          class="material-icons"
          title="Open Match Filters"
          @click="OnOpenFilters"
        >settings_applications</i>
      </div>

      <GenericOverlay ref="globalFiltersOverlay" width="900px" @hide="ForceViewReload">
        <p class="headline">Global Match Filters</p>
        <GlobalFilters v-if="this.$api.MatchSelector" @close-self="$refs.globalFiltersOverlay.Hide()"/>
      </GenericOverlay>

      <GenericOverlay ref="connectionHintOverlay" width="900px">
        <p class="headline">Oh? Looks like you haven't setup your Steam connection yet.</p>
        <p>If you connect your MENTOR.GG account to Steam, all your future CS:GO matchmaking matches will be imported to MENTOR.GG automatically every now and then.</p>
        <p>
          We highly recommend going to the
          <span @click="$refs.connectionHintOverlay.Hide()">
            <router-link to="/automatic-upload">Automatic Upload</router-link>
          </span> page and setting up said connection right now!
        </p>

        <p class="headline">First time user?</p>
        <p>Get a headstart by uploading all your matchmaking matches from the past weeks at once using our
          <span >
            <a style="cursor: pointer;" @click="OnClickBrowserExtension()">Browser Extension</a>.
          </span>
          </p>
      </GenericOverlay>
    </template>
    <template v-else>
      <InputBlock>Preparing Application State</InputBlock>
    </template>
  </div>
  <!-- Workaround for showing landingpage without SideNavigation Pt. 2 -->
  <div v-else>
    <main>
      <router-view />

      <Footer :showPartnerships="true" />
    </main>
  </div>
  <!-- Workaround for showing landingpage without SideNavigation Pt. 2 -->
</template>

<script>
import Vue from "vue";
import TopNavigation from "@/components/TopNavigation.vue";
import SideNavigation from "@/components/SideNavigation.vue";
import Footer from "@/components/Footer.vue";
import DiscordHint from "@/components/DiscordHint.vue";
import GenericOverlay from "@/components/GenericOverlay.vue";
import DemoViewer from "@/components/DemoViewer.vue";
import GlobalFilters from "@/components/GlobalFilters.vue";
import InputBlock from "@/components/InputBlock.vue";
import NotAuthorized from "@/components/NotAuthorized.vue";
import Enums from "./enums";
import MentorUser from "./mentoruser";

export default {
  name: "App",
  mounted() {
    // Initialize without showing inputBlock. It will be shown by router / authenticationGuard if necessary.
    this.$inputBlock = Vue.observable(false);
    // Init connections after $api.User is loaded
    this.$api.ensureLogin().then(() => {
      this.InitConnectionsCallback();
    });
  },
  components: {
    TopNavigation,
    SideNavigation,
    Footer,
    DiscordHint,
    GenericOverlay,
    DemoViewer,
    GlobalFilters,
    InputBlock,
    NotAuthorized
  },
  data() {
    return {
      menuVisible: false,
      reloadHack: false,
    };
  },
  computed: {
  },
  methods: {
    OnOpenFilters: function() {
      this.$refs.globalFiltersOverlay.Show();
    },
    InitConnectionsCallback() {
      // Start looking for matches for all configured automatic uploads, 
      // and show overlay if valve automatic-upload is not configured 
      this.$api.getConnectionsObject().then(result => {
        if (result[Enums.Source.Valve]) {
          this.$api.startLookingForValveMatches();
        } else {
          this.$refs.connectionHintOverlay.Show();
        }

        if (result[Enums.Source.Faceit]) {
          this.$api.startLookingForFaceitMatches();
        }
      });
    },
    OnClickBrowserExtension(){
      this.$helpers.LogEvent(this, "ShowBrowserExtension");
      this.$refs.connectionHintOverlay.Hide();
      this.$router.push({ name: "browser-extension" });
    },
    //abuses :key attribute to trigger a component reload in vue
    ForceViewReload() {
      this.reloadHack = !this.reloadHack;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";

body {
  margin: 0;
  overflow-y: scroll;

  &.no-scroll {
    overflow-y: hidden;
  }
}

header {
  background: $dark-1;
  border-bottom: 1px solid $purple;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 9999;
  display: none;
  align-items: center;
  padding: 10px 20px;
  justify-content: space-between;

  a {
    width: 150px;
    display: block;
    height: 28px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .fa-bars {
    color: $orange;
    font-size: 20px;
    cursor: pointer;
  }
}

main {
  background: $dark-2;
  flex: 1 1 auto;

  .view {
    h1 {
      margin: 0;
      color: white;
    }
  }
}

#app {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  width: 100%;

  .l-app {
    width: $sidebar-width;
  }

  .r-app {
    width: calc(100% - #{$sidebar-width});
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .open-filters {
    position: fixed;
    right: 0;
    top: 20%;
    color: $orange;
    user-select: none;
    cursor: pointer;

    i {
      font-size: 40px;
    }
  }
}

//responsive
@media (max-width: 1100px) {
  #app {
    .l-app {
      // display: none;
      position: fixed;
      top: 0;
      z-index: 99999;
      transition: 0.75s;
      left: -100%;

      .bottom-content {
        left: -100%;
        transition: 0.75s;
      }

      &.toggled {
        left: 0%;

        .bottom-content {
          left: 0;
        }
      }
    }

    .r-app {
      width: 100%;

      header {
        display: flex;
      }

      main {
        padding-top: 50px;
      }
    }
  }
}
</style>