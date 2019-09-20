<template>
  <div class="bordered-box match" v-on:click="ToggleMatchVisibility($event,match)">
    <div class="match-header" :class="'source-' + match.Source.toLowerCase()">
      <div class="left">
      <!-- could be done with MatchHeader component -->
          <img
            :src="$api.resolveResource(match.MapIcon)"
            :alt="match.Map + ' Thumbnail'"
            :title="match.Map"
          />
        </div>
        <div class="map-and-datetime">
          <span class="map">{{ match.Map }}</span>
          <span class="datetime">{{ match.MatchDate|formatDate }}</span>
        </div>

        <div class="match-score">
          <span
            class="score"
            :type="match.WinLoseTie"
          >{{ match.Scoreboard.CtStarterRounds }} : {{ match.Scoreboard.TerroristStarterRounds }}</span>
          <span class="score-text">SCORE</span>
        </div>

        <div class="player-kda">
          <div class="kda">
            <span class="k">{{ match.UserScoreboardEntry.Kills }}</span>
            <span class="a">{{ match.UserScoreboardEntry.Assists }}</span>
            <span class="d">{{ match.UserScoreboardEntry.Deaths }}</span>
          </div>
          <span class="kda-text">K / A / D</span>
        </div>
      </div>
      <div class="right">
        <i
          v-if="['de_dust2', 'de_mirage', 'de_nuke', 'de_inferno', 'de_cache', 'de_overpass', 'de_train'].includes(match.Map)"
          class="material-icons watch-match-icon"
          title="Watch in Browser"
          @click="WatchMatch(match)"
        >videocam</i>
        <i class="material-icons arrow">arrow_drop_down</i>
        <i class="material-icons up arrow hide">arrow_drop_up</i>
      </div>
    </div>
    <transition name="slide">
      <div class="match-body" v-if="match.IsVisible">
        <div class="team-table">
          <div
            v-for="team in match.Scoreboard.TeamInfos"
            :key="team.TeamName"
            class="team"
            :name="team.TeamName"
          >
            <div class="table-header">
              <span></span>
              <span>ADR</span>
              <span>K</span>
              <span>A</span>
              <span>D</span>
            </div>
            <div class="table-content">
              <div v-for="entry in team.Players" :key="entry.Profile.SteamId" class="table-entry">
                <div class="image-and-name">
                  <img class="avatar" :src="entry.Profile.Icon" />
                  <a
                    class="name"
                    :href="entry.Profile.Url"
                    target="_blank"
                  >{{ entry.Profile.SteamName }}</a>
                </div>

                <span
                  class="adr"
                >{{ (entry.DamageDealt / (match.Scoreboard.CtStarterRounds + match.Scoreboard.TerroristStarterRounds)).toFixed(0) }}</span>
                <span class="k">{{ entry.Kills }}</span>
                <span class="a">{{ entry.Assists }}</span>
                <span class="d">{{ entry.Deaths }}</span>
              </div>
            </div>
            <hr class="on-mobile" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["match"],
  methods: {
    WatchMatch: function(match) {
      let demoviewer = this.$root.$children[0].$refs.demoviewer;
      demoviewer.Watch("", match.MatchId, 1);
    },
    ToggleMatchVisibility: function(event) {
      let arrows = [
        ...event.target.closest(".match").querySelectorAll(".arrow")
      ];
      this.match.IsVisible = !this.match.IsVisible;
      arrows.forEach(arrow => arrow.classList.toggle("hide"));
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.match {
  margin-top: 10px;
  .hide {
    display: none;
  }
  .on-mobile {
    display: none;
  }

  .match-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    cursor: pointer;

    &.source-valve > .left > .map-thumbnail {
      border-left-color: $matchmaking-blue;
    }

    &.source-faceit > .left > .map-thumbnail {
      border-left-color: $faceit-orange;
    }

    .left {
      display: flex;
      width: 80%;
      .on-mobile {
        display: none;
      }

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
        width: 20%;
        padding: 0 25px;
        border-right: 1px solid $purple;

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

      .match-score {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        padding: 0 50px;
        width: 20%;
        border-right: 1px solid $purple;

        .score {
          font-weight: 500;
          font-size: 16px;

          &[type="0"] {
            color: $green;
          }

          &[type="1"] {
            color: $red;
          }

          &[type="2"] {
            color: orange;
          }
        }

        .score-text {
          font-size: 12px;
          color: $dark-4;
          margin-top: 5px;
        }
      }

      .player-kda {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        padding: 0 50px;
        width: 20%;

        .kda {
          color: white;
          font-weight: 500;
          font-size: 16px;

          *:not(:last-child) {
            &:after {
              content: "/";
              margin: 0 7px;
            }
          }
        }

        .kda-text {
          font-size: 12px;
          color: $dark-4;
          margin-top: 5px;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      color: white;

      .watch-match-icon {
        color: $orange;
        margin-right: 20px;
        font-size: 26px;
        transition: 0.35s;
        cursor: pointer;

        &:hover {
          color: $purple;
        }
      }
    }
  }

  .match-body {
    hr {
      border: 1px solid $purple;
      border-bottom: none;
    }

    .team-table {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      .team {
        width: 49%;

        .table-header {
          display: flex;
          color: $orange;
          font-size: 12px;
          justify-content: space-between;

          span {
            display: inline-block;
            //width: 10%;
            text-align: center;
            flex-basis: 12.5%;

            &:first-child {
              max-width: 264px;
              //flex: 0 1 264px;
              flex-basis: 50%;
              //margin-right: 10px;
            }
          }
        }

        .table-content {
          .table-entry {
            display: flex;
            align-items: center;
            border-bottom: 1px solid $purple;
            padding: 10px 0;
            justify-content: space-between;

            .image-and-name {
              flex-basis: 50%;
              display: flex;
              overflow: hidden;
              align-items: center;
              a {
                text-overflow: ellipsis;
              }
            }
            span {
              flex-basis: 12.5%;
            }
            &:last-child {
              border-bottom: none;
            }

            .avatar {
              width: 24px;
              height: 24px;
              border-radius: 3px;
            }

            .name {
              color: white;
              font-weight: 500;
              margin-left: 20px;
              font-size: 14px;
              max-width: 200px;
              flex: 0 1 200px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              text-decoration: none;
              transition: 0.35s;

              &:hover {
                color: $orange;
              }
            }

            .adr {
              //margin-left: 20px;
            }

            .adr,
            .k,
            .d,
            .a {
              font-size: 12px;
              font-weight: 500;
              color: white;
              width: 10%;
              text-align: center;
            }
          }
        }
      }
    }
  }
}

//========================================================================================================================================
//responsive
//=========================================================================================================================================
@media (max-width: 1170px) {
  .match {
    font-size: 1.2vw;
    margin-top: 1em;

    .match-header {
      padding: 0.5em 0;

      .left {
        .map-thumbnail {
          width: 10em;
          height: auto;
          border-radius: 0.5em;
        }

        .map-and-datetime {
          padding: 0 1.5em;

          .map {
            font-size: 1.2em;
          }

          .datetime {
            font-size: 1em;
          }
        }
        .match-score {
          padding: 0 1.5em;

          .score {
            font-size: 1.5em;
          }
        }

        .player-kda {
          padding: 0 1.5em;

          .kda {
            font-size: 1.25em;
          }

          .kda-text {
            font-size: 1.25em;
          }
        }
      }

      .right {
        .watch-match-icon {
          margin-right: 1em;
          font-size: 2.5em;
        }

        .match-details-button {
          font-size: 1.1em;
          border-radius: 2.5em;
        }
      }
    }
    .match-body {
      .team-table {
        .team {
          .table-header {
            font-size: 1.2em;
          }

          .table-content {
            .table-entry {
              .image-and-name {

                a {
                  font-size: 1.2em;
                }
              }

              span {
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
  .match {
    font-size: 2.25vw;

    .on-mobile {
      display: block;
      width: 100%;
      border: 0.5px solid $purple;
    }

    .match-header {
      flex-direction: row;
      align-items: flex-start;

      .left {
        flex-basis: 75%;

        .map-thumbnail {
          display: none;
        }

        .map-and-datetime {
          flex-basis: 50%;

          .map {
          }

          .datetime {
          }
        }

        .match-score {
          flex-basis: 45%;

          .score {
          }
        }

        .player-kda {
          flex-basis: 45%;

          .kda {
          }

          .kda-text {
          }
        }
      }

      .right {
        flex-basis: 25%;
        justify-content: flex-end;

        .watch-match-icon {
          margin-right: 0;
        }

        .match-details-button {
        }
      }
    }

    .match-body {
      hr {
        border: 1px solid white;
      }

      .team-table {
        flex-direction: column;

        div {
          &:last-of-type {
            hr {
              display: none;
            }
          }
        }

        .team {
          width: 100%;
          padding-bottom: 2em;
          .table-header {

            span {
              &:first-of-type {
                flex-basis: 50%;
                flex: 1;
              }
              flex-basis: 12.5%;
            }
          }

          .table-content {
            .table-entry {

              .image-and-name {
                display: flex;
                flex-basis: 50%;
                overflow: hidden;

                a {
                  text-overflow: ellipsis;
                  overflow: hidden;
                  flex-basis: 70%;
                }
              }
              
              span {
                flex-basis: 12.5%;
              }
            }
          }
        }
      }
    }
  }
}
</style>