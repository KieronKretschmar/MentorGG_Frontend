<template>
  <div id="app">
    <header>
      <TopNavigation />
    </header>
    <main>
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
    </main>
    <footer>
      <Footer />
    </footer>
    <DiscordHint />
  </div>
</template>

<script>
import TopNavigation from "@/components/TopNavigation.vue";
import Footer from "@/components/Footer.vue";
import DiscordHint from "@/components/DiscordHint.vue";

export default {
  name: "App",
  mounted() {},
  components: {
    TopNavigation,
    Footer,
    DiscordHint
  },
  data() {
    return {
      //TODO: Proper login + check
      isLoggedIn: true
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";

body {
  margin: 0;
  overflow-y: scroll;
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
}
</style>