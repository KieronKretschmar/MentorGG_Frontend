<template>
  <div class="bordered-box match" :class="{failed: failed}" v-if="match">
    <div v-if="isAboveLimit" class="limit-display">
      <p>
        <span class="match-date">{{ match.MatchDate|formatDateAndTime }}</span>
        {{Enums.SubscriptionStatus.ToString(this.$api.User.subscriptionStatus)}} users may analyze their first {{this.$api.User.dailyUploadLimit}} matches in every 24h period,
        starting at {{this.$api.MatchSelector.dailyLimitEnds | formatTime}}
      </p>
      <button class="button-variant-bordered" @click="OpenSubscriptionPage">Upgrade Membership</button>
    </div>
    <div v-if="failed" class="match-header failed-header">
      <p>
        <span class="match-date">{{ match.MatchDate|formatDateAndTime }}</span> Analysis failed or demo too old
      </p>
    </div>
    <div class="match-header" :class="[isAboveLimit ? 'above-limit' : '', sourceClassName]" v-else>
      <div class="left">
        <!-- could be done with MatchHeader component -->
        <div class="map-thumbnail">
          <img
            :src="this.$assetLoader.getMapPreview(match.Map)"
            :alt="match.map + ' Thumbnail'"
            :title="match.map"
          />
        </div>
        <div class="map-and-datetime">
          <span class="map">{{ match.Map }}</span>
          <span class="datetime">{{ match.MatchDate|formatDateAndTime }}</span>
        </div>
        <div class="match-score">
          <span
            class="score"
            :class="[('score-'+UserData.WinLossTie)]"
          >{{ match.Scoreboard.TeamInfos.CtStarter.WonRounds }} : {{ match.Scoreboard.TeamInfos.TerroristStarter.WonRounds }}</span>
          <span class="score-text">SCORE</span>
        </div>

        <div class="player-kda">
          <div class="kda">
            <span class="k">{{ UserData.ScoreboardEntry.Kills }}</span>
            <span class="a">{{ UserData.ScoreboardEntry.Assists }}</span>
            <span class="d">{{ UserData.ScoreboardEntry.Deaths }}</span>
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

        <i
          class="fas fa-chevron-down"
          :class="{open: match.IsVisible}"
          @click="ToggleMatchVisibility()"
        ></i>
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
                  <!-- TODO: migrate resources -->
                  <img class="rank" :src="$assetLoader.getRankIcon(entry.RankBeforeMatch)" />
                  <img
                    class="avatar"
                    :src="$assetLoader.getSteamProfileImageUrl(entry.Profile.ImageUrl)"
                  />
                  <!-- <a
                    class="name"
                    :href="`https://steamcommunity.com/profiles/${entry.SteamId}`"
                    target="_blank"
                  >{{ entry.Profile.SteamName }}</a>-->
                  <router-link
                    class="name"
                    :to="{name: 'dashboard', params: {steamId: entry.SteamId}}"
                  >{{ entry.Profile.SteamName }}</router-link>
                </span>
                <span
                  class="adr"
                >{{ (entry.DamageDealt / (match.Scoreboard.TeamInfos.CtStarter.WonRounds + match.Scoreboard.TeamInfos.TerroristStarter.WonRounds)).toFixed(0) }}</span>
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
import Enums from "@/enums";

