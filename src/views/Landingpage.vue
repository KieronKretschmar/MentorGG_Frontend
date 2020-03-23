<template>
  <div class="view view-landingpage">
    <div class="full-width-container">
      <header>
        <div class="container">
          <div class="header-wrap">
            <!-- Logo -->
            <a href="/" class="logo logo-header">
              <img class="logo" src="@/assets/logo_white.svg" alt="CS:GO Mentor" />
            </a>
            
            <button
              @click="signIn()"
              class="button-gray-transparent login-steam"
              title="Log in using your Steam account"
            >
              Sign in through STEAM
              <img
                class="steam-logo"
                src="@/assets/steam-logo.svg"
                alt="Steam logo"
              />
            </button>
          </div>
        </div>
      </header>

      <!-- main content -->
      <div>
        <section class="hero-section">
          <div class="container">
            <div class="hero-wrap">
              <img class="logo-hero" src="@/assets/logo_white.svg" alt="CS:GO Mentor" />
              <h1 class="hero-title">Your personal eSports Coach.</h1>
              <strong class="hero-subtitle">Helping you improve your gameplay</strong>

              <button
                @click="signIn()"
                class="login-steam login-steam--green"
                title="Log in using your Steam account"
              >
                Sign in through STEAM
                <img
                  class="steam-logo"
                  src="@/assets/steam-logo.svg"
                  alt="Steam logo"
                />
              </button>

              <img src="@/assets/hero.png" alt="CSGOMentor" class="hero-img" />
            </div>
          </div>
        </section>

        <!-- offer -->
        <section class="offer-section">
          <div class="container">
            <h2 class="title h2">Your new analytics suite</h2>
            <p class="subtitle">
              We offer a wide variety of tools to help
              you perfect your game
            </p>
            <!-- Offer-wrap -->
            <div class="offer-wrap">
              <!-- Offer -->
              <div class="offer">
                <div class="offer-img-wrap">
                  <img class="offer-img" src="@/assets/offer-eye.svg" alt="Track your progress" />
                </div>
                <div>
                  <span class="offer-title first-title">Track your progress</span>
                </div>
                <div>
                  <p class="offer-text">and see how good you've become</p>
                </div>
              </div>

              <!-- Offer -->
              <div class="offer">
                <div class="offer-img-wrap">
                  <img
                    class="offer-img"
                    src="@/assets/offer-artificial.svg"
                    alt="Analyze your gameplay automatically"
                  />
                </div>
                <div>
                  <span class="offer-title middle-title">Analyze your gameplay</span>
                </div>
                <div>
                  <p class="offer-text">and get insight into how YOU can improve</p>
                </div>
              </div>

              <!-- Offer -->
              <div class="offer">
                <div class="offer-img-wrap">
                  <img
                    class="offer-img"
                    src="@/assets/offer-networking.svg"
                    alt="Compare to your friends"
                  />
                </div>
                <div>
                  <span class="offer-title last-title">Compare to your friends</span>
                </div>
                <div>
                  <p class="offer-text">and find out where you excel</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Games -->
        <div class="offer-games">
          <div class="offer-game">
            <nav class="games-nav">
              <ul>
                <li>
                  <a href="#">
                    <img class="games-nav-active--cs-go" src="@/assets/cs-go-logo.svg" />
                  </a>
                </li>
                <li>
                  <!-- <a href="#"> -->
                  <img class="games-nav-inactive--pubg" src="@/assets/pubg-logo.svg" />
                  <!-- </a> -->
                </li>
                <li>
                  <!-- <a href="#"> -->
                  <img class="games-nav-inactive--fortnite" src="@/assets/fortnite-logo.svg" />
                  <!-- </a> -->
                </li>
                <li>
                  <!-- <a href="#"> -->
                  <img class="games-nav-inactive--dota-2" src="@/assets/dota-2-logo.svg" />
                  <!-- </a> -->
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <!-- demoviewer -->
        <section class="demoviewer-section desc-section">
          <div class="container">
            <div class="section-desc-wrap">
              <img class="section-desc-img" src="@/assets/demoviewer-img.png" alt="Demoviewer" />
              <div class="section-desc section-desc--right">
                <div class="section-desc-img-wrap">
                  <img class="section-desc-img" src="@/assets/stats.png" alt="Demoviewer" />
                </div>
                <h3 class="section-desc-title">DemoViewer</h3>
                <p
                  class="section-desc-text"
                >Watch your and your team’s latest plays on the platform. Check out every rounds performance from a 2D perspective.</p>
                <!--<a href="/Matches/Matches" class="section-desc-link button-gray-transparent">See what matters</a>-->
              </div>
            </div>
          </div>
        </section>

        <!-- positions -->
        <section class="positions-section desc-section">
          <div class="container">
            <div class="section-desc-wrap">
              <div class="section-desc section-desc--left">
                <div class="section-desc-img-wrap">
                  <img class="section-desc-img" src="@/assets/positions.png" alt="Positions" />
                </div>
                <h3 class="section-desc-title">Positions</h3>
                <p
                  class="section-desc-text"
                >Do you always die in the same spot? See where you succeed and show off your skill to your friends!</p>
              </div>
              <img class="section-desc-img" src="@/assets/positions-img.png" alt="Positions" />
            </div>
          </div>
        </section>

        <!-- smokes -->
        <section class="smokes-section desc-section">
          <div class="container">
            <div class="section-desc-wrap">
              <img class="section-desc-img" src="@/assets/smokes-img.png" alt="Smokes" />
              <div class="section-desc section-desc--right">
                <div class="section-desc-img-wrap">
                  <img class="section-desc-img" src="@/assets/smokes.png" alt="Smokes" />
                </div>
                <h3 class="section-desc-title">Grenade review</h3>
                <p
                  class="section-desc-text"
                >Find out how effective your grenades are, which ones you need to practice and learn new lineups!</p>
                <!--<a href="/Smokes/SmokesOverview" class="section-desc-link button-gray-transparent">Throw smokes</a>-->
              </div>
            </div>
          </div>
        </section>

        <!-- ready -->
        <section class="ready-section">
          <div class="container">
            <div class="ready-wrap">
              <h4 class="title">Do you want to improve your game?</h4>
              <p class="subtitle">Join the beta by signing in</p>
              <button
                @click="signIn()"
                class="login-steam login-steam--orange"
                title="Log in using your Steam account"
              >
                Sign in through STEAM
                <img
                  class="steam-logo"
                  src="@/assets/steam-logo.svg"
                  alt="Steam logo"
                />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {

    };
  },
  computed: {
  },
  methods: {    
    signIn() {
      location.href = this.$api.getSignInUrl(window.location.origin);    
    },
  }
};
</script>

<style lang="scss" scoped>
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}

