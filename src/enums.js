class Enums {
  static get SampleType() {
    return {
      Molotov: 1,
      Flash: 2,
      HE: 3,
      Smoke: 4,
      Kill: 5,
      Bomb: 6,
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
      Low: 1,
      Medium: 2,
      High: 3,
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
}

export default Enums;
