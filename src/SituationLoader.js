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
}