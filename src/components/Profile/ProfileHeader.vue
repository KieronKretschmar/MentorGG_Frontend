<template>
  <div class="profile-header">
    <div class="fixed-width-container mc" v-if="user">
      <div class="avatar">
        <img :src="$assetLoader.getSteamProfileImageUrl(user.SteamUser.ImageUrl)" />
      </div>
      <div class="name">
        <span>
          PROFILE NAME
          <template v-if="IsFreeOrSupporter() && isOwnProfile">
            <div class="verified-indicator" :class="{verified: nameContainsVerifyString}">
              <i class="fas fa-check" v-if="nameContainsVerifyString" title="Verified"></i>
              <i
                class="fas fa-exclamation-triangle"
                v-else
                @click="OpenVerifyUsernamePopup"
                title="Not verified"
              ></i>
            </div>
          </template>
        </span>
        <span>{{ user.SteamUser.SteamName }}</span>
      </div>
      <div class="csgo-rank">
        <span>CS:GO RANK</span>
        <img :src="$assetLoader.getRankIcon(user.Rank)" alt="CS:GO Rank Image" />
      </div>

      <div
        class="mini-rank-graph"
        title="Open Rank History Graph"
        @click="EventBus.Invoke('open-rank-history-graph')"
      >
        <span>MATCHMAKING RESULTS</span>
        <LineChart
          :options="chartOptions"
          :chartData="chartData"
          class="mini-rank-graph-inner-wrapper"
          v-if="relevantGraphMatches.length"
        />
      </div>
    </div>

    <GenericOverlay ref="verifyUsernameOverlay" class="verify-username-overlay" width="900px">
      <p class="headline">Not verified as Supporter</p>
      <p>To learn more about becoming a MENTOR.GG supporter, please check the bottom of the <router-link :to="{name: 'membership'}">Membership</router-link> page.</p>
    </GenericOverlay>
  </div>
</template>

<script>
import LineChart from "@/components/Charts/LineChart.vue";
import Enums from "@/enums";
import GenericOverlay from "@/components/GenericOverlay.vue";
import EventBus from "@/EventBus";

export default {
  props: ["steamId", "recentMatchStats"],
  components: {
    LineChart,
    GenericOverlay
  },
  mounted() {
    this.Init();
  },
  methods: {
    Init() {
      this.$api.getPlayerInfo({
        steamId: this.steamId
      }).then(response => {
        this.user = response.data;
      });
    },
    OpenVerifyUsernamePopup() {
      this.$refs.verifyUsernameOverlay.Show();
    },
    IsFreeOrSupporter() {
      if (!this.$api.User) {
        return true;
      }

      return (
        this.$api.User.subscriptionStatus == Enums.SubscriptionStatus.Free ||
        this.$api.User.subscriptionStatus == Enums.SubscriptionStatus.Influencer
      );
    }
  },
  data() {
    return {
      EventBus,
      Enums,
      user: null,
      verifyingUsername: false,
      chartOptions: {
        tooltips: {
          enabled: false
        },
        hover: {
          animationDuration: 0
        },
        layout: {
          padding: {
            top: 5,
            left: 5,
            bottom: 5,
            right: 5
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              display: false,
              gridLines: {
                zeroLineColor: "#444"
                // zeroLineWidth: 1
              },
              ticks: {
                beginAtZero: true,
                stepValue: 1,
                stepSize: 1,
                padding: 40
              }
            }
          ],
          xAxes: [
            {
              display: false
            }
          ]
        },
        legend: {
          display: false
        }
      }
    };
  },
  computed: {
    relevantGraphMatches() {
      if (!this.recentMatchStats) {
        return [];
      }

      let matches = this.recentMatchStats.Matches.filter(match => {
        return match.Source == Enums.Source.Valve;
      }).reverse();

      //9 instead of 10 because we start at 0
      return matches.slice(Math.max(matches.length - 9, 0));
    },
    graphData() {
      let wins = 0;
      let data = [0];

      for (let match of this.relevantGraphMatches) {
        switch (match.PlayerMatchOutcome) {
          case Enums.WinTieLoss.Win:
            wins++;
            break;
          case Enums.WinTieLoss.Loss:
            wins--;
            break;
        }

        data.push(wins);
      }      

      return data;
    },
    chartLabels() {
      let labels = [];

      for (let i = 0; i < this.graphData.length; i++) {
        labels.push(i + 1);
      }

      return labels;
    },
    chartData() {
      return {
        labels: this.chartLabels,
        datasets: [
          {
            label: "W/L balance",
            backgroundColor: "#ff4800",
            borderColor: "#39384a",
            data: this.graphData,
            fill: false,
            lineTension: 0
          }
        ]
      };
    },
    isOwnProfile() {
      if (!this.user || !this.$api.User) {
        return false;
      }

      return this.steamId == this.$api.User.GetSteamId(false);
    },
    nameContainsVerifyString() {
      if (!this.user) {
        return false;
      }

      return (
        this.user.SteamUser.SteamName.toLowerCase().indexOf("mentor.gg") != -1
      );
    },
  },
  watch: {
    steamId: function(val) {
      this.Init();
    }
  }
};
</script>

