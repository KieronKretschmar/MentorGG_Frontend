import Enums from './enums';
import Helpers from './helpers';
import SituationBase from '@/components/Situations/SituationBase';

export default class SituationLoader {
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

        if (data[situationType] == undefined) {
            return null;
        }

        return data[situationType];
    }

    static getSituationsByRank() {
        return {
            "Data": {
                "SmokeFail": {
                "0": {
                    "RankBeforeMatch": 0,
                    "PlayerRoundCount": 1138651,
                    "SituationCount": 6265,
                    "SituationsPerPlayerAndRound": 0.005502124882865777
                },
                "1": {
                    "RankBeforeMatch": 1,
                    "PlayerRoundCount": 47965,
                    "SituationCount": 223,
                    "SituationsPerPlayerAndRound": 0.004649223392056708
                },
                "2": {
                    "RankBeforeMatch": 2,
                    "PlayerRoundCount": 131145,
                    "SituationCount": 517,
                    "SituationsPerPlayerAndRound": 0.00394220138015174
                },
                "3": {
                    "RankBeforeMatch": 3,
                    "PlayerRoundCount": 109543,
                    "SituationCount": 552,
                    "SituationsPerPlayerAndRound": 0.005039117059054435
                },
                "4": {
                    "RankBeforeMatch": 4,
                    "PlayerRoundCount": 136758,
                    "SituationCount": 720,
                    "SituationsPerPlayerAndRound": 0.005264774272803053
                },
                "5": {
                    "RankBeforeMatch": 5,
                    "PlayerRoundCount": 158015,
                    "SituationCount": 910,
                    "SituationsPerPlayerAndRound": 0.005758946935417524
                },
                "6": {
                    "RankBeforeMatch": 6,
                    "PlayerRoundCount": 169846,
                    "SituationCount": 870,
                    "SituationsPerPlayerAndRound": 0.005122287248448595
                },
                "7": {
                    "RankBeforeMatch": 7,
                    "PlayerRoundCount": 181598,
                    "SituationCount": 1102,
                    "SituationsPerPlayerAndRound": 0.006068348770360907
                },
                "8": {
                    "RankBeforeMatch": 8,
                    "PlayerRoundCount": 216918,
                    "SituationCount": 1264,
                    "SituationsPerPlayerAndRound": 0.0058270867332356
                },
                "9": {
                    "RankBeforeMatch": 9,
                    "PlayerRoundCount": 236879,
                    "SituationCount": 1259,
                    "SituationsPerPlayerAndRound": 0.0053149498267047735
                },
                "10": {
                    "RankBeforeMatch": 10,
                    "PlayerRoundCount": 313606,
                    "SituationCount": 1795,
                    "SituationsPerPlayerAndRound": 0.0057237425304362795
                },
                "11": {
                    "RankBeforeMatch": 11,
                    "PlayerRoundCount": 286830,
                    "SituationCount": 1552,
                    "SituationsPerPlayerAndRound": 0.005410870550500296
                },
                "12": {
                    "RankBeforeMatch": 12,
                    "PlayerRoundCount": 252775,
                    "SituationCount": 1285,
                    "SituationsPerPlayerAndRound": 0.005083572346948868
                },
                "13": {
                    "RankBeforeMatch": 13,
                    "PlayerRoundCount": 228547,
                    "SituationCount": 1267,
                    "SituationsPerPlayerAndRound": 0.005543717484806188
                },
                "14": {
                    "RankBeforeMatch": 14,
                    "PlayerRoundCount": 178894,
                    "SituationCount": 994,
                    "SituationsPerPlayerAndRound": 0.0055563629859022665
                },
                "15": {
                    "RankBeforeMatch": 15,
                    "PlayerRoundCount": 134156,
                    "SituationCount": 722,
                    "SituationsPerPlayerAndRound": 0.005381794328990131
                },
                "16": {
                    "RankBeforeMatch": 16,
                    "PlayerRoundCount": 117076,
                    "SituationCount": 729,
                    "SituationsPerPlayerAndRound": 0.00622672452082408
                },
                "17": {
                    "RankBeforeMatch": 17,
                    "PlayerRoundCount": 58677,
                    "SituationCount": 288,
                    "SituationsPerPlayerAndRound": 0.004908226391942328
                },
                "18": {
                    "RankBeforeMatch": 18,
                    "PlayerRoundCount": 18065,
                    "SituationCount": 121,
                    "SituationsPerPlayerAndRound": 0.006698034874065873
                }
                },
                "DeathInducedBombDrop": {
                "0": {
                    "RankBeforeMatch": 0,
                    "PlayerRoundCount": 1138651,
                    "SituationCount": 14228,
                    "SituationsPerPlayerAndRound": 0.012495488081949606
                },
                "1": {
                    "RankBeforeMatch": 1,
                    "PlayerRoundCount": 47965,
                    "SituationCount": 1055,
                    "SituationsPerPlayerAndRound": 0.02199520483686021
                },
                "2": {
                    "RankBeforeMatch": 2,
                    "PlayerRoundCount": 131145,
                    "SituationCount": 2729,
                    "SituationsPerPlayerAndRound": 0.02080902817492089
                },
                "3": {
                    "RankBeforeMatch": 3,
                    "PlayerRoundCount": 109543,
                    "SituationCount": 2136,
                    "SituationsPerPlayerAndRound": 0.019499192098080206
                },
                "4": {
                    "RankBeforeMatch": 4,
                    "PlayerRoundCount": 136758,
                    "SituationCount": 2509,
                    "SituationsPerPlayerAndRound": 0.018346275903420643
                },
                "5": {
                    "RankBeforeMatch": 5,
                    "PlayerRoundCount": 158015,
                    "SituationCount": 2945,
                    "SituationsPerPlayerAndRound": 0.01863747112615891
                },
                "6": {
                    "RankBeforeMatch": 6,
                    "PlayerRoundCount": 169846,
                    "SituationCount": 3173,
                    "SituationsPerPlayerAndRound": 0.018681629240606196
                },
                "7": {
                    "RankBeforeMatch": 7,
                    "PlayerRoundCount": 181598,
                    "SituationCount": 3234,
                    "SituationsPerPlayerAndRound": 0.017808566173636273
                },
                "8": {
                    "RankBeforeMatch": 8,
                    "PlayerRoundCount": 216918,
                    "SituationCount": 3579,
                    "SituationsPerPlayerAndRound": 0.016499322324565042
                },
                "9": {
                    "RankBeforeMatch": 9,
                    "PlayerRoundCount": 236879,
                    "SituationCount": 3989,
                    "SituationsPerPlayerAndRound": 0.016839821174523702
                },
                "10": {
                    "RankBeforeMatch": 10,
                    "PlayerRoundCount": 313606,
                    "SituationCount": 4767,
                    "SituationsPerPlayerAndRound": 0.015200602029297908
                },
                "11": {
                    "RankBeforeMatch": 11,
                    "PlayerRoundCount": 286830,
                    "SituationCount": 4091,
                    "SituationsPerPlayerAndRound": 0.014262803751350974
                },
                "12": {
                    "RankBeforeMatch": 12,
                    "PlayerRoundCount": 252775,
                    "SituationCount": 3359,
                    "SituationsPerPlayerAndRound": 0.013288497675798636
                },
                "13": {
                    "RankBeforeMatch": 13,
                    "PlayerRoundCount": 228547,
                    "SituationCount": 2922,
                    "SituationsPerPlayerAndRound": 0.012785116409316245
                },
                "14": {
                    "RankBeforeMatch": 14,
                    "PlayerRoundCount": 178894,
                    "SituationCount": 2299,
                    "SituationsPerPlayerAndRound": 0.012851185618299104
                },
                "15": {
                    "RankBeforeMatch": 15,
                    "PlayerRoundCount": 134156,
                    "SituationCount": 1622,
                    "SituationsPerPlayerAndRound": 0.012090402218313008
                },
                "16": {
                    "RankBeforeMatch": 16,
                    "PlayerRoundCount": 117076,
                    "SituationCount": 1345,
                    "SituationsPerPlayerAndRound": 0.011488264033619187
                },
                "17": {
                    "RankBeforeMatch": 17,
                    "PlayerRoundCount": 58677,
                    "SituationCount": 599,
                    "SituationsPerPlayerAndRound": 0.010208429197130052
                },
                "18": {
                    "RankBeforeMatch": 18,
                    "PlayerRoundCount": 18065,
                    "SituationCount": 159,
                    "SituationsPerPlayerAndRound": 0.008801549958483255
                }
                },
                "SelfFlash": {
                "0": {
                    "RankBeforeMatch": 0,
                    "PlayerRoundCount": 1138651,
                    "SituationCount": 23984,
                    "SituationsPerPlayerAndRound": 0.02106352165852399
                },
                "1": {
                    "RankBeforeMatch": 1,
                    "PlayerRoundCount": 47965,
                    "SituationCount": 741,
                    "SituationsPerPlayerAndRound": 0.015448764724278119
                },
                "2": {
                    "RankBeforeMatch": 2,
                    "PlayerRoundCount": 131145,
                    "SituationCount": 2090,
                    "SituationsPerPlayerAndRound": 0.015936558770826184
                },
                "3": {
                    "RankBeforeMatch": 3,
                    "PlayerRoundCount": 109543,
                    "SituationCount": 1858,
                    "SituationsPerPlayerAndRound": 0.016961375898049167
                },
                "4": {
                    "RankBeforeMatch": 4,
                    "PlayerRoundCount": 136758,
                    "SituationCount": 2366,
                    "SituationsPerPlayerAndRound": 0.017300633235350034
                },
                "5": {
                    "RankBeforeMatch": 5,
                    "PlayerRoundCount": 158015,
                    "SituationCount": 2950,
                    "SituationsPerPlayerAndRound": 0.018669113691738126
                },
                "6": {
                    "RankBeforeMatch": 6,
                    "PlayerRoundCount": 169846,
                    "SituationCount": 2942,
                    "SituationsPerPlayerAndRound": 0.017321573660845708
                },
                "7": {
                    "RankBeforeMatch": 7,
                    "PlayerRoundCount": 181598,
                    "SituationCount": 3237,
                    "SituationsPerPlayerAndRound": 0.01782508617936321
                },
                "8": {
                    "RankBeforeMatch": 8,
                    "PlayerRoundCount": 216918,
                    "SituationCount": 3888,
                    "SituationsPerPlayerAndRound": 0.017923823749066467
                },
                "9": {
                    "RankBeforeMatch": 9,
                    "PlayerRoundCount": 236879,
                    "SituationCount": 4594,
                    "SituationsPerPlayerAndRound": 0.01939386775526746
                },
                "10": {
                    "RankBeforeMatch": 10,
                    "PlayerRoundCount": 313606,
                    "SituationCount": 5884,
                    "SituationsPerPlayerAndRound": 0.01876239612762511
                },
                "11": {
                    "RankBeforeMatch": 11,
                    "PlayerRoundCount": 286830,
                    "SituationCount": 5354,
                    "SituationsPerPlayerAndRound": 0.01866610884496043
                },
                "12": {
                    "RankBeforeMatch": 12,
                    "PlayerRoundCount": 252775,
                    "SituationCount": 4858,
                    "SituationsPerPlayerAndRound": 0.01921867273266739
                },
                "13": {
                    "RankBeforeMatch": 13,
                    "PlayerRoundCount": 228547,
                    "SituationCount": 4314,
                    "SituationsPerPlayerAndRound": 0.01887576734763528
                },
                "14": {
                    "RankBeforeMatch": 14,
                    "PlayerRoundCount": 178894,
                    "SituationCount": 3335,
                    "SituationsPerPlayerAndRound": 0.018642324505014143
                },
                "15": {
                    "RankBeforeMatch": 15,
                    "PlayerRoundCount": 134156,
                    "SituationCount": 2507,
                    "SituationsPerPlayerAndRound": 0.01868719997614717
                },
                "16": {
                    "RankBeforeMatch": 16,
                    "PlayerRoundCount": 117076,
                    "SituationCount": 2238,
                    "SituationsPerPlayerAndRound": 0.019115788035122483
                },
                "17": {
                    "RankBeforeMatch": 17,
                    "PlayerRoundCount": 58677,
                    "SituationCount": 1299,
                    "SituationsPerPlayerAndRound": 0.022138146121989877
                },
                "18": {
                    "RankBeforeMatch": 18,
                    "PlayerRoundCount": 18065,
                    "SituationCount": 437,
                    "SituationsPerPlayerAndRound": 0.024190423470799888
                }
                },
                "TeamFlash": {
                "0": {
                    "RankBeforeMatch": 0,
                    "PlayerRoundCount": 1138651,
                    "SituationCount": 59104,
                    "SituationsPerPlayerAndRound": 0.0519070373626335
                },
                "1": {
                    "RankBeforeMatch": 1,
                    "PlayerRoundCount": 47965,
                    "SituationCount": 1830,
                    "SituationsPerPlayerAndRound": 0.03815281976441155
                },
                "2": {
                    "RankBeforeMatch": 2,
                    "PlayerRoundCount": 131145,
                    "SituationCount": 5350,
                    "SituationsPerPlayerAndRound": 0.04079454039422014
                },
                "3": {
                    "RankBeforeMatch": 3,
                    "PlayerRoundCount": 109543,
                    "SituationCount": 4650,
                    "SituationsPerPlayerAndRound": 0.04244908392138247
                },
                "4": {
                    "RankBeforeMatch": 4,
                    "PlayerRoundCount": 136758,
                    "SituationCount": 6044,
                    "SituationsPerPlayerAndRound": 0.04419485514558563
                },
                "5": {
                    "RankBeforeMatch": 5,
                    "PlayerRoundCount": 158015,
                    "SituationCount": 7217,
                    "SituationsPerPlayerAndRound": 0.04567287915704205
                },
                "6": {
                    "RankBeforeMatch": 6,
                    "PlayerRoundCount": 169846,
                    "SituationCount": 7579,
                    "SituationsPerPlayerAndRound": 0.04462277592642747
                },
                "7": {
                    "RankBeforeMatch": 7,
                    "PlayerRoundCount": 181598,
                    "SituationCount": 8485,
                    "SituationsPerPlayerAndRound": 0.046724082864348725
                },
                "8": {
                    "RankBeforeMatch": 8,
                    "PlayerRoundCount": 216918,
                    "SituationCount": 10388,
                    "SituationsPerPlayerAndRound": 0.04788906407029384
                },
                "9": {
                    "RankBeforeMatch": 9,
                    "PlayerRoundCount": 236879,
                    "SituationCount": 12123,
                    "SituationsPerPlayerAndRound": 0.05117802760058933
                },
                "10": {
                    "RankBeforeMatch": 10,
                    "PlayerRoundCount": 313606,
                    "SituationCount": 15350,
                    "SituationsPerPlayerAndRound": 0.04894676760010969
                },
                "11": {
                    "RankBeforeMatch": 11,
                    "PlayerRoundCount": 286830,
                    "SituationCount": 13915,
                    "SituationsPerPlayerAndRound": 0.04851305651431161
                },
                "12": {
                    "RankBeforeMatch": 12,
                    "PlayerRoundCount": 252775,
                    "SituationCount": 12153,
                    "SituationsPerPlayerAndRound": 0.04807833053110474
                },
                "13": {
                    "RankBeforeMatch": 13,
                    "PlayerRoundCount": 228547,
                    "SituationCount": 10809,
                    "SituationsPerPlayerAndRound": 0.047294429592162665
                },
                "14": {
                    "RankBeforeMatch": 14,
                    "PlayerRoundCount": 178894,
                    "SituationCount": 8385,
                    "SituationsPerPlayerAndRound": 0.0468713316265498
                },
                "15": {
                    "RankBeforeMatch": 15,
                    "PlayerRoundCount": 134156,
                    "SituationCount": 6568,
                    "SituationsPerPlayerAndRound": 0.04895792957452518
                },
                "16": {
                    "RankBeforeMatch": 16,
                    "PlayerRoundCount": 117076,
                    "SituationCount": 5653,
                    "SituationsPerPlayerAndRound": 0.04828487478219276
                },
                "17": {
                    "RankBeforeMatch": 17,
                    "PlayerRoundCount": 58677,
                    "SituationCount": 3101,
                    "SituationsPerPlayerAndRound": 0.05284864597712903
                },
                "18": {
                    "RankBeforeMatch": 18,
                    "PlayerRoundCount": 18065,
                    "SituationCount": 1124,
                    "SituationsPerPlayerAndRound": 0.0622197619706615
                }
                },
                "RifleFiredWhileMoving": {
                "0": {
                    "RankBeforeMatch": 0,
                    "PlayerRoundCount": 1138651,
                    "SituationCount": 28648,
                    "SituationsPerPlayerAndRound": 0.025159596750892063
                },
                "1": {
                    "RankBeforeMatch": 1,
                    "PlayerRoundCount": 47965,
                    "SituationCount": 2064,
                    "SituationsPerPlayerAndRound": 0.043031377045762535
                },
                "2": {
                    "RankBeforeMatch": 2,
                    "PlayerRoundCount": 131145,
                    "SituationCount": 5768,
                    "SituationsPerPlayerAndRound": 0.043981852148385375
                },
                "3": {
                    "RankBeforeMatch": 3,
                    "PlayerRoundCount": 109543,
                    "SituationCount": 4595,
                    "SituationsPerPlayerAndRound": 0.041946997982527406
                },
                "4": {
                    "RankBeforeMatch": 4,
                    "PlayerRoundCount": 136758,
                    "SituationCount": 5859,
                    "SituationsPerPlayerAndRound": 0.04284210064493485
                },
                "5": {
                    "RankBeforeMatch": 5,
                    "PlayerRoundCount": 158015,
                    "SituationCount": 6568,
                    "SituationsPerPlayerAndRound": 0.04156567414485966
                },
                "6": {
                    "RankBeforeMatch": 6,
                    "PlayerRoundCount": 169846,
                    "SituationCount": 7036,
                    "SituationsPerPlayerAndRound": 0.04142576216101645
                },
                "7": {
                    "RankBeforeMatch": 7,
                    "PlayerRoundCount": 181598,
                    "SituationCount": 7466,
                    "SituationsPerPlayerAndRound": 0.041112787585766364
                },
                "8": {
                    "RankBeforeMatch": 8,
                    "PlayerRoundCount": 216918,
                    "SituationCount": 8364,
                    "SituationsPerPlayerAndRound": 0.038558349237960886
                },
                "9": {
                    "RankBeforeMatch": 9,
                    "PlayerRoundCount": 236879,
                    "SituationCount": 8328,
                    "SituationsPerPlayerAndRound": 0.03515718995774214
                },
                "10": {
                    "RankBeforeMatch": 10,
                    "PlayerRoundCount": 313606,
                    "SituationCount": 10557,
                    "SituationsPerPlayerAndRound": 0.03366325899376925
                },
                "11": {
                    "RankBeforeMatch": 11,
                    "PlayerRoundCount": 286830,
                    "SituationCount": 9097,
                    "SituationsPerPlayerAndRound": 0.03171565038524562
                },
                "12": {
                    "RankBeforeMatch": 12,
                    "PlayerRoundCount": 252775,
                    "SituationCount": 7964,
                    "SituationsPerPlayerAndRound": 0.03150628028879438
                },
                "13": {
                    "RankBeforeMatch": 13,
                    "PlayerRoundCount": 228547,
                    "SituationCount": 6419,
                    "SituationsPerPlayerAndRound": 0.028086126704791575
                },
                "14": {
                    "RankBeforeMatch": 14,
                    "PlayerRoundCount": 178894,
                    "SituationCount": 4670,
                    "SituationsPerPlayerAndRound": 0.026104844209420105
                },
                "15": {
                    "RankBeforeMatch": 15,
                    "PlayerRoundCount": 134156,
                    "SituationCount": 3260,
                    "SituationsPerPlayerAndRound": 0.024300068576880645
                },
                "16": {
                    "RankBeforeMatch": 16,
                    "PlayerRoundCount": 117076,
                    "SituationCount": 2562,
                    "SituationsPerPlayerAndRound": 0.02188322115548874
                },
                "17": {
                    "RankBeforeMatch": 17,
                    "PlayerRoundCount": 58677,
                    "SituationCount": 1122,
                    "SituationsPerPlayerAndRound": 0.01912163198527532
                },
                "18": {
                    "RankBeforeMatch": 18,
                    "PlayerRoundCount": 18065,
                    "SituationCount": 303,
                    "SituationsPerPlayerAndRound": 0.016772765015222808
                }
                },
                "UnnecessaryReload": {
                "0": {
                    "RankBeforeMatch": 0,
                    "PlayerRoundCount": 1138651,
                    "SituationCount": 5565,
                    "SituationsPerPlayerAndRound": 0.0048873623261209975
                },
                "1": {
                    "RankBeforeMatch": 1,
                    "PlayerRoundCount": 47965,
                    "SituationCount": 435,
                    "SituationsPerPlayerAndRound": 0.00906911289481914
                },
                "2": {
                    "RankBeforeMatch": 2,
                    "PlayerRoundCount": 131145,
                    "SituationCount": 1133,
                    "SituationsPerPlayerAndRound": 0.008639292386289984
                },
                "3": {
                    "RankBeforeMatch": 3,
                    "PlayerRoundCount": 109543,
                    "SituationCount": 1089,
                    "SituationsPerPlayerAndRound": 0.009941301589330218
                },
                "4": {
                    "RankBeforeMatch": 4,
                    "PlayerRoundCount": 136758,
                    "SituationCount": 1123,
                    "SituationsPerPlayerAndRound": 0.008211585428274763
                },
                "5": {
                    "RankBeforeMatch": 5,
                    "PlayerRoundCount": 158015,
                    "SituationCount": 1400,
                    "SituationsPerPlayerAndRound": 0.008859918362180806
                },
                "6": {
                    "RankBeforeMatch": 6,
                    "PlayerRoundCount": 169846,
                    "SituationCount": 1405,
                    "SituationsPerPlayerAndRound": 0.008272199521919857
                },
                "7": {
                    "RankBeforeMatch": 7,
                    "PlayerRoundCount": 181598,
                    "SituationCount": 1417,
                    "SituationsPerPlayerAndRound": 0.007802949371689115
                },
                "8": {
                    "RankBeforeMatch": 8,
                    "PlayerRoundCount": 216918,
                    "SituationCount": 1673,
                    "SituationsPerPlayerAndRound": 0.007712591854986677
                },
                "9": {
                    "RankBeforeMatch": 9,
                    "PlayerRoundCount": 236879,
                    "SituationCount": 1708,
                    "SituationsPerPlayerAndRound": 0.007210432330430304
                },
                "10": {
                    "RankBeforeMatch": 10,
                    "PlayerRoundCount": 313606,
                    "SituationCount": 2211,
                    "SituationsPerPlayerAndRound": 0.007050247763116777
                },
                "11": {
                    "RankBeforeMatch": 11,
                    "PlayerRoundCount": 286830,
                    "SituationCount": 1862,
                    "SituationsPerPlayerAndRound": 0.006491650106334763
                },
                "12": {
                    "RankBeforeMatch": 12,
                    "PlayerRoundCount": 252775,
                    "SituationCount": 1453,
                    "SituationsPerPlayerAndRound": 0.005748195035110276
                },
                "13": {
                    "RankBeforeMatch": 13,
                    "PlayerRoundCount": 228547,
                    "SituationCount": 1196,
                    "SituationsPerPlayerAndRound": 0.005233059283210893
                },
                "14": {
                    "RankBeforeMatch": 14,
                    "PlayerRoundCount": 178894,
                    "SituationCount": 940,
                    "SituationsPerPlayerAndRound": 0.005254508256285846
                },
                "15": {
                    "RankBeforeMatch": 15,
                    "PlayerRoundCount": 134156,
                    "SituationCount": 726,
                    "SituationsPerPlayerAndRound": 0.005411610364053788
                },
                "16": {
                    "RankBeforeMatch": 16,
                    "PlayerRoundCount": 117076,
                    "SituationCount": 479,
                    "SituationsPerPlayerAndRound": 0.004091359458813079
                },
                "17": {
                    "RankBeforeMatch": 17,
                    "PlayerRoundCount": 58677,
                    "SituationCount": 206,
                    "SituationsPerPlayerAndRound": 0.0035107452664587487
                },
                "18": {
                    "RankBeforeMatch": 18,
                    "PlayerRoundCount": 18065,
                    "SituationCount": 54,
                    "SituationsPerPlayerAndRound": 0.002989205646277332
                }
                },
                "PushBeforeSmokeDetonated": {
                "0": {
                    "RankBeforeMatch": 0,
                    "PlayerRoundCount": 1138651,
                    "SituationCount": 1623,
                    "SituationsPerPlayerAndRound": 0.0014253708994239674
                },
                "1": {
                    "RankBeforeMatch": 1,
                    "PlayerRoundCount": 47965,
                    "SituationCount": 29,
                    "SituationsPerPlayerAndRound": 0.0006046075263212759
                },
                "2": {
                    "RankBeforeMatch": 2,
                    "PlayerRoundCount": 131145,
                    "SituationCount": 94,
                    "SituationsPerPlayerAndRound": 0.0007167638873003165
                },
                "3": {
                    "RankBeforeMatch": 3,
                    "PlayerRoundCount": 109543,
                    "SituationCount": 89,
                    "SituationsPerPlayerAndRound": 0.0008124663374200086
                },
                "4": {
                    "RankBeforeMatch": 4,
                    "PlayerRoundCount": 136758,
                    "SituationCount": 124,
                    "SituationsPerPlayerAndRound": 0.0009067111247605258
                },
                "5": {
                    "RankBeforeMatch": 5,
                    "PlayerRoundCount": 158015,
                    "SituationCount": 160,
                    "SituationsPerPlayerAndRound": 0.0010125620985349491
                },
                "6": {
                    "RankBeforeMatch": 6,
                    "PlayerRoundCount": 169846,
                    "SituationCount": 166,
                    "SituationsPerPlayerAndRound": 0.0009773559577499617
                },
                "7": {
                    "RankBeforeMatch": 7,
                    "PlayerRoundCount": 181598,
                    "SituationCount": 204,
                    "SituationsPerPlayerAndRound": 0.0011233603894316017
                },
                "8": {
                    "RankBeforeMatch": 8,
                    "PlayerRoundCount": 216918,
                    "SituationCount": 250,
                    "SituationsPerPlayerAndRound": 0.00115250924312413
                },
                "9": {
                    "RankBeforeMatch": 9,
                    "PlayerRoundCount": 236879,
                    "SituationCount": 316,
                    "SituationsPerPlayerAndRound": 0.0013340144124215317
                },
                "10": {
                    "RankBeforeMatch": 10,
                    "PlayerRoundCount": 313606,
                    "SituationCount": 421,
                    "SituationsPerPlayerAndRound": 0.0013424488051886761
                },
                "11": {
                    "RankBeforeMatch": 11,
                    "PlayerRoundCount": 286830,
                    "SituationCount": 409,
                    "SituationsPerPlayerAndRound": 0.0014259317365686993
                },
                "12": {
                    "RankBeforeMatch": 12,
                    "PlayerRoundCount": 252775,
                    "SituationCount": 332,
                    "SituationsPerPlayerAndRound": 0.001313421026604688
                },
                "13": {
                    "RankBeforeMatch": 13,
                    "PlayerRoundCount": 228547,
                    "SituationCount": 295,
                    "SituationsPerPlayerAndRound": 0.0012907629502903124
                },
                "14": {
                    "RankBeforeMatch": 14,
                    "PlayerRoundCount": 178894,
                    "SituationCount": 256,
                    "SituationsPerPlayerAndRound": 0.0014310150144778472
                },
                "15": {
                    "RankBeforeMatch": 15,
                    "PlayerRoundCount": 134156,
                    "SituationCount": 193,
                    "SituationsPerPlayerAndRound": 0.0014386236918214616
                },
                "16": {
                    "RankBeforeMatch": 16,
                    "PlayerRoundCount": 117076,
                    "SituationCount": 188,
                    "SituationsPerPlayerAndRound": 0.001605794526632273
                },
                "17": {
                    "RankBeforeMatch": 17,
                    "PlayerRoundCount": 58677,
                    "SituationCount": 104,
                    "SituationsPerPlayerAndRound": 0.0017724150859791741
                },
                "18": {
                    "RankBeforeMatch": 18,
                    "PlayerRoundCount": 18065,
                    "SituationCount": 35,
                    "SituationsPerPlayerAndRound": 0.0019374481040686411
                }
                },
                "BombDropAtSpawn": {
                "0": {
                    "RankBeforeMatch": 0,
                    "PlayerRoundCount": 1138651,
                    "SituationCount": 9751,
                    "SituationsPerPlayerAndRound": 0.00856364241545478
                },
                "1": {
                    "RankBeforeMatch": 1,
                    "PlayerRoundCount": 47965,
                    "SituationCount": 54,
                    "SituationsPerPlayerAndRound": 0.0011258209110809965
                },
                "2": {
                    "RankBeforeMatch": 2,
                    "PlayerRoundCount": 131145,
                    "SituationCount": 176,
                    "SituationsPerPlayerAndRound": 0.001342026001753784
                },
                "3": {
                    "RankBeforeMatch": 3,
                    "PlayerRoundCount": 109543,
                    "SituationCount": 152,
                    "SituationsPerPlayerAndRound": 0.0013875829582903516
                },
                "4": {
                    "RankBeforeMatch": 4,
                    "PlayerRoundCount": 136758,
                    "SituationCount": 216,
                    "SituationsPerPlayerAndRound": 0.001579432281840916
                },
                "5": {
                    "RankBeforeMatch": 5,
                    "PlayerRoundCount": 158015,
                    "SituationCount": 264,
                    "SituationsPerPlayerAndRound": 0.0016707274625826663
                },
                "6": {
                    "RankBeforeMatch": 6,
                    "PlayerRoundCount": 169846,
                    "SituationCount": 297,
                    "SituationsPerPlayerAndRound": 0.0017486428882634857
                },
                "7": {
                    "RankBeforeMatch": 7,
                    "PlayerRoundCount": 181598,
                    "SituationCount": 373,
                    "SituationsPerPlayerAndRound": 0.0020539873787156246
                },
                "8": {
                    "RankBeforeMatch": 8,
                    "PlayerRoundCount": 216918,
                    "SituationCount": 480,
                    "SituationsPerPlayerAndRound": 0.0022128177467983295
                },
                "9": {
                    "RankBeforeMatch": 9,
                    "PlayerRoundCount": 236879,
                    "SituationCount": 700,
                    "SituationsPerPlayerAndRound": 0.002955095217389469
                },
                "10": {
                    "RankBeforeMatch": 10,
                    "PlayerRoundCount": 313606,
                    "SituationCount": 1009,
                    "SituationsPerPlayerAndRound": 0.0032174129321505328
                },
                "11": {
                    "RankBeforeMatch": 11,
                    "PlayerRoundCount": 286830,
                    "SituationCount": 1122,
                    "SituationsPerPlayerAndRound": 0.003911724714987972
                },
                "12": {
                    "RankBeforeMatch": 12,
                    "PlayerRoundCount": 252775,
                    "SituationCount": 1163,
                    "SituationsPerPlayerAndRound": 0.00460092968054594
                },
                "13": {
                    "RankBeforeMatch": 13,
                    "PlayerRoundCount": 228547,
                    "SituationCount": 1043,
                    "SituationsPerPlayerAndRound": 0.004563612736111172
                },
                "14": {
                    "RankBeforeMatch": 14,
                    "PlayerRoundCount": 178894,
                    "SituationCount": 858,
                    "SituationsPerPlayerAndRound": 0.00479613625946091
                },
                "15": {
                    "RankBeforeMatch": 15,
                    "PlayerRoundCount": 134156,
                    "SituationCount": 670,
                    "SituationsPerPlayerAndRound": 0.0049941858731625864
                },
                "16": {
                    "RankBeforeMatch": 16,
                    "PlayerRoundCount": 117076,
                    "SituationCount": 699,
                    "SituationsPerPlayerAndRound": 0.00597048071338276
                },
                "17": {
                    "RankBeforeMatch": 17,
                    "PlayerRoundCount": 58677,
                    "SituationCount": 313,
                    "SituationsPerPlayerAndRound": 0.005334287710687322
                },
                "18": {
                    "RankBeforeMatch": 18,
                    "PlayerRoundCount": 18065,
                    "SituationCount": 84,
                    "SituationsPerPlayerAndRound": 0.004649875449764739
                }
                },
                "HasNotBoughtDefuseKit": {
                "0": {
                    "RankBeforeMatch": 0,
                    "PlayerRoundCount": 1138651,
                    "SituationCount": 41445,
                    "SituationsPerPlayerAndRound": 0.03639833452041056
                },
                "1": {
                    "RankBeforeMatch": 1,
                    "PlayerRoundCount": 47965,
                    "SituationCount": 2699,
                    "SituationsPerPlayerAndRound": 0.056270197018659436
                },
                "2": {
                    "RankBeforeMatch": 2,
                    "PlayerRoundCount": 131145,
                    "SituationCount": 7936,
                    "SituationsPerPlayerAndRound": 0.060513172442716076
                },
                "3": {
                    "RankBeforeMatch": 3,
                    "PlayerRoundCount": 109543,
                    "SituationCount": 6503,
                    "SituationsPerPlayerAndRound": 0.059364815643172086
                },
                "4": {
                    "RankBeforeMatch": 4,
                    "PlayerRoundCount": 136758,
                    "SituationCount": 8219,
                    "SituationsPerPlayerAndRound": 0.06009886076134486
                },
                "5": {
                    "RankBeforeMatch": 5,
                    "PlayerRoundCount": 158015,
                    "SituationCount": 9626,
                    "SituationsPerPlayerAndRound": 0.06091826725310888
                },
                "6": {
                    "RankBeforeMatch": 6,
                    "PlayerRoundCount": 169846,
                    "SituationCount": 9513,
                    "SituationsPerPlayerAndRound": 0.05600956160286377
                },
                "7": {
                    "RankBeforeMatch": 7,
                    "PlayerRoundCount": 181598,
                    "SituationCount": 9785,
                    "SituationsPerPlayerAndRound": 0.053882752012687364
                },
                "8": {
                    "RankBeforeMatch": 8,
                    "PlayerRoundCount": 216918,
                    "SituationCount": 10940,
                    "SituationsPerPlayerAndRound": 0.05043380447911192
                },
                "9": {
                    "RankBeforeMatch": 9,
                    "PlayerRoundCount": 236879,
                    "SituationCount": 10929,
                    "SituationsPerPlayerAndRound": 0.04613747947264215
                },
                "10": {
                    "RankBeforeMatch": 10,
                    "PlayerRoundCount": 313606,
                    "SituationCount": 13715,
                    "SituationsPerPlayerAndRound": 0.04373321938993514
                },
                "11": {
                    "RankBeforeMatch": 11,
                    "PlayerRoundCount": 286830,
                    "SituationCount": 11627,
                    "SituationsPerPlayerAndRound": 0.04053620611512045
                },
                "12": {
                    "RankBeforeMatch": 12,
                    "PlayerRoundCount": 252775,
                    "SituationCount": 8670,
                    "SituationsPerPlayerAndRound": 0.03429927801404411
                },
                "13": {
                    "RankBeforeMatch": 13,
                    "PlayerRoundCount": 228547,
                    "SituationCount": 7476,
                    "SituationsPerPlayerAndRound": 0.03271099598769619
                },
                "14": {
                    "RankBeforeMatch": 14,
                    "PlayerRoundCount": 178894,
                    "SituationCount": 5614,
                    "SituationsPerPlayerAndRound": 0.03138171207530716
                },
                "15": {
                    "RankBeforeMatch": 15,
                    "PlayerRoundCount": 134156,
                    "SituationCount": 3873,
                    "SituationsPerPlayerAndRound": 0.028869375950386116
                },
                "16": {
                    "RankBeforeMatch": 16,
                    "PlayerRoundCount": 117076,
                    "SituationCount": 3167,
                    "SituationsPerPlayerAndRound": 0.027050804605555367
                },
                "17": {
                    "RankBeforeMatch": 17,
                    "PlayerRoundCount": 58677,
                    "SituationCount": 1390,
                    "SituationsPerPlayerAndRound": 0.023689009322221653
                },
                "18": {
                    "RankBeforeMatch": 18,
                    "PlayerRoundCount": 18065,
                    "SituationCount": 675,
                    "SituationsPerPlayerAndRound": 0.03736507057846665
                }
                },
                "EffectiveHeGrenade": {
                "0": {
                    "RankBeforeMatch": 0,
                    "PlayerRoundCount": 1138651,
                    "SituationCount": 28103,
                    "SituationsPerPlayerAndRound": 0.02468096018885506
                },
                "1": {
                    "RankBeforeMatch": 1,
                    "PlayerRoundCount": 47965,
                    "SituationCount": 578,
                    "SituationsPerPlayerAndRound": 0.012050453455644742
                },
                "2": {
                    "RankBeforeMatch": 2,
                    "PlayerRoundCount": 131145,
                    "SituationCount": 1681,
                    "SituationsPerPlayerAndRound": 0.012817873346296084
                },
                "3": {
                    "RankBeforeMatch": 3,
                    "PlayerRoundCount": 109543,
                    "SituationCount": 1407,
                    "SituationsPerPlayerAndRound": 0.012844271199437663
                },
                "4": {
                    "RankBeforeMatch": 4,
                    "PlayerRoundCount": 136758,
                    "SituationCount": 1908,
                    "SituationsPerPlayerAndRound": 0.013951651822928093
                },
                "5": {
                    "RankBeforeMatch": 5,
                    "PlayerRoundCount": 158015,
                    "SituationCount": 2307,
                    "SituationsPerPlayerAndRound": 0.014599879758250799
                },
                "6": {
                    "RankBeforeMatch": 6,
                    "PlayerRoundCount": 169846,
                    "SituationCount": 2589,
                    "SituationsPerPlayerAndRound": 0.015243220329003921
                },
                "7": {
                    "RankBeforeMatch": 7,
                    "PlayerRoundCount": 181598,
                    "SituationCount": 3136,
                    "SituationsPerPlayerAndRound": 0.017268912653223053
                },
                "8": {
                    "RankBeforeMatch": 8,
                    "PlayerRoundCount": 216918,
                    "SituationCount": 4001,
                    "SituationsPerPlayerAndRound": 0.018444757926958575
                },
                "9": {
                    "RankBeforeMatch": 9,
                    "PlayerRoundCount": 236879,
                    "SituationCount": 4889,
                    "SituationsPerPlayerAndRound": 0.020639229311167306
                },
                "10": {
                    "RankBeforeMatch": 10,
                    "PlayerRoundCount": 313606,
                    "SituationCount": 7571,
                    "SituationsPerPlayerAndRound": 0.02414175749188472
                },
                "11": {
                    "RankBeforeMatch": 11,
                    "PlayerRoundCount": 286830,
                    "SituationCount": 7415,
                    "SituationsPerPlayerAndRound": 0.02585154969842764
                },
                "12": {
                    "RankBeforeMatch": 12,
                    "PlayerRoundCount": 252775,
                    "SituationCount": 6937,
                    "SituationsPerPlayerAndRound": 0.027443378498664822
                },
                "13": {
                    "RankBeforeMatch": 13,
                    "PlayerRoundCount": 228547,
                    "SituationCount": 6845,
                    "SituationsPerPlayerAndRound": 0.02995007591436335
                },
                "14": {
                    "RankBeforeMatch": 14,
                    "PlayerRoundCount": 178894,
                    "SituationCount": 5512,
                    "SituationsPerPlayerAndRound": 0.030811542030476147
                },
                "15": {
                    "RankBeforeMatch": 15,
                    "PlayerRoundCount": 134156,
                    "SituationCount": 4186,
                    "SituationsPerPlayerAndRound": 0.031202480694117296
                },
                "16": {
                    "RankBeforeMatch": 16,
                    "PlayerRoundCount": 117076,
                    "SituationCount": 3749,
                    "SituationsPerPlayerAndRound": 0.032021934469916975
                },
                "17": {
                    "RankBeforeMatch": 17,
                    "PlayerRoundCount": 58677,
                    "SituationCount": 2017,
                    "SituationsPerPlayerAndRound": 0.0343746271963461
                },
                "18": {
                    "RankBeforeMatch": 18,
                    "PlayerRoundCount": 18065,
                    "SituationCount": 681,
                    "SituationsPerPlayerAndRound": 0.03769720453916413
                }
                },
                "KillWithOwnFlashAssist": {
                "0": {
                    "RankBeforeMatch": 0,
                    "PlayerRoundCount": 1138651,
                    "SituationCount": 8405,
                    "SituationsPerPlayerAndRound": 0.007381541842056961
                },
                "1": {
                    "RankBeforeMatch": 1,
                    "PlayerRoundCount": 47965,
                    "SituationCount": 162,
                    "SituationsPerPlayerAndRound": 0.0033774627332429897
                },
                "2": {
                    "RankBeforeMatch": 2,
                    "PlayerRoundCount": 131145,
                    "SituationCount": 558,
                    "SituationsPerPlayerAndRound": 0.004254832437378474
                },
                "3": {
                    "RankBeforeMatch": 3,
                    "PlayerRoundCount": 109543,
                    "SituationCount": 509,
                    "SituationsPerPlayerAndRound": 0.004646577143222297
                },
                "4": {
                    "RankBeforeMatch": 4,
                    "PlayerRoundCount": 136758,
                    "SituationCount": 684,
                    "SituationsPerPlayerAndRound": 0.0050015355591629005
                },
                "5": {
                    "RankBeforeMatch": 5,
                    "PlayerRoundCount": 158015,
                    "SituationCount": 760,
                    "SituationsPerPlayerAndRound": 0.004809669968041008
                },
                "6": {
                    "RankBeforeMatch": 6,
                    "PlayerRoundCount": 169846,
                    "SituationCount": 848,
                    "SituationsPerPlayerAndRound": 0.004992758145614263
                },
                "7": {
                    "RankBeforeMatch": 7,
                    "PlayerRoundCount": 181598,
                    "SituationCount": 1028,
                    "SituationsPerPlayerAndRound": 0.005660855295763169
                },
                "8": {
                    "RankBeforeMatch": 8,
                    "PlayerRoundCount": 216918,
                    "SituationCount": 1243,
                    "SituationsPerPlayerAndRound": 0.005730275956813174
                },
                "9": {
                    "RankBeforeMatch": 9,
                    "PlayerRoundCount": 236879,
                    "SituationCount": 1419,
                    "SituationsPerPlayerAndRound": 0.00599040016210808
                },
                "10": {
                    "RankBeforeMatch": 10,
                    "PlayerRoundCount": 313606,
                    "SituationCount": 1964,
                    "SituationsPerPlayerAndRound": 0.006262635281212732
                },
                "11": {
                    "RankBeforeMatch": 11,
                    "PlayerRoundCount": 286830,
                    "SituationCount": 1764,
                    "SituationsPerPlayerAndRound": 0.006149984311264512
                },
                "12": {
                    "RankBeforeMatch": 12,
                    "PlayerRoundCount": 252775,
                    "SituationCount": 1677,
                    "SituationsPerPlayerAndRound": 0.0066343586193254875
                },
                "13": {
                    "RankBeforeMatch": 13,
                    "PlayerRoundCount": 228547,
                    "SituationCount": 1716,
                    "SituationsPerPlayerAndRound": 0.007508302449824325
                },
                "14": {
                    "RankBeforeMatch": 14,
                    "PlayerRoundCount": 178894,
                    "SituationCount": 1484,
                    "SituationsPerPlayerAndRound": 0.00829541516205127
                },
                "15": {
                    "RankBeforeMatch": 15,
                    "PlayerRoundCount": 134156,
                    "SituationCount": 1139,
                    "SituationsPerPlayerAndRound": 0.008490115984376398
                },
                "16": {
                    "RankBeforeMatch": 16,
                    "PlayerRoundCount": 117076,
                    "SituationCount": 986,
                    "SituationsPerPlayerAndRound": 0.008421879804571389
                },
                "17": {
                    "RankBeforeMatch": 17,
                    "PlayerRoundCount": 58677,
                    "SituationCount": 580,
                    "SituationsPerPlayerAndRound": 0.009884622594883855
                },
                "18": {
                    "RankBeforeMatch": 18,
                    "PlayerRoundCount": 18065,
                    "SituationCount": 181,
                    "SituationsPerPlayerAndRound": 0.010019374481040686
                }
                },
                "Clutch": {
                "0": {
                    "RankBeforeMatch": 0,
                    "PlayerRoundCount": 1138651,
                    "SituationCount": 7766,
                    "SituationsPerPlayerAndRound": 0.006820351450971368
                },
                "1": {
                    "RankBeforeMatch": 1,
                    "PlayerRoundCount": 47965,
                    "SituationCount": 314,
                    "SituationsPerPlayerAndRound": 0.006546440112582091
                },
                "2": {
                    "RankBeforeMatch": 2,
                    "PlayerRoundCount": 131145,
                    "SituationCount": 995,
                    "SituationsPerPlayerAndRound": 0.007587021998551222
                },
                "3": {
                    "RankBeforeMatch": 3,
                    "PlayerRoundCount": 109543,
                    "SituationCount": 868,
                    "SituationsPerPlayerAndRound": 0.007923828998658062
                },
                "4": {
                    "RankBeforeMatch": 4,
                    "PlayerRoundCount": 136758,
                    "SituationCount": 1029,
                    "SituationsPerPlayerAndRound": 0.007524239898214364
                },
                "5": {
                    "RankBeforeMatch": 5,
                    "PlayerRoundCount": 158015,
                    "SituationCount": 1262,
                    "SituationsPerPlayerAndRound": 0.007986583552194412
                },
                "6": {
                    "RankBeforeMatch": 6,
                    "PlayerRoundCount": 169846,
                    "SituationCount": 1252,
                    "SituationsPerPlayerAndRound": 0.007371383488572
                },
                "7": {
                    "RankBeforeMatch": 7,
                    "PlayerRoundCount": 181598,
                    "SituationCount": 1328,
                    "SituationsPerPlayerAndRound": 0.007312855868456701
                },
                "8": {
                    "RankBeforeMatch": 8,
                    "PlayerRoundCount": 216918,
                    "SituationCount": 1762,
                    "SituationsPerPlayerAndRound": 0.008122885145538867
                },
                "9": {
                    "RankBeforeMatch": 9,
                    "PlayerRoundCount": 236879,
                    "SituationCount": 1832,
                    "SituationsPerPlayerAndRound": 0.007733906340367867
                },
                "10": {
                    "RankBeforeMatch": 10,
                    "PlayerRoundCount": 313606,
                    "SituationCount": 2347,
                    "SituationsPerPlayerAndRound": 0.007483912935339248
                },
                "11": {
                    "RankBeforeMatch": 11,
                    "PlayerRoundCount": 286830,
                    "SituationCount": 2253,
                    "SituationsPerPlayerAndRound": 0.007854826900951782
                },
                "12": {
                    "RankBeforeMatch": 12,
                    "PlayerRoundCount": 252775,
                    "SituationCount": 1968,
                    "SituationsPerPlayerAndRound": 0.007785580061319355
                },
                "13": {
                    "RankBeforeMatch": 13,
                    "PlayerRoundCount": 228547,
                    "SituationCount": 1610,
                    "SituationsPerPlayerAndRound": 0.007044502881245433
                },
                "14": {
                    "RankBeforeMatch": 14,
                    "PlayerRoundCount": 178894,
                    "SituationCount": 1282,
                    "SituationsPerPlayerAndRound": 0.007166254877189845
                },
                "15": {
                    "RankBeforeMatch": 15,
                    "PlayerRoundCount": 134156,
                    "SituationCount": 1043,
                    "SituationsPerPlayerAndRound": 0.007774531142848624
                },
                "16": {
                    "RankBeforeMatch": 16,
                    "PlayerRoundCount": 117076,
                    "SituationCount": 886,
                    "SituationsPerPlayerAndRound": 0.007567733779766989
                },
                "17": {
                    "RankBeforeMatch": 17,
                    "PlayerRoundCount": 58677,
                    "SituationCount": 442,
                    "SituationsPerPlayerAndRound": 0.00753276411541149
                },
                "18": {
                    "RankBeforeMatch": 18,
                    "PlayerRoundCount": 18065,
                    "SituationCount": 149,
                    "SituationsPerPlayerAndRound": 0.008247993357320786
                }
                },
                "HighImpactRound": {
                "0": {
                    "RankBeforeMatch": 0,
                    "PlayerRoundCount": 1138651,
                    "SituationCount": 55138,
                    "SituationsPerPlayerAndRound": 0.04842396836256237
                },
                "1": {
                    "RankBeforeMatch": 1,
                    "PlayerRoundCount": 47965,
                    "SituationCount": 1834,
                    "SituationsPerPlayerAndRound": 0.03823621390597311
                },
                "2": {
                    "RankBeforeMatch": 2,
                    "PlayerRoundCount": 131145,
                    "SituationCount": 5932,
                    "SituationsPerPlayerAndRound": 0.04523237637729231
                },
                "3": {
                    "RankBeforeMatch": 3,
                    "PlayerRoundCount": 109543,
                    "SituationCount": 5220,
                    "SituationsPerPlayerAndRound": 0.04765252001497129
                },
                "4": {
                    "RankBeforeMatch": 4,
                    "PlayerRoundCount": 136758,
                    "SituationCount": 6614,
                    "SituationsPerPlayerAndRound": 0.048362801444888054
                },
                "5": {
                    "RankBeforeMatch": 5,
                    "PlayerRoundCount": 158015,
                    "SituationCount": 7614,
                    "SituationsPerPlayerAndRound": 0.048185298864031896
                },
                "6": {
                    "RankBeforeMatch": 6,
                    "PlayerRoundCount": 169846,
                    "SituationCount": 8066,
                    "SituationsPerPlayerAndRound": 0.04749007924826019
                },
                "7": {
                    "RankBeforeMatch": 7,
                    "PlayerRoundCount": 181598,
                    "SituationCount": 8841,
                    "SituationsPerPlayerAndRound": 0.04868445687727838
                },
                "8": {
                    "RankBeforeMatch": 8,
                    "PlayerRoundCount": 216918,
                    "SituationCount": 10771,
                    "SituationsPerPlayerAndRound": 0.049654708230760014
                },
                "9": {
                    "RankBeforeMatch": 9,
                    "PlayerRoundCount": 236879,
                    "SituationCount": 11736,
                    "SituationsPerPlayerAndRound": 0.04954428210183258
                },
                "10": {
                    "RankBeforeMatch": 10,
                    "PlayerRoundCount": 313606,
                    "SituationCount": 15432,
                    "SituationsPerPlayerAndRound": 0.04920824218924383
                },
                "11": {
                    "RankBeforeMatch": 11,
                    "PlayerRoundCount": 286830,
                    "SituationCount": 14909,
                    "SituationsPerPlayerAndRound": 0.05197852386430987
                },
                "12": {
                    "RankBeforeMatch": 12,
                    "PlayerRoundCount": 252775,
                    "SituationCount": 13278,
                    "SituationsPerPlayerAndRound": 0.052528928889328454
                },
                "13": {
                    "RankBeforeMatch": 13,
                    "PlayerRoundCount": 228547,
                    "SituationCount": 11856,
                    "SituationsPerPlayerAndRound": 0.05187554419878625
                },
                "14": {
                    "RankBeforeMatch": 14,
                    "PlayerRoundCount": 178894,
                    "SituationCount": 9157,
                    "SituationsPerPlayerAndRound": 0.05118673627958456
                },
                "15": {
                    "RankBeforeMatch": 15,
                    "PlayerRoundCount": 134156,
                    "SituationCount": 7402,
                    "SituationsPerPlayerAndRound": 0.055174572885297715
                },
                "16": {
                    "RankBeforeMatch": 16,
                    "PlayerRoundCount": 117076,
                    "SituationCount": 6422,
                    "SituationsPerPlayerAndRound": 0.054853257712938606
                },
                "17": {
                    "RankBeforeMatch": 17,
                    "PlayerRoundCount": 58677,
                    "SituationCount": 3367,
                    "SituationsPerPlayerAndRound": 0.057381938408575764
                },
                "18": {
                    "RankBeforeMatch": 18,
                    "PlayerRoundCount": 18065,
                    "SituationCount": 1204,
                    "SituationsPerPlayerAndRound": 0.06664821477996125
                }
                },
                "MultiKill": {
                "0": {
                    "RankBeforeMatch": 0,
                    "PlayerRoundCount": 1138651,
                    "SituationCount": 52077,
                    "SituationsPerPlayerAndRound": 0.04573569952513984
                },
                "1": {
                    "RankBeforeMatch": 1,
                    "PlayerRoundCount": 47965,
                    "SituationCount": 1429,
                    "SituationsPerPlayerAndRound": 0.02979255707286563
                },
                "2": {
                    "RankBeforeMatch": 2,
                    "PlayerRoundCount": 131145,
                    "SituationCount": 4559,
                    "SituationsPerPlayerAndRound": 0.034763048534065345
                },
                "3": {
                    "RankBeforeMatch": 3,
                    "PlayerRoundCount": 109543,
                    "SituationCount": 3997,
                    "SituationsPerPlayerAndRound": 0.036487954501885106
                },
                "4": {
                    "RankBeforeMatch": 4,
                    "PlayerRoundCount": 136758,
                    "SituationCount": 5081,
                    "SituationsPerPlayerAndRound": 0.03715321955571155
                },
                "5": {
                    "RankBeforeMatch": 5,
                    "PlayerRoundCount": 158015,
                    "SituationCount": 5872,
                    "SituationsPerPlayerAndRound": 0.03716102901623264
                },
                "6": {
                    "RankBeforeMatch": 6,
                    "PlayerRoundCount": 169846,
                    "SituationCount": 6453,
                    "SituationsPerPlayerAndRound": 0.03799324093590664
                },
                "7": {
                    "RankBeforeMatch": 7,
                    "PlayerRoundCount": 181598,
                    "SituationCount": 6948,
                    "SituationsPerPlayerAndRound": 0.0382603332635822
                },
                "8": {
                    "RankBeforeMatch": 8,
                    "PlayerRoundCount": 216918,
                    "SituationCount": 8686,
                    "SituationsPerPlayerAndRound": 0.04004278114310477
                },
                "9": {
                    "RankBeforeMatch": 9,
                    "PlayerRoundCount": 236879,
                    "SituationCount": 9445,
                    "SituationsPerPlayerAndRound": 0.03987267761177648
                },
                "10": {
                    "RankBeforeMatch": 10,
                    "PlayerRoundCount": 313606,
                    "SituationCount": 12669,
                    "SituationsPerPlayerAndRound": 0.040397824021224084
                },
                "11": {
                    "RankBeforeMatch": 11,
                    "PlayerRoundCount": 286830,
                    "SituationCount": 12290,
                    "SituationsPerPlayerAndRound": 0.04284767981034062
                },
                "12": {
                    "RankBeforeMatch": 12,
                    "PlayerRoundCount": 252775,
                    "SituationCount": 10905,
                    "SituationsPerPlayerAndRound": 0.04314113341904856
                },
                "13": {
                    "RankBeforeMatch": 13,
                    "PlayerRoundCount": 228547,
                    "SituationCount": 9977,
                    "SituationsPerPlayerAndRound": 0.043654040525581174
                },
                "14": {
                    "RankBeforeMatch": 14,
                    "PlayerRoundCount": 178894,
                    "SituationCount": 8030,
                    "SituationsPerPlayerAndRound": 0.04488691627444185
                },
                "15": {
                    "RankBeforeMatch": 15,
                    "PlayerRoundCount": 134156,
                    "SituationCount": 6334,
                    "SituationsPerPlayerAndRound": 0.04721369152330123
                },
                "16": {
                    "RankBeforeMatch": 16,
                    "PlayerRoundCount": 117076,
                    "SituationCount": 5706,
                    "SituationsPerPlayerAndRound": 0.0487375721753391
                },
                "17": {
                    "RankBeforeMatch": 17,
                    "PlayerRoundCount": 58677,
                    "SituationCount": 2944,
                    "SituationsPerPlayerAndRound": 0.05017298089541047
                },
                "18": {
                    "RankBeforeMatch": 18,
                    "PlayerRoundCount": 18065,
                    "SituationCount": 1052,
                    "SituationsPerPlayerAndRound": 0.05823415444229173
                }
                }
            }
        }
    }
}