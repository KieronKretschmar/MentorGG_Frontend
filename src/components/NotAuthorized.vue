<template>
  <div class="not-authorized">
    <GenericOverlay ref="overlay" width="900px">
      <p class="headline">YOU SHALL NOT PASS!</p>
      <p>
        Unfortunately, this area is only accessible to
        <span
          class="orange-bold"
        >{{ minimumAccessLevelDisplayName }}</span> members.
      </p>
      <p class="upgrade-wrapper">
        <!-- TODO: Replace with link to actual Subscription Upgrade view -->
        <router-link :to="{name: 'dashboard'}" class="button-variant-bordered">Upgrade Now</router-link>
      </p>
    </GenericOverlay>
  </div>
</template>

<script>
import Enums from "../enums";
import GenericOverlay from "@/components/GenericOverlay.vue";

export default {
  components: {
    GenericOverlay
  },
  mounted() {
    globalThis.NotAuthorized = this;
    console.log(globalThis);
  },
  data() {
    return {
      minimumAccessLevel: Enums.SubscriptionStatus.Free
    };
  },
  methods: {
    Show(minimumAccessLevel) {
      this.minimumAccessLevel = minimumAccessLevel;
      this.$refs.overlay.Show();
    }
  },
  computed: {
    minimumAccessLevelDisplayName() {
      return Enums.SubscriptionStatus.ToString(this.minimumAccessLevel);
    }
  }
};
</script>

<style lang="scss">
.not-authorized {
  .orange-bold {
    color: $orange;
    font-weight: 500;
  }

  .generic-overlay {
    .headline {
      margin: 0 auto;
      text-align: center;
    }

    .upgrade-wrapper {
      margin-top: 30px;
      margin-bottom: 10px;

      .button-variant-bordered {
        color: white;
        margin: 0 auto;
      }
    }

    p:not(.headline) {
      text-align: center;
    }
  }
}
</style>