<template>
  <nav>
    <div class="l">
      <router-link to="/" class="logo">
        <img src="@/assets/logo_white.svg" />
      </router-link>
      <router-link to="/">Overview</router-link>
      <router-link to="/smokes">Smokes</router-link>
      <router-link to="/firenades">FireNades</router-link>
      <router-link to="/flashes">Flashes</router-link>
      <router-link to="/hes">HEs</router-link>
      <router-link to="/kills">Kills</router-link>
      <router-link to="/statistics">Statistics</router-link>
    </div>
    <div class="">
    <form action="/Account/LogOff/logoutForm" class="form-inline" method="post">
    <!-- <input name="__RequestVerificationToken" type="hidden" value="XsKml8MFCYXavXtfiIC86L1w5vD8CCJWMZ_lWNYBnUSK8ibRKo_stUPI953f2s28ZfFGvIalOxEVl5buZ6sttipGbA6Z60indV8j2yK3MRza1BzGJjqDn6QBoJ881ihlr79UP6zQ7FVKNGOyMElemA2">        <ul class="navbar-nav"> -->
      <button type="submit" class="button-variant-filled">
        Log out
      </button>
    </form>
      <!-- <button class="button-variant-filled" @click="OnLogout">Logout</button> -->
    </div>
    <div class="r">
      <button class="button-variant-filled" @click="OnUploadMatches">Upload Matches</button>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {},
  methods: {
    OnUploadMatches: function() {
      this.$router.push({name: 'upload'});
    },
    OnLogout: function() {
      sessionStorage.removeItem('.AspNet.ApplicationCookie')
      window.location.href('http://localhost:58071')
    }
  }
};
</script>

<style lang="scss">
nav {
  background: $dark-1;
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: $container-width;
  padding: 30px 0;
  justify-content: space-between;

  .button-variant-filled {
    font-weight: 500;
  }

  .logo {
    position: absolute;
    width: 170px;
    left: 30px;
    top: 32px;

    img {
      width: 100%;
    }
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    margin-right: 50px;
    transition: 0.3s;

    &.router-link-exact-active {
      color: $orange;
    }

    &:hover {
      color: $orange;
    }
  }
}
</style>