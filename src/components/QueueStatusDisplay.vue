<template>
  <div>
    <div class="demo-feedback-wrapper">
      <div class="nav-header-2">ANALYZING MATCHES</div>

      <div class="demo-feedback">

        <div class="demo-text" v-if="UploadLimitReached === false">
          <span class="orange-bold">{{queueStatus.MatchesInQueue}}</span>
          in queue
          <div class="demo-element" v-if="queueStatus.MatchesInQueue !== 0">
            (pos.
            <span class="orange-bold">{{queueStatus.FirstMatchPosition}}</span>
            / {{queueStatus.QueueLength}})
            <div class="spinner">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </div>
          </div>
        </div>

        <div class="demo-text-bold" v-if="UploadLimitReached === true">UPLOAD LIMIT REACHED</div>
        
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      queueStatus: {
        MatchesInQueue: 1,
        FirstMatchPosition: 7,
        QueueLength: 1000
      },
      UploadLimitReached: true,
      loadingComplete: true
    };
  },
  mounted() {
    // TODO: Load queue status
    // TODO: Load data regularly
  },
  props: [],
  methods: {
    LoadQueueStatus: function() {
      // TODO call api
    }
  }
};
</script>

<style lang="scss" scoped>
// demo upload feedback
.demo-feedback-wrapper {
  width: 282px;
  height: 57px;
  position: relative;
  margin: 0 auto;
  margin-bottom: 35px;
}

.demo-feedback {
  width: 280px;
  height: 35px;
  background-color: $dark-3;
  border: 1px solid $purple;
  border-radius: 4px;
  position: absolute;
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
}

.demo-text-bold {
  @extend .demo-text;
  font-weight: 500;
  font-size: 13px;
  line-height: 1.4;
}

.orange-bold {
  font-weight: 400;
  color: $orange;
}

// css loader
.spinner {
  margin: 100px auto 0;
  width: 70px;
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
</style>