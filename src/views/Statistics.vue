<template>
  <div class="view view-statistics">
    <ProfileHeader />
    <div class="fixed-width-container">
      <div class="bordered-box">
        <div class="statistics-container">
          <div v-for="section in sections" :key="section.name" class="statistic">
            <p class="title">{{ section.name }}</p>
            <ul class="statistic-entries">
              <li v-for="entry in section.entries" :key="entry.name">
                <span class="name">{{ entry.name }}</span>
                <span class="value">{{ entry.value }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileHeader from "@/components/ProfileHeader.vue";

export default {
  components: {
    ProfileHeader
  },
  mounted() {
    this.sections = [
      {
        name: "Headshots",
        entries: [
          {
            name: "Total Headshots",
            value: 1337
          },
          {
            name: "Headshot Kills",
            value: 83
          },
          {
            name: "Headshot Deaths",
            value: 531
          },
          {
            name: "Headshot %",
            value: 100
          }
        ]
      },
      {
        name: "Accuracy",
        entries: [
          {
            name: "Total Shots fired",
            value: 194214851
          },
          {
            name: "Hits",
            value: 4851
          },
          {
            name: "Hit Ratio",
            value: 0.27
          }
        ]
      },
      {
        name: "Kills",
        entries: [
          {
            name: "Suicides",
            value: 3
          },
          {
            name: "First Bloods Drawn",
            value: 4851
          }
        ]
      },
      {
        name: "Bomb",
        entries: [
          {
            name: "Times Planted",
            value: 85732
          },
          {
            name: "Times Defused",
            value: 634
          }
        ]
      },
      {
        name: "Flashes",
        entries: [
          {
            name: "Enemies Flashed",
            value: 39854
          },
          {
            name: "Total Flashes Thrown",
            value: 87486723
          }
        ]
      }
    ];
  },
  data() {
    return {
      sections: []
    };
  }
};
</script>

<style lang="scss">
.view-statistics {
  .bordered-box {
    margin-top: -64px;
    padding: 10px 0;
  }

  .statistics-container {
    display: flex;
    flex-wrap: wrap;

    .statistic {
      width: calc(33.33%);
      padding: 0 20px;
      margin-top: 10px;

      .title {
        color: white;
        font-weight: 700;
        font-size: 1.125rem;
      }

      .statistic-entries {
        margin: 0;
        padding: 0;
        list-style-type: none;

        li {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: white;
          font-weight: 500;
          border-radius: 4px;
          padding: 15px 15px;

          &:nth-child(2n + 1) {
            background: $purple;
          }
        }
      }
    }
  }
}
</style>