<template>
  <div class="view view-upload">
    <div class="fixed-width-container">
      <div class="bordered-box">
        <h2>MENTOR.GG Uploader as Browser Extension</h2>
        <div class="split">
          <div class="l">
            <img src="@/assets/browser-extension-alternate.jpg" />
          </div>
          <div class="r">
            <p>With our browser extension you are be able to upload your matchmaking matches right from within your browser.</p>
            <p>
              We highly recommend using this instead of the uploader for Windows,
              as in the future the browser extension will receive seamless integration with our Website and give you access to features that you would normally not have access to.
            </p>
            <div class="download-links">
              <a
                target="_blank"
                href="https://chrome.google.com/webstore/detail/mentorgg-uploader/anjgboggngeomdkapmhjodcbjjclalbg"
              >
                <img src="@/assets/browser-icons/chrome.png" />
              </a>
              <a
                target="_blank"
                href="https://addons.mozilla.org/de/firefox/addon/mentor-gg-uploader/"
              >
                <img src="@/assets/browser-icons/firefox.png" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="bordered-box">
        <h2>MENTOR.GG Uploader for Windows</h2>
        <div class="split">
          <div class="l">
            <img src="@/assets/windows-upload.jpg" />
          </div>
          <div class="r">
            <p>
              This will upload your matchmaking matches whenever you are done playing CS:GO. That's pretty much all there is to it.
              <br />Just
              <a target="_blank" href="https://www.7-zip.org/">unzip</a> it and run the *.exe file. You can also right-click the tray icon and have it start with Windows.
            </p>

            <p>And by the way, Valve has confirmed that this will not trigger VAC at all. You are completely safe using this!</p>

            <a href="/Downloads/MentorUploader.zip">Download</a>
          </div>
        </div>
      </div>
      <div class="bordered-box">
        <h2>Connect your FACEIT account</h2>
        <div class="split">
          <div class="l">
            <img src="@/assets/faceit-logo.jpg" />
          </div>
          <div class="r">
            <p>If you connect your Faceit Account to MENTOR.GG, your Faceit matches will be automatically uploaded to MENTOR.GG every few hours.</p>
            <div v-if="faceitStatus">
              <div v-if="faceitStatus.IsConnected">
                <p>
                  Your MENTOR.GG account is currently connected to this Faceit Account: <span class="faceit-name">{{ faceitStatus.FaceitName }}</span>
                  <br />
                  <span v-if="Date.parse(faceitStatus.LastCheck) ==  Date.parse('1970') || faceitJustRefreshed">
                    Currently looking for new Faceit Matches
                  </span>
                  <span v-else>
                    Last check for new Faceit matches at: 
                    {{ faceitStatus.LastCheck|formatDate }}
                  </span>
                </p>
                <!-- <input name="__RequestVerificationToken" type="hidden" value="XsKml8MFCYXavXtfiIC86L1w5vD8CCJWMZ_lWNYBnUSK8ibRKo_stUPI953f2s28ZfFGvIalOxEVl5buZ6sttipGbA6Z60indV8j2yK3MRza1BzGJjqDn6QBoJ881ihlr79UP6zQ7FVKNGOyMElemA2">        <ul class="navbar-nav"> -->
                <div class="button-wrapper">
                  <button class="button-variant-bordered" @click="RefreshFaceit">Manual Refresh</button>
                  <button class="button-variant-bordered" @click="RemoveFaceit">Disconnect</button>
                </div>
              </div>
              <div v-else>
                <button class="button-variant-bordered" @click="ConnectFaceit">Connect</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import FACEIT from "faceit";

export default {
  data() {
    return {
      faceitStatus: null,
      faceit: FACEIT,
      faceitJustRefreshed: false
    };
  },
  mounted() {
    // let faceitScript = document.createElement('script')
    // faceitScript.setAttribute('src', 'https://cdn.faceit.com/oauth/faceit-oauth-sdk-1.2.7.min.js')
    // document.head.appendChild(faceitScript)

    // Activate FACEIT
    var initParams = {
      client_id: "d7044f7f-caeb-4a36-9013-9111563d3dd3", // redirects to mentor.gg
      // client_id: "98dfbe01-bc76-4148-90f0-a9221c963a9f", // redirects to localhost
      response_type: "code",
      state: "", //informationYouWantPassedToTheRedirectUri
      redirect_popup: false,
      debug: false
    };
    FACEIT.init(initParams); // Hier habe ich Zugriff auf FACEIT

    this.LoadFaceitStatus();
  },
  methods: {
    LoadFaceitStatus() {
      this.$api.getFaceitStatus().then(response => {
        this.faceitStatus = response.data;
      });
    },
    RefreshFaceit() {
      this.$api.postRefreshFaceit().then(response => {
        if (response.data.status == "success") this.faceitJustRefreshed = true;
      });
    },
    RemoveFaceit() {
      this.$api.postRemoveFaceit().then(response => {
        this.LoadFaceitStatus();
      });
    },
    ConnectFaceit() {
      FACEIT.loginWithFaceit(); // Hier ist FACEIT undefined
    }
  }
};
</script>

<style lang="scss">
.view-upload {
  .bordered-box {
    margin-top: 40px;
    padding: 20px;

    .split {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .l {
        width: 20%;

        img,
        .no-image {
          width: 100%;
          border: 1px solid $purple;
          border-radius: 3px;

          p {
            color: $gray;
            font-size: 12px;
            margin: 0;
            padding: 0;
          }
        }

        .no-image {
          padding: 20px;
          display: flex;
          align-items: center;
          text-align: center;
          height: 222px;
        }
      }

      .r {
        width: 75%;

        a {
          color: $orange;
          text-decoration: none;
        }
      }
    }

    h2,
    p {
      color: white;
    }

    h2 {
      margin-top: 0;
    }

    .download-links {
      display: flex;

      a {
        margin-right: 10px;
      }
    }
  }

  .faceit-name {
    color: $orange;
  }

  .button-wrapper {
    display: flex;
    align-items: center;

    button {
      &:first-child {
        margin-right: 20px;
      }
    }
  }
}
</style>