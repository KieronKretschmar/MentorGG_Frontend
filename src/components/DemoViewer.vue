<template>
  <div id="demoviewer">
    <div id="mgg-demo-viewer">
      <div id="pl">
        <div id="demo-view">
          <div id="round-time">
            <p>freeze time</p>
            <span>2:00</span>
            <div>a</div>
          </div>
          <div id="kill-feed"></div>
        </div>
        <div id="demo-player">
          <div id="btn-play">
            <i class="fas fa-play"></i>
          </div>
          <div id="btn-pause">
            <i class="fas fa-pause"></i>
          </div>
          <div class="range-wrapper">
            <input type="range" min="1" max="10000" value="0" class="slider" id="playback-progress" />
          </div>
          <div class="time-display">
            <span class="cur"></span>
            /
            <span class="max"></span>
          </div>
          <div id="btn-settings">
            <i class="fas fa-cog"></i>
            <div class="options">
              <ul>
                <li class="speed-modifier" data-modifier="0.25">Speed x0.25</li>
                <li class="speed-modifier" data-modifier="0.50">Speed x0.50</li>
                <li class="speed-modifier" data-modifier="1.00">Speed x1.00</li>
                <li class="speed-modifier" data-modifier="1.50">Speed x1.50</li>
                <li class="speed-modifier" data-modifier="2.00">Speed x2.00</li>
              </ul>
            </div>
          </div>
          <div id="btn-fullscreen">
            <i class="fas fa-expand"></i>
          </div>
        </div>
      </div>
      <div id="pr" class="scrollbar-outer">
        <!-- <div id="round-select">
                <i id="round-prev" class="fas fa-caret-left"></i>
                <div id="round-num">
                    <span class="text-cur"></span>
                    <span class="text-max"></span>
                    <ul id="round-list">

                    </ul>
                    <i class="fas fa-caret-down"></i>
                </div>
                <i id="round-next" class="fas fa-caret-right"></i>
        </div>-->
        <div id="round-display-wrapper">
          <div id="rd-prev">
            <i class="fas fa-chevron-left"></i>
          </div>
          <div id="round-display"></div>
          <div id="rd-next">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>

        <div id="team-display">
          <div class="wrapper">
            <div class="team1">Team 1</div>
            <div class="score"></div>
            <div class="team2">Team 2</div>
          </div>
        </div>

        <div id="table-header">
          <div class="push-left"></div>
          <div class="money">Money</div>
          <div class="kills">Kills</div>
          <div class="assists">Assists</div>
          <div class="deaths">Deaths</div>
        </div>
        <div id="player-list">
          <ul class="ct"></ul>
          <ul class="t"></ul>
        </div>
      </div>
    </div>

    <div id="player-entry-template">
      <li>
        <div class="hp-name-eq">
          <div class="hp-name">
            <div class="hp-bar"></div>
            <div class="hp"></div>
            <div class="name"></div>
          </div>
          <div class="eq"></div>
        </div>
        <div class="main"></div>
        <div class="money">
          <div class="wrapper">
            <div class="spent"></div>
            <div class="current"></div>
          </div>
        </div>
        <div class="kills"></div>
        <div class="assists"></div>
        <div class="deaths"></div>
      </li>
    </div>

    <div id="player-icon">
      <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,0 10,5 0,10" style="fill:white;stroke:none;stroke-width:1" />
      </svg>
    </div>

    <div id="demoviewer-close-button">×</div>
    <AjaxLoader v-if="loadingData">Loading Demoviewer</AjaxLoader>
  </div>
</template>

<script>
export default {
  mounted() {
    let self = this;
    $(function() {
      // DemoViewer.SetData(model);

      $("#demoviewer-close-button").click(function() {
        self.Hide();
      });
    });
  },
  methods: {
    Show: function() {
      $("#demoviewer").fadeIn(500);
      $("body").addClass("no-scroll");
    },
    Hide: function() {
      $("#demoviewer").fadeOut(500);
      $("body").removeClass("no-scroll");

      this.Cleanup();
    },
    UpdateData: function(data) {
      DemoViewer.SetData(data);
    },
    Finalize: function() {
      let self = this;

      $("#round-display").slick("setPosition");
      $(window).trigger("resize");

      $(".round-entry:not(.round-switch):not(.final-result)")
        .off("click")
        .click(function(e) {
          let roundNum = parseInt($(this).html());
          self.loadingData = true;
          self.Cleanup();
          self.$api.getDVRound(self.matchId, roundNum).then(result => {
              DemoViewer.Data.Round = result.data;
              self.UpdateData(DemoViewer.Data);
              self.Finalize();
          });
        });

      setTimeout(() => {
        this.loadingData = false;
      }, 500);
    },
    Cleanup: function() {
      window.$("#round-display").slick("unslick");
      window.DemoViewer.Reset();
    },
    Watch: function(playerId, matchId, roundId){
      this.loadingData = true;
      this.matchId = matchId;
      this.Show();

      this.$api.getDVMatch("", matchId, roundId).then(response => {
        this.UpdateData(response.data);
        this.Finalize();
      });
    },
  },
  data() {
    return {
      loadingData: false,
      matchId: 0
    };
  }
};
</script>

<style lang="scss">
#demoviewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background: $dark-2;
  display: none;

  .--ajax-loader {
    position: fixed;
    padding: 0;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: $dark-2;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

#demoviewer-close-button {
  position: fixed;
  width: 32px;
  height: 32px;
  top: 0;
  right: 0px;
  background: $purple;
  color: white;
  font-size: 32px;
  line-height: 32px;
  text-align: center;
  border-bottom-left-radius: 50%;
  cursor: pointer;
  transition: 0.35s;
  z-index: 10;

  &:hover {
    border-bottom-left-radius: 75%;
  }
}
</style>