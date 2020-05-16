import Enums from './enums';

export default class MatchSelector {
    constructor(api, matchList, inaccessibleMatches, dailyLimitReached, dailyLimitEnds) {
        this.$api = api;

        this.filters = {
            maps: [],
            sources: [],
            matchCount: -1,
            blacklist: []
        };

        this.matchList = matchList;
        this.inaccessibleMatches = inaccessibleMatches;
        this.dailyLimitReached = dailyLimitReached;
        this.dailyLimitEnds = dailyLimitEnds;

        //fix ugly enum name for displaying purposes
        for (let match of this.matchList) {
            if (match.Source == "Manualupload") {
                match.Source = "Manual Upload";
            }
        }

        this.filters.maps = this.GetAvailableMapsUnique();
        this.filters.sources = this.GetAvailableSourcesUnique();
    }

    Build() {
        let r = {
            matches: [],
            filters: [],

            GetMatchIds() {
                return this.matches.reduce((acc, match) => {
                    if (this.filters.matchCount == -1 || acc.length < this.filters.matchCount) {
                        if (this.filters.sources.indexOf(match.Source) != -1 && this.filters.maps.indexOf(match.Map) != -1) {
                            acc.push(match.MatchId);
                        }
                    }

                    return acc;
                }, []).filter(matchId => this.filters.blacklist.indexOf(matchId) == -1);
            },

            // Returns all matchids that were filtered out
            GetIgnoredMatchIds() {
                let selectedMatchIds = this.GetMatchIds();
                let ignoredMatches = this.matches.map(x => x.MatchId).filter(x => !selectedMatchIds.includes(x));
                return ignoredMatches;
            },

            GetMostRecentMatchId() {
                return this.matches.sort((a, b) => new Date(b.MatchDate) - new Date(a.MatchDate)).map(x => x.MatchId)[0];
            },

            Override(what, data) {
                let validOverrides = ['sources', 'maps', 'matchCount'];
                if (validOverrides.indexOf(what) == -1) {
                    throw new Error(`Invalid override type '${what}'. Valid types are: ${validOverrides}`);
                }

                this.filters[what] = data;

                return this;
            },

            // example: overrides = {"maps" : ["de_mirage"], "matchCount" : 2} 
            OverrideMultiple(overrides) {
                for (const key in overrides) {
                    if (overrides.hasOwnProperty(key)) {
                        const data = overrides[key];
                        this.Override(key, data);
                    }
                }
                return this;
            }
        };

        Object.assign(r.matches, this.matchList);
        Object.assign(r.filters, this.filters);

        return r;
    }

    GetMatchList() {
        return this.matchList;
    }

    GetAvailableSourcesUnique() {
        return this.matchList.reduce((acc, el) => {
            if (acc.indexOf(el.Source) == -1) {
                acc.push(el.Source);
            }

            return acc;
        }, []);
    }

    GetAvailableMapsUnique() {
        return this.matchList.reduce((acc, el) => {
            if (acc.indexOf(el.Map) == -1) {
                acc.push(el.Map);
            }

            return acc;
        }, []);
    }

    SetMatchCountFilter(count) {
        this.filters.matchCount = count;
    }

    AddMapFilter(mapName) {
        if (!this.HasMapFilter(mapName)) {
            this.filters.maps.push(mapName);
            return true;
        }

        return false;
    }

    RemoveMapFilter(mapName) {
        this.filters.maps = this.filters.maps.filter(name => name != mapName);
    }

    ToggleMapFilter(mapName) {
        if (this.HasMapFilter(mapName)) {
            this.RemoveMapFilter(mapName);
        } else {
            this.AddMapFilter(mapName);
        }
    }

    ToggleAllMaps() {
        this.$api.User.AuthorizationGate(Enums.SubscriptionStatus.Premium, () => {
            let maps = this.GetAvailableMapsUnique();
            console.log(maps);
            if (maps.length <= 0) {
                return;
            }

            let newVal = !this.HasMapFilter(maps[0]);

            for (let map of maps)
            {
                if (newVal) {
                    this.AddMapFilter(map);
                } else {
                    this.RemoveMapFilter(map);
                }
            }
        });
    } 

    HasMapFilter(mapName) {
        return this.filters.maps.indexOf(mapName) != -1;
    }

    AddSourcesFilter(sourceName) {
        if (!this.HasSourcesFilter(sourceName)) {
            this.filters.sources.push(sourceName);
            return true;
        }

        return false;
    }

    RemoveSourcesFilter(sourceName) {
        this.filters.sources = this.filters.sources.filter(name => name != sourceName);
    }

    ToggleSourcesFilter(sourceName) {
        this.$api.User.AuthorizationGate(Enums.SubscriptionStatus.Premium, () => {
            if (this.HasSourcesFilter(sourceName)) {
                this.RemoveSourcesFilter(sourceName);
            } else {
                this.AddSourcesFilter(sourceName);
            }
        });
    }

    ToggleAllSources() {
        this.$api.User.AuthorizationGate(Enums.SubscriptionStatus.Premium, () => {
            let sources = this.GetAvailableSourcesUnique();
            console.log(sources);
            if (sources.length <= 0) {
                return;
            }

            let newVal = !this.HasSourcesFilter(sources[0]);

            for (let source of sources)
            {
                if (newVal) {
                    this.AddSourcesFilter(source);
                } else {
                    this.RemoveSourcesFilter(source);
                }
            }
        });
    }    

    HasSourcesFilter(sourceName) {
        return this.filters.sources.indexOf(sourceName) != -1;
    }

    IsBlacklisted(matchId) {
        return this.filters.blacklist.indexOf(matchId) != -1;
    }

    AddToBlacklist(matchId) {
        if (!this.IsBlacklisted(matchId)) {
            this.filters.blacklist.push(matchId);
        }
    }

    RemoveFromBlacklist(matchId) {
        this.filters.blacklist = this.filters.blacklist.filter(_matchId => _matchId != matchId);
    }

    ToggleBlacklist(matchId) {
        this.$api.User.AuthorizationGate(Enums.SubscriptionStatus.Premium, () => {
            if (!this.IsBlacklisted(matchId)) {
                this.AddToBlacklist(matchId);
            } else {
                this.RemoveFromBlacklist(matchId);
            }
        });
    }

    ToggleAllMatches() {
        this.$api.User.AuthorizationGate(Enums.SubscriptionStatus.Premium, () => {
            if (this.matchList.length <= 0) {
                return;
            }

            let newVal = !this.IsBlacklisted(this.matchList[0].MatchId);

            for (let match of this.matchList)
            {
                if (newVal) {
                    this.AddToBlacklist(match.MatchId);
                } else {
                    this.RemoveFromBlacklist(match.MatchId);
                }
            }
        });
    }
}

