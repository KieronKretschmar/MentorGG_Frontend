import axios from 'axios';

class MentorGGAPI {
    constructor() {
        // this.mvcEndpoint = document.location.origin + '/';
        this.mvcEndpoint = 'https://test.mentor.gg/';
        // this.mvcEndpoint = 'http://localhost:58071/';
        this.apiEndpoint = this.mvcEndpoint + 'api/';
        this.tldEndpoint = 'https://test.mentor.gg/';
        // this.steamId = '76561198166019050'; //felix
        this.steamId = '76561198033880857'; //kieron
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

    
    getFaceitStatus() {
        return axios.get(this.apiEndpoint + 'User/FaceitStatus', {
            params: {
                playerId: this.steamId
            }
        });
    }

    getPlayerInfo() {
        return axios.get(this.apiEndpoint + 'User/PlayerInfo', {
            params: {
                playerId: this.steamId
            }
        });
    }

    getMatches(count, offset = 0) {
        return axios.get(this.apiEndpoint + 'Matches/Matches', {
            params: {
                playerId: this.steamId,
                recentMatches: count,
                offset: offset
            }
        });
    }

    getImportantPositions(showBest, count, forMatchesN) {
        return axios.get(this.apiEndpoint + 'Kills/ImportantPositions', {
            params: {
                playerId: this.steamId,
                showBest: showBest,
                nPositions: count,
                recentMatches: forMatchesN
            }
        });
    }

    getFriendsComparison(maxFriends = 3, recentMatches = 50) {
        return axios.get(this.apiEndpoint + 'Compare/FriendsComparison', {
            params: {
                playerId: this.steamId,
                maxFriends: maxFriends,
                recentMatches: recentMatches
            }
        });
    }

    getRecentMatchData(recentMatches = 50) {
        return axios.get(this.apiEndpoint + 'User/RecentMatchResults', {
            params: {
                playerId: this.steamId,
                recentMatches: recentMatches
            }
        });
    }

    getFireNadesOverview(recentMatches = 50) {
        return axios.get(this.apiEndpoint + 'FireNades/FireNadesOverview', {
            params: {
                playerId: this.steamId,
                recentMatches: recentMatches
            }
        });
    }

    getFireNades(map, recentMatches = 50) {
        return axios.get(this.apiEndpoint + 'FireNades/FireNades', {
            params: {
                playerId: this.steamId,
                map: map,
                recentMatches: recentMatches
            }
        });
    }

    getFlashesOverview(recentMatches = 50) {
        return axios.get(this.apiEndpoint + 'Flashes/FlashesOverview', {
            params: {
                playerId: this.steamId,
                recentMatches: recentMatches
            }
        });
    }

    getFlashes(map, recentMatches = 50) {
        return axios.get(this.apiEndpoint + 'Flashes/Flashes', {
            params: {
                playerId: this.steamId,
                map: map,
                recentMatches: recentMatches
            }
        });
    }

    getHEsOverview(recentMatches = 50) {
        return axios.get(this.apiEndpoint + 'HEs/HEsOverview', {
            params: {
                playerId: this.steamId,
                recentMatches: recentMatches
            }
        });
    }

    getHEs(map, recentMatches = 50) {
        return axios.get(this.apiEndpoint + 'HEs/HEs', {
            params: {
                playerId: this.steamId,
                map: map,
                recentMatches: recentMatches
            }
        });
    }

    getKillsOverview(recentMatches = 50) {
        return axios.get(this.apiEndpoint + 'Kills/KillsOverview', {
            params: {
                playerId: this.steamId,
                recentMatches: recentMatches
            }
        });
    }

    getKills(map, recentMatches = 50) {
        return axios.get(this.apiEndpoint + 'Kills/Kills', {
            params: {
                playerId: this.steamId,
                map: map,
                recentMatches: recentMatches
            }
        });
    }    

    getSmokesOverview(recentMatches = 50) {
        return axios.get(this.apiEndpoint + 'Smokes/SmokesOverview', {
            params: {
                playerId: this.steamId,
                recentMatches: recentMatches
            }
        });
    }

    getSmokes(map, recentMatches = 50) {
        return axios.get(this.apiEndpoint + 'Smokes/Smokes', {
            params: {
                playerId: this.steamId,
                map: map,
                recentMatches: recentMatches
            }
        });
    }
    
    getPlayerStats() {
        return axios.get(this.apiEndpoint + 'Stats/Player', {
            params: {
                playerId: this.steamId,
            }
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