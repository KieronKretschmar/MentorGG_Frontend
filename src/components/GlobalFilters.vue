<template>
  <div class="global-filters">
    <div class="match-count">
      <p>Consider</p>
      <CustomSelect
        v-model="matchCount"
        :options="matchCountOptions"
        v-on:input="OnPreferedMatchCountChanged"
      ></CustomSelect>
      <p>matches from the following <span class="orange">sources</span>:</p>
    </div>

    <div class="sources">
      <div class="source-list">
        <div
          class="source"
          v-for="source in $api.MatchSelector.GetAvailableSourcesUnique()"
          :key="source"
          @click="$api.MatchSelector.ToggleSourcesFilter(source)"
          :class="{active: $api.MatchSelector.HasSourcesFilter(source)}"
        >
          <div class="name">
            <span>{{ source }}</span>
            <i class="material-icons">check</i>
          </div>
        </div>
      </div>
    </div>

    <div class="maps">
      <p>Which have been played on the following <span class="orange">maps*</span>:</p>
      <div class="map-list">
        <div
          class="map"
          v-for="map in $api.MatchSelector.GetAvailableMapsUnique()"
          :key="map"
          @click="$api.MatchSelector.ToggleMapFilter(map)"
          :class="{active: $api.MatchSelector.HasMapFilter(map)}"
        >
          <img
            class="image"
            :src="$api.resolveResource('~/Content/Images/Overview/' + map +'.jpg')"
          />
          <div class="name">
            <span>{{ map }}</span>
            <i class="material-icons">check</i>
          </div>
        </div>
      </div>
    </div>

    <p class="note">
        *Please note that you can only filter for maps that you have actually played matches on.
    </p>
  </div>
</template>

<script>
import CustomSelect from "@/components/CustomSelect.vue";

export default {
  components: {
    CustomSelect
  },
  mounted() {},
  data() {
    return {
      matchCount: "-1",
      matchCountOptions: {
        "-1": "all",
        "10": "my last 10",
        "25": "my last 25",
        "50": "my last 50"
      }
    };
  },
  methods: {
    OnPreferedMatchCountChanged: function(n) {
      this.$api.MatchSelector.SetMatchCountFilter(+n);
    }
  }
};
</script>

<style lang="scss">
.global-filters {
  span.orange {
    color: $orange;
  }

  p {
      font-weight: 500;

      &.note {
          font-weight: normal;
          font-size: 14px;
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
        width: 150px;
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
          background: $purple;
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
        width: 150px;
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
          background: $purple;
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