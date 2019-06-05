<template>
  <div class="view view-dashboard">
    <div class="profile-section"></div>

    <MatchHistory/>
  </div>
</template>

<script>
// @ is an alias to /src
import MatchHistory from "@/components/MatchHistory.vue";

export default {
  name: "dashboard",
  components: {
    MatchHistory
  },
  mounted() {}
};
</script>
