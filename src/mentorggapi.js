import axios from 'axios';
import Enums from "@/enums";
import Vue from 'vue';
import MatchSelector from './matchselector';
import MentorUser from './mentoruser';

class MentorGGAPI {
    constructor() {
        // tell the webapp to add credentials from IdentityCookie to request headers 
        axios.defaults.withCredentials = true;

        if (process.env.NODE_ENV == 'production') {
            this.mvcEndpoint = document.location.origin + '/';
            this.tldEndpoint = this.mvcEndpoint;
            this.sendFixedSteamId = false;
        }
        // In development, we use fixedSteamIds to prevent 401 errors caused by the api not being able to identify the user
        if (process.env.NODE_ENV == 'development' || process.env.VUE_APP_NOAUTH) {
            this.mvcEndpoint = process.env.VUE_APP_MVCENDPOINT;
            this.sendFixedSteamId = true;
            this.tldEndpoint = 'https://mentor.gg/';
            this.fixedSteamId = '76561198033880857'; //kieron
            // this.fixedSteamId = '76561198166019050'; //felix
            // this.fixedSteamId = '76561198044966222'; //lasse
        }

        this.apiEndpoint = this.mvcEndpoint + 'api/';
        // this.newApiEndpoint = 'https://234a2859.ngrok.io';
        this.newApiEndpoint = 'https://localhost:44310';
        this.valveInterval = null;

        // whether or not this.User and this.MatchSelector are loaded
        this.ready = false;

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
            }

