<template>
  <div class="view view-extension">
    <div class="fixed-width-container">
      <h2 class="section-header">Browser Extension</h2>
      <div class="bordered-box">
        <p>
          Our browser extension finds all your matchmaking matches from the past few weeks that are still available for download from the Valve servers, and uploads them to MENTOR.GG.
        </p>
        <p>
          Download for 
          <a href="https://chrome.google.com/webstore/detail/mentorgg-uploader/anjgboggngeomdkapmhjodcbjjclalbg" target="_blank"> Chrome </a>
          and 
          <a href="https://addons.mozilla.org/en-US/firefox/addon/mentor-gg-uploader/" target="_blank"> Firefox</a>.

        </p>
      </div>
    </div>


  </div>
</template>


<script>

export default {
};
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";

.view-extension {
  position: relative;
  margin-top: 70px;

  .bordered-box {
    padding: 20px;

    h2,
    p {
      color: white;
    }

    h2 {
      margin-top: 0;
    }

    a {
      color: $orange;
      text-decoration: none;
    }
  }
}
</style>