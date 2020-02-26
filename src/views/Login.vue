<template>
  <div class="view view-login">
    <div class="fixed-width-container">
      <div class="bordered-box" :class="{shake: isShaking}">
        <i class="material-icons lock">lock</i>
        <h2>Please log in to proceed</h2>
        <p>Since the requested page contains user specific data, you will have to log in in order for the whole thing to make sense.</p>
        <div class="button-group">                      
          <button
            @click="signIn()"
            class="button-variant-bordered active"
            title="Log in using your Steam account"
          >
            Login
          </button>
          <button class="button-variant-bordered" @click="NavigateBack">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  mounted() {
      this.$vapp.$on('shakeLogin', this.Shake);
  },
  data() {
    return {
      isShaking: false
    };
  },
  methods: {
    RedirectToLogin() {
      window.location = "https://mentor.gg/?forceLogin=true";
    },
    NavigateBack() {
      this.$router.back();
    },
    Shake() {
      this.isShaking = true;

      setTimeout(() => {
          this.isShaking = false;
      }, 820);
    },
    signIn() {
      location.href = this.$api.getSignInUrl(window.location.origin);    
    },
  }
};
</script>

<style lang="scss">
.view-login {
  text-align: center;

  .bordered-box {
    margin-top: 40px;
    padding: 20px;

    &.shake {
      animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
    }
  }

  .button-group {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      margin: 0 10px;
    }
  }

  p,
  h2 {
    color: white;
    margin: 0;
  }

  p {
    margin: 20px 0;
  }

  .lock {
    color: $purple;
    font-size: 72px;
    margin-bottom: 20px;
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
}
</style>