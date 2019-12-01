<template>
  <div class="dv-player-frame" :class="{dead: health <= 0}">
    <div class="col-1">
      <div class="avatar">
        <img :src="`https://mentor.gg/Content/Images/Ranks/${rankImageName}.png`" />
      </div>
      <div class="health-loadout">
        <div class="healthbar-bg">
          <div class="healthbar" :style="{width: `${health}%`}" :team="player.IsCT ? 'ct' : 't'"></div>
          <div class="health-name">
            <div class="name">{{ player.Name }}</div>
            <div class="health">{{ health }}</div>
          </div>
        </div>
        <div class="loadout">
          <div class="loadout-l">
            <div class="armor">
              <span v-if="loadout.armor">{{ $helpers.EquipmentIdToFontCharacter(loadout.armor) }}</span>
            </div>
            <div class="kitbomb">
              <span
                v-if="loadout.kitbomb"
              >{{ $helpers.EquipmentIdToFontCharacter(loadout.kitbomb) }}</span>
            </div>
            <div
              class="knife"
              :class="{active: activeWeapon == Equipment.Knife}"
            >{{ $helpers.EquipmentIdToFontCharacter(Equipment.Knife) }}</div>
            <div class="grenades">
              <span
                class="grenade"
                v-for="(grenadeId, index) in loadout.grenades"
                :key="`${grenadeId}-${index}`"
                :class="{active: activeWeapon == grenadeId}"
              >{{ $helpers.EquipmentIdToFontCharacter(grenadeId) }}</span>
            </div>
          </div>
          <div class="loadout-r">
            <div
              class="secondary"
              :class="{active: activeWeapon == loadout.secondary}"
            >{{ $helpers.EquipmentIdToFontCharacter(loadout.secondary) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-2">
      <div
        class="primary"
        :class="{active: activeWeapon == loadout.primary}"
      >{{ $helpers.EquipmentIdToFontCharacter(loadout.primary) }}</div>
    </div>
    <div class="col-3">
      <div class="money">
        <div class="s">-${{ inventory.money.spent }}</div>
        <div class="m">${{ inventory.money.money }}</div>
      </div>
    </div>
    <div class="col-4">
      <div class="kad">
        <div class="k">{{ player.Score.Kills }}</div>
        <div class="a">{{ player.Score.Assists }}</div>
        <div class="d">{{ player.Score.Deaths }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["player", "tick", "equipmentInfo"],
  mounted() {
  },
  data() {
    return {
      lastPositionIndex: 0,
      activeWeapon: null,
      Equipment: {
        Zeus: 401,
        Armor: 402,
        ArmorHelmet: 403,
        C4: 404,
        Knife: 405,
        DefuseKit: 406,
        Grenades: [501, 502, 503, 504, 505, 506]
      }
    };
  },
  methods: {
    UpdateActiveWeapon() {
      for (
        let idx = this.lastPositionIndex;
        idx < this.player.Positions.length;
        idx++
      ) {
        let position = this.player.Positions[idx];

        if (this.tick >= position.Time) {
          this.activeWeapon = position.Weapon;
          this.lastPositionIndex = idx;
        } else {
          break;
        }
      }
    }
  },
  computed: {
    largeAvatar() {
      return this.player.AvatarURL.split(".jpg")[0] + "_full.jpg";
    },
    health() {
      return Math.max(this.player.HitsTaken.reduce((acc, cur) => {
        if (cur.Time < this.tick) {
          return acc - cur.AmountHealth;
        } else {
          return acc;
        }
      }, 100), 0);
    },
    attacksWithSingleUseItem() {
      return this.player.Attacks.filter(e => {
        if (e.Weapon == this.Equipment.Zeus || this.Equipment.Grenades.indexOf(e.Weapon) != -1) {
          return true;
        }

        return false;
      });
    },
    inventory() {
      if (!this.player) {
        return null;
      }

      let items = {};
      let money = this.player.MoneyInitial;
      let spent = 0;

      for (let item of this.player.ItemsSaved) {
        if (items[item.Equipment] && item.Time >= this.player.RoundStart) {
          items[item.Equipment]++;
        } else {
          items[item.Equipment] = 1;
        }
      }

      for (let item of this.player.ItemsPicked) {
        if (this.tick > item.Time && item.Time >= this.player.RoundStart) {
          if (items[item.Equipment]) {
            items[item.Equipment]++;
          } else {
            items[item.Equipment] = 1;
          }

          if (item.Buy) {
            let price = this.equipmentInfo[item.Equipment].Price;
            money -= price;
            spent += price;
          }
        }
      }

      for (let item of this.player.ItemsDropped) {
        if (this.tick > item.Time && item.Time >= this.player.RoundStart) {
          if (items[item.Equipment]) {
            items[item.Equipment]--;
            if (items[item.Equipment] <= 0) {
              delete items[item.Equipment];
            }
          }
        }
      }

      for (let attack of this.attacksWithSingleUseItem) {        
        if (this.tick > attack.Time && attack.Time >= this.player.RoundStart) {
          if (items[attack.Weapon]) {
            items[attack.Weapon]--;
            if (items[attack.Weapon] <= 0) {
              delete items[attack.Weapon];
            }
          }
        }
      }

      return {
        items: items,
        money: {
          money: money,
          spent: spent
        }
      };
    },
    loadout() {
      let grenades = [];
      let primary = null;
      let secondary = null;

      let primaryClasses = [
        "SubMachinegun",
        "Shotgun",
        "Machinegun",
        "Rifle",
        "SniperRifle"
      ];

      for (let equipmentId in this.inventory.items) {
        for (let grenadeId of this.Equipment.Grenades) {
          if (grenadeId == equipmentId) {
            for (let i = 0; i < this.inventory.items[equipmentId]; i++) {
              grenades.push(grenadeId);
            }
          }
        }

        if (this.equipmentInfo[equipmentId].WeaponClass == "Pistol") {
          secondary = equipmentId;
        } else {
          if (
            primaryClasses.indexOf(
              this.equipmentInfo[equipmentId].WeaponClass
            ) != -1
          ) {
            primary = equipmentId;
          }
        }
      }

      //assign secondary as primary if player doesn't have proper primary (like ak or m4)
      //and fallback to knife if player doesn't own either
      if (!primary) {
        if (secondary) {
          primary = secondary;
          secondary = null;
        } else {
          primary = this.Equipment.Knife;
        }
      }

      let armor = null;
      if (this.inventory.items[this.Equipment.Armor]) {
        armor = this.Equipment.Armor;
      }

      if (this.inventory.items[this.Equipment.ArmorHelmet]) {
        armor = this.Equipment.ArmorHelmet;
      }

      let kitbomb = null;
      if (this.inventory.items[this.Equipment.DefuseKit]) {
        kitbomb = this.Equipment.DefuseKit;
      }

      if (this.inventory.items[this.Equipment.C4]) {
        kitbomb = this.Equipment.C4;
      }

      globalThis.DemoViewer.bombFieldset[this.player.Id] = !!this.inventory
        .items[this.Equipment.C4];

      return {
        grenades: grenades,
        primary: primary,
        secondary: secondary,
        armor: armor,
        kitbomb: kitbomb
      };
    },
    rankImageName() {
      return this.player.Score.RankBeforeMatch < 10
        ? "0" + this.player.Score.RankBeforeMatch
        : this.player.Score.RankBeforeMatch;
    }
  },
  watch: {
    tick: {
      handler(cur, old) {
        this.UpdateActiveWeapon();

        if (cur < old) {
          this.lastPositionIndex = 0;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.dv-player-frame {
  display: flex;
  align-items: center;
  padding-right: 20px;

  &.dead {
    filter: grayscale(100%);

    .col-1 {
      .health-loadout {
        .healthbar-bg {
          .health-name {
            background: #333;
          }
        }

        .loadout {
          opacity: 0;
        }
      }
    }

    .col-2 {
      .primary {
        opacity: 0;
      }
    }
  }

  .col-1 {
    display: flex;
    width: 40%;
    height: 65px;
    min-width: 300px;

    .avatar {
      width: 65px;
      height: 30px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .health-loadout {
      flex: 1 1 auto;
      position: relative;

      .healthbar-bg {
        background: #111;
        width: 100%;
        height: 30px;

        .healthbar {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 30px;
          background: white;
          transition: 0.3s;

          &[team="ct"] {
            background: $ct-color;
          }

          &[team="t"] {
            background: $terrorist-color;
          }
        }

        .health-name {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 30px;
          display: flex;
          justify-content: space-between;
          color: white;
          align-items: center;

          .health {
            width: 30%;
            padding-right: 10px;
            text-align: right;
            font-weight: 500;
          }

          .name {
            width: 70%;
            padding-left: 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 14px;
          }
        }
      }

      .loadout {
        @include weapon-font;
        color: white;
        display: flex;
        align-items: center;
        font-size: 26px;
        justify-content: space-between;
        padding: 5px 0;
        margin-left: -57px;

        .loadout-l {
          display: flex;

          .armor {
            padding-left: 16px;
            width: 40px;
            margin-right: 10px;
          }

          .kitbomb {
            width: 40px;
          }

          .knife {
            width: 60px;
            margin-right: 10px;
            color: $dark-4;

            &.active {
              color: white;
            }
          }

          .grenades {
            display: flex;

            .grenade {
              color: $dark-4;
              margin-right: 3px;

              &.active {
                color: white;
              }
            }
          }
        }

        .loadout-r {
          .secondary {
            color: $dark-4;
            font-size: 22px;

            &.active {
              color: white;
            }
          }
        }
      }
    }
  }

  .col-2 {
    .primary {
      @include weapon-font;
      color: $dark-4;
      font-size: 30px;
      width: 160px;
      padding-left: 10px;
      text-align: center;

      &.active {
        color: white;
      }
    }
  }

  .col-3 {
    width: 60px;
    flex: 0 0 60px;

    .money {
      text-align: right;
      font-weight: 500;

      .s {
        color: #e05658;
        font-size: 12px;
      }

      .m {
        color: white;
      }
    }
  }

  .col-4 {
    width: 150px;
    flex: 0 0 150px;
    margin-left: 40px;

    .kad {
      display: flex;

      .k,
      .a,
      .d {
        color: white;
        width: 33.33%;
        text-align: center;
        font-weight: 500;
      }
    }
  }
}
</style>