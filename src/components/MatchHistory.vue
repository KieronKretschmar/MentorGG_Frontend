<template>
  <div class="match-history">
    <div class="bordered-box tabs-header">
      <span class="title">Matchmaking:</span>
      <span :class="{ active: activeTab == 0 }" @click="activeTab = 0" class="filter all">All</span>
      <span :class="{ active: activeTab == 1 }" @click="activeTab = 1" class="filter faceit">Faceit</span>
      <span :class="{ active: activeTab == 2 }" @click="activeTab = 2" class="filter mm">Matchmaking</span>
    </div>

    <div class="match-list">
      <div v-for="match in matches" :key="match.MatchId" class="bordered-box match">
        <div class="match-header">
          <div class="left">
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
                <span class="d">{{ match.UserScoreboardEntry.Deaths }}</span>
                <span class="a">{{ match.UserScoreboardEntry.Assists }}</span>
              </div>
              <span class="kda-text">K / D / A</span>
            </div>
          </div>

          <div class="right">
            <button
              class="button-variant-bordered"
              @click="ToggleMatchVisibility(match)"
            >Match details</button>
          </div>
        </div>
        <transition name="slide">
          <div class="match-body" v-if="match.IsVisible">
            <hr>
            <div class="team-table">
              <div class="team1"></div>
              <div class="team2"></div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  components: {},
  mounted() {
    this.$api.getMatches(1).then(response => {
      this.matches = response.data.MatchInfos;
      this.matches.forEach(match => {
        match.IsVisible = false;
      });
      console.log(this.matches);
    });

    this.$api.getImportantPositions(true, 3, 10).then(response => {
      console.log(response);
    });
  },
  data() {
    return {
      matches: [],
      activeTab: 0
    };
  },
  methods: {
    ToggleMatchVisibility: function(match) {
      match.IsVisible = !match.IsVisible;
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss">
.match-history {
  .tabs-header {
    display: flex;
    font-size: 0.875rem;

    .title,
    .filter {
      color: white;
      font-weight: 500;
    }

    .filter {
      cursor: pointer;
      margin-left: 20px;
      transition: 0.75s all;

      &:hover,
      &.active {
        //TODO: Improve underline animation with :after
        text-decoration: underline;
        opacity: 0.7;
      }

      &.all {
        color: $dark-4;
      }

      &.faceit {
        color: $orange;
      }

      &.mm {
        color: $l-blue;
      }
    }
  }

  .match-list {
    .match {
      margin-top: 20px;

      .match-header {
        display: flex;
        justify-content: space-between;

        .left {
          display: flex;
          width: 60%;

          .map-and-datetime {
            display: flex;
            flex-direction: column;
            text-align: right;
            width: 30%;
            padding-right: 50px;

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
            text-align: center;
            padding: 0 50px;

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
            text-align: center;

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
        }
      }

      .match-body {
        hr {
          border-color: $purple;
        }

        .team-table {
          display: flex;
          justify-content: space-between;

          .team1,
          .team2 {
            width: 49%;
          }
        }
      }
    }
  }
}
</style>