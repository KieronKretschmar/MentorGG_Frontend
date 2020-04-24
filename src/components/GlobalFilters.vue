<template>
  <div class="global-filters">
    <div class="result-display">
      <p class="how-many">
        Your currently selected filters result in
        <span
          class="orange"
        >{{ $api.MatchSelector.Build().GetMatchIds().length }} matches</span> being taken into account.
      </p>
      <p
        class="note"
      >*Please note that you can only filter for maps that you have actually played matches on.</p>
    </div>

    <div class="interactive-area" data-simplebar data-simplebar-auto-hide="false">
      <div class="match-count">
        <p>Consider</p>
        <CustomSelect
          v-model="matchCount"
          :options="matchCountOptions"
          v-on:input="OnPreferedMatchCountChanged"
        ></CustomSelect>
        <p>
          matches from the following
          <span class="orange">sources</span>:
        </p>
      </div>

      <div class="sources">
        <div class="source-list">
          <div
            class="source"
            v-for="source in $api.MatchSelector.GetAvailableSourcesUnique()"
            :key="source"
            @click="OnToggleSourcesFilter(source)"
            :class="{active: $api.MatchSelector.HasSourcesFilter(source)}"
          >
            <div class="name">
              <span>{{ Enums.Source.ToString(source) }}</span>
              <i class="material-icons">check</i>
            </div>
          </div>
        </div>
      </div>

      <div class="maps">
        <div class="header-seperator">
          <div class="text">Deselect any <span class="orange">map</span> that you don't want to be considered for analysis</div>
          <button @click="$api.MatchSelector.ToggleAllMaps()">Toggle All</button>
        </div>
        <!-- <p>
          Which have been played on the following
          <span class="orange">maps*</span>:
        </p> -->
        <div class="map-list">
          <div
            class="map"
            v-for="map in $api.MatchSelector.GetAvailableMapsUnique()"
            :key="map"
            @click="OnToggleMapFilter(map)"
            :class="{active: $api.MatchSelector.HasMapFilter(map)}"
          >
            <img class="image" :src="$assetLoader.getMapPreview(map)" />
            <div class="name">
              <span>{{ map }}</span>
              <i class="material-icons">check</i>
            </div>
          </div>
        </div>
      </div>
      <IndividualMatchFilters />
    </div>
  </div>
</template>

<script>
import CustomSelect from "@/components/CustomSelect.vue";
import IndividualMatchFilters from "@/components/IndividualMatchFilters.vue";
import Enums from "@/enums";

export default {
  components: {
    CustomSelect,
    IndividualMatchFilters
  },
  mounted() {},
  data() {
    return {
      Enums,
      matchCount: "-1",
      matchCountOptions: {
        "-1": "all",
        "1": "my last",
        "10": "my last 10",
        "25": "my last 25",
        "50": "my last 50"
      }
    };
  },
  methods: {
    OnPreferedMatchCountChanged: function(n) {
      this.$api.MatchSelector.SetMatchCountFilter(+n);
    },
    OnToggleMapFilter: function(map) {
      this.$api.User.AuthorizationGate(Enums.SubscriptionStatus.Premium, () => {
        this.$api.MatchSelector.ToggleMapFilter(map);
      });
    },
    OnToggleSourcesFilter: function(source) {
      this.$api.User.AuthorizationGate(Enums.SubscriptionStatus.Premium, () => {
        this.$api.MatchSelector.ToggleSourcesFilter(source);
      });
    }
  }
};
</script>

<style lang="scss">
.global-filters {
  height: 100%;

  .result-display {
    border-bottom: 1px solid $purple;
    margin-bottom: 10px;
  }

  .interactive-area {
    max-height: 100%;
    padding-bottom: 120px;
  }

  .simplebar-vertical {
    right: -15px;
    height: calc(100% - 117px);
  }

  span.orange {
    color: $orange;
  }

  p {
    font-weight: 500;

    &.note {
      font-weight: normal;
      font-size: 14px;
    }

    &.how-many {
      font-weight: normal;
      margin-top: 0;

      .orange {
        color: $orange;
      }
    }
  }

  .header-seperator {
    background: $dark-3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    border-left: 4px solid $purple;
    padding: 10px;
    color: white;
    margin-bottom: 10px;
    margin-top: 40px;

    button {
      outline: 0;
      border: 0;
      background: $purple;
      color: white;
      border-radius: 4px;
      padding: 10px;
      cursor: pointer;
      transition: .35s;

      &:hover {
        background: $dark-4;
      }
    }
  }

  .match-count {
    display: flex;
    align-items: center;

    .custom-select {
      width: 150px;
      margin: 0 10px;
    }
  }

  .sources {
    margin-top: 10px;

    .source-list {
      display: flex;
      flex-wrap: wrap;
      margin: -5px;

      .source {
        width: calc(25% - 10px);
        position: relative;
        border-radius: 3px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        margin: 5px;
        transition: 0.65s;
        cursor: pointer;

        &.active {
          .name {
            i {
              opacity: 1;
            }
          }
        }

        &:hover,
        &.active {
          .image {
            filter: grayscale(0%);
          }
        }

        .image {
          width: 100%;
          filter: grayscale(100%);
          transition: inherit;
          object-fit: cover;
          object-position: center;
        }

        .name {
          background: $dark-2;
          color: white;
          padding: 5px 10px;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          justify-content: space-between;
          align-items: center;

          i {
            opacity: 0;
            color: $orange;
            transition: 0.65s;
          }
        }
      }
    }
  }

  .maps {
    .map-list {
      display: flex;
      flex-wrap: wrap;
      margin: -5px;

      .map {
        width: calc(25% - 10px);
        position: relative;
        border-radius: 3px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        margin: 5px;
        transition: 0.65s;
        cursor: pointer;

        &.active {
          .name {
            i {
              opacity: 1;
            }
          }
        }

        &:hover,
        &.active {
          .image {
            filter: grayscale(0%);
          }
        }

        .image {
          width: 100%;
          filter: grayscale(100%);
          transition: inherit;
        }

        .name {
          background: $dark-2;
          color: white;
          padding: 5px 10px;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          justify-content: space-between;
          align-items: center;

          i {
            opacity: 0;
            color: $orange;
            transition: 0.65s;
          }
        }
      }
    }
  }
}
</style>