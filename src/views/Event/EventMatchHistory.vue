<template>
<div class="view view-eventmatchhistory">
  <div class="fixed-width-container">
    <div class="match-history">
      <div class="bordered-box tabs-header">
        <span class="title">Matches from {{selectedEventName}}</span>
      </div>

      <div class="match-list">   
        <div v-for="match in visibleMatches" :key="match.MatchId">
          <NeutralMatch 
            :match="match"
            />
        </div>

        <div v-if="loadingMatches">
          <div class="bordered-box no-matches">
            <AjaxLoader>Loading Matches</AjaxLoader>
          </div>
        </div>
      </div>
      <div class="match-history-controls" v-if="!loadingMatches">
        <button class="button-variant-bordered purple" @click="LoadAppendMatches(5, false)">Load 5 More</button>
        <button class="button-variant-bordered purple" @click="LoadAppendMatches(25, false)">Load 25 More</button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import NeutralMatch from "@/components/NeutralMatch.vue";
export default {
  components: {
    NeutralMatch,
  },
  mounted() {
    this.LoadAppendMatches(5, false);
    this.LoadEventInfo(this.selectedEventName);
  },
  data() {
    return {
      matches: [],
      loadingMatches: false,
      eventData: null,
      teams: [],
      selectedEventName: 'IEMKatowice2019',
    };
  },
  computed: {
    visibleMatches: function() {
      return this.matches;
    },
  },
  methods: {
    WatchMatch: function(match) {
      let demoviewer = this.$root.$children[0].$refs.demoviewer;
      demoviewer.Watch("", match.MatchId, 1);
    },
    LoadEventInfo: function(eventName){
      this.$api.getEvent(this.selectedEventName)
      .then(response => {
        this.event = response.data.Event;
        this.selectedEventName = this.event.EventName;
        this.teams = response.data.Teams;        
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
      });
    },
    LoadAppendMatches: function(count, isDemo) {
      this.loadingMatches = true;
      this.$api.getEventMatches(this.selectedEventName, count, this.matches.length)
      .then(response => {
        for (let i = 0; i < response.data.MatchInfos.length; i++) {
          let match = response.data.MatchInfos[i];
          match.IsVisible = false;
          this.matches.push(match);
        }
        this.loadingMatches = false;
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        this.loadingMatches = false
      });
    },
  }
};
</script>

<style lang="scss">
.view-eventmatchhistory {
  margin-top: 40px;
}

.match-history {
  .tabs-header {
    display: flex;
    font-size: 0.875rem;

    .title,
    .filter {
      color: white;
      font-weight: 500;
      font-size: 16px;
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
        color: $faceit-orange;
      }

      &.mm {
        color: $matchmaking-blue;
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

        &.source-valve>.left>.map-thumbnail{
              border-left-color: $matchmaking-blue;
        }
        
        &.source-faceit>.left>.map-thumbnail{
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
              
              &[type="3"] {
                color: white;
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
            transition: .35s;
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