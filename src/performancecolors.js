// This module computes colors that reflect the given performance, from red=bad over yellow=medium to green=good.

// Revealing module pattern
class PerformanceColors {
    constructor() {
        // Colors indicating performance
        this.goodColor = "rgb(0, 255, 0)";
        this.mediumColor = "rgb(255, 255, 0)";
        this.badColor = "rgb(255, 0, 0)";
    }


    // Explicitly reveal public pointers to the private functions 
    // that we want to reveal publicly
    performanceColorGivenOpacity(performance, goodPerformance, badPerformance, opacity) {
        var normalizedPerformance = this.normalizePerformance(performance, goodPerformance, badPerformance);

        return this.performanceColor(normalizedPerformance, opacity);
    }

    // Returns color according to performance, with opacity according to how far the performance deviates from the norm
    performanceColorOpacityFromDeviation(performance, goodPerformance, badPerformance, maxOpacity, minOpacity) {
        // Compute opacity
        var averagePerformance = (goodPerformance + badPerformance) / 2;
        // normalized distance to mean. 0 if performance is average, 1 if more extreme than good or badPerformance
        var extremity = Math.max(0, Math.min(1, Math.abs((averagePerformance - performance) / (goodPerformance - badPerformance))));
        var opacity = minOpacity + (maxOpacity - minOpacity) * extremity;

        return this.performanceColorGivenOpacity(performance, goodPerformance, badPerformance, opacity);
    }

    opacityFromSampleSize(minOpacity, maxOpacity, sampleSize, samplesRequiredForMaxOpacity) {
        return minOpacity + (maxOpacity - minOpacity) * Math.min(1, sampleSize / samplesRequiredForMaxOpacity);
    }

    neutralColor(opacity) {
        return "rgba(255, 255, 255, " + opacity + ")";
    }

    performanceColor(normalizedPerformance, opacity = 1.0) {
        // clamp in [0,1]
        normalizedPerformance = Math.max(0, Math.min(1, normalizedPerformance));

        // return grey if faulty input, e.g. performance being +/-infinity
        if (isNaN(normalizedPerformance)) {
            return this.neutralColor(opacity);
        }

        // return interpolation between bad,medium and good color
        if (normalizedPerformance < 0.5)
            return this.interpolateColors(this.badColor, this.mediumColor, normalizedPerformance / 0.5, opacity);
        return this.interpolateColors(this.mediumColor, this.goodColor, (normalizedPerformance - 0.5) / 0.5, opacity);
    }


    // private functions
    interpolateColors(color1, color2, fraction, opacity) {
        var rgb1 = this.getRGB(color1);
        var rgb2 = this.getRGB(color2);
        var r = this.interpolateValue(rgb1.R, rgb2.R, fraction);
        var g = this.interpolateValue(rgb1.G, rgb2.G, fraction);
        var b = this.interpolateValue(rgb1.B, rgb2.B, fraction);
        return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
    }

    interpolateValue(d1, d2, fraction) {
        return d1 + (d2 - d1) * fraction;
    }

    normalizePerformance(performance, goodPerformance, badPerformance) {
        var normalizedPerformance = (performance - badPerformance) / (goodPerformance - badPerformance);
        normalizedPerformance = Math.max(0, Math.min(1, normalizedPerformance));
        return normalizedPerformance;
    }

    getRGB(str) {
        var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
        return match ? {
            R: parseFloat(match[1]),
            G: parseFloat(match[2]),
            B: parseFloat(match[3])
        } : {};
    }

}

export default new PerformanceColors();