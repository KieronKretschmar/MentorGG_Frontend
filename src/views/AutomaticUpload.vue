<template>
  <div class="view view-connections">
    <GenericOverlay class="valve-overlay" ref="valveOverlay" width="900px">
      <p class="headline">Connect your Steam account</p>
      <p>
        In order for you to connect your Steam account, we need you to login
        <a
          href="https://help.steampowered.com/en/wizard/HelpWithGameIssue/?appid=730&issueid=128"
          target="_blank"
        >here.</a>
      </p>
      <p>
        After you have logged in, you will see the section
        <b>Access to Your Match History</b>.
      </p>
      <p>You will either see a button prompting you to create an Authentication Code, or, if you have already created one in the past, your Authentication Code along with the share code (match token) from your very last official CS:GO match.</p>
      <p>So, if you haven't yet, go ahead and create your authentication code. As soon as it's available to you, copy it into the box below. Then, copy your share code into the second box.</p>

      <div class="input-label-wrapper">
        <label for="input-authcode">Authentication Code</label>
        <input
          type="text"
          spellcheck="false"
          id="input-authcode"
          placeholder="XXXX-XXXXX-XXXX"
          v-model="valveAuthToken"
        />
      </div>
      <div class="input-label-wrapper">
        <label for="input-sharecode">Share Code</label>
        <input
          type="text"
          spellcheck="false"
          id="input-sharecode"
          placeholder="CSGO-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
          v-model="valveShareCode"
        />
      </div>

      <AjaxLoader style="margin-bottom: 20px;" v-if="connectingValve">Connecting</AjaxLoader>
      <p
        v-if="valveConnectionFailed && !connectingValve"
        class="connection-error"
      >Connection failed. Please make sure that you've entered everything correctly and try again.</p>

      <button v-if="!connectingValve" class="button-variant-bordered" @click="AttemptValveConnect">Connect</button>
    </GenericOverlay>

    <div class="fixed-width-container">
      <div class="bordered-box">
        <h2>Automatic Upload</h2>
        <p>By connecting your MENTOR.GG account with a service, you allow us to automatically fetch your matches from said service. Whenever you play a match, you will be able to analyze it on our site shortly after you've finished playing.</p>
      </div>
    </div>

    <div class="fixed-width-container" v-if="!loadedConnections">
      <div class="bordered-box">
        <AjaxLoader>Loading connection info</AjaxLoader>
      </div>
    </div>
    <div class="fixed-width-container" v-else>
      <div class="bordered-box">
        <div class="split">
          <div class="l">
            <img src="@/assets/steam-logo.jpg" />
          </div>
          <div class="r">
            <h2>
              CS:GO Matchmaking
              <span v-if="valveStatus"
                class="connection-status"
                :class="{yes: valveStatus.IsConnected}"
              >{{ valveStatus.IsConnected ? 'connected' : 'not connected' }}</span>
            </h2>
            <div v-if="valveStatus">
              <div v-if="valveStatus.IsConnected">
                <p>Your account is currently connected.</p>
                <div class="button-wrapper">
                  <button class="button-variant-bordered" @click="DisconnectValve">Disconnect</button>
                </div>
              </div>
              <div v-else>
                <button class="button-variant-bordered" @click="ConnectValve">Connect</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bordered-box">
        <div class="split">
          <div class="l">
            <img src="@/assets/faceit-logo.jpg" />
          </div>
          <div class="r">
            <h2>
              FACEIT
              <span
                class="connection-status"
                :class="{yes: faceitStatus.IsConnected}"
              >{{ faceitStatus.IsConnected ? 'connected' : 'not connected' }}</span>
            </h2>
            <div v-if="faceitStatus">
              <div v-if="faceitStatus.IsConnected">
                <p>
                  Your MENTOR.GG account is currently connected to this Faceit Account:
                  <span
                    class="faceit-name"
                  >{{ faceitStatus.FaceitName }}</span>
                  <br />
                  <span
                    v-if="Date.parse(faceitStatus.LastCheck) ==  Date.parse('1970') || faceitJustRefreshed"
                  >Currently looking for new Faceit Matches</span>
                  <span v-else>
                    Last check for new Faceit matches at:
                    {{ faceitStatus.LastCheck|formatDate }}
                  </span>
                </p>
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
import GenericOverlay from "@/components/GenericOverlay.vue";

