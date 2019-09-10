<template>
  <div class="view view-statistics">
    <ProfileHeader />
    <div class="fixed-width-container">
      <div class="bordered-box">
        <div class="controls">
          <button class="button-variant-bordered" :class="{active: referenceUnit=='global'}" @click="referenceUnit='global'">Total</button>
          <button class="button-variant-bordered" :class="{active: referenceUnit=='match'}" @click="referenceUnit='match'">Per Match</button>
        </div>
        <div v-if="!playerStats && !loadingComplete" class="">
          <AjaxLoader>Loading Molotovs</AjaxLoader>
        </div>
        <div v-if="!playerStats && loadingComplete" class="">
          <DemoDataLoadRequest 
          @buttonClicked="LoadPlayerStats(true)">
            Sorry man, no stats found for you. 
            <br>Wanna load someone else's until you finally figure out how to upload your own matches?
            </DemoDataLoadRequest>
        </div>
        <div v-if="playerStats" class="statistics-container" v-masonry>
          <div v-for="section in sections" :key="section.name" class="statistic" v-masonry-tile>
            <p class="title">{{ section.name }}</p>
            <ul class="statistic-entries">
              <li v-for="entry in section.entries" :key="entry.name">
                <span class="name">{{ entry.name }}</span>
                <span v-show="referenceUnit == 'global'" class="value">{{ entry.value }}</span>
                <span v-show="referenceUnit == 'match'" class="value">{{ entry.valuePerMatch }}</span>
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
  data() {
    return {
      loadingComplete: false,
      sections: [],
      playerStats: null,
      referenceUnit: 'global',
    };
  }, 
  mounted() {
    this.LoadPlayerStats(false);
  },
  methods: {
    LoadPlayerStats(isDemo) {
      this.loadingComplete = false;
      this.$api.getPlayerStats(isDemo ? "76561198033880857" : "")
      .then(response => {
        this.playerStats = response.data.AllTimePlayerStats;
        this.AssignSections();
        this.loadingComplete = true;
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        this.loadingComplete = true;
      });
    },
    AssignSections() {
      this.sections = [
        {
          name: "General",
          entries: [
            {
              name: "Matches",
              value: this.playerStats.GamesPlayed,
              valuePerMatch: this.playerStats.GamesPlayed,
            },
            {
              name: "Wins",
              value: this.playerStats.GamesWon,
              valuePerMatch: (this.playerStats.GamesWon / this.playerStats.GamesPlayed).toFixed(2),
            },  
            {
              name: "Win %",
              value: (this.playerStats.GamesWon / this.playerStats.GamesPlayed * 100).toFixed(1) + '%',
              valuePerMatch: (this.playerStats.GamesWon / this.playerStats.GamesPlayed * 100).toFixed(1) + '%',
            },              
            {
              name: "Days Since Last VAC Ban",
              value: this.playerStats.DaysSinceLastVacBan == 0 ? "Never" : this.playerStats.DaysSinceLastVacBan,
              valuePerMatch: this.playerStats.DaysSinceLastVacBan == 0 ? "Never" : this.playerStats.DaysSinceLastVacBan,
            },          
          ]
        },
        {
          name: "Kills",
          entries: [
            {
              name: "Kills",
              value: this.playerStats.Kills,
              valuePerMatch: (this.playerStats.Kills / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Deaths",
              value: this.playerStats.Deaths,
              valuePerMatch: (this.playerStats.Deaths / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Assists",
              value: this.playerStats.Assists,
              valuePerMatch: (this.playerStats.Assists / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Suicides",
              value: this.playerStats.Suicides,
              valuePerMatch: (this.playerStats.Suicides / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "TeamKills",
              value: this.playerStats.TeamKills,
              valuePerMatch: (this.playerStats.TeamKills / this.playerStats.GamesPlayed).toFixed(2),
            }, 
            {
              name: "EntryKills",
              value: this.playerStats.EntryKills,
              valuePerMatch: (this.playerStats.EntryKills / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "EntryDeaths",
              value: this.playerStats.EntryKillVictim,
              valuePerMatch: (this.playerStats.EntryKillVictim / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Double Kills",
              value: this.playerStats.Enemy2K,
              valuePerMatch: (this.playerStats.Enemy2K / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Triple Kills",
              value: this.playerStats.Enemy3K,
              valuePerMatch: (this.playerStats.Enemy3K / this.playerStats.GamesPlayed).toFixed(2),
            },   
            {
              name: "Quadra Kills",
              value: this.playerStats.Enemy4K,
              valuePerMatch: (this.playerStats.Enemy4K / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Aces",
              value: this.playerStats.Enemy5K,
              valuePerMatch: (this.playerStats.Enemy5K / this.playerStats.GamesPlayed).toFixed(2),
            },    
          ]
        },
        {
          name: "Headshots",
          entries: [          
            {
              name: "Total Headshot Kills",
              value: this.playerStats.HSKills,
              valuePerMatch: (this.playerStats.HSKills / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Headshot Kill",
              value: (this.playerStats.HeadshotKillRatio * 100).toFixed(1) + '%',
              valuePerMatch: (this.playerStats.HeadshotKillRatio * 100).toFixed(1) + '%',
            },
            {
              name: "Killed by Headshots",
              value: this.playerStats.HSDeaths,
              valuePerMatch: (this.playerStats.HSDeaths / this.playerStats.GamesPlayed).toFixed(2),
            },    
            {
              name: "Total Headshots",
              value: this.playerStats.HS,
              valuePerMatch: (this.playerStats.HS / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Headshot",
              value: (this.playerStats.HeadshotHitRatio * 100).toFixed(1) + '%',
              valuePerMatch: (this.playerStats.HeadshotHitRatio * 100).toFixed(1) + '%',
            },
            {
              name: "Headshots Taken",
              value: this.playerStats.HSVictim,
              valuePerMatch: (this.playerStats.HSVictim / this.playerStats.GamesPlayed).toFixed(2),
            },
          ]
        },
        {
          name: "Accuracy",
          entries: [
            {
              name: "Shots Fired",
              value: this.playerStats.Shots,
              valuePerMatch: (this.playerStats.HSVictim / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Hits",
              value: this.playerStats.Hits,
              valuePerMatch: (this.playerStats.Hits / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Accuracy",
              value: this.playerStats.HitsPerShot.toFixed(2),
              valuePerMatch: this.playerStats.HitsPerShot.toFixed(2),
            },
          ]
        },
        {
          name: "Bomb",
          entries: [
            {
              name: "Bombs Planted",
              value: this.playerStats.BombPlants,
              valuePerMatch: (this.playerStats.BombPlants / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Bombs Defused",
              value: this.playerStats.BombDefuses,
              valuePerMatch: (this.playerStats.BombDefuses / this.playerStats.GamesPlayed).toFixed(2),
            },
          ]
        },
        {
          name: "Flashes",
          entries: [
            {
              name: "Flashes Thrown",
              value: this.playerStats.FlashesUsed,
              valuePerMatch: (this.playerStats.FlashesUsed / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Enemies Blinded",
              value: this.playerStats.FlashesSucceeded,
              valuePerMatch: (this.playerStats.FlashesSucceeded / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Self Blinded",
              value: this.playerStats.SelfFlasheds,
              valuePerMatch: (this.playerStats.SelfFlasheds / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Teammates Blinded",
              value: this.playerStats.TeamFlasheds,
              valuePerMatch: (this.playerStats.TeamFlasheds / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Blinded by Teammates",
              value: this.playerStats.TeamFlashVictim,
              valuePerMatch: (this.playerStats.TeamFlashVictim / this.playerStats.GamesPlayed).toFixed(2),
            },
          ]
        },
        {
          name: "HEs",
          entries: [
            {
              name: "HEs Thrown",
              value: this.playerStats.HEsUsed,
              valuePerMatch: (this.playerStats.HEsUsed / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Damage Dealt",
              value: this.playerStats.HEsDamage,
              valuePerMatch: (this.playerStats.HEsDamage / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Damage Per HE",
              value: this.playerStats.DamagePerHE.toFixed(2),
              valuePerMatch: this.playerStats.DamagePerHE.toFixed(2),
            },
            {
              name: "Damage Taken By HEs",
              value: this.playerStats.HEsDamageVictim,
              valuePerMatch: (this.playerStats.HEsDamageVictim / this.playerStats.GamesPlayed).toFixed(2),
            },
          ]
        },
        {
          name: "Smokes",
          entries: [
            {
              name: "Smokes Thrown",
              value: this.playerStats.SmokesUsed,
              valuePerMatch: (this.playerStats.SmokesUsed / this.playerStats.GamesPlayed).toFixed(2),
            },
          ]
        },
        {
          name: "Molotovs",
          entries: [
            {
              name: "Molotovs Thrown",
              value: this.playerStats.FireNadesUsed,
              valuePerMatch: (this.playerStats.FireNadesUsed / this.playerStats.GamesPlayed).toFixed(2),
            },
            {
              name: "Damage Dealt",
              value: this.playerStats.FireNadesDamage,
              valuePerMatch: (this.playerStats.FireNadesDamage / this.playerStats.GamesPlayed).toFixed(2),
            },
          ]
        }
      ];    
    },
  }, 
};


</script>

<style lang="scss">
.view-statistics {
  .bordered-box {
    margin-top: -64px;
    padding: 10px 0;

    .controls {
      padding: 10px 20px;
      button {
        margin-right: 20px;
      }
    }
  }

  .statistics-container {
    display: flex;
    flex-wrap: wrap;

    .statistic {
      width: calc(33.33%);
      padding: 0 20px;
      //margin-top: 10px;

      .title {
        color: $dark-4;
        font-weight: 700;
        font-size: 1.125rem;
        height: 48px;
        margin: 0;
        line-height: 48px;
        position: relative;

        &:after {
          content: '';
          background: $orange;
          height: 1px;
          width: 100%;
          top: 40px;
          left: 0;
          position: absolute;
        }
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