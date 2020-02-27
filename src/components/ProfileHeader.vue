<template>
  <div class="profile-header">
    <div class="fixed-width-container mc" v-if="user">
      <div class="avatar">
        <img :src="$helpers.getSteamProfileImageUrl(user.SteamUser.ImageUrl)" />
      </div>
      <div class="name">
        <span>PROFILE NAME</span>
        <span>{{ user.SteamUser.SteamName }}</span>
      </div>
      <div class="csgo-rank">
        <span>CS:GO RANK</span>
        <img :src="$helpers.resolveRankImage(user.Rank)" alt="CS:GO Rank Image" />
      </div>
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
      border-radius: 5px;
      overflow: hidden;

      img {
        width: 110px;
        height: 110px;
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
@media (max-width: 800px) {
  .profile-header {
    padding: 20px 0 0 0;
    border-bottom: 1px solid $purple;
    padding-bottom: 90px;

    .fixed-width-container {
      display: flex;
      align-items: flex-start;
      height: 60px;

      .avatar {
        border-radius: 5px;
        overflow: hidden;

        img {
          max-width: 60px;
          height: 60px;
        }
      }

      .name {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        padding-right: 10px;
        border-right: none;
        height: 60px;
        max-width: 125px;

        span {
          margin: 5px;

          &:first-child {
            color: $orange;
            font-size: 10px;
          }

          &:last-child {
            color: white;
            font-size: 12px;
            font-weight: 700;
          }
        }
      }

      .csgo-rank {
        display: flex;
        flex-direction: column;
        margin-left: 0;
        padding-left: 10px;
        text-align: center;
        border-left: 1px solid $purple;
        max-width: 125px;
        height: 60px;

        span {
          margin: 5px 0;

          &:first-child {
            color: $orange;
            font-size: 10px;
          }
        }

        img {
          height: 30px;
          margin: 5px 0;
        }
      }
    }
  }
}
</style>