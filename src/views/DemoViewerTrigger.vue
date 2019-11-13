<template>
  <div class="view view-dv-trigger"></div>
</template>

<script>
export default {
  mounted() {
    globalThis.DemoViewer.SetMatch(this.$route.params.matchId)
      .SetRound(this.$route.query.r)
      .SetTimestamp(this.$route.query.t * 1000, true)
      .Load();
  }
};
</script>