a {
  color: $orange;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after {
  content: "";
  content: none;
}

q:before,
q:after {
  content: "";
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

.view-landingpage {
  .full-width-container {
    color: #fff;
    margin: 0 auto;

    .container {
      max-width: 1200px;
      width: 100%;
      padding: 0 15px;
      margin: 0 auto;
    }

    header {
      background-color: $dark-1;
      padding: 20px 0px;
      display: flex;
      position: relative;

      .header-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .logo {
        display: inline-flex;

        &logo--header {
          margin-right: 20px;
        }
      }
    }

    .steam-logo {
      width: 16px;
      height: 16px;
    }

    .hero-section {
      padding: 0 0 40px 0;
      background-color: $dark-2;
      background-image: url(../assets/hero-map-bg.png),
        url(../assets/hero-bg.png);
      background-repeat: no-repeat;
      background-position: center left, center;

      .hero-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .login-steam {
        margin-top: 40px;
      }

      .logo-hero {
        width: 100%;
        max-width: 480px;
        height: auto;
        object-fit: contain;
        padding-top: 50px;
      }

      .title {
        margin: 0;
      }

      @mixin hero-title {
        font-size: 28px;
        margin-top: 1.2em;
        color: $light-1;
        text-align: center;
        max-width: 750px;
        font-weight: 500;
      }

      .hero-title {
        @include hero-title;
      }

      .hero-subtitle {
        @include hero-title;
        font-size: 18px;
        margin-top: 0;
        padding-top: 4px;
      }

      .hero-img {
        margin-top: 45px;
        object-fit: contain;
        max-width: 100%;
        height: auto;
      }
    }

    .login-steam {
      border-radius: 2.5em;
      min-width: 240px;
      padding: 0.75em 1.25em;
      padding-top: 0.5em;
      text-decoration: none;
      text-align: center;
      transition: 0.3s;
      color: #fff;
      font-size: 13px;
      padding: 0.6em 1.785em 0.75em 1.785em;

      &--green {
        @extend .login-steam;
        background-color: $green-2;
        border: 1px solid $green-2;
        box-shadow: 0px 0px 20px 5px $green-2;

        &:hover {
          box-shadow: 0px 0px 30px 10px $green-2;
        }
      }

      &--orange {
        @extend .login-steam;
        background-color: $orange;
        border: 1px solid $orange;
        box-shadow: 0px 0px 20px 5px $orange;

        &:hover {
          box-shadow: 0px 0px 30px 10px $orange;
        }
      }
    }

    .login-steam .steam-logo {
      fill: #fff;
      margin-left: 10px;
      position: relative;
      top: 2px;
    }

    button {
      text-decoration: none;
      transition: 0.3s;
      cursor: pointer;
    }

    [class*="button"] {
      text-decoration: none;
      transition: 0.3s;
    }

    .button-gray-transparent {
      font-size: 14px;
      color: #fff;
      border-radius: 25px;
      padding: 0.5em 1.785em 0.75em 1.785em;
      background-color: $purple;
      border: 1px solid $purple;
      background-color: transparent;
      color: #fff;
      line-height: 1;

      &.button-gray-transparent:hover {
        background-color: $purple;
      }

      &.button-gray-transparent:focus {
        outline: 1px solid $dark-1;
      }

      &.button-gray-transparent--round {
        border-radius: 2.5em;
      }

      &.button-gray-transparent--small {
        padding: 0.5em 1.5em;
        min-width: 95px;
      }
    }

    .offer-section {
      padding: 0;
      background-image: url(../assets/offer-blur.png);
      background-size: cover;
      background-position: center bottom;
      background-repeat: no-repeat;
      padding-bottom: 130px;
      background-color: $dark-2;

      .title {
        text-align: center;
        font-size: 2.25rem;
        margin-bottom: 0;
      }

      .subtitle {
        text-align: center;
        max-width: 360px;
        margin: 0.3em auto 0;
        color: $light-1;
        font-size: 16px;
        font-weight: 500;
      }

      .offer-wrap {
        display: flex;
        flex-wrap: wrap;
        margin: 60px -10px 0;

        .offer {
          max-width: calc(100% / 3 - 20px);
          margin: 20px 10px 0;
          width: 100%;
          display: flex;
          flex-direction: column;

          .offer-img-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            position: relative;

            &.offer-img-wrap:before {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 1px;
              height: 1px;
              border-radius: 50%;
              box-shadow: 0px 0px 45px 30px $red-2;
            }
          }

          .offer-img {
            width: 80px;
            height: 64px;
          }

          .offer-title {
            height: 25px;
            font-size: 18px;
            text-align: center;
            padding-bottom: 3px;
            display: block;
          }

          .offer-text {
            font-size: 14px;
            font-weight: 500;
            text-align: center;
            max-width: 240px;
            margin: 0 auto;
            flex: 0 1 100%;
            color: $light-1;
          }
        }
      }
    }

    .offer-games {
      width: 100%;
      margin: -45px 0 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      z-index: 2;

      .offer-game {
        max-width: 80%;

        .games-nav {
          width: auto;
          margin: 0 auto;
          padding: 0;

          ul {
            list-style: none;
            text-align: center;
            padding: 0 30px;
            background-color: $dark-3;
            border: 1px solid $dark-4;
            border-radius: 3px;

            li {
              display: inline-block;
              padding: 0 25px;

              a {
                position: relative;
                padding: 0;
              }

              a:hover .games-nav-active {
                filter: opacity(1);
              }
            }

            a::after {
              content: " ";
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              height: 0;
              background: orange;
              transition: height 0.3s;
            }

            a:hover::after {
              height: 2px;
              transition: height 0.3s;
            }

            a + a::after {
              content: " ";
              position: absolute;
              left: 0;
              bottom: -5px;
              width: 0;
              height: 5px;
              background: orange;
              transition: width 0.3s;
            }

            a + a:hover::after {
              width: 100%;
              transition: width 0.3s;
            }
          }
        }

        .games-nav-active {
          margin: 8px;
          padding-top: 5px;
          filter: opacity(0.4) grayscale(1);
          transition: all 0.3s;

          &--cs-go {
            @extend .games-nav-active;
            height: 40px;
            filter: opacity(1);
          }
        }

        .games-nav-inactive {
          margin: 8px;
          padding-top: 5px;
          filter: opacity(0.4) grayscale(1);
          transition: all 0.3s;

          &--pubg {
            @extend .games-nav-inactive;
            height: 38px;
          }

          &--fortnite {
            @extend .games-nav-inactive;
            height: 34px;
          }

          &--dota-2 {
            @extend .games-nav-inactive;
            height: 35px;
          }
        }
      }
    }

    .desc-section {
      padding: 50px 0;
      background-color: $dark-2;

      .section-desc-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;

        .section-desc {
          max-width: 320px;
          width: 100%;
          margin-left: auto;

          .section-desc-title {
            display: block;
            font-size: 1.5rem;
            font-weight: bold;
            margin-top: 0.75em;
            margin-bottom: 0.875em;
          }

          .section-desc-img-wrap {
            display: flex;
            align-items: flex-end;
            height: auto;
          }

          .section-desc-text {
            font-size: 14px;
            line-height: 1.357;
            font-weight: 400;
            max-width: 280px;
          }
        }

        .section-desc--right {
          margin-left: auto;
          text-align: right;

          .section-desc-img-wrap {
            justify-content: flex-end;
          }

          .section-desc-text {
            margin-left: auto;
          }
        }

        .section-desc--left {
          margin-left: 0;
          text-align: left;

          .section-desc-img-wrap {
            justify-content: flex-start;
          }
          .section-desc-text {
            margin-right: auto;
          }
        }
      }
    }

    .demoviewer-section {
      padding-top: 140px;
      background-image: url(../assets/stats-bg.png);
      background-position: 15vw center;
      background-size: auto;
      background-repeat: no-repeat;
      position: relative;
    }

    .positions-section {
      background-image: url(../assets/positions-bg.png);
      background-position: calc(100% - 7.5vw) center;
      background-size: auto;
      background-repeat: no-repeat;
    }

    .smokes-section {
      background-color: $dark-2;
      background-image: url(../assets/smokes-bg.png);
      background-position: 15vw center;
      background-size: auto;
      background-repeat: no-repeat;
      position: relative;
    }

    .ready-section {
      padding: 60px 0;
      padding-bottom: 220px;
      background-image: url(../assets/fire-bg.png);
      background-position: center bottom;
      background-size: cover;
      background-repeat: no-repeat;
    }

    .ready-section {
      .title {
        text-align: center;
        font-size: 2.25rem;
        letter-spacing: 0.021em;
        font-weight: bold;
        text-transform: uppercase;
      }
    }

    .ready-section {
      .subtitle {
        text-align: center;
        max-width: 360px;
        margin: 1em auto 0;
        font-size: 16px;
        color: $light-1;
        font-weight: 500;
      }
    }

    .ready-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      .login-steam {
        margin-top: 30px;
      }
    }
  }
}

//responsive
@media (max-width: 1000px) {
  .view-landingpage {
    .full-width-container {
      color: #fff;
      margin: 0 auto;

      .container {
        max-width: 1200px;
        width: 100%;
        padding: 0 15px;
        margin: 0 auto;
      }

      header {
        background-color: $dark-1;
        padding: 20px 0px;
        display: flex;
        position: relative;

        .header-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: inline-flex;

          &logo--header {
            margin-right: 20px;
          }
        }
      }

      .steam-logo {
        width: 16px;
        height: 16px;
      }

      .hero-section {
        padding: 0 0 40px 0;
        background-color: $dark-2;
        background-image: url(../assets/hero-map-bg.png),
          url(../assets/hero-bg.png);
        background-repeat: no-repeat;
        background-position: center left, center;

        .hero-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-steam {
          margin-top: 40px;
        }

        .logo-hero {
          width: 100%;
          max-width: 480px;
          height: auto;
          object-fit: contain;
          padding-top: 50px;
        }

        .title {
          margin: 0;
        }

        @mixin hero-title {
          font-size: 28px;
          margin-top: 1.2em;
          color: $light-1;
          text-align: center;
          max-width: 750px;
          font-weight: 500;
        }

        .hero-title {
          @include hero-title;
        }

        .hero-subtitle {
          @include hero-title;
          font-size: 18px;
          margin-top: 0;
          padding-top: 4px;
        }

        .hero-img {
          margin-top: 45px;
          object-fit: contain;
          max-width: 100%;
          height: auto;
        }
      }

      .login-steam {
        border-radius: 2.5em;
        min-width: 240px;
        padding: 0.75em 1.25em;
        padding-top: 0.5em;
        text-decoration: none;
        text-align: center;
        transition: 0.3s;
        color: #fff;
        font-size: 13px;
        padding: 0.6em 1.785em 0.75em 1.785em;
      }

      .login-steam .steam-logo {
        fill: #fff;
        margin-left: 10px;
        position: relative;
        top: 2px;
      }

      button {
        text-decoration: none;
        transition: 0.3s;
        cursor: pointer;
      }

      [class*="button"] {
        text-decoration: none;
        transition: 0.3s;
      }

      .button-gray-transparent {
        font-size: 14px;
        color: #fff;
        border-radius: 25px;
        padding: 0.5em 1.785em 0.75em 1.785em;
        background-color: $purple;
        border: 1px solid $purple;
        background-color: transparent;
        color: #fff;
        line-height: 1;

        &.button-gray-transparent:hover {
          background-color: $purple;
        }

        &.button-gray-transparent:focus {
          outline: 1px solid $dark-1;
        }

        &.button-gray-transparent--round {
          border-radius: 2.5em;
        }

        &.button-gray-transparent--small {
          padding: 0.5em 1.5em;
          min-width: 95px;
        }
      }

      .offer-section {
        padding: 0;
        background-image: url(../assets/offer-blur.png);
        background-size: cover;
        background-position: center bottom;
        background-repeat: no-repeat;
        padding-bottom: 130px;
        background-color: $dark-2;

        .title {
          text-align: center;
          font-size: 2.25rem;
          margin-bottom: 0;
        }

        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 0.3em auto 0;
          color: $light-1;
          font-size: 16px;
          font-weight: 500;
        }

        .offer-wrap {
          display: flex;
          flex-wrap: wrap;
          margin: 60px -10px 0;

          .offer {
            max-width: calc(100% / 3 - 20px);
            margin: 20px 10px 0;
            width: 100%;
            display: flex;
            flex-direction: column;

            .offer-img-wrap {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
              position: relative;

              &.offer-img-wrap:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 1px;
                height: 1px;
                border-radius: 50%;
                box-shadow: 0px 0px 45px 30px $red-2;
              }
            }

            .offer-img {
              width: 80px;
              height: 64px;
            }

            .offer-title {
              height: 25px;
              font-size: 18px;
              text-align: center;
              padding-bottom: 3px;
              display: block;
            }

            .offer-text {
              font-size: 14px;
              font-weight: 500;
              text-align: center;
              max-width: 240px;
              margin: 0 auto;
              flex: 0 1 100%;
              color: $light-1;
            }
          }
        }
      }

      .offer-games {
        width: 100%;
        margin: -45px 0 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 2;

        .offer-game {
          max-width: 80%;

          .games-nav {
            width: auto;
            margin: 0 auto;
            padding: 0;

            ul {
              list-style: none;
              text-align: center;
              padding: 0 30px;
              background-color: $dark-3;
              border: 1px solid $dark-4;
              border-radius: 3px;

              li {
                display: inline-block;
                padding: 0 25px;

                a {
                  position: relative;
                  padding: 0;
                }

                a:hover .games-nav-active {
                  filter: opacity(1);
                }
              }

              a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 0;
                background: orange;
                transition: height 0.3s;
              }

              a:hover::after {
                height: 2px;
                transition: height 0.3s;
              }

              a + a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: -5px;
                width: 0;
                height: 5px;
                background: orange;
                transition: width 0.3s;
              }

              a + a:hover::after {
                width: 100%;
                transition: width 0.3s;
              }
            }
          }

          .games-nav-active {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }

          .games-nav-inactive {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }
        }
      }

      .desc-section {
        padding: 45px 0;
        background-color: $dark-2;

        .section-desc-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;

          .section-desc {
            max-width: 320px;
            width: 100%;
            margin-left: auto;

            .section-desc-title {
              display: block;
              font-size: 1.5rem;
              font-weight: bold;
              margin-top: 0.75em;
              margin-bottom: 0.875em;
            }

            .section-desc-img-wrap {
              display: flex;
              align-items: flex-end;
              height: auto;
            }

            .section-desc-text {
              font-size: 14px;
              line-height: 1.357;
              font-weight: 400;
              max-width: 280px;
            }
          }

          .section-desc--right {
            margin-left: auto;
            text-align: right;

            .section-desc-img-wrap {
              justify-content: flex-end;
            }

            .section-desc-text {
              margin-left: auto;
            }
          }

          .section-desc--left {
            margin-left: 0;
            text-align: left;

            .section-desc-img-wrap {
              justify-content: flex-start;
            }
            .section-desc-text {
              margin-right: auto;
            }
          }
        }
      }

      .demoviewer-section {
        padding-top: 140px;
        background-image: url(../assets/stats-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;

        .section-desc-img {
        object-fit: contain;
        height: auto;
        max-height: auto;
        max-width: 70%;
        }
      }

      .positions-section {
        background-image: url(../assets/positions-bg.png);
        background-position: calc(100% - 7.5vw) center;
        background-size: auto;
        background-repeat: no-repeat;

        .section-desc-img {
        object-fit: contain;
        height: auto;
        max-height: auto;
        max-width: 50%;
        }
      }

      .smokes-section {
        background-color: $dark-2;
        background-image: url(../assets/smokes-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;

        .section-desc-img {
        object-fit: contain;
        height: auto;
        max-height: auto;
        max-width: 50%;
        }
      }

      .ready-section {
        padding: 60px 0;
        padding-bottom: 220px;
        background-image: url(../assets/fire-bg.png);
        background-position: center bottom;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .ready-section {
        .title {
          text-align: center;
          font-size: 2.25rem;
          letter-spacing: 0.021em;
          font-weight: bold;
          text-transform: uppercase;
        }
      }

      .ready-section {
        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 1em auto 0;
          font-size: 16px;
          color: $light-1;
          font-weight: 500;
        }
      }

      .ready-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .login-steam {
          margin-top: 30px;
        }
      }
    }
  }
}

