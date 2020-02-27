<template>
  <div class="match-history">
    <div class="bordered-box tabs-header">
      <span class="title">Match History:</span>
      <span :class="{ active: activeTab == 'all' }" @click="activeTab = 'all'" class="filter all">All</span>
      <span :class="{ active: activeTab == 'valve' }" @click="activeTab = 'valve'" class="filter mm">Matchmaking</span>
      <span :class="{ active: activeTab == 'faceit' }" @click="activeTab = 'faceit'" class="filter faceit">Faceit</span>
    </div>

    <div class="match-list">      
      <div v-if="!loadingMatches && analyzedMatches.length == 0" class="bordered-box no-matches">
        <DemoDataLoadRequest 
        @buttonClicked="LoadAppendMatches(5, true)">
          Couldn't find any matches for you.
          <br>
          Want so see what it looks like once you've understood how to upload demos?
          </DemoDataLoadRequest>
      </div>



      <div v-for="match in visibleMatches" :key="match.MatchId">
        <!-- TODO: insert actual values for :isAboveLimit and :failed -->
        <PersonalMatch 
          :match="match"
          :isAboveLimit="IsAboveLimit(match)"
          :failed="MatchFailed(match)"
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
</template>

<script>
import PersonalMatch from "@/components/PersonalMatch.vue";
import Enums from "@/enums";

export default {
  components: {
    PersonalMatch,
  },
  mounted() {
    this.LoadAppendMatches(5, false);
  },
  data() {
    return {
      analyzedMatches: [],
      // TODO Kieron: Replace stub with real data from democentral
      failedMatches: [
        {"MatchId" : 101, "Source" : 2 , "MatchDate" : "2019-02-03T14:37:47.231352"},
        {"MatchId" : 102, "Source" : 3 , "MatchDate" : "2021-02-03T14:37:47.231352"}
      ],
      activeTab: 'all',
      loadingMatches: false,
      desiredVisibleMatchesCount: 0,
    };
  },
  computed: {
    allRelevantMatches: function() {
      // return the desiredVisibleMatchesCount newest matches, including failed matches
      let allMatches = this.analyzedMatches.concat(this.failedMatches);
      let sorted = allMatches.sort((a,b)=>new Date(b.MatchDate)-new Date(a.MatchDate));
      return sorted.slice(0,this.desiredVisibleMatchesCount);
    },
    visibleMatches: function() {
      console.log(this.allRelevantMatches);
      if(this.activeTab == 'all'){
        return this.allRelevantMatches;
      }
      if(this.activeTab == 'valve'){
        return this.allRelevantMatches.filter(x=>x.Source==Enums.Source.Valve);
      }
      if(this.activeTab == 'faceit'){
        return this.allRelevantMatches.filter(x=>x.Source==Enums.Source.Faceit);
      }
    },
  },
  methods: {
    IsAboveLimit: function(match){
      return match.MatchId < 0;
    },
    MatchFailed: function(match){
      return this.failedMatches.some(x=>x.MatchId == match.MatchId);
    },
    LoadAppendMatches: function(count, isDemo) {
      this.loadingMatches = true;
      let params = {
        steamId: isDemo ? "76561198033880857" : this.$api.User.GetSteamId(),
        count: count,
        offset: this.analyzedMatches.length
      }
      this.$api.getMatches(params)
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
        this.loadingMatches = false
      });
    },
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