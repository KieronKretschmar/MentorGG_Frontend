<template>
  <div id="demoviewer" :class="{visible: isVisible}">
    <div class="loading-area" v-if="loadingData">
      <AjaxLoader>Loading Match #{{match}}</AjaxLoader>
    </div>
    <div class="viewing-area" v-else>
      <div class="close-button" @click="ToggleVisibility(false)">×</div>
      <div class="l">
        <Drawing />

        <div class="share-overlay" v-if="shareOverlayVisible">
          <div class="share-content">
            <div class="close-button" @click="shareOverlayVisible = false">×</div>
            <p>Your Sharelink:</p>
            <div class="link-wrapper">
              <input type="text" v-model="shareLink" readonly id="copy-sharelink" />
              <i @click="CopySharelinkToClipboard" class="fas fa-copy" title="Copy to Clipboard"></i>
            </div>
          </div>
        </div>

        <RoundTimeDisplay
          :tick="currentTick"
          :roundStart="roundStart"
          :roundEnd="roundEnd"
          :bomb="bombData"
          :roundTimer="data.MatchStats.RoundTimer"
          :freezeTimer="15"
          :map="data.MatchStats.Map"
          v-if="data"
          @skipFreezetime="OnSkipFreezetime"
        />

        <KillFeed :tick="currentTick" :kills="killData" />

        <div
          class="render-area"
          ref="renderArea"
          :style="{backgroundImage: `url('${mapBackgroundImage}')`, width: renderAreaSq + 'px', height: renderAreaSq + 'px'}"
        >
          <RenderedPlayerObject
            v-for="player in roundPlayers"
            :key="player.Id"
            :tick="currentTick"
            :player="player"
            :hasBomb="bombFieldset[player.Id]"
          />

          <RenderedSmokeObject
            v-for="smoke in roundSmokes"
            :key="`${smoke.PlayerId}-${smoke.Trajectory[0].Time}`"
            :tick="currentTick"
            :smoke="smoke"
          />
          <RenderedMolotovObject
            v-for="molotov in roundMolotovs"
            :key="`${molotov.PlayerId}-${molotov.Trajectory[0].Time}`"
            :tick="currentTick"
            :molotov="molotov"
          />
          <RenderedBaseGrenadeObject
            v-for="flash in roundFlashes"
            :key="`${flash.PlayerId}-${flash.Trajectory[0].Time}`"
            :tick="currentTick"
            :grenade="flash"
            :isFlash="true"
          />
          <RenderedBaseGrenadeObject
            v-for="he in roundHEs"
            :key="`${he.PlayerId}-${he.Trajectory[0].Time}`"
            :tick="currentTick"
            :grenade="he"
            :isFlash="false"
          />

          <RenderedBombObject :tick="currentTick" :bomb="bombData" />
        </div>
        <PlayerControls
          :min="roundStart"
          :max="roundEnd"
          @update="OnUpdate($event)"
          @warp="OnWarp($event)"
          @share="OnShare($event)"
          ref="playerControls"
        >
          <EventTimeline :min="roundStart" :max="roundEnd" :events="eventData" />
        </PlayerControls>
      </div>
      <div class="r">
        <RoundPicker
          :roundSummaries="data.RoundSummaries"
          :currentRound="round"
          @roundchange="OnRoundChange($event)"
          v-if="data"
        />
        <PlayerFrameRenderer
          :players="roundPlayers"
          :tick="currentTick"
          :equipmentInfo="data.EquipmentInfo"
          :partialScoreboard="data.Round.PartialScoreboard"
          v-if="data"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PlayerControls from "@/components/Demoviewer/PlayerControls.vue";
import EventTimeline from "@/components/Demoviewer/EventTimeline.vue";
import RoundTimeDisplay from "@/components/Demoviewer/RoundTimeDisplay.vue";
import KillFeed from "@/components/Demoviewer/KillFeed.vue";
import RoundPicker from "@/components/Demoviewer/RoundPicker.vue";
import RenderedPlayerObject from "@/components/Demoviewer/RenderedPlayerObject.vue";
import RenderedSmokeObject from "@/components/Demoviewer/RenderedSmokeObject.vue";
import RenderedMolotovObject from "@/components/Demoviewer/RenderedMolotovObject.vue";
import RenderedBaseGrenadeObject from "@/components/Demoviewer/RenderedBaseGrenadeObject.vue";
import RenderedBombObject from "@/components/Demoviewer/RenderedBombObject.vue";
import PlayerFrameRenderer from "@/components/Demoviewer/PlayerFrameRenderer.vue";
import Drawing from "@/components/Demoviewer/Drawing.vue";

