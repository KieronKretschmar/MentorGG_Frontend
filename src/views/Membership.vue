<template>
  <div class="view view-subscription">
    <div v-if="!loadingComplete" class="content-wrapper">
      <div class="bordered-box offer loading-offer">
        <AjaxLoader>Loading subscriptions</AjaxLoader>
      </div>
      <div class="bordered-box offer loading-offer">
        <AjaxLoader>Loading subscriptions</AjaxLoader>
      </div>
      <div class="bordered-box offer loading-offer">
        <AjaxLoader>Loading subscriptions</AjaxLoader>
      </div>
    </div>
    <div v-else class="content-wrapper">
      <div class="bordered-box offer">
        <div class="subheadline">
          <p>FREE</p>
        </div>
        <div class="t free">
          <p>
            <span class="large">$ 0.00</span>
          </p>
        </div>
        <div class="m free">
          <p class="strong scroll-to-features" @click="ScrollToFeaturesTable()">View Features</p>
        </div>
        <div class="b">
          <button v-if="activeSubscription === null" class="button disabled">Owned</button>
        </div>
      </div>

      <div
        class="bordered-box offer"
        :class="{subscribed: hasActiveSubscription(Enums.SubscriptionStatus.Premium)}"
      >
        <div class="subheadline">
          <p>PREMIUM</p>
        </div>
        <div v-if="!hasActiveSubscription(Enums.SubscriptionStatus.Premium)" class="t">
          <p>
            <span class="small">starting at</span>
            <br class="break" />
            <span class="large">$ {{premiumSubscription.StartingFromMonthly}}*</span>
            <br class="break" />
            <span class="small">per month</span>
          </p>
        </div>
        <div v-else class="t">
          <p>
            <span>You are currently subscribed.</span>
            <br />
          </p>
        </div>
        <div class="m">
          <p class="strong scroll-to-features" @click="ScrollToFeaturesTable()">View Features</p>
        </div>
        <div class="b">
          <!-- Subscribe-Button if the user has no subscription -->
          <button
            v-if="activeSubscription === null"
            class="button"
            @click="OnClickSubscribe(Enums.SubscriptionStatus.Premium)"
          >Subscribe</button>
          <!-- Cancel button if the user has this subscription non-cancelled -->
          <button
            v-else-if="hasActiveSubscription(Enums.SubscriptionStatus.Premium) && this.activeSubscription.ExpirationTime === null"
            class="button button-cancel"
            @click="OnClickCancel(Enums.SubscriptionStatus.Premium)"
          >Cancel</button>
          <!-- Show expiration time if the user has already cancelled -->
          <button
            v-else-if="hasActiveSubscription(Enums.SubscriptionStatus.Premium) && this.activeSubscription.ExpirationTime"
            class="button disabled"
          >Cancelled. Expires at {{activeSubscription.ExpirationTime | formatDate}}.</button>
        </div>
      </div>

      <div
        class="bordered-box offer"
        :class="{subscribed: hasActiveSubscription(Enums.SubscriptionStatus.Ultimate)}"
      >
        <div class="subheadline">
          <p>ULTIMATE</p>
        </div>
        <div v-if="!hasActiveSubscription(Enums.SubscriptionStatus.Ultimate)" class="t">
          <p>
            <span class="small">starting at</span>
            <br class="break" />
            <span class="large">$ {{ultimateSubscription.StartingFromMonthly}}*</span>
            <br class="break" />
            <span class="small">per month</span>
          </p>
        </div>
        <div v-else class="t">
          <p>
            <span>Currently subscribed.</span>
            <br />
          </p>
        </div>
        <div class="m">
          <p class="strong scroll-to-features" @click="ScrollToFeaturesTable()">View Features</p>
        </div>
        <div class="b">
          <!-- Subscribe-Button if the user has no subscription -->
          <button
            v-if="activeSubscription === null"
            class="button"
            @click="OnClickSubscribe(Enums.SubscriptionStatus.Ultimate)"
          >Subscribe</button>
          <!-- Cancel button if the user has this subscription non-cancelled -->
          <button
            v-else-if="hasActiveSubscription(Enums.SubscriptionStatus.Ultimate) && this.activeSubscription.ExpirationTime === null"
            class="button button-cancel"
            @click="OnClickCancel(Enums.SubscriptionStatus.Ultimate)"
          >Cancel</button>
          <!-- Show expiration time if the user has already cancelled -->
          <button
            v-else-if="hasActiveSubscription(Enums.SubscriptionStatus.Ultimate) && this.activeSubscription.ExpirationTime"
            class="button disabled"
          >Cancelled. Expires at {{activeSubscription.ExpirationTime}}.</button>
          <!-- Upgrade Option if the user has a premium subscription -->
          <button
            v-else-if="hasActiveSubscription(Enums.SubscriptionStatus.Premium) && this.allSubscriptions.some(x=> x.SubscriptionType == Enums.SubscriptionStatus.Ultimate)"
            class="button"
            @click="OpenUpgradeOverlay()"
          >Upgrade</button>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="bordered-box offer-table">
        <p>* All prices are net prices excl. VAT, which will be charged at the statutory rate depending on your location.</p>
      </div>
    </div>

    <div class="content-wrapper anchor">
      <div class="bordered-box offer-table features">
        <div class="table-header">
          <span>FEATURES</span>
          <span>FREE</span>
          <span>PREMIUM</span>
          <span>ULTIMATE</span>
        </div>
        <div class="table-content">
          <span>Analyze matches</span>
          <span>First 3 played every 24h period</span>
          <span>Unlimited</span>
          <span>Unlimited</span>
        </div>
        <div class="table-content">
          <span>Match storage</span>
          <span>2 weeks</span>
          <span>2 months</span>
          <span>Unlimited</span>
        </div>
        <div class="table-content">
          <span>2D DemoViewer</span>
          <span>Low quality (1 FPS)</span>
          <span>Medium quality (4 FPS)</span>
          <span>High quality (8 FPS)</span>
        </div>
        <div class="table-content">
          <span>Demo upload</span>
          <span>Up to 20 demos manually</span>
          <span>Unlimited manual uploads</span>
          <span>Unlimited manual uploads</span>
        </div>
        <div class="table-content">
          <span>Filter matches by</span>
          <span>Map</span>
          <span>Map, Source, Selection</span>
          <span>Map, Source, Selection</span>
        </div>
        <div class="table-content">
          <span>Automatic upload</span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
        </div>
        <div class="table-content">
          <span>Grenade analysis</span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
        </div>
        <div class="table-content">
          <span>Kill analysis</span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
        </div>
        <div class="table-content">
          <span>Misplay detection</span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
        </div>
        <div class="table-content">
          <span>Best and worst positions</span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
        </div>
        <div class="table-content">
          <span>Demo download</span>
          <span class="cross"></span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
        </div>
        <div class="table-content">
          <span>Extended kill analysis</span>
          <span class="cross"></span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
        </div>
        <div class="table-content">
          <span>Premium Discord support</span>
          <span class="cross"></span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
          <span class="check">
            <i class="material-icons">check</i>
          </span>
        </div>
      </div>
    </div>

    <GenericOverlay ref="durationPicker" width="1070px">
      <SubscriptionDurationPicker
        :data="selectedSubscriptionData"
        v-on:paddleCheckout="openCheckout($event)"
      />
    </GenericOverlay>

    <GenericOverlay ref="confirmCancellationOverlay" width="400px" height="150px">
      <div class="confirm-cancellation">
        <p>
          <span>Are you sure you want to cancel?</span>
        </p>

        <button class="button button-cancel" @click="OnCancelConfirmed()">Cancel Subscription</button>
      </div>
    </GenericOverlay>

    <GenericOverlay ref="upgradeOverlay" width="1070px">
      <h3 style="color: white;">Error</h3>
      <hr />
      <p>Please contact us directly if you want to upgrade.</p>
    </GenericOverlay>
  </div>
