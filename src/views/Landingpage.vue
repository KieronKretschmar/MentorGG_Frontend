<template>
  <div class="full-width-container">
    <header>
      <video src="@/assets/smoke.mp4" autoplay loop playsinline muted poster="@/assets/csgobg.jpg"></video>
      <div class="container-fixed-width">
        <div class="container-margin">
          <div class="container-nav">
            <img src="@/assets/mentor-logo.svg" class="mentor-logo" />
            <nav>
              <ul class="navigation">
                <li>
                  <a href="#">PRICING</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">
                    LOGIN
                  </a>
                </li>
                <i class="material-icons">exit_to_app</i>
              </ul>
            </nav>
          </div>

          <div class="mobile-nav-wrapper">
            <input type="checkbox" id="toggle" />
            <label for="toggle" class="toggle">
              <span class="line"></span>
              <span class="line"></span>
            </label>
            <div class="mobile-nav-inner-wrapper">
              <ul class="mobile-navigation">
                <li>
                  <a href="#">PRICING</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">LOGIN</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="hero-wrapper">
            <div class="hero-wrapper-inner">
              <div>
                <img src="@/assets/improveyourgame.svg" class="hero-title title-large" />
                <h5 class="subtitle">Get your personal eSports coach app for</h5>
                <h5 class="subtitle">Counter Strike Global Offensive</h5>
              </div>

              <div class="button-wrapper">
                <button @click="signIn()" class="button">SIGN IN THROUGH STEAM</button>
                <button class="button transparent">VIEW DEMO</button>
                <!-- Add link to demo -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="counter-wrapper numbers" ref="counterWrapper">
      <div class="counter">
        <div class="counter-icon-wrapper">
          <div>
            <img src="@/assets/analyze-icon.svg" class="counter-main-icon" alt="analyze icon" />
          </div>
          <div class="counter-text">
            <h4 class="value">{{ counter.matchesAnalyzed }}</h4>
            <p class="icon-text">MATCHES ANALYZED</p>
          </div>
        </div>
      </div>

      <div class="counter">
        <div class="counter-icon-wrapper numbers">
          <div>
            <img src="@/assets/misplays-icon.svg" class="counter-icon" alt="misplays icon" />
          </div>
          <div class="counter-text">
            <h4>{{ counter.misplaysDetected }}</h4>
            <p class="icon-text">MISPLAYS DETECTED</p>
          </div>
        </div>
      </div>

      <div class="counter">
        <div class="counter-icon-wrapper numbers">
          <div>
            <img src="@/assets/highlights-icon.svg" class="counter-icon" alt="highlights icon" />
          </div>
          <div class="counter-text">
            <h4>{{ counter.highlightsDetected }}</h4>
            <p class="icon-text">HIGHLIGHTS DETECTED</p>
          </div>
        </div>
      </div>

      <div class="counter cut">
        <div class="counter-icon-wrapper numbers">
          <div>
            <img src="@/assets/rankups-icon.svg" class="counter-icon" alt="rankups icon" />
          </div>
          <div class="counter-text">
            <h4>{{ counter.rankUps }}</h4>
            <p class="icon-text">RANK UPS</p>
          </div>
        </div>
      </div>
    </div>

    <div class="feature-01-background">
      <div class="container-feature-fixed-width-first">
        <div class="container-feature-margin-left">
          <h1>CORE FEATURE 01</h1>
          <h2>HIGHLIGHTS &amp; MISPLAYS</h2>
          <p>Watch your and your team’s latest</p>
          <p>plays highlights and misplays.</p>
        </div>

        <div class="container-feature-image">
          <img
            src="@/assets/misplays.jpg"
            class="feature-image"
            alt="misplays and highlights feature"
          />
        </div>
      </div>
    </div>

    <div
      class="feature-02-background section"
      ref="section-1"
      :class="{slideup: visibleSections['section-1']}"
    >
      <div class="container-feature-fixed-width-second reverse">
        <div class="container-feature-image">
          <img src="@/assets/demoviewer.jpg" class="feature-image" alt="demoviewer feature" />
        </div>
        <div class="container-feature-margin-right">
          <h1>CORE FEATURE 02</h1>
          <h2>DEMOVIEWER</h2>
          <p>Check out every rounds performance</p>
          <p>from a 2D perspective.</p>
        </div>
      </div>
    </div>

    <div
      class="feature-03-background section"
      ref="section-2"
      :class="{slideup: visibleSections['section-2']}"
    >
      <div class="container-feature-fixed-width-third">
        <div class="container-feature-margin-left">
          <h1>CORE FEATURE 03</h1>
          <h2>GRENADE REVIEW</h2>
          <p>Find out how effective your</p>
          <p>grenades are, which ones you need</p>
          <p>to practice and learn new lineups.</p>
        </div>
        <div class="container-feature-image">
          <img src="@/assets/grenadereview.jpg" class="feature-image" alt="grenade review feature" />
        </div>
      </div>
    </div>

    <div
      class="feature-04-background section"
      ref="section-3"
      :class="{slideup: visibleSections['section-3']}"
    >
      <div class="container-feature-fixed-width-fourth reverse">
        <div class="container-feature-image">
          <img
            src="@/assets/friendcomparison.jpg"
            class="feature-image"
            alt="friend comparison feature"
          />
        </div>
        <div class="container-feature-margin-right">
          <h1>CORE FEATURE 04</h1>
          <h2>FRIEND COMPARISON</h2>
          <p>Compare to your friends and</p>
          <p>find out where you excel.</p>
        </div>
      </div>
    </div>

    <div class="howitworks-wrapper">
      <div class="howitworks-wrapper-inner">
        <div class="howitworks-icon-wrapper">
          <div>
            <img
              src="@/assets/howitworks-icon.svg"
              class="howitworks-icon main-icon"
              alt="how it works icon"
            />
          </div>
          <div class="howitworks-main-text underline">
            <h3>HOW IT WORKS</h3>
          </div>
        </div>

        <div class="howitworks-number-wrapper">
          <img src="@/assets/one-icon.svg" class="howitworks-number" alt="how it works icon number" />
        </div>
        <div class="howitworks-icon-wrapper">
          <div>
            <img src="@/assets/connect-icon.svg" class="howitworks-icon" alt="how it works icon" />
          </div>
          <div class="howitworks-text">
            <p class="icon-text">
              Connect your Steam
              or Faceit account
            </p>
          </div>
        </div>

        <div class="howitworks-number-wrapper">
          <img src="@/assets/two-icon.svg" class="howitworks-number" alt="how it works icon number" />
        </div>
        <div class="howitworks-icon-wrapper">
          <div>
            <img src="@/assets/upload-icon.svg" class="howitworks-icon" alt="how it works icon" />
          </div>
          <div class="howitworks-text">
            <p class="icon-text">
              Start automatically
              uploading matches
            </p>
          </div>
        </div>

        <div class="howitworks-number-wrapper">
          <img
            src="@/assets/three-icon.svg"
            class="howitworks-number"
            alt="how it works icon number"
          />
        </div>
        <div class="howitworks-icon-wrapper">
          <div>
            <img src="@/assets/explore-icon.svg" class="howitworks-icon" alt="how it works icon" />
          </div>
          <div class="howitworks-text">
            <p class="icon-text">
              Explore the analysis for
              your self-improvement
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-section">
      <video
        src="@/assets/smoke-bottom.mp4"
        autoplay
        loop
        playsinline
        muted
        poster="@/assets/bottom-bg.jpg"
      ></video>

      <div class="container-fixed-width-bottom">
        <div class="container-margin-bottom">
          <div class="video-wrapper">
            <div class="video-container">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/NicjsJ9-WLA?start=29"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <!--
          <div class="slideshow-container">
            <div class="slides fade">
              <div class="quote">
                <h5 class="slide-text">"1 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."</h5>
                <h6>1 Name</h6>
              </div>
            </div>

            <div class="slides fade">
              <div class="quote">
                <h5 class="slide-text">"2 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."</h5>
                <h6>2 Name</h6>
              </div>
            </div>

            <div class="slides fade">
              <div class="quote">
                <h5 class="slide-text">"3 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."</h5>
                <h6>3 Name</h6>
              </div>
            </div>

            <div class="dot-wrapper">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>-->

          <div class="bottom-cta">
            <img src="@/assets/improveyourgame.svg" class="hero-title title-small" />
            <button @click="signIn()" class="button cta">SIGN IN THROUGH STEAM</button>
          </div>

          <div class="mail-wrapper">
            <div class="mail-wrapper-inner">
              <div class="mail-text">
                <i class="material-icons mail-icon">markunread</i>
                <p class="small">GET NEWS ABOUT THE TEAM VERSION</p>
              </div>

              <div class="mail-input">
                <input type="email" name="email-address" placeholder="YOUR EMAIL ADDRESS" />
                <button class="button signup">SIGN UP</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visibleSections: {},
      numSections: 3,

      counter: {
        matchesAnalyzed: 0,
        misplaysDetected: 0,
        highlightsDetected: 0,
        rankUps: 0,
      },
      counterInitialized: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", (e) => {
      this.UpdateSectionFlags();
      if (
        this.IsInViewport(this.$refs.counterWrapper) &&
        !this.counterInitialized
      ) {
        console.log("PlayCounterAnimation()");
        this.PlayCounterAnimation();
      }
    });
  },
  methods: {
    IsInViewport(ref) {
      const { top, bottom } = ref.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      return (top > 0 || bottom > 0) && top < viewportHeight;
    },
    UpdateSectionFlags() {
      for (let idx = 1; idx != this.numSections + 1; idx++) {
        let key = `section-${idx}`;
        this.$set(
          this.visibleSections,
          key,
          this.IsInViewport(this.$refs[key])
        );
      }
    },
    PlayCounterAnimation() {
      let startValues = {
        matchesAnalyzed: 500,
        misplaysDetected: 400,
        highlightsDetected: 300,
        rankUps: 600,
      };

      //26. august 2020
      let startTime = 1598450420045;

      let todayTime = new Date().getTime();
      let targetValues = {};
      let steps = {};

      //step animation doesnt end at the same time
      //because buffy is an idiot
      for (let key in startValues) {
        targetValues[key] = (startValues[key] / startTime) * todayTime;

        let time = 3000;
        let nSteps = time / 10;

        steps[key] = targetValues[key] / nSteps;
      }

      let countUp = () => {
        let rdy = 0;

        for (let key in this.counter) {
          if (this.counter[key] < targetValues[key]) {
            this.counter[key] += Math.ceil(steps[key]);
          } else {
            rdy++;
          }
        }

        if (rdy != 4) {
          setTimeout(countUp, 10);
        }
      };

      countUp();

      this.counterInitialized = true;
    },
  },
  signIn() {
    this.$helpers.LogEvent(this, "AttemptSignIn");
    location.href = this.$api.getSignInUrl(window.location.origin);
  },
};

