import Enums from './enums';
import SituationBase from '@/components/BetterSituations/SituationBase';

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
            "Learn to predict the enemies' positions at the start of the round for effective HE grenades, and utilize map geometry to make your HEs less foreseeable."
        );

        add_data(
            Enums.SituationType.KillWithOwnFlashAssist,
            SituationBase,
            "Kill With Own Flash Assist",
            "This happens whenever a teammate lands the killing blow on an enemy that was flashed by you.",
            "Teamplay matters. Call out flashes on the voice channel and try to time them with peeking teammates."
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
            "This happens when you miss a smoke line-up that our system has recognized as such.",
            "Practicing smoke line-ups is essential for effective offense and defense. A good smoke can easily deny an entire push and decide between win and loss."
        );

        add_data(
            Enums.SituationType.DeathInducedBombDrop,
            SituationBase,
            "Death Induced Bomb Drop",
            "A \"death induced bomb drop\" is a misplay by a terrorist who carried the bomb and died, thereby dropping it in a way that caused a tactical disadvantage.",
            "Drop the bomb in a safe spot before you're going to push or even peek an angle. Generally, terrorists want to hide information about the bomb's location for as long as possible and make it easily accessible for teammates."
        );

        add_data(
            Enums.SituationType.SelfFlash,
            SituationBase,
            "Self Flash",
            "A self flash occurs when you throw a flashbang and end up blinding yourself to a certain degree.",
            "Don't expose yourself to your own flashbangs and try to face away from them when they detonate.\n\nFlashing behind you before peeking an angle is a great technique that, when practiced efficiently, can be an absolute game changer.",
            []
            // [{
            //     key: "TimeFlashedSelf",
            //     keyDisplay: "Time Flashed Self",
            //     after: 'ms'       
            // }]
        );

        add_data(
            Enums.SituationType.TeamFlash,
            SituationBase,
            "Team Flash",
            "A team flash occurs when you throw a flashbang and end up blinding one or more teammates to a certain degree.",
            "Always keep track of your teammates' positions and well... don't throw flashes into their face.\n\nIt's also a good habit to announce your flashbangs on the voice channel."
        );

        add_data(
            Enums.SituationType.RifleFiredWhileMoving,
            SituationBase,
            "Rifle Fired While Moving",
            "This happens when you fire a rifle while moving with more than a third of the maximum velocity, which makes guns of the rifle category very inaccurate.",
            "Just stand still when you pull the trigger, really. Practice side-stepping after shooting some bullets to let your weapon cool down for a moment while also making it harder for enemies to aim at you. Then come to a stop and continue shooting."
        );

        add_data(
            Enums.SituationType.UnnecessaryReload,
            SituationBase,
            "Unnecessary Reload",
            "A reload is considered unnecessary and risky when you still had enough bullets left and took damage during or shortly after the reload process.",
            "Try to reload only when you're completely safe. It's better to try to kill an enemy with 5 bullets left than to die with a full magazine. If you have no bullets left and can't evade the enemy, switching weapons is a valid option."
        );

        add_data(
            Enums.SituationType.PushBeforeSmokeDetonated,
            SituationBase,
            "Push Before Smoke Detonated",
            "This covers all situations in which you took damage from someone who's vision would have been obstructed by a smoke grenade that popped shortly after.",
            "Coordinate smoke grenade usage with your teammates before a push and give the smokes enough time to pop. Dying because you couldn't wait one more second sucks, right?"
        );

        return data[situationType];
    }
}