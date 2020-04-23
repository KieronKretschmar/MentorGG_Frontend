<template>
  <div class="individual-match-filters">
    <div class="header-seperator">
      <div class="text">Deselect any <span class="orange">match</span> that you don't want to be considered for analysis</div>
      <button @click="ToggleAll">Toggle All</button>
    </div>

    <div class="matches">
      <div
        class="match"
        v-for="match in $api.MatchSelector.GetMatchList()"
        :key="match.MatchId"
        @click="OnToggleBlacklist(match.MatchId)"
        :class="{active: !$api.MatchSelector.IsBlacklisted(match.MatchId)}"
      >
        <div class="bordered-box">
          <MatchHeader :map="match.Map" :matchDate="match.MatchDate" :source="match.Source" />
          <div
            class="is-considered"
            :class="{yes: IsConsidered(match.MatchId)}"
          >{{ IsConsidered(match.MatchId) ? "considered" : "ignored" }}</div>
          <div class="check">
            <i class="material-icons">check</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MatchHeader from "@/components/MatchHeader.vue";
import Enums from "@/enums";

export default {
  components: {
    MatchHeader
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {
    OnToggleBlacklist(matchId) {
      this.$api.User.AuthorizationGate(Enums.SubscriptionStatus.Premium, () => {
        this.$api.MatchSelector.ToggleBlacklist(matchId);
      });
    },
    IsConsidered(matchId) {
      return this.matchIds.indexOf(matchId) != -1;
    },
    ToggleAll() {
      this.$api.MatchSelector.ToggleAllMatches();
    }
  },
  computed: {
    matchIds() {
      return this.$api.MatchSelector.Build().GetMatchIds();
    }
  }
};
</script>

<style lang="scss">
.individual-match-filters {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      margin: 0;
    }
  }

  .bordered-box {
    margin-top: 40px;
    margin-bottom: 20px;

    color: white;

    a {
      color: $orange;
    }

    p {
      color: white;
      font-weight: 300;
    }
  }

  .matches {
    .match {
      cursor: pointer;
      filter: grayscale(100%);
      transition: 0.35s all;

      &:hover {
        .bordered-box {
          background: $dark-3;
        }
      }

      &.active {
        filter: grayscale(0%);

        .bordered-box {
          .check {
            opacity: 1;
          }
        }
      }

      .bordered-box {
        transition: 0.35s all;
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:last-child {
          margin-bottom: 0;
        }

        .match-header {
          width: 40%;
        }

        .is-considered {
          width: 20%;
          color: $red;
          font-weight: 300;
          text-align: center;
          margin-left: -360px;
          padding: 10px 40px;
          transition: 0.35s all;
          border-left: 1px solid $purple;;

          &.yes {
            color: $green;
          }
        }

        .check {
          color: $orange;
          opacity: 0;
          transition: 0.35s all;

          .material-icons {
            font-size: 30px;
            margin-top: 3px;
          }
        }
      }
    }
  }
}
</style>