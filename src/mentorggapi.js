import axios from 'axios';
import Enums from "@/enums";
import Vue from 'vue';
import MatchSelector from './matchselector';
import MentorUser from './mentoruser';

class MentorGGAPI {
    constructor() {
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
        this.newApiEndpoint = 'https://localhost:44369';
        this.valveInterval = null;        

        this.MatchSelector = new MatchSelector(this);
        this.User = null; //On AppCreation (App::mounted i guess), this needs to be populated with data from /api/GetUser or something the likes

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

    setUser(user) {
        this.User = new MentorUser(user);
        return this.User;
    }

    resolveResource(resource) {
        return resource.replace('~/', this.tldEndpoint);
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

    getPlayerInfo(playerId = "") {
        let params = {
        }
        if (playerId.length) {
            params.playerId = playerId;
        }
        else if (this.sendFixedSteamId) {
            params.playerId = this.fixedSteamId;
        }

        return axios.get(this.apiEndpoint + 'User/PlayerInfo', {
            params: params
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

    getMisplays(playerId = "", recentMatches) {
        let params = {
            recentMatches: recentMatches
        }
        if (playerId.length) {
            params.playerId = playerId;
        }
        else if (this.sendFixedSteamId) {
            params.playerId = this.fixedSteamId;
        }

        return axios.get(this.apiEndpoint + 'Situations/Misplays', {
            params: params
        });
    }


    getSingleMatchMisplays(playerId = "", matchId) {
        let params = {
            matchId: matchId
        }
        if (playerId.length) {
            params.playerId = playerId;
        }
        else if (this.sendFixedSteamId) {
            params.playerId = this.fixedSteamId;
        }

        return axios.get(this.apiEndpoint + 'Situations/Misplays', {
            params: params
        });
    }

    getImportantPositions(playerId = "", showBest, count, forMatchesN) {
        let params = {
            showBest: showBest,
            nPositions: count,
            recentMatches: forMatchesN
        }
        if (playerId.length) {
            params.playerId = playerId;
        }
        else if (this.sendFixedSteamId) {
            params.playerId = this.fixedSteamId;
        }

        return axios.get(this.apiEndpoint + 'Kills/ImportantPositions', {
            params: params
        });
    }

    getFriendsComparison(playerId = "", maxFriends = 3, recentMatches = 50) {
        let params = {
            maxFriends: maxFriends,
            recentMatches: recentMatches
        }
        if (playerId.length) {
            params.playerId = playerId;
        }
        else if (this.sendFixedSteamId) {
            params.playerId = this.fixedSteamId;
        }

        return axios.get(this.apiEndpoint + 'Compare/FriendsComparison', {
            params: params
        });
    }

    getRecentMatchData(playerId = "", recentMatches = 50) {
        let params = {
            recentMatches: recentMatches
        }
        if (playerId.length) {
            params.playerId = playerId;
        }
        else if (this.sendFixedSteamId) {
            params.playerId = this.fixedSteamId;
        }

        return axios.get(this.apiEndpoint + 'User/RecentMatchResults', {
            params: params
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

    getSamples(type, playerId = "", map, recentMatches = 50){
        let params = {
            map: map,
            recentMatches: recentMatches
        }
        if (playerId.length) {
            params.playerId = playerId;
        }
        else if (this.sendFixedSteamId) {
            params.playerId = this.fixedSteamId;
        }

        let route = this.apiEndpoint;
        if(type == Enums.SampleType.Flash){
            route += 'Flashes/Flashes';
        }
        if(type == Enums.SampleType.HE){
            route += 'HEs/HEs';
        }
        if(type == Enums.SampleType.FireNade){
            route += 'FireNades/FireNades';
        }
        if(type == Enums.SampleType.Kill){
            route += 'Kills/Kills';
        }
        if(type == Enums.SampleType.Smoke){
            route += 'Smokes/Smokes';
        }
        if(type == Enums.SampleType.Bomb){
            route += 'Bomb/Bombs';
        }

        return axios.get(route, {
            params: params
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

    getMetaMatchHistory() {
        return axios.get('https://test.mentor.gg/api/MatchSelectionHistory/GetHistory', {
            params: {
                steamId: '76561198033880857',
                dailyLimit: 3
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