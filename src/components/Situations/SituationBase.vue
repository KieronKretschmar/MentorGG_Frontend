<template>
  <div class="misplay bordered-box">
    <div class="header">
      <div class="left">
        <span class="misplay-title">TITLE</span>
        
        <div class="misplay-explanation">
          EXPLANATION
        </div>
      </div>
      <!-- <hr /> -->
      <div class="right">
        <button
          class="button-variant-bordered"
          @click="ToggleMisplayVisibility(1)"
        >Show {{situationCollection.length}} Occurrences</button>
      </div>
    </div>
    
    <transition name="slide">
      <div class="body" v-if="true">
        <hr />
        <div class="row">
          <div class="col">
            Match
          </div>
          <div class="col centered">
            Round
          </div>
          <div class="col centered">
            Round time
          </div>
          <div class="col centered">
            Details
          </div>
          <div class="col centered">
            Watch Misplay
          </div>
        </div>

        <div class="row">
          <div class="col">
            <div class="map-and-datetime"><span class="map">de_inferno</span><span class="datetime">24.8.2019, 12:34:27</span></div>
          </div>
          <div class="col centered">
            12
          </div>
          <div class="col centered">
            00:51
          </div>
          <div class="col centered">
            Bomb defused while 2 teammates were alive.
          </div>
          <div class="col centered">
            <i class="material-icons watch-match-icon" title="Watch in Browser" @click="Watch(selectedSample.MatchId, selectedSample.Round)">videocam</i>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: [
    "situationCollection"
  ],

  data() {
    return {
      "isVisible" : false,
    }
  },
  
  methods: {
    ToggleMisplayVisibility: function(misplay) {
      this.IsVisible = !this.IsVisible;
      this.$forceUpdate();
    },
  }
}
</script>

<style lang="scss">

.misplay {
  border-bottom: 1px solid $purple;
  margin-top: 10px;

  .header {
    display: flex;
    color: white;
    font-size: 14px;
    font-weight: 500;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
      width: 80%;

      .misplay-title {
        width: 20%;
        margin-left: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      
      .misplay-explanation {
        font-weight: 200;
        width: 70%;
        margin-left: 20px;
        // white-space: nowrap;
        // overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .right {
      display: flex;
      align-items: center;
    }
  }

  .body {
    hr {
      border: 1px solid $purple;
      border-bottom: none;
      margin: 15px 0;
    }

    .subtitle{        
      color: $orange;
      text-transform: uppercase;
      font-size: 12px;
    }

    .row {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid $purple;

      &:first-child,
      &:last-child {
        border-bottom: none;
      }        

      &:first-of-type {
        .col {
          color: $orange;
          text-transform: uppercase;
          font-size: 12px;
        }
      }
      
      .col {
        color: white;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        
        &.centered {
          justify-content: center;
        }

        img {
          margin-right: 5px;
        }
        width:(1/5)*100%;

        .map-thumbnail {
        height: 55px;
        width: 135px;
        border-radius: 5px;
        overflow: hidden;
        border-left-style: solid;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .map-and-datetime {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          // padding: 0 25px;
          // border-right: 1px solid $purple;

          .map {
            color: white;
            font-size: 16px;
            font-weight: 500;
          }

          .datetime {
            font-size: 12px;
            color: $dark-4;
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>