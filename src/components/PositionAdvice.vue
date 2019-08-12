<template>
  <div class="position-advice">
    <div class="bordered-box advice">
      <p>Positions you should practice or avoid</p>
      <div v-if="(!worst.Performances || !worst.Performances.length) && !loadingComplete" class="no-positions">
        <AjaxLoader>Loading Worst Positions</AjaxLoader>
      </div>
      <div v-if="(!worst.Performances || !worst.Performances.length) && loadingComplete " class="no-positions">
        <NoDataAvailableDisplay 
        @buttonClicked="LoadData(true)">
          No data available for you. Wanna see where somebody else keeps dying all the time?
          </NoDataAvailableDisplay>
      </div>
      <div class="position-table" v-if="worst.Performances && worst.Performances.length">
        <div class="table-header">
          <span>Map</span>
          <span>Name</span>
          <span>Team</span>
          <span>K/D</span>
        </div>
        <div class="table-content">
          <div v-for="entry in worst.Performances" :key="entry.PositionId" class="entry">
            <span>{{ entry.Map }}</span>
            <span>{{ entry.Name }}</span>
            <span>
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
            <span>{{ entry.EstimatedKd.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bordered-box advice">
      <p>Positions you are performing best in</p>
      <div v-if="(!best.Performances || !best.Performances.length) && !loadingComplete" class="no-positions">
        <AjaxLoader>Loading Best Positions</AjaxLoader>
      </div>
      <div v-if="(!best.Performances || !best.Performances.length) && loadingComplete" class="no-positions">
        <NoDataAvailableDisplay 
        @buttonClicked="LoadData(true)">
          No data available for you. Want to see where somebody else plays really good?
          </NoDataAvailableDisplay>
      </div>
      <div class="position-table" v-if="best.Performances && best.Performances.length">
        <div class="table-header">
          <span>Map</span>
          <span>Name</span>
          <span>Team</span>
          <span>K/D</span>
        </div>
        <div class="table-content">
          <div v-for="entry in best.Performances" :key="entry.PositionId" class="entry">
            <span>{{ entry.Map }}</span>
            <span>{{ entry.Name }}</span>
            <span>
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
            <span>{{ entry.EstimatedKd.toFixed(2) }}</span>
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
      this.$api.getImportantPositions(isDemo ? "76561198033880857" : "", true, 3, 10)
      .then(response => {
        this.best = response.data;
        this.loadingComplete = true;
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        this.loadingComplete = true;
      });

      this.$api.getImportantPositions(isDemo ? "76561198033880857" : "", false, 3, 10)
      .then(response => {
        this.worst = response.data;
        this.loadingComplete = true;
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        this.loadingComplete = true;
      });
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
            width: 30%;
          }
          &:nth-child(2) {
            width: 30%;
          }
          &:nth-child(3) {
            width: 20%;
            text-align: center;
          }
          &:nth-child(4) {
            width: 20%;
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

          span {
            &:nth-child(1) {
              width: 30%;
            }
            &:nth-child(2) {
              width: 30%;
            }
            &:nth-child(3) {
              width: 20%;
              text-align: center;
            }
            &:nth-child(4) {
              width: 20%;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>