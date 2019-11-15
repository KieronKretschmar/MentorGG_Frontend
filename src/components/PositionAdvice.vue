<template>
  <div class="position-advice">
    <div class="bordered-box advice">
      <p>Positions you should practice or avoid</p>
      <div v-if="(!worst.Performances || !worst.Performances.length) && !loadingComplete" class="no-positions">
        <AjaxLoader>Computing Worst Positions</AjaxLoader>
      </div>
      <div v-if="(!worst.Performances || !worst.Performances.length) && loadingComplete " class="no-positions">
        <DemoDataLoadRequest 
        @buttonClicked="LoadData(true)">
          No data available for you.
          <br>
          Wanna see where somebody else keeps dying all the time?
          </DemoDataLoadRequest>
      </div>
      <div class="position-table" v-if="worst.Performances && worst.Performances.length">
        <div class="table-header">
          <span>Map</span>
          <span>Name</span>
          <span>Team</span>
          <span>Kills</span>
          <span>Deaths</span>
        </div>
        <div class="table-content">
          <div v-for="entry in worst.Performances" :key="entry.PositionId" class="entry">
            <a class="cell link" @click="NavigateToKills(worst.RecentMatchesAnalyzedCountByMap[entry.Map], entry.Map, entry.Team==3)" >{{ entry.Map }}</a>
            <a class="cell link" @click="NavigateToKills(worst.RecentMatchesAnalyzedCountByMap[entry.Map], entry.Map, entry.Team==3, entry.ZoneId)">{{ entry.Name }}</a>
            <span class="cell">
              <img
                v-if="entry.Team == 2"
                src="@/assets/t_logo.png"
                alt="Terrorists Logo"
                title="Terrorists"
              />
              <img
                v-if="entry.Team == 3"
                src="@/assets/ct_logo.png"
                alt="Counter-Terrorists Logo"
                title="Counter-Terrorists"
              />
            </span>
            <span class="cell">{{ entry.Kills }}</span>
            <span class="cell">{{ entry.Deaths }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bordered-box advice">
      <p>Positions you are performing best in</p>
      <div v-if="(!best.Performances || !best.Performances.length) && !loadingComplete" class="no-positions">
        <AjaxLoader>Computing Best Positions</AjaxLoader>
      </div>
      <div v-if="(!best.Performances || !best.Performances.length) && loadingComplete" class="no-positions">
        <DemoDataLoadRequest 
        @buttonClicked="LoadData(true)">
          No data available for you.
          <br>
          Want to see where somebody else plays really good?
          </DemoDataLoadRequest>
      </div>
      <div class="position-table" v-if="best.Performances && best.Performances.length">
        <div class="table-header">
          <span>Map</span>
          <span>Name</span>
          <span>Team</span>
          <span>Kills</span>
          <span>Deaths</span>
        </div>
        <div class="table-content">
          <div v-for="entry in best.Performances" :key="entry.PositionId" class="entry">
            <a class="cell link" @click="NavigateToKills(best.RecentMatchesAnalyzedCountByMap[entry.Map], entry.Map, entry.Team==3)" >{{ entry.Map }}</a>
            <a class="cell link" @click="NavigateToKills(best.RecentMatchesAnalyzedCountByMap[entry.Map], entry.Map, entry.Team==3, entry.ZoneId)">{{ entry.Name }}</a>
            <span class="cell">
              <img
                v-if="entry.Team == 2"
                src="@/assets/t_logo.png"
                alt="Terrorists Logo"
                title="Terrorists"
              />
              <img
                v-if="entry.Team == 3"
                src="@/assets/ct_logo.png"
                alt="Counter-Terrorists Logo"
                title="Counter-Terrorists"
              />
            </span>
            <span class="cell">{{ entry.Kills }}</span>
            <span class="cell">{{ entry.Deaths }}</span>
          </div>
        </div>
      </div>
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
      best: [],
      worst: [],
      loadingComplete: false,
    };
  },
  methods : {
    LoadData: function(isDemo) {
      this.loadingComplete = false,
      this.$api.getImportantPositions(isDemo ? "76561198033880857" : "", true, 3, 50)
      .then(response => {
        this.best = response.data;
        this.loadingComplete = true;
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        this.loadingComplete = true;
      });

      this.$api.getImportantPositions(isDemo ? "76561198033880857" : "", false, 3, 50)
      .then(response => {
        this.worst = response.data;
        this.loadingComplete = true;
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        this.loadingComplete = true;
      });
    },
    NavigateToKills: function(matchCount = 0, map = "", showCt = true, zoneId = 0){
      let params = {
        showCt: showCt,
      };
      if(matchCount){
        params.matchCount = matchCount;
      }
      if(map){
        params.map = map;  

        if(zoneId){
          params.zoneId = zoneId;
        }
      }
      this.$router.push({ path: 'kills', query: params });
    },
  }
};
</script>

<style lang="scss">
.position-advice {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .advice {
    width: calc(50% - 5px);

    p {
      color: white;
      font-weight: 500;
    }

    .position-table {
      .table-header {
        margin-top: 20px;
        color: $orange;
        font-size: 12px;
        display: flex;

        span {
          &:nth-child(1) {
            width: 25%;
          }
          &:nth-child(2) {
            width: 30%;
          }
          &:nth-child(3) {
            width: 15%;
            text-align: center;
          }
          &:nth-child(4) {
            width: 15%;
            text-align: center;
          }
          &:nth-child(5) {
            width: 15%;
            text-align: center;
          }
        }
      }

      .table-content {
        margin-top: 10px;

        .entry {
          display: flex;
          color: white;
          font-weight: 500;
          padding: 10px 0;
          border-bottom: 1px solid $purple;
          font-size: 14px;
          align-items: center;

          &:last-child {
            border-bottom: none;
          }

          .cell {
            &:nth-child(1) {
              width: 25%;
            }
            &:nth-child(2) {
              width: 30%;
            }
            &:nth-child(3) {
              width: 15%;
              text-align: center;
            }
            &:nth-child(4) {
              width: 15%;
              text-align: center;
            }
            &:nth-child(5) {
              width: 15%;
              text-align: center;
            }
          }

          .link {
            display: flex;
            align-items: center;
            background: $dark-1;
            color: white;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            border: 1px solid $dark-1;
            transition: 0.35s;
            text-decoration: none;
            cursor: pointer;

            img {
              width: 40px;
              margin-right: 8px;    
            }

            &:hover {
              color: $orange;
            }
          }
        }
      }
    }
  }
}

//responsive
@media(max-width: 800px) {
  .position-advice {
    flex-direction: column;

    .advice {
      width: 100%;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>