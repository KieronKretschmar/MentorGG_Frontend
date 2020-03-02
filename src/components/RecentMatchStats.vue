<template>
  <div class="recent-match-stats">
    <div class="bordered-box">
      <AjaxLoader v-if="!loadingComplete">Computing Recent Match Stats</AjaxLoader>
      <div class="stats" v-if="recentMatchStats">
        <div class="stat">
          <div class="val">{{recentMatchStats.GamesTotal}}</div>
          <div class="txt">Matches</div>
        </div>
        <div class="stat">
          <div class="val">{{ recentMatchStats.KillDeathRatio.toFixed(2) }}</div>
          <div class="txt">K/D Ratio</div>
        </div>
        <div class="stat">
          <div class="val">{{ recentMatchStats.AverageHltvRating.toFixed(2) }}</div>
          <div class="txt">HLTV Rating</div>
        </div>
        <div class="stat">
          <div class="val">{{ Winrate.toFixed(0) }}%</div>
          <div class="txt">Winrate</div>
        </div>
        <div class="stat">
          <div class="val">{{(recentMatchStats.HsKills / recentMatchStats.Kills * 100).toFixed(0) + '%'}}</div>
          <div class="txt">Headshot</div>
        </div>
        <div class="stat">
          <div class="val" :class="RankBalanceClass">
            {{  (0 > RankBalance ? "-" : "+") + Math.abs(RankBalance) }}
            <!-- <i class="material-icons" @click="OpenRankGraph">timeline</i> -->
          </div>
          <div class="txt">W/L balance on this rank</div>
          <!-- Not using below, because the player may have never changed ranks since he started uploading matches. -->
          <!-- <div class="txt">W/L balance since {{recentMatchStats.RecentRankChangeWasUprank ? 'up' : 'down'}}rank</div> -->
        </div>
      </div>
    </div>
    <div class="rank-graph-overlay" v-if="rankGraphVisible" @click="rankGraphVisible = false">
      <div class="fixed-width-container"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.LoadData(false);
  },
  data() {
    return {
      recentMatchStats: null,
      rankGraphVisible: false,
      loadingComplete: false,
    };
  },
  computed: {
    Winrate: function() {
      return (
        (this.recentMatchStats.GamesWon /
          (this.recentMatchStats.GamesWon + this.recentMatchStats.GamesLost)) *
        100
      );
    },
    RankBalance: function() {
      return (
        this.recentMatchStats.GamesWonAfterRankChange -
        this.recentMatchStats.GamesLostAfterRankChange
      );
    },
    RankBalanceClass: function() {
      if (this.RankBalance < 0) {
        return "n";
      }

      if (this.RankBalance > 0) {
        return "p";
      }

      return "e";
    }
  },
  methods: {
    OpenRankGraph: function() {
      this.rankGraphVisible = true;
    },
    LoadData: function(isDemo) {
      let params = {
        steamId: this.$api.User.GetSteamId()
      };
      this.$api.getRecentMatchData(params)
      .then(response => {
        this.recentMatchStats = response.data;
          this.loadingComplete = true;
        })
        .catch(error => {
        console.error(error); // eslint-disable-line no-console
          this.loadingComplete = true;
        });
    },
  }
};
</script>

<style lang="scss">
.recent-match-stats {
  margin-bottom: 20px;
  margin-top: -64px;

  .bordered-box {
    padding: 20px 50px;
  }

  .stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .stat {
      display: flex;
      flex-direction: column;
      text-align: center;
      margin: 10px;

      .val {
        font-size: 1.75rem;
        font-weight: 700;
        color: white;

        &.p {
          color: $green;
        }

        &.n {
          color: $red;
        }

        &.e {
          color: $purple;
        }

        i {
          color: $orange;
          cursor: pointer;
        }
      }

      .txt {
        font-size: 12px;
        margin-top: 0.5em;
        color: white;
      }
    }
  }

  .rank-graph-overlay {
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

//responsive
@media (max-width: 800px) {
  .recent-match-stats {
    margin-bottom: 20px;
    margin-top: -64px;

  .bordered-box {
    padding: 20px 20px;
  }

  .stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .stat {
      display: flex;
      flex-direction: column;
      text-align: center;
      margin: 10px;
      flex: 1 1 43%;
    }
  }

}
}
</style>