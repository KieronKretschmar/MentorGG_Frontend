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
        class="error-msg"
      >Connection failed. Please make sure that you've entered everything correctly and try again.</p>

      <p
        v-if="authCodeIsInvalid"
        class="error-msg"
      >Authentication code is not valid (Valid pattern: XXXX-XXXXX-XXXX)</p>
      <p
        v-if="shareCodeIsInvalid"
        class="error-msg"
      >Share code is not valid (Valid pattern: CSGO-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX)</p>

      <button
        v-if="!connectingValve"
        class="button-variant-bordered"
        @click="AttemptValveConnect"
        :disabled="!formIsValid"
      >Connect</button>
    </GenericOverlay>

    <div class="fixed-width-container">
      <h2 class="section-header">Automatic Upload</h2>
      <div class="bordered-box">
        <p>By connecting your MENTOR.GG account with a service, you allow us to automatically fetch your matches from said service. Whenever you play a match, you will be able to analyze it on our site shortly after you've finished playing.</p>
      </div>
    </div>

    <div class="fixed-width-container" v-if="!loadedConnections">
      <div class="bordered-box">
        <AjaxLoader>Loading connection info</AjaxLoader>
      </div>
    </div>
    <div class="fixed-width-container" v-else>
      <h2 class="section-header m-top">
        <span>Official CS:GO Matchmaking</span>
        <span
          class="status"
          :class="{y: valveStatus}"
        >{{ valveStatus ? 'connected' : 'not connected' }}</span>
      </h2>
      <div class="bordered-box">
        <div class="split">
          <div class="l">
            <img src="@/assets/steam-logo.jpg" />
          </div>
          <div class="r">
            <div>
              <div v-if="valveStatus">
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
      <h2 class="section-header m-top">
        <span>FACEIT</span>
        <span
          class="status"
          :class="{y: faceitStatus}"
        >{{ faceitStatus ? 'connected' : 'not connected' }}</span>
      </h2>
      <div class="bordered-box">
        <div class="split">
          <div class="l">
            <img src="@/assets/faceit-logo.jpg" />
          </div>
          <div class="r">
            <div>
              <div v-if="faceitStatus">
                <p>
                  Your MENTOR.GG account is currently connected to this Faceit Account:
                  <span
                    class="faceit-name"
                  >{{ faceitStatus.FaceitName }}</span>
                  <br />
                  <span
                    v-if="Date.parse(faceitStatus.lastChecked) ==  Date.parse('1970') || faceitJustRefreshed"
                  >Currently looking for new Faceit Matches</span>
                  <span v-else>
                    Last check for new Faceit matches at:
                    {{ faceitStatus.lastChecked|formatDateAndTime }}
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
import Enums from "@/enums";

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
      client_id: "11558ac9-0b02-4ad2-9e8e-8d908e837433", // redirects to api.mentor.gg
      // client_id: "4b10b353-9e78-4c81-81a8-438b1258bf16", // redirects to localhost
      response_type: "code",
      state: "",
      redirect_popup: true,
      debug: false
    };

    FACEIT.init(initParams);

    // Fetch connections
    this.UpdateConnections();
  },
  computed: {
    authCodeIsValid() {
      return this.valveAuthToken.length == 15;
    },
    shareCodeIsValid() {
      return this.valveShareCode.length == 34;
    },
    formIsValid() {
      return this.authCodeIsValid && this.shareCodeIsValid;
    },
    authCodeIsInvalid() {
      return this.valveAuthToken.length !== 15 && this.valveAuthToken !== "";
    },
    shareCodeIsInvalid() {
      return this.valveShareCode.length !== 34 && this.valveShareCode !== "";
    }
  },
  methods: {
    ConnectValve() {
      this.$api.LoginGate(() => {
        this.$refs.valveOverlay.Show();
      });
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
          this.valveConnectionFailed = false;
          this.$api.startLookingForValveMatches();
          this.UpdateConnections();
          this.$refs.valveOverlay.Hide();
          this.connectingValve = false;

          this.$emit("valve-connected");
        })
        .catch(response => {
          this.valveConnectionFailed = true;
          this.connectingValve = false;
        });
    },
    RefreshFaceit() {
      this.$api.lookForMatchesFaceit().then(response => {
        this.UpdateConnections();
      });
    },
    RemoveFaceit() {
      this.$api.removeFaceitConnection().then(response => {
        this.UpdateConnections();
      });
    },
    ConnectFaceit() {
      this.$api.LoginGate(() => {
        FACEIT.loginWithFaceit();
      });
    },
    UpdateConnections() {
      this.$api.getConnectionsObject().then(connectionsObj => {
        this.valveStatus = connectionsObj[Enums.Source.Valve] || null;
        this.faceitStatus = connectionsObj[Enums.Source.Faceit] || null;

        this.loadedConnections = true;
      });
    }
  }
};
</script>

<style lang="scss">
.view-connections {
  position: relative;
  margin-top: 70px;

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .status {
      background: $red;
      color: white;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      padding: 5px 10px;
      text-transform: uppercase;
      width: 130px;
      text-align: center;

      &.y {
        background: $green-2;
      }
    }
  }

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

    .error-msg {
      text-align: center;
      color: crimson;
    }
  }

  .bordered-box {
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
          border-radius: 4px;
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