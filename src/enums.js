class Enums {
  static get SampleType() {
    return {
      Molotov: 1,
      Flash: 2,
      HE: 3,
      Smoke: 4,
      Kill: 5,
      Bomb: 6,

      ToString(n){
        switch (n) {
          case 1: return "Molotov";
          case 2: return "Flash";
          case 3: return "HE";
          case 4: return "Smoke";
          case 5: return "Kill";
          case 6: return "Bomb";
        }
        return "Unknown";
      }
    };

  }

  static get RadarViewTypes() {
    return {
      Sample: 1,
      Zone: 2,
      Lineup: 3,
    };
  }

  static get SubscriptionStatus() {
    return {
      Free: 1,
      Premium: 2,
      Ultimate: 3,
      Influencer: 4,

      // List of SubscriptionStatus values in order of access level
      // Free, Influencer, Premium, Ultimate
      StatusOrderedByAccessLevel: [1,4,2,3],

      GetAccessLevel(n){
        return this.StatusOrderedByAccessLevel.indexOf(n);
      },

      ToString(n) {
        switch (n) {
          case 1: return "Free";
          case 2: return "Premium";
          case 3: return "Ultimate";
          case 4: return "Supporter";
        }

        return "Unknown";
      }
    };
  }

  static get DemoViewerQuality() {
    return {
      Low: 10,
      Medium: 20,
      High: 30,

      ToString(n) {
        switch (n) {
          case 10: return "SD";
          case 20: return "MD";
          case 30: return "HD";
        }

        return "SD";
      }
    };
  }

  static get Source() {
    return {
      Unknown: 0,
      Valve: 1,
      Faceit: 2,
      ManualUpload: 3,
      Scrimmage: 4,
      HLTV: 5,
      Esea: 6,
      Cevo: 7,

      
      ToString(n) {
        switch (n) {
          case 0: return "Unknown";
          case 1: return "Valve";
          case 2: return "Faceit";
          case 3: return "Manual Upload";
          case 4: return "Scrimmage";
          case 5: return "HLTV";
          case 6: return "Esea";
          case 7: return "Cevo";
        }

        return "Unknown";
      }
    };
  }
  
  static get WinTieLoss() {
    return {
      Win: 1,
      Tie: 2,
      Loss: 3,

      
      ToString(n) {
        switch (n) {
          case 1: return "Win";
          case 2: return "Tie";
          case 3: return "Loss";
        }

        return "Unknown";
      }
    };
  }

  static get WinType() {
    return {
      Elimination: 0,
      Time: 1,
      Explosion: 2,
      Defuse: 3,
      HostageRescued: 4,
      Surrender: 5,
      Unknown: 6
    }
  }

  static get LineupAttemptResult() {
    return {
      Default: 0, // This is the default value of unrated smokes
      Inside: 10, // Inside Target, yet not gapfree. Does have some effect.
      Miss: 20, // Not in Target. This is bad.
      TargetWithoutLineUp: 30, //Hit a target without using a known lineup
      NoTarget: 40, //Has no lineup and didnt hit a target, but was analyzed

      
      ToString(n) {
        switch (n) {
          case 0: return "Unknown";
          case 10: return "Inside";
          case 20: return "Miss";
          case 30: return "TargetWithoutLineUp";
          case 40: return "NoTarget";
        }

        return "Unknown";
      }
    };
  }

  static get SkillDomain() {
    return {                        
        Tactical: 1,
        Grenades: 2,   
        Shooting: 3,   
        Movement: 4
    };
  }
  
  static get SituationType() {
    return {
      Unknown: 0,


      // 21XXXX For SinglePlayer - Highlights
      EffectiveHeGrenade: 210001,
      KillWithOwnFlashAssist: 210002,
      Clutch: 210003,
      HighImpactRound: 210004,
      MultiKill: 210005,

      // 22XXXX For Team - Highlights


      // 51XXXX For SinglePlayer - Misplays
      SmokeFail: 510001,
      DeathInducedBombDrop: 510002,
      SelfFlash: 510003,
      TeamFlash: 510004,
      RifleFiredWhileMoving: 510005,
      UnnecessaryReload: 510006,
      PushBeforeSmokeDetonated: 510007,
      BombDropAtSpawn: 510008,
      HasNotBoughtDefuseKit: 510009,

      // 52XXXX For Team - Misplays

      ToString(n) {
        for (let name in this) {
          if (this[name] == n) {
            return name;
          }
        }

        return "Unknown";
      },
      IsHighlight(n) {
        return n >= 210000 && n <= 230000;
      },
      IsMisplay(n) {
        return n >= 510000 && n <= 530000;
      }
    };
  }
}

export default Enums;
