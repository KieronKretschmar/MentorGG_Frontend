<template>
  <div class="footer">
    <div class="footer-content">
      <div class="fixed-width-container">
        <div class="l">
          <img src="@/assets/logo_fullgray.svg">
          <span>&copy; {{ new Date().getFullYear() }} — mentor.gg</span>
        </div>
        <div class="r">
          <router-link to="/terms-of-service">Terms Of Service</router-link>
          <router-link to="/contact">Contact / Disclaimer</router-link>
          <router-link to="/privacy-policy">Privacy Policy</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.footer {
  padding-top: 100px;
  background: $dark-2;

  .footer-content {
    background: $dark-1;
    padding: 20px 0;

    .fixed-width-container {
      display: flex;
      justify-content: space-between;
      align-items: center;

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