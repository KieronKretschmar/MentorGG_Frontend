$(function() {
    //extend Number
    Number.prototype.Clamp = function(min, max) {
        return Math.min(Math.max(this, min), max);
    };

    Number.prototype.PadDigit = function() {
        return this < 10 ? ('0' + this) : this;
    };
    
    Two.Vector.prototype.SetPositionAdjusted = function(x, y) {
        this._x = x / 1024 * DemoViewer.TwoInstance.width;
        this._y = y / 1024 * DemoViewer.TwoInstance.height;
    };
});