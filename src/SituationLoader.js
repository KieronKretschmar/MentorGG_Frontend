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
            "A Trade Kill is when a player from the opposing team kills one of your teammates and you manage to, in turn, kill them, too.",
            "Be aware of your surroundings and utilize the weaknesses, for low ammo / low health, of your enemies after they disengage from gunfights."
        );

        add_data(
            Enums.SituationType.KillThroughSmoke,
            SituationBase,
            "Kill Through Smoke",
            "This happens whenever you manage to kill an enemy that, from your point of view, stands behind a live smoke grenade",
            "It can be a good idea to spray smokes based on a hunch. You may also be able to predict their movement or spray into common one-way smoke spots."
        );

        add_data(
            Enums.SituationType.WallBangKill,
            SituationBase,
            "Wallbang Kill",
            "This happens whenever you manage to kill an enemy by having your bullets penetrate an object they are hiding behind.",
            "Learn which weapons are able to effectively penetrate which objects in the game. Keep in mind that penetrating objects may significantly lower your damage output."
        );

        add_data(
            Enums.SituationType.CollateralKill,
            SituationBase,
            "Collateral Kill",
            "This happens whenever you manage to kill multiple enemies in a single shot.",
            "Play AWP and pray to kennyS, heh."
        );

        add_data(
            Enums.SituationType.FlashAssist,
            SituationBase,
            "Flash Assist",
            "This happens whenever you flash an enemy and one of your teammates lands the killing blow on them.",
            "Call out incoming flashes and coordinate them with your teammates beforehand. Make sure to not flash your teammates in the process!"
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
                render: (val) => `<a href="/smokes?lineupId=${val}" class="link">Link</a>`
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
            "Missed Trade Kill",
            "A missed trade kill occurs when a nearby teammate gets killed by an enemy and you don't manage to kill their killer.",
            "Be aware of your surroundings and utilize the weaknesses, for low ammo / low health, of your enemies after they disengage from gunfights."
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
                        "PlayerRoundCount": 2062388,
                        "SituationCount": 51007,
                        "SituationsPerPlayerAndRound": 0.024732009689738304
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 86432,
                        "SituationCount": 1079,
                        "SituationsPerPlayerAndRound": 0.012483802295446132
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 186087,
                        "SituationCount": 2324,
                        "SituationsPerPlayerAndRound": 0.012488782128789223
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 154127,
                        "SituationCount": 2053,
                        "SituationsPerPlayerAndRound": 0.013320184004100514
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 192277,
                        "SituationCount": 2642,
                        "SituationsPerPlayerAndRound": 0.013740592998642583
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 237280,
                        "SituationCount": 3411,
                        "SituationsPerPlayerAndRound": 0.014375421443020904
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 283784,
                        "SituationCount": 4308,
                        "SituationsPerPlayerAndRound": 0.015180559862430582
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 328517,
                        "SituationCount": 5594,
                        "SituationsPerPlayerAndRound": 0.01702803812283687
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 358037,
                        "SituationCount": 6653,
                        "SituationsPerPlayerAndRound": 0.01858187840921469
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 377924,
                        "SituationCount": 7726,
                        "SituationsPerPlayerAndRound": 0.02044326372498174
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 472085,
                        "SituationCount": 11053,
                        "SituationsPerPlayerAndRound": 0.023413156529014902
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 434449,
                        "SituationCount": 11069,
                        "SituationsPerPlayerAndRound": 0.02547824946081128
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 374649,
                        "SituationCount": 10136,
                        "SituationsPerPlayerAndRound": 0.027054656491809666
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 330921,
                        "SituationCount": 9653,
                        "SituationsPerPlayerAndRound": 0.029170104042958892
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 280529,
                        "SituationCount": 8440,
                        "SituationsPerPlayerAndRound": 0.030086016062510473
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 220982,
                        "SituationCount": 6831,
                        "SituationsPerPlayerAndRound": 0.03091201998352807
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 199762,
                        "SituationCount": 6401,
                        "SituationsPerPlayerAndRound": 0.03204313132627827
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 103042,
                        "SituationCount": 3341,
                        "SituationsPerPlayerAndRound": 0.03242367190077832
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 34213,
                        "SituationCount": 1216,
                        "SituationsPerPlayerAndRound": 0.035542045421331075
                    }
                },
                "KillWithOwnFlashAssist": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 2062388,
                        "SituationCount": 15361,
                        "SituationsPerPlayerAndRound": 0.007448162033526184
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 86432,
                        "SituationCount": 301,
                        "SituationsPerPlayerAndRound": 0.0034825064790818218
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 186087,
                        "SituationCount": 873,
                        "SituationsPerPlayerAndRound": 0.004691354044076158
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 154127,
                        "SituationCount": 715,
                        "SituationsPerPlayerAndRound": 0.004639031448091509
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 192277,
                        "SituationCount": 951,
                        "SituationsPerPlayerAndRound": 0.004945989379905033
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 237280,
                        "SituationCount": 1167,
                        "SituationsPerPlayerAndRound": 0.004918240053944706
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 283784,
                        "SituationCount": 1466,
                        "SituationsPerPlayerAndRound": 0.005165900825980323
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 328517,
                        "SituationCount": 1864,
                        "SituationsPerPlayerAndRound": 0.005673983385943497
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 358037,
                        "SituationCount": 2025,
                        "SituationsPerPlayerAndRound": 0.005655840038878663
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 377924,
                        "SituationCount": 2283,
                        "SituationsPerPlayerAndRound": 0.006040897111588573
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 472085,
                        "SituationCount": 2913,
                        "SituationsPerPlayerAndRound": 0.006170498956755669
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 434449,
                        "SituationCount": 2770,
                        "SituationsPerPlayerAndRound": 0.006375892222102019
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 374649,
                        "SituationCount": 2567,
                        "SituationsPerPlayerAndRound": 0.006851746568121095
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 330896,
                        "SituationCount": 2499,
                        "SituationsPerPlayerAndRound": 0.007552221846138968
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 280454,
                        "SituationCount": 2227,
                        "SituationsPerPlayerAndRound": 0.007940696156945525
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 220857,
                        "SituationCount": 2001,
                        "SituationsPerPlayerAndRound": 0.009060161099716106
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 199737,
                        "SituationCount": 1748,
                        "SituationsPerPlayerAndRound": 0.008751508233326825
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 103042,
                        "SituationCount": 1052,
                        "SituationsPerPlayerAndRound": 0.010209429164806584
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 34213,
                        "SituationCount": 359,
                        "SituationsPerPlayerAndRound": 0.010493087422909421
                    }
                },
                "Clutch": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 2062388,
                        "SituationCount": 14086,
                        "SituationsPerPlayerAndRound": 0.006829946644375355
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 86432,
                        "SituationCount": 573,
                        "SituationsPerPlayerAndRound": 0.006629489078119215
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 186087,
                        "SituationCount": 1409,
                        "SituationsPerPlayerAndRound": 0.007571727202867476
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 154127,
                        "SituationCount": 1203,
                        "SituationsPerPlayerAndRound": 0.007805251513362357
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 192277,
                        "SituationCount": 1437,
                        "SituationsPerPlayerAndRound": 0.007473592785408551
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 237280,
                        "SituationCount": 1853,
                        "SituationsPerPlayerAndRound": 0.007809339177343223
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 283784,
                        "SituationCount": 2119,
                        "SituationsPerPlayerAndRound": 0.007466946691850139
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 328517,
                        "SituationCount": 2416,
                        "SituationsPerPlayerAndRound": 0.007354261727703589
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 358037,
                        "SituationCount": 2861,
                        "SituationsPerPlayerAndRound": 0.007990794247521905
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 377924,
                        "SituationCount": 2940,
                        "SituationsPerPlayerAndRound": 0.0077793418782612376
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 472085,
                        "SituationCount": 3562,
                        "SituationsPerPlayerAndRound": 0.0075452513848141755
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 434449,
                        "SituationCount": 3416,
                        "SituationsPerPlayerAndRound": 0.007862833151877436
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 374649,
                        "SituationCount": 2920,
                        "SituationsPerPlayerAndRound": 0.0077939618149254365
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 330921,
                        "SituationCount": 2370,
                        "SituationsPerPlayerAndRound": 0.007161830164903406
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 280529,
                        "SituationCount": 2035,
                        "SituationsPerPlayerAndRound": 0.007254151977157442
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 220982,
                        "SituationCount": 1695,
                        "SituationsPerPlayerAndRound": 0.007670307988885973
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 199762,
                        "SituationCount": 1475,
                        "SituationsPerPlayerAndRound": 0.0073837867061803545
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 103042,
                        "SituationCount": 804,
                        "SituationsPerPlayerAndRound": 0.007802643582228606
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 34213,
                        "SituationCount": 294,
                        "SituationsPerPlayerAndRound": 0.008593224797591559
                    }
                },
                "HighImpactRound": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 2062388,
                        "SituationCount": 99950,
                        "SituationsPerPlayerAndRound": 0.04846323776127479
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 86432,
                        "SituationCount": 3534,
                        "SituationsPerPlayerAndRound": 0.04088763420955202
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 186087,
                        "SituationCount": 8481,
                        "SituationsPerPlayerAndRound": 0.04557545664124845
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 154127,
                        "SituationCount": 7279,
                        "SituationsPerPlayerAndRound": 0.047227286588333
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 192277,
                        "SituationCount": 9153,
                        "SituationsPerPlayerAndRound": 0.047603197470316265
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 237280,
                        "SituationCount": 11203,
                        "SituationsPerPlayerAndRound": 0.047214261631827376
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 283784,
                        "SituationCount": 13185,
                        "SituationsPerPlayerAndRound": 0.04646139317227187
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 328517,
                        "SituationCount": 15946,
                        "SituationsPerPlayerAndRound": 0.04853934499584497
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 358037,
                        "SituationCount": 17779,
                        "SituationsPerPlayerAndRound": 0.04965687903764136
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 377924,
                        "SituationCount": 18934,
                        "SituationsPerPlayerAndRound": 0.05010002010986336
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 472085,
                        "SituationCount": 23469,
                        "SituationsPerPlayerAndRound": 0.04971350498321277
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 434449,
                        "SituationCount": 22700,
                        "SituationsPerPlayerAndRound": 0.05225009149520427
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 374649,
                        "SituationCount": 19687,
                        "SituationsPerPlayerAndRound": 0.05254785145562914
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 330921,
                        "SituationCount": 17034,
                        "SituationsPerPlayerAndRound": 0.05147452110926777
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 280529,
                        "SituationCount": 14352,
                        "SituationsPerPlayerAndRound": 0.05116048608165288
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 220982,
                        "SituationCount": 12033,
                        "SituationsPerPlayerAndRound": 0.054452398837914404
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 199762,
                        "SituationCount": 11009,
                        "SituationsPerPlayerAndRound": 0.055110581592094594
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 103042,
                        "SituationCount": 5933,
                        "SituationsPerPlayerAndRound": 0.05757846315094816
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 34213,
                        "SituationCount": 2289,
                        "SituationsPerPlayerAndRound": 0.06690439306696284
                    }
                },
                "MultiKill": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 2062388,
                        "SituationCount": 94113,
                        "SituationsPerPlayerAndRound": 0.045633023466001545
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 86432,
                        "SituationCount": 2619,
                        "SituationsPerPlayerAndRound": 0.030301277304701963
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 186087,
                        "SituationCount": 6500,
                        "SituationsPerPlayerAndRound": 0.03492989838086486
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 154127,
                        "SituationCount": 5583,
                        "SituationsPerPlayerAndRound": 0.03622337423034251
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 192277,
                        "SituationCount": 7135,
                        "SituationsPerPlayerAndRound": 0.03710792242441894
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 237280,
                        "SituationCount": 8730,
                        "SituationsPerPlayerAndRound": 0.036791975724882
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 283784,
                        "SituationCount": 10498,
                        "SituationsPerPlayerAndRound": 0.03699292419586728
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 328517,
                        "SituationCount": 12515,
                        "SituationsPerPlayerAndRound": 0.038095441027404975
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 358037,
                        "SituationCount": 14264,
                        "SituationsPerPlayerAndRound": 0.03983945793311865
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 377924,
                        "SituationCount": 15147,
                        "SituationsPerPlayerAndRound": 0.04007948688096019
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 472085,
                        "SituationCount": 19075,
                        "SituationsPerPlayerAndRound": 0.0404058591143544
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 434449,
                        "SituationCount": 18600,
                        "SituationsPerPlayerAndRound": 0.04281285030003522
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 374649,
                        "SituationCount": 16231,
                        "SituationsPerPlayerAndRound": 0.04332321719796396
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 330921,
                        "SituationCount": 14386,
                        "SituationsPerPlayerAndRound": 0.04347261128789046
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 280529,
                        "SituationCount": 12524,
                        "SituationsPerPlayerAndRound": 0.04464422573067312
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 220982,
                        "SituationCount": 10376,
                        "SituationsPerPlayerAndRound": 0.0469540505561539
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 199762,
                        "SituationCount": 9646,
                        "SituationsPerPlayerAndRound": 0.048287462079875054
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 103042,
                        "SituationCount": 5221,
                        "SituationsPerPlayerAndRound": 0.05066865938161138
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 34213,
                        "SituationCount": 1992,
                        "SituationsPerPlayerAndRound": 0.05822348230204893
                    }
                },
                "TradeKill": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 846373,
                        "SituationCount": 1016,
                        "SituationsPerPlayerAndRound": 0.0012004163648887665
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 38105,
                        "SituationCount": 37,
                        "SituationsPerPlayerAndRound": 0.0009710011809473823
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 52051,
                        "SituationCount": 65,
                        "SituationsPerPlayerAndRound": 0.0012487752396687865
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 41077,
                        "SituationCount": 38,
                        "SituationsPerPlayerAndRound": 0.0009250919005769652
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 51570,
                        "SituationCount": 66,
                        "SituationsPerPlayerAndRound": 0.0012798138452588714
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 74585,
                        "SituationCount": 97,
                        "SituationsPerPlayerAndRound": 0.0013005295971039753
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 104259,
                        "SituationCount": 151,
                        "SituationsPerPlayerAndRound": 0.0014483162125092318
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 138011,
                        "SituationCount": 204,
                        "SituationsPerPlayerAndRound": 0.0014781430465687518
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 132560,
                        "SituationCount": 166,
                        "SituationsPerPlayerAndRound": 0.001252263126131563
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 131437,
                        "SituationCount": 178,
                        "SituationsPerPlayerAndRound": 0.001354260976741709
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 150229,
                        "SituationCount": 192,
                        "SituationsPerPlayerAndRound": 0.0012780488454293114
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 131010,
                        "SituationCount": 185,
                        "SituationsPerPlayerAndRound": 0.001412105946110984
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 104830,
                        "SituationCount": 125,
                        "SituationsPerPlayerAndRound": 0.0011924067537918534
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 90331,
                        "SituationCount": 110,
                        "SituationsPerPlayerAndRound": 0.0012177436317543258
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 93647,
                        "SituationCount": 118,
                        "SituationsPerPlayerAndRound": 0.0012600510427456298
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 79595,
                        "SituationCount": 99,
                        "SituationsPerPlayerAndRound": 0.001243796720899554
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 76517,
                        "SituationCount": 106,
                        "SituationsPerPlayerAndRound": 0.0013853130676843054
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 41976,
                        "SituationCount": 48,
                        "SituationsPerPlayerAndRound": 0.0011435105774728416
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 15521,
                        "SituationCount": 24,
                        "SituationsPerPlayerAndRound": 0.00154629212035307
                    }
                },
                "KillThroughSmoke": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 7178,
                        "SituationCount": 247,
                        "SituationsPerPlayerAndRound": 0.03441069935915297
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 645,
                        "SituationCount": 7,
                        "SituationsPerPlayerAndRound": 0.010852713178294573
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 1077,
                        "SituationCount": 8,
                        "SituationsPerPlayerAndRound": 0.007428040854224698
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 533,
                        "SituationCount": 3,
                        "SituationsPerPlayerAndRound": 0.005628517823639775
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 1137,
                        "SituationCount": 18,
                        "SituationsPerPlayerAndRound": 0.0158311345646438
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 645,
                        "SituationCount": 12,
                        "SituationsPerPlayerAndRound": 0.018604651162790697
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 2060,
                        "SituationCount": 32,
                        "SituationsPerPlayerAndRound": 0.015533980582524271
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 2499,
                        "SituationCount": 43,
                        "SituationsPerPlayerAndRound": 0.01720688275310124
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 807,
                        "SituationCount": 15,
                        "SituationsPerPlayerAndRound": 0.01858736059479554
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 637,
                        "SituationCount": 16,
                        "SituationsPerPlayerAndRound": 0.02511773940345369
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 176,
                        "SituationCount": 4,
                        "SituationsPerPlayerAndRound": 0.022727272727272728
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 181,
                        "SituationCount": 12,
                        "SituationsPerPlayerAndRound": 0.06629834254143646
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 186,
                        "SituationCount": 9,
                        "SituationsPerPlayerAndRound": 0.04838709677419355
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 130,
                        "SituationCount": 2,
                        "SituationsPerPlayerAndRound": 0.015384615384615385
                    }
                },
                "WallBangKill": {},
                "CollateralKill": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 846334,
                        "SituationCount": 438,
                        "SituationsPerPlayerAndRound": 0.0005175261776083674
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 38105,
                        "SituationCount": 20,
                        "SituationsPerPlayerAndRound": 0.0005248655032148012
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 52051,
                        "SituationCount": 26,
                        "SituationsPerPlayerAndRound": 0.0004995100958675145
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 41077,
                        "SituationCount": 31,
                        "SituationsPerPlayerAndRound": 0.0007546802346812085
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 51570,
                        "SituationCount": 24,
                        "SituationsPerPlayerAndRound": 0.0004653868528214078
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 74559,
                        "SituationCount": 27,
                        "SituationsPerPlayerAndRound": 0.00036212932040397537
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 104194,
                        "SituationCount": 56,
                        "SituationsPerPlayerAndRound": 0.000537458970766071
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 138011,
                        "SituationCount": 77,
                        "SituationsPerPlayerAndRound": 0.000557926542087225
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 132560,
                        "SituationCount": 58,
                        "SituationsPerPlayerAndRound": 0.00043753771876885937
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 131437,
                        "SituationCount": 65,
                        "SituationsPerPlayerAndRound": 0.0004945335027427589
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 150229,
                        "SituationCount": 84,
                        "SituationsPerPlayerAndRound": 0.0005591463698753237
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 131010,
                        "SituationCount": 83,
                        "SituationsPerPlayerAndRound": 0.0006335394244714144
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 104830,
                        "SituationCount": 45,
                        "SituationsPerPlayerAndRound": 0.00042926643136506723
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 90331,
                        "SituationCount": 52,
                        "SituationsPerPlayerAndRound": 0.0005756606259202268
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 93647,
                        "SituationCount": 51,
                        "SituationsPerPlayerAndRound": 0.0005445983320341281
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 79595,
                        "SituationCount": 27,
                        "SituationsPerPlayerAndRound": 0.0003392172875180602
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 76517,
                        "SituationCount": 32,
                        "SituationsPerPlayerAndRound": 0.0004182077185462054
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 41976,
                        "SituationCount": 32,
                        "SituationsPerPlayerAndRound": 0.0007623403849818944
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 15521,
                        "SituationCount": 9,
                        "SituationsPerPlayerAndRound": 0.0005798595451324013
                    }
                },
                "FlashAssist": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 846373,
                        "SituationCount": 19384,
                        "SituationsPerPlayerAndRound": 0.022902431906499852
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 38105,
                        "SituationCount": 370,
                        "SituationsPerPlayerAndRound": 0.009710011809473822
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 52051,
                        "SituationCount": 652,
                        "SituationsPerPlayerAndRound": 0.012526176250216134
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 41077,
                        "SituationCount": 515,
                        "SituationsPerPlayerAndRound": 0.012537429705187819
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 51570,
                        "SituationCount": 700,
                        "SituationsPerPlayerAndRound": 0.01357378320729106
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 74585,
                        "SituationCount": 1095,
                        "SituationsPerPlayerAndRound": 0.01468123617349333
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 104259,
                        "SituationCount": 1512,
                        "SituationsPerPlayerAndRound": 0.014502345121284493
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 138011,
                        "SituationCount": 2115,
                        "SituationsPerPlayerAndRound": 0.01532486540927897
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 132560,
                        "SituationCount": 2060,
                        "SituationsPerPlayerAndRound": 0.015540132770066386
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 131557,
                        "SituationCount": 2162,
                        "SituationsPerPlayerAndRound": 0.016433941181389057
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 150489,
                        "SituationCount": 2425,
                        "SituationsPerPlayerAndRound": 0.01611413458791008
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 131055,
                        "SituationCount": 2348,
                        "SituationsPerPlayerAndRound": 0.017916142077753616
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 104855,
                        "SituationCount": 2000,
                        "SituationsPerPlayerAndRound": 0.019073959277096944
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 90331,
                        "SituationCount": 1764,
                        "SituationsPerPlayerAndRound": 0.01952817969467846
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 93647,
                        "SituationCount": 1812,
                        "SituationsPerPlayerAndRound": 0.019349258385212554
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 79595,
                        "SituationCount": 2115,
                        "SituationsPerPlayerAndRound": 0.026572020855581382
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 76517,
                        "SituationCount": 1974,
                        "SituationsPerPlayerAndRound": 0.025798188637819047
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 41976,
                        "SituationCount": 1164,
                        "SituationsPerPlayerAndRound": 0.02773013150371641
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 15521,
                        "SituationCount": 525,
                        "SituationsPerPlayerAndRound": 0.033825140132723405
                    }
                },
                "SmokeFail": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 2062388,
                        "SituationCount": 11903,
                        "SituationsPerPlayerAndRound": 0.005771464923186132
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 86432,
                        "SituationCount": 389,
                        "SituationsPerPlayerAndRound": 0.0045006479081821545
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 186087,
                        "SituationCount": 724,
                        "SituationsPerPlayerAndRound": 0.0038906532965763325
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 154127,
                        "SituationCount": 773,
                        "SituationsPerPlayerAndRound": 0.005015344488635995
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 192277,
                        "SituationCount": 973,
                        "SituationsPerPlayerAndRound": 0.005060407641059513
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 237280,
                        "SituationCount": 1340,
                        "SituationsPerPlayerAndRound": 0.005647336480107889
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 283784,
                        "SituationCount": 1399,
                        "SituationsPerPlayerAndRound": 0.004929805767767034
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 328517,
                        "SituationCount": 1999,
                        "SituationsPerPlayerAndRound": 0.006084921023873955
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 358037,
                        "SituationCount": 2063,
                        "SituationsPerPlayerAndRound": 0.0057619743210897195
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 377924,
                        "SituationCount": 2057,
                        "SituationsPerPlayerAndRound": 0.005442893280130396
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 472085,
                        "SituationCount": 2702,
                        "SituationsPerPlayerAndRound": 0.005723545547941578
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 434449,
                        "SituationCount": 2332,
                        "SituationsPerPlayerAndRound": 0.005367718650520544
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 374649,
                        "SituationCount": 1905,
                        "SituationsPerPlayerAndRound": 0.005084759334737314
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 330921,
                        "SituationCount": 1827,
                        "SituationsPerPlayerAndRound": 0.005520955152438195
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 280529,
                        "SituationCount": 1562,
                        "SituationsPerPlayerAndRound": 0.005568051787872199
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 220982,
                        "SituationCount": 1283,
                        "SituationsPerPlayerAndRound": 0.005805902743209854
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 199762,
                        "SituationCount": 1223,
                        "SituationsPerPlayerAndRound": 0.006122285519768525
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 103042,
                        "SituationCount": 553,
                        "SituationsPerPlayerAndRound": 0.0053667436579258945
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 34213,
                        "SituationCount": 196,
                        "SituationsPerPlayerAndRound": 0.0057288165317277056
                    }
                },
                "DeathInducedBombDrop": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 2062388,
                        "SituationCount": 25739,
                        "SituationsPerPlayerAndRound": 0.012480192863806423
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 86432,
                        "SituationCount": 1845,
                        "SituationsPerPlayerAndRound": 0.02134626064420585
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 186087,
                        "SituationCount": 3890,
                        "SituationsPerPlayerAndRound": 0.020904200723317588
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 154127,
                        "SituationCount": 3003,
                        "SituationsPerPlayerAndRound": 0.01948393208198434
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 192277,
                        "SituationCount": 3592,
                        "SituationsPerPlayerAndRound": 0.01868138154849514
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 237280,
                        "SituationCount": 4489,
                        "SituationsPerPlayerAndRound": 0.01891857720836143
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 283784,
                        "SituationCount": 5202,
                        "SituationsPerPlayerAndRound": 0.018330843176500435
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 328517,
                        "SituationCount": 5648,
                        "SituationsPerPlayerAndRound": 0.017192413178009052
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 358037,
                        "SituationCount": 5903,
                        "SituationsPerPlayerAndRound": 0.01648712283925963
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 377924,
                        "SituationCount": 6303,
                        "SituationsPerPlayerAndRound": 0.016677956414517206
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 472085,
                        "SituationCount": 7198,
                        "SituationsPerPlayerAndRound": 0.015247254202103435
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 434449,
                        "SituationCount": 6208,
                        "SituationsPerPlayerAndRound": 0.014289364229173044
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 374649,
                        "SituationCount": 5041,
                        "SituationsPerPlayerAndRound": 0.013455260790766824
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 330921,
                        "SituationCount": 4337,
                        "SituationsPerPlayerAndRound": 0.013105847014846444
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 280529,
                        "SituationCount": 3546,
                        "SituationsPerPlayerAndRound": 0.01264040437886992
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 220982,
                        "SituationCount": 2631,
                        "SituationsPerPlayerAndRound": 0.01190594709071327
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 199762,
                        "SituationCount": 2210,
                        "SituationsPerPlayerAndRound": 0.011063165166548192
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 103042,
                        "SituationCount": 1116,
                        "SituationsPerPlayerAndRound": 0.0108305351216009
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 34213,
                        "SituationCount": 300,
                        "SituationsPerPlayerAndRound": 0.008768596732236284
                    }
                },
                "SelfFlash": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 2062388,
                        "SituationCount": 44146,
                        "SituationsPerPlayerAndRound": 0.021405283583884313
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 86432,
                        "SituationCount": 1364,
                        "SituationsPerPlayerAndRound": 0.015781192151055164
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 186087,
                        "SituationCount": 2947,
                        "SituationsPerPlayerAndRound": 0.015836678542832116
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 154127,
                        "SituationCount": 2664,
                        "SituationsPerPlayerAndRound": 0.01728444724156053
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 192277,
                        "SituationCount": 3353,
                        "SituationsPerPlayerAndRound": 0.017438383165953288
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 237280,
                        "SituationCount": 4379,
                        "SituationsPerPlayerAndRound": 0.0184549898853675
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 283784,
                        "SituationCount": 5163,
                        "SituationsPerPlayerAndRound": 0.018193414709779268
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 328517,
                        "SituationCount": 6172,
                        "SituationsPerPlayerAndRound": 0.018787460009679863
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 358037,
                        "SituationCount": 6712,
                        "SituationsPerPlayerAndRound": 0.018746665847384488
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 377924,
                        "SituationCount": 7272,
                        "SituationsPerPlayerAndRound": 0.019241963992760448
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 472085,
                        "SituationCount": 8694,
                        "SituationsPerPlayerAndRound": 0.018416175053221347
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 434449,
                        "SituationCount": 8322,
                        "SituationsPerPlayerAndRound": 0.019155297860048014
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 374649,
                        "SituationCount": 7285,
                        "SituationsPerPlayerAndRound": 0.01944486706223692
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 330921,
                        "SituationCount": 6271,
                        "SituationsPerPlayerAndRound": 0.018950142178949053
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 280529,
                        "SituationCount": 5400,
                        "SituationsPerPlayerAndRound": 0.01924934676985267
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 220982,
                        "SituationCount": 4450,
                        "SituationsPerPlayerAndRound": 0.020137386755482347
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 199762,
                        "SituationCount": 4044,
                        "SituationsPerPlayerAndRound": 0.02024409046765651
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 103042,
                        "SituationCount": 2321,
                        "SituationsPerPlayerAndRound": 0.022524795714368898
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 34213,
                        "SituationCount": 876,
                        "SituationsPerPlayerAndRound": 0.02560430245812995
                    }
                },
                "TeamFlash": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 2062388,
                        "SituationCount": 109876,
                        "SituationsPerPlayerAndRound": 0.05327610517516588
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 86432,
                        "SituationCount": 3271,
                        "SituationsPerPlayerAndRound": 0.037844779711218066
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 186087,
                        "SituationCount": 7691,
                        "SituationsPerPlayerAndRound": 0.04133013053034333
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 154127,
                        "SituationCount": 6648,
                        "SituationsPerPlayerAndRound": 0.04313326023344385
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 192277,
                        "SituationCount": 8618,
                        "SituationsPerPlayerAndRound": 0.044820753392241404
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 237280,
                        "SituationCount": 10998,
                        "SituationsPerPlayerAndRound": 0.04635030343897505
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 283784,
                        "SituationCount": 13031,
                        "SituationsPerPlayerAndRound": 0.045918726919065206
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 328517,
                        "SituationCount": 15722,
                        "SituationsPerPlayerAndRound": 0.04785749291513072
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 358037,
                        "SituationCount": 17224,
                        "SituationsPerPlayerAndRound": 0.04810675991587462
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 377924,
                        "SituationCount": 19051,
                        "SituationsPerPlayerAndRound": 0.05040960616420233
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 472085,
                        "SituationCount": 22742,
                        "SituationsPerPlayerAndRound": 0.04817352807227512
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 434449,
                        "SituationCount": 21434,
                        "SituationsPerPlayerAndRound": 0.04933605555542768
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 374649,
                        "SituationCount": 18248,
                        "SituationsPerPlayerAndRound": 0.048706923013273756
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 330921,
                        "SituationCount": 15827,
                        "SituationsPerPlayerAndRound": 0.04782712490292245
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 280529,
                        "SituationCount": 13202,
                        "SituationsPerPlayerAndRound": 0.04706108815844351
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 220982,
                        "SituationCount": 11312,
                        "SituationsPerPlayerAndRound": 0.051189689657981194
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 199762,
                        "SituationCount": 10017,
                        "SituationsPerPlayerAndRound": 0.05014467215987024
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 103042,
                        "SituationCount": 5512,
                        "SituationsPerPlayerAndRound": 0.05349275052891054
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 34213,
                        "SituationCount": 2074,
                        "SituationsPerPlayerAndRound": 0.060620232075526845
                    }
                },
                "RifleFiredWhileMoving": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 2062388,
                        "SituationCount": 51674,
                        "SituationsPerPlayerAndRound": 0.025055421191356817
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 86432,
                        "SituationCount": 3689,
                        "SituationsPerPlayerAndRound": 0.04268095149944465
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 186087,
                        "SituationCount": 8094,
                        "SituationsPerPlayerAndRound": 0.04349578422995696
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 154127,
                        "SituationCount": 6398,
                        "SituationsPerPlayerAndRound": 0.041511221265579684
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 192277,
                        "SituationCount": 8241,
                        "SituationsPerPlayerAndRound": 0.04286004046245781
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 237280,
                        "SituationCount": 10006,
                        "SituationsPerPlayerAndRound": 0.0421695886716116
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 283784,
                        "SituationCount": 11834,
                        "SituationsPerPlayerAndRound": 0.041700730132777045
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 328517,
                        "SituationCount": 13233,
                        "SituationsPerPlayerAndRound": 0.04028102046469437
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 358037,
                        "SituationCount": 13549,
                        "SituationsPerPlayerAndRound": 0.03784245762309482
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 377924,
                        "SituationCount": 13134,
                        "SituationsPerPlayerAndRound": 0.034753019125538465
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 472085,
                        "SituationCount": 15478,
                        "SituationsPerPlayerAndRound": 0.03278646853850472
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 434449,
                        "SituationCount": 13525,
                        "SituationsPerPlayerAndRound": 0.03113138711333206
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 374649,
                        "SituationCount": 11498,
                        "SituationsPerPlayerAndRound": 0.030690059228771462
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 330921,
                        "SituationCount": 9266,
                        "SituationsPerPlayerAndRound": 0.028000640636284792
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 280529,
                        "SituationCount": 7305,
                        "SituationsPerPlayerAndRound": 0.026040088546995143
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 220982,
                        "SituationCount": 5488,
                        "SituationsPerPlayerAndRound": 0.024834601913278003
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 199762,
                        "SituationCount": 4432,
                        "SituationsPerPlayerAndRound": 0.022186401818163615
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 103042,
                        "SituationCount": 2039,
                        "SituationsPerPlayerAndRound": 0.01978804759224394
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 34213,
                        "SituationCount": 563,
                        "SituationsPerPlayerAndRound": 0.016455733200830092
                    }
                },
                "UnnecessaryReload": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 2062388,
                        "SituationCount": 10018,
                        "SituationsPerPlayerAndRound": 0.004857475896872946
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 86432,
                        "SituationCount": 783,
                        "SituationsPerPlayerAndRound": 0.009059144761199556
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 186087,
                        "SituationCount": 1611,
                        "SituationsPerPlayerAndRound": 0.008657240967934353
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 154127,
                        "SituationCount": 1462,
                        "SituationsPerPlayerAndRound": 0.009485683884069632
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 192277,
                        "SituationCount": 1624,
                        "SituationsPerPlayerAndRound": 0.008446148005221633
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 237280,
                        "SituationCount": 2006,
                        "SituationsPerPlayerAndRound": 0.00845414699932569
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 283784,
                        "SituationCount": 2365,
                        "SituationsPerPlayerAndRound": 0.0083338031742452
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 328517,
                        "SituationCount": 2556,
                        "SituationsPerPlayerAndRound": 0.007780419278149989
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 358037,
                        "SituationCount": 2749,
                        "SituationsPerPlayerAndRound": 0.007677977415741949
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 377924,
                        "SituationCount": 2678,
                        "SituationsPerPlayerAndRound": 0.007086080799314148
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 472085,
                        "SituationCount": 3206,
                        "SituationsPerPlayerAndRound": 0.006791149898852961
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 434449,
                        "SituationCount": 2851,
                        "SituationsPerPlayerAndRound": 0.006562335279860236
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 374649,
                        "SituationCount": 2112,
                        "SituationsPerPlayerAndRound": 0.0056372764907953845
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 330896,
                        "SituationCount": 1726,
                        "SituationsPerPlayerAndRound": 0.00521614041874184
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 280454,
                        "SituationCount": 1469,
                        "SituationsPerPlayerAndRound": 0.005237935632938022
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 220857,
                        "SituationCount": 1130,
                        "SituationsPerPlayerAndRound": 0.0051164328049371315
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 199737,
                        "SituationCount": 864,
                        "SituationsPerPlayerAndRound": 0.0043256882800883165
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 103042,
                        "SituationCount": 390,
                        "SituationsPerPlayerAndRound": 0.0037848644242153683
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 34213,
                        "SituationCount": 112,
                        "SituationsPerPlayerAndRound": 0.0032736094467015462
                    }
                },
                "PushBeforeSmokeDetonated": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 2062298,
                        "SituationCount": 3028,
                        "SituationsPerPlayerAndRound": 0.0014682650131067382
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 86432,
                        "SituationCount": 58,
                        "SituationsPerPlayerAndRound": 0.000671047760088856
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 186087,
                        "SituationCount": 133,
                        "SituationsPerPlayerAndRound": 0.0007147194591776965
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 154127,
                        "SituationCount": 138,
                        "SituationsPerPlayerAndRound": 0.0008953655102610185
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 192277,
                        "SituationCount": 169,
                        "SituationsPerPlayerAndRound": 0.0008789402788685074
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 237280,
                        "SituationCount": 258,
                        "SituationsPerPlayerAndRound": 0.0010873229939312205
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 283784,
                        "SituationCount": 329,
                        "SituationsPerPlayerAndRound": 0.001159332450032419
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 328517,
                        "SituationCount": 382,
                        "SituationsPerPlayerAndRound": 0.0011628013162180344
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 358037,
                        "SituationCount": 429,
                        "SituationsPerPlayerAndRound": 0.0011982001860142946
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 377924,
                        "SituationCount": 473,
                        "SituationsPerPlayerAndRound": 0.0012515743906182195
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 472085,
                        "SituationCount": 608,
                        "SituationsPerPlayerAndRound": 0.0012879036614169058
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 434449,
                        "SituationCount": 605,
                        "SituationsPerPlayerAndRound": 0.0013925685178237262
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 374649,
                        "SituationCount": 475,
                        "SituationsPerPlayerAndRound": 0.0012678533774279392
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 330896,
                        "SituationCount": 429,
                        "SituationsPerPlayerAndRound": 0.0012964798607417436
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 280376,
                        "SituationCount": 428,
                        "SituationsPerPlayerAndRound": 0.001526521528233515
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 220485,
                        "SituationCount": 345,
                        "SituationsPerPlayerAndRound": 0.0015647322947139261
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 199501,
                        "SituationCount": 319,
                        "SituationsPerPlayerAndRound": 0.00159898947874948
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 103018,
                        "SituationCount": 172,
                        "SituationsPerPlayerAndRound": 0.0016696111359179948
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 34213,
                        "SituationCount": 60,
                        "SituationsPerPlayerAndRound": 0.0017537193464472569
                    }
                },
                "BombDropAtSpawn": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 2062298,
                        "SituationCount": 17305,
                        "SituationsPerPlayerAndRound": 0.008391124851985503
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 86432,
                        "SituationCount": 79,
                        "SituationsPerPlayerAndRound": 0.0009140133283968901
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 186087,
                        "SituationCount": 253,
                        "SituationsPerPlayerAndRound": 0.0013595791215936632
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 154127,
                        "SituationCount": 236,
                        "SituationsPerPlayerAndRound": 0.0015312047856637708
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 192277,
                        "SituationCount": 338,
                        "SituationsPerPlayerAndRound": 0.0017578805577370149
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 237280,
                        "SituationCount": 439,
                        "SituationsPerPlayerAndRound": 0.001850134861766689
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 283784,
                        "SituationCount": 554,
                        "SituationsPerPlayerAndRound": 0.0019521889888083894
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 328517,
                        "SituationCount": 718,
                        "SituationsPerPlayerAndRound": 0.0021855794372893944
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 358037,
                        "SituationCount": 830,
                        "SituationsPerPlayerAndRound": 0.0023181961640836002
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 377924,
                        "SituationCount": 1105,
                        "SituationsPerPlayerAndRound": 0.002923868290979139
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 472085,
                        "SituationCount": 1451,
                        "SituationsPerPlayerAndRound": 0.003073599034072254
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 434449,
                        "SituationCount": 1618,
                        "SituationsPerPlayerAndRound": 0.0037242576228740313
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 374649,
                        "SituationCount": 1694,
                        "SituationsPerPlayerAndRound": 0.004521565518658798
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 330896,
                        "SituationCount": 1519,
                        "SituationsPerPlayerAndRound": 0.004590566220202118
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 280376,
                        "SituationCount": 1268,
                        "SituationsPerPlayerAndRound": 0.0045224983593460215
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 220485,
                        "SituationCount": 1178,
                        "SituationsPerPlayerAndRound": 0.005342767081660884
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 199501,
                        "SituationCount": 1252,
                        "SituationsPerPlayerAndRound": 0.006275657766126486
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 103018,
                        "SituationCount": 576,
                        "SituationsPerPlayerAndRound": 0.005591255897027704
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 34213,
                        "SituationCount": 155,
                        "SituationsPerPlayerAndRound": 0.004530441644988747
                    }
                },
                "HasNotBoughtDefuseKit": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 2062388,
                        "SituationCount": 73785,
                        "SituationsPerPlayerAndRound": 0.03577648822626974
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 86432,
                        "SituationCount": 4916,
                        "SituationsPerPlayerAndRound": 0.05687708256201407
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 186087,
                        "SituationCount": 11371,
                        "SituationsPerPlayerAndRound": 0.06110582684443298
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 154127,
                        "SituationCount": 9108,
                        "SituationsPerPlayerAndRound": 0.059094123677227224
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 192277,
                        "SituationCount": 11576,
                        "SituationsPerPlayerAndRound": 0.06020480868746652
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 237280,
                        "SituationCount": 14353,
                        "SituationsPerPlayerAndRound": 0.06048971679028995
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 283784,
                        "SituationCount": 16443,
                        "SituationsPerPlayerAndRound": 0.05794195585374792
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 328517,
                        "SituationCount": 18515,
                        "SituationsPerPlayerAndRound": 0.0563593360465364
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 358037,
                        "SituationCount": 18158,
                        "SituationsPerPlayerAndRound": 0.05071542885232532
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 377924,
                        "SituationCount": 17685,
                        "SituationsPerPlayerAndRound": 0.046795122828928566
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 472085,
                        "SituationCount": 20733,
                        "SituationsPerPlayerAndRound": 0.043917938506836694
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 434449,
                        "SituationCount": 17501,
                        "SituationsPerPlayerAndRound": 0.04028320930650088
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 374649,
                        "SituationCount": 13241,
                        "SituationsPerPlayerAndRound": 0.03534241383268072
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 330921,
                        "SituationCount": 10823,
                        "SituationsPerPlayerAndRound": 0.03270569108639222
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 280529,
                        "SituationCount": 8837,
                        "SituationsPerPlayerAndRound": 0.03150119951947927
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 220982,
                        "SituationCount": 6650,
                        "SituationsPerPlayerAndRound": 0.030092948746956765
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 199762,
                        "SituationCount": 5457,
                        "SituationsPerPlayerAndRound": 0.027317507834322845
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 103042,
                        "SituationCount": 2700,
                        "SituationsPerPlayerAndRound": 0.026202907552260242
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 34213,
                        "SituationCount": 1330,
                        "SituationsPerPlayerAndRound": 0.03887411217958086
                    }
                },
                "MissedTradeKill": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 846041,
                        "SituationCount": 89,
                        "SituationsPerPlayerAndRound": 0.00010519584748256881
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 38105,
                        "SituationCount": 6,
                        "SituationsPerPlayerAndRound": 0.00015745965096444035
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 51990,
                        "SituationCount": 8,
                        "SituationsPerPlayerAndRound": 0.00015387574533564147
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 40971,
                        "SituationCount": 7,
                        "SituationsPerPlayerAndRound": 0.00017085255424568598
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 50942,
                        "SituationCount": 7,
                        "SituationsPerPlayerAndRound": 0.0001374111734914216
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 73329,
                        "SituationCount": 6,
                        "SituationsPerPlayerAndRound": 0.00008182301681462995
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 103993,
                        "SituationCount": 10,
                        "SituationsPerPlayerAndRound": 0.00009616031848297482
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 137950,
                        "SituationCount": 13,
                        "SituationsPerPlayerAndRound": 0.00009423704240666908
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 132560,
                        "SituationCount": 11,
                        "SituationsPerPlayerAndRound": 0.00008298129149064575
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 131437,
                        "SituationCount": 8,
                        "SituationsPerPlayerAndRound": 0.00006086566187603186
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 150229,
                        "SituationCount": 14,
                        "SituationsPerPlayerAndRound": 0.00009319106164588728
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 131010,
                        "SituationCount": 14,
                        "SituationsPerPlayerAndRound": 0.00010686207159758797
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 104830,
                        "SituationCount": 8,
                        "SituationsPerPlayerAndRound": 0.00007631403224267862
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 90331,
                        "SituationCount": 11,
                        "SituationsPerPlayerAndRound": 0.00012177436317543257
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 93647,
                        "SituationCount": 6,
                        "SituationsPerPlayerAndRound": 0.00006407039200401508
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 79595,
                        "SituationCount": 5,
                        "SituationsPerPlayerAndRound": 0.00006281801620704818
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 76430,
                        "SituationCount": 6,
                        "SituationsPerPlayerAndRound": 0.00007850320554755985
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 41773,
                        "SituationCount": 6,
                        "SituationsPerPlayerAndRound": 0.0001436334474421277
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 15521,
                        "SituationCount": 3,
                        "SituationsPerPlayerAndRound": 0.00019328651504413376
                    }
                }
            }
        }
    }
}