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

      ToString(n) {
        switch (n) {
          case 1: return "Free";
          case 2: return "Premium";
          case 3: return "Ultimate";
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
}

export default Enums;
