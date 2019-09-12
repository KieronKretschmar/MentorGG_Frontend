<template>
  <div class="profile-header">
    <div class="fixed-width-container" v-if="user">
      <div class="avatar">
        <img :src="getFullSteamAvatarURL(user.Icon)" />
      </div>
      <div class="name">
        <span>PROFILE NAME</span>
        <span>{{ user.SteamName }}</span>
      </div>
      <div class="csgo-rank">
        <span>CS:GO RANK</span>
        <img :src="$api.resolveResource(user.RankIcon)" alt="CS:GO Rank Image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$api.getPlayerInfo("").then(response => {
      this.user = response.data;
    });
  },
  data() {
    return {
      user: null
    };
  },
  methods: {
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
.profile-header {
  background: $dark-3;
  padding: 50px 0;
  border-bottom: 1px solid $purple;
  padding-bottom: 120px;

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
          font-size: 2.25rem;
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
//========================================================================================================================================
//responsive
//=========================================================================================================================================
@media (max-width: 1170px) {
  .profile-header {
    font-size: 1.2vw;

    .fixed-width-container {
      .avatar {
        width: 7em;
        height: 7em;
      }

      .name {
        span:first-child {
          font-size: 1em;
        }

        span:last-child {
          font-size: 2em;
        }
      }

      .csgo-rank {
        margin-left: 2em;
        span:first-child {
          font-size: 1em;
        }

        img {
          height: 4em;
          width: auto;
        }
      }
    }
  }
}

//========================================================================================================================================
//mobile
//=========================================================================================================================================
@media (max-width: 576px) {
  .profile-header {
    font-size: 2.25vw;

    .fixed-width-container {
      .avatar {
        width: 8em;
        height: 8em;
      }

      .name {
        margin-left: 1em;
        padding-right: 1em;
        max-width: 23em;
        span:first-child {
        }

        span:last-child {
          font-size: 2em;
        }
      }
      .csgo-rank {
        span:first-child {
        }

        img {
        }
      }
    }
  }
}
</style>