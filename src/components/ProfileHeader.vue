<template>
  <div class="profile-header">
    <div class="fixed-width-container mc" v-if="user">
      <div class="avatar">
        <img :src="$assetLoader.getSteamProfileImageUrl(user.SteamUser.ImageUrl)" />
      </div>
      <div class="name">
        <span>
          PROFILE NAME
          <template
            v-if="$api.User.subscriptionStatus == Enums.SubscriptionStatus.Free && isOwnProfile"
          >
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
        @click="$emit('openRankHistoryGraph')"
      >
        <span>MATCHMAKING RESULTS</span>
        <LineChart
          :options="chartOptions"
          :data="chartData"
          class="mini-rank-graph-inner-wrapper"
          v-if="relevantGraphMatches.length"
        />
      </div>
    </div>

    <GenericOverlay ref="verifyUsernameOverlay" class="verify-username-overlay" width="900px">
      <p class="headline">Not verified as Supporter</p>
      <div class="step">
        <span class="num">1</span> Put
        <span class="highlight">MENTOR.GG</span> (case-insensitive) in your steam player name.
      </div>
      <div class="step">
        <span class="num">2</span> Click the "Verify" button below to start the verification process.
      </div>
      <div class="step">
        <span class="num">3</span> You now have access to all the benefits that come with being a Supporter.
      </div>

      <button
        class="button-variant-bordered"
        :disabled="verifyingUsername"
        @click="VerifyUsername"
      >{{ verifyingUsername ? 'Verifying username..' : 'Verify' }}</button>
      <!-- <p>Your player name can be changed at any time in your Steam Community settings, under "Edit my SteamID page".</p> -->
      <p class="headline">Benefits</p>
      <p>Supporters get to see their misplays and highlights for 4 additional rounds per match.</p>
    </GenericOverlay>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart.vue";
import Enums from "@/enums";
import GenericOverlay from "@/components/GenericOverlay.vue";

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
      let params = {
        steamId: this.steamId //this.$api.User.GetSteamId()
      };

      this.$api.getPlayerInfo(params).then(response => {
        this.user = response.data;
        console.log(this.user);
      });
    },
    OpenVerifyUsernamePopup() {
      this.$refs.verifyUsernameOverlay.Show();
    },
    VerifyUsername() {
      this.verifyingUsername = true;

      this.$api
        .getPlayerInfo({ steamId: this.steamId }, true)
        .then(response => {
          this.verifyingUsername = false;
          this.$refs.verifyUsernameOverlay.Hide();

          setTimeout(() => {
            this.$emit('force-reload');
          }, 350);


        });
    }
  },
  data() {
    return {
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
    nameContainsVerifyString() {
      if (!this.user) {
        return false;
      }

      return (
        this.user.SteamUser.SteamName.toLowerCase().indexOf("mentor.gg") != -1
      );
    },
    isOwnProfile() {
      if (!this.user) {
        return false;
      }

      return this.steamId == this.$api.User.GetSteamId(false);
    }
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
  padding: 40px 0px;
  border-bottom: 1px solid $purple;
  padding-bottom: 90px;

  .fixed-width-container {
    display: flex;
    align-items: center;

    .avatar {
      border-radius: 5px;
      overflow: hidden;

      img {
        width: 110px;
        height: 110px;
      }
    }

    .name {
      display: flex;
      flex-direction: column;
      margin-left: 25px;
      padding-right: 100px;
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
      font-size: 12px;
      color: $orange;
      width: 200px;
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

  .verify-username-overlay {
    .step {
      display: flex;
      align-items: center;
      color: white;
      margin-bottom: 10px;

      .highlight {
        color: $orange;
        font-weight: 500;
        margin: 0 5px;
      }

      .num {
        width: 30px;
        height: 30px;
        background: $dark-2;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        margin-right: 5px;
        color: white;
      }
    }

    button {
      margin-bottom: 20px;
      width: 200px;
    }
  }
}

//responsive
@media (max-width: 800px) {
  .profile-header {
    padding: 20px 0 0 0;
    border-bottom: 1px solid $purple;
    padding-bottom: 90px;

    .fixed-width-container {
      align-items: flex-start;
      height: 60px;

      .avatar {
        border-radius: 5px;
        overflow: hidden;

        img {
          max-width: 60px;
          height: 60px;
        }
      }

      .name {
        margin-left: 10px;
        padding-right: 10px;
        border-right: none;
        height: 60px;
        max-width: 125px;

        span {
          margin: 5px;

          &:first-child {
            font-size: 10px;
          }

          &:last-child {
            font-size: 12px;
            font-weight: 700;
          }
        }
      }

      .csgo-rank {
        display: flex;
        flex-direction: column;
        margin-left: 0;
        padding-left: 10px;
        text-align: center;
        border-left: 1px solid $purple;
        max-width: 125px;
        height: 60px;

        span {
          margin: 5px 0;

          &:first-child {
            font-size: 10px;
          }
        }

        img {
          height: 30px;
        }
      }
    }
  }
}
</style>