<template>
  <div class="footer">
    <div v-if="showPartnerships" class="footer-content-one">
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
  padding-top: 20px;
  background-color: $dark-2;

  .hero-subtitle {
    font-size: 16px;
    font-weight: 300;
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

    .supporter-logo-wrap {
      max-width: 1200px;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;

      .supporter-logo {
        width: auto;
        height: 50px;
        flex: 0 1 auto;

        &:last-child {
          height: 45px;
        }
      }
    }
  }

  .footer-content-two {
    height: 115px;
    background: $dark-6;
    padding: 20px 0;

    .fixed-width-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;

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

      .social-logo-wrap {
        width: 150px;
        display: flex;
        justify-content: space-between;

        .social-logo {
          width: 25px;
          height: 25px;
          flex: 0 1 auto;
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

@media (max-width: 700px) {

  .footer-content-one {
    background: $dark-1;
    padding: 20px 0;
    flex-wrap: wrap;

    .supporter-logo-wrap {
      max-width: 1200px;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .supporter-logo {
        min-width: 181px;
        flex: 0 1 auto;

        &:first-child {
          height: 52px;
          margin-bottom: 7px;
        }

        &:nth-child(2) {
          height: 57px;
          margin-bottom: 11px;
        }

        &:nth-child(3) {
          height: 49px;
          margin-bottom: 14px;
        }

        &:last-child {
          height: 45px;
          margin-bottom: 5px;
        }
      }
    }
  }

  .footer-content-two {
    min-height: 235px;

    .fixed-width-container {
      min-height: auto;
      flex-direction: column;
      flex-wrap: wrap;

      .l {
        display: flex;
        width: auto;
        flex-direction: row;
        justify-content: center;

        img {
          max-width: 150px;
        }

        span {
          align-self: center;
        }
      }

      .social-logo-wrap {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: center;

        .social-logo {
          width: 25px;
          height: 25px;
          flex: 0 1 auto;
          margin: 25px 5px 20px 5px;
        }
      }

      .r {
        display: flex;
        width: auto;
        flex-direction: row;
        justify-content: center;

        a {
          color: white;
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          transition: 0.35s;
          margin: 5px 0;
          align-self: center;

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