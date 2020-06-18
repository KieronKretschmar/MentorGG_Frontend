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
                        "PlayerRoundCount": 14701,
                        "SituationCount": 822,
                        "SituationsPerPlayerAndRound": 0.05591456363512686
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 3799,
                        "SituationCount": 223,
                        "SituationsPerPlayerAndRound": 0.058699657804685446
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 9390,
                        "SituationCount": 517,
                        "SituationsPerPlayerAndRound": 0.05505857294994675
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 9674,
                        "SituationCount": 552,
                        "SituationsPerPlayerAndRound": 0.057060161256977465
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 12918,
                        "SituationCount": 719,
                        "SituationsPerPlayerAndRound": 0.05565877070753987
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 15235,
                        "SituationCount": 902,
                        "SituationsPerPlayerAndRound": 0.0592057761732852
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 14982,
                        "SituationCount": 867,
                        "SituationsPerPlayerAndRound": 0.0578694433319984
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 19156,
                        "SituationCount": 1081,
                        "SituationsPerPlayerAndRound": 0.05643140530382126
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 23658,
                        "SituationCount": 1259,
                        "SituationsPerPlayerAndRound": 0.05321667089356666
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 23806,
                        "SituationCount": 1241,
                        "SituationsPerPlayerAndRound": 0.05212971519784928
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 33081,
                        "SituationCount": 1781,
                        "SituationsPerPlayerAndRound": 0.05383755025543363
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 30077,
                        "SituationCount": 1544,
                        "SituationsPerPlayerAndRound": 0.05133490707184892
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 26148,
                        "SituationCount": 1281,
                        "SituationsPerPlayerAndRound": 0.04899036255162919
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 24730,
                        "SituationCount": 1267,
                        "SituationsPerPlayerAndRound": 0.05123331985442782
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 19730,
                        "SituationCount": 985,
                        "SituationsPerPlayerAndRound": 0.04992397364419666
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 14435,
                        "SituationCount": 709,
                        "SituationsPerPlayerAndRound": 0.04911673016972636
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 14251,
                        "SituationCount": 729,
                        "SituationsPerPlayerAndRound": 0.051154304961055365
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 6082,
                        "SituationCount": 287,
                        "SituationsPerPlayerAndRound": 0.04718842486024334
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 2039,
                        "SituationCount": 121,
                        "SituationsPerPlayerAndRound": 0.05934281510544385
                    }
                },
                "DeathInducedBombDrop": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 60487,
                        "SituationCount": 3422,
                        "SituationsPerPlayerAndRound": 0.056574139897829286
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 18536,
                        "SituationCount": 1055,
                        "SituationsPerPlayerAndRound": 0.05691627104013811
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 49569,
                        "SituationCount": 2725,
                        "SituationsPerPlayerAndRound": 0.054973874800782745
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 38898,
                        "SituationCount": 2133,
                        "SituationsPerPlayerAndRound": 0.054835724201758446
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 45870,
                        "SituationCount": 2499,
                        "SituationsPerPlayerAndRound": 0.05448005232177894
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 53946,
                        "SituationCount": 2912,
                        "SituationsPerPlayerAndRound": 0.053979905831757685
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 58942,
                        "SituationCount": 3154,
                        "SituationsPerPlayerAndRound": 0.05351023039598249
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 61135,
                        "SituationCount": 3197,
                        "SituationsPerPlayerAndRound": 0.052294103214198084
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 69580,
                        "SituationCount": 3552,
                        "SituationsPerPlayerAndRound": 0.05104915205518827
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 75437,
                        "SituationCount": 3959,
                        "SituationsPerPlayerAndRound": 0.05248087808369898
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 93631,
                        "SituationCount": 4737,
                        "SituationsPerPlayerAndRound": 0.0505922183892087
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 81370,
                        "SituationCount": 4055,
                        "SituationsPerPlayerAndRound": 0.049834091188398676
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 68837,
                        "SituationCount": 3345,
                        "SituationsPerPlayerAndRound": 0.04859305315455351
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 58889,
                        "SituationCount": 2914,
                        "SituationsPerPlayerAndRound": 0.049482925503914144
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 46681,
                        "SituationCount": 2293,
                        "SituationsPerPlayerAndRound": 0.049120627235920394
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 33322,
                        "SituationCount": 1605,
                        "SituationsPerPlayerAndRound": 0.04816637656803313
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 28474,
                        "SituationCount": 1342,
                        "SituationsPerPlayerAndRound": 0.047130715740675705
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 13045,
                        "SituationCount": 599,
                        "SituationsPerPlayerAndRound": 0.04591797623610579
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 3384,
                        "SituationCount": 159,
                        "SituationsPerPlayerAndRound": 0.04698581560283688
                    }
                },
                "SelfFlash": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 55445,
                        "SituationCount": 3283,
                        "SituationsPerPlayerAndRound": 0.0592118315447741
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 13268,
                        "SituationCount": 741,
                        "SituationsPerPlayerAndRound": 0.05584865842628881
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 37232,
                        "SituationCount": 2090,
                        "SituationsPerPlayerAndRound": 0.05613450795015041
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 32289,
                        "SituationCount": 1847,
                        "SituationsPerPlayerAndRound": 0.05720214314472421
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 41054,
                        "SituationCount": 2356,
                        "SituationsPerPlayerAndRound": 0.057387830662054856
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 50355,
                        "SituationCount": 2929,
                        "SituationsPerPlayerAndRound": 0.05816701419918578
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 53211,
                        "SituationCount": 2924,
                        "SituationsPerPlayerAndRound": 0.05495104395707654
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 57995,
                        "SituationCount": 3216,
                        "SituationsPerPlayerAndRound": 0.05545305629795672
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 69363,
                        "SituationCount": 3870,
                        "SituationsPerPlayerAndRound": 0.055793434540028546
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 82090,
                        "SituationCount": 4575,
                        "SituationsPerPlayerAndRound": 0.05573151419174077
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 106880,
                        "SituationCount": 5846,
                        "SituationsPerPlayerAndRound": 0.05469685628742515
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 98875,
                        "SituationCount": 5331,
                        "SituationsPerPlayerAndRound": 0.0539165613147914
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 89276,
                        "SituationCount": 4839,
                        "SituationsPerPlayerAndRound": 0.05420269725346118
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 79375,
                        "SituationCount": 4301,
                        "SituationsPerPlayerAndRound": 0.054185826771653546
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 61327,
                        "SituationCount": 3316,
                        "SituationsPerPlayerAndRound": 0.05407080078921193
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 46375,
                        "SituationCount": 2482,
                        "SituationsPerPlayerAndRound": 0.05352021563342318
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 42606,
                        "SituationCount": 2228,
                        "SituationsPerPlayerAndRound": 0.052293104257616296
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 23444,
                        "SituationCount": 1298,
                        "SituationsPerPlayerAndRound": 0.05536597850196212
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 7564,
                        "SituationCount": 437,
                        "SituationsPerPlayerAndRound": 0.057773664727657326
                    }
                },
                "TeamFlash": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 93656,
                        "SituationCount": 8065,
                        "SituationsPerPlayerAndRound": 0.08611300931066883
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 22729,
                        "SituationCount": 1829,
                        "SituationsPerPlayerAndRound": 0.08046988428879405
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 63502,
                        "SituationCount": 5347,
                        "SituationsPerPlayerAndRound": 0.0842020723756732
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 56339,
                        "SituationCount": 4631,
                        "SituationsPerPlayerAndRound": 0.08219883207014679
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 71517,
                        "SituationCount": 6009,
                        "SituationsPerPlayerAndRound": 0.08402198078778472
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 84105,
                        "SituationCount": 7147,
                        "SituationsPerPlayerAndRound": 0.08497711194340409
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 92776,
                        "SituationCount": 7535,
                        "SituationsPerPlayerAndRound": 0.08121712511856514
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 101165,
                        "SituationCount": 8419,
                        "SituationsPerPlayerAndRound": 0.0832204813917857
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 123584,
                        "SituationCount": 10341,
                        "SituationsPerPlayerAndRound": 0.0836758803728638
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 141030,
                        "SituationCount": 12084,
                        "SituationsPerPlayerAndRound": 0.0856838970431823
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 186687,
                        "SituationCount": 15266,
                        "SituationsPerPlayerAndRound": 0.08177323541542796
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 171396,
                        "SituationCount": 13856,
                        "SituationsPerPlayerAndRound": 0.0808420266517305
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 153154,
                        "SituationCount": 12096,
                        "SituationsPerPlayerAndRound": 0.07897932799665695
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 137619,
                        "SituationCount": 10780,
                        "SituationsPerPlayerAndRound": 0.07833220703536575
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 107636,
                        "SituationCount": 8350,
                        "SituationsPerPlayerAndRound": 0.07757627559552566
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 82962,
                        "SituationCount": 6503,
                        "SituationsPerPlayerAndRound": 0.0783852848291989
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 72097,
                        "SituationCount": 5641,
                        "SituationsPerPlayerAndRound": 0.07824181311288958
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 39658,
                        "SituationCount": 3096,
                        "SituationsPerPlayerAndRound": 0.07806747692773211
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 12980,
                        "SituationCount": 1124,
                        "SituationsPerPlayerAndRound": 0.08659476117103236
                    }
                },
                "RifleFiredWhileMoving": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 86725,
                        "SituationCount": 6769,
                        "SituationsPerPlayerAndRound": 0.07805131161718075
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 25915,
                        "SituationCount": 2061,
                        "SituationsPerPlayerAndRound": 0.07952923017557399
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 71521,
                        "SituationCount": 5768,
                        "SituationsPerPlayerAndRound": 0.080647641951315
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 59310,
                        "SituationCount": 4591,
                        "SituationsPerPlayerAndRound": 0.07740684538863599
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 73955,
                        "SituationCount": 5826,
                        "SituationsPerPlayerAndRound": 0.0787776350483402
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 83692,
                        "SituationCount": 6502,
                        "SituationsPerPlayerAndRound": 0.07768962385891125
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 91739,
                        "SituationCount": 6989,
                        "SituationsPerPlayerAndRound": 0.07618352064007675
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 98741,
                        "SituationCount": 7383,
                        "SituationsPerPlayerAndRound": 0.07477137156804164
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 113360,
                        "SituationCount": 8291,
                        "SituationsPerPlayerAndRound": 0.07313867325335215
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 120824,
                        "SituationCount": 8277,
                        "SituationsPerPlayerAndRound": 0.06850460173475469
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 156230,
                        "SituationCount": 10506,
                        "SituationsPerPlayerAndRound": 0.06724700761697497
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 139540,
                        "SituationCount": 9048,
                        "SituationsPerPlayerAndRound": 0.06484162247384262
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 120720,
                        "SituationCount": 7923,
                        "SituationsPerPlayerAndRound": 0.06563121272365806
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 101178,
                        "SituationCount": 6398,
                        "SituationsPerPlayerAndRound": 0.0632350906323509
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 76423,
                        "SituationCount": 4657,
                        "SituationsPerPlayerAndRound": 0.060937152427934
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 54874,
                        "SituationCount": 3243,
                        "SituationsPerPlayerAndRound": 0.05909902686153734
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 46439,
                        "SituationCount": 2559,
                        "SituationsPerPlayerAndRound": 0.05510454574818579
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 20753,
                        "SituationCount": 1122,
                        "SituationsPerPlayerAndRound": 0.054064472606370165
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 5662,
                        "SituationCount": 303,
                        "SituationsPerPlayerAndRound": 0.0535146591310491
                    }
                },
                "UnnecessaryReload": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 30345,
                        "SituationCount": 1466,
                        "SituationsPerPlayerAndRound": 0.04831108914153897
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 9630,
                        "SituationCount": 434,
                        "SituationsPerPlayerAndRound": 0.045067497403946
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 24620,
                        "SituationCount": 1132,
                        "SituationsPerPlayerAndRound": 0.045978878960194966
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 22486,
                        "SituationCount": 1087,
                        "SituationsPerPlayerAndRound": 0.04834119007382371
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 24299,
                        "SituationCount": 1116,
                        "SituationsPerPlayerAndRound": 0.04592781595950451
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 29124,
                        "SituationCount": 1386,
                        "SituationsPerPlayerAndRound": 0.04758961681087762
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 30633,
                        "SituationCount": 1395,
                        "SituationsPerPlayerAndRound": 0.0455391244736069
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 31196,
                        "SituationCount": 1412,
                        "SituationsPerPlayerAndRound": 0.04526221310424414
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 36688,
                        "SituationCount": 1661,
                        "SituationsPerPlayerAndRound": 0.04527365896205844
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 38889,
                        "SituationCount": 1698,
                        "SituationsPerPlayerAndRound": 0.04366273239219316
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 49736,
                        "SituationCount": 2205,
                        "SituationsPerPlayerAndRound": 0.044334083963326366
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 43059,
                        "SituationCount": 1854,
                        "SituationsPerPlayerAndRound": 0.0430572005852435
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 33395,
                        "SituationCount": 1448,
                        "SituationsPerPlayerAndRound": 0.04335978439886211
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 28718,
                        "SituationCount": 1194,
                        "SituationsPerPlayerAndRound": 0.04157671147015809
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 22356,
                        "SituationCount": 936,
                        "SituationsPerPlayerAndRound": 0.04186795491143317
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 17040,
                        "SituationCount": 716,
                        "SituationsPerPlayerAndRound": 0.042018779342723
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 11931,
                        "SituationCount": 479,
                        "SituationsPerPlayerAndRound": 0.040147514877210626
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 5147,
                        "SituationCount": 206,
                        "SituationsPerPlayerAndRound": 0.04002331455216631
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 1311,
                        "SituationCount": 54,
                        "SituationsPerPlayerAndRound": 0.041189931350114416
                    }
                },
                "PushBeforeSmokeDetonated": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 4065,
                        "SituationCount": 163,
                        "SituationsPerPlayerAndRound": 0.04009840098400984
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 751,
                        "SituationCount": 29,
                        "SituationsPerPlayerAndRound": 0.03861517976031957
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 2353,
                        "SituationCount": 94,
                        "SituationsPerPlayerAndRound": 0.03994900127496812
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 2169,
                        "SituationCount": 89,
                        "SituationsPerPlayerAndRound": 0.04103273397879207
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 3035,
                        "SituationCount": 124,
                        "SituationsPerPlayerAndRound": 0.04085667215815486
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 3917,
                        "SituationCount": 158,
                        "SituationsPerPlayerAndRound": 0.04033699259637478
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 4017,
                        "SituationCount": 161,
                        "SituationsPerPlayerAndRound": 0.04007966143888474
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 5106,
                        "SituationCount": 203,
                        "SituationsPerPlayerAndRound": 0.03975714845280063
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 6416,
                        "SituationCount": 250,
                        "SituationsPerPlayerAndRound": 0.03896508728179551
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 8144,
                        "SituationCount": 316,
                        "SituationsPerPlayerAndRound": 0.03880157170923379
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 10668,
                        "SituationCount": 419,
                        "SituationsPerPlayerAndRound": 0.03927634045744282
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 10546,
                        "SituationCount": 407,
                        "SituationsPerPlayerAndRound": 0.03859283140527214
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 8587,
                        "SituationCount": 330,
                        "SituationsPerPlayerAndRound": 0.03843018516361942
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 7437,
                        "SituationCount": 295,
                        "SituationsPerPlayerAndRound": 0.03966653220384564
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 6434,
                        "SituationCount": 255,
                        "SituationsPerPlayerAndRound": 0.03963319863226609
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 4845,
                        "SituationCount": 188,
                        "SituationsPerPlayerAndRound": 0.03880288957688338
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 4754,
                        "SituationCount": 187,
                        "SituationsPerPlayerAndRound": 0.03933529659234329
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 2616,
                        "SituationCount": 104,
                        "SituationsPerPlayerAndRound": 0.039755351681957186
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 887,
                        "SituationCount": 35,
                        "SituationsPerPlayerAndRound": 0.03945885005636979
                    }
                },
                "BombDropAtSpawn": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 6425,
                        "SituationCount": 291,
                        "SituationsPerPlayerAndRound": 0.045291828793774316
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 1278,
                        "SituationCount": 54,
                        "SituationsPerPlayerAndRound": 0.04225352112676056
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 4103,
                        "SituationCount": 176,
                        "SituationsPerPlayerAndRound": 0.04289544235924933
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 3511,
                        "SituationCount": 152,
                        "SituationsPerPlayerAndRound": 0.04329250925662204
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 4849,
                        "SituationCount": 216,
                        "SituationsPerPlayerAndRound": 0.0445452670653743
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 5853,
                        "SituationCount": 263,
                        "SituationsPerPlayerAndRound": 0.04493422176661541
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 6650,
                        "SituationCount": 297,
                        "SituationsPerPlayerAndRound": 0.04466165413533835
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 8703,
                        "SituationCount": 371,
                        "SituationsPerPlayerAndRound": 0.04262897851315638
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 10842,
                        "SituationCount": 478,
                        "SituationsPerPlayerAndRound": 0.04408780667773474
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 15340,
                        "SituationCount": 697,
                        "SituationsPerPlayerAndRound": 0.0454367666232073
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 22392,
                        "SituationCount": 1003,
                        "SituationsPerPlayerAndRound": 0.04479278313683458
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 24790,
                        "SituationCount": 1118,
                        "SituationsPerPlayerAndRound": 0.04509883017345704
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 24812,
                        "SituationCount": 1153,
                        "SituationsPerPlayerAndRound": 0.04646945026600032
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 22894,
                        "SituationCount": 1037,
                        "SituationsPerPlayerAndRound": 0.045295710666550186
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 19145,
                        "SituationCount": 855,
                        "SituationsPerPlayerAndRound": 0.044659179942543745
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 13995,
                        "SituationCount": 668,
                        "SituationsPerPlayerAndRound": 0.04773133261879243
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 14933,
                        "SituationCount": 699,
                        "SituationsPerPlayerAndRound": 0.046809080559833925
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 6840,
                        "SituationCount": 313,
                        "SituationsPerPlayerAndRound": 0.045760233918128654
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 1854,
                        "SituationCount": 84,
                        "SituationsPerPlayerAndRound": 0.045307443365695796
                    }
                },
                "HasNotBoughtDefuseKit": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 97722,
                        "SituationCount": 11871,
                        "SituationsPerPlayerAndRound": 0.12147725179591085
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 24819,
                        "SituationCount": 2699,
                        "SituationsPerPlayerAndRound": 0.10874733067408034
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 70536,
                        "SituationCount": 7934,
                        "SituationsPerPlayerAndRound": 0.11248156969490757
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 59899,
                        "SituationCount": 6492,
                        "SituationsPerPlayerAndRound": 0.10838244378036362
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 73246,
                        "SituationCount": 8178,
                        "SituationsPerPlayerAndRound": 0.11165114818556644
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 86173,
                        "SituationCount": 9566,
                        "SituationsPerPlayerAndRound": 0.11100924883664257
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 90523,
                        "SituationCount": 9468,
                        "SituationsPerPlayerAndRound": 0.1045922030865084
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 95252,
                        "SituationCount": 9711,
                        "SituationsPerPlayerAndRound": 0.10195061521017931
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 112248,
                        "SituationCount": 10871,
                        "SituationsPerPlayerAndRound": 0.09684805074477942
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 120939,
                        "SituationCount": 10875,
                        "SituationsPerPlayerAndRound": 0.08992136531639917
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 156166,
                        "SituationCount": 13648,
                        "SituationsPerPlayerAndRound": 0.08739418311284146
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 137777,
                        "SituationCount": 11570,
                        "SituationsPerPlayerAndRound": 0.08397628051126095
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 110853,
                        "SituationCount": 8634,
                        "SituationsPerPlayerAndRound": 0.07788693134150632
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 98016,
                        "SituationCount": 7465,
                        "SituationsPerPlayerAndRound": 0.07616103493307215
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 74628,
                        "SituationCount": 5591,
                        "SituationsPerPlayerAndRound": 0.07491826124242912
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 52076,
                        "SituationCount": 3847,
                        "SituationsPerPlayerAndRound": 0.07387280129042169
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 45495,
                        "SituationCount": 3163,
                        "SituationsPerPlayerAndRound": 0.06952412353005825
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 20248,
                        "SituationCount": 1389,
                        "SituationsPerPlayerAndRound": 0.0685993678387989
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 8090,
                        "SituationCount": 675,
                        "SituationsPerPlayerAndRound": 0.0834363411619283
                    }
                },
                "EffectiveHeGrenade": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 45414,
                        "SituationCount": 2642,
                        "SituationsPerPlayerAndRound": 0.058175892896463646
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 9914,
                        "SituationCount": 578,
                        "SituationsPerPlayerAndRound": 0.05830139197095017
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 30174,
                        "SituationCount": 1680,
                        "SituationsPerPlayerAndRound": 0.05567707297673494
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 25159,
                        "SituationCount": 1404,
                        "SituationsPerPlayerAndRound": 0.05580507969315156
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 33190,
                        "SituationCount": 1901,
                        "SituationsPerPlayerAndRound": 0.05727628803856583
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 40541,
                        "SituationCount": 2283,
                        "SituationsPerPlayerAndRound": 0.05631336178189981
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 46417,
                        "SituationCount": 2578,
                        "SituationsPerPlayerAndRound": 0.055539996122110434
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 55644,
                        "SituationCount": 3115,
                        "SituationsPerPlayerAndRound": 0.055980878441521095
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 70210,
                        "SituationCount": 3978,
                        "SituationsPerPlayerAndRound": 0.05665859564164649
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 85943,
                        "SituationCount": 4871,
                        "SituationsPerPlayerAndRound": 0.05667709993833122
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 127581,
                        "SituationCount": 7524,
                        "SituationsPerPlayerAndRound": 0.058974298680838054
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 125283,
                        "SituationCount": 7378,
                        "SituationsPerPlayerAndRound": 0.058890671519679444
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 115438,
                        "SituationCount": 6906,
                        "SituationsPerPlayerAndRound": 0.059824321280687466
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 111252,
                        "SituationCount": 6829,
                        "SituationsPerPlayerAndRound": 0.061383166145327725
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 88482,
                        "SituationCount": 5491,
                        "SituationsPerPlayerAndRound": 0.06205781966953731
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 66800,
                        "SituationCount": 4164,
                        "SituationsPerPlayerAndRound": 0.062335329341317365
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 59669,
                        "SituationCount": 3746,
                        "SituationsPerPlayerAndRound": 0.06277966783421877
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 31413,
                        "SituationCount": 2017,
                        "SituationsPerPlayerAndRound": 0.06420908541049884
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 10163,
                        "SituationCount": 681,
                        "SituationsPerPlayerAndRound": 0.06700777329528683
                    }
                },
                "KillWithOwnFlashAssist": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 19665,
                        "SituationCount": 932,
                        "SituationsPerPlayerAndRound": 0.04739384693618103
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 3438,
                        "SituationCount": 162,
                        "SituationsPerPlayerAndRound": 0.04712041884816754
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 12265,
                        "SituationCount": 557,
                        "SituationsPerPlayerAndRound": 0.04541377904606604
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 10982,
                        "SituationCount": 504,
                        "SituationsPerPlayerAndRound": 0.045893279912584226
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 14589,
                        "SituationCount": 682,
                        "SituationsPerPlayerAndRound": 0.04674754952361368
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 16971,
                        "SituationCount": 753,
                        "SituationsPerPlayerAndRound": 0.04436980731836662
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 18526,
                        "SituationCount": 845,
                        "SituationsPerPlayerAndRound": 0.045611572924538483
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 22324,
                        "SituationCount": 1018,
                        "SituationsPerPlayerAndRound": 0.045601146747894644
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 27220,
                        "SituationCount": 1234,
                        "SituationsPerPlayerAndRound": 0.045334313005143276
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 30637,
                        "SituationCount": 1416,
                        "SituationsPerPlayerAndRound": 0.046218624538956164
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 43193,
                        "SituationCount": 1954,
                        "SituationsPerPlayerAndRound": 0.04523881184451184
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 38537,
                        "SituationCount": 1750,
                        "SituationsPerPlayerAndRound": 0.04541090380673119
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 36087,
                        "SituationCount": 1667,
                        "SituationsPerPlayerAndRound": 0.046193920248288854
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 37334,
                        "SituationCount": 1713,
                        "SituationsPerPlayerAndRound": 0.045883109230192315
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 31170,
                        "SituationCount": 1480,
                        "SituationsPerPlayerAndRound": 0.04748155277510427
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 23688,
                        "SituationCount": 1131,
                        "SituationsPerPlayerAndRound": 0.047745694022289766
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 20923,
                        "SituationCount": 984,
                        "SituationsPerPlayerAndRound": 0.04702958466759069
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 12431,
                        "SituationCount": 578,
                        "SituationsPerPlayerAndRound": 0.04649666157187676
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 3824,
                        "SituationCount": 181,
                        "SituationsPerPlayerAndRound": 0.0473326359832636
                    }
                },
                "Clutch": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 27611,
                        "SituationCount": 1253,
                        "SituationsPerPlayerAndRound": 0.04538046430770345
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 7044,
                        "SituationCount": 314,
                        "SituationsPerPlayerAndRound": 0.04457694491766042
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 22392,
                        "SituationCount": 995,
                        "SituationsPerPlayerAndRound": 0.04443551268310111
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 18768,
                        "SituationCount": 867,
                        "SituationsPerPlayerAndRound": 0.04619565217391304
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 23062,
                        "SituationCount": 1025,
                        "SituationsPerPlayerAndRound": 0.04444540803052641
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 28326,
                        "SituationCount": 1253,
                        "SituationsPerPlayerAndRound": 0.04423497846501447
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 28440,
                        "SituationCount": 1249,
                        "SituationsPerPlayerAndRound": 0.04391701828410689
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 29593,
                        "SituationCount": 1316,
                        "SituationsPerPlayerAndRound": 0.04446997600783969
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 39294,
                        "SituationCount": 1750,
                        "SituationsPerPlayerAndRound": 0.04453606148521403
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 42491,
                        "SituationCount": 1826,
                        "SituationsPerPlayerAndRound": 0.0429738062177873
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 54055,
                        "SituationCount": 2331,
                        "SituationsPerPlayerAndRound": 0.04312274535195634
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 51640,
                        "SituationCount": 2234,
                        "SituationsPerPlayerAndRound": 0.043261037955073585
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 44751,
                        "SituationCount": 1953,
                        "SituationsPerPlayerAndRound": 0.04364148287189113
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 37547,
                        "SituationCount": 1602,
                        "SituationsPerPlayerAndRound": 0.04266652462247317
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 29753,
                        "SituationCount": 1275,
                        "SituationsPerPlayerAndRound": 0.04285282156421201
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 23803,
                        "SituationCount": 1040,
                        "SituationsPerPlayerAndRound": 0.04369197160021846
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 20723,
                        "SituationCount": 884,
                        "SituationsPerPlayerAndRound": 0.04265791632485644
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 10555,
                        "SituationCount": 442,
                        "SituationsPerPlayerAndRound": 0.04187588820464235
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 3230,
                        "SituationCount": 149,
                        "SituationsPerPlayerAndRound": 0.04613003095975232
                    }
                },
                "HighImpactRound": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 101890,
                        "SituationCount": 8824,
                        "SituationsPerPlayerAndRound": 0.08660319952890372
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 26029,
                        "SituationCount": 1833,
                        "SituationsPerPlayerAndRound": 0.07042145299473664
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 79015,
                        "SituationCount": 5930,
                        "SituationsPerPlayerAndRound": 0.07504904132126812
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 66839,
                        "SituationCount": 5207,
                        "SituationsPerPlayerAndRound": 0.07790361914451144
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 85977,
                        "SituationCount": 6583,
                        "SituationsPerPlayerAndRound": 0.07656698884585413
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 98554,
                        "SituationCount": 7539,
                        "SituationsPerPlayerAndRound": 0.07649613409907259
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 107317,
                        "SituationCount": 8027,
                        "SituationsPerPlayerAndRound": 0.07479709645256577
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 116323,
                        "SituationCount": 8743,
                        "SituationsPerPlayerAndRound": 0.07516140402156066
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 140603,
                        "SituationCount": 10680,
                        "SituationsPerPlayerAndRound": 0.07595854995981594
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 155323,
                        "SituationCount": 11678,
                        "SituationsPerPlayerAndRound": 0.07518525910521945
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 206142,
                        "SituationCount": 15334,
                        "SituationsPerPlayerAndRound": 0.074385617681016
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 195457,
                        "SituationCount": 14807,
                        "SituationsPerPlayerAndRound": 0.07575579283422952
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 173670,
                        "SituationCount": 13201,
                        "SituationsPerPlayerAndRound": 0.07601197673749065
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 158160,
                        "SituationCount": 11816,
                        "SituationsPerPlayerAndRound": 0.07470915528578655
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 122512,
                        "SituationCount": 9118,
                        "SituationsPerPlayerAndRound": 0.07442536241347786
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 95074,
                        "SituationCount": 7343,
                        "SituationsPerPlayerAndRound": 0.07723457517302312
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 82657,
                        "SituationCount": 6407,
                        "SituationsPerPlayerAndRound": 0.07751309628948547
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 43106,
                        "SituationCount": 3365,
                        "SituationsPerPlayerAndRound": 0.07806337864798404
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 13721,
                        "SituationCount": 1204,
                        "SituationsPerPlayerAndRound": 0.08774870636251002
                    }
                },
                "MultiKill": {
                    "0": {
                        "RankBeforeMatch": 0,
                        "PlayerRoundCount": 95115,
                        "SituationCount": 6984,
                        "SituationsPerPlayerAndRound": 0.07342690427377385
                    },
                    "1": {
                        "RankBeforeMatch": 1,
                        "PlayerRoundCount": 22631,
                        "SituationCount": 1429,
                        "SituationsPerPlayerAndRound": 0.06314347576333348
                    },
                    "2": {
                        "RankBeforeMatch": 2,
                        "PlayerRoundCount": 68774,
                        "SituationCount": 4558,
                        "SituationsPerPlayerAndRound": 0.06627504580219269
                    },
                    "3": {
                        "RankBeforeMatch": 3,
                        "PlayerRoundCount": 59515,
                        "SituationCount": 3989,
                        "SituationsPerPlayerAndRound": 0.06702511971771823
                    },
                    "4": {
                        "RankBeforeMatch": 4,
                        "PlayerRoundCount": 76654,
                        "SituationCount": 5056,
                        "SituationsPerPlayerAndRound": 0.065958723615206
                    },
                    "5": {
                        "RankBeforeMatch": 5,
                        "PlayerRoundCount": 88585,
                        "SituationCount": 5826,
                        "SituationsPerPlayerAndRound": 0.06576734210080713
                    },
                    "6": {
                        "RankBeforeMatch": 6,
                        "PlayerRoundCount": 97159,
                        "SituationCount": 6419,
                        "SituationsPerPlayerAndRound": 0.06606696240183617
                    },
                    "7": {
                        "RankBeforeMatch": 7,
                        "PlayerRoundCount": 104135,
                        "SituationCount": 6874,
                        "SituationsPerPlayerAndRound": 0.06601046718202333
                    },
                    "8": {
                        "RankBeforeMatch": 8,
                        "PlayerRoundCount": 128687,
                        "SituationCount": 8633,
                        "SituationsPerPlayerAndRound": 0.06708525336669593
                    },
                    "9": {
                        "RankBeforeMatch": 9,
                        "PlayerRoundCount": 141824,
                        "SituationCount": 9405,
                        "SituationsPerPlayerAndRound": 0.06631458709386281
                    },
                    "10": {
                        "RankBeforeMatch": 10,
                        "PlayerRoundCount": 190027,
                        "SituationCount": 12577,
                        "SituationsPerPlayerAndRound": 0.066185331558147
                    },
                    "11": {
                        "RankBeforeMatch": 11,
                        "PlayerRoundCount": 180889,
                        "SituationCount": 12209,
                        "SituationsPerPlayerAndRound": 0.06749443028597649
                    },
                    "12": {
                        "RankBeforeMatch": 12,
                        "PlayerRoundCount": 159857,
                        "SituationCount": 10844,
                        "SituationsPerPlayerAndRound": 0.06783562809260776
                    },
                    "13": {
                        "RankBeforeMatch": 13,
                        "PlayerRoundCount": 146929,
                        "SituationCount": 9953,
                        "SituationsPerPlayerAndRound": 0.06774020104948648
                    },
                    "14": {
                        "RankBeforeMatch": 14,
                        "PlayerRoundCount": 117549,
                        "SituationCount": 7992,
                        "SituationsPerPlayerAndRound": 0.0679886685552408
                    },
                    "15": {
                        "RankBeforeMatch": 15,
                        "PlayerRoundCount": 89710,
                        "SituationCount": 6291,
                        "SituationsPerPlayerAndRound": 0.07012596143127857
                    },
                    "16": {
                        "RankBeforeMatch": 16,
                        "PlayerRoundCount": 79742,
                        "SituationCount": 5692,
                        "SituationsPerPlayerAndRound": 0.07138020114870457
                    },
                    "17": {
                        "RankBeforeMatch": 17,
                        "PlayerRoundCount": 40714,
                        "SituationCount": 2942,
                        "SituationsPerPlayerAndRound": 0.07226015621162253
                    },
                    "18": {
                        "RankBeforeMatch": 18,
                        "PlayerRoundCount": 13250,
                        "SituationCount": 1052,
                        "SituationsPerPlayerAndRound": 0.07939622641509433
                    }
                }
            }
        }
    }
}