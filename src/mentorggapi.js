import axios from 'axios';

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
            this.fixedSteamId = '76561198166019050'; //felix
            // this.fixedSteamId = '76561198044966222'; //lasse
        }

        this.apiEndpoint = this.mvcEndpoint + 'api/';
        this.valveInterval = null;
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

    getMatches(playerId = "", count, offset = 0) {
        let params = {
            recentMatches: count,
            offset: offset
        }
        if (playerId.length) {
            params.playerId = playerId;
        }
        else if (this.sendFixedSteamId) {
            params.playerId = this.fixedSteamId;
        }

        return axios.get(this.apiEndpoint + 'Matches/Matches', {
            params: params
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

    getFireNadesOverview(playerId = "", recentMatches = 50) {
        let params = {
            recentMatches: recentMatches
        }
        if (playerId.length) {
            params.playerId = playerId;
        }
        else if (this.sendFixedSteamId) {
            params.playerId = this.fixedSteamId;
        }

        return axios.get(this.apiEndpoint + 'FireNades/FireNadesOverview', {
            params: params
        });
    }

    getFireNades(playerId = "", map, recentMatches = 50) {
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

        return axios.get(this.apiEndpoint + 'FireNades/FireNades', {
            params: params
        });
    }

    getFlashesOverview(playerId = "", recentMatches = 50) {
        let params = {
            recentMatches: recentMatches
        }
        if (playerId.length) {
            params.playerId = playerId;
        }
        else if (this.sendFixedSteamId) {
            params.playerId = this.fixedSteamId;
        }

        return axios.get(this.apiEndpoint + 'Flashes/FlashesOverview', {
            params: params
        });
    }

    getFlashes(playerId = "", map, recentMatches = 50) {
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

        return axios.get(this.apiEndpoint + 'Flashes/Flashes', {
            params: params
        });
    }

    getBombPlants(playerId = "", map, recentMatches = 50) {
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

        return axios.get(this.apiEndpoint + 'Bomb/Bombs', {
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

    getHEsOverview(playerId = "", recentMatches = 50) {
        let params = {
            recentMatches: recentMatches
        }
        if (playerId.length) {
            params.playerId = playerId;
        }
        else if (this.sendFixedSteamId) {
            params.playerId = this.fixedSteamId;
        }

        return axios.get(this.apiEndpoint + 'HEs/HEsOverview', {
            params: params
        });
    }

    getHEs(playerId = "", map, recentMatches = 50) {
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

        return axios.get(this.apiEndpoint + 'HEs/HEs', {
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

    getKills(playerId = "", map, recentMatches = 50) {
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

        return axios.get(this.apiEndpoint + 'Kills/Kills', {
            params: params
        });
    }

    getSmokesOverview(playerId = "", recentMatches = 50) {
        let params = {
            recentMatches: recentMatches
        }
        if (playerId.length) {
            params.playerId = playerId;
        }
        else if (this.sendFixedSteamId) {
            params.playerId = this.fixedSteamId;
        }

        return axios.get(this.apiEndpoint + 'Smokes/SmokesOverview', {
            params: params
        });
    }

    getSmokes(playerId = "", map, recentMatches = 50) {
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

        return axios.get(this.apiEndpoint + 'Smokes/Smokes', {
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
        return axios.get(this.apiEndpoint + 'Stats/Player', {
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
                console.log(progress);
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