</template>

<script>
import Paddle from "paddle";
import Enums from "@/enums";
import GenericOverlay from "@/components/GenericOverlay.vue";
import SubscriptionDurationPicker from "@/components/SubscriptionDurationPicker.vue";

export default {
  data() {
    return {
      Enums,
      allSubscriptions: [],
      activeSubscription: [],
      selectedSubscription: null,
      loadingComplete: false
    };
  },
  mounted() {
    this.LoadData();
    this.$nextTick(() => {
      // setup paddle with our vendor id
      Paddle.Setup({ vendor: 110217 });
    });
  },
  components: {
    GenericOverlay,
    SubscriptionDurationPicker
  },
  methods: {
    OnClickSubscribe(subscriptionType) {
      this.$helpers.LogEvent(this, "SelectSubscriptionType", {
        label: subscriptionType
      });

      this.selectedSubscription = subscriptionType;
      this.OpenDurationPicker(subscriptionType);
    },
    OnClickCancel() {
      this.$helpers.LogEvent(this, "ShowCancel");

      this.$refs.confirmCancellationOverlay.Show();
    },
    OnCancelConfirmed() {
      this.$helpers.LogEvent(this, "ConfirmCancel");

      window.open(this.activeSubscription.CancelUrl, "_blank");
    },
    OpenDurationPicker(subscriptionType) {
      this.$refs.durationPicker.Show();
    },
    OpenUpgradeOverlay() {
      this.$helpers.LogEvent(this, "AttemptUpgrade");
      // Upgrade is not yet implemented. Show message in overlay instead.
      this.$refs.upgradeOverlay.Show();
    },
    ScrollToFeaturesTable() {
      var container = this.$el.querySelector(".anchor");
      container.scrollIntoView({ block: "start", behavior: "smooth" });
    },
    LoadData() {
      this.$api.getSubscriptions().then(response => {
        this.activeSubscription = response.data.ActiveSubscription;
        this.allSubscriptions = response.data.AvailableSubscriptions;
        this.loadingComplete = true;
      });
    },
    getSubscription(subscriptionStatus) {
      return this.allSubscriptions.find(
        x => x.subscriptionStatus == subscriptionStatus
      );
    },
    openCheckout(offerIndex) {
      let offer = this.selectedSubscriptionData.Plans[offerIndex];

      this.$helpers.LogEvent(this, "OpenCheckout", { label: offer.ProductId });

      Paddle.Checkout.open({
        product: offer.ProductId,
        passthrough: { ApplicationUserId: this.$api.User.applicationUserId }
      });
    },
    hasActiveSubscription(subscriptionType) {
      return (
        this.activeSubscription &&
        this.activeSubscription.SubscriptionType === subscriptionType
      );
    }
  },
  computed: {
    selectedSubscriptionData() {
      if (!this.allSubscriptions) {
        return null;
      }
      return this.allSubscriptions.find(
        x => x.SubscriptionType == this.selectedSubscription
      );
    },
    premiumSubscription() {
      if (!this.allSubscriptions) {
        return null;
      }
      return this.allSubscriptions.find(
        x => x.SubscriptionType == this.Enums.SubscriptionStatus.Premium
      );
    },
    ultimateSubscription() {
      if (!this.allSubscriptions) {
        return null;
      }
      return this.allSubscriptions.find(
        x => x.SubscriptionType == this.Enums.SubscriptionStatus.Ultimate
      );
    }
  }
};
</script>

