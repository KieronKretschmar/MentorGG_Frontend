import axios from 'axios';
import Enums from "@/enums";
import Vue from 'vue';
import MatchSelector from './matchselector';
import MentorUser from './mentoruser';

class MentorGGAPI {
    constructor() {

        this.ready = false; // whether or not this.User and this.MatchSelector are loaded
        this.apiBaseAddress = 'https://api.mentor.gg';

        // tell the webapp to add credentials from IdentityCookie to request headers 
        axios.defaults.withCredentials = true;

        // Settings based on mode
        if (process.env.NODE_ENV == 'development') {
            // Auth with bearer token instead of cookie if token is found
            if (process.env.VUE_APP_BEARER_TOKEN) {
                // auth via Bearer token
                axios.defaults.headers.common['Authorization'] = "Bearer " + process.env.VUE_APP_BEARER_TOKEN

                // if specified, auth as specific user
                if (process.env.VUE_APP_BEARER_IMPERSONATE_USER) {
                    axios.defaults.headers.common['Impersonate-ApplicationUserId'] = process.env.VUE_APP_BEARER_IMPERSONATE_USER
                }

                axios.defaults.withCredentials = false;
            }

            if (process.env.VUE_APP_OVERRIDE_API_URL) {
                this.apiBaseAddress = process.env.VUE_APP_OVERRIDE_API_URL;
            }

            // this.fixedSteamId = '76561198033880857'; //kieron
            // this.fixedSteamId = '76561198166019050'; //felix
            // this.fixedSteamId = '76561198044966222'; //lasse            
        }

        this.uploadEndpoint = "https://upload.mentor.gg/v1/demo";

        this.valveRefreshInterval = null;
        this.faceitRefreshInterval = null;
        this.User = null;
        this.matchSelectors = {};
        this.MatchSelector = null;
    }

    AuthorizationGate(minimumAccessLevel, fnAuthorized, fnUnauthorized) {
        if (!fnAuthorized) {
            throw new Error("Invalid callback value in authorization gate for argument fnAuthorized");
        }

        let callUnauthorized = () => {
            if (fnUnauthorized) {
                fnUnauthorized();
            } else {
                globalThis.NotAuthorized.Show(minimumAccessLevel);
            }
        };

        if (!this.User) {
            callUnauthorized();
            return;
        }

        if (Enums.SubscriptionStatus.GetAccessLevel(this.User.subscriptionStatus) >= Enums.SubscriptionStatus.GetAccessLevel(minimumAccessLevel)) {
            fnAuthorized();
        } else {
            callUnauthorized();
        }
    }

    LoginGate(fnLoggedIn, fnNotLoggedIn) {
        if (!fnLoggedIn) {
            throw new Error("Invalid callback value in login gate for argument fnLoggedIn");
        }

        if (!this.User) {
            if (fnNotLoggedIn) {
                fnNotLoggedIn();
            } else {
                globalThis.NotLoggedIn.Show();
            }

            return false;
        } else {
            fnLoggedIn();
            return true;
        }
    }

    // Ensures that this.User is set. If not (e.g. because the user is not logged in) the promise is rejected.
    ensureLogin() {
        return new Promise((resolve, reject) => {
            // If this.User is already set, resolve right away
            if (this.User) {
                resolve();
                return;
            }

            // Attempt to load the logged-in user's identity from server
            axios.get(`${this.apiBaseAddress}/identity`, {})
                .then(result => {
                    // User is logged in
                    this.User = new MentorUser(result.data.ApplicationUserId, result.data.SteamId, result.data.SubscriptionType, result.data.DailyMatchesLimit);
                    Vue.$ga.set('userId', this.User.applicationUserId);
                    resolve();
                    return;
                })
                .catch(error => {
                    // User is not logged in
                    this.User = null;
                    this.ready = false;
                    reject();
                    return;
                });
        });
    }

    // get MatchSelector() {
    //     return this.matchSelectors[this.User.GetSteamId()];
    // }

