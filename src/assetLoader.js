class AssetLoader {

  getAsset(resource) {
    // using require here makes webpack parse all assets in ./assets/ at compiletime so that they're available
    return require('./assets/' + resource.replace("~/assets/", ''))
  }

  // returns the map's radarimages   
  getRadarImage(map) {
    return require(`./assets/maps/radarimages/${map}.png`);
  }

  // returns the map preview image or a default placeholder if unavailable
  getMapPreview(map) {
    try {
      return require(`./assets/maps/previews/${map}.jpg`);
    }
    catch (err) {
      // do not log / throw error
    }

    return require(`./assets/maps/previews/unknown.png`);
  }

  getMapPreview(rank) {
    try {
      return require(`./assets/ranks/${rank}.png`);
    }
    catch (err) {
      // do not log / throw error
    }

    return require(`./assets/ranks/none.png`);
  }

  // returns high quality imageUrl from valve servers or default image if null
  getSteamProfileImageUrl(imageUrl) {
    if (imageUrl) {
      return imageUrl.replace(".jpg", "_full.jpg");
    }
    return require('./assets/unknown_steamprofile_full.jpg');
  }

}

export default new AssetLoader();