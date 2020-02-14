export default class MatchSelector {
    constructor(api) {
        this.$api = api;

        this.filters = {
            maps: [],
            sources: [],
            matchCount: -1,
            blacklist: []
        };

        this.ready = false;

        this.$api.getMetaMatchHistory().then(result => {
            this.matchList = result.data.Matches;

            //fix ugly enum name for displaying purposes
            for (let match of this.matchList) {
                if (match.Source == "Manualupload") {
                    match.Source = "Manual Upload";
                }
            }

            this.filters.maps = this.GetAvailableMapsUnique();
            this.filters.sources = this.GetAvailableSourcesUnique();

            this.ready = true;
        })
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

            GetMatchIdsCsv() {
                return this.GetMatchIds().toString();
            },

            Override(what, data) {
                let validOverrides = ['sources', 'maps', 'matchCount'];
                if (validOverrides.indexOf(what) == -1) {
                    throw new Error("Invalid override type. Valid types are: " + validOverrides);
                }

                this.filters[what] = data;

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

        console.log(this.filters.maps);
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
        if (this.HasSourcesFilter(sourceName)) {
            this.RemoveSourcesFilter(sourceName);
        } else {
            this.AddSourcesFilter(sourceName);
        }

        console.log(this.filters.sources);
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
        if (!this.IsBlacklisted(matchId)) {
            this.AddToBlacklist(matchId);
        } else {
            this.RemoveFromBlacklist(matchId);
        }
    }
}

