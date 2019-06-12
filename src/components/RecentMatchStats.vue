<template>
  <div class="recent-match-stats">
    <div class="bordered-box">
      <AjaxLoader v-if="!recentMatchStats">Loading Recent Match Stats</AjaxLoader>
      <div class="stats" v-if="recentMatchStats">
        <div class="stat">
          <div class="val">107</div>
          <div class="txt">Matches uploaded</div>
        </div>
        <div class="stat">
          <div class="val">{{ recentMatchStats.KillDeathRatio.toFixed(2) }}</div>
          <div class="txt">K/D Ratio</div>
        </div>
        <div class="stat">
          <div class="val">{{ recentMatchStats.AverageHLTVRating.toFixed(2) }}</div>
          <div class="txt">HLTV Rating</div>
        </div>
        <div class="stat">
          <div class="val">{{ Winrate.toFixed(0) }}%</div>
          <div class="txt">Winrate</div>
        </div>
        <div class="stat">
          <div class="val">30%</div>
          <div class="txt">Headshot %</div>
        </div>
        <div class="stat">
          <div class="val" :class="RankBalanceClass">{{ Math.abs(RankBalance) }}</div>
          <div class="txt">Rank Balance</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$api.getRecentMatchData().then(response => {
      this.recentMatchStats = response.data;
      console.log(response);
    });
  },
  data() {
    return {
      recentMatchStats: null
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
      return this.recentMatchStats.GamesWonAfterRankChange - this.recentMatchStats.GamesLostAfterRankChange;
    },
    RankBalanceClass: function() {
      if ( this.RankBalance < 0 ) {
        return 'n';
      }

      if ( this.RankBalance > 0 ) {
        return 'p';
      }

      return 'e';
    }
  }
};
</script>

<style lang="scss">
.recent-match-stats {
  margin-bottom: 20px;
  margin-top: -64px;
  
  .bordered-box {
    padding: 30px 50px;
  }

  .stats {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .stat {
      display: flex;
      flex-direction: column;
      text-align: center;

      .val {
        font-size: 2.25rem;
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
      }

      .txt {
        font-size: 12px;
        margin-top: .5em;
        color: white;
      }
    }
  }
}
</style>