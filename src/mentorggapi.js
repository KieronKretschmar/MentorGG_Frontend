import axios from 'axios';

class MentorGGAPI {
    constructor() {
        this.apiEndpoint = 'https://test.mentor.gg/api/';
        this.tldEndpoint = 'https://test.mentor.gg/';
        this.steamId = '76561198166019050'; //felix
        // this.steamId = '76561198033880857'; //kieron
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

    getMatches(count) {
        return axios.get(this.apiEndpoint + 'Matches/Matches', {
            params: {
                playerId: this.steamId,
                recentMatches: count
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
}

export default new MentorGGAPI();