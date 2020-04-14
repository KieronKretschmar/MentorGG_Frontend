<template>
  <div class="view view-subscription">       
    <div v-if="!loadingComplete" class="wrapper-top">
      <div class="bordered-box no-offers">
        <AjaxLoader>Loading subscriptions</AjaxLoader>
      </div>
    </div>
    <div v-else class="wrapper-top">  

      <div class="bordered-box offer">
        <div class="subheadline">
          <p>FREE</p>
        </div>
        <div class="content">
          <p>
            <span class="large upper">$ 0.00</span>
          </p>
        </div>
        <div class="content-two">
          <p class="strong scroll-to-features" @click="ScrollToFeaturesTable()">View Features</p>
        </div>
        <div class="content-three">
          <button v-if="activeSubscription === null" class="button-disabled">Owned</button>
        </div>
      </div>

      <div 
        class="bordered-box offer"
        :class="{subscribed: hasActiveSubscription(Enums.SubscriptionStatus.Premium)}"
        >
        <div class="subheadline">
          <p>PREMIUM</p>
        </div>
        <div v-if="!hasActiveSubscription(Enums.SubscriptionStatus.Premium)" class="content">
          <p>
            <span>starting at</span>
            <br />
            <span class="large">$ {{premiumSubscription.StartingFromMonthly}}*</span>
            <br />
            <span>per month</span>
          </p>
        </div>
        <div v-else class="content">
          <p>
            <span>You are currently subscribed.</span>
              <br />
          </p>
        </div>
        <div class="content-two">
          <p class="strong scroll-to-features" @click="ScrollToFeaturesTable()">View Features</p>
        </div>
        <div class="content-three">
          <!-- Subscribe-Button if the user has no subscription -->
          <button v-if="activeSubscription === null" 
          class="button" 
          @click="OnClickSubscribe(Enums.SubscriptionStatus.Premium)">
            Subscribe
          </button>
          <!-- Cancel button if the user has this subscription non-cancelled -->
          <button v-else-if="hasActiveSubscription(Enums.SubscriptionStatus.Premium) && this.activeSubscription.ExpirationTime === null" 
          class="button button-cancel" 
          @click="OnClickCancel(Enums.SubscriptionStatus.Premium)">
            Cancel
          </button>
          <!-- Show expiration time if the user has already cancelled -->
          <button v-else-if="hasActiveSubscription(Enums.SubscriptionStatus.Premium) && this.activeSubscription.ExpirationTime" 
          class="button-disabled">
            Cancelled. Expires at {{activeSubscription.ExpirationTime | formatDate}}.
          </button>
        </div>
      </div>

      <div 
        class="bordered-box offer"
        :class="{subscribed: hasActiveSubscription(Enums.SubscriptionStatus.Ultimate)}"
        >
        <div class="subheadline">
          <p>ULTIMATE</p>
        </div>
        <div v-if="!hasActiveSubscription(Enums.SubscriptionStatus.Ultimate)" class="content">
          <p>
            <span>starting at</span>
            <br />
            <span class="large">$ {{ultimateSubscription.StartingFromMonthly}}*</span>
            <br />
            <span>per month</span>
          </p>
        </div>
        <div v-else class="content">
          <p>
            <span>Currently subscribed.</span>
              <br />
          </p>
        </div>
        <div class="content-two">
          <p class="strong scroll-to-features" @click="ScrollToFeaturesTable()">View Features</p>
        </div>
        <div class="content-three">
          <!-- Subscribe-Button if the user has no subscription -->
          <button v-if="activeSubscription === null" 
          class="button" 
          @click="OnClickSubscribe(Enums.SubscriptionStatus.Ultimate)">
            Subscribe
          </button>
          <!-- Cancel button if the user has this subscription non-cancelled -->
          <button v-else-if="hasActiveSubscription(Enums.SubscriptionStatus.Ultimate) && this.activeSubscription.ExpirationTime === null" 
          class="button button-cancel" 
          @click="OnClickCancel(Enums.SubscriptionStatus.Ultimate)">
            Cancel
          </button>
          <!-- Show expiration time if the user has already cancelled -->
          <button v-else-if="hasActiveSubscription(Enums.SubscriptionStatus.Ultimate) && this.activeSubscription.ExpirationTime" 
          class="button-disabled">
            Cancelled. Expires at {{activeSubscription.ExpirationTime}}.
          </button>
          <!-- Upgrade Option if the user has a premium subscription -->
          <button v-else-if="hasActiveSubscription(Enums.SubscriptionStatus.Premium) && this.availableSubscriptions.some(x=> x.SubscriptionType == Enums.SubscriptionStatus.Ultimate)"
            class="button"
            @click="OpenUpgradeOverlay()">
            Upgrade
          </button>
        </div>
      </div>
    </div>

    <div class="wrapper-middle">
      <div class="bordered-box offer-table">
        <p>*All prices are net prices excl. VAT, which will be charged at the statutory rate depending on your location.</p>
      </div>
    </div>

    <div id="features" class="wrapper-bottom">
      <div class="bordered-box offer-table-two">
        <div class="table-header">
          <span>FEATURES</span>
          <span>FREE</span>
          <span>PREMIUM</span>
          <span>ULTIMATE</span>
        </div>
        <div class="table-content">
          <span>Analyze matches</span>
          <span>3 per day</span>
          <span>5 per day</span>
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
          <span>Premium support in our Discord</span>
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
          <span> Are you sure you want to cancel?</span>
        </p>

        <button class="button button-cancel" @click="OnCancelConfirmed()">Cancel Subscription</button>
      </div>
    </GenericOverlay>

    <GenericOverlay ref="upgradeOverlay" width="1070px">
      <h3 style="color: white;">
        Error
      </h3>
      <hr>
      <p>
        Please contact us directly if you want to upgrade.
      </p>
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
      availableSubscriptions: [],
      activeSubscription: [],
      selectedSubscription: null,
      loadingComplete: false,
    }
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
    OnClickSubscribe(subscriptionType){
      this.$helpers.LogEvent(this, "SelectSubscriptionType", { label: subscriptionType});

      this.selectedSubscription = subscriptionType;
      this.OpenDurationPicker(subscriptionType);
    },
    OnClickCancel(){
      this.$helpers.LogEvent(this, "ShowCancel");

      this.$refs.confirmCancellationOverlay.Show();
    },
    OnCancelConfirmed(){
      this.$helpers.LogEvent(this, "ConfirmCancel");

      window.open(this.activeSubscription.CancelUrl, "_blank")
    },
    OpenDurationPicker(subscriptionType) {
      this.$refs.durationPicker.Show();
    },
    OpenUpgradeOverlay(){
      this.$helpers.LogEvent(this, "AttemptUpgrade");
      // Upgrade is not yet implemented. Show message in overlay instead.
      this.$refs.upgradeOverlay.Show();
    },
    ScrollToFeaturesTable(){
      var container = this.$el.querySelector(".wrapper-bottom");
      container.scrollIntoView({ block: 'start',  behavior: 'smooth' });
    },
    LoadData(){
      this.$api.getSubscriptions().then( response => {
        this.activeSubscription = response.data.ActiveSubscription;
        this.availableSubscriptions = response.data.AvailableSubscriptions;
        this.loadingComplete = true;
      })
    },
    getSubscription(subscriptionStatus){
      return this.availableSubscriptions.find(x=>x.subscriptionStatus == subscriptionStatus);
    },
    openCheckout(offerIndex) {
      let offer = this.selectedSubscriptionData.Plans[offerIndex];

      this.$helpers.LogEvent(this, "OpenCheckout", {label: offer.ProductId});

      Paddle.Checkout.open(
        { 
          product: offer.ProductId,
          passthrough: {ApplicationUserId: this.$api.User.applicationUserId}
        });
    },
    hasActiveSubscription(subscriptionType) {
      return this.activeSubscription && this.activeSubscription.SubscriptionType === subscriptionType;
    }
  },
  computed: {
    selectedSubscriptionData() {
      if(!this.availableSubscriptions){
        return null;
      }
      return this.availableSubscriptions.find(x=>x.SubscriptionType == this.selectedSubscription);
    },
    premiumSubscription() {
      if(!this.availableSubscriptions){
        return null;
      }
      return this.availableSubscriptions.find(x=>x.SubscriptionType == this.Enums.SubscriptionStatus.Premium);
    },
    ultimateSubscription() {
      if(!this.availableSubscriptions){
        return null;
      }
      return this.availableSubscriptions.find(x=>x.SubscriptionType == this.Enums.SubscriptionStatus.Ultimate);
    },
  }
};
</script>