/* Tesimonial slider
export default {
  mounted() {
    let slideIndex = 0;
    showTestimonials();

    function showTestimonials() {
      let i;
      let slides = document.getElementsByClassName("slides");
      let dots = document.getElementsByClassName("dot");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
      setTimeout(showTestimonials, 5000);
    }
  },
}; */
</script>

<style lang="scss" scoped>
// Slide-up animation
.section {
  transform: translateY(0);
  transition: all 0.5s;
}

.slideup {
  transform: translateY(-40px);
} //

// Mobile nav
input#toggle,
ul.mobile-navigation {
  display: none;
  pointer-events: none;
}

.mobile-nav-inner-wrapper {
  transform: translateY(-288px);
  transition-duration: 0.5s;
} // Mobile nav end

$offwhite: #fbfbfb;
$orange: #ff4800;
$grey: #dedede;
$darkgrey: #313131;
$greyblack: #202020;

a {
  font-family: "Open Sans", sans-serif;
}

h1,
h2,
h3 {
  font-family: "Open Sans Condensed", sans-serif;
  font-weight: 700;
}

h1 {
  font-size: 2.5rem;
  margin: 0 0 0.4rem 0;
  color: $offwhite;
}

h2 {
  font-size: 1.5rem;
  margin: 0.2rem 0;
  color: $orange;
}

