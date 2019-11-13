<template>
  <div class="dv-player-frames">
    <div class="team" :team="upperTeam.team">
      <div class="seperator"></div>
      <div class="header">
        <div class="table-head">
          <div class="col-1">
            <div
              class="score"
            >{{ upperTeam.score }}</div>
            <div class="name">Team 1</div>
          </div>
          <div class="col-2"></div>
          <div class="col-3">
            <div class="money">Money</div>
          </div>

          <div class="col-4">
            <div class="k">Kills</div>
            <div class="a">Assists</div>
            <div class="d">Deaths</div>
          </div>
        </div>
      </div>

      <PlayerFrame
        v-for="player in upperTeam.players"
        :key="player.Id"
        :player="player"
        :tick="tick"
        :equipmentInfo="equipmentInfo"
      />
    </div>

    <div class="team" :team="lowerTeam.team">
      <div class="seperator"></div>
      <div class="header">
        <div
          class="score"
        >{{ lowerTeam.score }}</div>
        <div class="name">Team 2</div>
      </div>

      <PlayerFrame
        v-for="player in lowerTeam.players"
        :key="player.Id"
        :player="player"
        :tick="tick"
        :equipmentInfo="equipmentInfo"
      />
    </div>
  </div>
</template>

<script>
import PlayerFrame from "@/components/Demoviewer/PlayerFrame.vue";

export default {
  components: {
    PlayerFrame
  },
  props: ["players", "tick", "equipmentInfo", "partialScoreboard"],
  mounted() {},
  data() {
    return {};
  },
  computed: {
    team1Players() {
      let team = [];
      for (let id in this.players) {
        let player = this.players[id];
        if (player.IsCT) {
          team.push(player);
        }
      }

      return team;
    },
    team2Players() {
      let team = [];
      for (let id in this.players) {
        let player = this.players[id];
        if (!player.IsCT) {
          team.push(player);
        }
      }

      return team;
    },
    //the following is bahne's fault
    upperTeam() {
      if (this.partialScoreboard.OriginalSide) {
        return {
          team: "ct",
          players: this.team1Players,
          score: this.partialScoreboard.CtRounds
        }
      } else {
        return {
          team: "t",
          players: this.team2Players,
          score: this.partialScoreboard.TerroristRounds
        }
      }
    },
    lowerTeam() {
      if (this.partialScoreboard.OriginalSide) {
        return {
          team: "t",
          players: this.team2Players,
          score: this.partialScoreboard.TerroristRounds
        }
      } else {
        return {
          team: "ct",
          players: this.team1Players,
          score: this.partialScoreboard.CtRounds
        }
      }
    }
  }
};
</script>

<style lang="scss">
.dv-player-frames {
  margin-top: 20px;

  .team {
    .dv-player-frame {
      &:nth-child(2n) {
        background: $dark-2;
      }
    }

    &[team="ct"] {
      .seperator,
      .header .score {
        color: $ct-color;
      }
    }

    &[team="t"] {
      .dv-player-frame {
        &:nth-child(2n + 1) {
          background: $dark-2;
        }

        &:nth-child(2n) {
          background: transparent;
        }
      }

      .seperator,
      .header .score {
        color: $terrorist-color;
      }
    }

    .header {
      display: flex;
      background: $dark-3;
      align-items: center;

      .name {
        color: white;
        font-weight: 500;
        padding-left: 10px;
        font-size: 16px;
      }

      .score {
        width: 65px;
        height: 32px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 20px;
      }

      .table-head {
        display: flex;
        color: white;
        font-weight: 400;
        font-size: 12px;
        // margin-left: 455px;

        .col-1 {
          min-width: 300px;
          width: 40%;
          display: flex;
          align-items: center;
        }

        .col-2 {
          width: 160px;
        }

        .col-3 {
          width: 60px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .col-4 {
          width: 150px;
          margin-left: 40px;
          display: flex;

          .k,
          .a,
          .d {
            width: 33.33%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }

    .seperator {
      height: 1px;
      width: 100%;
    }
  }
}
</style>