    getSubscriptions() {
        return axios.get(`${this.apiBaseAddress}/subscriptions`, {});
    }

    // Initializes this.MatchSelector. Make sure this.User is set when calling this.
    initMatchSelector(steamId) {

        if (this.matchSelectors[steamId]) {
            return new Promise((resolve, reject) => {
                this.MatchSelector = this.matchSelectors[steamId];
                resolve();
            });
        }

        return new Promise((resolve, reject) => {
            this.getMatchSelection(steamId)
                .then(result => {
                    console.log(result)
                    let matchList = result.data.Matches;
                    console.log("Matches:" + matchList.length)
                    this.matchSelectors[steamId] = new MatchSelector(this, result.data.Matches, result.data.DailyLimitReached, result.data.DailyLimitEnds);
                    this.MatchSelector = this.matchSelectors[steamId];

                    // this.User and this.MatchSelector are loaded, therefore api is ready to make ajax calls.
                    this.ready = true;
                    resolve();
                })
                .catch(e => {
                    this.ready = false;
                    reject("Could not get MatchSelection");
                });
        });

    }

    getSignOutUrl(returnUrl = "/") {
        return `${this.apiBaseAddress}/authentication/signout?returnUrl=${returnUrl}`
    }

    getSignInUrl(returnUrl = "/", referrer = null) {
        return `${this.apiBaseAddress}/authentication/signin/steam?returnUrl=${returnUrl}` + (referrer == null ? '' : ('&referrer=' + referrer))
    }

    getPlayerInfo(params, forceRefresh = false) {
        let formattedParams = {
            forceRefresh: forceRefresh
        }
        return axios.get(`${this.apiBaseAddress}/v1/single/${params.steamId}/playerinfo`, {
            params: formattedParams
        });
    }

    getMatches(params, overrides = {}) {
        let formattedParams = {
            matchIds: this.MatchSelector.Build().GetMatchIds().toString(),
            count: params.count,
            offset: params.offset
        }

        let ignoredMatchIds = this.MatchSelector.Build().GetIgnoredMatchIds().toString();
        if (ignoredMatchIds) {
            formattedParams.ignoredMatchIds = ignoredMatchIds;
        }

        return axios.get(`${this.apiBaseAddress}/v1/single/${params.steamId}/matches`, {
            params: formattedParams
        });
    }

    getFailedDemos(params, overrides = {}) {
        let formattedParams = {
            count: params.count,
            offset: params.offset
        }
        return axios.get(`${this.apiBaseAddress}/v1/single/${params.steamId}/demostatus/failed-demos`, {
            params: formattedParams
        });
    }

    getPosition(matchId) {
        return axios.get(`${this.apiBaseAddress}/v1/match/${matchId}/demostatus/queue-position`, {
        });
    }

    getReferrals() {
        return axios.get(`${this.apiBaseAddress}/referrals/coupon`);
    }

    getMatchesInQueue(uploaderId) {
        return axios.get(`${this.apiBaseAddress}/v1/single/${uploaderId}/demostatus/matches-in-queue`, {
        });
    }

    getSingleMatchMisplays(params, overrides = {}) {
        let matchId = this.MatchSelector.Build().GetMostRecentMatchId();
        return axios.get(`${this.apiBaseAddress}/v1/single/${params.steamId}/misplays/match/${matchId}`, {
        });
    }

    getImportantPositions(params, overrides = {}) {
        let formattedParams = {
            matchIds: this.MatchSelector.Build().GetMatchIds().toString(),
            showBest: params.showBest,
            count: params.count,
        }

        return axios.get(`${this.apiBaseAddress}/v1/single/${params.steamId}/importantpositions`, {
            params: formattedParams
        });
    }

    getFriendsComparison(params, overrides = {}) {
        let formattedParams = {
            matchIds: this.MatchSelector.Build().GetMatchIds().toString(),
            count: params.count,
            offset: params.offset
        }

        return axios.get(`${this.apiBaseAddress}/v1/single/${params.steamId}/friendscomparison`, {
            params: formattedParams
        });
    }

