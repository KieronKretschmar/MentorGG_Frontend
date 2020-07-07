<template>
  <div class="view view-better-membership">
    <template v-if="loadingComplete">
      <div class="fixed-width-container">
        <h2 class="section-header">Membership & Pricing</h2>

        <div class="pricing-boxes">
          <div class="pricing-box">
            <div class="title">Free</div>
            <div class="feature-list">
              <div class="feature circle">
                <span>
                  Analyze a total of
                  <span class="highlight">3</span> matches
                  <span class="highlight">every 24 hours</span>
                </span>
              </div>
              <div class="feature circle">
                <span>
                  <span class="highlight">2 weeks</span> match storage
                </span>
              </div>
              <div class="feature circle">
                <span>
                  <span class="highlight">1 FPS</span> Demo Viewer
                </span>
              </div>
              <div class="feature circle">
                <span>
                  Upload a total of up to
                  <span class="highlight">20 demos</span> manually
                </span>
              </div>
              <div class="feature circle no-border">
                <span>
                  <span class="highlight">Limited</span> filter availability
                </span>
              </div>
              <div class="feature list">Extras</div>
              <div class="feature check">Automatic upload</div>
              <div class="feature check">Grenade analysis</div>
              <div class="feature check">Kill analysis</div>
              <div
                class="feature check"
              >Misplay and highlight detection for the first half of each match</div>
              <div class="feature check">Best and worst positions</div>
            </div>
            <div class="price-tag">
              <span class="price">0</span> / month
            </div>
            <div class="subscribe-button">
              <SubscribeButton
                :forSubscriptionType="Enums.SubscriptionStatus.Free"
                :activeSubscription="subscriptionData.ActiveSubscription"
              />
            </div>
          </div>
          <div class="pricing-box">
            <div class="title">Premium</div>
            <div class="feature-list">
              <div class="feature circle">
                <span>
                  Analyze an
                  <span class="highlight">unlimited</span> number of matches
                </span>
              </div>
              <div class="feature circle">
                <span>
                  <span class="highlight">2 months</span> match storage
                </span>
              </div>
              <div class="feature circle">
                <span>
                  <span class="highlight">4 FPS</span> Demo Viewer
                </span>
              </div>
              <div class="feature circle">
                <span>
                  Upload an
                  <span class="highlight">unlimited</span> number of demos manually
                </span>
              </div>
              <div class="feature circle no-border">
                <span>
                  <span class="highlight">Full</span> filter availability
                </span>
              </div>
              <div class="feature arrow">Includes all FREE extras</div>
              <div class="feature check">Best and worst positions</div>
              <div class="feature check">Access to all misplays & highlights</div>
              <div class="feature check">Download your demos</div>
              <div class="feature check">Extended kill analysis</div>
              <div class="feature check">Premium support</div>
            </div>
            <div class="price-tag">
              <span class="price">{{ availableSubscriptions.Premium.StartingFromMonthly }}*</span> / month
            </div>
            <div class="subscribe-button">
              <SubscribeButton
                :forSubscriptionType="Enums.SubscriptionStatus.Premium"
                :activeSubscription="subscriptionData.ActiveSubscription"
                @subscribe="OnSubscribe($event)"
                @cancel="OnCancelSubscription($event)"
                @upgrade="OnUpgradeSubscription($event)"
              />
            </div>
          </div>
          <div class="pricing-box">
            <div class="title">Ultimate</div>
            <div class="feature-list">
              <div class="feature circle">
                <span>
                  Analyze an
                  <span class="highlight">unlimited</span> number of matches
                </span>
              </div>
              <div class="feature circle">
                <span>
                  <span class="highlight">Unlimited</span> match storage
                </span>
              </div>
              <div class="feature circle">
                <span>
                  <span class="highlight">8 FPS</span> Demo Viewer
                </span>
              </div>
              <div class="feature circle">
                <span>
                  Upload an
                  <span class="highlight">unlimited</span> number of demos manually
                </span>
              </div>
              <div class="feature circle no-border">
                <span>
                  <span class="highlight">Full</span> filter availability
                </span>
              </div>
              <div class="feature arrow">Includes all PREMIUM extras</div>
            </div>
            <div class="price-tag">
              <span class="price">{{ availableSubscriptions.Ultimate.StartingFromMonthly }}*</span> / month
            </div>
            <div class="subscribe-button">
              <SubscribeButton
                :forSubscriptionType="Enums.SubscriptionStatus.Ultimate"
                :activeSubscription="subscriptionData.ActiveSubscription"
                @subscribe="OnSubscribe($event)"
                @cancel="OnCancelSubscription($event)"
                @upgrade="OnUpgradeSubscription($event)"
              />
            </div>
          </div>
        </div>

        <div class="supporter-section">
          <h2 class="section-header">Becoming a MENTOR.GG &raquo;Supporter&laquo;</h2>
          <div class="split">
            <div class="l">
              <div class="bordered-box">
                <p>Follow the steps on the right to become a MENTOR.GG Supporter and benefit from a variety of features.</p>
                <div class="feature-list">
                  <div class="feature check">Access to all misplays & highlights</div>
                  <div class="feature check">Help us to attract new users and keep the project going</div>
                  <div class="feature check">More benefits coming soon</div>
                </div>
              </div>
            </div>
            <div class="r">
              <div class="bordered-box">
                <div class="step">
                  <span class="num">1</span>
                  <span>
                    Put
                    <span class="highlight">MENTOR.GG</span> (case-insensitive) in your steam player name.
                  </span>
                </div>
                <div class="step">
                  <span class="num">2</span> Click the "Verify" button below to start the verification process.
                </div>
                <div class="step">
                  <span class="num">3</span> You now have access to all the benefits that come with being a Supporter.
                </div>

                <div class="status">
                  <button
                    class="button-variant-bordered"
                    :disabled="verifyingUsername"
                    @click="VerifyUsername"
                  >{{ verifyingUsername ? 'Verifying...' : 'Verify' }}</button>
                  <div class="indicator" :class="{verified: isVerified}">
                    <span class="white">Status:</span>
                    <template v-if="verifyingUsername">Loading</template>
                    <template v-else>{{ isVerified ? 'Verified' : 'Not verified' }}</template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="vat-hint">
          <p>* All prices are net prices excl. VAT, which will be charged at the statutory rate depending on your location.</p>
        </div>
      </div>
    </template>

    <GenericOverlay ref="durationPickerOverlay" width="900px">
      <p class="headline">Please pick your desired subscription duration</p>
      <SubscriptionDurationPicker :data="selectedSubscriptionData" @picked="OpenCheckout($event)" />
      <div class="terms-compliance" :class="{failed: failedToAcceptTerms}">
        <CustomCheckbox v-model="termsAccepted" @input="OnTermsAccepted" />
        <p>
          I have read and agree to the
          <router-link target="_blank" :to="{name: 'terms-and-conditions'}">Terms and Conditions</router-link>
        </p>
      </div>
    </GenericOverlay>

    <GenericOverlay ref="upgradeOverlay" width="900px">
      <p class="headline">Oops.</p>
      <p>Please contact us directly if you want to upgrade your current subscription plan.</p>
    </GenericOverlay>
  </div>
