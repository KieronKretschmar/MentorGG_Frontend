<template>
  <div class="misplays">
    <div class="bordered-box">
      <p>Your recent misplays</p>
    </div>

    <!-- <div v-if="!loadingComplete">
      <div class="bordered-box no-misplays">
        <AjaxLoader>Computing your recent misplays</AjaxLoader>
      </div>
    </div> -->

    <span>
      <div v-if="loadingComplete && !misplays.length" class="bordered-box no-misplays">        
        <NoDataAvailableDisplay @buttonClicked="LoadData(true)">
          You have no matches played with your steam-friends in the database :(. Wanna see somebody else's shitty ass random stats? 
          </NoDataAvailableDisplay>
      </div>
<!-- 
      <div
        v-else
        v-for="misplay in misplays"
        :key="misplay.OtherSteamId"
        class="misplay bordered-box"
      > -->
      <div class="misplay bordered-box">
        <div class="header">
          <div class="left">
            <span class="misplay-title">{{ "Unnecessary Reload" }}</span>
            
            <div class="misplay-explanation">
              It's a bad habit to reload your gun when you're not completely safe and still have many bullets left in the current mag. 
              Stop that shit. 
              If you <i>really</i> depend on having more than 20 bullets to kill somebody, go practice tapping and bursting on an aim map. 
            </div>
          </div>
          <!-- <hr /> -->
          <div class="right">
            <button
              class="button-variant-bordered"
              @click="ToggleMisplayVisibility(1)"
            >Show 12 Occurrences</button>
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
                17
              </div>
              <div class="col centered">
                00:33
              </div>
              <div class="col centered">
                AK47 with 23/30 bullets
              </div>
              <div class="col centered">
                <i class="material-icons watch-match-icon" title="Watch in Browser" @click="Watch(selectedSample.MatchId, selectedSample.Round)">videocam</i>
              </div>
            </div>

            

            <div class="row">
              <div class="col">
                <div class="map-and-datetime"><span class="map">de_mirage</span><span class="datetime">24.8.2019, 15:32:1127</span></div>
              </div>
              <div class="col centered">
                14
              </div>
              <div class="col centered">
                01:22
              </div>
              <div class="col centered">
                glock with 18/20 bullets
              </div>
              <div class="col centered">
                <i class="material-icons watch-match-icon" title="Watch in Browser" @click="Watch(selectedSample.MatchId, selectedSample.Round)">videocam</i>
              </div>
            </div>

          </div>
        </transition>
      </div>
      <div class="misplay bordered-box">
        <div class="header">
          <div class="left">
            <span class="misplay-title">{{ "Weird Bombplant" }}</span>
            
            <div class="misplay-explanation">
              Each bombsite offers different positions to plant the bomb. 
              Which position is best depends on how much map control and time you have. 
              On each bombsite, there are a few well-known spots that offer protection from some angles when planting, while making it easy to interrupt defusing CTs.
              Another advantage of your teammates knowing the exact location of the bomb, is that it's easier to kill CTs defusing within a smoke.
            </div>
          </div>
          <!-- <hr /> -->
          <div class="right">
            <button
              class="button-variant-bordered"
              @click="ToggleMisplayVisibility(1)"
            >Show 3 Occurrences</button>
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
    </span>
  </div>
</template>

<script>

export default {
  mounted() {
    this.LoadData(false);
  },
  data() {
    return {
      misplays: [1],
      loadingComplete: true,
    };
  },
  methods: {
    LoadData: function(isDemo) {
      this.loadingComplete = false;
      this.$api.getMisplays(isDemo ? "76561198033880857" : "").then(result => {
        this.misplays = result.data.Rows;
        this.misplays.forEach(misplay => {
          misplay.WinRate =
            (misplay.MatchesWon / misplay.MatchesPlayed) *
            100;

          misplay.MapWinRate =
            (misplay.MostPlayedMapMatchesWon /
              misplay.MostPlayedMapMatchesPlayed) *
            100;

          misplay.IsVisible = false;
        });
        this.loadingComplete = true;
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        this.loadingComplete = true;
      });
    },
    ToggleMisplayVisibility: function(misplay) {
      misplay.IsVisible = !misplay.IsVisible;
      this.$forceUpdate();
    },
  }
};
</script>

<style lang="scss">
.misplays {
  margin-bottom: 20px;

  p {
    color: white;
    font-weight: 500;
  }

  .no-misplays {
    margin-top: 10px;
  }

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

}
</style>