@media (max-width: 985px) {
  .view-landingpage {
    .full-width-container {
      color: #fff;
      margin: 0 auto;

      .container {
        max-width: 1200px;
        width: 100%;
        padding: 0 15px;
        margin: 0 auto;
      }

      header {
        background-color: $dark-1;
        padding: 20px 0px;
        display: flex;
        position: relative;

        .header-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: inline-flex;

          &logo--header {
            margin-right: 20px;
          }
        }
      }

      .steam-logo {
        width: 16px;
        height: 16px;
      }

      .hero-section {
        padding: 0 0 40px 0;
        background-color: $dark-2;
        background-image: url(../assets/hero-map-bg.png),
          url(../assets/hero-bg.png);
        background-repeat: no-repeat;
        background-position: center left, center;

        .hero-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-steam {
          margin-top: 40px;
        }

        .logo-hero {
          width: 100%;
          max-width: 480px;
          height: auto;
          object-fit: contain;
          padding-top: 50px;
        }

        .title {
          margin: 0;
        }

        @mixin hero-title {
          font-size: 28px;
          margin-top: 1.2em;
          color: $light-1;
          text-align: center;
          max-width: 750px;
          font-weight: 500;
        }

        .hero-title {
          @include hero-title;
        }

        .hero-subtitle {
          @include hero-title;
          font-size: 18px;
          margin-top: 0;
          padding-top: 4px;
        }

        .hero-img {
          margin-top: 45px;
          object-fit: contain;
          max-width: 100%;
          height: auto;
        }
      }

      .login-steam {
        border-radius: 2.5em;
        min-width: 240px;
        padding: 0.75em 1.25em;
        padding-top: 0.5em;
        text-decoration: none;
        text-align: center;
        transition: 0.3s;
        color: #fff;
        font-size: 13px;
        padding: 0.6em 1.785em 0.75em 1.785em;
      }

      .login-steam .steam-logo {
        fill: #fff;
        margin-left: 10px;
        position: relative;
        top: 2px;
      }

      button {
        text-decoration: none;
        transition: 0.3s;
        cursor: pointer;
      }

      [class*="button"] {
        text-decoration: none;
        transition: 0.3s;
      }

      .button-gray-transparent {
        font-size: 14px;
        color: #fff;
        border-radius: 25px;
        padding: 0.5em 1.785em 0.75em 1.785em;
        background-color: $purple;
        border: 1px solid $purple;
        background-color: transparent;
        color: #fff;
        line-height: 1;

        &.button-gray-transparent:hover {
          background-color: $purple;
        }

        &.button-gray-transparent:focus {
          outline: 1px solid $dark-1;
        }

        &.button-gray-transparent--round {
          border-radius: 2.5em;
        }

        &.button-gray-transparent--small {
          padding: 0.5em 1.5em;
          min-width: 95px;
        }
      }

      .offer-section {
        padding: 0;
        background-image: url(../assets/offer-blur.png);
        background-size: cover;
        background-position: center bottom;
        background-repeat: no-repeat;
        padding-bottom: 130px;
        background-color: $dark-2;

        .title {
          text-align: center;
          font-size: 2.25rem;
          margin-bottom: 0;
        }

        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 0.3em auto 0;
          color: $light-1;
          font-size: 16px;
          font-weight: 500;
        }

        .offer-wrap {
          display: flex;
          flex-wrap: wrap;
          margin: 60px -10px 0;

          .offer {
            max-width: calc(100% / 3 - 20px);
            margin: 20px 10px 0;
            width: 100%;
            display: flex;
            flex-direction: column;

            .offer-img-wrap {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
              position: relative;

              &.offer-img-wrap:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 1px;
                height: 1px;
                border-radius: 50%;
                box-shadow: 0px 0px 45px 30px $red-2;
              }
            }

            .offer-img {
              width: 80px;
              height: 64px;
            }

            .offer-title {
              height: 25px; //
              font-size: 18px;
              text-align: center;
              padding-bottom: 3px;
              display: block;
            }

            .offer-text {
              font-size: 14px;
              font-weight: 500;
              text-align: center;
              max-width: 240px;
              margin: 0 auto;
              flex: 0 1 100%;
              color: $light-1;
            }
          }
        }
      }

      .offer-games {
        width: 100%;
        margin: -45px 0 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 2;

        .offer-game {
          max-width: 80%;

          .games-nav {
            width: auto;
            margin: 0 auto;
            padding: 0;

            ul {
              list-style: none;
              text-align: center;
              padding: 0 30px;
              background-color: $dark-3;
              border: 1px solid $dark-4;
              border-radius: 3px;

              li {
                display: inline-block;
                padding: 0 25px;

                a {
                  position: relative;
                  padding: 0;
                }

                a:hover .games-nav-active {
                  filter: opacity(1);
                }
              }

              a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 0;
                background: orange;
                transition: height 0.3s;
              }

              a:hover::after {
                height: 2px;
                transition: height 0.3s;
              }

              a + a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: -5px;
                width: 0;
                height: 5px;
                background: orange;
                transition: width 0.3s;
              }

              a + a:hover::after {
                width: 100%;
                transition: width 0.3s;
              }
            }
          }

          .games-nav-active {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }

          .games-nav-inactive {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }
        }
      }

      .desc-section {
        padding: 45px 0;
        background-color: $dark-2;
        margin-top: 40px;

        .section-desc-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;

          .section-desc {
            max-width: 320px;
            width: 100%;
            margin-left: auto;

            .section-desc-title {
              display: block;
              font-size: 1.5rem;
              font-weight: bold;
              margin-top: 0.75em;
              margin-bottom: 0.875em;
            }

            .section-desc-img-wrap {
              display: flex;
              align-items: flex-end;
              height: auto;
            }

            .section-desc-text {
              font-size: 14px;
              line-height: 1.357;
              font-weight: 400;
              max-width: 280px;
            }
          }

          .section-desc--right {
            margin-left: auto;
            text-align: right;

            .section-desc-img-wrap {
              justify-content: flex-end;
            }

            .section-desc-text {
              margin-left: auto;
            }
          }

          .section-desc--left {
            margin-left: 0;
            text-align: left;

            .section-desc-img-wrap {
              justify-content: flex-start;
            }
            .section-desc-text {
              margin-right: auto;
            }
          }
        }
      }

      .demoviewer-section {
        padding-top: 140px;
        background-image: url(../assets/stats-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;
      }

      .positions-section {
        background-image: url(../assets/positions-bg.png);
        background-position: calc(100% - 7.5vw) center;
        background-size: auto;
        background-repeat: no-repeat;
      }

      .smokes-section {
        background-color: $dark-2;
        background-image: url(../assets/smokes-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;
      }

      .ready-section {
        padding: 60px 0;
        padding-bottom: 220px;
        background-image: url(../assets/fire-bg.png);
        background-position: center bottom;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .ready-section {
        .title {
          text-align: center;
          font-size: 2.25rem;
          letter-spacing: 0.021em;
          font-weight: bold;
          text-transform: uppercase;
        }
      }

      .ready-section {
        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 1em auto 0;
          font-size: 16px;
          color: $light-1;
          font-weight: 500;
        }
      }

      .ready-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .login-steam {
          margin-top: 30px;
        }
      }
    }
  }
}