</template>

<script>
import Enums from "@/enums";
import Paddle from "paddle";
import GenericOverlay from "@/components/GenericOverlay.vue";
import SubscribeButton from "@/components/Membership/SubscribeButton";
import SubscriptionDurationPicker from "@/components/Membership/SubscriptionDurationPicker.vue";
import CustomCheckbox from "@/components/CustomCheckbox.vue";

export default {
  components: {
    SubscribeButton,
    SubscriptionDurationPicker,
    CustomCheckbox,
    GenericOverlay
  },
  mounted() {
    if (this.$api.User) {
      this.$api
        .getPlayerInfo({ steamId: this.$api.User.GetSteamId(false) })
        .then(response => {
          this.user = response.data;
        });
    }

    this.$api.getSubscriptions().then(response => {
      this.subscriptionData = response.data;
      this.loadingComplete = true;
    });

    this.$nextTick(() => {
      // setup paddle with our vendor id
      Paddle.Setup({ vendor: 110217 });
    });
  },
  data() {
    return {
      Enums,
      user: null,
      verifyingUsername: false,
      subscriptionData: null,
      loadingComplete: false,
      failedToAcceptTerms: false,
      termsAccepted: false,
      selectedSubscription: null
    };
  },
  methods: {
    VerifyUsername() {
      this.$api.LoginGate(() => {
        this.verifyingUsername = true;

        this.$api
          .getPlayerInfo({ steamId: this.$api.User.GetSteamId(false) }, true)
          .then(response => {
            this.verifyingUsername = false;
            this.user = response.data;
          });
      });
    },
    GetSubscriptionData(subscriptionType /*enum*/) {
      if (!this.subscriptionData) {
        return null;
      }

      return this.subscriptionData.AvailableSubscriptions.find(
        x => x.SubscriptionType == subscriptionType
      );
    },
    OnCancelSubscription(subscriptionType) {
      this.$helpers.LogEvent(this, "ShowCancel");
      window.open(this.subscriptionData.ActiveSubscription.CancelUrl, "_blank");
    },
    OnUpgradeSubscription(newSubscriptionType) {
      this.$helpers.LogEvent(this, "AttemptUpgrade");
      this.$refs.upgradeOverlay.Show();
    },
    OnSubscribe(newSubscriptionType) {
      this.$helpers.LogEvent(this, "SelectSubscriptionType", {
        label: newSubscriptionType
      });

      this.$api.LoginGate(() => {
        this.selectedSubscription = newSubscriptionType;
        this.$refs.durationPickerOverlay.Show();
      });
    },
    OpenCheckout(planIndex) {
      if (!this.termsAccepted) {
        this.failedToAcceptTerms = true;
        return false;
      }

      let offer = this.selectedSubscriptionData.Plans[planIndex];

      this.$helpers.LogEvent(this, "OpenCheckout", {
        label: offer.ProductId
      });

      Paddle.Checkout.open({
        product: offer.ProductId,
        passthrough: {
          ApplicationUserId: this.$api.User.applicationUserId
        }
      });
    },
    OnTermsAccepted() {
      this.failedToAcceptTerms = false;
    }
  },
  computed: {
    isVerified() {
      if (!this.user) {
        return false;
      }

      return (
        this.user.SteamUser.SteamName.toLowerCase().indexOf("mentor.gg") != -1
      );
    },
    selectedSubscriptionData() {
      return this.GetSubscriptionData(this.selectedSubscription);
    },
    availableSubscriptions() {
      return {
        Premium: this.GetSubscriptionData(Enums.SubscriptionStatus.Premium),
        Ultimate: this.GetSubscriptionData(Enums.SubscriptionStatus.Ultimate)
      };
    }
  }
};
</script>

