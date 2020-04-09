import axios from 'axios';
import Enums from "@/enums";
import Vue from 'vue';
import MatchSelector from './matchselector';
import MentorUser from './mentoruser';

class MentorGGAPI {
    constructor() {

        this.ready = false; // whether or not this.User and this.MatchSelector are loaded
        this.newApiEndpoint = 'https://api.mentor.gg';        

        // tell the webapp to add credentials from IdentityCookie to request headers 
        axios.defaults.withCredentials = true;

        // Settings based on mode
        if (process.env.NODE_ENV == 'production') {
            this.mvcEndpoint = document.location.origin + '/';
        }
        else if (process.env.NODE_ENV == 'development') {
            // Auth with bearer token instead of cookie if token is found
            if(process.env.VUE_APP_BEARER_TOKEN){
                // auth via Bearer token
                axios.defaults.headers.common['Authorization'] = "Bearer " + process.env.VUE_APP_BEARER_TOKEN
                axios.defaults.withCredentials = false;
            }

            if(process.env.VUE_APP_OVERRIDE_API_URL){
                this.newApiEndpoint = process.env.VUE_APP_OVERRIDE_API_URL;
            }
    
            this.mvcEndpoint = process.env.VUE_APP_MVCENDPOINT;
            // this.fixedSteamId = '76561198033880857'; //kieron
            // this.fixedSteamId = '76561198166019050'; //felix
            // this.fixedSteamId = '76561198044966222'; //lasse            
        }

        this.uploadEndpoint = "https://upload.mentor.gg/v1/demo"
        this.apiEndpoint = this.mvcEndpoint + 'api/';

        this.valveRefreshInterval = null;
        this.faceitRefreshInterval = null;
        this.User = null;
        this.MatchSelector = null;

        // this.User = new MentorUser();
        // console.log("User steamId: " + this.User.GetSteamId());
        // console.log("Applying override");
        // this.User.ApplyOverride(new MentorUser());
        // console.log("User steamId: " + this.User.GetSteamId());
        // console.log("Real steamId: " + this.User.GetSteamId(false));
        // console.log("Clearing override");
        // this.User.ClearOverride();
        // console.log("User steamId: " + this.User.GetSteamId());
    }

