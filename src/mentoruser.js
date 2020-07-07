import Enums from "./enums";

export default class MentorUser {
    constructor(applicationUserId, steamId, subscriptionStatus, dailyUploadLimit) {
        this.applicationUserId = applicationUserId;
        this.subscriptionStatus = subscriptionStatus;
        this.steamId = steamId; 
        this.dailyUploadLimit = dailyUploadLimit; 

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