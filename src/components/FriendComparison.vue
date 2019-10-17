<template>
  <div class="friend-comparison">
    <div class="bordered-box">
      <p>Performance when playing with friends</p>
    </div>

    <div v-if="!loadingComplete">
      <div class="bordered-box no-comparisons">
        <AjaxLoader>Computing Friend Comparisons</AjaxLoader>
      </div>
    </div>

    <span>
      <div v-if="loadingComplete && !comparisons.length" class="bordered-box no-comparisons">
        <DemoDataLoadRequest @buttonClicked="LoadData(true)">
          You have no matches played with your steam-friends in the database :(
          <br />Wanna see somebody else's shitty ass random stats?
        </DemoDataLoadRequest>
      </div>

      <div
        v-else
        v-for="comparison in comparisons"
        :key="comparison.OtherSteamId"
        class="comparison bordered-box"
      >
        <div class="header">
          <div class="left">
            <span class="avatar-name-wrapper">
              <img class="avatar" :src="comparison.OtherPlayerInfo.Icon" />
              <span class="name">{{ comparison.OtherPlayerInfo.SteamName }}</span>
            </span>
            <span class="winrate" :class="{good: comparison.MatchesWon >= comparison.MatchesLost}">
              {{ comparison.MatchesWon + " - " + comparison.MatchesTied + " - " + comparison.MatchesLost }}
              <br />
              <span>Win - Tie - Loss</span>
            </span>
            <span class="favorite-map">
              <div class="map-text">
                <span>Favorite Map</span>
                <br />
                {{ comparison.MostPlayedMap }}
              </div>
            </span>
            <div
              class="winrate"
              :class="{good: comparison.MostPlayedMapMatchesWon >= comparison.MostPlayedMapMatchesLost}"
            >
              {{ comparison.MostPlayedMapMatchesWon + " - " + comparison.MostPlayedMapMatchesTied + " - " + comparison.MostPlayedMapMatchesLost }}
              <br />
              <span>Win - Tie - Loss</span>
            </div>
          </div>
          <div class="right">
            <i
              class="fas fa-chevron-down"
              :class="{open: comparison.IsVisible}"
              @click="ToggleComparisonVisibility(comparison)"
            ></i>
          </div>
        </div>
        <transition name="slide">
          <div class="body" v-if="comparison.IsVisible">
            <hr />

            <div class="row">
              <div class="col">Who</div>
              <div class="col centered">
                <img src="@/assets/t_logo.png" /> K/D
              </div>
              <div class="col centered">
                <img src="@/assets/ct_logo.png" />K/D
              </div>
              <!-- <div class="col centered"><img src="@/assets/t_logo.png">Deaths</div>
              <div class="col centered"><img src="@/assets/ct_logo.png">Deaths</div>-->
              <div class="col centered">
                <img src="@/assets/t_logo.png" />ADR
              </div>
              <div class="col centered">
                <img src="@/assets/ct_logo.png" />ADR
              </div>
              <!-- <div class="col centered">Flashes Thrown</div> -->
              <div class="col centered">
                Enemies
                <br />Flashed
              </div>
              <div class="col centered">
                Team
                <br />Flashed
              </div>
              <!-- <div class="col centered">Firenades Thrown</div>
              <div class="col centered">HEs Thrown</div>
              <div class="col centered">Smokes Thrown</div>-->
              <div class="col centered">MVPs</div>
              <div class="col centered">Score</div>
            </div>
            <div class="row">
              <div class="col">You</div>
              <div
                class="col centered"
              >{{(comparison.UserData.TerroristKills / Math.max(1, comparison.UserData.TerroristDeaths)).toFixed(2)}}</div>
              <div
                class="col centered"
              >{{(comparison.UserData.CtKills / Math.max(1, comparison.UserData.CtDeaths)).toFixed(2)}}</div>
              <div
                class="col centered"
              >{{(comparison.UserData.TerroristDamage / Math.max(1, comparison.TerroristRounds)).toFixed(0)}}</div>
              <div
                class="col centered"
              >{{(comparison.UserData.CtDamage / Math.max(1, comparison.CtRounds)).toFixed(0)}}</div>
              <div class="col centered">{{comparison.UserData.EnemiesFlashed}}</div>
              <div class="col centered">{{comparison.UserData.TeammatesFlashed}}</div>
              <div class="col centered">{{comparison.UserData.MVPs}}</div>
              <div class="col centered">{{comparison.UserData.Score}}</div>
            </div>
            <div class="row">
              <div class="col">Friend</div>
              <div
                class="col centered"
              >{{(comparison.OtherData.TerroristKills / Math.max(1, comparison.OtherData.TerroristDeaths)).toFixed(2)}}</div>
              <div
                class="col centered"
              >{{(comparison.OtherData.CtKills / Math.max(1, comparison.OtherData.CtDeaths)).toFixed(2)}}</div>
              <div
                class="col centered"
              >{{(comparison.OtherData.TerroristDamage / Math.max(1, comparison.TerroristRounds)).toFixed(0)}}</div>
              <div
                class="col centered"
              >{{(comparison.OtherData.CtDamage / Math.max(1, comparison.CtRounds)).toFixed(0)}}</div>
              <div class="col centered">{{comparison.OtherData.EnemiesFlashed}}</div>
              <div class="col centered">{{comparison.OtherData.TeammatesFlashed}}</div>
              <div class="col centered">{{comparison.OtherData.MVPs}}</div>
              <div class="col centered">{{comparison.OtherData.Score}}</div>
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
      comparisons: [],
      loadingComplete: false
    };
  },
  methods: {
    LoadData: function(isDemo) {
      this.loadingComplete = false;
      this.$api
        .getFriendsComparison(isDemo ? "76561198033880857" : "")
        .then(result => {
          this.comparisons = result.data.Rows;
          this.comparisons.forEach(comparison => {
            comparison.WinRate =
              (comparison.MatchesWon / comparison.MatchesPlayed) * 100;

            comparison.MapWinRate =
              (comparison.MostPlayedMapMatchesWon /
                comparison.MostPlayedMapMatchesPlayed) *
              100;

            comparison.IsVisible = false;
          });
          this.loadingComplete = true;
        })
        .catch(error => {
          console.error(error); // eslint-disable-line no-console
          this.loadingComplete = true;
        });
    },
    ToggleComparisonVisibility: function(comparison) {
      comparison.IsVisible = !comparison.IsVisible;
      this.$forceUpdate();
        
      this.$ga.event({
        eventCategory: 'FriendComparison',
        eventAction: comparison.IsVisible ? 'ShowComparison' : 'HideComparison',
      });
    }
  }
};
</script>