import Interpolate from "d3-interpolate";

export default {
  components: {
    PlayerControls,
    EventTimeline,
    KillFeed,
    RoundTimeDisplay,
    RoundPicker,
    RenderedPlayerObject,
    RenderedSmokeObject,
    RenderedMolotovObject,
    RenderedBaseGrenadeObject,
    RenderedBombObject,
    PlayerFrameRenderer,
    Drawing
  },
  mounted() {
    // this component is loaded at the very top
    // to guaruantee that this is valid in every other component
    globalThis.DemoViewer = this;

    this.ResizePlayer();

    window.addEventListener("resize", () => {
      this.ResizePlayer();
      this.OnUpdate(this.currentTick);
    });
  },
  data() {
    return {
      twoInstance: null,
      isVisible: false,
      loadingData: false,
      initialTimestamp: 0,
      initialTimestampRelative: false,
      shouldAutoplay: false,
      match: -1,
      round: -1,
      timestamp: -1,
      playerId: "",
      data: null,
      renderAreaSq: 500,
      currentTick: 0,
      bombFieldset: {},
      shareOverlayVisible: false,
      shareLink: ""
    };
  },
  methods: {
    OnUpdate(t) {
      this.currentTick = t;
    },
    OnWarp(t) {
      this.currentTick = t;
    },
    OnShare(t) {
      let resolve = this.$router.resolve({
        name: "dvtrigger",
        params: { matchId: this.match },
        query: { r: this.round, t: (t / 1000).toFixed(2) }
      });

      this.shareLink = document.location.origin + resolve.resolved.fullPath;
      this.shareOverlayVisible = true;
    },
    CopySharelinkToClipboard() {
      //TODO: Give better animation feedback that copying was succesful
      let el = document.getElementById("copy-sharelink");
      el.select();
      document.execCommand("copy");
    },
    OnRoundChange(roundInfo) {
      this.SetMatch(this.match)
        .SetRound(roundInfo.Round)
        .Load();
    },
    SetMatch(match) {
      this.match = match;
      this.round = -1;
      this.timestamp = -1;
      this.playerId = "";

      return this;
    },
    SetRound(round) {
      this.round = round;

      return this;
    },
    SetTimestamp(timestamp, relative = false) {
      this.initialTimestamp = timestamp;
      this.initialTimestampRelative = relative;

      return this;
    },
    Autoplay() {
      this.shouldAutoplay = true;

      return this;
    },
    Load() {
      this.ToggleVisibility(true);
      this.loadingData = true;
      this.$api
        .getDVMatch(
          this.playerId,
          this.match,
          this.round == -1 ? 1 : this.round
        )
        .then(result => {
          this.loadingData = false;
          Object.freeze(result.data);
          this.data = result.data;

          //adjust for initial timestamp
          if (this.initialTimestamp != 0) {
            this.$nextTick(() => {
              this.$refs.playerControls.SetTimestamp(
                this.initialTimestampRelative
                  ? this.initialTimestamp
                  : this.initialTimestamp - this.roundStart
              );

              this.initialTimestamp = 0;
              this.initialTimestampRelative = false;
            });
          }

          //adjust for autoplay
          if (this.shouldAutoplay) {
            this.$nextTick(() => {
              this.$refs.playerControls.isPlaying = true;
              this.shouldAutoplay = false;
            });
          }
        });
    },
    ToggleVisibility(visibility) {
      this.isVisible = visibility;
      document.body.classList.toggle("no-scroll", this.isVisible);

      if (!this.isVisible) {
        this.$refs.playerControls.LeaveFullscreen();

        if (this.$route.name == "dvtrigger") {
          this.$router.push({ name: "dashboard" });
        }
      }
    },
    ResizePlayer() {
      let aw = window.innerWidth - 720; //width of right side
      let ah = window.innerHeight - 44; //$demoviewer-controls-height: 44px;
      let rr = 0;

      if (aw < ah) {
        rr = aw;
      } else {
        rr = ah;
      }

      this.renderAreaSq = rr;
    },
    RemapCoordinate(coordinate) {
      return (coordinate / 2000) * this.renderAreaSq;
    },
    InterpolateProjectileTrajectory(points) {
      let lerped = [];

      for (let idx = 0; idx < points.length; idx++) {
        let point = points[idx];
        if (points[idx + 1]) {
          let nextPoint = points[idx + 1];

          let lerp_t = d3.interpolateNumber(point.Time, nextPoint.Time);
          let lerp_x = d3.interpolateNumber(point.X, nextPoint.X);
          let lerp_y = d3.interpolateNumber(point.Y, nextPoint.Y);

          for (let i = 0; i < 100; i++) {
            lerped.push({
              Time: lerp_t(i / 100),
              X: lerp_x(i / 100),
              Y: lerp_y(i / 100)
            });
          }
        }
      }

      return lerped;
    },
    OnSkipFreezetime() {
      this.$refs.playerControls.SetTimestamp(15 * 1000 + 1); //15 seconds for freezetime
    }
  },
  computed: {
    mapBackgroundImage() {
      if (!this.data) {
        return "";
      }

      return this.data.ImageUrl.replace("~", "");
    },
    roundStart() {
      if (!this.data) {
        return 0;
      }

      return this.data.Round.RoundStats.StartTime;
    },
    roundEnd() {
      if (!this.data) {
        return 0;
      }

      return this.data.Round.RoundStats.RealEndTime;
    },
    roundPlayers() {
      let players = {};
      if (!this.data) {
        return players;
      }

      //initially setup players
      for (let pms of this.data.Round.PlayerRoundStats) {
        this.bombFieldset[pms.PlayerId] = false;

        let playerStats = this.data.PlayerStats[pms.PlayerId] || {
          SteamName: "unknown",
          AvatarIcon: ""
        };

        let player = {
          Id: pms.PlayerId,
          Name: playerStats.SteamName,
          AvatarURL: playerStats.AvatarIcon,
          Score: this.data.Round.PartialScoreboard.PlayerScores[pms.PlayerId],
          IsCT: pms.IsCT,
          MoneyInitial: pms.MoneyInitial,
          HitsGiven: [],
          HitsTaken: [],
          Attacks: this.weaponFireds[pms.PlayerId] || [],
          Whiteouts: this.data.Round.Flasheds[pms.PlayerId] || [],
          ItemsDropped: this.data.Round.ItemDroppeds[pms.PlayerId] || [],
          ItemsPicked: this.data.Round.ItemPickedUps[pms.PlayerId] || [],
          ItemsSaved: this.data.Round.ItemSaveds[pms.PlayerId] || [],
          RoundStart: this.data.Round.RoundStats.StartTime
        };

        // interpolate player positions for smoother gameplay
        let positions = this.data.Round.PlayerPositions[pms.PlayerId];
        let d3Polated = [];

        for (let idx = 0; idx < positions.length; idx++) {
          let entry = positions[idx];
          if (positions[idx + 1]) {
            let nextEntry = positions[idx + 1];

            if (Math.abs(entry.PlayerView - nextEntry.PlayerView) > 180) {
              if (entry.PlayerView < nextEntry.PlayerView) {
                entry.PlayerView += 360;
              } else {
                nextEntry.PlayerView += 360;
              }
            }

            var lerp_t = d3.interpolateNumber(entry.Time, nextEntry.Time);
            var lerp_x = d3.interpolateNumber(
              entry.PlayerPos.PosX,
              nextEntry.PlayerPos.PosX
            );
            var lerp_y = d3.interpolateNumber(
              entry.PlayerPos.PosY,
              nextEntry.PlayerPos.PosY
            );
            var lerp_v = d3.interpolateNumber(
              entry.PlayerView,
              nextEntry.PlayerView
            );

            let strength = 20;
            for (let i = 0; i < strength; i++) {
              d3Polated.push({
                Time: lerp_t(i / strength),
                PosX: lerp_x(i / strength),
                PosY: lerp_y(i / strength),
                View: -(lerp_v(i / strength) + 270),
                Weapon: entry.Weapon
              });
            }
          }
        }

        player.Positions = d3Polated;

        //add player into playerlist
        players[pms.PlayerId] = player;
      }

      //add hits taken and given to respective players
      for (let damage of this.data.Round.Damages) {
        players[damage.VictimId].HitsTaken.push(damage);
        players[damage.PlayerId].HitsGiven.push(damage);
      }

      return players;
    },
    roundSmokes() {
      if (!this.data) {
        return [];
      }

      return this.data.Round.Smokes.reduce((acc, cur) => {
        cur.Trajectory = this.InterpolateProjectileTrajectory(cur.Trajectory);
        acc.push(cur);

        return acc;
      }, []);
    },
    roundFlashes() {
      if (!this.data) {
        return [];
      }

      return this.data.Round.Flashes.reduce((acc, cur) => {
        cur.Trajectory = this.InterpolateProjectileTrajectory(cur.Trajectory);
        acc.push(cur);

        return acc;
      }, []);
    },
    roundHEs() {
      if (!this.data) {
        return [];
      }

      return this.data.Round.HEs.reduce((acc, cur) => {
        cur.Trajectory = this.InterpolateProjectileTrajectory(cur.Trajectory);
        acc.push(cur);

        return acc;
      }, []);
    },
    roundMolotovs() {
      if (!this.data) {
        return [];
      }

      return this.data.Round.FireNades.reduce((acc, cur) => {
        cur.Trajectory = this.InterpolateProjectileTrajectory(cur.Trajectory);
        acc.push(cur);

        return acc;
      }, []);
    },
    bombData() {
      if (!this.data) {
        return null;
      }

      return {
        defuse: this.data.Round.BombDefused,
        detonation: this.data.Round.BombExplosion,
        plant: this.data.Round.BombPlant,
        timer: this.data.MatchStats.BombTimer
      };
    },
    killData() {
      if (!this.data) {
        return null;
      }

      return this.data.Round.Kills.reduce((acc, cur) => {
        cur.VictimTeam = this.roundPlayers[cur.VictimId].IsCT ? "CT" : "T";
        cur.VictimName = this.roundPlayers[cur.VictimId].Name;

        cur.PlayerTeam = this.roundPlayers[cur.PlayerId].IsCT ? "CT" : "T";
        cur.PlayerName = this.roundPlayers[cur.PlayerId].Name;

        //Someone has assisted in this kill
        if (cur.AssisterId != "") {
          cur.AssisterTeam = this.roundPlayers[cur.AssisterId].IsCT
            ? "CT"
            : "T";
          cur.AssisterName = this.roundPlayers[cur.AssisterId].Name;
        }

        acc.push(cur);

        return acc;
      }, []);
    },
    weaponFireds() {
      if (!this.data) {
        return null;
      }

      return this.data.Round.WeaponFireds.reduce((acc, cur) => {
        if (!acc[cur.PlayerId]) {
          acc[cur.PlayerId] = [];
        }

        acc[cur.PlayerId].push(cur);

        return acc;
      }, {});
    },
    eventData() {
      if (!this.data) {
        return null;
      }

      return {
        bomb: this.bombData.plant ? this.bombData : null,
        kills: this.killData
      };
    }
  }
};
</script>

