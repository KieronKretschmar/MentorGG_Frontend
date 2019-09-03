<template>
<div>
  <div v-if="!teamInfos" class="bordered-box no-data">
    <AjaxLoader>Loading tournament data</AjaxLoader>
  </div>

  <div v-else>
    Insert grid here
  </div>
</div>

  
</template>

<script>
export default {
  props: [
    "teamInfos",
    "SetSelectedTeam", // Call SetSelectedTeam(teamName) on click
    "selectedTeam" // highlight the selected team's logo
  ]
};
</script>

<style>
</style>