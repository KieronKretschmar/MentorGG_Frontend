<template>
  <div class="profile-situations">
    <Overview v-if="!$route.query.type" :steamId="steamId" @open-detail="OnShowDetail" />
    <Detail v-else :type="$route.query.type" :steamId="steamId" @back="OnBackToOverview" />
  </div>
</template>

<script>
import Overview from "@/components/Profile/Situations/Overview.vue";
import Detail from "@/components/Profile/Situations/Detail.vue";

export default {
  props: ["steamId"],
  components: {
    Overview,
    Detail
  },
  methods: {
    OnShowDetail(situationType) {
      this.ShowDetail(situationType);
    },
    OnBackToOverview() {
      this.$router.replace({
        params: {
          tab: "situations"
        }
      });
    },
    ShowDetail(situationType) {
      this.$router.replace({
        params: {
          tab: "situations"
        },
        query: {
          type: situationType
        }
      });
    }
  }
};
</script>