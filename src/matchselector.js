export default class MatchSelector {
    constructor() {
        this.matchList = [
            {
                matchId: 1,
                map: "de_dust2",
                source: "Valve"
            },
            {
                matchId: 2,
                map: "de_inferno",
                source: "FACEIT"
            },
            {
                matchId: 3,
                map: "de_mirage",
                source: "Valve"
            },
            {
                matchId: 4,
                map: "de_mirage",
                source: "Valve"
            },
            {
                matchId: 4,
                map: "de_overpass",
                source: "Valve"
            }
        ];

        //Todo: After the initial retrieving of the matchList, maps and source as to be filled with their unique reductions
        //This is because we want all sources and maps to be selected by default
        this.filters = {
            maps: [],
            sources: [],
            matchCount: -1
        };
    }

    GetMatchList() {
        return this.matchList;
    }

    GetAvailableSourcesUnique() {
        return this.matchList.reduce((acc, el) => {
            if (acc.indexOf(el.source) == -1) {
                acc.push(el.source);
            }

            return acc;
        }, []);
    }

    GetAvailableMapsUnique() {
        return this.matchList.reduce((acc, el) => {
            if (acc.indexOf(el.map) == -1) {
                acc.push(el.map);
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
}