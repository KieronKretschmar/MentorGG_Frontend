<template>
  <div class="cookie-banner" :class="{hidden: hidden}">
    <p>
      MENTOR.GG uses cookies to enhance your browsing experience. Check our
      <router-link :to="{name: 'privacy-policy'}">privacy policy</router-link>&nbsp;for more information.
    </p>
    <button class="button-variant-bordered" @click="Accept">I understand</button>
  </div>
</template>

<script>
export default {
    mounted() {        
        if (this.$cookies.get(this.cookieName) != 'true') {
            setTimeout(() => {
                this.hidden = false;            
            }, 500);
        }
    },
    data() {
        return {
            cookieName: 'cookie-consent',
            hidden: true
        };
    },
    methods: {
        Accept() {
            this.hidden = true;
            this.$cookies.set(this.cookieName, true);
        }
    }
}
</script>

<style lang="scss">
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  background: $dark-2;
  -webkit-box-shadow: 0px -1px 16px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px -1px 16px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px -1px 16px 0px rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px 20px;
  transition: 0.35s;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  a {
    color: $orange;
    text-decoration: none;
  }

  button {
    margin-left: 20px;
  }
}
</style>