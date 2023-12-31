<template>
  <div class="rendered-player-object" :class="{highlighted: isHighlighted}">
    <template v-if="!isBeingControlled">
      <div class="death-marker" v-if="!health.hp" :team="player.IsCT ? 'ct' : 't'" :style="style">×</div>
      <div class="player-circle" v-if="health.hp" :team="player.IsCT ? 'ct' : 't'" :style="style">
        <div class="rotation-indicator" :class="{attacking: attackIndicator.visible}"></div>
        <div class="whiteout-indicator" :style="{opacity: whiteoutAlpha}"></div>
        <div class="bomb-indicator" v-if="hasBomb"></div>
      </div>
      <div class="name" v-if="health.hp" :style="{left: `${name.x}px`, top: `${name.y}px`}">
        <span v-if="isControllingBot">Bot ({{ player.Name }})</span>
        <span v-else>{{ player.Name }}</span>
      </div>
      <div
        class="hit-given-indicator"
        v-show="hitGivenIndicator.visible"
        :style="{transform: `rotate(${hitGivenIndicator.rotation}deg)`, width: `${hitGivenIndicator.distance}px`, left: `${hitGivenIndicator.x}px`, top: `${hitGivenIndicator.y}px`}"
      ></div>
      <div
        class="hit-taken-indicator"
        v-show="hitTakenIndicator.visible"
        :style="{left: `${hitTakenIndicator.x}px`, top: `${hitTakenIndicator.y}px`}"
      ></div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["player", "tick", "hasBomb", "isHighlighted"],
  mounted() {},
  data() {
    return {
      lastPositionIndex: 0,
      lastTick: 0,
      position: {
        x: 0,
        y: 0
      },
      rotation: 0,
      hitGivenIndicator: {
        visible: false,
        visibleTime: 150, //ms,
        distance: 0,
        rotation: 0,
        x: 0,
        y: 0
      },
      hitTakenIndicator: {
        visible: false,
        visibleTime: 150, //ms
        x: 0,
        y: 0
      },
      attackIndicator: {
        visible: false,
        visibleTime: 150 //ms
      },
      name: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    UpdatePosition() {
      let first = true;
      let newPosition = null;

      for (
        let idx = this.lastPositionIndex;
        idx < this.player.Positions.length;
        idx++
      ) {
        let position = this.player.Positions[idx];

        //make sure player is alive to prevent potential glitches
        if (this.health.deathTime != -1 && position.Time > this.health.deathTime) {
          break;
        }

        if (this.tick >= position.Time || first) {
          newPosition = position;

          this.lastPositionIndex = idx;
          first = false;
        } else {
          break;
        }
      }

      if (newPosition) {
        this.position.x = window.DemoViewer.RemapCoordinate(newPosition.PosX);
        this.position.y = window.DemoViewer.RemapCoordinate(newPosition.PosY);

        this.name.x = this.position.x;
        this.name.y = this.position.y;

        this.rotation = newPosition.View;
      }
    },
    UpdateHitGivenIndicator() {
      //TODO: Check if current weapon is a grenade. If true, don't indicate a hit.
      this.hitGivenIndicator.visible = false;
      this.hitGivenIndicator.distance = 0;

      for (let hit of this.player.HitsGiven) {
        if (
          hit.Time >= this.tick &&
          hit.Time - this.tick < this.hitGivenIndicator.visibleTime
        ) {
          //indicator must not be displayed for nades of all kind
          //todo: refactor this magic number bullshit
          if ([501, 502, 503, 504, 505, 506].indexOf(hit.Weapon) != -1) {
            continue;
          }

          let targetX = window.DemoViewer.RemapCoordinate(hit.VictimPos.X);
          let targetY = window.DemoViewer.RemapCoordinate(hit.VictimPos.Y);

          this.hitGivenIndicator.distance = Math.sqrt(
            Math.pow(this.position.x - targetX, 2) +
              Math.pow(this.position.y - targetY, 2)
          );

          this.hitGivenIndicator.rotation =
            (Math.atan2(this.position.y - targetY, this.position.x - targetX) *
              180) /
            Math.PI;
          this.hitGivenIndicator.rotation += 180;
          this.hitGivenIndicator.x = this.position.x;
          this.hitGivenIndicator.y = this.position.y;

          this.hitGivenIndicator.visible = true;
          break;
        }
      }
    },
    UpdateHitTakenIndicator() {
      this.hitTakenIndicator.visible = false;

      for (let hit of this.player.HitsTaken) {
        if (
          hit.Time >= this.tick &&
          hit.Time - this.tick < this.hitTakenIndicator.visibleTime
        ) {
          //indicator must not be displayed for nades of all kind
          //todo: refactor this magic number bullshit
          if ([501, 502, 503, 504, 505, 506].indexOf(hit.Weapon) == -1) {
            this.hitTakenIndicator.visible = true;
            this.hitTakenIndicator.x = this.position.x;
            this.hitTakenIndicator.y = this.position.y;
            break;
          }
        }
      }
    },
    UpdateAttackIndicator() {
      this.attackIndicator.visible = false;

      for (let attack of this.player.Attacks) {
        if (
          this.tick >= attack.Time &&
          this.tick < attack.Time + this.attackIndicator.visibleTime
        ) {
          this.attackIndicator.visible = true;
          break;
        }
      }
    }
  },
  watch: {
    tick: {
      handler(cur, old) {
        this.UpdatePosition();
        this.UpdateHitGivenIndicator();
        this.UpdateHitTakenIndicator();
        this.UpdateAttackIndicator();

        if (cur < old) {
          this.lastPositionIndex = 0;
        }
      }
    }
  },
  computed: {
    style() {
      return {
        left: this.position.x + "px",
        top: this.position.y + "px",
        transform: `rotate(${this.rotation}deg)`
      };
    },
    health() {
      let startHealth = 100;
      let deathTime = -1;

      if (this.isControllingBot) {
        let botHealth = 100;
        let bot =
          globalThis.DemoViewer.roundPlayers[this.player.BotTakeover.BotId];

        for (let hit of bot.HitsTaken) {
          if (hit.Time < this.player.BotTakeover.Time) {
            botHealth -= hit.AmountHealth;

            if (deathTime == -1 && botHealth <= 0) {
              deathTime = hit.Time;
            }
          }
        }

        startHealth = botHealth;
      }

      for (let hit of this.player.HitsTaken) {
        if (hit.Time < this.tick) {
          if (this.isControllingBot) {
            if (hit.Time > this.player.BotTakeover.Time) {
              startHealth -= hit.AmountHealth;
            }
          } else {
            startHealth -= hit.AmountHealth;
          }

          if (deathTime == -1 && startHealth <= 0) {
            deathTime = hit.Time;
          }
        }
      }

      return { hp: Math.max(0, startHealth), deathTime: deathTime };
    },
    whiteoutAlpha() {
      let curAlpha = 0;

      for (let whiteout of this.player.Whiteouts) {
        let goneTime = whiteout.Time + whiteout.TimeFlashed;

        if (this.tick >= whiteout.Time && this.tick <= goneTime) {
          let alpha = 1 - (this.tick - whiteout.Time) / whiteout.TimeFlashed;
          if (alpha > curAlpha) {
            curAlpha = alpha;
          }
        }
      }

      return curAlpha;
    },
    isControllingBot() {
      if (
        this.player.BotTakeover != null &&
        this.tick >= this.player.BotTakeover.Time
      ) {
        return true;
      }

      return false;
    },
    isBeingControlled() {
      if (
        this.player.Takeover != null &&
        this.tick >= this.player.Takeover.Time
      ) {
        return true;
      }

      return false;
    }
  }
};
</script>

