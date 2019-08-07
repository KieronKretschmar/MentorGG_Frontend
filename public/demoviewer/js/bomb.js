function Bomb(x, y, time, timeDefused, timer) {
    var _self = this;

    this.Time = time;
    this.TimeDefused = timeDefused;
    this.Timer = timer;    
    this.CurrentTime = 0;
    this.TwoObject = DemoViewer.TwoInstance.makeCircle(x, y, 70);
    this.TwoObject.stroke = "none";
    this.TwoObject.translation.SetPositionAdjusted(x, y);
    this.TwoObject.visible = false;

    this.InternalUpdate = function(t) {
        this.CurrentTime = t;
        this.TwoObject.visible = this.CurrentTime >= this.Time;
        this.TwoObject.fill = (this.TimeDefused != null && this.CurrentTime >= this.TimeDefused) ?
            "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)";
    };

    this.GetTimeLeft = function() {
        return this.Timer * 1000 - (this.CurrentTime - this.Time);
    };

    this.IsPlanted = function() {
        return this.TwoObject.visible;
    }
}