<style lang="scss">
.view-subscription {
  margin: 20px 20px 60px 20px;

  .scroll-to-features {
    cursor: pointer;
  }

  .bordered-box {
    background: $dark-1;
    border: 1px solid $purple;
    padding: 10px 25px;
    border-radius: 4px;
    min-width: 300px;
    width: calc(33% - 5px);
  }

  .offer {
    background: $dark-1;
    flex-grow: 1;
    margin: 5px;
    padding: 0;
    text-align: center;
    max-width: 350px;

    &.subscribed{
      border: 1px solid $orange;
      // TODO: style the offer in case of subscription
      .subheadline{
        background: $dark-2;
      }
    }
  }

  .confirm-cancellation{
    height: 140px;
    display: block;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .content {
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-two {
    height: 30px;
    margin: 0 0 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-three {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .wrapper-top {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .no-offers{
      flex-grow: 1;
      margin: 5px;
      max-width: 1070px;
    }
  }

  .wrapper-middle {
    display: flex;
    justify-content: center;
  }

  .wrapper-bottom {
    display: flex;
    justify-content: center;
  }

  p {
    color: #fff;
    font-weight: 500;
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

  p span {
    display: inline-block;
  }

  .large {
    font-size: 2rem;
    font-weight: 500;
    padding: 3px 0;
  }

  .small {
    font-size: 0.9rem;
    font-weight: 400;
    padding-top: 15px;
  }

  /*.high {
    vertical-align: top;
  }*/

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
  /*.cross {
    font-size: 14px;
    color: $red;
  } */

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

    &-disabled {
      @extend .button;
      color: $dark-4;
      background-color: transparent;
      border: 1px solid $dark-4;
      cursor: not-allowed;
    }
    
    &.button-cancel{
      background: #666;
      border: 1px solid #999;
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

    &-two {
      @extend .offer-table;
      margin-top: 20px;
    }
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
</style>