<style lang="scss">
.rendered-player-object {
  .death-marker {
    position: absolute;
    color: white;
    width: 16px;
    height: 16px;
    margin-left: -8px;
    margin-top: -8px;
    transform: rotate(0deg) !important;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;

    &[team="ct"] {
      color: $ct-color;
    }

    &[team="t"] {
      color: $terrorist-color;
    }
  }

  &.highlighted {
    .player-circle {
      background: $green !important;
    }
  }

  .player-circle {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-left: -8px;
    margin-top: -8px;
    background: white;
    z-index: 100;
    border: 1px solid $purple;

    &[team="ct"] {
      background: $ct-color;

      .rotation-indicator {
        border-color: transparent transparent $ct-color transparent;
      }
    }

    &[team="t"] {
      background: $terrorist-color;

      .rotation-indicator {
        border-color: transparent transparent $terrorist-color transparent;
      }
    }

    .rotation-indicator {
      position: absolute;
      top: -9px;
      left: 2.5px;
      height: 10px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 4px 8px 4px;

      &.attacking {
        border-color: transparent transparent orange transparent;
      }
    }

    .whiteout-indicator {
      width: 100%;
      height: 100%;
      background: white;
      border-radius: 50%;
      opacity: 0;
    }

    .bomb-indicator {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 1px solid $orange;
      border-radius: 50%;
    }
  }

  .name {
    color: white;
    white-space: nowrap;
    width: 70px;
    text-align: center;
    overflow: hidden;
    margin-left: -35px;
    margin-top: -35px;
    position: absolute;
    z-index: 101;
    text-overflow: ellipsis;
    font-size: 10px;
    text-rendering: optimizeLegibility;
    font-smoothing: antialiased;
    -webkit-font-smoothing: antialiased;
    opacity: 0.5;
    user-select: none;

    &:hover {
      overflow: visible;
    }
  }

  .hit-given-indicator {
    position: absolute;
    width: 0px;
    height: 1px;
    background: yellow;
    // left: 50%;
    // top: 0%;
    transform-origin: 0 0;
    z-index: 99; //appear below player
    backface-visibility: hidden;
  }

  .hit-taken-indicator {
    position: absolute;
    width: 22px;
    height: 22px;
    margin-left: -11px;
    margin-top: -11px;
    z-index: 99;
    background: rgba(255, 0, 0, 0.5);
    border-radius: 50%;
  }
}
</style>