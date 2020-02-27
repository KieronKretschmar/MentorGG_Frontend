class CoordinateConverter {
  IngameToPixel(vectorIngame, map){
    let params = this.GetParams(map);

    let vectorPixel = {
      X : vectorIngame.X * params.scaleX + params.offsetX,
      Y : vectorIngame.Y * params.scaleY + params.offsetY,
      Z : vectorIngame.Z,
    }
    return vectorPixel;
  }

  IngameToPixelX(xIngame, map){
    let params = this.GetParams(map);
    return xIngame * params.scaleX + params.offsetX;
  }

  IngameToPixelY(yIngame, map){
    let params = this.GetParams(map);
    return yIngame * params.scaleY + params.offsetY;
  }

  GetParams(map){
    let mapping = {
      "de_cache": {
        offsetX : 716.9593786668573,
        offsetY : 1150.7166208213423,
        scaleX : 0.3741527615508955,
        scaleY : -0.3772645857436684,
      },
      "de_dust2": {
        offsetX : 1093.3148983376227,
        offsetY : 1436.974257892092,
        scaleX : 0.4480289635591905,
        scaleY : -0.44830692699638897,
      },
      "de_inferno": {
        offsetX : 801.1092232503006,
        offsetY : 1603.5342721344582,
        scaleX : 0.4330465854846513,
        scaleY : -0.4317371960120799,
      },
      "de_mirage": {
        offsetX : 1284.2343428786808,
        offsetY : 617.7537631810812,
        scaleX : 0.468825312195594,
        scaleY : -0.4675282084445715,
      },
      "de_nuke": {
        offsetX : 926.0785341299603,
        offsetY : 770.5828442844129,
        scaleX : 0.291164872163678,
        scaleY : -0.292578108586069,
      },
      "de_overpass": {
        offsetX : 1654.4890373992737,
        offsetY : 690.8117698977478,
        scaleX : 0.3306648624282593,
        scaleY : -0.33211183476846334,
      },
      "de_train": {
        offsetX : 1045.7655987403582,
        offsetY : 995.2846229239615,
        scaleX : 0.45191794677104763,
        scaleY : -0.45080776027702124,
      },
      "de_vertigo": {
        offsetX : 1982.005495580906,
        offsetY : 822.6930218272938,
        scaleX : 0.7402288848430157,
        scaleY : -0.6881629212900853,
      },
    };

    return mapping[map];
  }
}

export default new CoordinateConverter();