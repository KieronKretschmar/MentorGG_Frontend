<template>
  <div class="side-navigation">
    <template v-if="$api.User && $api.MatchSelector">
      <GenericOverlay ref="manualUploadOverlay" class="manual-upload-overlay" width="900px">
        <div class="manual-upload-enabled" v-if="$api.MatchSelector.dailyLimitReached === false">
          <p class="headline">Manual Upload</p>
          <div v-if="uploadInfo.progress === null">
            <p>
              Please select your
              <strong>GOTV</strong> demo file and click upload.
              For manually uploaded demos, we use the timestamp of the upload as the matchdate.
            </p>
            <input type="file" ref="manualUploadInput" accept=".dem, .bz2, .gz" />
          </div>
          <AjaxLoader v-else>
            <p>
              After upload, it will take a few moments until the match is added to the queue.
              Please note that only your own matches will appear in the analyses.
              Currently it's not possible to watch other players' matches.
            </p>
            <p>{{this.uploadInfo.progress}}%</p>
          </AjaxLoader>
          <button
            v-if="!uploadInfo.progress"
            class="button-variant-bordered"
            @click="TriggerManualUpload"
          >Upload</button>
          <span v-if="uploadInfo.success == true" class="upload-message">
            Successfully uploaded
            <strong>{{uploadInfo.message}}</strong>
          </span>
          <span v-else-if="uploadInfo.success == false" class="upload-message upload-failure">
            Sorry, There seems to be a problem:
            <strong>{{uploadInfo.message}}</strong>
          </span>
        </div>

        <div class="manual-upload-disabled" v-if="$api.MatchSelector.dailyLimitReached === true">
          <p class="headline">Manual Upload</p>
          <p>
            Please wait with your next upload until your daily limit ends at
            <strong>{{this.$api.MatchSelector.dailyLimitEnds | formatDateAndTime}}</strong>
          </p>
          <button class="button-variant-bordered" @click="OpenSubscriptionPage">Upgrade Membership</button>
        </div>
      </GenericOverlay>
    </template>

    <div class="nav-content" data-simplebar>
      <nav>
        <router-link :to="{name: 'landingpage'}" class="logo">
          <img src="@/assets/logo_white.svg" />
        </router-link>

        <div class="nav-section-container">
          <!-- Personal Data -->
          <div class="nav-section">
            <div class="nav-header">Personal Data</div>
            <router-link
              :to="{name: 'profile', params: {steamId: dashboardRouteSteamId}}"
              v-if="$api.User"
            >My Profile</router-link>
            <template v-else>
              <router-link :to="{name: 'login'}">My Profile</router-link>
              <router-link
                :to="{name: 'profile', params: {steamId: '76561198033880857'}}"
              >Demo Profile</router-link>
            </template>
          </div>

          <!-- Upload Demos-->
          <div class="nav-section">
            <div class="nav-header">Upload Demos</div>
            <router-link to="/automatic-upload">Automatic Upload</router-link>
            <button
              class="nav-button"
              @click="$api.LoginGate(() => $refs.manualUploadOverlay.Show())"
            >Manual Upload</button>
            <router-link to="/browser-extension">Browser Extension</router-link>
          </div>

          <!-- Account -->
          <div class="nav-section">
            <div class="nav-header">Account</div>
            <router-link :to="{name: 'membership'}">Membership & Pricing</router-link>
            <div class="logout" v-if="$api.User">
              <button @click="signOut()" class="nav-button">Logout</button>
            </div>
            <a
              :href="this.$api.getSignInUrl(window.location.origin)"
              v-else
              class="login-with-steam"
            >
              <img class="steam-logo" src="@/assets/steam-logo.svg" alt="Steam logo" />
              Sign in through Steam
            </a>
          </div>
        </div>
      </nav>

      <div class="bottom-content">
        <QueueStatusDisplay v-if="$api.User && $api.MatchSelector" />
        <DiscordHint />
        <div
          class="user-profile"
          v-if="user"
          @click="optionsVisible = !optionsVisible"
          @mouseleave="optionsVisible = false"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import DiscordHint from "@/components/DiscordHint.vue";
import GenericOverlay from "@/components/GenericOverlay.vue";
import QueueStatusDisplay from "@/components/QueueStatusDisplay.vue";

