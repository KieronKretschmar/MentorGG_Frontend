<template>
  <footer>
    <div class="footer-wrapper">
      <div class="footer-container-margin">
        <div class="mentor-logo-wrapper">
          <img src="@/assets/mentor-logo-white.png" class="mentor-logo-white" />
          <p class="copyright-text">© 2020 MENTOR.GG</p>
        </div>
        <div class="social-icon-wrapper">
          <img class="social-icon" src="@/assets/discord.svg" />
          <img class="social-icon twitter" src="@/assets/twitter.svg" />
          <img class="social-icon" src="@/assets/reddit.svg" />
        </div>
        <div class="footer-links">
          <a href="#" class="link">About / Contact</a>
          <a href="#" class="link">Terms &amp; Condition</a>
          <a href="#" class="link">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
</script>

<style lang="scss" scoped>
* {
  font-family: "Open Sans", sans-serif;
  color: #fbfbfb;
}

footer {
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #202020;
  display: flex;
  align-items: center;
  justify-content: center;

  .footer-wrapper {
    width: 100%;
    max-width: 1185px;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;

    .footer-container-margin {
      height: 100%;
      width: 100%;
      margin: 0 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;

      .mentor-logo-wrapper {
        width: fit-content;
        min-height: 80px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        .mentor-logo-white {
          margin-top: 6px;
          height: 40px;
        }

        .copyright-text {
          font-size: 1rem;
          max-width: fit-content;
          margin: 0;
          padding: 0;
        }
      }

      .social-icon-wrapper {
        width: 190px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .social-icon {
          height: 35px;
        }

        .twitter {
          height: 33px;
          margin-right: -6px;
        }
      }

      .footer-links {
        width: fit-content;
        min-height: 80px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        white-space: nowrap;

        a.link {
          font-size: 1rem;
          max-width: fit-content;
          margin: 0;
          padding: 0;
          text-decoration: none;
        }
      }
    }
  }
}

@media (max-width: 930px) {
  footer {
    height: min-content;

    .footer-wrapper {
      .footer-container-margin {
        flex-direction: column;

        .mentor-logo-wrapper {
          align-items: center;
          margin: 40px 0 50px 0;

          .mentor-logo-white {
          }

          .copyright-text {
          }
        }

        .social-icon-wrapper {
          width: 180px;
          margin: 0 0 44px 0;

          .social-icon {
          }

          .twitter {
          }
        }

        .footer-links {
          align-items: center;
          margin: 0 0 45px 0;

          a.link {
          }
        }
      }
    }
  }
}

@media (max-width: 660px) {
  footer {
    height: min-content;

    .footer-wrapper {
      .footer-container-margin {
        .mentor-logo-wrapper {
          min-height: 55px;
          .mentor-logo-white {
            margin-top: 0;
            height: 30px;
          }

          .copyright-text {
            font-size: 0.75rem;
          }
        }

        .social-icon-wrapper {
          width: 155px;
          .social-icon {
            height: 25px;
          }

          .twitter {
            height: 23px;
          }
        }

        .footer-links {
          min-height: 60px;
          a.link {
            font-size: 0.8em;
          }
        }
      }
    }
  }
}
</style>