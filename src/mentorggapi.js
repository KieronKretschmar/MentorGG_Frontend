import axios from 'axios';

class MentorGGAPI {
    constructor() {
        this.mvcEndpoint = document.location.origin + '/';
        if(this.mvcEndpoint.indexOf('8080')){
            this.mvcEndpoint = this.mvcEndpoint.replace('8080', '58071');
        }
        // this.mvcEndpoint = 'https://test.mentor.gg/';
        // this.mvcEndpoint = 'http://localhost:58071/';
        this.apiEndpoint = this.mvcEndpoint + 'api/';
        this.tldEndpoint = 'https://test.mentor.gg/';
        // this.steamId = '76561198166019050'; //felix
        // this.steamId = '76561198033880857'; //kieron
    }

    resolveResource(resource) {
        return resource.replace('~/', this.tldEndpoint);
    }    

    getSrcMap() {
        return axios.get(this.apiEndpoint + 'Image/SrcMap', {
            params: {
            }
        });
    }
    
    getFaceitStatus(playerId = "") {
        let params = {
        }                
        if(playerId.length) {
            params.playerId = playerId;
        }
        return axios.get(this.apiEndpoint + 'User/FaceitStatus', {
            params: params
        });
    }

    getPlayerInfo(playerId = "") {
        let params = {
        }                
        if(playerId.length) {
            params.playerId = playerId;
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
        if(playerId.length) {
            params.playerId = playerId;
        }
        return axios.get(this.apiEndpoint + 'Matches/Matches', {
            params: params
        });
    }

    getImportantPositions(playerId = "", showBest, count, forMatchesN) {
        let params = {
            showBest: showBest,
            nPositions: count,
            recentMatches: forMatchesN
        }                
        if(playerId.length) {
            params.playerId = playerId;
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
        if(playerId.length) {
            params.playerId = playerId;
        }
        return axios.get(this.apiEndpoint + 'Compare/FriendsComparison', {
            params: params
        });
    }

    getRecentMatchData(playerId = "", recentMatches = 50) {
        let params = {
            recentMatches: recentMatches
        }                
        if(playerId.length) {
            params.playerId = playerId;
        }

        return axios.get(this.apiEndpoint + 'User/RecentMatchResults', {
            params: params
        });
    }

    getFireNadesOverview(playerId = "", recentMatches = 50) {
        let params = {
            recentMatches: recentMatches
        }                
        if(playerId.length) {
            params.playerId = playerId;
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
        if(playerId.length) {
            params.playerId = playerId;
        }
        return axios.get(this.apiEndpoint + 'FireNades/FireNades', {
            params: params
        });
    }

    getFlashesOverview(playerId = "", recentMatches = 50) {
        let params = {
            recentMatches: recentMatches
        }                
        if(playerId.length) {
            params.playerId = playerId;
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
        if(playerId.length) {
            params.playerId = playerId;
        }
        return axios.get(this.apiEndpoint + 'Flashes/Flashes', {
            params: params
        });
    }

    getHEsOverview(playerId = "", recentMatches = 50) {
        let params = {
            recentMatches: recentMatches
        }                
        if(playerId.length) {
            params.playerId = playerId;
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
        if(playerId.length) {
            params.playerId = playerId;
        }
        return axios.get(this.apiEndpoint + 'HEs/HEs', {
            params: params
        });
    }

    getKillsOverview(playerId = "", recentMatches = 50) {
        let params = {
            recentMatches: recentMatches
        }                
        if(playerId.length) {
            params.playerId = playerId;
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
        if(playerId.length) {
            params.playerId = playerId;
        }
        return axios.get(this.apiEndpoint + 'Kills/Kills', {
            params: params
        });
    }    

    getSmokesOverview(playerId = "", recentMatches = 50) {
        let params = {
            recentMatches: recentMatches
        }                
        if(playerId.length) {
            params.playerId = playerId;
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
        if(playerId.length) {
            params.playerId = playerId;
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
        if(playerId.length) {
            params.playerId = playerId;
        }
        return axios.get(this.apiEndpoint + 'DemoViewer/Match', {
            params: params
        });
    }
    
    getPlayerStats(playerId = "") {
        let params = {
        }                
        if(playerId.length) {
            params.playerId = playerId;
        }
        return axios.get(this.apiEndpoint + 'Stats/Player', {
            params: params
        });
    }    

    postRefreshFaceit(){
        return axios.post(this.mvcEndpoint + 'Account/RefreshFaceit', {
            params: {
            }
        });
    }
    
    postRemoveFaceit(){
        return axios.post(this.mvcEndpoint + 'Account/RemoveFaceit', {
            params: {
            }
        });
    }
}

export default new MentorGGAPI();