<template>
  <div class="match-history dashboard-unit">
    <h2 class="section-header">Match History</h2>
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
    </div>

    <div class="match-list">
      <div v-if="!loadingMatches && analyzedMatches.length == 0" class="bordered-box no-matches">
        <p>No data available</p>
      </div>

      <template v-if="!loadingMatches">
        <div v-for="match in visibleMatches" :key="match.MatchId">
          <!-- TODO: insert actual values for :isAboveLimit and :failed -->
          <PersonalMatch
            :match="match"
            :isAboveLimit="IsAboveLimit(match)"
            :failed="MatchFailed(match)"
            :steamId="steamId"
          />
        </div>
      </template>

      <div v-if="loadingMatches">
        <div class="bordered-box no-matches">
          <AjaxLoader>Loading Matches</AjaxLoader>
        </div>
      </div>
    </div>
    <div class="match-history-controls" v-if="!loadingMatches">
      <button
        class="button-variant-bordered purple"
        @click="LoadAppendMatches(5, false)"
      >Load 5 More</button>
      <button
        class="button-variant-bordered purple"
        @click="LoadAppendMatches(25, false)"
      >Load 25 More</button>
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
      if (this.activeTab == "all") {
        return this.allRelevantMatches;
      }
      if (this.activeTab == "valve") {
        return this.allRelevantMatches.filter(
          x => x.Source == Enums.Source.Valve
        );
      }
      if (this.activeTab == "faceit") {
        return this.allRelevantMatches.filter(
          x => x.Source == Enums.Source.Faceit
        );
      }
    }
  },
  methods: {
    Init() {
      this.LoadAppendMatches(5);
      this.LoadFailedMatches();
    },
    IsAboveLimit: function(match) {
      return match.MatchId < 0;
    },
    MatchFailed: function(match) {
      return this.failedMatches.some(x => x.MatchId == match.MatchId);
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
  .tabs-header {
    width: 300px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    font-size: 0.875rem;

    border-radius: 4px;
    overflow: hidden;

    .filter {
      text-align: center;
      flex-grow: 1;
      background-color: $dark-1;
      color: white;
      padding: 5px;

      font-weight: 600;


      cursor: pointer;
      transition: 0.3s all;

      &:hover,
      &.active {
        color: white;
        
      }

      &.all {
        &:hover,
        &.active{
          background-color: white;
          color: $dark-1
        }
        color: white;
      }

      &.faceit {
        &:hover,
        &.active{
          background-color: $faceit-orange;
        }
      }

      &.mm {
        &:hover,
        &.active{
          background-color: $matchmaking-blue;
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
@media (max-width: 800px) {
  .match-history {
    .tabs-header {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
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