<style lang="scss">
.view-subscription {
  margin: 5px 20px 60px 20px;

  .content-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .bordered-box {
    background: $dark-1;
    border: 1px solid $purple;
    padding: 10px 25px;
    border-radius: 4px;
    min-width: 300px;
    width: calc(33% - 5px);

    &.offer {
      height: 325px;
      width: 350px;
      margin: 5px;
      padding: 0;
      text-align: center;

      &.subscribed {
        border: 1px solid $orange;
        // TODO: style the offer in case of subscription
        .subheadline {
          background: $dark-2;
        }
      }

      &.loading-offer {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .t {
        height: 140px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .m {
        height: 30px;
        margin: 0 0 15px 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .scroll-to-features {
          cursor: pointer;
        }
      }

      .b {
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
      }

      .subheadline {
        display: flex;
        background-color: $dark-3;
        padding: 10px;
        margin: 0;
        width: 100%;
        height: 50px;
        border-radius: 4px 4px 0 0;

        p {
          align-self: center;
          color: $orange;
          font-size: 1.3rem;
          font-weight: 500;
          margin: 0 auto;
        }
      }
    }
  }

  .confirm-cancellation {
    height: 140px;
    display: block;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  p {
    color: #fff;
    font-weight: 500;
  }

  p span {
    display: inline-block;
  }

  .large {
    font-size: 2rem;
    font-weight: 500;
    padding: 3px 0;
  }

  .strong {
    font-weight: 500;
    text-decoration: underline;
    margin: 0;
  }

  .material-icons {
    line-height: 0.8;
  }

  .check {
    height: 18px;
    color: $orange;
  }

  .button {
    min-width: 160px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    border-radius: 10px;
    padding: 0.65em 1.785em 0.65em 1.785em;
    background-color: $green-2;
    border: 1px solid $green;
    line-height: 1;
    cursor: pointer;
    outline: 0;

    &.disabled {
      color: $dark-4;
      background-color: transparent;
      border: 1px solid $dark-4;
      cursor: not-allowed;
      white-space: normal;
    }
  }

  .offer-table {
    background: $dark-1;
    flex-grow: 1;
    margin: 5px;
    padding: 0;
    text-align: center;
    max-width: 1070px;
    font-size: 14px;

    &.features {
      margin-top: 20px;
    }

    .table-header {
      color: $orange;
      background-color: $dark-3;
      font-size: 12px;
      font-weight: 500;
      display: flex;
      padding: 12px 32px 12px 32px;
      margin: 0;
      border-radius: 4px 4px 0 0;

      span {
        &:nth-child(1) {
          width: 25%;
          color: #fff;
        }
        &:nth-child(2) {
          width: 25%;
        }
        &:nth-child(3) {
          width: 25%;
        }
        &:nth-child(4) {
          width: 25%;
        }
      }
    }

    .table-content {
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      border-bottom: 1px solid $purple;
      padding: 12px;
      margin: 0 20px 0 20px;

      &:last-child {
        border-bottom: none;
      }

      span {
        &:nth-child(1) {
          width: 25%;
        }

        &:nth-child(2) {
          width: 25%;
        }

        &:nth-child(3) {
          width: 25%;
        }

        &:nth-child(4) {
          width: 25%;
        }
      }
    }
  }
}

@media (max-width: 960px) {
  .view-subscription {
    .content-wrapper {
      &.anchor {
        margin-top: -40px;
        padding-top: 40px;
      }
    }
    .bordered-box {
      &.offer {
        height: 192px;

        .t {
          padding-top: 5px;
          height: 60px;

          &.free {
            padding-top: 35px;
          }
        }

        .m {
          height: 25px;
          margin: 5px 0 0 0;
        }

        .b {
          height: 50px;
          padding-bottom: 10px;
        }

        .large {
          font-size: 1.5rem;
          padding: 0 5px 0 8px;
        }

        .strong {
          padding-bottom: 18px;
        }

        .free {
          .strong {
            padding-bottom: 0;
          }
        }

        .small {
          font-size: 0.9rem;
          font-weight: 400;
          padding-top: 15px;
        }

        .break {
          display: none;
        }
      }
    }

    .button {
      font-size: 14px;
    }

    .offer-table {
      white-space: pre-line;

      &.features {
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
      }

      .table-header {
        width: 938px;

        span {
          &:nth-child(1) {
            min-width: 210px;
            color: #fff;
          }
          &:nth-child(2) {
            min-width: 210px;
          }
          &:nth-child(3) {
            min-width: 210px;
          }
          &:nth-child(4) {
            min-width: 210px;
          }
        }
      }

      .table-content {
        min-width: 900px;

        span {
          &:nth-child(1) {
            min-width: 210px;
          }

          &:nth-child(2) {
            min-width: 210px;
          }

          &:nth-child(3) {
            min-width: 210px;
          }

          &:nth-child(4) {
            min-width: 210px;
          }
        }
      }
    }
  }
}
</style>