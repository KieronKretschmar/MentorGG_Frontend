<template>
  <div class="dv-kill-feed">
    <div
      v-for="kill in visibleKills"
      :key="kill.VictimId"
      class="entry"
      :style="{opacity: kill.Opacity}"
    >
      <div class="name" :class="{ct: kill.PlayerTeam == 'CT'}">{{ kill.PlayerName }}</div>
      <span v-if="kill.AssisterId != ''">
        <span class="assist-plus">+</span>
        <div class="name" :class="{ct: kill.AssisterTeam == 'CT'}">{{ kill.AssisterName }}</div>
      </span>
      <div class="weapon">{{ $helpers.EquipmentIdToFontCharacter(kill.Weapon) }}</div>
      <img class="headshot-icon" src="@/assets/headshot.png" v-if="kill.KillType == 2" />
      <div class="name" :class="{ct: kill.VictimTeam == 'CT'}">{{ kill.VictimName }}</div>
    </div>
  </div>
</template>

<script>
//TODO: Add more event types (flash assist, wallbang)
export default {
  props: ["kills", "tick"],
  mounted() {},
  data() {
    return {
      timeVisible: 2500,
    };
  },
  computed: {
    visibleKills() {
      if (!this.kills) {
        return [];
      }

      return this.kills.reduce((acc, cur) => {
        let fadeTime = cur.Time + this.timeVisible;
        if (this.tick >= cur.Time && this.tick <= fadeTime) {
          cur.Opacity = (fadeTime - this.tick) / (this.timeVisible - 1000);
          acc.push(cur);
        }

        return acc;
      }, []);
    },
  },
};
</script>

<style lang="scss">
.dv-kill-feed {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9999;
  display: flex;
  flex-direction: column;

  .entry {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    background: $dark-2;
    margin-bottom: 5px;
    border: 1px solid $purple;
    border-radius: 3px;
    align-self: flex-end;

    span {
      display: flex;
      align-items: center;

      .assist-plus {
        display: inline-block;
        margin: 0 5px;
        color: white;
      }
    }

    .name {
      color: lighten($terrorist-color, 20%);
      font-weight: 700;
      font-size: 12px;

      &.ct {
        color: lighten($ct-color, 20%);
      }
    }

    .weapon {
      @include weapon-font;
      color: white;
      margin: 0 10px;
    }

    .headshot-icon {
      width: 26px;
      margin-right: 5px;
    }
  }
}
</style>