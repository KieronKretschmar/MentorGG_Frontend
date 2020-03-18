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
          <!-- <span class="datetime">{{ match.MatchDate|formatDateAndTime }}</span> -->
        </div>

        <div class="versus">
          <div class="team l">
            <span class="team-name">{{match.Scoreboard.TeamInfos[0].TeamName}}</span>
            <img class="team-icon" :src="$api.resolveResource(match.Scoreboard.TeamInfos[0].Icon)" />
          </div>

          <div class="match-score">
            <span
              class="score"
              :type="3"
            >{{ match.Scoreboard.CtStarterRounds }} : {{ match.Scoreboard.TerroristStarterRounds }}</span>
            <span class="score-text">SCORE</span>
          </div>

          <div class="team r">
            <span class="team-name">{{match.Scoreboard.TeamInfos[1].TeamName}}</span>
            <img class="team-icon" :src="$api.resolveResource(match.Scoreboard.TeamInfos[1].Icon)" />
          </div>
        </div>
      </div>

      <div class="right">
        <i v-if="this.$helpers.DemoViewerAvailable(match.Map)"
          class="material-icons watch-match-icon"
          title="Watch in Browser"
          @click="Watch(match)"
        >videocam</i>

        <button class="button-variant-bordered" @click="ToggleMatchVisibility(match)">Match details</button>
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
    Watch: function(match) {
      globalThis.DemoViewer.SetMatch(match.MatchId)
        .SetRound(1)
        .Load();
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

      .map-thumbnail {
        height: 55px;
        width: 135px;
        border-radius: 5px;
        overflow: hidden;
        border-left-style: solid;
        border-left-color: turquoise;

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

      .versus {
        display: flex;
        flex: 1 1 auto;
        padding-right: 50px;
        justify-content: space-between;

        .team {
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          padding-left: 20px;
          width: 40%;

          &.r {
            border-right: 1px solid $purple;
            padding-right: 20px;
          }

          .team-name {
            font-size: 10px;
            color: white;
            margin-bottom: 5px;
          }

          .team-icon {
            width: 48px;
            height: 48px;
            border-radius: 3px;
            align-self: center;
          }
        }

        .match-score {
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          // padding: 0 50px;
          width: auto !important;
          border-right: none !important;
          white-space: nowrap;

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
</style>