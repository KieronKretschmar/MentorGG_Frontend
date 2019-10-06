<template>
  <div id="app">
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
          <router-view />
        </transition>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
    <!-- <DiscordHint /> -->
    <DemoViewer ref="demoviewer" />
  </div>
</template>

<script>
import TopNavigation from "@/components/TopNavigation.vue";
import SideNavigation from "@/components/SideNavigation.vue";
import Footer from "@/components/Footer.vue";
import DiscordHint from "@/components/DiscordHint.vue";
import DemoViewer from "@/components/DemoViewer.vue";

export default {
  name: "App",
  mounted() {},
  components: {
    TopNavigation,
    SideNavigation,
    Footer,
    DiscordHint,
    DemoViewer
  },
  data() {
    return {
      //TODO: Proper login + check
      menuVisible: false
    };
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";
@import "@/assets/scss/demoviewer.scss";

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
}

//responsive
@media(max-width: 1100px) {
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