@media (max-width: 728px) {
  .view-landingpage {
    .full-width-container {
      color: #fff;
      margin: 0 auto;

      .container {
        max-width: 1200px;
        width: 100%;
        padding: 0 15px;
        margin: 0 auto;
      }

      header {
        background-color: $dark-1;
        padding: 20px 0px;
        display: flex;
        position: relative;

        .header-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: inline-flex;

          &logo--header {
            margin-right: 20px;
          }
        }
      }

      .steam-logo {
        width: 16px;
        height: 16px;
      }

      .hero-section {
        padding: 0 0 40px 0;
        background-color: $dark-2;
        background-image: url(../assets/hero-map-bg.png),
          url(../assets/hero-bg.png);
        background-repeat: no-repeat;
        background-position: center left, center;

        .hero-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-steam {
          margin-top: 40px;
        }

        .logo-hero {
          width: 100%;
          max-width: 480px;
          height: auto;
          object-fit: contain;
          padding-top: 50px;
        }

        .title {
          margin: 0;
        }

        @mixin hero-title {
          font-size: 28px;
          margin-top: 1.2em;
          color: $light-1;
          text-align: center;
          max-width: 750px;
          font-weight: 500;
        }

        .hero-title {
          @include hero-title;
        }

        .hero-subtitle {
          @include hero-title;
          font-size: 18px;
          margin-top: 0;
          padding-top: 4px;
        }

        .hero-img {
          margin-top: 45px;
          object-fit: contain;
          max-width: 100%;
          height: auto;
        }
      }

      .login-steam {
        border-radius: 2.5em;
        min-width: 240px;
        padding: 0.75em 1.25em;
        padding-top: 0.5em;
        text-decoration: none;
        text-align: center;
        transition: 0.3s;
        color: #fff;
        font-size: 13px;
        padding: 0.6em 1.785em 0.75em 1.785em;
      }

      .login-steam .steam-logo {
        fill: #fff;
        margin-left: 10px;
        position: relative;
        top: 2px;
      }

      button {
        text-decoration: none;
        transition: 0.3s;
        cursor: pointer;
      }

      [class*="button"] {
        text-decoration: none;
        transition: 0.3s;
      }

      .button-gray-transparent {
        font-size: 14px;
        color: #fff;
        border-radius: 25px;
        padding: 0.5em 1.785em 0.75em 1.785em;
        background-color: $purple;
        border: 1px solid $purple;
        background-color: transparent;
        color: #fff;
        line-height: 1;

        &.button-gray-transparent:hover {
          background-color: $purple;
        }

        &.button-gray-transparent:focus {
          outline: 1px solid $dark-1;
        }

        &.button-gray-transparent--round {
          border-radius: 2.5em;
        }

        &.button-gray-transparent--small {
          padding: 0.5em 1.5em;
          min-width: 95px;
        }
      }

      .offer-section {
        padding: 0;
        background-image: url(../assets/offer-blur.png);
        background-size: cover;
        background-position: center bottom;
        background-repeat: no-repeat;
        padding-bottom: 130px;
        background-color: $dark-2;

        .title {
          text-align: center;
          font-size: 2.25rem;
          margin-bottom: 0;
        }

        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 0.3em auto 0;
          color: $light-1;
          font-size: 16px;
          font-weight: 500;
        }

        .offer-wrap {
          display: flex;
          flex-wrap: wrap;
          margin: 60px -10px 0;

          .offer {
            max-width: calc(100% / 3 - 20px);
            margin: 20px 10px 0;
            width: 100%;
            display: flex;
            flex-direction: column;

            .offer-img-wrap {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
              position: relative;

              &.offer-img-wrap:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 1px;
                height: 1px;
                border-radius: 50%;
                box-shadow: 0px 0px 45px 30px $red-2;
              }
            }

            .offer-img {
              width: 80px;
              height: 64px;
            }

            .offer-title {
              height: 25px; //
              font-size: 18px;
              text-align: center;
              padding-bottom: 3px;
              display: block;

              &.last-title {
                height: 45px; //
              }
            }

            .offer-text {
              font-size: 14px;
              font-weight: 500;
              text-align: center;
              max-width: 240px;
              margin: 0 auto;
              flex: 0 1 100%;
              color: $light-1;
            }
          }
        }
      }

      .offer-games {
        width: 100%;
        margin: -45px 0 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 2;

        .offer-game {
          max-width: 80%;

          .games-nav {
            width: auto;
            margin: 0 auto;
            padding: 0;

            ul {
              list-style: none;
              text-align: center;
              padding: 0 30px;
              background-color: $dark-3;
              border: 1px solid $dark-4;
              border-radius: 3px;

              li {
                display: inline-block;
                padding: 0 25px;

                a {
                  position: relative;
                  padding: 0;
                }

                a:hover .games-nav-active {
                  filter: opacity(1);
                }
              }

              a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 0;
                background: orange;
                transition: height 0.3s;
              }

              a:hover::after {
                height: 2px;
                transition: height 0.3s;
              }

              a + a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: -5px;
                width: 0;
                height: 5px;
                background: orange;
                transition: width 0.3s;
              }

              a + a:hover::after {
                width: 100%;
                transition: width 0.3s;
              }
            }
          }

          .games-nav-active {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }

          .games-nav-inactive {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }
        }
      }

      .desc-section {
        padding: 45px 0;
        background-color: $dark-2;
        margin-top: 40px;

        .section-desc-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;

          .section-desc {
            max-width: 320px;
            width: 100%;
            margin-left: auto;

            .section-desc-title {
              display: block;
              font-size: 1.5rem;
              font-weight: bold;
              margin-top: 0.75em;
              margin-bottom: 0.875em;
            }

            .section-desc-img-wrap {
              display: flex;
              align-items: flex-end;
              height: auto;
            }

            .section-desc-text {
              font-size: 14px;
              line-height: 1.357;
              font-weight: 400;
              max-width: 280px;
            }
          }

          .section-desc--right {
            margin-left: auto;
            text-align: right;

            .section-desc-img-wrap {
              justify-content: flex-end;
            }

            .section-desc-text {
              margin-left: auto;
            }
          }

          .section-desc--left {
            margin-left: 0;
            text-align: left;

            .section-desc-img-wrap {
              justify-content: flex-start;
            }
            .section-desc-text {
              margin-right: auto;
            }
          }
        }
      }

      .demoviewer-section {
        padding-top: 140px;
        background-image: url(../assets/stats-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;
      }

      .positions-section {
        background-image: url(../assets/positions-bg.png);
        background-position: calc(100% - 7.5vw) center;
        background-size: auto;
        background-repeat: no-repeat;
      }

      .smokes-section {
        background-color: $dark-2;
        background-image: url(../assets/smokes-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;
      }

      .ready-section {
        padding: 60px 0;
        padding-bottom: 220px;
        background-image: url(../assets/fire-bg.png);
        background-position: center bottom;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .ready-section {
        .title {
          text-align: center;
          font-size: 2.25rem;
          letter-spacing: 0.021em;
          font-weight: bold;
          text-transform: uppercase;
        }
      }

      .ready-section {
        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 1em auto 0;
          font-size: 16px;
          color: $light-1;
          font-weight: 500;
        }
      }

      .ready-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .login-steam {
          margin-top: 30px;
        }
      }
    }
  }
}

