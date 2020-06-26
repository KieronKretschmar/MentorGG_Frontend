<template>
  <div class="view view-situation-detail-overview">
    <div class="fixed-width-container">
      <template v-if="metaData">
        <div class="filters">
          <div
            class="filter"
            v-for="(val, name) in Enums.SkillDomain.Values()"
            :key="name"
            @click="ToggleFilter(name)"
          >
            <img :src="$assetLoader.getSkillDomainIcon(name)" />
            <span class="name">
              {{ name }}
              <i class="material-icons" :class="{visible: filters[name]}">check</i>
            </span>
          </div>
        </div>

        <div class="split">
          <div class="l">
            <div class="entries">
              <div class="entry">Misplays</div>
              <router-link
                :to="{name: 'situation-detail', params: {type: entry.type}}"
                class="entry"
                v-for="entry in renderData.misplays"
                :key="entry.type"
              >
                <img
                  v-if="entry.meta"
                  :src="$assetLoader.getSkillDomainIcon(entry.meta.SkillDomainName)"
                />
                <div class="icon-placeholder" v-else></div>
                {{ entry.name }}
              </router-link>
            </div>
          </div>
          <div class="r">
            <div class="entries">
              <div class="entry">Highlights</div>
              <router-link
                :to="{name: 'situation-detail', params: {type: entry.type}}"
                class="entry"
                v-for="entry in renderData.highlights"
                :key="entry.type"
              >
                {{ entry.name }}
                <img
                  v-if="entry.meta"
                  :src="$assetLoader.getSkillDomainIcon(entry.meta.SkillDomainName)"
                />
                <div class="icon-placeholder" v-else></div>
              </router-link>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Enums from "@/enums";
import SituationLoader from "@/SituationLoader";

export default {
  beforeMount() {
    for (let skillDomainName in Enums.SkillDomain.Values()) {
      this.$set(this.filters, skillDomainName, true);
    }
  },
  mounted() {
    this.$api.getSituationsMetaData({}).then(result => {
      this.metaData = result.data.Data;
    });

    console.log(this.filters);
  },
  data() {
    return {
      Enums,
      metaData: null,
      filters: {}
    };
  },
  methods: {
    FindSituationMetaData(type) {
      if (this.metaData == null) {
        return null;
      }

      return this.metaData.find(e => e.SituationType == type);
    },
    ToggleFilter(name) {
      this.filters[name] = !this.filters[name];
      console.log(this.filters);
    }
  },
  computed: {
    renderData() {
      let ret = {
        misplays: [],
        highlights: []
      };

      if (!this.metaData) {
        return ret;
      }

      let values = Enums.SituationType.Values();
      for (let situationName in values) {
        let situationType = values[situationName];
        if (situationType == Enums.SituationType.Unknown) {
          continue;
        }

        if (SituationLoader.MutedSituations.indexOf(situationType) != -1) {
          continue;
        }

        let data = SituationLoader.getSituationData(situationType);
        data.meta = this.FindSituationMetaData(situationType);

        if (!this.filters[data.meta.SkillDomainName]) {
          continue;
        }

        if (data.isMisplay) {
          ret.misplays.push(data);
          continue;
        }

        if (data.isHighlight) {
          ret.highlights.push(data);
          continue;
        }
      }

      return ret;
    }
  }
};
</script>

<style lang="scss">
.view-situation-detail-overview {
  .fixed-width-container {
    .filters {
      display: flex;
      flex-wrap: wrap;
      margin: -10px;
      margin-top: 65px;

      .filter {
        width: calc(25% - 20px);
        margin: 10px;
        background: $dark-1;
        border: 1px solid $purple;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 4px;
        user-select: none;
        cursor: pointer;

        img {
          width: 64px;
          height: 64px;
          padding: 10px;
        }

        .name {
          padding: 5px 20px;
          color: white;
          background: $purple;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 34px;

          i {
            color: $orange;
            opacity: 0;
            transition: .35s;

            &.visible {
                opacity: 1;
            }
          }
        }
      }
    }

    .split {
      display: flex;
      margin-top: 20px;
      margin-bottom: 60px;
      justify-content: space-between;

      .l,
      .r {
        width: calc(50% - 10px);
      }

      .l {
        .entries {
          .entry {
            // clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
            padding-left: 20px;
            // margin-right: -25px;
            background: $dark-1;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;

            &:first-child {
              color: $red;
            }

            &:hover {
              background: lighten($dark-1, 5%);
            }

            img,
            .icon-placeholder {
              margin-right: 10px;
            }
          }
        }
      }

      .r {
        .entries {
          .entry {
            // clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
            padding-right: 20px;
            justify-content: flex-end;
            // margin-left: -25px;
            background: $dark-1;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;

            &:first-child {
              color: $green-2;
            }

            &:hover {
              background: lighten($dark-1, 5%);
            }

            img,
            .icon-placeholder {
              margin-left: 10px;
            }
          }
        }
      }

      .entries {
        display: flex;
        flex-direction: column;

        .entry {
          background: $dark-1;
          color: white;
          margin-bottom: 10px;
          padding: 10px;
          transition: 0.35s;
          text-decoration: none;
          display: flex;
          align-items: center;
          border: 1px solid $purple;

          &:last-child {
            margin-bottom: 0;
          }

          img,
          .icon-placeholder {
            width: 32px;
            height: 32px;
          }

          &:first-child {
            font-weight: bold;
            font-size: 24px;
          }
        }
      }
    }
  }
}
</style>