h3 {
  font-size: 1.7rem;
  margin: 0;
  color: $offwhite;
}

h4 {
  font-family: "Teko", sans-serif;
  font-size: 5rem;
  font-weight: 300;
  line-height: 0.8;
  margin: 4px 0 0 0;
  color: $offwhite;
}

h5 {
  font-family: "Open Sans", sans-serif;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.3;
  margin: 20px;
  color: $grey;
}

.subtitle {
  margin: 0 0 1px 0;
  font-family: "Open Sans", sans-serif;
  color: $grey;
}

.slide-text {
  font-size: 1.5rem;
}

h6 {
  font-family: "Open Sans", sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0 0 40px 0;
  color: $orange;
}

p {
  font-family: "Open Sans", sans-serif;
  font-size: 1.1rem;
  font-weight: 300;
  margin: 0;
  color: $grey;
}

p.small {
  font-family: "Open Sans", sans-serif;
  font-size: 0.9rem;
  color: $offwhite;
}

p.icon-text {
  font-family: "Open Sans Condensed", sans-serif;
  font-size: 1.2rem;
  font-weight: 100;
  margin: 0;
  color: $offwhite;
}

.full-width-container {
  position: relative;
  margin: 0 auto;

  header {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0;
    border: none;

    .container-fixed-width {
      position: absolute;
      width: 100%;
      max-width: 1185px;
      height: 100%;

      .container-margin {
        height: 100%;
        margin: 0 30px;

        .container-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;

          border: 1px solid yellow;
          height: 60px;

          .mentor-logo {
            max-width: 150px;
            height: auto;
            display: flex;
            align-self: center;
          }

          ul {
            min-width: 230px;
            height: fit-content;
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: -3px 0 0 0;

            border: 1px solid yellow;

            li {
              display: inline-block;
              position: relative;
            }

            a {
              font-size: 0.9rem;
              font-weight: 500;
              text-decoration: none;
              width: fit-content;
              color: $offwhite;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;

              &:after {
                content: "";
                position: absolute;
                width: 0;
                height: 2px;
                top: 15px;
                right: 0;
                background: $orange;
                transition: width 0.3s ease;
              }

              &:hover:after {
                width: 100%;
                left: 0;
                background: $orange;
              }
            }

            .material-icons {
              font-size: 1rem;
              margin: 0 0 0 3px;
              color: $orange;
            }
          }
        }

        .hero-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          margin-top: -57px;
        }
      }
    }
  }

  video {
    width: 100%;
    height: 100%;
    top: 0;
    object-fit: cover;
  }

  .hero-wrapper-inner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 300px;
    margin: 0 0 55px 0;
  }

  .hero-title {
    max-width: 610px;
    margin-bottom: 15px;
  }

  .button-wrapper {
    display: flex;
    flex-direction: row;
  }

  .button {
    font-size: 0.9rem;
    width: 250px;
    height: 50px;
    font-family: "Open Sans", sans-serif;
    background-color: $orange;
    border: none;
    color: $offwhite;
    margin: 0 14px 0 0;
    padding: 0;
    text-align: center;
    text-decoration: none;
    cursor: pointer;

    &.transparent {
      background-color: transparent;
      border: 2px solid $orange;
    }
  }

  .signup {
    margin: 0;
  }

  .counter-wrapper {
    position: absolute;
    width: 100%;
    margin-top: -100px;
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;

    .counter {
      min-width: 225px;
      height: 300px;
      margin: 0 8px 0 8px;
      background-color: $darkgrey;

      .counter-icon-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .counter-main-icon {
          width: 130px;
          height: auto;
          margin-left: 10px;
        }

        .counter-icon {
          width: 130px;
          height: auto;
        }
      }

      .counter-text {
        margin: 30px 0 0 0;
        text-align: center;
      }
    }

    .cut {
      clip-path: polygon(
        0% 0%,
        0% 0%,
        100% 0%,
        100% 0%,
        100% 80%,
        75% 100%,
        0% 100%,
        0% 100%
      );
    }
  }

  @mixin feature-background {
    position: relative;
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    display: flex;
  }

  .feature-01-background {
    display: flex;
    background-color: $greyblack;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 6vw));

    .container-feature-fixed-width-first {
      @include feature-background;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 300px;
    }
  }

  .feature-02-background {
    display: flex;
    position: relative;
    background-image: linear-gradient(
      to left bottom,
      #292b38,
      #292a37,
      #292a36,
      #282936,
      #282935,
      #272833,
      #262632,
      #252530,
      #23232d,
      #21212a,
      #1f1f28,
      #1d1d25
    );
    clip-path: polygon(0 0, 100% 6vw, 100% calc(100% - 6vw), 0 100%);
    margin-top: -6vw;
  }

  .feature-03-background {
    display: flex;
    position: relative;
    background-color: $greyblack;
    clip-path: polygon(0 6vw, 100% 0, 100% 100%, 0 calc(100% - 6vw));
    margin-top: -16vw; //
  }

  .feature-04-background {
    display: flex;
    position: relative;
    background-image: linear-gradient(
      to left bottom,
      #292b38,
      #292a37,
      #292a36,
      #282936,
      #282935,
      #272833,
      #262632,
      #252530,
      #23232d,
      #21212a,
      #1f1f28,
      #1d1d25
    );
    clip-path: polygon(0 0, 100% 6vw, 100% 100%, 0 100%);
    margin-top: -18vw; //

    margin-bottom: -50px; // For Slide-up animation
  }

  .container-feature-fixed-width-second {
    @include feature-background;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 50px;
    margin-top: 170px;
  }

  .container-feature-fixed-width-third {
    @include feature-background;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 100px;
    margin-top: 170px;
  }

  .container-feature-fixed-width-fourth {
    @include feature-background;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 135px;
    margin-top: 170px;
  }

  .container-feature-margin-left {
    position: relative;
    height: fit-content;
    margin: 50px 30px 0 30px;
    flex: none;
  }

  .container-feature-margin-right {
    position: relative;
    height: fit-content;
    margin: 50px 30px 0 30px;
    flex: none;
    text-align: right;
  }

  .container-feature-image {
    height: fit-content;
    margin: 10px 30px 0 30px;

    .feature-image {
      width: 100%;
      mix-blend-mode: lighten;
    }
  }

  .howitworks-wrapper {
    position: relative;
    width: 100%;
    background-color: $darkgrey;
    display: flex;
    justify-content: center;
    align-items: center;

    .howitworks-wrapper-inner {
      width: 100%;
      max-width: 1000px;
      min-height: 350px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin: 0 30px;

      .howitworks-number-wrapper {
        min-width: 80px;
        max-width: 100px;
        height: 214px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;

        .howitworks-number {
          width: auto;
          height: 55px;
        }
      }

      .howitworks-icon-wrapper {
        height: 100%;
        width: min-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: baseline;

        &:first-child {
          height: 214px;
        }

        .howitworks-main-text {
          width: 164px;
          margin-top: 7px;
          text-align: center;
        }

        .underline {
          border-bottom: 4px solid $orange;
          height: 46px;
        }

        .howitworks-icon {
          width: auto;
          height: 125px;

          &.main-icon {
            height: 140px;
          }
        }

        .howitworks-text {
          width: 150px;
          margin-top: 8px;
          text-align: center;
        }
      }
    }
  }

  .bottom-section {
    position: relative;
    width: 100%;
    height: 1300px;
    background-image: linear-gradient(
      to right bottom,
      #292b38,
      #292a37,
      #292a36,
      #282936,
      #282935,
      #272833,
      #262632,
      #252530,
      #23232d,
      #21212a,
      #1f1f28,
      #1d1d25
    );
    display: flex;
    flex-direction: column;
    align-items: center;

    .container-fixed-width-bottom {
      position: absolute;
      width: 100%;
      max-width: 1300px;
      height: 100%;

      .container-margin-bottom {
        height: 100%;
        margin: 0 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .video-wrapper {
          margin: 0;

          .video-container {
            position: relative;
            max-width: 1000px;
            height: 0;
            margin: 0 auto;
            padding-bottom: 56.25%;

            iframe {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
          }
        }

        /* Testimonials slider...
        
        .slideshow-container {
          position: relative;
          height: 200px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .slides {
            max-width: 1000px;
            text-align: center;

            .quote {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 170px;
              max-width: 800px;
            }
          }
        } */
      }
    }
  }

  /* Testimonials slider...
  
  .fade {
    animation-name: fade;
    animation-duration: 2s;

    @keyframes fade {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  .dot-wrapper {
    width: 100px;
    display: flex;
    justify-content: space-evenly;
  }

  .dot {
    height: 8px;
    width: 8px;
    background-color: $grey;
    border-radius: 50%;
    transition: background-color 0.6s ease;
  }

  .active {
    background-color: $orange;
  } */

  .bottom-cta {
    position: relative;
    height: 165px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .mail-wrapper {
    position: relative;
    height: fit-content;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    display: none; // Delete for showing
  }

  .mail-wrapper-inner {
    width: 100%;
    max-width: 1000px;
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .mail-icon {
      font-size: 1.2rem;
      margin: 0 7px 1px 0;
      color: $grey;
    }

    .mail-text {
      max-width: 400px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-right: 10px;
    }

    .mail-input {
      display: flex;
      height: 50px;
    }

    input[type="email"] {
      width: 325px;
      height: 50px;
      text-align: left;
      font-size: 0.9rem;
      padding: 0 5px 0 39px;
      opacity: 1;
      color: $grey;
      background-color: $greyblack;
      border: none;
      outline: none;
    }
  }
}

@media (min-width: 1800px) {
  h5 {
    font-size: 2rem;
  }

  .full-width-container {
    .hero-wrapper-inner {
      height: 360px;
      margin: 0;
    }

    .title-large {
      max-width: 780px;
      margin-bottom: 20px;
    }
  }
}

@media (max-width: 1200px) {
  h5 {
    font-size: 1.3rem;
  }

  .full-width-container {
    .hero-wrapper-inner {
      height: 230px;
    }

    .hero-title {
      max-width: 500px;
      margin-bottom: 10px;
    }

    .container-feature-fixed-width-second {
      margin-top: 130px;
      margin-bottom: 20px;
    }

    .container-feature-fixed-width-third {
      margin-top: 130px;
      margin-bottom: 100px;
    }

    .container-feature-fixed-width-fourth {
      margin-top: 160px;
      margin-bottom: 135px;
    }

    .bottom-section {
      height: 1200px;
    }

    .bottom-cta {
      height: 150px;
    }
  }
}

@media (max-width: 1000px) {
  h3 {
    font-size: 1.4rem;
  }

  h5 {
    font-size: 1.2rem;
  }

  p.icon-text {
    font-size: 1rem;
  }

  .full-width-container {
    .hero-wrapper-inner {
      height: 280px;
      margin: 30px 0 0 0;
    }

    .hero-title {
      max-width: 430px;
    }

    .button-wrapper {
      flex-direction: column;
    }

    .button {
      margin: 0 14px 14px 0;

      &.cta,
      &.signup {
        margin: 0;
      }
    }

    .counter-wrapper {
      display: none;
    }

    .feature-01-background {
      .container-feature-fixed-width-first {
        margin-top: 50px;
      }
    }

    .container-feature-fixed-width-second {
      margin-top: 90px;
    }

    .container-feature-fixed-width-third {
      margin-top: 90px;
    }

    .container-feature-fixed-width-fourth {
      margin-top: 90px;
    }

    .howitworks-wrapper {
      .howitworks-wrapper-inner {
        .howitworks-number-wrapper {
          .howitworks-number {
            height: 50px;
          }
        }

        .howitworks-icon-wrapper {
          &:first-child {
          }

          .howitworks-main-text {
            width: 135px;
            margin-top: 10px;
          }

          .underline {
            height: 39px;
          }

          .howitworks-icon {
            height: 100px;

            &.main-icon {
              height: 128px;
            }
          }

          .howitworks-text {
            width: 120px;
            margin-top: 8px;
          }
        }
      }
    }

    .bottom-section {
      height: 1000px; // Set higher when mail wrapper visible
    }

    .bottom-cta {
      height: 135px;
    }

    .mail-wrapper {
      position: relative;
      height: fit-content;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      display: none; // Delete for showing
    }

    .mail-wrapper-inner {
      justify-content: center;
    }
  }
}

@media (max-width: 860px) {
  h1 {
    font-size: 2.3rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.3rem;
  }

  h5 {
    font-size: 1rem;
  }

  p {
    font-size: 1rem;
  }

  .full-width-container {
    header {
      .container-fixed-width {
        .container-margin {
          .hero-wrapper {
            justify-content: center;
          }
        }
      }
    }

    .hero-wrapper-inner {
      height: 240px;
      margin: 30px 0 0 0;
    }

    .hero-title {
      max-width: 330px;
      margin-bottom: 5px;
    }

    .feature-01-background {
      .container-feature-fixed-width-first {
        flex-direction: column;
        margin-top: 40px;
      }
    }

    .container-feature-fixed-width-second {
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 0;

      &.reverse {
        flex-direction: column-reverse;
        justify-content: flex-end;
      }
    }

    .container-feature-fixed-width-third {
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 0;

      &.reverse {
        flex-direction: column-reverse;
        justify-content: flex-end;
      }
    }

    .container-feature-fixed-width-fourth {
      margin-bottom: 84px; // Adjust when mail wrapper visible
      &.reverse {
        flex-direction: column-reverse;
        justify-content: flex-end;
      }
    }

    .container-feature-margin-left {
      margin: 15px 30px 0 30px;
    }

    .container-feature-margin-right {
      margin: 15px 30px 0 30px;
    }

    .container-feature-image {
      margin: 30px 30px 0 30px;

      .feature-image {
      }
    }

    .howitworks-wrapper {
      .howitworks-wrapper-inner {
        margin: 30px;

        .howitworks-number-wrapper {
          display: none;
          .howitworks-number {
          }
        }

        .howitworks-icon-wrapper {
          margin: 20px 30px;

          &:first-child {
            height: fit-content;
            flex: 1 100%;
          }

          .howitworks-main-text {
            width: 126px;
            margin-top: 10px;
          }

          .underline {
            height: 38px;
          }

          .howitworks-icon {
            width: auto;
            height: 100px;

            &.main-icon {
              height: 128px;
            }
          }

          .howitworks-text {
            width: 120px;
            margin-top: 8px;
            text-align: center;
          }
        }
      }
    }

    .bottom-section {
      height: 730px; // Set to 1000px when mail wrapper visible
    }

    .bottom-cta {
      height: 115px;
    }
  }
}

@media (max-width: 660px) {
  // Mobile nav
  .mobile-nav-wrapper {
    display: flex;
    flex-direction: column;
    position: absolute;
    min-width: 100vw;
    max-height: 233px;
    top: 0;
    right: 0;

    label.toggle {
      display: block;
      width: 25px;
      height: 25px;
      position: relative;
      z-index: 99999;
      align-self: flex-end;
      margin: 15px;
    }

    .line {
      position: absolute;
      height: 3px;
      width: 25px;
      background: $offwhite;
      border-radius: 0px;
      display: block;
      transition: 0.2s;
      transform-origin: center;
    }

    .line:nth-child(1) {
      top: 11px;
      transform: rotate(90deg);
    }
    .line:nth-child(2) {
      top: 11px;
    }

    #toggle:checked + .toggle .line:nth-child(1) {
      transform: translateY(0) rotate(-45deg);
    }

    #toggle:checked + .toggle .line:nth-child(2) {
      transform: translateY(0) rotate(45deg);
    }

    #toggle:checked ~ .mobile-nav-inner-wrapper {
      transform: translateY(-55px);
    }

    .mobile-nav-inner-wrapper {
      top: 0;
      right: 0;
      ul.mobile-navigation {
        height: 233px;
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 25px 0 0 0;
        padding: 0;
        background-color: #313131;

        pointer-events: auto;

        a {
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          margin: 15px 0;
          width: fit-content;
          height: fit-content;
          color: $offwhite;
        }

        .material-icons {
        }
      }
    }
  } // Mobile nav end

  p.small {
    font-size: 0.8rem;
  }

  .full-width-container {
    header {
      .container-fixed-width {
        .container-margin {
          .container-nav {
            .mentor-logo {
              max-width: 130px;
              margin: 15px 0 0 0;
            }

            ul {
              display: none;
              a {
                display: none;
              }

              .material-icons {
                display: none;
              }
            }
          }

          .hero-wrapper {
            justify-content: center;
            margin-top: -57px;
          }
        }
      }
    }

    .hero-wrapper-inner {
      justify-content: center;
      height: 110px;
      margin: 70px 0 0 0;
    }

    .hero-title {
      &.title-small {
        min-width: 100%;
        min-height: 30px;
      }
    }

    .howitworks-wrapper {
      .howitworks-wrapper-inner {
        margin: 20px;
        .howitworks-number-wrapper {
          .howitworks-number {
          }
        }

        .howitworks-icon-wrapper {
          flex: 1 100%;
          &:first-child {
            margin: 15px 30px 20px 30px;
          }

          .howitworks-main-text {
            width: 125px;
          }

          .underline {
            border-bottom: 3px solid $orange;
            height: 36px;
          }

          .howitworks-icon {
            &.main-icon {
              height: 110px;
            }
          }

          .howitworks-text {
          }
        }
      }
    }

    .button-wrapper {
      display: none;
    }

    .feature-01-background {
      .container-feature-fixed-width-first {
        margin-top: 30px;
      }
    }

    .container-feature-fixed-width-second {
      margin-top: 70px;
    }

    .container-feature-fixed-width-third {
      margin-top: 70px;
    }

    .container-feature-fixed-width-fourth {
      margin-top: 70px;
      margin-bottom: 80px; // Set higher when mail wrapper visible
    }

    .bottom-section {
      height: 600px; // Set to 900px when mail wrapper visible
    }

    .bottom-cta {
      height: 95px;
      max-width: 250px;
      margin: 0 auto;
    }

    .mail-wrapper {
      position: relative;
      height: auto;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      display: none; // Delete for showing
    }

    .mail-wrapper-inner {
      justify-content: center;

      .mail-icon {
        font-size: 1.2rem;
        margin: 0 7px 1px 0;
        color: $grey;
      }

      .mail-text {
        padding-right: 0;
        height: 45px;
      }

      .mail-input {
        flex-wrap: wrap;
        height: fit-content;
        justify-content: center;
      }

      input[type="email"] {
        width: 250px;
        text-align: center;
        padding: 0 5px 0 5px;
      }
    }
  }
}