export default {
  components: {
    GenericOverlay
  },
  data() {
    return {
      faceitStatus: null,
      faceit: FACEIT,
      faceitJustRefreshed: false,

      valveOverlayVisible: false,
      valveStatus: null,
      valveAuthToken: "",
      valveShareCode: "",

      loadedConnections: true,
      connectingValve: false,
      valveConnectionFailed: false
    };
  },
  mounted() {
    // Init FACEIT
    let initParams = {
      client_id: "d7044f7f-caeb-4a36-9013-9111563d3dd3", // redirects to mentor.gg
      // client_id: "98dfbe01-bc76-4148-90f0-a9221c963a9f", // redirects to localhost
      response_type: "code",
      state: "",
      redirect_popup: false,
      debug: false
    };

    FACEIT.init(initParams);

    // Fetch connections
    this.UpdateConnections();
  },
  methods: {
    ConnectValve() {
      this.$refs.valveOverlay.Show();
    },
    DisconnectValve() {
      this.$api.removeValveConnection().then(result => {
        this.UpdateConnections();
        this.$api.stopLookingForValveMatches();
      });
    },
    AttemptValveConnect() {
      this.connectingValve = true;

      this.$api
        .updateValveConnection(this.valveAuthToken, this.valveShareCode)
        .then(response => {
          this.valveConnectionFailed = !response.data.IsValid;

          if (response.data.IsValid) {
            this.$api.startLookingForValveMatches();
            this.UpdateConnections();
            this.$refs.valveOverlay.Hide();
          }

          this.connectingValve = false;
        });
    },
    RefreshFaceit() {
      this.$api.postRefreshFaceit().then(response => {
        if (response.data.status == "success") this.faceitJustRefreshed = true;
      });
    },
    RemoveFaceit() {
      this.$api.postRemoveFaceit().then(response => {
        this.UpdateConnections();
      });
    },
    ConnectFaceit() {
      FACEIT.loginWithFaceit();
    },
    UpdateConnections() {
      this.$api.getConnections().then(response => {
        this.faceitStatus = response.data.Faceit;
        this.valveStatus = response.data.Valve;

        this.loadedConnections = true;
      });
    }
  }
};
</script>

<style lang="scss">
.view-connections {
  position: relative;

  .valve-overlay {
    .input-label-wrapper {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-bottom: 20px;

      label {
        width: 100%;
        color: $orange;
        margin-bottom: 5px;
      }

      input {
        background: $purple;
        color: white;
        padding: 10px 20px;
        border: 0;
        outline: 0;
        font-weight: 400;
        font-family: inherit;
      }
    }

    button {
      width: 100%;
      max-width: 200px;
      padding: 10px 20px;
      margin: 0 auto;
      display: block;
    }

    .connection-error {
      text-align: center;
      color: crimson;
    }
  }

  .bordered-box {
    margin-top: 40px;
    padding: 20px;

    .split {
      display: flex;
      justify-content: space-between;
      // align-items: center;

      .l {
        width: 150px;

        img,
        .no-image {
          width: 100%;
          border: 1px solid $purple;
          border-radius: 3px;
          height: 150px;
          object-fit: cover;
          object-position: center;

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
        width: calc(100% - 170px);

        a {
          color: $orange;
          text-decoration: none;
        }

        h2 {
          font-weight: 400;
          border-bottom: 1px solid $purple;
          margin-top: 0;

          span {
            float: right;
            background: crimson;
            color: white;
            font-size: 12px;
            padding: 5px;
            width: 100px;
            text-align: center;

            &.yes {
              background: green;
            }
          }
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