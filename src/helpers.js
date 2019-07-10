class Helpers {
    NormalizedPerformance(performance, goodPerformance, badPerformance)
    {
        var normalizedPerformance = (performance - badPerformance) / (goodPerformance - badPerformance);
        normalizedPerformance = Math.max(0, Math.min(1, normalizedPerformance));
        return normalizedPerformance;
    }
}

export default new Helpers();