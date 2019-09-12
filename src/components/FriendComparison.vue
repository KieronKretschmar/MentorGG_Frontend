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
            <div class="info">
              <img class="avatar" :src="comparison.OtherPlayerInfo.Icon" />
              <span class="name">
                {{ comparison.OtherPlayerInfo.SteamName }}
                <span class="favorite-map mobile">
                  <div class="map-text">
                    <span>Favorite Map</span>
                    <br />
                    <h5>{{ comparison.MostPlayedMap }}</h5>
                  </div>
                </span>
              </span>
            </div>

            <span
              class="winrate desktop"
              :class="{good: comparison.MatchesWon >= comparison.MatchesLost}"
            >
              {{ comparison.MatchesWon + " - " + comparison.MatchesTied + " - " + comparison.MatchesLost }}
              <br />
              <span>Win - Tie - Loss</span>
            </span>
            <hr class="on-mobile" />
            <span class="favorite-map desktop">
              <div class="map-text">
                <span>Favorite Map</span>
                <br />
                <h5>{{ comparison.MostPlayedMap }}</h5>
              </div>
            </span>
            <div
              class="winrate desktop"
              :class="{good: comparison.MostPlayedMapMatchesWon >= comparison.MostPlayedMapMatchesLost}"
            >
              {{ comparison.MostPlayedMapMatchesWon + " - " + comparison.MostPlayedMapMatchesTied + " - " + comparison.MostPlayedMapMatchesLost }}
              <br />
              <span>Win - Tie - Loss</span>
            </div>

            <span
              class="winrate mobile"
              :class="{good: comparison.MatchesWon >= comparison.MatchesLost}"
            >
              <div class="result label">
                <span>Maps</span>
                <span class="win">Win</span>
                <span class="tie">Tie</span>
                <span class="loss">Loss</span>
              </div>
              <hr class="on-mobile" />

              <div
                class="result values"
                :class="{good: comparison.MatchesWon >= comparison.MatchesLost}"
              >
                <span>All Maps</span>
                <span class="win">{{comparison.MatchesWon}}</span>
                <span class="tie">{{comparison.MatchesTied}}</span>
                <span class="loss">{{comparison.MatchesLost}}</span>
              </div>
              <hr class="on-mobile" />
              <div
                class="result values"
                :class="{good: comparison.MatchesWon >= comparison.MatchesLost}"
              >
                <span>{{ comparison.MostPlayedMap }}</span>
                <span class="win">{{comparison.MostPlayedMapMatchesWon}}</span>
                <span class="tie">{{comparison.MostPlayedMapMatchesTied}}</span>
                <span class="loss">{{comparison.MostPlayedMapMatchesLost}}</span>
              </div>
            </span>
            <hr class="on-mobile" />
          </div>

          <div class="right">
            <button
              class="button-variant-bordered comparison-btn"
              @click="ToggleComparisonVisibility(comparison)"
            >Friend details</button>
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
        .info {
          display: flex;
          .name {
            width: 100%;
          }
        }
        .mobile {
          display: none;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 5px;
        }

        .name {
          width: 20%;
          margin-left: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .mobile {
            display: none;
          }
        }

        .winrate {
          margin-left: 20px;
          border-left: 1px solid $purple;
          color: $red;
          width: 20%;
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
          width: 15%;
          border-left: 1px solid $purple;

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
//========================================================================================================================================
//responsive
//=========================================================================================================================================
@media (max-width: 1170px) {
  .friend-comparison {
    font-size: 1.2vw;

    .bordered-box {
      padding: 1em 2em;

      p {
        margin: 1.1em 0;
        font-size: 1.25em;
      }
    }

    .comparison {
      &.bordered-box {
        margin-top: 0.9em;

        .header {
          font-size: 1em;

          .left {
            .on-mobile {
              display: none;
            }

            .avatar {
              width: 2.5em;
              height: auto;
              border-radius: 0.25em;
            }

            .name {
              margin-left: 1.2em;
            }

            .winrate {
              margin-left: 1.2em;

              &.good {
              }
            }

            .favorite-map {
              .map-text {
                font-size: 1em;

                span {
                  font-size: 1em;
                }
              }
            }
          }

          .right {
            .on-mobile {
              display: none;
            }
            .button-variant-bordered {
              &.comparison-btn {
                font-size: 1.1em;
              }
            }
          }
        }
      }
    }
  }
}

//========================================================================================================================================
//mobile
//=========================================================================================================================================
@media (max-width: 576px) {
  .friend-comparison {
    font-size: 2.25vw;

    .bordered-box {
      p {
      }
    }
    .comparison {
      &.bordered-box {
        .header {
          display: flex;
          flex-direction: column;

          .left {
            flex-direction: column;
            align-items: flex-start;
            .desktop {
              display: none;
            }
            .mobile {
              display: flex;
            }
            .info {
              display: flex;
              width: 100%;
              .avatar {
                width: 4.5em;
                height: auto;
              }

              .name {
                font-size: 1.3em;
                flex-grow: 1;
                .favorite-map {
                  width: 100%;
                  border: none;

                  .map-text {
                    padding: 0;
                    color: $purple;
                    span {
                      font-size: 1em;
                    }
                    h5 {
                      margin-left: 1em;
                      color: rgb(255, 255, 255);
                      display: inline;
                      font-size: 1em;
                    }
                    br {
                      display: none;
                    }
                  }
                }
              }
            }

            .on-mobile {
              display: block;
              width: 100%;
              border: 0.5px solid $purple;
            }

            .winrate {
              width: 100%;
              border: none;
              font-size: 2em;
              text-align: left;
              margin: 0;
              flex-direction: column;
              &.mobile {
                .result {
                  display: flex;
                  padding: 1em 0;
                  &.label {
                    span {
                      &:first-of-type {
                        color: white;
                        flex-basis: 40%;
                        text-align: left;
                      }
                      &.win {
                        color: $green;
                      }
                      &.tie {
                        color: $light-1;
                      }
                      &.loss {
                        color: $red;
                      }
                      flex-basis: 20%;
                      text-align: center;
                    }
                  }
                  &.values {
                    span {
                      flex-basis: 20%;
                      text-align: center;
                      color: $red;
                      &:first-of-type {
                        text-align: left;
                        flex-basis: 40%;
                      }
                      &.win {
                        color: $green;
                      }
                      &.tie {
                        color: $light-1;
                      }
                      &.loss {
                        color: $red;
                      }
                    }
                    &.good {
                      span {
                        &:first-of-type {
                          color: $green;
                        }
                      }
                    }
                  }
                }
              }

            
            }
          }
          .right {
            flex-direction: column;
            align-items: flex-start;
            .on-mobile {
              display: block;
              width: 100%;
              border: 0.5px solid $purple;
            }
            .button-variant-bordered {
              &.comparison-btn {
                font-size: 1.1em;
              }
            }
          }
        }
      }
    }
  }
}
</style>