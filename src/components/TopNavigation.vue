<template>
  <nav>
    <div class="l">
      <router-link to="/" class="logo close-others" @click="closeOpenDropDowns">
        <img src="@/assets/logo_white.svg" />
      </router-link>
      <router-link to="/" class="close-others" @click.native="closeOpenDropDowns">Overview</router-link>
      <router-link to="/kills" class="close-others" @click.native="closeOpenDropDowns">Kills</router-link>
      <div class="dropdown-navitem">
        <router-link to="#" class="grenade drop-button">Grenades <i class="material-icons">arrow_drop_down</i></router-link>
        <div class="dropdown-hideables hide">
          <router-link class to="/smokes">Smokes</router-link>
          <router-link class to="/molotovs">Molotovs</router-link>
          <router-link class to="/flashes">Flashes</router-link>
          <router-link class to="/hes">HEs</router-link>
        </div>
      </div>

      <router-link
        to="/statistics"
        class="close-others"
        @click.native="closeOpenDropDowns"
      >Statistics</router-link>
      <div class="dropdown-navitem">
        <router-link to="#1" class="tournaments drop-button">Starladder2019 <i class="material-icons">arrow_drop_down</i></router-link>
        <div class="dropdown-hideables hide">
          <router-link class to="/eventmatchhistory">Matches</router-link>
          <router-link class to="/eventkills">Kills</router-link>
          <router-link class to="/eventsmokes">Smokes</router-link>
          <router-link class to="/eventmolotovs">Molotovs</router-link>
          <router-link class to="/eventflashes">Flashes</router-link>
          <router-link class to="/eventhes">HEs</router-link>
        </div>
      </div>
    </div>
    <div class></div>
    <div class="r close-others"  @click="closeOpenDropDowns">
      <button class="button-variant-filled" @click="OnUploadMatches">Upload Matches</button>
      <div
        class="user-profile"
        v-if="user"
        @click="optionsVisible = !optionsVisible"
        @mouseleave="optionsVisible = false"
      >
        <span class="username">{{ user.SteamName }}</span>
        <img v-if="user" :src="getFullSteamAvatarURL(user.Icon)" />
        <div class="profile-options" :class="{visible: optionsVisible}">
          <form action="/Account/LogOff/logoutForm" class="form-inline" method="post">
            <!-- <input name="__RequestVerificationToken" type="hidden" value="XsKml8MFCYXavXtfiIC86L1w5vD8CCJWMZ_lWNYBnUSK8ibRKo_stUPI953f2s28ZfFGvIalOxEVl5buZ6sttipGbA6Z60indV8j2yK3MRza1BzGJjqDn6QBoJ881ihlr79UP6zQ7FVKNGOyMElemA2">        <ul class="navbar-nav"> -->
            <button type="submit">Log out</button>
          </form>
          <!-- <button class="button-variant-filled" @click="OnLogout">Logout</button> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {
    this.$api.getPlayerInfo("").then(response => {
      this.user = response.data;
    });
    this.toggleHidden();
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
    OnLogout: function() {
      sessionStorage.removeItem(".AspNet.ApplicationCookie");
      window.location.href("http://localhost:58071");
    },
    getFullSteamAvatarURL: function(url) {
      if (!url) {
        return "";
      }
      return url.split(".jpg")[0] + "_full.jpg";
    },
    /*toggleHidden: function(e){
      let clicked = e.target.parentNode
      let hideables = clicked.querySelectorAll(".dropdown-hideables")[0]
      hideables.classList.toggle("hide")
    },*/
    toggleHidden: () => {
      const dropDownLink = document.querySelectorAll(".drop-button");
      let hideables = document.querySelectorAll(".dropdown-hideables");
      for (var i = 0; i < dropDownLink.length; i++) {
        dropDownLink[i].addEventListener("click", function() {
          if (
            this.parentNode
              .querySelectorAll(".dropdown-hideables")[0]
              .className.includes(" hide")
          ) {
            for (var i = 0; i < hideables.length; i++) {
              hideables[i].classList.add("hide");
            }
            this.parentNode
              .querySelectorAll(".dropdown-hideables")[0]
              .classList.remove("hide");
          } else {
            this.parentNode
              .querySelectorAll(".dropdown-hideables")[0]
              .classList.add("hide");
          }
        });
      }
    },
    closeOpenDropDowns: function() {
      let closeOthers = document.querySelectorAll(".close-others");
      let dropdowns = document.querySelectorAll(".dropdown-hideables");
      for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.add("hide");
      }
    }
  }
};
</script>

<style lang="scss">
nav {
  background: $dark-1;
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: $container-width;
  padding: 30px 0;
  justify-content: space-between;

  .l {
    display: flex;
    align-items: center;
    .grenade,
    .tournaments {
      .material-icons{
        vertical-align:middle;
      }
      &:active {
        color: black;
      }
      cursor: pointer;
    }
    .dropdown-navitem {
      /* &:hover .hide {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 55px;
      }*/
      display: flex;
      flex-direction: column;
      .dropdown-hideables {
        display: flex;
        flex-direction: column;
        position: absolute;
        z-index: 10;
        top: 65px;
        border: 1px solid $purple;
        border-radius: 5px;
        padding: 10px;
        background: $dark-3;
        align-items: flex-start;
       /* &:a{
          position:absolute;
          width:50px;
          height:50px;
          border-top:2px solid white;
          border-bottom:2px solid white;
          border-left:2px solid white;
          border-right:2px solid white;
          top:0%;
          left: 50%;
          margin-left:-25px;
          content: '';

        }*/
        a {
          padding: 5px;
        }
      }
      a {
        padding-left: 14px;
      }
      .hide {
        display: none;
      }
    }
  }
  .user-profile {
    position: absolute;
    right: 30px;
    top: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.35s;
    padding: 10px;
    border-top: 2px solid transparent;

    &:hover {
      background: $dark-3;
      // border-top: 2px solid $orange;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 4px;
      margin-left: 10px;
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

    .profile-options {
      position: absolute;
      top: 100%;
      left: 0;
      padding: 10px;
      padding-top: 0px;

      background: $dark-3;
      // border: 1px solid $purple;
      width: 100%;
      border-bottom: 2px solid $orange;
      opacity: 0;
      pointer-events: none;
      transition: 0.35s;

      &.visible {
        opacity: 1;
        pointer-events: all;
      }

      form {
        button {
          background: $purple;
          color: white;
          border: 0;
          width: 100%;
          outline: 0;
          padding: 5px 10px;
          cursor: pointer;
          transition: 0.35s;

          &:hover {
            background: darken($purple, 5%);
          }
        }
      }
    }
  }

  .button-variant-filled {
    font-weight: 500;
  }

  .logo {
    //position: absolute;
    width: 170px;
    left: 30px;
    top: 32px;

    img {
      width: 100%;
    }
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    margin-right: 50px;
    transition: 0.3s;

    &.router-link-exact-active {
      color: $orange;
    }

    &:hover {
      color: $orange;
    }
  }
}
</style>