<template>
  <div class="view view-extension">
    <div class="fixed-width-container">
      <div class="bordered-box">
        <h2>Upload with Browser Extension</h2>
        <p>
          Our browser extension finds all your matchmaking matches from the past few weeks that are still available for download from the Valve servers, and uploads them to MENTOR.GG.
        </p>
        <p>
          Download for 
          <a href="https://chrome.google.com/webstore/detail/mentorgg-uploader/anjgboggngeomdkapmhjodcbjjclalbg"> Chrome </a>
          and 
          <a href="https://addons.mozilla.org/en-US/firefox/addon/mentor-gg-uploader/"> Firefox</a>.

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
.view-extension {
  position: relative;

  .bordered-box {
    margin-top: 40px;
    padding: 20px;

    h2,
    p {
      color: white;
    }

    h2 {
      margin-top: 0;
    }
  }
}
</style>