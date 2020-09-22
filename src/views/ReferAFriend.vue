<template>
  <div class="view view-refer-a-friend">
    <div class="fixed-width-container">
      <h2 class="section-header">Refer A Friend</h2>
      <div>
        
      </div>
      <div class="bordered-box">
        <p class="text">
          Refer MENTOR.GG to 4 friends using the link below to get one month of PREMIUM for free.
          <br />
          <br />Please read these rules carefully:
          <ol>
            <li>The offer is only available for non-subscribed users.</li>
            <li>Every user can only participate once.</li>
            <li>
              To start the free month, you will be asked to start a paid monthly subscription, which means you will have to enter payment details. 
              You can cancel it right after through the membership page and no costs will occur.
            </li>
            <li>Users have to sign up for the first time on MENTOR.GG using your link</li>
            <li>Once 4 friends signed up, a button and a personalized coupon will appear below. If you subscribe using this button, you can enter the coupon during the checkout process and the first month will be free.</li>
          </ol>
        </p>
      </div>

      <div class="bordered-box" v-if="loadingComplete && ($api.User.subscriptionStatus == Enums.SubscriptionStatus.Free || $api.User.subscriptionStatus == Enums.SubscriptionStatus.Influencer)">
        <p class="text">
          You have referred
          <span class="big-number">{{ numReferrals }}/4</span> friends so far. Copy the link below and send it to your friends.
        </p>
        <div class="copy-section">
          <input type="text" readonly v-model="referralLink" />
          <i @click="CopyReferralLinkToClipboard" class="fas fa-copy" title="Copy to Clipboard"></i>
        </div>
        <template v-if="numReferrals >= 4">
          <p class="text m-top">
            Congratulations, you have reached the goal of refering MENTOR.GG to at least 4 other people.
            <br /><br />This is your coupon code:
          </p>
          <div class="copy-section">
            <input type="text" readonly v-model="coupon" />
            <i @click="CopyCouponToClipboard" class="fas fa-copy" title="Copy to Clipboard"></i>
          </div>
          <p class="text m-top">
            <br />Click the button below to activate your monthly PREMIUM subscription. 
            During the process, you will be able to enter the coupon code. 
            Be aware that you have to CANCEL the subscription in the <router-link :to="{name: 'membership'}">Membership</router-link> page if you don't want it to continue.
          </p>
          <button
            class="button-variant-bordered upgrade"
            @click="RedeemUpgrade"
          >Redeem FREE PREMIUM Upgrade</button>
        </template>
      </div>
      <div class="bordered-box" v-else-if="loadingComplete">
        <p class="text">
          Seems like you're already subscribed. This programme is available to non-subscribed users only.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Paddle from "paddle";
import Enums from "@/enums";

export default {
  mounted() {
    this.$api.ensureLogin().then(() => {
      this.$api.getReferrals().then((result) => {
        this.numReferrals = result.data.Referrals;
        this.coupon = result.data.Coupon;
        this.loadingComplete = true;
      });

      this.$nextTick(() => {
        // setup paddle with our vendor id
        Paddle.Setup({ vendor: 110217 });
      });

      this.referralLink =
        "https://mentor.gg/?referrer=" + this.$api.User.GetSteamId(false);

    });
  },
  data() {
    return {
      referralLink: "",
      coupon: "",
      numReferrals: -1,
      Enums: Enums,
      loadingComplete: false,
    };
  },
  methods: {
    CopyReferralLinkToClipboard() {
      this.$helpers.CopyTextToClipboard(this.referralLink);
    },
    CopyCouponToClipboard() {
      this.$helpers.CopyTextToClipboard(this.coupon);
    },
    RedeemUpgrade() {
      Paddle.Checkout.open({
        product: 587490, //1 month premium
        passthrough: {
          ApplicationUserId: this.$api.User.applicationUserId,
        },
        coupon_code: this.coupon,
      });
    },
  },
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

.view-refer-a-friend {
  margin-top: 70px;
  padding: 0 20px;

  .bordered-box {
    margin-top: 10px;

    &:first-child {
      margin-top: 0;
    }
  }

  .button-variant-bordered {
    &.upgrade {
      margin-top: 10px;
    }
  }

  .text {
    color: white;
    margin: 0;

    &.m-top {
      margin-top: 10px;
    }

    .big-number {
      font-size: 22px;
      color: $orange;
    }
  }

  .copy-section {
    display: flex;
    margin-top: 10px;

    input {
      background: $purple;
      border: 0;
      padding: 0 10px;
      margin: 0;
      outline: 0;
      height: 32px;
      width: 50%;
      color: white;
    }

    i {
      height: 32px;
      background: $dark-2;
      color: white;
      display: flex;
      align-items: center;
      padding: 0 15px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      cursor: pointer;
      transition: 0.35s;

      &:hover {
        color: $orange;
      }
    }
  }
}
</style>