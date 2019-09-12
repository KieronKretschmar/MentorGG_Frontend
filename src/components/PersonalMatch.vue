<template>
  <div class="bordered-box match">
    <div class="match-header" :class="'source-' + match.Source.toLowerCase()">
      <div class="left">
        <div class="map-thumbnail">
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
        <hr class="on-mobile" />
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

        <button
          class="button-variant-bordered match-details-button"
          @click="ToggleMatchVisibility(match)"
        >Match details</button>
      </div>
    </div>
    <transition name="slide">
      <div class="match-body" v-if="match.IsVisible">
        <hr />
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
                <img class="avatar" :src="entry.Profile.Icon" />
                <a
                  class="name"
                  :href="entry.Profile.Url"
                  target="_blank"
                >{{ entry.Profile.SteamName }}</a>
                <span
                  class="adr"
                >{{ (entry.DamageDealt / (match.Scoreboard.CtStarterRounds + match.Scoreboard.TerroristStarterRounds)).toFixed(0) }}</span>
                <span class="k">{{ entry.Kills }}</span>
                <span class="a">{{ entry.Assists }}</span>
                <span class="d">{{ entry.Deaths }}</span>
              </div>
            </div>
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
    ToggleMatchVisibility: function() {
      this.match.IsVisible = !this.match.IsVisible;
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.match {
  margin-top: 10px;

  .match-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;

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
            width: 10%;
            text-align: center;

            &:first-child {
              max-width: 264px;
              flex: 0 1 264px;
              margin-right: 10px;
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
              margin-left: 20px;
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
  }
}

//========================================================================================================================================
//mobile
//=========================================================================================================================================
@media (max-width: 576px) {
  .match {
    font-size: 2.25vw;
    .match-header {
      .left {
        flex-wrap: wrap;
        .on-mobile {
          display: block;
          width: 100%;
          border: 0.5px solid $purple;
        }
        .map-thumbnail {
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
        .watch-match-icon {
        }
        .match-details-button {
        }
      }
    }
  }
}
</style>