@media (max-width: 699px) {
  .view-landingpage {
    .full-width-container {
      color: #fff;
      margin: 0 auto;

      .container {
        max-width: 1200px;
        width: 100%;
        padding: 0 15px;
        margin: 0 auto;
      }

      header {
        background-color: $dark-1;
        padding: 20px 0px;
        display: flex;
        position: relative;

        .header-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: inline-flex;

          &logo--header {
            margin-right: 20px;
          }
        }
      }

      .steam-logo {
        width: 16px;
        height: 16px;
      }

      .hero-section {
        padding: 0 0 40px 0;
        background-color: $dark-2;
        background-image: url(../assets/hero-map-bg.png),
          url(../assets/hero-bg.png);
        background-repeat: no-repeat;
        background-position: center left, center;

        .hero-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-steam {
          margin-top: 40px;
        }

        .logo-hero {
          width: 100%;
          max-width: 480px;
          height: auto;
          object-fit: contain;
          padding-top: 50px;
        }

        .title {
          margin: 0;
        }

        @mixin hero-title {
          font-size: 28px;
          margin-top: 1.2em;
          color: $light-1;
          text-align: center;
          max-width: 750px;
          font-weight: 500;
        }

        .hero-title {
          @include hero-title;
        }

        .hero-subtitle {
          @include hero-title;
          font-size: 18px;
          margin-top: 0;
          padding-top: 4px;
        }

        .hero-img {
          margin-top: 45px;
          object-fit: contain;
          max-width: 100%;
          height: auto;
        }
      }

      .login-steam {
        border-radius: 2.5em;
        min-width: 240px;
        padding: 0.75em 1.25em;
        padding-top: 0.5em;
        text-decoration: none;
        text-align: center;
        transition: 0.3s;
        color: #fff;
        font-size: 13px;
        padding: 0.6em 1.785em 0.75em 1.785em;
      }

      .login-steam .steam-logo {
        fill: #fff;
        margin-left: 10px;
        position: relative;
        top: 2px;
      }

      button {
        text-decoration: none;
        transition: 0.3s;
        cursor: pointer;
      }

      [class*="button"] {
        text-decoration: none;
        transition: 0.3s;
      }

      .button-gray-transparent {
        font-size: 14px;
        color: #fff;
        border-radius: 25px;
        padding: 0.5em 1.785em 0.75em 1.785em;
        background-color: $purple;
        border: 1px solid $purple;
        background-color: transparent;
        color: #fff;
        line-height: 1;

        &.button-gray-transparent:hover {
          background-color: $purple;
        }

        &.button-gray-transparent:focus {
          outline: 1px solid $dark-1;
        }

        &.button-gray-transparent--round {
          border-radius: 2.5em;
        }

        &.button-gray-transparent--small {
          padding: 0.5em 1.5em;
          min-width: 95px;
        }
      }

      .offer-section {
        padding: 0;
        background-image: url(../assets/offer-blur.png);
        background-size: cover;
        background-position: center bottom;
        background-repeat: no-repeat;
        padding-bottom: 130px;
        background-color: $dark-2;

        .title {
          text-align: center;
          font-size: 2.25rem;
          margin-bottom: 0;
        }

        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 0.3em auto 0;
          color: $light-1;
          font-size: 16px;
          font-weight: 500;
        }

        .offer-wrap {
          display: flex;
          flex-wrap: wrap;
          margin: 60px -10px 0;

          .offer {
            max-width: calc(100% / 3 - 20px);
            margin: 20px 10px 0;
            width: 100%;
            display: flex;
            flex-direction: column;

            .offer-img-wrap {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
              position: relative;

              &.offer-img-wrap:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 1px;
                height: 1px;
                border-radius: 50%;
                box-shadow: 0px 0px 45px 30px $red-2;
              }
            }

            .offer-img {
              width: 80px;
              height: 64px;
            }

            .offer-title {
              height: 45px; //
              font-size: 18px;
              text-align: center;
              padding-bottom: 3px;
              display: block;

              &.first-title {
                height: 25px; //
              }
            }

            .offer-text {
              font-size: 14px;
              font-weight: 500;
              text-align: center;
              max-width: 240px;
              margin: 0 auto;
              flex: 0 1 100%;
              color: $light-1;
            }
          }
        }
      }

      .offer-games {
        width: 100%;
        margin: -45px 0 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 2;

        .offer-game {
          max-width: 80%;

          .games-nav {
            width: auto;
            margin: 0 auto;
            padding: 0;

            ul {
              list-style: none;
              text-align: center;
              padding: 0 30px;
              background-color: $dark-3;
              border: 1px solid $dark-4;
              border-radius: 3px;

              li {
                display: inline-block;
                padding: 0 25px;

                a {
                  position: relative;
                  padding: 0;
                }

                a:hover .games-nav-active {
                  filter: opacity(1);
                }
              }

              a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 0;
                background: orange;
                transition: height 0.3s;
              }

              a:hover::after {
                height: 2px;
                transition: height 0.3s;
              }

              a + a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: -5px;
                width: 0;
                height: 5px;
                background: orange;
                transition: width 0.3s;
              }

              a + a:hover::after {
                width: 100%;
                transition: width 0.3s;
              }
            }
          }

          .games-nav-active {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }

          .games-nav-inactive {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }
        }
      }

      .desc-section {
        padding: 45px 0;
        background-color: $dark-2;
        margin-top: 120px;

        .section-desc-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;

          .section-desc {
            max-width: 320px;
            width: 100%;
            margin-left: auto;

            .section-desc-title {
              display: block;
              font-size: 1.5rem;
              font-weight: bold;
              margin-top: 0.75em;
              margin-bottom: 0.875em;
            }

            .section-desc-img-wrap {
              display: flex;
              align-items: flex-end;
              height: auto;
            }

            .section-desc-text {
              font-size: 14px;
              line-height: 1.357;
              font-weight: 400;
              max-width: 280px;
            }
          }

          .section-desc--right {
            margin-left: auto;
            text-align: right;

            .section-desc-img-wrap {
              justify-content: flex-end;
            }

            .section-desc-text {
              margin-left: auto;
            }
          }

          .section-desc--left {
            margin-left: 0;
            text-align: left;

            .section-desc-img-wrap {
              justify-content: flex-start;
            }
            .section-desc-text {
              margin-right: auto;
            }
          }
        }
      }

      .demoviewer-section {
        padding-top: 60px;
        background-image: url(../assets/stats-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;
      }

      .positions-section {
        background-image: url(../assets/positions-bg.png);
        background-position: calc(100% - 7.5vw) center;
        background-size: auto;
        background-repeat: no-repeat;
        margin-top: 40px;
      }

      .smokes-section {
        background-color: $dark-2;
        background-image: url(../assets/smokes-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;
        margin-top: 40px;
      }

      .ready-section {
        padding: 20px 0;
        padding-bottom: 120px;
        background-image: url(../assets/fire-bg.png);
        background-position: center bottom;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .ready-section {
        .title {
          text-align: center;
          font-size: 2.25rem;
          letter-spacing: 0.021em;
          font-weight: bold;
          text-transform: uppercase;
        }
      }

      .ready-section {
        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 1em auto 0;
          font-size: 16px;
          color: $light-1;
          font-weight: 500;
        }
      }

      .ready-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .login-steam {
          margin-top: 30px;
        }
      }
    }
  }
}

@media (max-width: 596px) {
  .view-landingpage {
    .full-width-container {
      color: #fff;
      margin: 0 auto;

      .container {
        max-width: 1200px;
        width: 100%;
        padding: 0 15px;
        margin: 0 auto;
      }

      header {
        background-color: $dark-1;
        padding: 20px 0px;
        display: flex;
        position: relative;

        .header-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: inline-flex;

          &logo--header {
            margin-right: 20px;
          }
        }
      }

      .steam-logo {
        width: 16px;
        height: 16px;
      }

      .hero-section {
        padding: 0 0 40px 0;
        background-color: $dark-2;
        background-image: url(../assets/hero-map-bg.png),
          url(../assets/hero-bg.png);
        background-repeat: no-repeat;
        background-position: center left, center;

        .hero-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-steam {
          margin-top: 40px;
        }

        .logo-hero {
          width: 100%;
          max-width: 480px;
          height: auto;
          object-fit: contain;
          padding-top: 50px;
        }

        .title {
          margin: 0;
        }

        @mixin hero-title {
          font-size: 28px;
          margin-top: 1.2em;
          color: $light-1;
          text-align: center;
          max-width: 750px;
          font-weight: 500;
        }

        .hero-title {
          @include hero-title;
        }

        .hero-subtitle {
          @include hero-title;
          font-size: 18px;
          margin-top: 0;
          padding-top: 4px;
        }

        .hero-img {
          margin-top: 45px;
          object-fit: contain;
          max-width: 100%;
          height: auto;
        }
      }

      .login-steam {
        border-radius: 2.5em;
        min-width: 240px;
        padding: 0.75em 1.25em;
        padding-top: 0.5em;
        text-decoration: none;
        text-align: center;
        transition: 0.3s;
        color: #fff;
        font-size: 13px;
        padding: 0.6em 1.785em 0.75em 1.785em;
      }

      .login-steam .steam-logo {
        fill: #fff;
        margin-left: 10px;
        position: relative;
        top: 2px;
      }

      button {
        text-decoration: none;
        transition: 0.3s;
        cursor: pointer;
      }

      [class*="button"] {
        text-decoration: none;
        transition: 0.3s;
      }

      .button-gray-transparent {
        font-size: 14px;
        color: #fff;
        border-radius: 25px;
        padding: 0.5em 1.785em 0.75em 1.785em;
        background-color: $purple;
        border: 1px solid $purple;
        background-color: transparent;
        color: #fff;
        line-height: 1;

        &.button-gray-transparent:hover {
          background-color: $purple;
        }

        &.button-gray-transparent:focus {
          outline: 1px solid $dark-1;
        }

        &.button-gray-transparent--round {
          border-radius: 2.5em;
        }

        &.button-gray-transparent--small {
          padding: 0.5em 1.5em;
          min-width: 95px;
        }
      }

      .offer-section {
        padding: 0;
        background-image: url(../assets/offer-blur.png);
        background-size: cover;
        background-position: center bottom;
        background-repeat: no-repeat;
        padding-bottom: 130px;
        background-color: $dark-2;

        .title {
          text-align: center;
          font-size: 2.25rem;
          margin-bottom: 0;
        }

        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 0.3em auto 0;
          color: $light-1;
          font-size: 16px;
          font-weight: 500;
        }

        .offer-wrap {
          display: flex;
          flex-wrap: wrap;
          margin: 60px -10px 0;

          .offer {
            max-width: calc(100% / 3 - 20px);
            margin: 20px 10px 0;
            width: 100%;
            display: flex;
            flex-direction: column;

            .offer-img-wrap {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
              position: relative;

              &.offer-img-wrap:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 1px;
                height: 1px;
                border-radius: 50%;
                box-shadow: 0px 0px 45px 30px $red-2;
              }
            }

            .offer-img {
              width: 80px;
              height: 64px;
            }

            .offer-title {
              height: 45px; //
              font-size: 18px;
              text-align: center;
              padding-bottom: 3px;
              display: block;

              &.first-title {
                height: 45px; //
              }
            }

            .offer-text {
              font-size: 14px;
              font-weight: 500;
              text-align: center;
              max-width: 240px;
              margin: 0 auto;
              flex: 0 1 100%;
              color: $light-1;
            }
          }
        }
      }

      .offer-games {
        width: 100%;
        margin: -45px 0 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 2;

        .offer-game {
          max-width: 80%;

          .games-nav {
            width: auto;
            margin: 0 auto;
            padding: 0;

            ul {
              list-style: none;
              text-align: center;
              padding: 0 30px;
              background-color: $dark-3;
              border: 1px solid $dark-4;
              border-radius: 3px;

              li {
                display: inline-block;
                padding: 0 25px;

                a {
                  position: relative;
                  padding: 0;
                }

                a:hover .games-nav-active {
                  filter: opacity(1);
                }
              }

              a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 0;
                background: orange;
                transition: height 0.3s;
              }

              a:hover::after {
                height: 2px;
                transition: height 0.3s;
              }

              a + a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: -5px;
                width: 0;
                height: 5px;
                background: orange;
                transition: width 0.3s;
              }

              a + a:hover::after {
                width: 100%;
                transition: width 0.3s;
              }
            }
          }

          .games-nav-active {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }

          .games-nav-inactive {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }
        }
      }

      .desc-section {
        padding: 45px 0;
        background-color: $dark-2;
        margin-top: 120px;

        .section-desc-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;

          .section-desc {
            max-width: 320px;
            width: 100%;
            margin-left: auto;

            .section-desc-title {
              display: block;
              font-size: 1.5rem;
              font-weight: bold;
              margin-top: 0.75em;
              margin-bottom: 0.875em;
            }

            .section-desc-img-wrap {
              display: flex;
              align-items: flex-end;
              height: auto;
            }

            .section-desc-text {
              font-size: 14px;
              line-height: 1.357;
              font-weight: 400;
              max-width: 280px;
            }
          }

          .section-desc--right {
            margin-left: auto;
            text-align: right;

            .section-desc-img-wrap {
              justify-content: flex-end;
            }

            .section-desc-text {
              margin-left: auto;
            }
          }

          .section-desc--left {
            margin-left: 0;
            text-align: left;

            .section-desc-img-wrap {
              justify-content: flex-start;
            }
            .section-desc-text {
              margin-right: auto;
            }
          }
        }
      }

      .demoviewer-section {
        padding-top: 60px;
        background-image: url(../assets/stats-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;

        .section-desc-img {
        object-fit: contain;
        height: auto;
        max-height: auto;
        max-width: 60%;
        }
      }

      .positions-section {
        background-image: url(../assets/positions-bg.png);
        background-position: calc(100% - 7.5vw) center;
        background-size: auto;
        background-repeat: no-repeat;
        margin-top: 40px;
      }

      .smokes-section {
        background-color: $dark-2;
        background-image: url(../assets/smokes-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;
        margin-top: 40px;
      }

      .ready-section {
        padding: 20px 0;
        padding-bottom: 120px;
        background-image: url(../assets/fire-bg.png);
        background-position: center bottom;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .ready-section {
        .title {
          text-align: center;
          font-size: 2.25rem;
          letter-spacing: 0.021em;
          font-weight: bold;
          text-transform: uppercase;
        }
      }

      .ready-section {
        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 1em auto 0;
          font-size: 16px;
          color: $light-1;
          font-weight: 500;
        }
      }

      .ready-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .login-steam {
          margin-top: 30px;
        }
      }
    }
  }
}