<style lang="scss">
.friend-comparison {
  margin-bottom: 20px;

  p {
    color: white;
    font-weight: 500;
  }

  .no-comparisons {
    margin-top: 10px;
  }

  .comparison {
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

        .avatar-name-wrapper {
          flex: 0 0 15vw;
          max-width: 250px;
          display: flex;
          align-items: center;
          white-space: nowrap;
          overflow: hidden;

          .avatar {
            width: 32px;
            height: 32px;
            border-radius: 5px;
          }

          .name {
            margin-left: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .winrate {
          margin-left: 20px;
          border-left: 1px solid $purple;
          color: $red;
          flex: 0 0 160px;
          text-align: center;

          &.good {
            color: $green;
          }

          span {
            color: $purple;
            font-size: 12px;
          }
        }

        .favorite-map {
          display: flex;
          align-items: center;
          // width: 15%;
          border-left: 1px solid $purple;
          flex: 0 0 150px;

          .map-text {
            padding: 0 25px;
            color: white;

            span {
              font-size: 12px;
            }
          }
        }

        .map-winrate {
          color: $red;
          font-size: 14px;
          font-weight: 500;

          &.good {
            color: $green;
          }
        }
      }

      .right {
        display: flex;
        align-items: center;

        .fa-chevron-down {
          color: $orange;
          cursor: pointer;
          transition: 0.35s;
          font-size: 16px;

          &:hover {
            color: $purple;
          }

          &.open {
            transform: rotate(180deg);
          }
        }
      }
    }

    .body {
      hr {
        border: 1px solid $purple;
        border-bottom: none;
        margin: 15px 0;
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
          width: (1/9) * 100%;
          // &:nth-child(1) {
          //   width: 15%;
          // }

          // &:nth-child(2),
          // &:nth-child(3),
          // &:nth-child(4) {
          //   width: 15%;
          // }
        }
      }
    }
  }
}

//responsive
@media (max-width: 750px) {
  .friend-comparison {
    .comparison {
      .header {
        flex-direction: column;

        .left {
          flex-direction: column;
          width: 100%;

          .avatar-name-wrapper,
          .winrate,
          .favorite-map {
            flex: 0 0 auto;
            border: 0;
            text-align: center;
            padding: 0;
            margin: 0;

            margin-bottom: 10px;
          }

          .favorite-map {
            border-top: 1px solid $purple;
            padding-top: 10px;
          }
        }

        .right {
          width: 100%;
          justify-content: center;
        }
      }
    }
  }
}
</style>