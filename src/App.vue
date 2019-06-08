<template>
  <div id="app">
    <header>
      <TopNavigation/>
    </header>
    <main>
      <router-view/>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import TopNavigation from "@/components/TopNavigation.vue";

export default {
  name: "App",
  mounted() {},
  components: {
    TopNavigation
  },
  data() {
    return {
      //TODO: Proper login + check
      isLoggedIn: true
    };
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  overflow-y: scroll;
}

header {
  background: $dark-1;
  border-bottom: 1px solid $purple;
  position: relative;
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
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>