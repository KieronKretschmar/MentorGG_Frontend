<template>
  <div>
    <div v-if="!teams" class="bordered-box no-data">
      <AjaxLoader>Loading tournament data</AjaxLoader>
    </div>

    <div v-else>
      <div class="tournament">
        <div
          class="outer-team"
          v-for="teamDetail in teams"
          :key="teamDetail.TeamDetails.TeamEnum"
          @click="SetSelectedTeam(teamDetail.TeamDetails.Name)"
        >
          <div class="team" :class="{selected: teamDetail.TeamDetails.Name == selectedTeamName}">
            <img class="icon" :src="$api.resolveResource(teamDetail.TeamDetails.IconPath)" />
            <h6>{{teamDetail.TeamDetails.Name}}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "teams",
    "SetSelectedTeam", // Call SetSelectedTeam(teamName) on click
    "selectedTeamName" // highlight the selected team's logo
  ]
};
</script>

<style lang="scss">
.tournament {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
  margin-bottom: 10px;

  .outer-team {
    margin: 10px;
    width: calc((100% / 7) - 20px);
    // flex-basis: 12%;
    // margin-bottom: 20px;

    .team {
      background: $dark-3;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid $purple;   
      padding: 20px;
      height: 110px;   
      justify-content: center;
      border-radius: 3px;

      &:hover {
        background: $dark-4;
      }

      &.selected{
        background: $dark-4;
      }

      .icon {
        width: 50px;
        height: auto;
      }
      
      h6 {
        font-size: 12px;
        color: white;
        margin: 0;
        font-weight: 400;
      }
    }
  }
}
</style>