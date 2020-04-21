import Enums from "@/enums";
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

  getRankIcon(rank) {
    try {
      return require(`./assets/ranks/${rank}.png`);
    }
    catch (err) {
      // do not log / throw error
    }

    return require(`./assets/ranks/none.png`);
  }

  getLineupInstructionImages(sampleType, map, lineupId) {
    // tell webpack to load all lineup images at compile time
    const lineupDir = require.context("./assets/radarimagefeatures/lineups/", true, /\.jpg$/);

    let sampleTypeString = Enums.SampleType.ToString(sampleType).toLowerCase();

    // identify relevant images for this lineup excluding thumbnails
    var originalPaths = lineupDir.keys()
      .filter(x=>x.includes(`${sampleTypeString}/${map}/${lineupId}`))
      .filter(x=>!x.includes("_thumb"));

    // return array with post-compile paths
    let res = [];
    originalPaths.forEach(path => {
      let imageObj = {
        src: lineupDir(path),
        thumb: lineupDir(path.replace('.jpg', '_thumb.jpg')), // .../1.jpg => /.../1_thumb.jpg
      }
      res.push(imageObj);
    });
    return res;
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