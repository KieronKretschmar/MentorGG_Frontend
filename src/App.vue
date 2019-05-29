<template>
  <div id="app">

    <!-- User Area -->
    <div id="user-area" v-if="$authManager.isLoggedIn">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view/>
    </div>

    <!-- Guest Area -->
    <div id="guest-area" v-if="!$authManager.isLoggedIn">

    </div>
  </div>
</template>

<script>
  export default {
    name: "App",
    mounted() {
      
    },
    data() {
      return {
        //TODO: Proper login + check
        isLoggedIn: true
      };
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>