@media (max-width: 510px) {
  h1 {
    font-size: 1.5rem;
    margin: 0 0 0.3rem 0;
  }

  h2 {
    font-size: 0.9rem;
    margin: 0.15rem 0 0 0;
  }

  h3 {
    font-size: 1.1rem;
  }

  h5 {
    font-size: 0.858rem;

    &.subtitle {
      text-align: center;
    }
  }

  p {
    font-size: 0.9rem;
  }

  p.icon-text {
    font-size: 1rem;
  }

  .full-width-container {
    header {
      .container-fixed-width {
        .container-margin {
          .container-nav {
            .mentor-logo {
              max-width: 100px;
            }
          }
          .hero-wrapper {
          }
        }
      }
    }

    .hero-wrapper-inner {
      text-align: center;
      height: 110px;
      margin: 85px 0 0 0;
    }

    .hero-title {
      min-width: 250px;
    }

    .feature-01-background {
      .container-feature-fixed-width-first {
        margin-top: 10px;
      }
    }

    .container-feature-fixed-width-second {
      margin-top: 26px;

      &.reverse {
      }
    }

    .container-feature-fixed-width-third {
      margin-top: 26px;

      &.reverse {
      }
    }

    .container-feature-fixed-width-fourth {
      margin-top: 26px;
      margin-bottom: 63px;

      &.reverse {
        flex-direction: column-reverse;
        justify-content: flex-end;
      }
    }

    .howitworks-wrapper {
      .howitworks-wrapper-inner {
        .howitworks-number-wrapper {
          .howitworks-number {
          }
        }

        .howitworks-icon-wrapper {
          margin: 15px 30px;
          &:first-child {
          }

          .howitworks-main-text {
            width: 108px;
          }

          .underline {
            height: 32px;
          }

          .howitworks-icon {
            &.main-icon {
            }
          }

          .howitworks-text {
          }
        }
      }
    }

    .bottom-section {
      height: 500px; // Set to 700px when mail wrapper visible
    }

    .mail-wrapper {
    }

    .mail-wrapper-inner {
      justify-content: center;

      .mail-icon {
        font-size: 1.1rem;
        margin: 0 7px -1px 0;
      }

      .mail-text {
        padding-right: 0;
      }

      .mail-input {
        flex-wrap: wrap;
        height: fit-content;
      }

      input[type="email"] {
        width: 250px;
        text-align: center;
        padding: 0 5px 0 5px;
      }
    }
  }
}

@media (max-width: 380px) {
  // Slide-up animation
  .section {
    transform: translateY(0);
    transition: all 0.5s;
  }

  .slideup {
    transform: translateY(-30px);
  } //
}

@media (max-width: 280px) {
  // Slide-up animation
  .section {
    transform: translateY(0);
    transition: all 0.5s;
  }

  .slideup {
    transform: translateY(-25px);
  } //

  h5 {
    font-size: 0.7rem;
  }

  p {
    font-size: 0.8rem;
  }

  p.small {
    font-size: 0.7rem;
  }

  .full-width-container {
    .hero-wrapper-inner {
    }

    .hero-title {
      min-width: 100%;
      margin-bottom: 2px;
    }

    .bottom-section {
      height: 430px;
      .container-fixed-width-bottom {
        .container-margin-bottom {
          margin: 0 15px;
          .video-wrapper {
            .video-container {
              iframe {
              }
            }
          }
        }
      }
    }

    .mail-wrapper-inner {
      .mail-text {
        height: 35px;
      }
    }
  }
}
</style>
