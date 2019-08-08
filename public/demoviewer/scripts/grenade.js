var GrenadeType = {
    Smoke: 1,
    HE: 2,
    Flash: 3,
    Decoy: 4,
    Fire: 5
};

function Grenade(nade, type) {

    this.ExtendDataWithLerpedTrajectory = function() {
        this.Nade["LerpedTrajectory"] = [];
        let lerped = [];

        for(let idx = 0; idx < this.Nade.Trajectory.length; idx++) {
            let point = this.Nade.Trajectory[idx];
            if ( this.Nade.Trajectory[idx + 1] ) {
                let nextPoint = this.Nade.Trajectory[idx + 1];

                var lerp_t = d3.interpolateNumber(point.Time, nextPoint.Time);
                var lerp_x = d3.interpolateNumber(point.X, nextPoint.X);
                var lerp_y = d3.interpolateNumber(point.Y, nextPoint.Y);
                
                for ( var i = 0; i < 20; i++ ) {
                    lerped.push({
                        Time: lerp_t(i / 20),
                        X: lerp_x(i / 20),
                        Y: lerp_y(i / 20)                        
                    });
                }
            }
    
            this.Nade.LerpedTrajectory = lerped;
        }
    };

    var _self = this;
    var twoInstance = DemoViewer.TwoInstance;

    this.TwoObject_OnDetonate = null;
    this.TwoObject_Projectile = null;
    this.TwoObject_Text = null;

    this.Nade = nade;
    this.Type = type;
    this.VisibileFor = 0; //ms    
    this.AddedEvents = false;

    this.ExtendDataWithLerpedTrajectory();

    this.Nade.DetonationLocation = this.Nade.LerpedTrajectory[this.Nade.LerpedTrajectory.length - 1];
    this.TwoObject_Projectile = twoInstance.makeCircle(0, 0, 7);
    this.TwoObject_Projectile.fill = "rgba(255, 0, 255, 0.8)";
    this.TwoObject_Projectile.stroke = "none";
    this.TwoObject_Projectile.visible = false;

    console.log(nade, type);

    if ( this.Type == GrenadeType.Smoke ) {
        this.VisibileFor = 18000; //18 seconds        

        this.TwoObject_OnDetonate = twoInstance.makeCircle(0, 0, 30);
        this.TwoObject_OnDetonate.fill = "rgba(255, 255, 255, 0.8)";
        this.TwoObject_OnDetonate.stroke = "none";
        this.TwoObject_OnDetonate.translation.SetPositionAdjusted(
            this.Nade.DetonationLocation.X,
            this.Nade.DetonationLocation.Y
        );

        this.TwoObject_Text = twoInstance.makeText(this.VisibileFor / 1000 + 's', 0, 0);
        this.TwoObject_Text.fill = "black";
        this.TwoObject_Text.noStroke();
        this.TwoObject_Text.translation.SetPositionAdjusted(
            this.Nade.DetonationLocation.X,
            this.Nade.DetonationLocation.Y + 1
        );

        this.TwoObject_Text.visible = false;

    } else if ( this.Type == GrenadeType.Flash ) {
        this.VisibileFor = 500; //0.5 seconds

        var circle = twoInstance.makeCircle(0, 0, 50);

        circle.fill = "rgba(255, 255, 255, 0.8)";
        circle.stroke = "none";

        var icon = twoInstance.makeText("e", 2, 2);
        icon.family = "csgo_icons";
        icon.fill = "#555";
        icon.size = 40;

        this.TwoObject_OnDetonate = twoInstance.makeGroup(circle, icon);

        this.TwoObject_OnDetonate.translation.SetPositionAdjusted(
            this.Nade.DetonationLocation.X,
            this.Nade.DetonationLocation.Y
        );

    } else if ( this.Type == GrenadeType.HE ) {
        this.VisibileFor = 500; //0.5 seconds

        var circle = twoInstance.makeCircle(0, 0, 30);

        circle.fill = "rgba(255, 0, 0, 0.5)";
        circle.stroke = "none";

        var icon = twoInstance.makeText("b", 2, 2);
        icon.family = "csgo_icons";
        icon.fill = "white";
        icon.size = 40;

        this.TwoObject_OnDetonate = twoInstance.makeGroup(circle, icon);

        this.TwoObject_OnDetonate.translation.SetPositionAdjusted(
            this.Nade.DetonationLocation.X,
            this.Nade.DetonationLocation.Y
        );        
    };    

    this.UpdateProjectile = function(t) {
        let currentPoint = {
            X: 0,
            Y: 0,
            Time: 0
        };

        for (let i = 0; i < this.Nade.LerpedTrajectory.length; i++) {
            let point = this.Nade.LerpedTrajectory[i];
            if (t >= point.Time) {
                currentPoint = point;
            }
        }

        this.TwoObject_Projectile.visible = currentPoint.Time > 0 && t <= this.Nade.DetonationLocation.Time;
        if (this.TwoObject_Projectile.visible) {
            this.TwoObject_Projectile.translation.SetPositionAdjusted(
                currentPoint.X,
                currentPoint.Y
            );

            this.TwoObject_Projectile.translation.trigger(Two.Events.change);
        }
    };

    this.InternalUpdate = function(t) {
        if (!_self.AddedEvents && type == GrenadeType.Smoke) {
            var elem = this.TwoObject_OnDetonate._renderer.elem;
            if (elem) {
                this.TwoObject_OnDetonate._renderer.elem.addEventListener('mouseenter', function() {
                    _self.TwoObject_Text.visible = true;
                });
                this.TwoObject_OnDetonate._renderer.elem.addEventListener('mouseleave', function() {
                    _self.TwoObject_Text.visible = false;
                });
    
                _self.AddedEvents = true;
            }
        }

        this.UpdateProjectile(t);

        _self.TwoObject_OnDetonate.visible = 
            t >= _self.Nade.DetonationLocation.Time && t <= _self.Nade.DetonationLocation.Time + this.VisibileFor;

        if (_self.TwoObject_OnDetonate.visible && _self.TwoObject_Text) {
            _self.TwoObject_Text.value = ((_self.Nade.DetonationLocation.Time + this.VisibileFor - t) / 1000).toFixed(1) + 's';
        }
    };
}