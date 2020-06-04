<template>
  <div>
    <div class="demo-feedback-wrapper">
      <div class="nav-header-2">ANALYZING MATCHES</div>

      <div class="demo-feedback">
        <div class="demo-text" v-if="dailyLimitReached === false">
          <span class="orange-bold">{{queueStatus.MatchesInQueue}}</span>
          in queue
          <div class="demo-element" v-if="queueStatus.MatchesInQueue !== 0">
            (pos.
            <span class="orange-bold">{{queueStatus.FirstDemoPosition + 1}}</span>
            / {{queueStatus.QueueLength}})
            <div class="spinner">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </div>
          </div>
        </div>

        <div class="demo-text-bold scrolling-text" v-if="dailyLimitReached === true">
          DAILY LIMIT REACHED FOR TODAY.
          YOUR NEXT {{this.$api.User.dailyUploadLimit}} MATCHES PLAYED AFTER {{this.$api.MatchSelector.dailyLimitEnds | formatDateAndTime}} WILL BE AVAILABLE AGAIN.
          UPGRADE FOR UNLIMITED DAILY MATCHES.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  components: {},
  data() {
    return {
      queueStatus: {
        MatchesInQueue: 0,
        FirstDemoPosition: -1,
        QueueLength: 0
      },
      dailyLimitReached: false,
      loadingComplete: false
    };
  },
  mounted() {
    this.ContinueRefreshingQueueStatus();
  },
  props: [],
  methods: {
    // Regularly refreshes the QueueStatus data. Shorter intervals if matches are in queue
    ContinueRefreshingQueueStatus: function() {
      const defaultRefreshInterval = 60000;
      const shortRefreshInterval = 15000;

      // Call api ignoring overrides
      this.$api
        .getMatchesInQueue(this.$api.User.GetSteamId(false))
        .then(response => {
          this.queueStatus = {
            QueueLength: response.data.TotalQueueLength,
            MatchesInQueue: response.data.MatchIds.length,
            FirstDemoPosition: response.data.FirstDemoPosition
          };

          // Plan next refresh. Do it quicker if matches were found in queue
          // TODO: if request fails, setTimeout will never get called again and thus queue status updates are dismissed until the user reloads the app
          let delay =
            this.queueStatus.QueueLength > 0
              ? shortRefreshInterval
              : defaultRefreshInterval;
          setTimeout(() => {
            this.ContinueRefreshingQueueStatus();
          }, delay);
        });

      this.dailyLimitReached = this.$api.MatchSelector.dailyLimitReached;
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
// demo upload feedback
.demo-feedback-wrapper {
  position: absolute;
  width: 100%;
  height: 57px;
  bottom: 0;
  margin-bottom: 62px;
  z-index: -1;

  .demo-feedback {
    width: 280px;
    height: 35px;
    background-color: $dark-3;
    border: 1px solid $purple;
    border-radius: 4px;
    overflow: hidden;
    margin: 0 auto;
  }

  .demo-element {
    display: inline-block;
  }

  .nav-header-2 {
    font-family: Montserrat, sans-serif;
    font-weight: 600;
    font-size: 12px;
    width: 100%;
    text-align: center;
    color: $orange;
    padding-bottom: 5px;
  }

  .demo-text {
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 14px;
    color: $light-1;
    text-align: center;
    padding-top: 8px;

    .demo-text-bold {
      font-weight: 500;
      font-size: 13px;
      line-height: 1.4;
    }
  }

  .orange-bold {
    font-weight: 400;
    color: $orange;
  }

  // Scrolling text
  .scrolling-text {
    width: max-content;
    /* Starting position */
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
    /* Animation */
    -moz-animation: example1 15s linear infinite;
    -webkit-animation: example1 15s linear infinite;
    animation: example1 15s linear infinite;
  }
  /* Movement */
  @-moz-keyframes example1 {
    0% {
      -moz-transform: translateX(100%);
    }
    100% {
      -moz-transform: translateX(-100%);
    }
  }
  @-webkit-keyframes example1 {
    0% {
      -webkit-transform: translateX(100%);
    }
    100% {
      -webkit-transform: translateX(-100%);
    }
  }
  @keyframes example1 {
    0% {
      -moz-transform: translateX(100%); /* Firefox bug fix */
      -webkit-transform: translateX(100%); /* Firefox bug fix */
      transform: translateX(100%);
    }
    100% {
      -moz-transform: translateX(-100%); /* Firefox bug fix */
      -webkit-transform: translateX(-100%); /* Firefox bug fix */
      transform: translateX(-100%);
    }
  }

  // CSS loader
  .spinner {
    margin: 100px auto 0;
    text-align: center;
    display: inline;
    padding-left: 10px;
  }

  .spinner > div {
    width: 8px;
    height: 8px;
    background-color: $light-1;
    border-radius: 100%;
    display: inline-block;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    animation-delay: -0.16s;
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
}

//responsive
@media (max-width: 400px) {
  .demo-feedback-wrapper {
    .demo-feedback {
      width: 230px;
    }
  }
}
</style>