    // Ensures that this.User is set. If not (e.g. because the user is not logged in) the promise is rejected.
    ensureLogin(){
        return new Promise((resolve, reject) => {
            // If this.User is already set, resolve right away
            if(this.User){
                resolve();
                return;
            }

            // Attempt to load the logged-in user's identity from server
            axios.get(`${this.newApiEndpoint}/identity`, {})
            .then(result => {
                // User is logged in
                this.User = new MentorUser(result.data.ApplicationUserId, result.data.SteamId, result.data.SubscriptionType, result.data.DailyMatchesLimit);
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

    getSubscriptions(){
        return this.ensureLogin().then(response => {
            // Attempt to load the logged-in user's identity from server
            return axios.get(`${this.newApiEndpoint}/subscriptions`, {});
        });
    }

    // Initializes this.MatchSelector. Make sure this.User is set when calling this.
    initMatchSelector(){
        return new Promise((resolve, reject) => {
            let steamId = this.User.GetSteamId();
            this.getMetaMatchHistory(steamId)
            .then(result => {
                let matchList = result.data.Matches;
                this.MatchSelector = new MatchSelector(this, result.data.Matches, result.data.DailyLimitReachedToday);

                // this.User and this.MatchSelector are loaded, therefore api is ready to make ajax calls.
                this.ready = true;
                resolve();
            })
            .catch(e => {
                this.ready = false;
                reject("Could not load getMetaMatchHistory");
            });
        });
    }

    getSignOutUrl(returnUrl = "/"){
        return `${this.newApiEndpoint}/authentication/signout?returnUrl=${returnUrl}`
    }

    getSignInUrl(returnUrl = "/"){
        return `${this.newApiEndpoint}/authentication/signin/steam?returnUrl=${returnUrl}`
    }

    getPlayerInfo(params) {
        let formattedParams = {
        }
        return axios.get(`${this.newApiEndpoint}/v1/single/${params.steamId}/playerinfo`, {
            params: formattedParams
        });
    }

    getMatches(params, overrides = {}) {
        let formattedParams = {
            matchIds: this.MatchSelector.Build().GetMatchIds().toString(),
            count: params.count,
            offset: params.offset
        }
        return axios.get(`${this.newApiEndpoint}/v1/single/${params.steamId}/matches`, {
            params: formattedParams
        });
    }

    getFailedDemos(params, overrides = {}) {
        let formattedParams = {
            count: params.count,
            offset: params.offset
        }
        return axios.get(`${this.newApiEndpoint}/v1/single/${params.steamId}/demostatus/failed-demos`, {
            params: formattedParams
        });
    }

    getPosition(matchId){
        return axios.get(`${this.newApiEndpoint}/v1/match/${matchId}/demostatus/queue-position`, {
        });
    }

    getMatchesInQueue(uploaderId){
        return axios.get(`${this.newApiEndpoint}/v1/single/${uploaderId}/demostatus/matches-in-queue`, {
        });
    }

    getSingleMatchMisplays(params, overrides = {}) {
        let matchId = this.MatchSelector.Build().GetMostRecentMatchId();
        return axios.get(`${this.newApiEndpoint}/v1/single/${params.steamId}/misplays/match/${matchId}`, {
        });
    }

    getImportantPositions(params, overrides = {}) {
        let formattedParams = {
            matchIds: this.MatchSelector.Build().GetMatchIds().toString(),
            showBest: params.showBest,
            count: params.count,
        }

        return axios.get(`${this.newApiEndpoint}/v1/single/${params.steamId}/importantpositions`, {
            params: formattedParams
        });
    }

    getFriendsComparison(params, overrides = {}) {
        let formattedParams = {
            matchIds: this.MatchSelector.Build().GetMatchIds().toString(),
            count: params.count,
            offset: params.offset
        }

        return axios.get(`${this.newApiEndpoint}/v1/single/${params.steamId}/friendscomparison`, {
            params: formattedParams
        });
    }

    // this endpoint returns data for a summary of all the user's matches, disregarding filter settings and matchselector
    getRecentMatchData(params) {
        let formattedParams = {
        }
        
        return axios.get(`${this.newApiEndpoint}/v1/single/${params.steamId}/playersummary`, {
            params: formattedParams
        });
    }

    getOverview(params, overrides = {}) {
        let formattedParams = {
            matchIds: this.MatchSelector.Build().GetMatchIds().toString(),
        }

        let route = `${this.newApiEndpoint}/v1/single/${params.steamId}`;
        if(params.type == Enums.SampleType.Molotov){
            route += '/firenadesoverview';
        }
        else if(params.type == Enums.SampleType.Flash){
            route += '/flashesoverview';
        }
        else if(params.type == Enums.SampleType.HE){
            route += '/hesoverview';
        }
        else if(params.type == Enums.SampleType.Smoke){
            route += '/smokesoverview';
        }
        else if(params.type == Enums.SampleType.Kill){
            route += '/killsoverview';
        }
        
        return axios.get(route, {
            params: formattedParams
        });
    }

    getSamples(params, overrides = {}){
        let route = `${this.newApiEndpoint}/v1/single/${params.steamId}/`;
        let formattedParams = {
            map: params.map,
            matchIds: this.MatchSelector.Build().OverrideMultiple(overrides).GetMatchIds().toString(),
        }

        // Determine route according to params.type
        if(params.type == Enums.SampleType.Flash){
            route += 'flashes';
        }
        if(params.type == Enums.SampleType.HE){
            route += 'hes';
        }
        if(params.type == Enums.SampleType.Molotov){
            route += 'firenades';
        }
        if(params.type == Enums.SampleType.Kill){
            route += 'filterablekills';
        }
        if(params.type == Enums.SampleType.Smoke){
            route += 'smokes';
        }
        if(params.type == Enums.SampleType.Bomb){
            route += 'bombs';
        }

        return axios.get(route, {
            params: formattedParams
        });
    }

    getDVRound(matchId, round) {
        return axios.get(`${this.newApiEndpoint}/v1/watch/match/${matchId}/round/${round}`);
    }

    getDVMatch(matchId) {
        return axios.get(`${this.newApiEndpoint}/v1/watch/match/${matchId}`);
    }

    // Gets an object with a property for each connection
    getConnectionsObject() {
        return new Promise((resolve, reject) => {
            let res = {};
            let connections = [
                axios.get(`${this.newApiEndpoint}/v1/automatic-upload/connections/valve`)
                    .then(response => {
                        res[Enums.Source.Valve] = response.data;
                    })
                    .catch(error => {
                    }),
                axios.get(`${this.newApiEndpoint}/v1/automatic-upload/connections/faceit`)
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

    updateValveConnection(authCode, shareCode) {        
        let formattedParams = {
            steamAuthToken: authCode,
            lastKnownSharingCode: shareCode
        };
        return axios.post(`${this.newApiEndpoint}/v1/automatic-upload/connections/valve`, {}, {
            params: formattedParams
        });
    }

    removeValveConnection() {
        return axios.delete(`${this.newApiEndpoint}/v1/automatic-upload/connections/valve`, {});
    }

    lookForMatchesValve(){
        return axios.post(`${this.newApiEndpoint}/v1/automatic-upload/valve/look`, {});
    }

    removeFaceitConnection() {
        return axios.delete(`${this.newApiEndpoint}/v1/automatic-upload/connections/faceit`, {});
    }

    lookForMatchesFaceit(){
        return axios.post(`${this.newApiEndpoint}/v1/automatic-upload/faceit/look`, {});
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

    getMetaMatchHistory(playerId) {
        return axios.get(`${this.newApiEndpoint}/v1/single/${playerId}/matchselection`, {
            params: {
            }
        });
    }
}

export default new MentorGGAPI();