<template>
  <div class="match-history dashboard-unit">
    <div class="section-header">
      <h2>Match History</h2>
      <div class="tabs-header">
        <span
          :class="{ active: activeTab == 'all' }"
          @click="activeTab = 'all'"
          class="filter all"
        >All</span>
        <span
          :class="{ active: activeTab == 'valve' }"
          @click="activeTab = 'valve'"
          class="filter mm"
        >Matchmaking</span>
        <span
          :class="{ active: activeTab == 'faceit' }"
          @click="activeTab = 'faceit'"
          class="filter faceit"
        >Faceit</span>
        <span
          :class="{ active: activeTab == 'manual' }"
          @click="activeTab = 'manual'"
          class="filter manual"
        >Manual Upload</span>
      </div>
    </div>

    <div class="match-list">
      <div v-if="!loadingMatches && analyzedMatches.length == 0" class="bordered-box no-matches">
        <p>No data available</p>
      </div>

      <template v-if="!loadingMatches">
        <div v-for="match in visibleMatches" :key="match.MatchId">
          <!-- TODO: insert actual values for :isAboveLimit and :failed -->
          <PersonalMatch :match="match" :matchStatus="MatchStatus(match)" :steamId="steamId" />
        </div>
      </template>

      <div v-if="loadingMatches">
        <div class="bordered-box no-matches">
          <AjaxLoader>Loading Matches</AjaxLoader>
        </div>
      </div>
    </div>
    <div class="match-history-controls" v-if="!loadingMatches">
      <button class="button-variant-bordered" @click="LoadAppendMatches(5, false)">Load 5 More</button>
      <button class="button-variant-bordered" @click="LoadAppendMatches(25, false)">Load 25 More</button>
    </div>
  </div>
</template>

<script>
import PersonalMatch from "@/components/PersonalMatch.vue";
import Enums from "@/enums";

export default {
  props: ["steamId"],
  components: {
    PersonalMatch
  },
  mounted() {
    this.Init();
  },
  data() {
    return {
      analyzedMatches: [],
      failedMatches: [],
      activeTab: "all",
      loadingMatches: false,
      desiredVisibleMatchesCount: 0
    };
  },
  computed: {
    allRelevantMatches: function() {
      // return the desiredVisibleMatchesCount newest matches, including failed matches
      let allMatches = this.analyzedMatches.concat(this.failedMatches);
      let sorted = allMatches.sort(
        (a, b) => new Date(b.MatchDate) - new Date(a.MatchDate)
      );

      return sorted.slice(0, this.desiredVisibleMatchesCount);
    },
    visibleMatches: function() {
      let assocs = {
        valve: Enums.Source.Valve,
        faceit: Enums.Source.Faceit,
        manual: Enums.Source.ManualUpload
      };

      if (this.activeTab == "all") {
        return this.allRelevantMatches;
      } else {
        return this.allRelevantMatches.filter(
          x => x.Source == assocs[this.activeTab]
        );
      }
    }
  },
  methods: {
    Init() {
      this.LoadAppendMatches(5);

      // load failed matches only if the user is on his own profile
      if (this.$api.User.GetSteamId() == this.steamId) {
        this.LoadFailedMatches();
      }
    },
    MatchStatus: function(match) {
      if (this.failedMatches.some(x => x.MatchId == match.MatchId)) {
        return Enums.MatchStatus.Failed;
      } else if (match.MatchId > 0) {
        return Enums.MatchStatus.Success;
      }

      let age = Math.abs(new Date() - new Date(match.MatchDate));
      // At this point we have only free users' censored matches, either because they're older than 2 weeks or above daily limit
      const maxAgeInMilliseconds = 2 * 7 * 24 * 60 * 60 * 1000;
      if (age > maxAgeInMilliseconds) {
        return Enums.MatchStatus.TooOld;
      } else {
        return Enums.MatchStatus.AboveDailyLimit;
      }
    },
    LoadFailedMatches: function() {
      this.loadingMatches = true;

      let params = {
        steamId: this.steamId,
        count: 1000, // just load all at once
        offset: 0
      };
      this.$api.getFailedDemos(params).then(response => {
        response.data.Entries.forEach(element => {
          this.failedMatches.push(element);
        });
      });
    },
    LoadAppendMatches: function(count) {
      this.loadingMatches = true;

      let params = {
        steamId: this.steamId, //this.$api.User.GetSteamId(),
        count: count,
        offset: this.analyzedMatches.length
      };
      this.$api
        .getMatches(params)
        .then(response => {
          for (let i = 0; i < response.data.MatchInfos.length; i++) {
            let match = response.data.MatchInfos[i];
            match.IsVisible = false;
            this.analyzedMatches.push(match);
          }
          this.desiredVisibleMatchesCount += count;
          this.loadingMatches = false;
        })
        .catch(error => {
          console.error(error); // eslint-disable-line no-console
          this.loadingMatches = false;
        });
    }
  },
  watch: {
    steamId: function(val) {
      this.failedMatches = [];
      this.analyzedMatches = [];
      this.Init();
    }
  }
};
</script>

<style lang="scss">
.match-history {
  .section-header {
    background-color: $dark-3;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    h2 {
      margin: 0;
      line-height: 1.5em;
    }
  }

  .tabs-header {
    width: 400px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    font-size: 0.875rem;

    border-radius: 4px;
    border: 1px solid $purple;
    overflow: hidden;

    .filter {
      text-align: center;

      flex-grow: 1;
      background-color: $dark-1;
      color: white;
      padding: 5px;

      font-weight: 600;

      cursor: pointer;
      transition: 0.3s ease-out;

      &.all,
      &.mm,
      &.faceit {
        border-right: 1px solid $purple;
      }

      &:hover,
      &.active {
        color: white;
      }

      &.all {
        &:hover,
        &.active {
          background-color: white;
          color: $dark-1;
        }
        color: white;
      }

      &.faceit {
        &:hover,
        &.active {
          background-color: $faceit-orange;
        }
      }

      &.mm {
        &:hover,
        &.active {
          background-color: $matchmaking-blue;
        }
      }

      &.manual {
        &:hover,
        &.active {
          background-color: $red;
        }
      }
    }
  }

  .match-list {
    .no-matches {
      margin-top: 10px;
      color: white;
    }
  }
}

.match-history-controls {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;

  button {
    font-size: 12px;
    &:first-child {
      margin-right: 10px;
    }
  }
}

//responsive
@media (max-width: 600px) {
  .match-history {
    .section-header {
      flex-direction: column;
      justify-content: center;
    }

    .tabs-header {
      width: 250px;
      margin: 10px auto;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;

      span:not(:last-child) {
        line-height: 30px;
      }
    }

    .match-list {
      .no-matches {
        margin-top: 10px;
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
}
</style>