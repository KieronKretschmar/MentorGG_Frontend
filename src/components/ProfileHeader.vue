<template>
  <div class="profile-header">
    <div class="fixed-width-container mc" v-if="user">
      <div class="avatar">
        <img :src="user.SteamUser.ImageUrl || $helpers.getDefaultSteamProfileImageUrl()" />
      </div>
      <div class="name">
        <span>PROFILE NAME</span>
        <span>{{ user.SteamUser.SteamName }}</span>
      </div>
      <div class="csgo-rank">
        <span>CS:GO RANK</span>
        <!-- TODO: migrate resources -->
        <img :src="$helpers.resolveRankImage(user.Rank)" alt="CS:GO Rank Image" />
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  mounted() {
    this.$api.getPlayerInfo(this.$api.User.GetSteamId()).then(response => {
      this.user = response.data;
    });
  },
  data() {
    return {
      user: null
    };
  },
  methods: {
  }
};
</script>

<style lang="scss">
.profile-header {
  background: $dark-3;
  padding: 40px 0px;
  border-bottom: 1px solid $purple;
  padding-bottom: 110px;

  .fixed-width-container {
    display: flex;
    align-items: center;

    .avatar {
      width: 110px;
      height: 110px;
      border-radius: 5px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .name {
      display: flex;
      flex-direction: column;
      margin-left: 25px;
      padding-right: 100px;
      border-right: 1px solid $purple;

      span {
        margin: 5px 0;

        &:first-child {
          color: $orange;
          font-size: 12px;
        }

        &:last-child {
          color: white;
          font-size: 1.75rem;
          font-weight: 700;
        }
      }
    }

    .csgo-rank {
      display: flex;
      flex-direction: column;
      margin-left: 25px;
      text-align: center;

      span {
        margin: 5px 0;

        &:first-child {
          color: $orange;
          font-size: 12px;
        }
      }

      img {
        height: 44px;
        margin: 5px 0;
      }
    }
  }
}

//responsive
@media(max-width: 1200px) {

}
</style>