@media (max-width: 500px) {
  .view-landingpage {
    .full-width-container {
      color: #fff;
      margin: 0 auto;

      .container {
        max-width: 1200px;
        width: 100%;
        padding: 0 15px;
        margin: 0 auto;
      }

      header {
        background-color: $dark-1;
        padding: 20px 0px;
        display: flex;
        position: relative;

        .header-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: inline-flex;

          &logo--header {
            margin-right: 20px;
          }
        }
      }

      .steam-logo {
        width: 16px;
        height: 16px;
      }

      .hero-section {
        padding: 0 0 40px 0;
        background-color: $dark-2;
        background-image: url(../assets/hero-map-bg.png),
          url(../assets/hero-bg.png);
        background-repeat: no-repeat;
        background-position: center left, center;

        .hero-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-steam {
          margin-top: 40px;
        }

        .logo-hero {
          width: 100%;
          max-width: 480px;
          height: auto;
          object-fit: contain;
          padding-top: 50px;
        }

        .title {
          margin: 0;
        }

        @mixin hero-title {
          font-size: 28px;
          margin-top: 1.2em;
          color: $light-1;
          text-align: center;
          max-width: 750px;
          font-weight: 500;
        }

        .hero-title {
          @include hero-title;
        }

        .hero-subtitle {
          @include hero-title;
          font-size: 18px;
          margin-top: 0;
          padding-top: 4px;
        }

        .hero-img {
          margin-top: 45px;
          object-fit: contain;
          max-width: 100%;
          height: auto;
        }
      }

      .login-steam {
        border-radius: 2.5em;
        min-width: 240px;
        padding: 0.75em 1.25em;
        padding-top: 0.5em;
        text-decoration: none;
        text-align: center;
        transition: 0.3s;
        color: #fff;
        font-size: 13px;
        padding: 0.6em 1.785em 0.75em 1.785em;
      }

      .login-steam .steam-logo {
        fill: #fff;
        margin-left: 10px;
        position: relative;
        top: 2px;
      }

      button {
        text-decoration: none;
        transition: 0.3s;
        cursor: pointer;
      }

      [class*="button"] {
        text-decoration: none;
        transition: 0.3s;
      }

      .button-gray-transparent {
        font-size: 14px;
        color: #fff;
        border-radius: 25px;
        padding: 0.5em 1.785em 0.75em 1.785em;
        background-color: $purple;
        border: 1px solid $purple;
        background-color: transparent;
        color: #fff;
        line-height: 1;

        &.button-gray-transparent:hover {
          background-color: $purple;
        }

        &.button-gray-transparent:focus {
          outline: 1px solid $dark-1;
        }

        &.button-gray-transparent--round {
          border-radius: 2.5em;
        }

        &.button-gray-transparent--small {
          padding: 0.5em 1.5em;
          min-width: 95px;
        }
      }

      .offer-section {
        padding: 0;
        background-image: url(../assets/offer-blur.png);
        background-size: cover;
        background-position: center bottom;
        background-repeat: no-repeat;
        padding-bottom: 130px;
        background-color: $dark-2;

        .title {
          text-align: center;
          font-size: 2.25rem;
          margin-bottom: 0;
        }

        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 0.3em auto 0;
          color: $light-1;
          font-size: 16px;
          font-weight: 500;
        }

        .offer-wrap {
          display: flex;
          flex-wrap: wrap;
          margin: 60px -10px 0;

          .offer {
            max-width: calc(100% / 3 - 20px);
            margin: 20px 10px 0;
            width: 100%;
            display: flex;
            flex-direction: column;

            .offer-img-wrap {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
              position: relative;

              &.offer-img-wrap:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 1px;
                height: 1px;
                border-radius: 50%;
                box-shadow: 0px 0px 45px 30px $red-2;
              }
            }

            .offer-img {
              width: 80px;
              height: 64px;
            }

            .offer-title {
              height: 23px;
              font-size: 18px;
              text-align: center;
              padding-bottom: 3px;
              display: block;

              &.first-title {
                height: 20px;
              }

              &.middle-title {
                height: 20px;
              }

              &.last-title {
                height: 20px;
              }
            }

            .offer-text {
              margin-top: 25px;
            }
          }
        }
      }

      .offer-games {
        width: 100%;
        margin: -45px 0 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 2;

        .offer-game {
          max-width: 80%;

          .games-nav {
            width: auto;
            margin: 0 auto;
            padding: 0;

            ul {
              list-style: none;
              text-align: center;
              padding: 0 30px;
              background-color: $dark-3;
              border: 1px solid $dark-4;
              border-radius: 3px;

              li {
                display: inline-block;
                padding: 0 25px;

                a {
                  position: relative;
                  padding: 0;
                }

                a:hover .games-nav-active {
                  filter: opacity(1);
                }
              }

              a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 0;
                background: orange;
                transition: height 0.3s;
              }

              a:hover::after {
                height: 2px;
                transition: height 0.3s;
              }

              a + a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: -5px;
                width: 0;
                height: 5px;
                background: orange;
                transition: width 0.3s;
              }

              a + a:hover::after {
                width: 100%;
                transition: width 0.3s;
              }
            }
          }

          .games-nav-active {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }

          .games-nav-inactive {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }
        }
      }

      .desc-section {
        padding: 45px 0;
        background-color: $dark-2;
        margin-top: 160px;

        .section-desc-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;

          .section-desc {
            max-width: 320px;
            width: 100%;
            margin-left: auto;

            .section-desc-title {
              display: block;
              font-size: 1.5rem;
              font-weight: bold;
              margin-top: 0.75em;
              margin-bottom: 0.875em;
            }

            .section-desc-img-wrap {
              display: flex;
              align-items: flex-end;
              height: auto;
            }

            .section-desc-text {
              font-size: 14px;
              line-height: 1.357;
              font-weight: 400;
              max-width: 280px;
            }
          }

          .section-desc--right {
            margin-left: auto;
            text-align: right;

            .section-desc-img-wrap {
              justify-content: flex-end;
            }

            .section-desc-text {
              margin-left: auto;
            }
          }

          .section-desc--left {
            margin-left: 0;
            text-align: left;

            .section-desc-img-wrap {
              justify-content: flex-start;
            }
            .section-desc-text {
              margin-right: auto;
            }
          }
        }
      }

      .demoviewer-section {
        padding-top: 120px;
        background-image: url(../assets/stats-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;

        .section-desc-img {
        object-fit: contain;
        height: auto;
        max-height: auto;
        max-width: 50%;
        }
      }

      .positions-section {
        background-image: url(../assets/positions-bg.png);
        background-position: calc(100% - 7.5vw) center;
        background-size: auto;
        background-repeat: no-repeat;
        margin-top: 20px;
      }

      .smokes-section {
        background-color: $dark-2;
        background-image: url(../assets/smokes-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;
        margin-top: 20px;
      }

      .ready-section {
        padding: 20px 0;
        padding-bottom: 120px;
        background-image: url(../assets/fire-bg.png);
        background-position: center bottom;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .ready-section {
        .title {
          text-align: center;
          font-size: 2.25rem;
          letter-spacing: 0.021em;
          font-weight: bold;
          text-transform: uppercase;
        }
      }

      .ready-section {
        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 1em auto 0;
          font-size: 16px;
          color: $light-1;
          font-weight: 500;
        }
      }

      .ready-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .login-steam {
          margin-top: 30px;
        }
      }
    }
  }
}