<style lang="scss">
#demoviewer {
  background: $dark-1;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  opacity: 0;
  pointer-events: none;
  transition: 0.35s;

  &.visible {
    opacity: 1;
    pointer-events: all;
  }

  .loading-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .viewing-area {
    display: flex;
    height: 100vh;

    .close-button {
      position: absolute;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: $purple;
      top: 0;
      right: 0;
      color: white;
      font-size: 30px;
      border-bottom-left-radius: 3px;
    }

    .l {
      // width: 50%;
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      background: $dark-2;

      .render-area {
        // height: calc(100vh - #{$demoviewer-controls-height});
        background-size: cover;
        margin: 0 auto;
        position: relative;
      }

      .share-overlay {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10001;

        .share-content {
          background: $dark-1;
          color: white;
          padding: 30px 20px;
          padding-top: 10px;
          position: relative;
          width: 50%;
          max-width: 400px;
          min-width: 300px;

          .link-wrapper {
            display: flex;
            align-items: center;
          }

          input {
            border: 0;
            outline: 0;
            background: $purple;
            padding: 5px 10px;
            color: white;
            height: 32px;
            flex: 1 1 auto;
          }

          i {
            background: $dark-4;
            color: white;
            height: 32px;
            width: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.35s;
            cursor: pointer;

            &:hover {
              color: #ccc;
            }
          }
        }
      }
    }

    .r {
      width: 720px;
      background: $dark-1;
      border-left: 1px solid $purple;
    }
  }
}
</style>