    // this endpoint returns data for a summary of all the user's matches, disregarding filter settings and matchselector
    getRecentMatchData(params) {
        let formattedParams = {
        }

        return axios.get(`${this.apiBaseAddress}/v1/single/${params.steamId}/playersummary`, {
            params: formattedParams
        });
    }

    getSituations(params, overrides = {}) {
        return axios.get(`${this.apiBaseAddress}/v1/single/${params.steamId}/situations`, {
            params: {
                matchIds: this.MatchSelector.Build().GetMatchIds().toString()
            }
        });
        // return axios.get('https://dev.api.mentor.gg/v1/single/76561198820202264/situations?matchIds=107166,107167,107168,107169,107170,107171', {
        //     params: {
        //         //matchIds: this.MatchSelector.Build().GetMatchIds().toString()
        //     }
        // });
    }

    // Returns Situations for all players of the specified matches. Used for debugging.
    getSituationSamplesByMatchCount(params, overrides = {}) {
        let formattedParams = {
            matchCount: params.matchCount
        }

        return axios.get(`${this.apiBaseAddress}/v1/situations/situationType/${params.type}/samples-by-matchcount`, {
            params: formattedParams
        });
    }

    // Returns Situations for all players of the specified matches. Used for debugging.
    getSituationSamplesByMatchIds(params, overrides = {}) {
        let formattedParams = {
            // matchIds : params.matchIds
        }

        return axios.get(`${this.apiBaseAddress}/v1/situations/situationType/${params.type}/samples?matchIds=49815,75904,75932,76902,76903,82460,82691,82692,91935,110772`, {
            params: formattedParams
        });
    }

    getSituationsOfType(params, overrides = {}) {
        return axios.get(`${this.apiBaseAddress}/v1/single/${params.steamId}/situations/${params.type}`, {
            params: {
                matchIds: this.MatchSelector.Build().GetMatchIds().toString()
            }
        });
    }

    getSituationsMetaData(params, overrides = {}) {
        return axios.get(`${this.apiBaseAddress}/v1/situations/meta/situationtype-meta-data`, {
            params: {
            }
        });
    }

    getOverview(params, overrides = {}) {
        let formattedParams = {
            matchIds: this.MatchSelector.Build().GetMatchIds().toString(),
        }

        let route = `${this.apiBaseAddress}/v1/single/${params.steamId}`;
        if (params.type == Enums.SampleType.Molotov) {
            route += '/firenadesoverview';
        }
        else if (params.type == Enums.SampleType.Flash) {
            route += '/flashesoverview';
        }
        else if (params.type == Enums.SampleType.HE) {
            route += '/hesoverview';
        }
        else if (params.type == Enums.SampleType.Smoke) {
            route += '/smokesoverview';
        }
        else if (params.type == Enums.SampleType.Kill) {
            route += '/killsoverview';
        }

        return axios.get(route, {
            params: formattedParams
        });
    }

    getSamples(params, overrides = {}) {
        let route = `${this.apiBaseAddress}/v1/single/${params.steamId}/`;
        let formattedParams = {
            map: params.map,
            matchIds: this.MatchSelector.Build().OverrideMultiple(overrides).GetMatchIds().toString(),
        }

        // Determine route according to params.type
        if (params.type == Enums.SampleType.Flash) {
            route += 'flashes';
        }
        if (params.type == Enums.SampleType.HE) {
            route += 'hes';
        }
        if (params.type == Enums.SampleType.Molotov) {
            route += 'firenades';
        }
        if (params.type == Enums.SampleType.Kill) {
            route += 'filterablekills';
        }
        if (params.type == Enums.SampleType.Smoke) {
            route += 'smokes';
        }
        if (params.type == Enums.SampleType.Bomb) {
            route += 'bombs';
        }

        return axios.get(route, {
            params: formattedParams
        });
    }

    getDVRound(matchId, round) {
        return axios.get(`${this.apiBaseAddress}/v1/watch/match/${matchId}/round/${round}`);
    }

