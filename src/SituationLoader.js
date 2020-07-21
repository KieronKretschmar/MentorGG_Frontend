import Enums from './enums';
import Helpers from './helpers';
import SituationBase from '@/components/Situations/SituationBase';

export default class SituationLoader {

  //Add anything of type Enums.SituationType
  //to the following array to hide the respective situation on the frontend
  static MutedSituations = [
    Enums.SituationType.PushBeforeSmokeDetonated
  ];

  static getSituationData(situationType) {
    let data = {};
    let add_data = (type, component, name, description, fluff, additionalFields = []) => {
      data[type] = {
        type: type,
        typeName: Enums.SituationType.ToString(type),
        name: name,
        component: component,
        description: description,
        fluff: fluff,
        isHighlight: Enums.SituationType.IsHighlight(type),
        isMisplay: Enums.SituationType.IsMisplay(type),
        additionalFields: additionalFields
      };
    }

    add_data(
      Enums.SituationType.Unknown,
      SituationBase,
      "Unknown",
      "No data available",
      "No data available"
    );

    /*
        H I G H L I G H T S
        I
  G
  H
        L
        I
        G
        H
        T
        S
    */
    add_data(
      Enums.SituationType.EffectiveHeGrenade,
      SituationBase,
      "Effective HE Grenade",
      "A HE Grenade classifies as effective when it either deals a lot of damage or lands a killing blow.",
      "Learn to predict the enemies' positions at the start of the round for effective HE grenades, and utilize map geometry to make your HEs less foreseeable.",
      [{
        key: "EnemiesHit",
        keyDisplay: "Enemies Hit"
      }, {
        key: "EnemiesKilled",
        keyDisplay: "Enemies Killed"
      }, {
        key: "TotalEnemyDamage",
        keyDisplay: "Total Damage"
      }]
    );

    add_data(
      Enums.SituationType.KillWithOwnFlashAssist,
      SituationBase,
      "Kill With Own Flash Assist",
      "This happens whenever you land the killing blow on an enemy that was flashed by you.",
      "Practice pop flashes and keep track of your enemies to get a tactical advantage by flashing them before you engage in a fight."
    );

    add_data(
      Enums.SituationType.Clutch,
      SituationBase,
      "Clutch",
      "Occurs whenever you manage to come back from a serious disadvantage, ultimately leading to your team winning the round.",
      "Be aware of your surroundings and the enemies' positions and health. Outplay them and get that win.",
      [{
        key: "EnemiesAlive",
        keyDisplay: "Setting",
        render: (val) => `1 on ${val}`
      },
      ]
    );

    add_data(
      Enums.SituationType.HighImpactRound,
      SituationBase,
      "High Kill Round",
      "A round in which the player killed the majority of the opposing team, regardless of their health.",
      "Git gud, lel.",
      [{
        key: "DamageDealt",
        keyDisplay: "Damage Dealt"
      }, {
        key: "Kills",
        keyDisplay: "Kills"
      }]
    );

    add_data(
      Enums.SituationType.MultiKill,
      SituationBase,
      "Multikill",
      "Killing multiple enemies in quick succession will yield a multikill highlight.",
      "Good players will often end up getting multiple kills. As you become a better player, the highlights will start raining in.",
      [{
        key: "Kills",
        keyDisplay: "Kills"
      },
      {
        key: "FirstKillWeapon",
        keyDisplay: "First Kill Weapon",
        render: (val) => `<span class="weapon">${Helpers.EquipmentIdToFontCharacter(val)}</span>`
      }]
    );

    add_data(
      Enums.SituationType.TradeKill,
      SituationBase,
      "Trade Kill",
      "A Trade Kill is when an enemy kills one of your teammates and you \"trade the kill\" by killing the opponent shortly after. ",
      "Communicate, stay close to each other and peek together teammates to enable even more tradekills. Also call out enemies' positions once you die, so your teammates can trade your death. \n\n " +
      "Take care not to stand in a straight line, as it disables you from shooting and makes it easier for the enemy to kill both of you. ",
      [{
        key: "TimeBetweenKills",
        keyDisplay: "Time Between Kills",
        after: "ms"
      }]
    );

    add_data(
      Enums.SituationType.KillThroughSmoke,
      SituationBase,
      "Kill Through Smoke",
      "This happens whenever you manage to kill an enemy that, from your point of view, stands behind a live smoke grenade",
      "It can be a good idea to spray smokes based on a hunch. You may also be able to predict their movement or spray into common one-way smoke spots.",
      [{
        key: "Weapon",
        keyDisplay: "Weapon",
        render: (val) => `<span class="weapon">${Helpers.EquipmentIdToFontCharacter(val)}</span>`
      }]
    );

    add_data(
      Enums.SituationType.WallBangKill,
      SituationBase,
      "Wallbang Kill",
      "This happens whenever you manage to kill an enemy by having your bullets penetrate an object they are hiding behind.",
      "Learn the different spots that are common for wallbanging on each map. Keep in mind that penetrating objects lowers your damage output depending on your weapon.",
      [{
        key: "Weapon",
        keyDisplay: "Weapon",
        render: (val) => `<span class="weapon">${Helpers.EquipmentIdToFontCharacter(val)}</span>`
      }]
    );

    add_data(
      Enums.SituationType.CollateralKill,
      SituationBase,
      "Collateral Kill",
      "This happens whenever you manage to kill multiple enemies in a single shot.",
      "Play AWP and pray to kennyS, heh.",
      [{
        key: "EnemiesKilled",
        keyDisplay: "Enemies Killed"
      }, {
        key: "Weapon",
        keyDisplay: "Weapon",
        render: (val) => `<span class="weapon">${Helpers.EquipmentIdToFontCharacter(val)}</span>`
      }]
    );

    add_data(
      Enums.SituationType.FlashAssist,
      SituationBase,
      "Flash Assist",
      "This happens whenever you flash an enemy and one of your teammates lands the killing blow on them.",
      "Call out incoming flashes and coordinate them with your teammates beforehand. Make sure to not flash your teammates in the process!",
      [{
        key: "FlashedEnemiesDeaths",
        keyDisplay: "Flashed Enemies Deaths"
      }, {
        key: "TimeFlashedEnemies",
        keyDisplay: "Time Flashed Enemies",
        after: "ms"
      }, {
        key: "TimeFlashedTeammates",
        keyDisplay: "Time Flashed Teammates",
        after: "ms"
      }]
    );

    /* 
        M I S P L A Y S
        I
        S
        P
        L
        A
        Y
        S
    */
    add_data(
      Enums.SituationType.SmokeFail,
      SituationBase,
      "Smoke Fail",
      "This happens when you miss a smoke lineup recognized by MENTOR.GG.",
      "Good smokes can disable enemies from holding an angle and force them to reposition, but missing a smoke can lead to unexpected deaths and lost rounds. Practicing smoke lineups is essential for effective T and CT side.",
      [{
        key: "LineupId",
        keyDisplay: "Lineup",
        render: (data) => {
          return `<a href="/profile/${data.occurence.SteamId}/smokes?map=${data.matches[data.occurence.MatchId].Map}&lineupId=${data.occurence.LineupId}">Link</a>`;
        },
        fullData: true
      }]
    );

    add_data(
      Enums.SituationType.DeathInducedBombDrop,
      SituationBase,
      "Death As Bomb Carrier",
      "This is a misplay by a terrorist who carries the bomb and dies without any other teammates being nearby, thereby causing a tactical disadvantage.",
      "Drop the bomb in a safe spot before you're going to push or even peek an angle. Generally, terrorists want to hide information about the bomb's location for as long as possible and make it easily accessible for teammates."
    );

    add_data(
      Enums.SituationType.SelfFlash,
      SituationBase,
      "Self Flash",
      "This misplay occurs when you throw a flashbang and end up blinding yourself to a certain degree.",
      "Don't expose yourself to your own flashbangs and try to face away from them when they detonate.\n\nFlashing behind you before peeking an angle is a great technique that, when practiced efficiently, can be an absolute game changer.",
      [{
        key: "TimeFlashedSelf",
        keyDisplay: "Time Flashed Self",
        after: 'ms'
      }, {
        key: "AngleToCrosshairSelf",
        keyDisplay: "Turned Away",
        render: (val) => {
          let eqvlnt = "Almost";

          if (val >= 0 && val < 53) {
            eqvlnt = "No";
          }
          else if (val >= 53 && val <= 71) {
            eqvlnt = "Slightly"
          }

          return `${eqvlnt} (${val}°)`;
        }
      }]
    );

    add_data(
      Enums.SituationType.TeamFlash,
      SituationBase,
      "Team Flash",
      "A team flash occurs when you throw a flashbang and end up blinding one or more teammates to a certain degree.",
      "Always keep track of your teammates' positions and well... don't throw flashes into their face.\n\nIt's also a good habit to announce your flashbangs on the voice channel, so your teammates can react appropriately.",
      [{
        key: "FlashedTeammates",
        keyDisplay: "Flashed Teammates"
      }, {
        key: "FlashedTeammatesDeaths",
        keyDisplay: "Flashed Teammates Deaths"
      }, {
        key: "TimeFlashedTeammates",
        keyDisplay: "Time Flashed Teammates",
        after: "ms"
      }, {
        key: "TimeFlashedEnemies",
        keyDisplay: "Time Flashed Enemies",
        after: "ms"
      }]
    );

    add_data(
      Enums.SituationType.RifleFiredWhileMoving,
      SituationBase,
      "Rifle Fired While Moving",
      "This happens when you fire a rifle while moving with more than a third of the maximum velocity, which makes guns of the rifle category very inaccurate.",
      "Just stand still when you pull the trigger, really. Practice side-stepping after shooting some bullets to let your weapon cool down for a moment while also making it harder for enemies to aim at you. Then come to a stop and continue shooting.",
      [{
        key: "Weapon",
        keyDisplay: "Weapon",
        render: (val) => `<span class="weapon">${Helpers.EquipmentIdToFontCharacter(val)}</span>`
      }]
    );

    add_data(
      Enums.SituationType.UnnecessaryReload,
      SituationBase,
      "Unnecessary Reload",
      "A reload is considered unnecessary and risky when you still had enough bullets left and took damage during or shortly after the reload process.",
      "Try to reload only when you're completely safe. It's better to try to kill an enemy with 5 bullets left than to die with a full magazine. If you have no bullets left and can't evade the enemy, switching weapons is a valid option.",
      [{
        key: "AmmoBefore",
        keyDisplay: "Bullets left"
      },
      {
        key: "Weapon",
        keyDisplay: "Weapon",
        render: (val) => `<span class="weapon">${Helpers.EquipmentIdToFontCharacter(val)}</span>`
      }]
    );

    add_data(
      Enums.SituationType.PushBeforeSmokeDetonated,
      SituationBase,
      "Push Before Smoke Popped",
      "This covers all situations in which you took damage from someone who's vision would have been obstructed by a smoke grenade that popped shortly after.",
      "Coordinate smoke grenade usage with your teammates before a push and give the smokes enough time to pop. Dying because you couldn't wait one more second sucks, right?"
    );

    add_data(
      Enums.SituationType.BombDropAtSpawn,
      SituationBase,
      "Bomb Left At Spawn",
      "This describes a situation in which the bomb was dropped at T spawn and a teammate had to make a turn and run back to pick it up.",
      "Carry the bomb just a little further so that you can drop the bomb safely and closer to your team.\n\nIf you can't do that, try to drop it directly to a teammate so that auto-pickup will take care of it."
    );

    add_data(
      Enums.SituationType.HasNotBoughtDefuseKit,
      SituationBase,
      "Has Not Bought Defuse Kit",
      "Occurs whenever the player did not buy a defuse kit despite having enough money. It will not occur if your team already has a sufficient amount of kits available.",
      "Just buy it, really. It's very affordable and often decides between a round win or loss.",
      [{
        key: "MoneyLeft",
        keyDisplay: "Money Left",
        after: '$'
      }, {
        key: "DefuseKitsInTeam",
        keyDisplay: "Defuse Kits In Team"
      }]
    );

    add_data(
      Enums.SituationType.MissedTradeKill,
      SituationBase,
      "Missed Trade Kill Opportunity",
      "This occurs when a nearby teammate gets killed by an enemy but you don't engage in the fight." +
      "In most cases a 2on1 is much preferable over multiple 1on1's, as the enemy can't shoot multiple players at the same time.",
      "Communicate and peek together with your teammates to increase chances of succeeding. Even if your teammate has already died, " +
      "it can be a great opportunity to peek aggressively, as you know exactly where the enemy is and he may be distracted and/or low on ammo."
    );

    if (data[situationType] == undefined) {
      return null;
    }

    return data[situationType];
  }

