<template>
  <div class="side-navigation">

    <GenericOverlay ref="manualUploadOverlay" class="manual-upload-overlay" width="900px">
      <p class="headline">Manual Upload</p>
      <p>Please select your demo file and click upload. This may take a while depending on the size of the demo.</p>
      <input type="file" ref="manualUploadInput">
      <button class="button-variant-bordered" @click="TriggerManualUpload">Upload</button>
    </GenericOverlay>

    <div class="nav-content" data-simplebar>
      <nav>
        <router-link to="/" class="logo">
          <img src="@/assets/logo_white.svg" />
        </router-link>

        <div class="nav-header">Personal Data</div>
        <router-link to="/">Overview</router-link>
        <router-link to="/smokes">Smokes</router-link>
        <router-link to="/molotovs">Molotovs</router-link>
        <router-link to="/flashes">Flashes</router-link>
        <router-link to="/hes">HEs</router-link>
        <router-link to="/kills">Kills</router-link>
        <router-link to="/statistics">Statistics</router-link>

        <div class="nav-header">Starladder 2019</div>
        <router-link to="/event/matchhistory">Matches</router-link>
        <router-link to="/event/kills">Kills</router-link>
        <router-link to="/event/smokes">Smokes</router-link>
        <router-link to="/event/molotovs">Molotovs</router-link>
        <router-link to="/event/flashes">Flashes</router-link>
        <router-link to="/event/hes">HEs</router-link>

        <div class="nav-header">Acount</div>
        <router-link to="/automatic-upload">Automatic Upload</router-link>
        <button class="nav-button" @click="$refs.manualUploadOverlay.Show()">Manual Upload</button>
        <div class="logout">
          <form action="/Account/LogOff/logoutForm" class="form-inline" method="post">
            <button class="nav-button" type="submit">Log out</button>
          </form>
        </div>
      </nav>

      <div class="bottom-content">
        <DiscordHint/>
        <div
          class="user-profile"
          v-if="user"
          @click="optionsVisible = !optionsVisible"
          @mouseleave="optionsVisible = false"
        >
          <!-- <img v-if="user" :src="GetFullSteamAvatarURL(user.Icon)" />
          <span class="username">{{ user.SteamName }}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DiscordHint from "@/components/DiscordHint.vue";
import GenericOverlay from "@/components/GenericOverlay.vue";

export default {
  components: {
    DiscordHint,
    GenericOverlay
  },
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
    GetFullSteamAvatarURL: function(url) {
      if (!url) {
        return "";
      }
      return url.split(".jpg")[0] + "_full.jpg";
    },
    TriggerManualUpload: function() {
      let formData = new FormData();
      let fileinput = this.$refs.manualUploadInput;

      if (!fileinput.files.length) {
        console.error('Tried to trigger manual upload without selecting a file first');
        return;
      }

      formData.append("demo", fileinput.files[0]);

      this.$api.uploadDemo(formData, (progressEvent) => {
        console.log(progressEvent);
      }).then(result => {
        console.log(result);
      });
    }
  }
};
</script>

<style lang="scss">
.side-navigation {
  background: $dark-1;
  border-right: 1px solid $purple;
  height: 100%;
  position: fixed;
  width: $sidebar-width;
  padding: 0;
  z-index: 9999;

  .manual-upload-overlay {
    text-align: center;

    input[type="file"] {
      cursor: pointer;
      background: $purple;
      padding: 10px;
      color: white;
      border-radius: 3px;
      margin-bottom: 20px;
      font-family: inherit;
    }

    button {
      width: 100%;
      max-width: 200px;
      margin: 0 auto;
      display: block;
    }
  }

  .nav-content {
    height: 100%;
    // padding: 20px;
    padding-bottom: 100px;
  }

  .bottom-content {
    position: fixed;
    bottom: 0;
    left: 0;
    // height: 50px;
    width: calc(#{$sidebar-width} - 1px);
    background: $dark-3;

    .discord-hint {
      position: static;
      border: 0;
      background: $dark-3;
      border-bottom: 1px solid $dark-1;
      border-radius: 0;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      color: rgb(114, 137, 218);

      &:hover {
        background: $dark-2;
      }
    }

    .user-profile {
      display: flex;
      align-items: center;
      transition: 0.35s;
      user-select: none;

      img {
        width: 30px;
        height: 30px;
        // border-radius: 4px;
        margin-right: 10px;
      }

      .username {
        color: white;
        font-weight: 300;
        font-size: 12px;
        max-width: 200px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        transition: 0.35s;
      }
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    justify-content: center;

    a {
      color: white;
      text-decoration: none;
      transition: 0.35s;
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 1px;
      background: $dark-3;
      padding: 5px 40px;

      &:hover,
      &.router-link-exact-active {
        color: $orange;
      }
    }

    .logo {
      display: block;
      text-align: center;
      margin-top: 30px;
      background: transparent;

      img {
        width: 200px;
      }
    }

    .nav-header {
      color: $orange;
      font-size: 12px;
      text-transform: uppercase;
      text-align: center;
      border-bottom: 1px solid $purple;
      padding-bottom: 5px;
      margin-top: 50px;
      font-weight: 600;

      &:first-child {
        margin-top: 0;
      }
    }

    .nav-button {
      border: 0;
      outline: 0;
      color: white;
      transition: 0.35s;
      background: $dark-3;
      cursor: pointer;
      padding: 5px 40px;
      margin: 0;
      width: 100%;
      font-family: inherit;
      font-weight: 500;
      font-size: 14px;
      text-align: left;
      margin-bottom: 1px;

      &:hover {
        color: $orange;
      }
    }
  }
}
</style>