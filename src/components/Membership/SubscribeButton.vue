<template>
  <div class="membership-subscribe-button">
    <!-- Free Button -->
    <button
      class="button-variant-bordered"
      :disabled="true"
      v-if="forSubscriptionType == Enums.SubscriptionStatus.Free"
    >Always active</button>

    <!-- Regular Subscribe Button -->
    <button
      class="button-variant-bordered upgrade"
      v-else-if="activeSubscription == null"
      @click="$emit('subscribe', forSubscriptionType)"
    >Subscribe</button>

    <!-- Cancel Button -->
    <button
      class="button-variant-bordered"
      v-else-if="IsSubscribed(forSubscriptionType) && activeSubscription.ExpirationTime == null"
      @click="$emit('cancel', forSubscriptionType)"
    >Cancel</button>

    <!-- Cancelled + Expiration Time Button -->
    <button
      class="button-variant-bordered"
      v-else-if="IsSubscribed(forSubscriptionType) && activeSubscription.ExpirationTime"
      :disabled="true"
    >Cancelled. Expires at {{ activeSubscription.ExpirationTime|formatDate }}</button>

    <!-- Upgrade Button -->
    <button
      class="button-variant-bordered upgrade"
      v-else-if="IsSubscribed(Enums.SubscriptionStatus.Premium)"
      @click="$emit('upgrade', forSubscriptionType)"
    >Upgrade</button>
  </div>
</template>

<script>
import Enums from "@/enums";

export default {
  props: ["forSubscriptionType", "activeSubscription"],
  mounted() {
    console.log(this.IsSubscribed(Enums.SubscriptionStatus.Premium));
  },
  data() {
    return {
      Enums
    };
  },
  methods: {
    IsSubscribed(subscriptionType /*enum*/) {
      return (
        this.activeSubscription &&
        this.activeSubscription.SubscriptionType == subscriptionType
      );
    }
  }
};
</script>