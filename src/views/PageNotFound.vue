<template>
  <div class="view view-page-not-found">
    <div class="fixed-width-container">
      <div class="bordered-box">
        <h1>Whoops!</h1>
        <p>The page you requested could not be found.</p>

        <p class="smiley">¯\_(ツ)_/¯</p>

        <button class="button-variant-bordered" @click="$router.push({path: '/'})">Fine, get me outta here</button>
      </div>

      <!-- <div class="large-404">404</div> -->
    </div>
  </div>
</template>

<style lang="scss">
.view-page-not-found {
    .bordered-box {
        margin-top: 40px;
        color: white;
        text-align: center;
        padding-bottom: 20px;

        .smiley {
            font-size: 30px;
        }
    }

    .large-404 {
        text-align: center;
        font-weight: lighter;
        font-size: 200px;
        color: $dark-1;
    }
}
</style>