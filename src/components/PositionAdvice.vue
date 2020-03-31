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
            <a class="cell link" @click="NavigateToKills(entry.Map, entry.Team==3)" >{{ entry.Map }}</a>
            <a class="cell link" @click="NavigateToKills(entry.Map, entry.Team==3, entry.ZoneId)">{{ entry.ZoneName }}</a>
            <span class="cell">
              <img
                v-if="!entry.IsCtZone"
                src="@/assets/t_logo.png"
                alt="Terrorists Logo"
                title="Terrorists"
              />
              <img
                v-if="entry.IsCtZone"
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
            <a class="cell link" @click="NavigateToKills(entry.Map, entry.Team==3)" >{{ entry.Map }}</a>
            <a class="cell link" @click="NavigateToKills(entry.Map, entry.Team==3, entry.ZoneId)">{{ entry.ZoneName }}</a>
            <span class="cell">
              <img
                v-if="!entry.IsCtZone"
                src="@/assets/t_logo.png"
                alt="Terrorists Logo"
                title="Terrorists"
              />
              <img
                v-if="entry.IsCtZone"
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
  props: ['steamId'],
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
      this.loadingComplete = false;
      this.best = [];
      this.worst = [];

      // Load best positions
      let params = {
        steamId: isDemo ? "76561198033880857" : this.steamId,//this.$api.User.GetSteamId(),
        count: 3,
        showBest: true
      };
      this.$api.getImportantPositions(params)
      .then(response => {
        this.formatResponse(response.data)
        this.best = response.data;
        this.loadingComplete = true;
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        this.loadingComplete = true;
      });

      // Load worst positions
      params = {
        steamId: isDemo ? "76561198033880857" : this.steamId,//this.$api.User.GetSteamId(),
        count: 3,
        showBest: false
      };
      this.$api.getImportantPositions(params)
      .then(response => {
        this.formatResponse(response.data)
        this.worst = response.data;
        this.loadingComplete = true;
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        this.loadingComplete = true;
      });
    },
    NavigateToKills: function(map = "", showCt = true, zoneId = 0){
      let params = {
        showCt: showCt,
      };
      if(map){
        params.map = map;  

        if(zoneId){
          params.zoneId = zoneId;
        }
      }
      this.$router.push({ path: 'kills', query: params });
    },
    // Formats json response by writing data from ZoneInfos into the corresponding Performances
    formatResponse(data){
      for (let performance of data.Performances){
        let zoneInfo = data.ZoneInfos[performance.ZoneId];
        performance["ZoneName"] = zoneInfo.Name;
        performance["Map"] = zoneInfo.MapString;
      }
    }
  },
  watch: {
    steamId: function(val) {
      this.LoadData(false);
    }
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
@media (max-width: 800px) {
  .position-advice {
    flex-direction: column;

    .advice {
      width: 100%;
      margin-bottom: 10px;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;

      &:last-child {
        margin-bottom: 0;
      }

      .position-table {
        min-width: 580px;
        .table-header {
          margin-right: 25px;

          span {
            &:nth-child(n + 1) {
              width: 140px;
            }
            &:nth-child(n + 3) {
              width: 100px;
              text-align: center;
            }
          }
        }

        .table-content {
          margin-top: 10px;

          .entry {
            margin-right: 25px;
            font-size: 12px !important;

            &:last-child {
              border-bottom: none;
            }

            .cell {
              &:nth-child(n + 1) {
                width: 140px;
              }
              &:nth-child(n + 3) {
                width: 100px;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>