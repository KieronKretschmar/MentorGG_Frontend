import axios from 'axios';

class MentorGGAPI {
    constructor() {
        this.apiEndpoint = 'https://test.mentor.gg/api/';
        this.steamId = '76561198033880857';
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
}

export default new MentorGGAPI();