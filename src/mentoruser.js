import Enums from "./enums";

export default class MentorUser {
    constructor() {
        //needs to be populated from api request
        this.subscriptionStatus = Enums.SubscriptionStatus.Free;
        this.steamId = '76561198033880857'; // Workaround until MentorInterface.GetUser() is implemented

        //internal usage
        this.userOverride = null;
    }

    IsOverridden() {
        return this.userOverride != null;
    }

    ApplyOverride(user /* of type MentorUser */) {
        this.userOverride = user;
    }

    ClearOverride() {
        this.userOverride = null;
    }

    GetSteamId(considerOverride = true) {
        if (!considerOverride) {
            return this.steamId;
        }

        return this.IsOverridden() ? this.userOverride.GetSteamId(false) : this.steamId;
    }

    AuthorizationGate(minimumAccessLevel, fnAuthorized, fnUnauthorized) {
        if (!fnAuthorized) {
            throw new Error("Invalid callback value in authorization gate for argument fnAuthorized");
        }

        if (this.subscriptionStatus >= minimumAccessLevel) {
            fnAuthorized();
        } else {
            if (fnUnauthorized) {
                fnUnauthorized();
            } else {
                globalThis.NotAuthorized.Show(minimumAccessLevel);
            }
        }
    }
}