export default {
  components: {
    DiscordHint,
    GenericOverlay,
    QueueStatusDisplay
  },
  mounted() {
    if (this.$api.User != null) {
      this.ownSteamId = this.$api.User.GetSteamId(false);
    }

    if (this.ownSteamId != null) {
      let params = {
        steamId: this.ownSteamId
      };
      this.$api.getPlayerInfo(params).then(response => {
        this.user = response.data;
      });
    }
  },
  data() {
    return {
      window,
      ownSteamId: null,
      user: null,
      optionsVisible: false,
      uploadInfo: {
        progress: null,
        success: null,
        message: null
      }
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
      this.uploadInfo = {
        progress: null,
        success: null,
        message: null
      };
      let formData = new FormData();
      let fileinput = this.$refs.manualUploadInput;

      if (!fileinput.files.length) {
        this.uploadInfo.success = false;
        this.uploadInfo.message = "No file selected";
        return;
      }

      formData.append("demos", fileinput.files[0]);
      formData.append("steamId", this.ownSteamId);
      this.$api
        .uploadDemo(formData, progressEvent => {
          this.uploadInfo.progress = progressEvent;
        })
        .then(result => {
          this.uploadInfo.progress = null;
          this.uploadInfo.success = true;
          this.uploadInfo.message =
            result.data.DemoCount +
            (result.data.DemoCount > 1 ? " demos" : " demo");
        })
        .catch(error => {
          this.uploadInfo.progress = null;
          this.uploadInfo.success = false;
          this.uploadInfo.message = error;
        });
    },
    signOut() {
      location.href = this.$api.getSignOutUrl(window.location.origin);
    },
    OpenSubscriptionPage() {
      this.$helpers.LogEvent(this, "DailyLimitUpgrade");
      this.$refs.manualUploadOverlay.Hide();
      this.$router.push({ name: "membership" });
    }
  },
  computed: {
    dashboardRouteSteamId() {
      return this.ownSteamId;
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
      margin: 0.5em;
      font-family: inherit;
      width: 60%;
    }

    button {
      width: auto;
      min-width: 100px;
      margin: 0 auto;
      display: inline-block;
    }

    span.upload-message {
      display: block;
      color: white;
      border: 1px solid $purple;
      padding: 1em;
      margin: 0.5em;

      strong {
        font-weight: 500;
      }

      animation: message-pop 0.5s;

      @keyframes message-pop {
        from {
          opacity: 0;
        }
        10% {
          scale: 1;
        }
        30% {
          opacity: 1;
          scale: 1.2;
          border-color: $orange;
          border-width: 5px;
        }
        to {
          scale: 1;
        }
      }
    }

    .--ajax-loader {
      padding: 0;
    }

    span.upload-failure {
      strong {
        color: $orange;
      }
    }
  }

  .login-with-steam {
    display: flex;
    align-items: center;
    color: white;
    background: $orange;

    img {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
  }

  .nav-content {
    height: 100%;
    padding-bottom: 100px;
  }

  .bottom-content {
    position: fixed;
    bottom: 0;
    left: 0;
    width: calc(#{$sidebar-width} - 1px);

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
      margin: 70px 0px;
      background: transparent;

      img {
        width: 200px;
      }
    }

    .nav-section-container {
      // First nav-section should not have a top margin
      & > .nav-section:first-of-type {
        margin-top: 0;
      }

      .nav-section {
        display: flex;
        flex-direction: column;
        margin-top: 50px;

        .nav-header {
          color: white;
          font-size: 14px;
          text-transform: uppercase;
          text-align: center;
          border-bottom: 1px solid $purple;
          padding: 5px 0;
          font-weight: 600;
        }
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

//responsive
@media (max-width: 400px) {
  .side-navigation {
    background: $dark-1;
    border-right: 1px solid $purple;
    height: 100%;
    position: fixed;
    width: $sidebar-width;
    padding: 0;
    z-index: 9999;
    max-width: 260px;

    .manual-upload-overlay {
      text-align: center;

      input[type="file"] {
        cursor: pointer;
        background: $purple;
        padding: 10px;
        color: white;
        border-radius: 3px;
        margin: 0.5em;
        font-family: inherit;
        width: 60%;
      }

      button {
        width: 20%;
        min-width: 100px;
        margin: 0 auto;
        display: inline-block;
      }

      span.upload-message {
        display: block;
        color: white;
        border: 1px solid $purple;
        padding: 1em;
        margin: 0.5em;

        strong {
          font-weight: 500;
        }

        animation: message-pop 0.5s;

        @keyframes message-pop {
          from {
            opacity: 0;
          }
          10% {
            scale: 1;
          }
          30% {
            opacity: 1;
            scale: 1.2;
            border-color: $orange;
            border-width: 5px;
          }
          to {
            scale: 1;
          }
        }
      }

      span.upload-failure {
        strong {
          color: $orange;
        }
      }
    }

    .nav-content {
      height: 100%;
      padding-bottom: 100px;
    }

    .bottom-content {
      position: fixed;
      bottom: 0;
      left: 0;
      width: calc(#{$sidebar-width} - 1px);

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
        margin: 30px 0 20px 0;
        background: transparent;

        img {
          width: 160px;
        }
      }

      .nav-section-container {
        // First nav-section should not have a top margin
        & > .nav-section:first-of-type {
          margin-top: 0;
        }

        .nav-section {
          display: flex;
          flex-direction: column;
          margin-top: 50px;

          .nav-header {
            color: white;
            font-size: 14px;
            text-transform: uppercase;
            text-align: center;
            border-bottom: 1px solid $purple;
            padding: 5px 0;
            font-weight: 600;
          }
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
}
</style>