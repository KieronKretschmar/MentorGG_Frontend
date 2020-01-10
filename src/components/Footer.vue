<template>
  <div class="footer">
    <div class="footer-content-one">
      <div class="fixed-width-container">
        <strong class="hero-subtitle">supported by</strong>

        <div class="supporter-logo-wrap">
          <img class="supporter-logo" src="@/assets/EU_Logo.png" />
          <img class="supporter-logo" src="@/assets/HH_Logo.png" />
          <img class="supporter-logo" src="@/assets/IFB_Logo.png" />
          <img class="supporter-logo" src="@/assets/CPLAY_Logo.png" />
        </div>
      </div>
    </div>

    <div class="footer-content-two">
      <div class="fixed-width-container">
        <div class="l">
          <img src="@/assets/logo_fullgray.svg" />
          <span>&copy; {{ new Date().getFullYear() }} — MENTOR.GG</span>
        </div>

        <div class="social-logo-wrap">
          <img class="social-logo" src="@/assets/Discord-Logo-Color.svg" />
          <img class="social-logo" src="@/assets/Twitter-Logo-Color.svg" />
          <img class="social-logo" src="@/assets/Reddit-Logo-Color.svg" />
        </div>

        <!-- <div class="partnerships" v-if="showPartnerships">
           <img src="@/assets/CPLAY_Logo.png" />
        </div>-->

        <div class="r">
          <router-link to="/terms-of-service">Terms Of Service</router-link>
          <router-link to="/contact">Contact / About</router-link>
          <router-link to="/privacy-policy">Privacy Policy</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showPartnerships"],
  mounted() {}
};
</script>

<style lang="scss">
.footer {
  .hero-subtitle {
    font-size: 22px;
    font-weight: 500;
    color: $gray;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 5px 0 25px 0;
  }

  .footer-content-one {
    background: $dark-1;
    padding: 20px 0;
    flex-wrap: wrap;
  }

  .social-logo-wrap {
    width: 150px;
    display: flex;
    justify-content: space-between;
  }

  .social-logo {
    width: 25px;
    height: 25px;
    flex: 0 1 auto;
  }

  .supporter-logo-wrap {
    max-width: 1200px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  .supporter-logo {
    width: auto;
    height: 70px;
    flex: 0 1 auto;

    &:first-child {
      margin-left: -10px;
    }

    &:last-child {
      margin-right: -10px;
    }
  }

  .footer-content-two {
    height: 115px;
    background: $dark-2;
    padding: 20px 0;

    .fixed-width-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;

      .l {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        color: $purple;
        font-size: 12px;

        img {
          max-width: 150px;
          margin-bottom: 5px;
        }
      }

      .r {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        a {
          color: white;
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          transition: 0.35s;
          margin: 5px 0;

          &:hover {
            text-decoration: none;
            color: $orange;
          }
        }
      }
    }
  }
}
</style>