export default class MentorUser {
    constructor() {
        //needs to be populated from api request
        this.subscriptionStatus = 1;
        this.steamId = Math.random() * 10000;

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
}