<style lang="scss">
// paddle loader styling to avoid weird blackbar loader
.paddle-loader {
  main {
    height: 100vh;
    width: 100vw !important;
    margin: 0;
    padding: 0;
    left: 0;
    top: 0;
    background: fade-out($color: $dark-1, $amount: 0.5) !important;
  }
}

.view-better-membership {
  margin-top: 70px;
  padding: 0 20px;

  .pricing-boxes {
    display: flex;
    margin: -5px;

    .pricing-box {
      width: calc(33.33% - 10px);
      background: $dark-1;
      border: 1px solid $purple;
      margin: 5px;
      border-radius: 4px;
      display: flex;
      flex-direction: column;

      .title {
        color: $orange;
        background: $dark-3;
        padding: 10px;
        text-align: center;
        // font-weight: 500;
        text-transform: uppercase;
        font-size: 20px;
      }

      .price-tag {
        background: $dark-3;
        padding: 10px;
        text-align: center;
        color: $orange;

        .price {
          font-size: 24px;

          &:before {
            content: "$";
          }
        }
      }

      .subscribe-button {
        padding: 10px;

        button {
          width: 100%;
        }
      }
    }
  }

  .feature-list {
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;

    .feature {
      display: flex;
      align-items: center;
      color: white;
      margin-bottom: 10px;
      border-bottom: 1px solid $dark-3;
      padding-bottom: 10px;
      font-size: 14px;

      .highlight {
        font-weight: 700;
        // background: $purple;
        // padding: 2px 3px;
        // border-radius: 4px;
        //   font-weight: 500;
        //   color: $green-2;
      }

      &:last-child {
        border-bottom: 0;
        margin-bottom: 0;
        padding-bottom: 0;
      }

      &.list {
        margin-top: 30px;
        color: $orange;

        &:before {
          content: "list";
          color: $green;
          margin-right: 10px;
          font-family: "Material Icons";
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
        }
      }

      &.check {
        &:before {
          content: "check";
          color: $green;
          margin-right: 10px;
          font-family: "Material Icons";
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
        }
      }

      &.circle {
        &:before {
          content: "star_border";
          color: $dark-4;
          margin-right: 10px;
          font-family: "Material Icons";
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
        }
      }

      &.arrow {
        color: $orange;
        margin-top: 30px;

        &:before {
          content: "west";
          color: $green;
          margin-right: 10px;
          font-family: "Material Icons";
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
        }
      }

      &.no-border {
        border-bottom: 0;
      }
    }
  }

  .vat-hint {
    margin-top: 10px;
    color: white;

    p {
      margin: 0;
      text-align: center;
      font-size: 12px;
    }
  }

  .supporter-section {
    margin-top: 20px;
    margin-bottom: 50px;

    .split {
      display: flex;
      justify-content: space-between;

      .l,
      .r {
        width: calc(50% - 5px);
        color: white;

        .bordered-box {
          height: 100%;

          p {
            &:first-child {
              margin-top: 0;
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      .l {
        p {
          padding: 10px 7px;
          margin-bottom: 0;
        }

        .feature-list {
          padding: 10px 7px;
        }
      }

      .r {
        .step {
          display: flex;
          align-items: center;
          color: white;
          margin-bottom: 10px;

          &:first-child {
            padding-top: 7px;
          }

          .highlight {
            color: $orange;
            font-weight: 500;
            margin: 0 5px;
          }

          .num {
            width: 30px;
            height: 30px;
            flex: 0 0 30px;
            background: $dark-2;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            margin-right: 10px;
            color: white;
          }
        }

        .status {
          display: flex;
          align-items: center;
          margin-top: 20px;
          justify-content: space-between;

          button {
            width: calc(50% - 5px);
          }

          .indicator {
            background: $dark-3;
            width: calc(50% - 5px);
            padding: 5px 10px;
            border-radius: 4px;
            height: 39px;
            display: flex;
            align-items: center;
            color: $red;
            font-weight: 500;

            .white {
              color: white;
              margin-right: 5px;
              font-weight: normal;
            }

            &.verified {
              color: $green-2;
            }
          }
        }
      }
    }
  }

  .subscription-duration-picker {
    margin-top: 40px;
  }

  .terms-compliance {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 4px;
    margin: 0px 35px;
    margin-bottom: 0;
    transition: 0.35s;
    border: 5px solid transparent;
    margin-top: 20px;

    p {
      margin: 0;
      margin-left: 10px;
    }

    &.failed {
      // background: crimson;
      border: 5px solid $red;
    }
  }
}

@media (max-width: 960px) {
  .view-better-membership {
    .pricing-boxes {
      flex-direction: column;

      .pricing-box {
        width: 100%;
        margin-bottom: 20px;
      }
    }

    .supporter-section {
      .split {
        flex-direction: column;

        .l,
        .r {
          width: 100%;
          margin-bottom: 10px;
        }
      }
    }
  }
}

@media (max-width: 500px) {
  .view-better-membership {
    .supporter-section {
      .split {
        .r {
          .status {
            flex-direction: column;

            button,
            .indicator {
              width: 100%;
            }

            .indicator {
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}
</style>