            // Attempt to load the logged-in user's identity from server
            axios.get(`${this.newApiEndpoint}/identity`, {})
            .then(result => {
                // User is logged in
                this.User = new MentorUser(result.data.ApplicationUserId, result.data.SteamId, result.data.SubscriptionType);
                resolve();
            })
            .catch(error => {
                // User is not logged in
                this.User = null;
                this.ready = false;
                reject();
            });
        });
    }

    // Initializes this.MatchSelector. Make sure this.User is set when calling this.
    initMatchSelector(){
        return new Promise((resolve, reject) => {
            let steamId = this.User.GetSteamId();
            this.getMetaMatchHistory(steamId)
            .then(result => {
                let matchList = result.data.Matches;
                this.MatchSelector = new MatchSelector(this, matchList);

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

    matchUrl(matchId) {
        return this.mvcEndpoint + 'Download/Demo?matchId=' + matchId;
    }

    getLoginStatus() {
        return axios.get(this.apiEndpoint + 'User/LoginStatus');
    }

    getSrcMap() {
        return axios.get(this.apiEndpoint + 'Image/SrcMap', {
            params: {
            }
        });
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

    // this endpoint returns data for all the user's matches, disregarding filter settings and matchselector
    getRecentMatchData(params) {
        let formattedParams = {
        }
        
        return axios.get(`${this.newApiEndpoint}/v1/single/${params.steamId}/playersummary`, {
            params: formattedParams
        });
    }

    getOverview(type, playerId = "", recentMatches = 50) {
        let params = {
            recentMatches: recentMatches
        }
        if (playerId.length) {
            params.playerId = playerId;
        }
        else if (this.sendFixedSteamId) {
            params.playerId = this.fixedSteamId;
        }

        let route = this.apiEndpoint;
        if(type == Enums.SampleType.FireNade){
            route += 'FireNades/FireNadesOverview';
        }
        else if(type == Enums.SampleType.Flash){
            route += 'Flashes/FlashesOverview';
        }
        else if(type == Enums.SampleType.HE){
            route += 'HEs/HEsOverview';
        }
        else if(type == Enums.SampleType.Smoke){
            route += 'Smokes/SmokesOverview';
        }
        else if(type == Enums.SampleType.Kill){
            route += 'Kills/KillsOverview';
        }
        
        return axios.get(route, {
            params: params
        });
    }

    getSamples(params, overrides = {}){
        let route = `${this.newApiEndpoint}/v1/single/${params.steamId}/`;
        let formattedParams = {
            map: params.map,
            matchIds: this.MatchSelector.Build().GetMatchIds().toString(),
        }

        // Determine route according to params.type
        if(params.type == Enums.SampleType.Flash){
            route += 'flashes';
        }
        if(params.type == Enums.SampleType.HE){
            route += 'hes';
        }
        if(params.type == Enums.SampleType.FireNade){
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

    getAllBombPlants(map, recentMatches = 50) {
        let params = {
            map: map,
            recentMatches: recentMatches
        }
        return axios.get(this.apiEndpoint + 'Bomb/AllBombs', {
            params: params
        });
    }

    getAllBombPlantsByRank(map, rank, recentMatches = 50) {
        let params = {
            map: map,
            rank: rank,
            recentMatches: recentMatches,
        }
        return axios.get(this.apiEndpoint + 'Bomb/AllBombsByRank', {
            params: params
        });
    }

    getKillsOverview(playerId = "", recentMatches = 50) {
        let params = {
            recentMatches: recentMatches
        }
        if (playerId.length) {
            params.playerId = playerId;
        }
        else if (this.sendFixedSteamId) {
            params.playerId = this.fixedSteamId;
        }

        return axios.get(this.apiEndpoint + 'Kills/KillsOverview', {
            params: params
        });
    }

    getDVRound(matchId, round) {
        return axios.get(this.apiEndpoint + 'DemoViewer/Round', {
            params: {
                matchId: matchId,
                round: round
            }
        });
    }

    getDVMatch(playerId = "", matchId, round) {
        let params = {
            matchId: matchId,
            round: round
        }
        if (playerId.length) {
            params.playerId = playerId;
        }
        else if (this.sendFixedSteamId) {
            params.playerId = this.fixedSteamId;
        }
        return axios.get(this.apiEndpoint + 'DemoViewer/Match', {
            params: params
        });
    }

    getPlayerStats(playerId = "") {
        let params = {
        }
        if (playerId.length) {
            params.playerId = playerId;
        }
        else if (this.sendFixedSteamId) {
            params.playerId = this.fixedSteamId;
        }
        return axios.get('https://test.mentor.gg/v1/Stats/Player', {
            params: params
        });
    }

    getEvents() {
        return axios.get(this.apiEndpoint + 'Event/Events', {
            params: {
            }
        });
    }

    getEvent(eventName) {
        return axios.get(this.apiEndpoint + 'Event/Event', {
            params: {
                eventName: eventName
            }
        });
    }

    getEventFlashes(eventName, teamName, map) {
        return axios.get(this.apiEndpoint + 'Flashes/EventFlashes', {
            params: {
                eventName: eventName,
                teamName: teamName,
                map: map,
            }
        });
    }

    getEventHEs(eventName, teamName, map) {
        return axios.get(this.apiEndpoint + 'HEs/EventHEs', {
            params: {
                eventName: eventName,
                teamName: teamName,
                map: map,
            }
        });
    }

    getEventKills(eventName, teamName, map) {
        return axios.get(this.apiEndpoint + 'Kills/EventKills', {
            params: {
                eventName: eventName,
                teamName: teamName,
                map: map,
            }
        });
    }

    getEventMatches(eventName, count, offset = 0) {
        let params = {
            eventName: eventName,
            recentMatches: count,
            offset: offset
        }

        return axios.get(this.apiEndpoint + 'Matches/EventMatches', {
            params: params
        });
    }

    getEventMolotovs(eventName, teamName, map) {
        return axios.get(this.apiEndpoint + 'FireNades/EventFireNades', {
            params: {
                eventName: eventName,
                teamName: teamName,
                map: map,
            }
        });
    }

    getEventSmokes(eventName, teamName, map) {
        return axios.get(this.apiEndpoint + 'Smokes/EventSmokes', {
            params: {
                eventName: eventName,
                teamName: teamName,
                map: map,
            }
        });
    }

    getConnections() {
        return axios.get(this.apiEndpoint + 'User/Connections');
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

        return axios.post(this.apiEndpoint + 'Upload/Demo', formData, config);
    }

    updateValveConnection(authCode, shareCode) {
        return axios.post(this.apiEndpoint + 'User/UpdateSteamApiAuthData', {
            steamIdKey: authCode,
            lastSharingCode: shareCode
        });
    }

    removeValveConnection() {
        return axios.post(this.apiEndpoint + 'User/RemoveValve', {
            params: {
            }
        });
    }

    lookForValveMatches() {
        return axios.post(this.apiEndpoint + 'User/LookForValveMatches', {
            params: {
            }
        });
    }

    postRefreshFaceit() {
        return axios.post(this.mvcEndpoint + 'Account/RefreshFaceit', {
            params: {
            }
        });
    }

    postRemoveFaceit() {
        return axios.post(this.mvcEndpoint + 'Account/RemoveFaceit', {
            params: {
            }
        });
    }

    // Workaround until impersonate works
    getMetaMatchHistory(playerId) {
        return axios.get(this.newApiEndpoint + "/v1/single/" + (playerId.length ? playerId : this.fixedSteamId) + "/matchselection", {
            params: {
            }
        });
    }

    startLookingForValveMatches() {
        if (this.valveInterval != null) {
            return false;
        }

        //initial check
        this.lookForValveMatches();

        this.valveInterval = setInterval(() => {
            this.lookForValveMatches();
        }, 1000 * 60 * 3);

        return true;
    }

    stopLookingForValveMatches() {
        if (this.valveInterval != null) {
            clearInterval(this.valveInterval);
            this.valveInterval = null;

            return true;
        }

        return false;
    }
}

export default new MentorGGAPI();