function Player() {
    var self = this;

    this.Id = '';
    this.Name = '';
    this.MoneyInitial = 0;
    this.MoneyCurrent = this.MoneyInitial;
    this.MoneySpent = 0;
    this.IsCT = false;
    this.Positions = null;
    this.PositionIndex = 0;
    this.Damages = [];
    this.WeaponFireds = [];
    this.Flasheds = [];
    this.Initialized = false;
    this.Health = 100;
    this.NoseScale = 0;
    this.ActiveWeapon = 0;
    this.LastGotHitTime = 0;
    this.LastHitTime = 0;
    this.LastAttackTime = 0;

    this.$PlayerEntry = {};

    this.RenderObject = {
        Main: null,
        BaseCircle: DemoViewer.TwoInstance.makeCircle(0, 0, DemoViewer.Config.Player.Radius),
        HitLine: DemoViewer.TwoInstance.makeRectangle(0, 0, 0, 2),
        HitMarker: DemoViewer.TwoInstance.makeCircle(0, 0, DemoViewer.Config.Player.HitmarkerRadius),
        Name: DemoViewer.TwoInstance.makeText(this.Name, 0, 0),
        Nose: null
    };
    
    this.Initialize = function() {        
        self.CreatePlayerEntry();
        self.ConfigureRenderObject();     
        self.Initialized = true;   
    };

    this.GetTeamColor = function(flashed) {
        if ( self.IsCT ) {
            return flashed ? DemoViewer.Config.Colors.CT.Flashed 
                : DemoViewer.Config.Colors.CT.Default;
        }

        return flashed ? DemoViewer.Config.Colors.T.Flashed 
            : DemoViewer.Config.Colors.T.Default;
    };

    this.SetName = function(name) {        
        self.RenderObject.Name.value = self.Name = name;
    };

    this.CreatePlayerEntry = function() {
        var template = $('#player-entry-template').html();
        var $playerList = $('#player-list');
        var $teamList = $($playerList.find('.' + (self.IsCT ? 'ct' : 't'))[0]);

        var $entry = $(template).appendTo($teamList);
        
        self.$PlayerEntry = {
            Root: $entry,
            HpName: $($entry.find('.hp-name')[0]),
            Hp: $($entry.find('.hp')[0]),
            HpBar: $($entry.find('.hp-bar')[0]),
            Name: $($entry.find('.name')[0]),
            Eq: $($entry.find('.eq')[0]),
            Main: $($entry.find('.main')[0]),
            MoneySpent: $($entry.find('.spent')[0]),
            MoneyCurrent: $($entry.find('.current')[0]),
            Kills: $($entry.find('.kills')[0]),
            Assists: $($entry.find('.assists')[0]),
            Deaths: $($entry.find('.deaths')[0]),
        };

        self.UpdatePlayerEntry();
    };

    this.UpdatePlayerEntry = function() {
        var t = DemoViewer.DemoPlayer.GetProgress();

        self.$PlayerEntry.Root.attr('alive', self.Health > 0);
        self.$PlayerEntry.Name.html(self.Name);
        self.$PlayerEntry.Hp.html(self.Health > 0 ? self.Health : '');
        self.$PlayerEntry.HpBar.css('width', self.Health + '%');

        var roundData = DemoViewer.GetRoundData();

        //Get Scoreboard Info
        var scoreboardEntry = roundData.PartialScoreboard.PartialPlayerScores[self.Id];

        var additionalKills = 0;
        var additionalAssists = 0;
        var additionalDeaths = 0;

        for (var idx in roundData.Kills) {
            var kill = roundData.Kills[idx];
            if (kill.Time > t) {
                continue;
            }

            if (kill.PlayerId == self.Id) {
                additionalKills++;
                continue;
            }

            if (kill.AssisterId == self.Id) {
                additionalAssists++;
                continue;
            }

            if (kill.VictimId == self.Id) {
                additionalDeaths++;
                continue;
            }
        }

        self.$PlayerEntry.Kills.html(scoreboardEntry.Kills + additionalKills);
        self.$PlayerEntry.Assists.html(scoreboardEntry.Assists + additionalAssists);
        self.$PlayerEntry.Deaths.html(scoreboardEntry.Deaths + additionalDeaths);

    };

    this.ConfigureRenderObject = function() {
        self.RenderObject.BaseCircle.fill = self.GetTeamColor();
        self.RenderObject.BaseCircle.linewidth = 0.5;
        self.RenderObject.BaseCircle.stroke = '#333';

        self.RenderObject.HitLine.stroke = "orange";
        self.RenderObject.HitLine.fill = "orange";
        self.RenderObject.HitLine.visible = false;

        self.RenderObject.HitMarker.noStroke();
        self.RenderObject.HitMarker.fill = DemoViewer.TwoInstance.makeRadialGradient(
            0, 0,
            DemoViewer.Config.Player.HitmarkerRadius * 2,
            new Two.Stop(0, 'rgba(255, 0, 0, 1)', 1),
            new Two.Stop(0.5, 'rgba(255, 0, 0, 0)', 0)
        );
        self.RenderObject.HitMarker.visible = false;

        self.RenderObject.Name.text = self.Name;
        self.RenderObject.Name.fill = "white";

        DemoViewer.TwoInstance.load($('#player-icon').html(), function(e, svg) {
            self.RenderObject.Nose = e;
            self.RenderObject.Nose.scale = 
                self.NoseScale = 1 / 5 * DemoViewer.Config.Player.Radius;        
            self.RenderObject.Nose.translation.set(0, -DemoViewer.Config.Player.Radius);
            self.RenderObject.Nose.fill = self.GetTeamColor();
            self.RenderObject.Nose.stroke = "#333";
            self.RenderObject.Nose.linewidth = 0.5;
        });        

        //Not including name here to prevent rotation
        self.RenderObject.Main = DemoViewer.TwoInstance.makeGroup(
            self.RenderObject.HitMarker,
            self.RenderObject.Nose,
            self.RenderObject.BaseCircle,
            self.RenderObject.HitLine,
        );

        self.UpdateTransform(0, true);
    };

    this.UpdateTransform = function(t, forceFirst) {
        for (var i = self.PositionIndex; i < self.Positions.length; i++) {
            var pos = self.Positions[i];
            if (t > pos.Time || forceFirst) {
                self.PositionIndex = i;                
                self.RenderObject.Main.translation.SetPositionAdjusted(pos.PosX, pos.PosY);
                self.RenderObject.Main.rotation = pos.View;

                self.RenderObject.Name.translation.SetPositionAdjusted(pos.PosX, pos.PosY - 20);
                self.RenderObject.Name.translation.trigger(Two.Events.change);
                self.ActiveWeapon = pos.Weapon;

                if ( forceFirst )
                    break;
            }
        }
    };

    this.UpdateHealth = function(t) {
        var baseHealth = 100;

        for (var i = 0; i < self.Damages.length; i++) {
            var dmg = self.Damages[i];
            if (t > dmg.Time) {
                baseHealth -= dmg.AmountHealth;

                //Hit has happened, check how long ago
                //If it *just* happened, display hitline
                //TODO: Check if weapon is actually something that outputs bullets
                if(t < dmg.Time + DemoViewer.Config.Player.HitLineVisibleTime) {
                    self.ShowHitMarker(t);

                    //Invoke hitline on other player
                    DemoViewer.PlayerList.GetPlayerById(dmg.PlayerId).ShowHitLine(dmg);
                }
            }
        }

        baseHealth = baseHealth.Clamp(0, 100);
        if (self.Health != baseHealth) {
            self.Health = baseHealth;
            self.UpdatePlayerEntry();
        }
    };

    this.UpdateFlashState = function(t) {
        var isFlashed = false;
        var roundData = DemoViewer.GetRoundData();
        var flasheds = roundData.Flasheds[self.Id];
        if (flasheds == null)
            return;

        for ( var i = 0; i < flasheds.length; i++ ) {
            var flashed = flasheds[i];
            if (t > flashed.Time && t < flashed.Time + flashed.TimeFlashed ) {
                isFlashed = true;
                break;
            }
        }

        self.RenderObject.BaseCircle.fill = self.GetTeamColor(isFlashed);
    };

    this.UpdateAttackState = function(t) {
        for (var i = 0; i < self.WeaponFireds.length; i++) {            
            var fired = self.WeaponFireds[i];
            if (t > fired.Time && t < fired.Time + DemoViewer.Config.Player.AttackVisibleTime) {
                self.Attack(t);
            }
        }
    };

    this.ShowHitMarker = function(t) {
        self.LastGotHitTime = t;
        self.RenderObject.HitMarker.visible = true;
    };

    this.ShowHitLine = function(hit) {
        var vec2 = new Two.Vector(
            hit.VictimPos.PosX,
            hit.VictimPos.PosY
        );

        //Connect hit to victim
        var victim = DemoViewer.PlayerList.GetPlayerById(hit.VictimId);
        var dist = self.RenderObject.Main.translation.distanceTo(victim.RenderObject.Main.translation);

        self.RenderObject.HitLine.width = dist - DemoViewer.Config.Player.Radius * 2;
        self.RenderObject.HitLine.translation.x = DemoViewer.Config.Player.Radius * 2 + self.RenderObject.HitLine.width / 2;
        self.RenderObject.HitLine.visible = true;
        self.LastHitTime = hit.Time;
    };

    this.Attack = function(t) {
        self.LastAttackTime = t;
        self.RenderObject.Nose.fill = "#FFFACD";
        self.RenderObject.Nose.translation.x = 3;
    };

    this.UpdateInventory = function(t) {
        var roundData = DemoViewer.GetRoundData();
        var itemData = {
            Saved: roundData.ItemSaveds[self.Id],
            PickedUp: roundData.ItemPickedUps[self.Id],
            Dropped: roundData.ItemDroppeds[self.Id]
        };

        var inventory = {};
        var WrapInSpan = function(s, active, additionalClasses) {
            additionalClasses = additionalClasses || '';
            return '<span class="' + ((active ? 'active' : 'inactive') 
                + ' ' + additionalClasses) + '">' + s + '</span>';
        };

        self.MoneyCurrent = self.MoneyInitial;
        self.MoneySpent = 0;

        if ( itemData.Saved ) {
            for (var i = 0; i < itemData.Saved.length; i++) {
                var saved = itemData.Saved[i];

                
                if (inventory[saved.Equipment]) {
                    inventory[saved.Equipment]++;
                } else {
                    inventory[saved.Equipment] = 1;
                }
            }
        }

        if ( itemData.PickedUp ) {
            for (var i = 0; i < itemData.PickedUp.length; i++) {
                var pickup = itemData.PickedUp[i];                
                if (t > pickup.Time) {
                    if (inventory[pickup.Equipment]) {
                        inventory[pickup.Equipment]++;
                    } else {
                        inventory[pickup.Equipment] = 1;
                    }

                    if ( pickup.Buy ) {
                        var price = DemoViewer.Helper.GetEquipmentPrice(pickup.Equipment);
                        self.MoneyCurrent -= price;
                        self.MoneySpent += price;
                    }
                }
            }
        }

        if ( itemData.Dropped ) {
            for (var i = 0; i < itemData.Dropped.length; i++) {
                var drop = itemData.Dropped[i];
                if (t > drop.Time) {
                    if (inventory[drop.Equipment]) {
                        inventory[drop.Equipment]--;
                    } else {
                        inventory[drop.Equipment] = -1;
                    }
                }
            }
        }

        var inventoryString = '<div>';

        //Add armor icon
        if (inventory[403] >= 1) {
            inventoryString += WrapInSpan(DemoViewer.Helper.EquipmentIdToFontCharacter(403), true);
        } else {
            inventoryString += WrapInSpan(
                DemoViewer.Helper.EquipmentIdToFontCharacter(402), 
                inventory[402] >= 1
            );
        }         
        
        //Add kit icon
        if ( self.IsCT ) {
            inventoryString += WrapInSpan(
                DemoViewer.Helper.EquipmentIdToFontCharacter(406), 
                inventory[406] >= 1
            );
        //Add bomb icon
        } else {
            inventoryString += WrapInSpan(
                DemoViewer.Helper.EquipmentIdToFontCharacter(404), 
                inventory[404] >= 1
            );
        }
        
        //Add knife icon
        inventoryString += WrapInSpan(
            DemoViewer.Helper.EquipmentIdToFontCharacter(405), 
            self.ActiveWeapon == 405
        );    

        //Add grenades
        [501, 502, 503, 504, 505, 506].forEach(function(e) {
            if (inventory[e] >= 1) {
                for ( var i = 0; i < inventory[e]; i++ ) {
                    inventoryString += WrapInSpan(
                        DemoViewer.Helper.EquipmentIdToFontCharacter(e),
                        self.ActiveWeapon == e
                    );
                }
            }
        });

        //Check for the real pros
        if ( inventory[401] >= 1 ) { //Zeus
            inventoryString += WrapInSpan(
                DemoViewer.Helper.EquipmentIdToFontCharacter(401),
                self.ActiveWeapon == 401
            );
        }

        inventoryString += '</div><div>';

        var primary_and_pistol = DemoViewer.Helper.GetPrimaryAndPistolFromInventory(inventory);
        var main = 405; //default to knife

        if (primary_and_pistol.Primary == null) {
            if ( primary_and_pistol.Pistol != null ) {
                main = primary_and_pistol.Pistol;
            }
        } else {
            main = primary_and_pistol.Primary;
            if ( primary_and_pistol.Pistol != null ) {
                inventoryString += WrapInSpan(
                    DemoViewer.Helper.EquipmentIdToFontCharacter(primary_and_pistol.Pistol),
                    self.ActiveWeapon == primary_and_pistol.Pistol
                );
            }
        }

        inventoryString += '</div>';

        self.$PlayerEntry.Eq.html(inventoryString);
        self.$PlayerEntry.MoneySpent.html(self.MoneySpent);
        self.$PlayerEntry.MoneyCurrent.html(self.MoneyCurrent);
        self.$PlayerEntry.MoneySpent.toggle(self.MoneySpent != 0);           

        self.$PlayerEntry.Main.html(WrapInSpan(
            DemoViewer.Helper.EquipmentIdToFontCharacter(main),
            self.ActiveWeapon == main
        ));
    };

    this.InternalUpdate = function(t) {
        if (!self.Initialized) {
            self.Initialize();
        }

        self.UpdateTransform(t);
        self.UpdateHealth(t);
        self.UpdateAttackState(t);
        self.UpdateInventory(t);
        self.UpdateFlashState(t);

        //Hide player if dead
        self.RenderObject.Main.scale =
            self.RenderObject.Name.visible =
                self.Health > 0 ? 1 : 0;

        //Hide hitline after visible time has elapsed
        if ( (t - self.LastHitTime) >= DemoViewer.Config.Player.HitLineVisibleTime 
            || (t < self.LastHitTime) ) //Mitigate if player was rewinded
        {
            self.RenderObject.HitLine.visible = false;
        }

        //Hide hitmarker after visible time has elapsed
        if ( (t - self.LastGotHitTime) >= DemoViewer.Config.Player.HitMarkerVisibleTime 
            || (t < self.LastGotHitTime) ) //Mitigate if player was rewinded
        {
            self.RenderObject.HitMarker.visible = false;
        }

        //Retint nose after firing animation is over
        if ( (t - self.LastAttackTime) >= DemoViewer.Config.Player.AttackVisibleTime 
            || (t < self.LastAttackTime) ) //Mitigate if player was rewinded
        {
            self.RenderObject.Nose.fill = self.GetTeamColor();
            self.RenderObject.Nose.translation.x = 0;
        }       

    };

    this.ResetCache = function() {
        self.PositionIndex = 0;
    };
}