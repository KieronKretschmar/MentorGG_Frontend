class Helpers {
    NormalizedPerformance(performance, goodPerformance, badPerformance) {
        var normalizedPerformance = (performance - badPerformance) / (goodPerformance - badPerformance);
        normalizedPerformance = Math.max(0, Math.min(1, normalizedPerformance));
        return normalizedPerformance;
    }
    
    DemoViewerAvailable(map){
        return ['de_dust2', 'de_mirage', 'de_nuke', 'de_inferno', 'de_cache', 'de_overpass', 'de_train'].includes(map);
    }
}

export default new Helpers();