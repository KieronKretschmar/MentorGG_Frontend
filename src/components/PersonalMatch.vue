<template>
  <div class="bordered-box match">
    <div class="match-header" :class="'source-' + match.Source.toLowerCase()">
      <div class="left">
        <!-- could be done with MatchHeader component -->
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
          v-if="this.$helpers.DemoViewerAvailable(match.Map)"
          class="material-icons watch-match-icon"
          title="Watch in Browser"
          @click="Watch(match)"
        >videocam</i>

        <a
          :href="$api.matchUrl(match.MatchId)"
          v-if="match.AvailableForDownload"
          class="download-match-link"
        >
          <i class="material-icons download-match-icon" title="Download Demo">get_app</i>
        </a>

        <i class="fas fa-chevron-down" :class="{open: match.IsVisible}" @click="ToggleMatchVisibility(match)"></i>
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
              <span>EF</span>
              <span>MVPs</span>
              <span>Score</span>
            </div>
            <div class="table-content">
              <div v-for="entry in team.Players" :key="entry.Profile.SteamId" class="table-entry">
                <span class="name-avatar-wrapper">
                  <img class="avatar" :src="entry.Profile.Icon" />
                  <a
                    class="name"
                    :href="entry.Profile.Url"
                    target="_blank"
                  >{{ entry.Profile.SteamName }}</a>
                </span>
                <span
                  class="adr"
                >{{ (entry.DamageDealt / (match.Scoreboard.CtStarterRounds + match.Scoreboard.TerroristStarterRounds)).toFixed(0) }}</span>
                <span class="k">{{ entry.Kills }}</span>
                <span class="a">{{ entry.Assists }}</span>
                <span class="d">{{ entry.Deaths }}</span>
                <span class="ef">{{ entry.EnemiesFlashed }}</span>
                <span class="mvp">{{ entry.MVPs }}</span>
                <span class="score">{{ entry.Score }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MatchHeader from "@/components/MatchHeader.vue";

export default {
  components: {
    MatchHeader
  },
  props: ["match"],
  methods: {
    Watch: function(match) {
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
      width: calc(80% - 20px);

      .map-thumbnail {
        height: 55px;
        border-radius: 5px;
        overflow: hidden;
        border-left-style: solid;
        flex: 0 0 8vw;
        max-width: 150px;

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
        padding: 0 25px;
        border-right: 1px solid $purple;
        flex: 0 0 180px;

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
        flex: 0 0 150px;
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
        flex: 0 0 180px;

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

      .fa-chevron-down {
        color: $orange;
        cursor: pointer;
        transition: 0.35s;

        &:hover {
          color: $purple;
        }

        &.open {
          transform: rotate(180deg);
        }
      }

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

      .download-match-link {
        align-self: flex-end;

        .download-match-icon {
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
  }

  .match-body {
    overflow-x: auto;

    hr {
      border: 1px solid $purple;
      border-bottom: none;
    }

    .team-table {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      flex-direction: column;

      .team {
        width: 100%;

        &:first-child {
          padding-bottom: 15px;
          margin-bottom: 15px;
          border-bottom: 1px solid $dark-4;
        }

        .table-header {
          display: flex;
          color: $orange;
          font-size: 12px;
          justify-content: space-between;

          span {
            display: inline-block;
            text-align: center;
            flex: 0 0 100px;

            &:first-child {
              flex: 0 0 200px;
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

            .name-avatar-wrapper {
              flex: 0 0 200px;

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
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-decoration: none;
                transition: 0.35s;
                max-width: 150px;
                display: inline-block;

                &:hover {
                  color: $orange;
                }
              }
            }

            .adr,
            .k,
            .d,
            .a,
            .ef,
            .mvp,
            .score {
              font-size: 12px;
              font-weight: 500;
              color: white;
              // width: 10%;
              text-align: center;
              min-width: 100px;
              flex: 0 0 100px;
            }
          }
        }
      }
    }
  }
}

//responsive
@media(max-width: 780px) {
  .match-history {
    .match-list {
      .match {
        .match-header {
          .left {
            .player-kda {
              display: none;
            }
          }
        }
      }
    }
  }
}

@media(max-width: 650px) {
  .match-history {
    .match-list {
      .match {
        .match-header {          
          .left {
            .map-thumbnail {
              display: none;
              justify-content: center;
            }
          }
        }
      }
    }
  }
}

//TODO: improve styling
@media(max-width: 560px) {
  .match-history {
    .match-list {
      .match {
        .match-header {       
          flex-direction: column;

          .left {
            margin-bottom: 20px;
            justify-content: center;
            width: 100%;

            .match-score {
              padding: 0 25px;
              border-right: 0;
              flex: 0 0 50%;
            }

            .map-thumbnail {
              display: none;
              justify-content: center;
            }
          }
        }
      }
    }
  }
}
</style>