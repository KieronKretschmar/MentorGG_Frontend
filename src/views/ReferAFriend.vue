<template>
  <div class="view view-refer-a-friend">
    <div class="fixed-width-container">
      <h2 class="section-header">Refer A Friend</h2>
      <div class="bordered-box">
        <p
          class="text"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>

      <div class="bordered-box">
        <p class="text">
          You have referred
          <span class="big-number">{{ numReferrals }}</span> friends so far. Copy the link below and send it to your friends.
        </p>
        <div class="referral-link">
          <input type="text" readonly v-model="referralLink" />
          <i @click="CopyReferralLinkToClipboard" class="fas fa-copy" title="Copy to Clipboard"></i>
        </div>
        <template v-if="numReferrals >= 4">
          <p class="text m-top">
            Congratulations, you have reached the goal of refering MENTOR.GG to 4 other people!
            <br />Click the button below to redeem your free month of premium access!
          </p>
          <button
            class="button-variant-bordered upgrade"
            @click="RedeemUpgrade"
          >Redeem FREE PREMIUM Upgrade</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Paddle from "paddle";

export default {
  mounted() {
    this.$api.getReferrals().then((result) => {
      console.log(result);
    });

    this.$nextTick(() => {
      // setup paddle with our vendor id
      Paddle.Setup({ vendor: 110217 });
    });

    this.referralLink = "https://mentor.gg/?referrer=" + this.$api.User.GetSteamId(false);
  },
  data() {
    return {
      referralLink: "",
      numReferrals: 4,
    };
  },
  methods: {
    CopyReferralLinkToClipboard() {
      this.$helpers.CopyTextToClipboard(this.referralLink);
    },
    RedeemUpgrade() {
      Paddle.Checkout.open({
        product: 587490, //1 month premium
        passthrough: {
          ApplicationUserId: this.$api.User.applicationUserId,
        },
        coupon_code: "DEV-TEST-COUPON"
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

  .referral-link {
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