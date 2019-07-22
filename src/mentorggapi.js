import axios from 'axios';

class MentorGGAPI {
    constructor() {
        this.apiEndpoint = 'https://test.mentor.gg/api/';
        this.apiEndpoint = 'http://localhost:58071/api/';
        // this.apiEndpoint = document.location.origin + '/api/';
        this.tldEndpoint = 'https://test.mentor.gg/';
        // this.steamId = '76561198166019050'; //felix
        this.steamId = '76561198033880857'; //kieron
    }

    resolveResource(resource) {
        return resource.replace('~/', this.tldEndpoint);
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
}

export default new MentorGGAPI();