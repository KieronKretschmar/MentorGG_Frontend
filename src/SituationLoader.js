import Enums from './enums';
import SituationBase from '@/components/BetterSituations/SituationBase';

export default class SituationLoader {
    static getSituationData(situationType) {
        let data = {};
        let add_data = (type, component, description, howToAvoid) => {
            data[type] = {
                type: type,
                name: Enums.SituationType.ToString(type),
                component: component,
                description: description,
                howToAvoid: howToAvoid,
                isHighlight: Enums.SituationType.IsHighlight(type),
                isMisplay: Enums.SituationType.IsMisplay(type)
            };
        }

        add_data(
            Enums.SituationType.Unknown,
            SituationBase,
            "No data available",
            "No data available"
        );

        add_data(
            Enums.SituationType.SelfFlash, 
            SituationBase, 
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        );        

        return data[situationType];
    }
}