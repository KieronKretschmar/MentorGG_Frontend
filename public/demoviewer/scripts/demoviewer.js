// Acts as a singleton and is statically accessible through window.DemoViewer
function __DemoViewer() {
    var self = this;

    /* config */
    this.Config = {
        Colors: {
            T: {
                Default: '#feec7c',
                Flashed: '#fffae0'
            },
            CT: {
                Default: '#7191cc',
                Flashed: '#dde9ff'
            }
        },
        Player: {
            Radius: 7,
            HitmarkerRadius: 12,
            HitLineVisibleTime: 100, //ms
            HitMarkerVisibleTime: 100, //ms
            AttackVisibleTime: 50, //ms
        }
    };

    /* vars */
    this.Data = null;
    this.PlayerList = new PlayerList();
    this.Grenades = [];
    this.Bomb = null;

    this.DemoPlayer = null;
    this.LastHandledTick = 0;

    this.TwoInstance = null;

    this.$DemoView = $('#demo-view');
    this.LoadingData = false;

    /* funcs */
    this.SetData = function(data) {
        self.Data = data;
        console.log(data);

        self.UpdateMapImage();
        self.UpdateRoundDisplay();        
        self.InitializeDemoPlayer();
        self.InitializeTwoEngineInstance();        
        self.ExtendDataWithLerpedPlayerPositions();
        
        self.PlayerList.InitializePlayers(data);
        self.InitializeGrenades(data);
        self.IntializeBomb(data);
        self.InitializeEventTimeline();
    };

    this.GetRoundData = function() {
        return self.Data.Round;
    };
    
    this.UpdateMapImage = function() {
        self.$DemoView.css('background-image', "url('" + self.Data.ImageUrl.replace("~", "") + "')");
    };

    this.InitializeDemoPlayer = function() {
        self.DemoPlayer = new DemoPlayer();
        self.DemoPlayer.Initialize(
            self.Data.Round.RoundStats.StartTime,
            self.Data.Round.RoundStats.RealEndTime
        );        
    };

    this.IntializeBomb = function(data) {
        //TODO: Delete two objects
        var plant = data.Round.BombPlant;
        if (plant != null) {

            var defuseTime = data.Round.BombDefused ? data.Round.BombDefused.Time : null;

            self.Bomb = new Bomb(
                plant.Pos.PosX, 
                plant.Pos.PosY, 
                plant.Time, 
                defuseTime, 
                data.MatchStats.BombTimer
            );
        }
    };

    this.InitializeGrenades = function(data) {
        //TODO: Delete two objects
        //TODO: Add decoys, HEs and molotovs/incendiaries
        self.Grenades = [];

        for ( var idx in data.Round.Flashes ) {
            var flash = data.Round.Flashes[idx];
            self.Grenades.push(new Grenade(flash, GrenadeType.Flash));
        }

        for ( var idx in data.Round.Smokes ) {
            var smoke = data.Round.Smokes[idx];
            self.Grenades.push(new Grenade(smoke, GrenadeType.Smoke));
        }
    };

    this.InitializeTwoEngineInstance = function() {
        if ( !self.TwoInstance ) {
            var r = self.RecalculatePlayerBounds();
    
            self.TwoInstance = new Two({
                width: r,
                height: r,
                type: Two.Types.svg
            })
            .appendTo(this.$DemoView[0]);    
        }
        
        self.TwoInstance.bind('update', function(frameCount) {
            self.EventThread();
        }).play();

        var roundDisplayWidth = window.innerWidth - $('#pl').width() - 200;
        var numSlidesToShow = parseInt(roundDisplayWidth / 40);

        $('#round-display').css('width', roundDisplayWidth + 'px');
        $('#round-display').slick({
            slidesToShow: numSlidesToShow,
            slidesToScroll: 5,
            swipeToSlide: false,
            arrows: true,
            infinite: false,
            prevArrow: $('#rd-prev'),
            nextArrow: $('#rd-next'),
            centerMode: false
        });

        $('.scrollbar-outer').scrollbar();

        $(window).off('resize').on('resize', function() {
            if (self.TwoInstance != null ) {
                self.TwoInstance.width = 
                    self.TwoInstance.height = self.RecalculatePlayerBounds();
            }

            var newRoundDisplayWidth = window.innerWidth - $('#pl').width() - 200;

            $('#round-display').css('width', newRoundDisplayWidth + 'px');
            $('#round-display').slick('slickSetOption', {
                slidesToShow: parseInt(newRoundDisplayWidth / 40)
            }, true);
        });
    };

    this.InitializeEventTimeline = function() {
        for(var idx in self.Data.Round.Kills) {
            var kill = self.Data.Round.Kills[idx];
            var victim = self.PlayerList.GetPlayerById(kill.VictimId);
            var html = '<div class="event-kill" team="' 
                + (victim.IsCT ? 'ct' : 't') + '"style="left: ' 
                + self.DemoPlayer.GetRelativeLeftOffsetForTimestamp(kill.Time) + '%;"></div>';
    
            $('.range-wrapper').append(html);
        }

        if ( self.Data.Round.BombPlant != null ) {
            var plant = self.Data.Round.BombPlant;
            var html = '<div class="event-bomb-plant" style="left: ' 
                + self.DemoPlayer.GetRelativeLeftOffsetForTimestamp(plant.Time) + '%;">';

            html += plant.Site == 1 ? 'A' : 'B';
            html += '</div>';

            $('.range-wrapper').append(html);
        }
    };

    this.EventThread = function() {
        var t = self.DemoPlayer.GetProgress();
        var s = self.DemoPlayer.GetActualSpeed();

        //Account for rewind and reset
        //and
        //Run internal update on all players
        self.PlayerList.EachPlayer(function(player) {
            if (t < self.LastHandledTick) {
                player.ResetCache();
            }

            player.InternalUpdate(t);
        });

        for ( var idx in self.Grenades ) {
            self.Grenades[idx].InternalUpdate(t);
        }

        if (self.Bomb != null) {
            self.Bomb.InternalUpdate(t);
        }

        self.UpdateRoundTime(t);
        self.UpdateKillFeed(t);

        self.LastHandledTick = t;
    };    

    this.RecalculatePlayerBounds = function() {
        var availableWidth = window.innerWidth;
        var availableHeight = window.innerHeight - $('#demo-player').outerHeight();
        var requiredWidthForPlayerlist = 600; //px
        var requiredWidthForSlideButton = 20; //px
        var r = 0;

        if ( availableWidth < availableHeight ) {
            //portait modus, lets have the playerlist slidable
            r = availableWidth - requiredWidthForSlideButton;

        } else {
            //check if enough width is left for the playerlist to fit
            if ( availableWidth - availableHeight >= requiredWidthForPlayerlist ) {
                //all good, proceed like normal
                r = availableHeight;

            } else {
                //not enough width left, lets have it slidable
                r = availableHeight - requiredWidthForSlideButton;
            }
        }

        $('#demo-view').css({
            width: r,
            height: r
        });
    
        $('#demo-player').outerWidth(r);
    
        return r;
    };

    //TODO: Cache jQuery selectors
    this.UpdateKillFeed = function(t) {
        var kills = '';

        for (var idx in self.Data.Round.Kills) {
            var kill = self.Data.Round.Kills[idx];
            if (t > kill.Time && t - kill.Time < 3000) {
                var killer = self.PlayerList.GetPlayerById(kill.PlayerId);
                var victim = self.PlayerList.GetPlayerById(kill.VictimId);
                var assist = '';

                if ( kill.AssisterId != '' ) {
                    var assister = self.PlayerList.GetPlayerById(kill.AssisterId);
                    assist += '<span class="assister" team="' + (assister.IsCT ? 'ct' : 't') + '"> + ';
                    assist += assister.Name + '</span>';
                }

                kills += '<div class="kill">';
                kills += '<span class="player" team="' + (killer.IsCT ? 'ct' : 't') + '">' + killer.Name + assist + '</span>';
                kills += '<span class="weapon">' + self.Helper.EquipmentIdToFontCharacter(kill.Weapon) + '</span>';
                kills += '<span class="victim" team="' + (victim.IsCT ? 'ct' : 't') + '">' + victim.Name + '</span>';
                kills += '</div>';
            }
        }

        $('#kill-feed').html(kills);
    };

    //TODO: Cache jQuery selectors into vars
    this.UpdateRoundTime = function(t) {
        var seconds = self.Data.MatchStats.RoundTimer;
        var delta_s = (self.DemoPlayer.Cur - self.DemoPlayer.Min) / 1000;
        var timestring = '';
        var freeze_time = 15; //TODO: Get freezime from server

        if (delta_s < freeze_time) { 
            timestring = '0:' + (freeze_time - parseInt(delta_s)).PadDigit();
            $('#round-time p').html('freeze time');

            $('#round-time div').hide();

        } else {
            if (self.Data.Round.BombPlant != null && t > self.Data.Round.BombPlant.Time) {
                var bomb_time = self.Data.MatchStats.BombTimer;
                var bomb_delta = 1 + bomb_time - (t - self.Data.Round.BombPlant.Time) / 1000;

                var minutes = Math.floor(bomb_delta / 60);
                minutes = minutes < 0 ? 0 : minutes;
                var seconds = Math.floor(bomb_delta % 60);
                seconds = seconds < 0 ? 0 : seconds;

                timestring = minutes + ':' + seconds.PadDigit();

                $('#round-time div').show();

            } else {
                var curtime = 1 + seconds - delta_s + freeze_time;
                var minutes = Math.floor(curtime / 60);
                minutes = minutes < 0 ? 0 : minutes;
                var seconds = Math.floor(curtime % 60);
                seconds = seconds < 0 ? 0 : seconds;
    
                timestring = minutes + ':' + seconds.PadDigit();

                $('#round-time div').hide();
            }
            
            $('#round-time p').html('round time');
        }


        $('#round-time span').html(timestring);
    };

    this.UpdateRoundDisplay = function() {
        var round = self.Data.Round;
        var rounds_team1 = round.PartialScoreboard.CtRounds;
        var rounds_team2 = round.PartialScoreboard.TerroristRounds;
        var cur = rounds_team1 + rounds_team2 + 1;
        var max = self.Data.RoundSummaries.length;

        $('#team-display .wrapper .score').html(rounds_team1 + ' : ' + rounds_team2);

        // var $textCur = $('#round-num .text-cur');
        var roundDisplayEntries = '';
        var teamScores = {
            '2': 0,
            '3': 0
        };

        for (var idx in self.Data.RoundSummaries) {
            var summary = self.Data.RoundSummaries[idx];
            var itemClass = summary.Round < cur ? 'past' : '';

            if ( summary.Round == cur ) {
                itemClass = 'active';
            }

            var winnerTeam = summary.WinnerTeam;

            if ( summary.Round >= 16 ) {
                if (winnerTeam == 2) {
                    winnerTeam = 3;
                } else {
                    winnerTeam = 2;
                }
            }

            
            if ( summary.Round == 16 ) {
                roundDisplayEntries += '<div class="round-entry round-switch ' + (summary.Round < cur ? 'past' : '') + '">'
                + '<span>' + teamScores[2] + '</span>'
                + '<i class="fas fa-random"></i>'
                + '<span>' + teamScores[3] + '</span></div>';
            }
            
            roundDisplayEntries += '<div class="' + itemClass + ' round-entry" data-winner="' 
            + winnerTeam + '" data-win-type="' + summary.WinType + '" title="Click to load this round">';
            roundDisplayEntries += summary.Round + '</div>';            

            teamScores[summary.WinnerTeam]++;
        }

        roundDisplayEntries += '<div class="round-entry final-result">' 
            + '<span>' + teamScores[2] + '</span>'
            + '<i class="fas fa-trophy"></i></i>' 
            + '<span>' + teamScores[3] + '</span>'
            + '</div>';

        $('#round-display').html(roundDisplayEntries);      
    };

    this.ExtendDataWithLerpedPlayerPositions = function() {
        self.Data.Round["LerpedPositions"] = {};

        for(var playerId in self.Data.Round.PlayerPositions) {
            var entries = self.Data.Round.PlayerPositions[playerId];
            var lerped = [];

            for(var idx = 0; idx < entries.length; idx++) {
                var entry = entries[idx];
    
                if (entries[idx + 1]) {
                    var nextEntry = entries[idx + 1];
                    
                    if ( Math.abs(entry.PlayerView - nextEntry.PlayerView) > 180) {
                        if (entry.PlayerView < nextEntry.PlayerView) {
                            entry.PlayerView += 360;
                        } else {
                            nextEntry.PlayerView += 360;
                        }
                    }
    
                    var lerp_t = d3.interpolateNumber(entry.Time, nextEntry.Time);
                    var lerp_x = d3.interpolateNumber(entry.PlayerPos.PosX, nextEntry.PlayerPos.PosX);
                    var lerp_y = d3.interpolateNumber(entry.PlayerPos.PosY, nextEntry.PlayerPos.PosY);
                    var lerp_v = d3.interpolateNumber(-entry.PlayerView * (Math.PI / 180), -nextEntry.PlayerView * (Math.PI / 180));
                    
                    for ( var i = 0; i < 20; i++ ) {
                        lerped.push({
                            Time: lerp_t(i / 20),
                            PosX: lerp_x(i / 20),
                            PosY: lerp_y(i / 20),
                            View: lerp_v(i / 20),
                            Weapon: entry.Weapon
                        });
                    }
                }
            }
    
            self.Data.Round.LerpedPositions[playerId] = lerped;
        }
    };

    this.Reset = function() {
        this.DemoPlayer.Pause();
        this.PlayerList.Clear();
        this.TwoInstance.clear();
        this.TwoInstance.unbind('update', null);

        $('.event-bomb-plant').remove();
        $('.event-kill').remove();
    };

    this.Helper = {
        GetEquipmentInfo: function(equipmentId) {
            return self.Data.EquipmentInfo[equipmentId];
        },
        GetEquipmentPrice: function(equipmentId) {
            return self.Helper.GetEquipmentInfo(equipmentId).Price
        },
        GetPrimaryAndPistolFromInventory: function(inventory) {
            var ret = { Primary: null, Pistol: null };

            for( var equipmentId in inventory ) {
                var eq = self.Helper.GetEquipmentInfo(equipmentId);
                if (eq.WeaponClass == 'Pistol') {
                    ret.Pistol = eq.Type;
                    continue;
                }

                if (eq.WeaponClass == 'SubMachinegun' || eq.WeaponClass == 'Shotgun'
                    || eq.WeaponClass == 'Machinegun' || eq.WeaponClass == 'Rifle' 
                    || eq.WeaponClass == 'SniperRifle') 
                {
                    ret.Primary = eq.Type;
                }
            }

            return ret;
        },
        EquipmentIdToFontCharacter: function(equipmentId) {
            var mapping = {
                "1": "0",
                "2": "4",
                "3": "P",
                "4": "1",
                "5": "3",
                "6": "2",
                "7": "N",
                "8": "6",
                "9": "5",
                "10": "U",
                "101": "Q",
                "102": "R",
                "103": "J",
                "104": "A",
                "105": "H",
                "106": "T",
                "201": "M",
                "202": "S",
                "203": "K",
                "204": "I",
                "205": "G",
                "206": "L",
                "301": "E",
                "302": "C",
                "303": "Y",
                "304": "F",
                "305": "B",
                "306": "X",
                "307": "W",
                "308": "Z",
                "309": "d",
                "310": "V",
                "311": "D",
                "401": "O",
                "402": "h",
                "403": "i",
                "404": "a",
                "405": "c",
                "406": "j",
                "501": "8",
                "502": "9",
                "503": "7",
                "504": "e",
                "505": "g",
                "506": "b"
            };
        
            return mapping[equipmentId];
        }
    };
}

$(function() {
    window.DemoViewer = new __DemoViewer();
});