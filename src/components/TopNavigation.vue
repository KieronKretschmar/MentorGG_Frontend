<template>
  <nav>
    <router-link to="/" class="logo">
      <img src="@/assets/logo_white.svg">
    </router-link>
    <router-link to="/smokes">Smokes</router-link>
    <router-link to="/flashes">Flashes</router-link>
    <router-link to="/kills">Kills</router-link>
    <router-link to="/matches">Matches</router-link>
  </nav>
</template>

<style lang="scss">
  nav {
    background: $dark-1;    
    display: flex;
    align-items: center;
    margin: 0 auto;
    max-width: $container-width;
    padding: 30px 0;

    .logo {
      position: absolute;
      width: 170px;
      left: 30px;
      top: 23px;

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