<template>
  <div class="side-navigation">

    <GenericOverlay ref="manualUploadOverlay" class="manual-upload-overlay" width="900px">
      <p class="headline">Manual Upload</p>
      <p>
        Please select your <strong>GOTV</strong> demo file and click upload. 
        For manually uploaded demos, we use the timestamp of the upload as the matchdate.
      </p>
      <input type="file" ref="manualUploadInput" accept=".dem,.bz2,.gz">
      <AjaxLoader v-if="uploadInfo.progress">Uploading... {{this.uploadInfo.progress}}%</AjaxLoader>
      <button v-if="!uploadInfo.progress" class="button-variant-bordered" @click="TriggerManualUpload">Upload</button>

      <span v-if="uploadInfo.success == true" class="upload-message">
        Successfully uploaded <strong>{{uploadInfo.message}}</strong>
      </span>
      <span v-else-if="uploadInfo.success == false" class="upload-message upload-failure">
         Sorry, There seems to be a problem: <strong>{{uploadInfo.message}}</strong>
      </span>
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

        <div class="nav-header">UPLOAD DEMOS</div>
        <router-link to="/automatic-upload">Automatic Upload</router-link>
        <button class="nav-button" @click="$refs.manualUploadOverlay.Show()">Manual Upload</button>

        <div class="nav-header">Account</div>
        <router-link :to="{name: 'subscription'}">Subscription</router-link>
        <div class="logout">
          <button @click="signOut()" class="nav-button">
            Logout
          </button>
        </div>
      </nav>


      <div class="bottom-content">
        <QueueStatusDisplay/>
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
import QueueStatusDisplay from "@/components/QueueStatusDisplay.vue";

export default {
  components: {
    DiscordHint,
    GenericOverlay,
    QueueStatusDisplay
  },
  mounted() {
    let params = {
      steamId: this.$api.User.GetSteamId()
    };
    this.$api.getPlayerInfo(params).then(response => {
      this.user = response.data;
    });
  },
  data() {
    return {
      user: null,
      optionsVisible: false,
      uploadInfo: {
          progress: null,
          success: null,
          message: null
      },
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

      formData.append("demo", fileinput.files[0]);
      formData.append("steamId", 1234);
      this.$api.uploadDemo(formData, (progressEvent) => {
        this.uploadInfo.progress = progressEvent;
      }).then(result => {
        this.uploadInfo.progress = null;
        this.uploadInfo.success = true;
        this.uploadInfo.message = result.data.SuccesfulFiles + (result.data.SuccesfulFiles > 1 ? " demos" :  " demo");
      }).catch( error => {
        this.uploadInfo.progress = null;
        this.uploadInfo.success = false;
        this.uploadInfo.message = error;
      });
    },
    signOut(){
      location.href = this.$api.getSignOutUrl(window.location.origin);
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

    span.upload-failure{
        strong {
            color: $orange;
        }
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