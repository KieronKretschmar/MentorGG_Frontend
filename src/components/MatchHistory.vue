<template>
  <div class="match-history">
    <div class="bordered-box tabs-header">
      <span class="title">Match History:</span>
      <span :class="{ active: activeTab == 0 }" @click="activeTab = 0" class="filter all">All</span>
      <span :class="{ active: activeTab == 1 }" @click="activeTab = 1" class="filter faceit">Faceit</span>
      <span :class="{ active: activeTab == 2 }" @click="activeTab = 2" class="filter mm">Matchmaking</span>
    </div>

    <div class="match-list">
      <div v-for="match in matches" :key="match.MatchId" class="bordered-box match">
        <div class="match-header">
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
            <button
              class="button-variant-bordered"
              @click="ToggleMatchVisibility(match)"
            >Match details</button>
          </div>
        </div>
        <transition name="slide">
          <div class="match-body" v-if="match.IsVisible">
            <hr />
            <div class="team-table">
              <div
                v-for="(team, teamName) in match.Scoreboard.Teams"
                :key="teamName"
                class="team"
                :name="teamName"
              >
                <div class="table-header">
                  <span></span>
                  <span>ADR</span>
                  <span>K</span>
                  <span>A</span>
                  <span>D</span>
                </div>
                <div class="table-content">
                  <div v-for="entry in team" :key="entry.Profile.SteamId" class="table-entry">
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

      <div v-if="loadingMatches">
        <div class="bordered-box no-matches">
          <AjaxLoader>Loading Matches</AjaxLoader>
        </div>
      </div>
    </div>
    <div class="match-history-controls" v-if="!loadingMatches">
      <button class="button-variant-bordered purple" @click="LoadAppendMatches(5)">Load 5 More</button>
      <button class="button-variant-bordered purple" @click="LoadAppendMatches(25)">Load 25 More</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {
    this.LoadAppendMatches(5);
  },
  data() {
    return {
      matches: [],
      activeTab: 0,
      loadingMatches: false
    };
  },
  methods: {
    ToggleMatchVisibility: function(match) {
      match.IsVisible = !match.IsVisible;
      this.$forceUpdate();
    },
    LoadAppendMatches: function(count) {
      this.loadingMatches = true;
      this.$api.getMatches(count, this.matches.length).then(response => {
        for (let i = 0; i < response.data.MatchInfos.length; i++) {
          let match = response.data.MatchInfos[i];
          match.IsVisible = false;
          this.matches.push(match);
        }

        this.loadingMatches = false;
      });
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
    .no-matches {
      margin-top: 10px;
    }

    .match {
      margin-top: 10px;

      .match-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0;

        .left {
          display: flex;
          width: 80%;

          .map-thumbnail {
            height: 55px;
            width: 135px;
            border-radius: 5px;
            overflow: hidden;

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
  }
}

.match-history-controls {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;

  button {
    &:first-child {
      margin-right: 10px;
    }
  }
}
</style>