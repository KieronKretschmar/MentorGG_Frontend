<template>
  <div class="view view-downloads">
    <div class="fixed-width-container">
      <div class="bordered-box">
        <h2>MENTOR.GG Uploader as Browser Extension</h2>
        <div class="split">
          <div class="l">
            <img src="@/assets/browser-extension.png" />
          </div>
          <div class="r">
            <p>With our browser extension you are be able to upload your matches right from within your browser.</p>
            <p>
              We highly recommend using this instead of the uploader for Windows,
              as in the future the browser extension will receive seamless integration with our Website and give you access to features that you would normally not have access to.
            </p>
            <div class="download-links">
              <a
                target="_blank"
                href="https://chrome.google.com/webstore/detail/mentorgg-uploader/anjgboggngeomdkapmhjodcbjjclalbg"
              >
                <img src="@/assets/browser-icons/chrome.png" />
              </a>
              <a
                target="_blank"
                href="https://addons.mozilla.org/de/firefox/addon/mentor-gg-uploader/"
              >
                <img src="@/assets/browser-icons/firefox.png" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="bordered-box">
        <h2>MENTOR.GG Uploader for Windows</h2>
        <div class="split">
          <div class="l">
            <div class="no-image">
              <p>There are no images but we have this text here so that the layout can still be symmetrical ¯\_(ツ)_/¯</p>
            </div>
          </div>
          <div class="r">
            <p>
              This will upload your matches whenever you are done playing CS:GO. That's pretty much all there is to it.
              <br />Just
              <a target="_blank" href="https://www.7-zip.org/">unzip</a> it and run the *.exe file. You can also right-click the tray icon and have it start with Windows.
            </p>

            <p>And by the way, Valve has confirmed that this will not trigger VAC at all. You are completly safe using this!</p>

            <a href="#">Download</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {}
};
</script>

<style lang="scss">
.view-downloads {
  .bordered-box {
    margin-top: 40px;
    padding: 20px;

    .split {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .l {
        width: 20%;

        img,
        .no-image {
          width: 100%;
          border: 1px solid $purple;
          border-radius: 3px;

          p {
            color: $gray;
            font-size: 12px;
            margin: 0;
            padding: 0;
          }
        }

        .no-image {
          padding: 20px;
          display: flex;
          align-items: center;
          text-align: center;
          height: 222px;
        }
      }

      .r {
        width: 75%;

        a {
          color: $orange;
          text-decoration: none;
        }
      }
    }

    h2,
    p {
      color: white;
    }

    h2 {
        margin-top: 0;
    }

    .download-links {
      display: flex;

      a {
        margin-right: 10px;
      }
    }
  }
}
</style>