export default {
  components: {
    MatchHeader
  },
  data() {
    return {
      // Add enums so we can reference it in template
      Enums: Enums
    };
  },
  props: [
    "match",
    "isAboveLimit", // expect full data except for a negative matchId
    "failed", // expect no data except for match.MatchDate and match.Source
    "steamId"
  ],
  methods: {
    Watch: function(match) {
      this.$helpers.LogEvent(this, "Watch");

      globalThis.DemoViewer.SetMatch(match.MatchId)
        .SetRound(1)
        .Load();
    },
    ToggleMatchVisibility: function() {
      this.$helpers.LogEvent(
        this,
        this.match.IsVisible ? "ShowScoreboard" : "HideScoreboard"
      );
      this.match.IsVisible = !this.match.IsVisible;
      this.$forceUpdate();
    },
    OpenSubscriptionPage() {
      this.$helpers.LogEvent(this, "DailyLimitUpgrade");

      this.$router.push({ name: "membership" });
    },
    GetUserData() {
      let allScoreboardEntries = this.match.Scoreboard.TeamInfos.CtStarter.Players.concat(
        this.match.Scoreboard.TeamInfos.TerroristStarter.Players
      );

      let playerScoreboardEntry = allScoreboardEntries.find(
        x => x.SteamId == this.steamId
      );

      let userIsCtStarter = this.match.Scoreboard.TeamInfos.CtStarter.Players.some(
        p => p.SteamId == this.steamId
      );

      let userRoundsWon = (userIsCtStarter
        ? this.match.Scoreboard.TeamInfos.CtStarter
        : this.match.Scoreboard.TeamInfos.TerroristStarter
      ).WonRounds;

      let userRoundsLost = (!userIsCtStarter
        ? this.match.Scoreboard.TeamInfos.CtStarter
        : this.match.Scoreboard.TeamInfos.TerroristStarter
      ).WonRounds;

      let winLossTie =
        userRoundsWon == userRoundsLost
          ? "tie"
          : userRoundsWon > userRoundsLost
          ? "win"
          : "loss";

      return {
        ScoreboardEntry: playerScoreboardEntry,
        WinLossTie: winLossTie
      };
    }
  },
  computed: {
    sourceClassName() {
      return (
        "source-" +
        this.Enums.Source.ToString(this.match.Source)
          .toLowerCase()
          .replace(" ", "")
      );
    },
    UserData() {
      return this.GetUserData();
    }
  }
};
</script>

<style lang="scss" scoped>
.match {
  margin-top: 10px;
  position: relative;

  &.failed {
    background: $dark-1;
    border: 1px solid $purple;
    padding: 0 20px;
    text-align: left;
  }

  .limit-display {
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: white;
    z-index: 500;
    display: flex;
    align-items: center;
    text-align: left;
    padding: 20px;
    border-radius: 3px;
    white-space: normal;

    p {
      font-weight: 400;
      padding-right: 20px;
    }
  }

  .match-date {
    display: inline-block;
    width: 125px;
  }

  .match-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    color: #fff;

    &.failed-header {
      padding: 0;
    }

    &.above-limit {
      filter: blur(4px);
      pointer-events: none;
      user-select: none;
    }

    &.source-valve > .left > .map-thumbnail {
      border-left-color: $matchmaking-blue;
    }

    &.source-faceit > .left > .map-thumbnail {
      border-left-color: $faceit-orange;
    }

    &.source-manualupload > .left > .map-thumbnail {
      border-left-color: $red;
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
        flex: 0 0 170px;
        border-right: 1px solid $purple;

        .score {
          font-weight: 500;
          font-size: 16px;

          &.score-win {
            color: $green;
          }

          &.score-loss {
            color: $red;
          }

          &.score-tie {
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
    display: inline-block;
    min-width: 100%;

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
              flex: 0 0 250px;
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
              flex: 0 0 250px;
              display: flex;
              align-items: center;

              .rank {
                height: 24px;
                margin-right: 10px;
              }

              .avatar {
                width: 24px;
                height: 24px;
                border-radius: 3px;
              }

              .name {
                color: white;
                font-weight: 500;
                margin-left: 0;
                padding-left: 10px;
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
@media (max-width: 780px) {
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

@media (max-width: 650px) {
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
@media (max-width: 560px) {
  .match-history {
    .match-list {
      .match {
        .limit-display {
          text-align: center;
          padding: 0 0 20px 0;
          flex-wrap: wrap;
          justify-content: center;

          p {
            font-size: 12px;
            padding: 0 20px;
          }

          .match-date {
            width: auto;
            font-weight: 500;
          }
        }

        .match-header {
          flex-direction: column;

          .left {
            margin-bottom: 20px;
            justify-content: center;
            width: 100%;

            .match-score {
              padding: 0 25px;
              border-right: none;

              .score {
                font-size: 14px;
              }

              .score-text {
                font-size: 12px;
              }
            }
          }
        }

        .failed-header {
          p {
            font-size: 11px;
          }

          .match-date {
            width: auto;
            font-weight: 500;
          }
        }

        .map-and-datetime {
          text-align: center;

          .map {
            font-size: 14px;
          }

          .datetime {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>