    getDVMatch(matchId) {
        return axios.get(`${this.apiBaseAddress}/v1/watch/match/${matchId}`);
    }

    // Gets an object with a property for each connection
    getConnectionsObject() {
        return new Promise((resolve, reject) => {
            let res = {};
            let connections = [
                axios.get(`${this.apiBaseAddress}/v1/automatic-upload/connections/valve`)
                    .then(response => {
                        res[Enums.Source.Valve] = response.data;
                    })
                    .catch(error => {
                    }),
                axios.get(`${this.apiBaseAddress}/v1/automatic-upload/connections/faceit`)
                    .then(response => {
                        res[Enums.Source.Faceit] = response.data;
                    })
                    .catch(error => {
                    })
            ]
            // wait for all requests to finish
            Promise.allSettled(connections)
                .finally(() => {
                    resolve(res);
                });
        });
    }

    uploadDemo(formData, callback) {
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function (progressEvent) {
                let progress = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
                callback(progress);
            }
        };

        return axios.post(this.uploadEndpoint, formData, config);
    }

    getDownloadUrl(matchId) {
        return axios.get(`${this.apiBaseAddress}/v1/match/${matchId}/download-url`);
    }

    updateValveConnection(authCode, shareCode) {
        let formattedParams = {
            steamAuthToken: authCode,
            lastKnownSharingCode: shareCode
        };
        return axios.post(`${this.apiBaseAddress}/v1/automatic-upload/connections/valve`, {}, {
            params: formattedParams
        });
    }

    removeValveConnection() {
        return axios.delete(`${this.apiBaseAddress}/v1/automatic-upload/connections/valve`, {});
    }

    lookForMatchesValve() {
        return axios.post(`${this.apiBaseAddress}/v1/automatic-upload/valve/look`, {});
    }

    removeFaceitConnection() {
        return axios.delete(`${this.apiBaseAddress}/v1/automatic-upload/connections/faceit`, {});
    }

    lookForMatchesFaceit() {
        return axios.post(`${this.apiBaseAddress}/v1/automatic-upload/faceit/look`, {});
    }

    // Automatically look for matches    
    startLookingForValveMatches() {
        if (this.valveRefreshInterval != null) {
            return false;
        }

        //initial check
        this.lookForMatchesValve();

        this.valveRefreshInterval = setInterval(() => {
            this.lookForMatchesValve();
        }, 1000 * 60 * 3);
        return true;
    }

    stopLookingForValveMatches() {
        if (this.valveRefreshInterval != null) {
            clearInterval(this.valveRefreshInterval);
            this.valveRefreshInterval = null;

            return true;
        }
        return false;
    }

    startLookingForFaceitMatches() {
        if (this.faceitRefreshInterval != null) {
            return false;
        }

        //initial check
        this.lookForMatchesFaceit();

        this.faceitRefreshInterval = setInterval(() => {
            this.lookForMatchesFaceit();
        }, 1000 * 60 * 3);
        return true;
    }

    stopLookingForFaceitMatches() {
        if (this.faceitRefreshInterval != null) {
            clearInterval(this.faceitRefreshInterval);
            this.faceitRefreshInterval = null;

            return true;
        }
        return false;
    }

    getMatchSelection(playerId) {
        return axios.get(`${this.apiBaseAddress}/v1/single/${playerId}/matchselection`, {
            params: {
            }
        });
    }

    // Gets all feedback given by the authenticated user
    getFeedback() {
        return axios.get(`${this.apiBaseAddress}/v1/situations/feedback`, {
            params: {
            }
        });
    }

    sendFeedback(matchId, situationType, situationId, isPositive, comment) {
        let formattedParams = {
            matchId: matchId,
            situationType: situationType,
            situationId: situationId,
            isPositive: isPositive,
            comment: comment
        };
        return axios.post(`${this.apiBaseAddress}/v1/situations/feedback`, {}, {
            params: formattedParams
        });
    }
}

export default new MentorGGAPI();