<style lang="scss">
.profile-header {
  background: $dark-3;
  padding: 40px 20px;
  border-bottom: 1px solid $purple;
  padding-bottom: 69px;

  .fixed-width-container {
    display: flex;
    align-items: center;

    .avatar {
      border-radius: 5px;
      overflow: hidden;
      width: 110px;
      height: 110px;
      flex: 0 0 110px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .name {
      display: flex;
      flex-direction: column;
      margin-left: 25px;
      padding-right: 25px;
      border-right: 1px solid $purple;
      height: 80px;
      justify-content: center;

      span {
        margin: 5px 0;

        &:first-child {
          color: $orange;
          font-size: 12px;
          display: flex;
          align-items: center;

          .verified-indicator {
            margin-left: 5px;
            color: $red;
            cursor: pointer;
            font-size: 18px;

            &.verified {
              color: $green;
              cursor: default;
            }
          }
        }

        &:last-child {
          color: white;
          font-size: 1.75rem;
          font-weight: 700;
          display: inline-block;
          max-width: 300px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }

    .csgo-rank {
      display: flex;
      flex-direction: column;
      margin: 0 25px;
      text-align: center;

      span {
        margin: 5px 0;

        &:first-child {
          color: $orange;
          font-size: 12px;
        }
      }

      img {
        height: 44px;
        margin: 5px 0;
      }
    }

    .mini-rank-graph {
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      font-size: 12px;
      color: $orange;
      width: 200px;
      height: 80px;
      border-left: 1px solid $purple;
      padding-left: 25px;

      span {
        margin: 5px 0;
      }

      .mini-rank-graph-inner-wrapper {
        height: 44px;
        margin: 5px 0;
        padding: 5px;
        border: 1px solid transparent;
        border-radius: 4px;
        cursor: pointer;
        transition: 0.35s;

        &:hover {
          border: 1px solid $purple;
          background: $dark-1;
        }
      }
    }
  }
}

//responsive
@media (max-width: 870px) {
  .profile-header {
    .fixed-width-container {
      .avatar {
        flex: 0 0 60px;
        height: 60px;
      }

      .name {
        span {
          &:last-child {
            font-size: 1.35rem;
          }
        }
      }

      .csgo-rank {
        img {
          height: 26px;
        }
      }

      .mini-rank-graph {
        .mini-rank-graph-inner-wrapper {
          height: 26px;
        }
      }
    }
  }
}

@media (max-width: 730px) {
  .profile-header {
    .fixed-width-container {
      flex-wrap: wrap;

      .csgo-rank {
        margin-right: 0;
      }

      .mini-rank-graph {
        width: 100%;
        border: 0;
        margin: 0;
        padding: 0;
        margin-top: 30px;

        .mini-rank-graph-inner-wrapper {
          height: 80px;
          border: 1px solid $purple;
          background: $dark-1;
        }
      }
    }
  }
}

@media (max-width: 600px) {
  .profile-header {
    .fixed-width-container {
      .name {
        span {
          &:last-child {
            font-size: 1rem;
            max-width: 200px;
          }
        }
      }
    }
  }
}

@media (max-width: 420px) {
  .profile-header {
    .fixed-width-container {
      justify-content: center;

      .name {
        padding: 0;
        border: 0;

        span:first-child {
          display: none;
        }
      }

      .csgo-rank {
        margin-left: 0;
        width: 100%;
        align-items: center;
        border-top: 1px solid $purple;
        border-bottom: 1px solid $purple;
        padding-top: 10px;
        padding-bottom: 10px;

        img {
          max-width: 120px;
          height: auto;
        }
      }
    }
  }
}
</style>