  static findUnregisteredSituations() {
    let failed = false;

    for (let situationName in Enums.SituationType) {
      if (typeof Enums.SituationType[situationName] === "function") {
        continue;
      }

      if (this.getSituationData(Enums.SituationType[situationName]) == null) {
        //eslint-disable-next-line
        console.log("Found unregistered situation type: " + situationName);
        failed = true;
      }
    }

    if (failed) {
      alert("One or more situation types are not registered in SituationLoader. Check debug console for more information");
    }
  }

  static getSituationsByRank() {
    return {
      "Data": {
        "EffectiveHeGrenade": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 60592,
            "SituationsPerPlayerAndRound": 0.024770161015040253
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 1189,
            "SituationsPerPlayerAndRound": 0.012161070256006382
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 2626,
            "SituationsPerPlayerAndRound": 0.012335066630967312
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 2299,
            "SituationsPerPlayerAndRound": 0.013203310303635935
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 2961,
            "SituationsPerPlayerAndRound": 0.013600099210450167
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 3938,
            "SituationsPerPlayerAndRound": 0.014388489208633094
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 4935,
            "SituationsPerPlayerAndRound": 0.015303654270758391
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 6449,
            "SituationsPerPlayerAndRound": 0.017031649447507975
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 7865,
            "SituationsPerPlayerAndRound": 0.018664685892202836
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 9286,
            "SituationsPerPlayerAndRound": 0.020410092071802378
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 12713,
            "SituationsPerPlayerAndRound": 0.02321288367082367
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 12912,
            "SituationsPerPlayerAndRound": 0.02511104714933605
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 12069,
            "SituationsPerPlayerAndRound": 0.027167319081501957
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 385009,
            "SituationCount": 11191,
            "SituationsPerPlayerAndRound": 0.02906685298265755
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329383,
            "SituationCount": 9818,
            "SituationsPerPlayerAndRound": 0.0298072456684164
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255249,
            "SituationCount": 7905,
            "SituationsPerPlayerAndRound": 0.030969758941269115
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241650,
            "SituationCount": 7824,
            "SituationsPerPlayerAndRound": 0.03237740533829919
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 4094,
            "SituationsPerPlayerAndRound": 0.032652735683522095
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 1366,
            "SituationsPerPlayerAndRound": 0.03547867643239312
          }
        },
        "KillWithOwnFlashAssist": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 18303,
            "SituationsPerPlayerAndRound": 0.007482312137877636
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 344,
            "SituationsPerPlayerAndRound": 0.003518425709054832
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 987,
            "SituationsPerPlayerAndRound": 0.004636218874624804
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 831,
            "SituationsPerPlayerAndRound": 0.004772488413362967
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 1058,
            "SituationsPerPlayerAndRound": 0.0048594748276448085
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 1348,
            "SituationsPerPlayerAndRound": 0.004925262430989692
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 1656,
            "SituationsPerPlayerAndRound": 0.005135329579002208
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 2114,
            "SituationsPerPlayerAndRound": 0.0055830216982527305
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 2356,
            "SituationsPerPlayerAndRound": 0.0055910998044538945
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 2754,
            "SituationsPerPlayerAndRound": 0.006053133056832194
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 3390,
            "SituationsPerPlayerAndRound": 0.006189858856610732
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 3238,
            "SituationsPerPlayerAndRound": 0.00629720962434558
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 3074,
            "SituationsPerPlayerAndRound": 0.006919574020758722
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 384984,
            "SituationCount": 2892,
            "SituationsPerPlayerAndRound": 0.007512000498722025
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329308,
            "SituationCount": 2587,
            "SituationsPerPlayerAndRound": 0.007855867455391305
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255124,
            "SituationCount": 2307,
            "SituationsPerPlayerAndRound": 0.00904266160768881
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241625,
            "SituationCount": 2095,
            "SituationsPerPlayerAndRound": 0.00867046042421107
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 1270,
            "SituationsPerPlayerAndRound": 0.010129207210081353
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 409,
            "SituationsPerPlayerAndRound": 0.010622824788322684
          }
        },
        "Clutch": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 16769,
            "SituationsPerPlayerAndRound": 0.006855209104522214
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 632,
            "SituationsPerPlayerAndRound": 0.0064640844422170175
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 1608,
            "SituationsPerPlayerAndRound": 0.007553231965954089
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 1352,
            "SituationsPerPlayerAndRound": 0.007764626155074287
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 1641,
            "SituationsPerPlayerAndRound": 0.007537238366885756
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 2109,
            "SituationsPerPlayerAndRound": 0.007705770376081055
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 2411,
            "SituationsPerPlayerAndRound": 0.007476618124984495
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 2775,
            "SituationsPerPlayerAndRound": 0.007328706344678963
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 3312,
            "SituationsPerPlayerAndRound": 0.00785981432612534
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 3563,
            "SituationsPerPlayerAndRound": 0.007831268366555231
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 4208,
            "SituationsPerPlayerAndRound": 0.007683459017291435
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 4004,
            "SituationsPerPlayerAndRound": 0.007786913939431656
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 3475,
            "SituationsPerPlayerAndRound": 0.007822225023466675
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 385009,
            "SituationCount": 2786,
            "SituationsPerPlayerAndRound": 0.007236194478570631
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329383,
            "SituationCount": 2384,
            "SituationsPerPlayerAndRound": 0.0072377748699841826
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255249,
            "SituationCount": 1972,
            "SituationsPerPlayerAndRound": 0.007725789327284338
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241650,
            "SituationCount": 1793,
            "SituationsPerPlayerAndRound": 0.007419822056693565
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 982,
            "SituationsPerPlayerAndRound": 0.007832190141968415
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 335,
            "SituationsPerPlayerAndRound": 0.008700846709261856
          }
        },
        "HighImpactRound": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 118416,
            "SituationsPerPlayerAndRound": 0.048408756713048035
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 3929,
            "SituationsPerPlayerAndRound": 0.040185740147896616
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 9592,
            "SituationsPerPlayerAndRound": 0.0450563439163132
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 8219,
            "SituationsPerPlayerAndRound": 0.047202265065499675
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 10298,
            "SituationsPerPlayerAndRound": 0.04729950073259569
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 12846,
            "SituationsPerPlayerAndRound": 0.046936143314906226
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 15015,
            "SituationsPerPlayerAndRound": 0.046562182142945746
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 18375,
            "SituationsPerPlayerAndRound": 0.048527920390441785
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 20869,
            "SituationsPerPlayerAndRound": 0.04952489890456211
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 22819,
            "SituationsPerPlayerAndRound": 0.0501548450340791
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 27294,
            "SituationsPerPlayerAndRound": 0.04983658042251721
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 26800,
            "SituationsPerPlayerAndRound": 0.052120203191001094
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 23361,
            "SituationsPerPlayerAndRound": 0.05258561115775683
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 385009,
            "SituationCount": 19792,
            "SituationsPerPlayerAndRound": 0.051406590495287126
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329383,
            "SituationCount": 16842,
            "SituationsPerPlayerAndRound": 0.05113196491622215
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255249,
            "SituationCount": 13944,
            "SituationsPerPlayerAndRound": 0.054629009320310756
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241650,
            "SituationCount": 13223,
            "SituationsPerPlayerAndRound": 0.05471963583695427
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 7239,
            "SituationsPerPlayerAndRound": 0.05773648109746371
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 2607,
            "SituationsPerPlayerAndRound": 0.06771076827177809
          }
        },
        "MultiKill": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 111851,
            "SituationsPerPlayerAndRound": 0.045724968307586274
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 2923,
            "SituationsPerPlayerAndRound": 0.029896390545253705
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 7364,
            "SituationsPerPlayerAndRound": 0.03459079614259074
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 6302,
            "SituationsPerPlayerAndRound": 0.03619280623467319
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 8022,
            "SituationsPerPlayerAndRound": 0.036845658853843714
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 10010,
            "SituationsPerPlayerAndRound": 0.03657409268116233
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 11960,
            "SituationsPerPlayerAndRound": 0.037088491403904834
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 14488,
            "SituationsPerPlayerAndRound": 0.03826244955737255
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 16730,
            "SituationsPerPlayerAndRound": 0.03970250412925028
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 18259,
            "SituationsPerPlayerAndRound": 0.04013222820795172
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 22199,
            "SituationsPerPlayerAndRound": 0.04053353296693264
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 21928,
            "SituationsPerPlayerAndRound": 0.042645216998965375
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 19217,
            "SituationsPerPlayerAndRound": 0.0432574671297724
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 385009,
            "SituationCount": 16819,
            "SituationsPerPlayerAndRound": 0.04368469308509671
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329383,
            "SituationCount": 14804,
            "SituationsPerPlayerAndRound": 0.04494463891579104
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255249,
            "SituationCount": 12007,
            "SituationsPerPlayerAndRound": 0.04704034100035651
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241650,
            "SituationCount": 11629,
            "SituationsPerPlayerAndRound": 0.04812331884957583
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 6352,
            "SituationsPerPlayerAndRound": 0.050661987557824216
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 2244,
            "SituationsPerPlayerAndRound": 0.058282686613682404
          }
        },
        "TradeKill": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 73267,
            "SituationsPerPlayerAndRound": 0.02995173268895158
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 2674,
            "SituationsPerPlayerAndRound": 0.0273496230988739
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 4020,
            "SituationsPerPlayerAndRound": 0.01888307991488522
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 2951,
            "SituationsPerPlayerAndRound": 0.016947789780787145
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 3589,
            "SituationsPerPlayerAndRound": 0.016484551187539904
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 5190,
            "SituationsPerPlayerAndRound": 0.018962991110412837
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 7059,
            "SituationsPerPlayerAndRound": 0.021890272643826442
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 10073,
            "SituationsPerPlayerAndRound": 0.0266025437873698
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 9836,
            "SituationsPerPlayerAndRound": 0.023342129743891556
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 10672,
            "SituationsPerPlayerAndRound": 0.023456440080796358
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 12384,
            "SituationsPerPlayerAndRound": 0.022612156955831065
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 10817,
            "SituationsPerPlayerAndRound": 0.021036725295412645
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 9050,
            "SituationsPerPlayerAndRound": 0.02037155006111465
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 385009,
            "SituationCount": 7934,
            "SituationsPerPlayerAndRound": 0.020607310478456348
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329383,
            "SituationCount": 8369,
            "SituationsPerPlayerAndRound": 0.025408111529738937
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255249,
            "SituationCount": 6915,
            "SituationsPerPlayerAndRound": 0.02709119330536065
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241650,
            "SituationCount": 6208,
            "SituationsPerPlayerAndRound": 0.02569004758948893
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 3220,
            "SituationsPerPlayerAndRound": 0.025681926942096027
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 1376,
            "SituationsPerPlayerAndRound": 0.035738403199833776
          }
        },
        "KillThroughSmoke": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 19671,
            "SituationsPerPlayerAndRound": 0.008041553956411025
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 307,
            "SituationsPerPlayerAndRound": 0.0031399903856971904
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 602,
            "SituationsPerPlayerAndRound": 0.0028277647036718664
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 435,
            "SituationsPerPlayerAndRound": 0.0024982340069950554
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 552,
            "SituationsPerPlayerAndRound": 0.0025353781709451175
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 875,
            "SituationsPerPlayerAndRound": 0.003197036073528176
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 1091,
            "SituationsPerPlayerAndRound": 0.0033832394750551984
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 1684,
            "SituationsPerPlayerAndRound": 0.0044474023367349095
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 1880,
            "SituationsPerPlayerAndRound": 0.004461488808307862
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 2229,
            "SituationsPerPlayerAndRound": 0.0048992133564556865
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 2524,
            "SituationsPerPlayerAndRound": 0.004608614676721383
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 2746,
            "SituationsPerPlayerAndRound": 0.005340376043376456
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 2604,
            "SituationsPerPlayerAndRound": 0.005861604017584812
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 385009,
            "SituationCount": 2308,
            "SituationsPerPlayerAndRound": 0.005994665059777823
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329383,
            "SituationCount": 2116,
            "SituationsPerPlayerAndRound": 0.006424132392989316
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255249,
            "SituationCount": 1728,
            "SituationsPerPlayerAndRound": 0.006769860019040231
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241650,
            "SituationCount": 1937,
            "SituationsPerPlayerAndRound": 0.008015725222429134
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 1152,
            "SituationsPerPlayerAndRound": 0.009188068272451748
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 373,
            "SituationsPerPlayerAndRound": 0.009687808425536336
          }
        },
        "WallBangKill": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 8121,
            "SituationsPerPlayerAndRound": 0.003319885093793601
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 278,
            "SituationsPerPlayerAndRound": 0.0028433789160384982
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 405,
            "SituationsPerPlayerAndRound": 0.0019023998421712723
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 295,
            "SituationsPerPlayerAndRound": 0.0016942046714104398
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 367,
            "SituationsPerPlayerAndRound": 0.001685659037566772
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 519,
            "SituationsPerPlayerAndRound": 0.0018962991110412838
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 661,
            "SituationsPerPlayerAndRound": 0.002049790369396413
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 1002,
            "SituationsPerPlayerAndRound": 0.002646257209862458
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 1101,
            "SituationsPerPlayerAndRound": 0.0026128187116739128
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 1126,
            "SituationsPerPlayerAndRound": 0.0024748830145218045
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 1402,
            "SituationsPerPlayerAndRound": 0.002559935727719247
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 1271,
            "SituationsPerPlayerAndRound": 0.0024718200841702385
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 1095,
            "SituationsPerPlayerAndRound": 0.002464845007394535
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 385009,
            "SituationCount": 895,
            "SituationsPerPlayerAndRound": 0.0023246209828861144
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329383,
            "SituationCount": 962,
            "SituationsPerPlayerAndRound": 0.002920612174884557
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255249,
            "SituationCount": 866,
            "SituationsPerPlayerAndRound": 0.003392765495653264
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241650,
            "SituationCount": 781,
            "SituationsPerPlayerAndRound": 0.0032319470308297123
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 396,
            "SituationsPerPlayerAndRound": 0.003158398468655288
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 161,
            "SituationsPerPlayerAndRound": 0.004181600955794504
          }
        },
        "CollateralKill": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 1233979,
            "SituationCount": 619,
            "SituationsPerPlayerAndRound": 0.0005016292821838945
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 49647,
            "SituationCount": 18,
            "SituationsPerPlayerAndRound": 0.00036255967127923135
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 80364,
            "SituationCount": 32,
            "SituationsPerPlayerAndRound": 0.0003981882434921109
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 61295,
            "SituationCount": 38,
            "SituationsPerPlayerAndRound": 0.0006199526878211926
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 77038,
            "SituationCount": 38,
            "SituationsPerPlayerAndRound": 0.0004932630649809185
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 111072,
            "SituationCount": 39,
            "SituationsPerPlayerAndRound": 0.00035112359550561797
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 143649,
            "SituationCount": 68,
            "SituationsPerPlayerAndRound": 0.00047337607640846784
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 189016,
            "SituationCount": 91,
            "SituationsPerPlayerAndRound": 0.0004814407245947433
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 196429,
            "SituationCount": 80,
            "SituationsPerPlayerAndRound": 0.0004072718386796247
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 208831,
            "SituationCount": 100,
            "SituationsPerPlayerAndRound": 0.00047885610852794845
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 226366,
            "SituationCount": 107,
            "SituationsPerPlayerAndRound": 0.0004726858273769029
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 211980,
            "SituationCount": 112,
            "SituationsPerPlayerAndRound": 0.0005283517312954052
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 177033,
            "SituationCount": 69,
            "SituationsPerPlayerAndRound": 0.0003897578417583162
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 146891,
            "SituationCount": 77,
            "SituationsPerPlayerAndRound": 0.0005241982150029614
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 143839,
            "SituationCount": 67,
            "SituationsPerPlayerAndRound": 0.0004657985664527701
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 114763,
            "SituationCount": 39,
            "SituationsPerPlayerAndRound": 0.000339830781697934
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 119151,
            "SituationCount": 60,
            "SituationsPerPlayerAndRound": 0.0005035627061459829
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 64480,
            "SituationCount": 44,
            "SituationsPerPlayerAndRound": 0.0006823821339950372
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 19839,
            "SituationCount": 11,
            "SituationsPerPlayerAndRound": 0.0005544634306164626
          }
        },
        "FlashAssist": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 20191,
            "SituationsPerPlayerAndRound": 0.008254131255853541
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 263,
            "SituationsPerPlayerAndRound": 0.0026899591903529678
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 572,
            "SituationsPerPlayerAndRound": 0.0026868461968443647
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 511,
            "SituationsPerPlayerAndRound": 0.0029347070748838465
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 673,
            "SituationsPerPlayerAndRound": 0.0030911404149385215
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 1077,
            "SituationsPerPlayerAndRound": 0.0039350946870741095
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 1321,
            "SituationsPerPlayerAndRound": 0.004096479694361061
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 1909,
            "SituationsPerPlayerAndRound": 0.0050416217700872575
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 2050,
            "SituationsPerPlayerAndRound": 0.004864921306931445
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 2233,
            "SituationsPerPlayerAndRound": 0.004908005125601412
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 2367,
            "SituationsPerPlayerAndRound": 0.004321945697226432
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 2345,
            "SituationsPerPlayerAndRound": 0.004560517779212596
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 2325,
            "SituationsPerPlayerAndRound": 0.005233575015700725
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 384984,
            "SituationCount": 1881,
            "SituationsPerPlayerAndRound": 0.004885917336824388
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329308,
            "SituationCount": 1833,
            "SituationsPerPlayerAndRound": 0.005566217644272231
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255124,
            "SituationCount": 1937,
            "SituationsPerPlayerAndRound": 0.00759238644737461
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241625,
            "SituationCount": 2037,
            "SituationsPerPlayerAndRound": 0.008430419037765131
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 1234,
            "SituationsPerPlayerAndRound": 0.009842080076567235
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 448,
            "SituationsPerPlayerAndRound": 0.01163575918134123
          }
        },
        "SmokeFail": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 13914,
            "SituationsPerPlayerAndRound": 0.005688077970083015
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 421,
            "SituationsPerPlayerAndRound": 0.004305980300907222
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 826,
            "SituationsPerPlayerAndRound": 0.0038799562213172123
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 856,
            "SituationsPerPlayerAndRound": 0.004916065080431649
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 1099,
            "SituationsPerPlayerAndRound": 0.005047790959907036
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 1531,
            "SituationsPerPlayerAndRound": 0.005593899689796157
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 1614,
            "SituationsPerPlayerAndRound": 0.005005085712868094
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 2233,
            "SituationsPerPlayerAndRound": 0.00589729775411464
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 2365,
            "SituationsPerPlayerAndRound": 0.005612457995557496
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 2508,
            "SituationsPerPlayerAndRound": 0.005512439254370059
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 3088,
            "SituationsPerPlayerAndRound": 0.0056384319024229915
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 2787,
            "SituationsPerPlayerAndRound": 0.005420112175123883
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 2250,
            "SituationsPerPlayerAndRound": 0.00506475001519425
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 385009,
            "SituationCount": 2101,
            "SituationsPerPlayerAndRound": 0.0054570152905516495
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329383,
            "SituationCount": 1844,
            "SituationsPerPlayerAndRound": 0.005598345998427363
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255249,
            "SituationCount": 1498,
            "SituationsPerPlayerAndRound": 0.005868779113728163
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241650,
            "SituationCount": 1500,
            "SituationsPerPlayerAndRound": 0.006207324643078833
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 669,
            "SituationsPerPlayerAndRound": 0.0053357792311373425
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 216,
            "SituationsPerPlayerAndRound": 0.005610098176718092
          }
        },
        "DeathInducedBombDrop": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 30354,
            "SituationsPerPlayerAndRound": 0.012408791052457945
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 2097,
            "SituationsPerPlayerAndRound": 0.02144807765083716
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 4444,
            "SituationsPerPlayerAndRound": 0.020874728144713913
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 3410,
            "SituationsPerPlayerAndRound": 0.019583857388168133
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 4120,
            "SituationsPerPlayerAndRound": 0.018923474754155584
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 5185,
            "SituationsPerPlayerAndRound": 0.01894472233284982
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 5881,
            "SituationsPerPlayerAndRound": 0.01823724230320772
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 6509,
            "SituationsPerPlayerAndRound": 0.017190107963068604
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 6917,
            "SituationsPerPlayerAndRound": 0.01641495642929015
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 7545,
            "SituationsPerPlayerAndRound": 0.016583474551125237
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 8399,
            "SituationsPerPlayerAndRound": 0.015335877444446474
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 7348,
            "SituationsPerPlayerAndRound": 0.014290270636099852
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 6023,
            "SituationsPerPlayerAndRound": 0.01355777304067332
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 385009,
            "SituationCount": 5007,
            "SituationsPerPlayerAndRound": 0.013004890794760643
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329383,
            "SituationCount": 4159,
            "SituationsPerPlayerAndRound": 0.012626638290379286
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255249,
            "SituationCount": 3076,
            "SituationsPerPlayerAndRound": 0.012050977672782263
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241650,
            "SituationCount": 2658,
            "SituationsPerPlayerAndRound": 0.010999379267535692
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 1338,
            "SituationsPerPlayerAndRound": 0.010671558462274685
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 348,
            "SituationsPerPlayerAndRound": 0.009038491506934705
          }
        },
        "SelfFlash": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 52405,
            "SituationsPerPlayerAndRound": 0.02142329495631741
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 1537,
            "SituationsPerPlayerAndRound": 0.01572040789191069
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 3385,
            "SituationsPerPlayerAndRound": 0.015900304853703102
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 3056,
            "SituationsPerPlayerAndRound": 0.017550811782475605
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 3746,
            "SituationsPerPlayerAndRound": 0.017205664181812335
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 5101,
            "SituationsPerPlayerAndRound": 0.018637806869791114
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 5836,
            "SituationsPerPlayerAndRound": 0.018097695303778312
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 7144,
            "SituationsPerPlayerAndRound": 0.018867127252751897
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 7934,
            "SituationsPerPlayerAndRound": 0.018828432023997116
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 8874,
            "SituationsPerPlayerAndRound": 0.019504539849792623
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 10080,
            "SituationsPerPlayerAndRound": 0.018405244033815982
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 9877,
            "SituationsPerPlayerAndRound": 0.01920862861632529
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 8571,
            "SituationsPerPlayerAndRound": 0.019293321057879963
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 385009,
            "SituationCount": 7353,
            "SituationsPerPlayerAndRound": 0.019098254845990613
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329383,
            "SituationCount": 6271,
            "SituationsPerPlayerAndRound": 0.019038626765801515
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255249,
            "SituationCount": 5186,
            "SituationsPerPlayerAndRound": 0.020317415543253843
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241650,
            "SituationCount": 4904,
            "SituationsPerPlayerAndRound": 0.020293813366439064
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 2772,
            "SituationsPerPlayerAndRound": 0.022108789280587016
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 987,
            "SituationsPerPlayerAndRound": 0.025635031946392394
          }
        },
        "TeamFlash": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 130671,
            "SituationsPerPlayerAndRound": 0.053418631337409636
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 3714,
            "SituationsPerPlayerAndRound": 0.03798672407973735
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 8755,
            "SituationsPerPlayerAndRound": 0.0411247175758259
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 7612,
            "SituationsPerPlayerAndRound": 0.043716223589072095
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 9711,
            "SituationsPerPlayerAndRound": 0.04460336488776818
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 12743,
            "SituationsPerPlayerAndRound": 0.04655980649710805
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 14790,
            "SituationsPerPlayerAndRound": 0.0458644471457987
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 18149,
            "SituationsPerPlayerAndRound": 0.04793105998183009
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 20371,
            "SituationsPerPlayerAndRound": 0.0483430789968295
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 23026,
            "SituationsPerPlayerAndRound": 0.0506098190873704
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 26526,
            "SituationsPerPlayerAndRound": 0.04843427611517885
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 25125,
            "SituationsPerPlayerAndRound": 0.048862690491563526
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 21545,
            "SituationsPerPlayerAndRound": 0.048497795145493384
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 385009,
            "SituationCount": 18535,
            "SituationsPerPlayerAndRound": 0.048141731751725286
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329383,
            "SituationCount": 15518,
            "SituationsPerPlayerAndRound": 0.04711232820151617
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255249,
            "SituationCount": 13261,
            "SituationsPerPlayerAndRound": 0.05195319080584057
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241650,
            "SituationCount": 12052,
            "SituationsPerPlayerAndRound": 0.049873784398924065
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 6664,
            "SituationsPerPlayerAndRound": 0.05315042271494656
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 2347,
            "SituationsPerPlayerAndRound": 0.06095787231832113
          }
        },
        "RifleFiredWhileMoving": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 60828,
            "SituationsPerPlayerAndRound": 0.024866638404787242
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 4215,
            "SituationsPerPlayerAndRound": 0.043110942917634065
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 9101,
            "SituationsPerPlayerAndRound": 0.04274997768790308
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 7239,
            "SituationsPerPlayerAndRound": 0.04157405971640737
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 9438,
            "SituationsPerPlayerAndRound": 0.04334945503148554
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 11533,
            "SituationsPerPlayerAndRound": 0.04213876232685766
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 13483,
            "SituationsPerPlayerAndRound": 0.041811382073482346
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 15164,
            "SituationsPerPlayerAndRound": 0.04004774883268893
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 15885,
            "SituationsPerPlayerAndRound": 0.03769720729785659
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 15913,
            "SituationsPerPlayerAndRound": 0.03497585560398355
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 17937,
            "SituationsPerPlayerAndRound": 0.03275147442803148
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 15962,
            "SituationsPerPlayerAndRound": 0.03104263743786416
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 13544,
            "SituationsPerPlayerAndRound": 0.03048754409146263
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 385009,
            "SituationCount": 10711,
            "SituationsPerPlayerAndRound": 0.0278201288801041
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329383,
            "SituationCount": 8481,
            "SituationsPerPlayerAndRound": 0.025748141221617386
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255249,
            "SituationCount": 6307,
            "SituationsPerPlayerAndRound": 0.02470920552088353
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241650,
            "SituationCount": 5411,
            "SituationsPerPlayerAndRound": 0.02239188909579971
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 2463,
            "SituationsPerPlayerAndRound": 0.019644281384590845
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 627,
            "SituationsPerPlayerAndRound": 0.01628486831852891
          }
        },
        "UnnecessaryReload": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 11787,
            "SituationsPerPlayerAndRound": 0.004818555054863339
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 906,
            "SituationsPerPlayerAndRound": 0.00926655143140604
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 1852,
            "SituationsPerPlayerAndRound": 0.008699369154817768
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 1641,
            "SituationsPerPlayerAndRound": 0.009424372426388243
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 1839,
            "SituationsPerPlayerAndRound": 0.008446667493420419
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 2321,
            "SituationsPerPlayerAndRound": 0.008480366544753024
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 2690,
            "SituationsPerPlayerAndRound": 0.008341809521446824
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 2951,
            "SituationsPerPlayerAndRound": 0.007793517990323466
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 3196,
            "SituationsPerPlayerAndRound": 0.007584530974123365
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 3291,
            "SituationsPerPlayerAndRound": 0.007233428064645878
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 3710,
            "SituationsPerPlayerAndRound": 0.006774152318001716
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 3302,
            "SituationsPerPlayerAndRound": 0.006421675781219612
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 2510,
            "SituationsPerPlayerAndRound": 0.00565001001695003
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 384984,
            "SituationCount": 2028,
            "SituationsPerPlayerAndRound": 0.005267751387070632
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329308,
            "SituationCount": 1716,
            "SituationsPerPlayerAndRound": 0.0052109271563399616
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255124,
            "SituationCount": 1301,
            "SituationsPerPlayerAndRound": 0.005099481036672363
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241625,
            "SituationCount": 1030,
            "SituationsPerPlayerAndRound": 0.004262803931712364
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 485,
            "SituationsPerPlayerAndRound": 0.0038682405487318553
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 131,
            "SituationsPerPlayerAndRound": 0.003402420653472547
          }
        },
        "PushBeforeSmokeDetonated": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2445987,
            "SituationCount": 2951,
            "SituationsPerPlayerAndRound": 0.001206465937881109
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 51,
            "SituationsPerPlayerAndRound": 0.0005216270673308036
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 134,
            "SituationsPerPlayerAndRound": 0.0006294359971628407
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 141,
            "SituationsPerPlayerAndRound": 0.0008097724022673627
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 162,
            "SituationsPerPlayerAndRound": 0.0007440783762556322
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 240,
            "SituationsPerPlayerAndRound": 0.0008769013230248711
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 302,
            "SituationsPerPlayerAndRound": 0.0009365154183929148
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 346,
            "SituationsPerPlayerAndRound": 0.0009137774397329446
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 409,
            "SituationsPerPlayerAndRound": 0.0009706111290414444
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 515,
            "SituationsPerPlayerAndRound": 0.001131940277512193
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547652,
            "SituationCount": 573,
            "SituationsPerPlayerAndRound": 0.001046284867032349
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514150,
            "SituationCount": 601,
            "SituationsPerPlayerAndRound": 0.001168919575999222
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444111,
            "SituationCount": 490,
            "SituationsPerPlayerAndRound": 0.0011033277716606883
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 384798,
            "SituationCount": 467,
            "SituationsPerPlayerAndRound": 0.0012136237714333235
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 328972,
            "SituationCount": 404,
            "SituationsPerPlayerAndRound": 0.0012280680422649952
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 254411,
            "SituationCount": 319,
            "SituationsPerPlayerAndRound": 0.0012538766012475876
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241192,
            "SituationCount": 315,
            "SituationsPerPlayerAndRound": 0.0013060134664499652
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125330,
            "SituationCount": 174,
            "SituationsPerPlayerAndRound": 0.0013883347961381953
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 56,
            "SituationsPerPlayerAndRound": 0.0014544698976676537
          }
        },
        "BombDropAtSpawn": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446079,
            "SituationCount": 20902,
            "SituationsPerPlayerAndRound": 0.008545104225987796
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 98,
            "SituationsPerPlayerAndRound": 0.0010023422078121323
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 297,
            "SituationsPerPlayerAndRound": 0.0013950932175922665
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 271,
            "SituationsPerPlayerAndRound": 0.0015563710710245057
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 375,
            "SituationsPerPlayerAndRound": 0.0017224036487398895
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 502,
            "SituationsPerPlayerAndRound": 0.0018341852673270222
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 633,
            "SituationsPerPlayerAndRound": 0.0019629611253070035
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 841,
            "SituationsPerPlayerAndRound": 0.002221060193108111
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 979,
            "SituationsPerPlayerAndRound": 0.0023232965656028704
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 1319,
            "SituationsPerPlayerAndRound": 0.0028990858758030733
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 1683,
            "SituationsPerPlayerAndRound": 0.0030730184235032046
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 1891,
            "SituationsPerPlayerAndRound": 0.0036775859788874283
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 1978,
            "SituationsPerPlayerAndRound": 0.004452478013357434
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 384984,
            "SituationCount": 1801,
            "SituationsPerPlayerAndRound": 0.0046781164931529624
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329230,
            "SituationCount": 1506,
            "SituationsPerPlayerAndRound": 0.004574309753060171
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 254752,
            "SituationCount": 1347,
            "SituationsPerPlayerAndRound": 0.00528749528953649
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241389,
            "SituationCount": 1486,
            "SituationsPerPlayerAndRound": 0.0061560385933078976
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125356,
            "SituationCount": 658,
            "SituationsPerPlayerAndRound": 0.005249050703596158
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 170,
            "SituationsPerPlayerAndRound": 0.0044153550464910915
          }
        },
        "HasNotBoughtDefuseKit": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 86890,
            "SituationsPerPlayerAndRound": 0.035520849131846575
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 5764,
            "SituationsPerPlayerAndRound": 0.05895408659009318
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 13221,
            "SituationsPerPlayerAndRound": 0.06210278595887998
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 10374,
            "SituationsPerPlayerAndRound": 0.059578573766820006
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 13112,
            "SituationsPerPlayerAndRound": 0.060224417712739814
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 16438,
            "SituationsPerPlayerAndRound": 0.060060433116178466
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 18671,
            "SituationsPerPlayerAndRound": 0.05789960058547719
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 21423,
            "SituationsPerPlayerAndRound": 0.05657761298092159
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 21612,
            "SituationsPerPlayerAndRound": 0.051288136236781655
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 21060,
            "SituationsPerPlayerAndRound": 0.046288664552246186
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 24017,
            "SituationsPerPlayerAndRound": 0.04385305019446017
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 20493,
            "SituationsPerPlayerAndRound": 0.039854452387805425
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 15666,
            "SituationsPerPlayerAndRound": 0.0352641661057925
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 385009,
            "SituationCount": 12542,
            "SituationsPerPlayerAndRound": 0.03257586186296944
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329383,
            "SituationCount": 10371,
            "SituationsPerPlayerAndRound": 0.03148614227206626
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255249,
            "SituationCount": 7738,
            "SituationsPerPlayerAndRound": 0.03031549584915122
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241650,
            "SituationCount": 6805,
            "SituationsPerPlayerAndRound": 0.028160562797434306
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 3333,
            "SituationsPerPlayerAndRound": 0.026583187111182006
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 1497,
            "SituationsPerPlayerAndRound": 0.03888109708586567
          }
        },
        "MissedTradeKill": {
          "0": {
            "RankBeforeMatch": 0,
            "PlayerRoundCount": 2446169,
            "SituationCount": 14763,
            "SituationsPerPlayerAndRound": 0.006035151291672816
          },
          "1": {
            "RankBeforeMatch": 1,
            "PlayerRoundCount": 97771,
            "SituationCount": 765,
            "SituationsPerPlayerAndRound": 0.007824406009962055
          },
          "2": {
            "RankBeforeMatch": 2,
            "PlayerRoundCount": 212889,
            "SituationCount": 1009,
            "SituationsPerPlayerAndRound": 0.004739559112964972
          },
          "3": {
            "RankBeforeMatch": 3,
            "PlayerRoundCount": 174123,
            "SituationCount": 748,
            "SituationsPerPlayerAndRound": 0.004295813878694946
          },
          "4": {
            "RankBeforeMatch": 4,
            "PlayerRoundCount": 217719,
            "SituationCount": 927,
            "SituationsPerPlayerAndRound": 0.004257781819685007
          },
          "5": {
            "RankBeforeMatch": 5,
            "PlayerRoundCount": 273691,
            "SituationCount": 1256,
            "SituationsPerPlayerAndRound": 0.004589116923830159
          },
          "6": {
            "RankBeforeMatch": 6,
            "PlayerRoundCount": 322472,
            "SituationCount": 1601,
            "SituationsPerPlayerAndRound": 0.0049647721352551535
          },
          "7": {
            "RankBeforeMatch": 7,
            "PlayerRoundCount": 378648,
            "SituationCount": 2220,
            "SituationsPerPlayerAndRound": 0.005862965075743171
          },
          "8": {
            "RankBeforeMatch": 8,
            "PlayerRoundCount": 421384,
            "SituationCount": 2156,
            "SituationsPerPlayerAndRound": 0.005116473335484973
          },
          "9": {
            "RankBeforeMatch": 9,
            "PlayerRoundCount": 454971,
            "SituationCount": 2475,
            "SituationsPerPlayerAndRound": 0.0054399071589178215
          },
          "10": {
            "RankBeforeMatch": 10,
            "PlayerRoundCount": 547670,
            "SituationCount": 2617,
            "SituationsPerPlayerAndRound": 0.0047784249639381375
          },
          "11": {
            "RankBeforeMatch": 11,
            "PlayerRoundCount": 514196,
            "SituationCount": 2321,
            "SituationsPerPlayerAndRound": 0.004513842970384834
          },
          "12": {
            "RankBeforeMatch": 12,
            "PlayerRoundCount": 444247,
            "SituationCount": 1839,
            "SituationsPerPlayerAndRound": 0.004139589012418767
          },
          "13": {
            "RankBeforeMatch": 13,
            "PlayerRoundCount": 385009,
            "SituationCount": 1606,
            "SituationsPerPlayerAndRound": 0.0041713310597934075
          },
          "14": {
            "RankBeforeMatch": 14,
            "PlayerRoundCount": 329383,
            "SituationCount": 1491,
            "SituationsPerPlayerAndRound": 0.004526645273131886
          },
          "15": {
            "RankBeforeMatch": 15,
            "PlayerRoundCount": 255249,
            "SituationCount": 1145,
            "SituationsPerPlayerAndRound": 0.004485815811227468
          },
          "16": {
            "RankBeforeMatch": 16,
            "PlayerRoundCount": 241650,
            "SituationCount": 1160,
            "SituationsPerPlayerAndRound": 0.004800331057314298
          },
          "17": {
            "RankBeforeMatch": 17,
            "PlayerRoundCount": 125380,
            "SituationCount": 553,
            "SituationsPerPlayerAndRound": 0.0044105918009251874
          },
          "18": {
            "RankBeforeMatch": 18,
            "PlayerRoundCount": 38502,
            "SituationCount": 232,
            "SituationsPerPlayerAndRound": 0.006025661004623137
          }
        }
      }
    }
  }
}