<template>
  <div class="match-history">
    <div class="bordered-box tabs-header">
      <span class="title">Match History:</span>
      <span :class="{ active: activeTab == 'all' }" @click="activeTab = 'all'" class="filter all">All</span>
      <span :class="{ active: activeTab == 'valve' }" @click="activeTab = 'valve'" class="filter mm">Matchmaking</span>
      <span :class="{ active: activeTab == 'faceit' }" @click="activeTab = 'faceit'" class="filter faceit">Faceit</span>
    </div>

    <div class="match-list">      
      <div v-if="!loadingMatches && matches.length == 0" class="bordered-box no-comparisons">
        <DemoDataLoadRequest 
        @buttonClicked="LoadAppendMatches(5, true)">
          Couldn't find any matches for you.
          <br>
          Want so see what it looks like once you've understood how to upload demos?
          </DemoDataLoadRequest>
      </div>



      <div v-for="match in visibleMatches" :key="match.MatchId">
        <PersonalMatch 
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
</template>

<script>
import PersonalMatch from "@/components/PersonalMatch.vue";
export default {
  components: {
    PersonalMatch,
  },
  mounted() {
    this.LoadAppendMatches(5, false);
  },
  data() {
    return {
      matches: [],
      activeTab: 'all',
      loadingMatches: false,
    };
  },
  computed: {
    visibleMatches: function() {
      if(this.activeTab == 'all'){
        return this.matches;
      }
      if(this.activeTab == 'valve'){
        return this.matches.filter(x=>x.Source=="Valve");
      }
      if(this.activeTab == 'faceit'){
        return this.matches.filter(x=>x.Source=="Faceit");
      }
    },
  },
  methods: {
    LoadAppendMatches: function(count, isDemo) {
      this.loadingMatches = true;
      this.$api.getMatches(isDemo ? "76561198033880857" : "", count, this.matches.length)
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