<template>
  <div class="not-logged-in">
    <GenericOverlay ref="overlay" width="900px">
      <p class="headline">YOU SHALL NOT PASS!</p>
      <p>
        <i class="material-icons lock">lock</i>
        <br />This feature is only accessible to logged in users.
      </p>
      <p class="upgrade-wrapper">
        <span @click="Hide">
          <a class="button-variant-bordered" @click="OnClickLogin()">Login</a>
        </span>
      </p>
    </GenericOverlay>
  </div>
</template>

<script>
import GenericOverlay from "@/components/GenericOverlay.vue";

export default {
  components: {
    GenericOverlay
  },
  mounted() {
    globalThis.NotLoggedIn = this;
  },
  methods: {
    Show() {
      this.$refs.overlay.Show();
    },
    Hide() {
      this.$refs.overlay.Hide();
    },
    OnClickUpgrade() {
      this.$router.push({ name: "membership" });
    }
  }
};
</script>

<style lang="scss">
.not-logged-in {
  .lock {
    color: $purple;
    font-size: 60px;
    margin-bottom: 15px;
  }

  .orange-bold {
    color: $orange;
    font-weight: 500;
  }

  .generic-overlay {
    z-index: 10000;

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