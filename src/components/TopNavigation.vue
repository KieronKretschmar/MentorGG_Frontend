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
    <div class>

    </div>
    <div class="r">
      <button class="button-variant-filled" @click="OnUploadMatches">Upload Matches</button>
      <div class="user-profile" v-if="user" @click="optionsVisible = !optionsVisible" @mouseleave="optionsVisible = false">
        <span class="username">{{ user.SteamName }}</span>
        <img v-if="user" :src="getFullSteamAvatarURL(user.Icon)" />
        <div class="profile-options" :class="{visible: optionsVisible}">
          <form action="/Account/LogOff/logoutForm" class="form-inline" method="post">
          <!-- <input name="__RequestVerificationToken" type="hidden" value="XsKml8MFCYXavXtfiIC86L1w5vD8CCJWMZ_lWNYBnUSK8ibRKo_stUPI953f2s28ZfFGvIalOxEVl5buZ6sttipGbA6Z60indV8j2yK3MRza1BzGJjqDn6QBoJ881ihlr79UP6zQ7FVKNGOyMElemA2">        <ul class="navbar-nav"> -->
            <button type="submit">Log out</button>
          </form>
          <!-- <button class="button-variant-filled" @click="OnLogout">Logout</button> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {
    this.$api.getPlayerInfo("").then(response => {
      this.user = response.data;
    });
  },
  data() {
    return {
      user: null,
      optionsVisible: false
    };
  },
  methods: {
    OnUploadMatches: function() {
      this.$router.push({ name: "upload" });
    },
    OnLogout: function() {
      sessionStorage.removeItem(".AspNet.ApplicationCookie");
      window.location.href("http://localhost:58071");
    },
    getFullSteamAvatarURL: function(url) {
      if (!url) {
        return "";
      }
      return url.split(".jpg")[0] + "_full.jpg";
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

  .user-profile {
    position: absolute;
    right: 30px;
    top: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: .35s;
    padding: 10px;
    border-top: 2px solid transparent;

    &:hover {
      background: $dark-3;
      // border-top: 2px solid $orange;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 4px;
      margin-left: 10px;      
    }

    .username {
      color: white;
      font-weight: 500;
      max-width: 200px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      transition: .35s;
    }

    .profile-options {
      position: absolute;
      top: 100%;
      left: 0;
      padding: 10px;
      padding-top: 0px;

      background: $dark-3;
      // border: 1px solid $purple;
      width: 100%;      
      border-bottom: 2px solid $orange;
      opacity: 0;
      pointer-events: none;
      transition: .35s;

      &.visible {
        opacity: 1;
        pointer-events: all;
      }

      form {
        button {
          background: $purple;
          color: white;
          border: 0;
          width: 100%;
          outline: 0;
          padding: 5px 10px;
          cursor: pointer;
          transition: .35s;

          &:hover {
            background: darken($purple, 5%);
          }
        }
      }
    }
  }

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