@media (max-width: 415px) {
  .view-landingpage {
    .full-width-container {
      color: #fff;
      margin: 0 auto;

      .container {
        max-width: 1200px;
        width: 100%;
        padding: 0 15px;
        margin: 0 auto;
      }

      header {
        background-color: $dark-1;
        padding: 20px 0px;
        display: flex;
        position: relative;

        .header-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: inline-flex;

          &logo--header {
            margin-right: 20px;
          }
        }
      }

      .steam-logo {
        width: 16px;
        height: 16px;
      }

      .hero-section {
        padding: 0 0 40px 0;
        background-color: $dark-2;
        background-image: url(../assets/hero-map-bg.png),
          url(../assets/hero-bg.png);
        background-repeat: no-repeat;
        background-position: center left, center;

        .hero-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-steam {
          margin-top: 40px;
        }

        .logo-hero {
          width: 100%;
          max-width: 480px;
          height: auto;
          object-fit: contain;
          padding-top: 50px;
        }

        .title {
          margin: 0;
        }

        @mixin hero-title {
          font-size: 28px;
          margin-top: 1.2em;
          color: $light-1;
          text-align: center;
          max-width: 750px;
          font-weight: 500;
        }

        .hero-title {
          @include hero-title;
        }

        .hero-subtitle {
          @include hero-title;
          font-size: 18px;
          margin-top: 0;
          padding-top: 4px;
        }

        .hero-img {
          margin-top: 45px;
          object-fit: contain;
          max-width: 100%;
          height: auto;
        }
      }

      .login-steam {
        border-radius: 2.5em;
        min-width: 240px;
        padding: 0.75em 1.25em;
        padding-top: 0.5em;
        text-decoration: none;
        text-align: center;
        transition: 0.3s;
        color: #fff;
        font-size: 13px;
        padding: 0.6em 1.785em 0.75em 1.785em;
      }

      .login-steam .steam-logo {
        fill: #fff;
        margin-left: 10px;
        position: relative;
        top: 2px;
      }

      button {
        text-decoration: none;
        transition: 0.3s;
        cursor: pointer;
      }

      [class*="button"] {
        text-decoration: none;
        transition: 0.3s;
      }

      .button-gray-transparent {
        font-size: 14px;
        color: #fff;
        border-radius: 25px;
        padding: 0.5em 1.785em 0.75em 1.785em;
        background-color: $purple;
        border: 1px solid $purple;
        background-color: transparent;
        color: #fff;
        line-height: 1;

        &.button-gray-transparent:hover {
          background-color: $purple;
        }

        &.button-gray-transparent:focus {
          outline: 1px solid $dark-1;
        }

        &.button-gray-transparent--round {
          border-radius: 2.5em;
        }

        &.button-gray-transparent--small {
          padding: 0.5em 1.5em;
          min-width: 95px;
        }
      }

      .offer-section {
        padding: 0;
        background-image: url(../assets/offer-blur.png);
        background-size: cover;
        background-position: center bottom;
        background-repeat: no-repeat;
        padding-bottom: 130px;
        background-color: $dark-2;

        .title {
          text-align: center;
          font-size: 2.25rem;
          margin-bottom: 0;
        }

        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 0.3em auto 0;
          color: $light-1;
          font-size: 16px;
          font-weight: 500;
        }

        .offer-wrap {
          display: flex;
          flex-wrap: wrap;
          margin: 60px -10px 0;

          .offer {
            max-width: calc(100% / 3 - 20px);
            margin: 20px 10px 0;
            width: 100%;
            display: flex;
            flex-direction: column;

            .offer-img-wrap {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
              position: relative;

              &.offer-img-wrap:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 1px;
                height: 1px;
                border-radius: 50%;
                box-shadow: 0px 0px 45px 30px $red-2;
              }
            }

            .offer-img {
              width: 80px;
              height: 64px;
            }

            .offer-title {
              &.first-title {
                height: 0; //
              }

              &.middle-title {
                height: 24px; //
              }

              &.last-title {
                height: 0; //
              }
            }

            .offer-text {
              margin-top: 50px;
            }
          }
        }
      }

      .offer-games {
        width: 100%;
        margin: -45px 0 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 2;

        .offer-game {
          max-width: 80%;

          .games-nav {
            width: auto;
            margin: 0 auto;
            padding: 0;

            ul {
              list-style: none;
              text-align: center;
              padding: 0 30px;
              background-color: $dark-3;
              border: 1px solid $dark-4;
              border-radius: 3px;

              li {
                display: inline-block;
                padding: 0 25px;

                a {
                  position: relative;
                  padding: 0;
                }

                a:hover .games-nav-active {
                  filter: opacity(1);
                }
              }

              a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 0;
                background: orange;
                transition: height 0.3s;
              }

              a:hover::after {
                height: 2px;
                transition: height 0.3s;
              }

              a + a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: -5px;
                width: 0;
                height: 5px;
                background: orange;
                transition: width 0.3s;
              }

              a + a:hover::after {
                width: 100%;
                transition: width 0.3s;
              }
            }
          }

          .games-nav-active {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }

          .games-nav-inactive {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }
        }
      }

      .desc-section {
        padding: 45px 0;
        background-color: $dark-2;
        margin-top: 160px;

        .section-desc-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;

          .section-desc {
            max-width: 320px;
            width: 100%;
            margin-left: auto;

            .section-desc-title {
              display: block;
              font-size: 1.5rem;
              font-weight: bold;
              margin-top: 0.75em;
              margin-bottom: 0.875em;
            }

            .section-desc-img-wrap {
              display: flex;
              align-items: flex-end;
              height: auto;
            }

            .section-desc-text {
              font-size: 14px;
              line-height: 1.357;
              font-weight: 400;
              max-width: 280px;
            }
          }

          .section-desc--right {
            margin-left: auto;
            text-align: right;

            .section-desc-img-wrap {
              justify-content: flex-end;
            }

            .section-desc-text {
              margin-left: auto;
            }
          }

          .section-desc--left {
            margin-left: 0;
            text-align: left;

            .section-desc-img-wrap {
              justify-content: flex-start;
            }
            .section-desc-text {
              margin-right: auto;
            }
          }
        }
      }

      .demoviewer-section {
        padding-top: 120px;
        background-image: url(../assets/stats-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;
      }

      .positions-section {
        background-image: url(../assets/positions-bg.png);
        background-position: calc(100% - 7.5vw) center;
        background-size: auto;
        background-repeat: no-repeat;
        margin-top: 0;
      }

      .smokes-section {
        background-color: $dark-2;
        background-image: url(../assets/smokes-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;
        margin-top: 0;
      }

      .ready-section {
        padding: 30px 0;
        padding-bottom: 120px;
        background-image: url(../assets/fire-bg.png);
        background-position: center bottom;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .ready-section {
        .title {
          text-align: center;
          font-size: 2.25rem;
          letter-spacing: 0.021em;
          font-weight: bold;
          text-transform: uppercase;
        }
      }

      .ready-section {
        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 1em auto 0;
          font-size: 16px;
          color: $light-1;
          font-weight: 500;
        }
      }

      .ready-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .login-steam {
          margin-top: 30px;
        }
      }
    }
  }
}

@media (max-width: 395px) {
  .view-landingpage {
    .full-width-container {
      color: #fff;
      margin: 0 auto;

      .container {
        max-width: 1200px;
        width: 100%;
        padding: 0 15px;
        margin: 0 auto;
      }

      header {
        background-color: $dark-1;
        padding: 20px 0px;
        display: flex;
        position: relative;

        .header-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: inline-flex;

          &logo--header {
            margin-right: 20px;
          }
        }
      }

      .steam-logo {
        width: 16px;
        height: 16px;
      }

      .hero-section {
        padding: 0 0 40px 0;
        background-color: $dark-2;
        background-image: url(../assets/hero-map-bg.png),
          url(../assets/hero-bg.png);
        background-repeat: no-repeat;
        background-position: center left, center;

        .hero-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-steam {
          margin-top: 40px;
        }

        .logo-hero {
          width: 100%;
          max-width: 480px;
          height: auto;
          object-fit: contain;
          padding-top: 50px;
        }

        .title {
          margin: 0;
        }

        @mixin hero-title {
          font-size: 28px;
          margin-top: 1.2em;
          color: $light-1;
          text-align: center;
          max-width: 750px;
          font-weight: 500;
        }

        .hero-title {
          @include hero-title;
        }

        .hero-subtitle {
          @include hero-title;
          font-size: 18px;
          margin-top: 0;
          padding-top: 4px;
        }

        .hero-img {
          margin-top: 45px;
          object-fit: contain;
          max-width: 100%;
          height: auto;
        }
      }

      .login-steam {
        border-radius: 2.5em;
        min-width: 240px;
        padding: 0.75em 1.25em;
        padding-top: 0.5em;
        text-decoration: none;
        text-align: center;
        transition: 0.3s;
        color: #fff;
        font-size: 13px;
        padding: 0.6em 1.785em 0.75em 1.785em;
      }

      .login-steam .steam-logo {
        fill: #fff;
        margin-left: 10px;
        position: relative;
        top: 2px;
      }

      button {
        text-decoration: none;
        transition: 0.3s;
        cursor: pointer;
      }

      [class*="button"] {
        text-decoration: none;
        transition: 0.3s;
      }

      .button-gray-transparent {
        font-size: 14px;
        color: #fff;
        border-radius: 25px;
        padding: 0.5em 1.785em 0.75em 1.785em;
        background-color: $purple;
        border: 1px solid $purple;
        background-color: transparent;
        color: #fff;
        line-height: 1;

        &.button-gray-transparent:hover {
          background-color: $purple;
        }

        &.button-gray-transparent:focus {
          outline: 1px solid $dark-1;
        }

        &.button-gray-transparent--round {
          border-radius: 2.5em;
        }

        &.button-gray-transparent--small {
          padding: 0.5em 1.5em;
          min-width: 95px;
        }
      }

      .offer-section {
        padding: 0;
        background-image: url(../assets/offer-blur.png);
        background-size: cover;
        background-position: center bottom;
        background-repeat: no-repeat;
        padding-bottom: 130px;
        background-color: $dark-2;

        .title {
          text-align: center;
          font-size: 2.25rem;
          margin-bottom: 0;
        }

        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 0.3em auto 0;
          color: $light-1;
          font-size: 16px;
          font-weight: 500;
        }

        .offer-wrap {
          display: flex;
          flex-wrap: wrap;
          margin: 60px -10px 0;

          .offer {
            max-width: calc(100% / 3 - 20px);
            margin: 20px 10px 0;
            width: 100%;
            display: flex;
            flex-direction: column;

            .offer-img-wrap {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
              position: relative;

              &.offer-img-wrap:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 1px;
                height: 1px;
                border-radius: 50%;
                box-shadow: 0px 0px 45px 30px $red-2;
              }
            }

            .offer-img {
              width: 80px;
              height: 64px;
            }

            .offer-title {
              &.first-title {
                height: 5px; //
              }

              &.middle-title {
                height: 25px; //
              }

              &.last-title {
                height: 25px; //
              }
            }

            .offer-text {
              margin-top: 50px;
            }
          }
        }
      }

      .offer-games {
        width: 100%;
        margin: -45px 0 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 2;

        .offer-game {
          max-width: 80%;

          .games-nav {
            width: auto;
            margin: 0 auto;
            padding: 0;

            ul {
              list-style: none;
              text-align: center;
              padding: 0 30px;
              background-color: $dark-3;
              border: 1px solid $dark-4;
              border-radius: 3px;

              li {
                display: inline-block;
                padding: 0 25px;

                a {
                  position: relative;
                  padding: 0;
                }

                a:hover .games-nav-active {
                  filter: opacity(1);
                }
              }

              a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 0;
                background: orange;
                transition: height 0.3s;
              }

              a:hover::after {
                height: 2px;
                transition: height 0.3s;
              }

              a + a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: -5px;
                width: 0;
                height: 5px;
                background: orange;
                transition: width 0.3s;
              }

              a + a:hover::after {
                width: 100%;
                transition: width 0.3s;
              }
            }
          }

          .games-nav-active {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }

          .games-nav-inactive {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }
        }
      }

      .desc-section {
        padding: 45px 0;
        background-color: $dark-2;
        margin-top: 160px;

        .section-desc-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;

          .section-desc {
            max-width: 320px;
            width: 100%;
            margin-left: auto;

            .section-desc-title {
              display: block;
              font-size: 1.5rem;
              font-weight: bold;
              margin-top: 0.75em;
              margin-bottom: 0.875em;
            }

            .section-desc-img-wrap {
              display: flex;
              align-items: flex-end;
              height: auto;
            }

            .section-desc-text {
              font-size: 14px;
              line-height: 1.357;
              font-weight: 400;
              max-width: 280px;
            }
          }

          .section-desc--right {
            margin-left: auto;
            text-align: right;

            .section-desc-img-wrap {
              justify-content: flex-end;
            }

            .section-desc-text {
              margin-left: auto;
            }
          }

          .section-desc--left {
            margin-left: 0;
            text-align: left;

            .section-desc-img-wrap {
              justify-content: flex-start;
            }
            .section-desc-text {
              margin-right: auto;
            }
          }
        }
      }

      .demoviewer-section {
        padding-top: 140px;
        background-image: url(../assets/stats-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;
      }

      .positions-section {
        background-image: url(../assets/positions-bg.png);
        background-position: calc(100% - 7.5vw) center;
        background-size: auto;
        background-repeat: no-repeat;
        margin-top: 0;
      }

      .smokes-section {
        background-color: $dark-2;
        background-image: url(../assets/smokes-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;
        margin-top: 0;
      }

      .ready-section {
        padding: 25px 0;
        padding-bottom: 120px;
        background-image: url(../assets/fire-bg.png);
        background-position: center bottom;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .ready-section {
        .title {
          text-align: center;
          font-size: 2.25rem;
          letter-spacing: 0.021em;
          font-weight: bold;
          text-transform: uppercase;
        }
      }

      .ready-section {
        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 1em auto 0;
          font-size: 16px;
          color: $light-1;
          font-weight: 500;
        }
      }

      .ready-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .login-steam {
          margin-top: 30px;
        }
      }
    }
  }
}

