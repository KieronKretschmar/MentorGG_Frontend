var GrenadeType = {
    Smoke: 1,
    HE: 2,
    Flash: 3,
    Decoy: 4,
    Fire: 5
};

function Grenade(nade, type) {
    var _self = this;
    var twoInstance = DemoViewer.TwoInstance;

    this.TwoObject_OnDetonate = null;
    this.TwoObject_Projectile = null;
    this.TwoObject_Text = null;

    this.Nade = nade;
    this.Type = type;
    this.VisibileFor = 0; //ms    
    this.AddedEvents = false;

    if ( this.Type == GrenadeType.Smoke ) {
        this.VisibileFor = 18000; //18 seconds

        this.TwoObject_OnDetonate = twoInstance.makeCircle(0, 0, 30);
        this.TwoObject_OnDetonate.fill = "rgba(255, 255, 255, 0.8)";
        this.TwoObject_OnDetonate.stroke = "none";
        this.TwoObject_OnDetonate.translation.SetPositionAdjusted(
            this.Nade.GrenadePos.PosX,
            this.Nade.GrenadePos.PosY
        );

        this.TwoObject_Text = twoInstance.makeText(this.VisibileFor / 1000 + 's', 0, 0);
        this.TwoObject_Text.fill = "black";
        this.TwoObject_Text.noStroke();
        this.TwoObject_Text.translation.SetPositionAdjusted(
            this.Nade.GrenadePos.PosX,
            this.Nade.GrenadePos.PosY + 1
        );

        this.TwoObject_Text.visible = false;

    } else if ( this.Type == GrenadeType.Flash ) {
        this.VisibileFor = 500; //0.1 seconds

        var circle = twoInstance.makeCircle(0, 0, 50);

        circle.fill = "rgba(255, 255, 255, 0.8)";
        circle.stroke = "none";

        var icon = twoInstance.makeText("e", 2, 2);
        icon.family = "csgo_icons";
        icon.fill = "#555";
        icon.size = 40;

        this.TwoObject_OnDetonate = twoInstance.makeGroup(circle, icon);

        this.TwoObject_OnDetonate.translation.SetPositionAdjusted(
            this.Nade.GrenadePos.PosX,
            this.Nade.GrenadePos.PosY
        );
    } else if ( this.Type == GrenadeType.HE ) {
        this.VisibileFor = 500; //0.1 seconds

        var circle = twoInstance.makeCircle(0, 0, 30);

        circle.fill = "rgba(255, 0, 0, 0.5)";
        circle.stroke = "none";

        var icon = twoInstance.makeText("b", 2, 2);
        icon.family = "csgo_icons";
        icon.fill = "white";
        icon.size = 40;

        this.TwoObject_OnDetonate = twoInstance.makeGroup(circle, icon);

        this.TwoObject_OnDetonate.translation.SetPositionAdjusted(
            this.Nade.GrenadePos.PosX,
            this.Nade.GrenadePos.PosY
        );        
    }

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

        _self.TwoObject_OnDetonate.visible = 
            t >= _self.Nade.DetonationTime && t <= _self.Nade.DetonationTime + this.VisibileFor;

        if (_self.TwoObject_OnDetonate.visible && _self.TwoObject_Text) {
            _self.TwoObject_Text.value = ((_self.Nade.DetonationTime + this.VisibileFor - t) / 1000).toFixed(1) + 's';
        }
    };
}