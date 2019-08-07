function PlayerList() {
    var self = this;

    this.Players = {};

    this.Clear = function() {
        self.Players = {};
    };

    this.InitializePlayers = function(data) {

        var round = data.Round;

        //Initially create player list
        for ( var idx in round.PlayerRoundStats ) {
            var stats = round.PlayerRoundStats[idx];     
            
            //filter out spectators because master117 isn't actually a master
            if ( !round.LerpedPositions[stats.PlayerId] ) {
                continue;
            }

            var player = new Player();            

            player.Id = stats.PlayerId;
            player.MoneyInitial = stats.MoneyInitial;
            player.IsCT = stats.IsCT;            
            player.Positions = round.LerpedPositions[player.Id];            

            self.Players[stats.PlayerId] = player;
        }

        //Iterate damage array and assign objects to victim
        for ( var i = 0; i < round.Damages.length; i++ ) {
            var damage = round.Damages[i];
            self.GetPlayerById(damage.VictimId).Damages.push(damage);
        }

        //Iterate weapon fired array and assign objects to firee
        for ( var idx in round.WeaponFireds ) {
            var fired = round.WeaponFireds[idx];
            self.GetPlayerById(fired.PlayerId).WeaponFireds.push(fired);
        }

        //Iterate flasheds array and assign objects to victim
        for ( var playerId in round.Flasheds ) {
            self.GetPlayerById(playerId).Flasheds = round.Flasheds[playerId];
        }

        for ( var idx in data.PlayerStats ) {
            var stats = data.PlayerStats[idx];
            var player =  self.GetPlayerById(idx);
            if (player == null) {
                continue;
            }

            player.SetName(stats.SteamName);
        }
    };

    this.GetPlayerById = function(id) {
        return self.Players[id] || null;
    };

    this.EachPlayer = function(fnForPlayer) {
        for ( var id in self.Players ) {
            if ( fnForPlayer ) fnForPlayer( self.Players[id] );
        }
    };
}