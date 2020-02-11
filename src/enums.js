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
}

export default Enums;
