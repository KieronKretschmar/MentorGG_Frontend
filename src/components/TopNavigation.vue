<template>
  <div class="top-navigation">
    

    <div class="r">
      <button class="button-variant-filled" @click="OnUploadMatches">Upload Matches</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let params = {
      steamId: this.$api.User.GetSteamId()
    };
    this.$api.getPlayerInfo(params).then(response => {
      this.user = response.data;
    });
  },
  data() {
    return {
      user: null,
      optionsVisible: false
    };
  },
  methods: {
    OnUploadMatches: function() {
      this.$router.push({ name: "upload" });
    },
    getFullSteamAvatarURL: function(url) {
      if (!url) {
        return "";
      }
      return url.split(".jpg")[0] + "_full.jpg";
    }
  }
};
</script>

<style lang="scss">
.top-navigation {
  background: $dark-1;
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: $container-width;
  padding: 30px 0;
  justify-content: space-between;

  .user-profile {
    display: flex;
    align-items: center;
    transition: 0.35s;
    border-top: 2px solid transparent;

    img {
      width: 50px;
      height: 50px;
      border-radius: 4px;
      margin-right: 10px;
    }

    .username {
      color: white;
      font-weight: 500;
      max-width: 200px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      transition: 0.35s;
    }
  }
}
</style>