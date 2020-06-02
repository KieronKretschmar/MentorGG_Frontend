<template>
  <div class="better-situations dashboard-unit">
    <div class="advice-container">
      <div class="advice">
        <h2 class="section-header">Misplays</h2>
        <div class="bordered-box">
          <div v-if="false" class="no-situations">
            <AjaxLoader>Computing Misplays</AjaxLoader>
          </div>
          <div v-if="false" class="no-situations">
            <p>No data available</p>
          </div>
          <div class="situation-table" v-if="true">
            <div class="table-content">
              <div v-for="situation in misplays" :key="situation.type" class="entry">
                <div class="category-wrapper">
                  <div class="cell link" @click="OpenSituationDetailView(situation.type)">
                    <i class="situation-icon" :class="situation.icon"></i>
                    <span class="situation-name">{{ situation.name }}</span>
                    <span
                      class="occurences-badge"
                      :count="situation.occurences.length"
                    >{{ situation.occurences.length }}</span>
                  </div>
                  <div class="cell occurences-toggle">
                    <i
                      class="fas fa-chevron-down"
                      @click="situation.occurencesVisible = !situation.occurencesVisible"
                      :class="{toggled: situation.occurencesVisible}"
                    ></i>
                  </div>
                </div>
                <div
                  class="occurences"
                  :style="{'max-height': situation.occurencesVisible ? ((situation.occurences.length * 40) + 20 + 'px') : '0px'}"
                >
                  <div
                    v-for="occurence in situation.occurences"
                    :key="occurence.id"
                    class="occurence"
                    :style="{backgroundImage: `url( '${$assetLoader.getMapPreview('de_inferno')}')`}"
                  >
                    <div class="content">
                      <span>
                        <span class="match-date">{{ occurence.matchDate|formatDateAndTime }}</span>
                        <span class="map">{{ 'de_inferno' }}</span>
                      </span>
                      <span class="watch-wrapper">
                        <span class="round">Round {{ occurence.Round }}</span>
                        <i title="Watch in Browser" class="material-icons watch-match-icon">videocam</i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="advice">
        <h2 class="section-header">Highlights</h2>
        <div class="bordered-box">
          <div v-if="false" class="no-positions">
            <AjaxLoader>Computing Highlights</AjaxLoader>
          </div>
          <div v-if="false" class="no-positions">
            <p>No data available</p>
          </div>
          <div class="position-table" v-if="true">
            <div class="table-content">
              <div class="table-header">
                <span>Map</span>
                <span>Name</span>
                <span>Team</span>
                <span>Kills</span>
                <span>Deaths</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Enums from '@/enums';

export default {
  props: ["steamId"],
  mounted() {

    this.$api.getSituations({
      steamId: this.steamId
    }).then(result => {
      this.situations = result.data;
    });
  },
  data() {
    return {
      situations: null
    };
  },
  methods: {
    BeautifySituationName(name) {
      return name.split(/(?=[A-Z])/).join(" ");
    },
    OpenSituationDetailView(type) {
      this.$router.push({
        name: 'situation-detail',
        params: {
          type: type
        }
      });
    }
  },
  computed: {
    misplays() {
      let ret = [];

      if (this.situations == null) {
        return ret;
      }

      Object.keys(this.situations.Misplays).forEach(key => {
        let entry = this.situations.Misplays[key];

        ret.push({
          name: Enums.SituationType.ToString(entry.MetaData.SituationType),
          type: entry.MetaData.SituationType,
          occurences: entry.Situations,
          icon: 'fas fa-skull'
        });
      });

      return ret;
    }
  },
  watch: {
    steamId: function(val) {}
  }
};
</script>

<style lang="scss">
.advice-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  .advice {
    width: calc(50% - 5px);

    p {
      color: white;
      font-weight: 500;
    }

    .situation-table {
      .table-content {
        background: $dark-3;
        padding: 5px 10px;
        border-radius: 4px;

        .entry {
          display: flex;
          color: white;
          font-weight: 500;
          padding: 10px 0;
          border-bottom: 1px solid $purple;
          font-size: 14px;
          flex-direction: column;

          &:last-child {
            border-bottom: none;
          }

          .category-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .situation-icon {
              font-size: 20px;
            }

            .occurences-toggle {
              color: $orange;
              font-size: 20px;
              cursor: pointer;

              i {
                transition: 0.35s;

                &.toggled {
                  transform: rotate(180deg);
                }
              }
            }
          }

          .occurences {
            overflow: hidden;
            transition: 0.35s;

            .occurence {
              background: $purple;
              padding: 20px 10px;
              margin-bottom: 5px;
              border-radius: 4px;
              background-position: center;
              background-size: cover;
              background-repeat: no-repeat;
              position: relative;
              overflow: hidden;

              .content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(0, 0, 0, 0.5);
                color: white;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                padding: 0 10px;
              }

              &:first-child {
                margin-top: 10px;
              }

              &:last-child {
                margin-bottom: 10px;
              }

              .map,
              .match-date,
              .round {
                color: white;
                font-weight: 300;
              }

              .watch-wrapper {
                  display: flex;
                  align-items: center;

                  .round {
                      margin-right: 10px;
                  }
              }

              .match-date {
                &:after {
                  content: "//";
                  margin: 0 5px;
                }
              }

              .watch-match-icon {
                color: $orange;
                cursor: pointer;
              }
            }
          }

          .cell {
            .situation-name {
              margin-left: 10px;
            }

            .occurences-badge {
              margin-left: 10px;
              width: 26px;
              height: 26px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              background: crimson;
              color: white;

              &[count="0"] {
                background: $purple;
              }
            }
          }

          .link {
            display: flex;
            align-items: center;
            color: white;
            transition: 0.35s;
            text-decoration: none;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

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
  .advice-container {
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
          margin-right: 10px;

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