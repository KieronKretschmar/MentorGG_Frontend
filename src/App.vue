<template>
  <!-- Workaround for showing landingpage without SideNavigation Pt. 1 -->
  <div id="app" v-if="this.$route.name != 'landingpage'">
    <template v-if="!this.$inputBlock">
      <DemoViewer />
      <NotAuthorized />
      <NotLoggedIn />
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
          <div class="announcement">
            <span class="text">
              Dear MENTOR.GG users,
              <br />
              <br />Over the past years, we had lots of fun developing this project with you. Unfortunately, we have to end our service on 13/07/2021.
              Please download your replay data if required.
              With the end of the service, user data and play data will be deleted.
              For more information, visit our Discord server.
              <br />
              <br />Thanks for over half a million games. Keep winning!
              <br />Your MENTOR.GG Team
              <br />
            </span>
          </div>
          <div class="auto-upload-not-configured" v-if="showAutomaticUploadSetupPrompt">
            <span class="text">
              Setup
              <b>Automatic Upload</b> to ensure all of your future Matchmaking matches will be uploaded whenever you visit MENTOR.GG
            </span>
            <button @click="$router.push({name: 'automatic-upload'})">setup</button>
          </div>
          <transition name="page" mode="out-in">
            <router-view
              :key="reloadHack"
              @valve-connected="showAutomaticUploadSetupPrompt = false"
            />
          </transition>
        </main>
        <footer>
          <Footer :showPartnerships="false" />
          <CookieBanner />
        </footer>
      </div>

      <div class="open-filters" @click="OnOpenFilters">
        <span>Match Filters</span>
        <i class="fas fa-cog" title="Open Match Filters"></i>
        <!-- <i
          class="material-icons"
          title="Open Match Filters"          
        >settings_applications</i>-->
      </div>

      <GenericOverlay
        ref="globalFiltersOverlay"
        width="900px"
        height="100%"
        @hide="ForceViewReload"
      >
        <p class="headline">Global Match Filters</p>
        <GlobalFilters
          v-if="this.$api.MatchSelector"
          @close-self="$refs.globalFiltersOverlay.Hide()"
        />
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
      <CookieBanner />
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
import NotLoggedIn from "@/components/NotLoggedIn.vue";
import Enums from "./enums";
import MentorUser from "./mentoruser";
import CookieBanner from "@/components/CookieBanner.vue";

export default {
  name: "App",
  mounted() {
    // Initialize without showing inputBlock. It will be shown by router / authenticationGuard if necessary.
    this.$inputBlock = Vue.observable(false);
    // Init connections after $api.User is loaded
    this.$api
      .ensureLogin()
      .then(() => {
        this.InitConnectionsCallback();
      })
      .catch((error) => {
        console.log("Not logged in");
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
    NotAuthorized,
    NotLoggedIn,
    CookieBanner,
  },
  data() {
    return {
      menuVisible: false,
      reloadHack: false,
      showAutomaticUploadSetupPrompt: false,
    };
  },
  computed: {},
  methods: {
    OnOpenFilters: function () {
      this.$refs.globalFiltersOverlay.Show();
    },
    InitConnectionsCallback() {
      // Start looking for matches for all configured automatic uploads,
      // and show overlay if valve automatic-upload is not configured
      this.$api.getConnectionsObject().then((result) => {
        if (result[Enums.Source.Valve]) {
          this.$api.startLookingForValveMatches();
        } else {
          this.showAutomaticUploadSetupPrompt = true;
        }

        if (result[Enums.Source.Faceit]) {
          this.$api.startLookingForFaceitMatches();
        }
      });
    },
    OnClickBrowserExtension() {
      this.$helpers.LogEvent(this, "ShowBrowserExtension");
      this.$refs.connectionHintOverlay.Hide();
      this.$router.push({ name: "browser-extension" });
    },
    //abuses :key attribute to trigger a component reload in vue
    ForceViewReload() {
      this.reloadHack = !this.reloadHack;
    },
  },
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
    top: calc(20% + 12px);
    color: white;
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    background: $dark-1;
    border: 1px solid $purple;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding: 5px 10px 5px 10px;
    z-index: 9999;

    span {
      color: white;
      margin-right: 10px;
    }

    i {
      font-size: 24px;
    }
  }

  .announcement,
  .auto-upload-not-configured {
    background: $red;
    color: white;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;

    button {
      margin-left: 10px;
      border: 1px solid white;
      border-radius: 4px;
      outline: 0;
      background: transparent;
      color: white;
      padding: 3px 20px;
      text-transform: uppercase;
      cursor: pointer;
      transition: 0.35s;
      font-weight: bold;

      &:hover {
        background: white;
        color: $red;
      }
    }

    a {
      color: white;
    }
  }

  .announcement {
    background: #f39c12;
  }
}

//responsive
@media (max-width: 1170px) {
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

@media (max-width: 500px) {
  .open-filters {
    top: unset !important;
    bottom: 0;
    right: 0;

    span {
      display: none;
    }
  }

  #app .auto-upload-not-configured,
  #app .announcement {
    flex-direction: column;
    text-align: center;
    padding: 10px;

    button {
      margin-top: 10px;
    }
  }
}
</style>