@media (max-width: 350px) {
  .view-landingpage {
    .full-width-container {
      color: #fff;
      margin: 0 auto;

      .container {
        max-width: 1200px;
        width: 100%;
        padding: 0 15px;
        margin: 0 auto;
      }

      header {
        background-color: $dark-1;
        padding: 20px 0px;
        display: flex;
        position: relative;

        .header-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: inline-flex;

          &logo--header {
            margin-right: 20px;
          }
        }
      }

      .steam-logo {
        width: 16px;
        height: 16px;
      }

      .hero-section {
        padding: 0 0 40px 0;
        background-color: $dark-2;
        background-image: url(../assets/hero-map-bg.png),
          url(../assets/hero-bg.png);
        background-repeat: no-repeat;
        background-position: center left, center;

        .hero-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-steam {
          margin-top: 40px;
        }

        .logo-hero {
          width: 100%;
          max-width: 480px;
          height: auto;
          object-fit: contain;
          padding-top: 50px;
        }

        .title {
          margin: 0;
        }

        @mixin hero-title {
          font-size: 28px;
          margin-top: 1.2em;
          color: $light-1;
          text-align: center;
          max-width: 750px;
          font-weight: 500;
        }

        .hero-title {
          @include hero-title;
        }

        .hero-subtitle {
          @include hero-title;
          font-size: 18px;
          margin-top: 0;
          padding-top: 4px;
        }

        .hero-img {
          margin-top: 45px;
          object-fit: contain;
          max-width: 100%;
          height: auto;
        }
      }

      .login-steam {
        border-radius: 2.5em;
        min-width: 240px;
        padding: 0.75em 1.25em;
        padding-top: 0.5em;
        text-decoration: none;
        text-align: center;
        transition: 0.3s;
        color: #fff;
        font-size: 13px;
        padding: 0.6em 1.785em 0.75em 1.785em;
      }

      .login-steam .steam-logo {
        fill: #fff;
        margin-left: 10px;
        position: relative;
        top: 2px;
      }

      button {
        text-decoration: none;
        transition: 0.3s;
        cursor: pointer;
      }

      [class*="button"] {
        text-decoration: none;
        transition: 0.3s;
      }

      .button-gray-transparent {
        font-size: 14px;
        color: #fff;
        border-radius: 25px;
        padding: 0.5em 1.785em 0.75em 1.785em;
        background-color: $purple;
        border: 1px solid $purple;
        background-color: transparent;
        color: #fff;
        line-height: 1;

        &.button-gray-transparent:hover {
          background-color: $purple;
        }

        &.button-gray-transparent:focus {
          outline: 1px solid $dark-1;
        }

        &.button-gray-transparent--round {
          border-radius: 2.5em;
        }

        &.button-gray-transparent--small {
          padding: 0.5em 1.5em;
          min-width: 95px;
        }
      }

      .offer-section {
        padding: 0;
        background-image: url(../assets/offer-blur.png);
        background-size: cover;
        background-position: center bottom;
        background-repeat: no-repeat;
        padding-bottom: 130px;
        background-color: $dark-2;

        .title {
          text-align: center;
          font-size: 2.25rem;
          margin-bottom: 0;
        }

        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 0.3em auto 0;
          color: $light-1;
          font-size: 16px;
          font-weight: 500;
        }

        .offer-wrap {
          display: flex;
          flex-wrap: wrap;
          margin: 60px -10px 0;

          .offer {
            max-width: calc(100% / 3 - 20px);
            margin: 20px 10px 0;
            width: 100%;
            display: flex;
            flex-direction: column;

            .offer-img-wrap {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
              position: relative;

              &.offer-img-wrap:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 1px;
                height: 1px;
                border-radius: 50%;
                box-shadow: 0px 0px 45px 30px $red-2;
              }
            }

            .offer-img {
              width: 80px;
              height: 64px;
            }

            .offer-title {
              height: 25px; //

              &.first-title {
                height: 25px; //
              }
            }

            .offer-text {
              margin-top: 50px;
            }
          }
        }
      }

      .offer-games {
        width: 100%;
        margin: -45px 0 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 2;

        .offer-game {
          max-width: 80%;

          .games-nav {
            width: auto;
            margin: 0 auto;
            padding: 0;

            ul {
              list-style: none;
              text-align: center;
              padding: 0 30px;
              background-color: $dark-3;
              border: 1px solid $dark-4;
              border-radius: 3px;

              li {
                display: inline-block;
                padding: 0 25px;

                a {
                  position: relative;
                  padding: 0;
                }

                a:hover .games-nav-active {
                  filter: opacity(1);
                }
              }

              a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 0;
                background: orange;
                transition: height 0.3s;
              }

              a:hover::after {
                height: 2px;
                transition: height 0.3s;
              }

              a + a::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: -5px;
                width: 0;
                height: 5px;
                background: orange;
                transition: width 0.3s;
              }

              a + a:hover::after {
                width: 100%;
                transition: width 0.3s;
              }
            }
          }

          .games-nav-active {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }

          .games-nav-inactive {
            margin: 8px;
            padding-top: 5px;
            filter: opacity(0.4) grayscale(1);
            transition: all 0.3s;
          }
        }
      }

      .desc-section {
        padding: 45px 0;
        background-color: $dark-2;
        margin-top: 160px;

        .section-desc-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;

          .section-desc {
            max-width: 320px;
            width: 100%;
            margin-left: auto;

            .section-desc-title {
              display: block;
              font-size: 1.5rem;
              font-weight: bold;
              margin-top: 0.75em;
              margin-bottom: 0.875em;
            }

            .section-desc-img-wrap {
              display: flex;
              align-items: flex-end;
              height: auto;
            }

            .section-desc-text {
              font-size: 14px;
              line-height: 1.357;
              font-weight: 400;
              max-width: 280px;
            }
          }

          .section-desc--right {
            margin-left: auto;
            text-align: right;

            .section-desc-img-wrap {
              justify-content: flex-end;
            }

            .section-desc-text {
              margin-left: auto;
            }
          }

          .section-desc--left {
            margin-left: 0;
            text-align: left;

            .section-desc-img-wrap {
              justify-content: flex-start;
            }
            .section-desc-text {
              margin-right: auto;
            }
          }
        }
      }

      .demoviewer-section {
        padding-top: 140px;
        background-image: url(../assets/stats-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;

        .section-desc-img {
        object-fit: contain;
        height: auto;
        max-height: auto;
        max-width: 40%;
        }
      }

      .positions-section {
        background-image: url(../assets/positions-bg.png);
        background-position: calc(100% - 7.5vw) center;
        background-size: auto;
        background-repeat: no-repeat;
        margin-top: 0;
      }

      .smokes-section {
        background-color: $dark-2;
        background-image: url(../assets/smokes-bg.png);
        background-position: 15vw center;
        background-size: auto;
        background-repeat: no-repeat;
        position: relative;
        margin-top: 0;
      }

      .ready-section {
        padding: 0;
        background-image: url(../assets/fire-bg.png);
        background-position: center bottom;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .ready-section {
        .title {
          text-align: center;
          font-size: 2.25rem;
          letter-spacing: 0.021em;
          font-weight: bold;
          text-transform: uppercase;
        }
      }

      .ready-section {
        padding-bottom: 100px;
        .subtitle {
          text-align: center;
          max-width: 360px;
          margin: 1em auto 0;
          font-size: 16px;
          color: $light-1;
          font-weight: 500;
        }
      }

      .ready-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .login-steam {
          margin-top: 30px;
        }
      }
    }
  }
}
</style>
