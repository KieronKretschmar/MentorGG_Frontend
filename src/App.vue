<template>
  <div id="app">
    <header>
      <TopNavigation />
    </header>
    <main @click="hideNav">
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
    </main>
    <footer @click="hideNav">
      <Footer />
    </footer>
    <DiscordHint />
    <DemoViewer ref="demoviewer" />
  </div>
</template>

<script>
import TopNavigation from "@/components/TopNavigation.vue";
import Footer from "@/components/Footer.vue";
import DiscordHint from "@/components/DiscordHint.vue";
import DemoViewer from "@/components/DemoViewer.vue";

export default {
  name: "App",
  mounted() {},
  components: {
    TopNavigation,
    Footer,
    DiscordHint,
    DemoViewer
  },
  data() {
    return {
      //TODO: Proper login + check
      isLoggedIn: true
    };
  },
  methods: {
    hideNav: function() {
      let navContainer = document.querySelector(".nav-container");
      navContainer.classList.add("closed");
      let menu = document.querySelectorAll(".menu")[0];
      let close = document.querySelectorAll(".close")[0];
      let navClassList = [...navContainer.classList];
      if (navClassList.includes("closed")) {
        close.classList.add("hide");
        menu.classList.remove("hide");
      } else {
        menu.classList.add("hide");
        close.classList.remove("hide");
      }
    }
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
}

main {
  background: $dark-2;
  flex: 1 1 auto;
  padding-top: 100px;

  .view {
    h1 {
      margin: 0;
      color: white;
    }
  }
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}
</style>