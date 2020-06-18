class Helpers {
    NormalizedPerformance(performance, goodPerformance, badPerformance) {
        var normalizedPerformance = (performance - badPerformance) / (goodPerformance - badPerformance);
        normalizedPerformance = Math.max(0, Math.min(1, normalizedPerformance));
        return normalizedPerformance;
    }
    
    DemoViewerAvailable(map){
        return ['de_dust2', 'de_mirage', 'de_nuke', 'de_inferno', 'de_cache', 'de_overpass', 'de_train', 'de_vertigo'].includes(map);
    }

    EquipmentIdToFontCharacter(equipmentId) {
        let mapping = {
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

    RankIdToRankName(rankId) {
      switch (rankId) {
        case 0: return "Unranked";
        case 1: return "Silver 1";
        case 2: return "Silver 2";
        case 3: return "Silver 3";
        case 4: return "Silver 4";
        case 5: return "Silver Elite";
        case 6: return "Silver Elite Master";
        case 7: return "Gold Nova 1";
        case 8: return "Gold Nova 2";
        case 9: return "Gold Nova 3";
        case 10: return "Gold Nova Master";
        case 11: return "Master Guardian 1";
        case 12: return "Master Guardian 2";
        case 13: return "Master Guardian Elite";
        case 14: return "Distinguished Master Guardian";
        case 15: return "Legendary Eagle";
        case 16: return "Legendary Eagle Master";
        case 17: return "Supreme Master First Class";
        case 18: return "Global Elite";
      }

      console.error("Unknown rank id: " + rankId);

      return "Unknown";
    }

    ShortenRankName(rankName) {
      return rankName.match(/\b(\w)/g).join("");
    }
    
    // Logs event using google analytics.
    // If not specified, category defaults to component's name 
    LogEvent(component, action, {category, label, value} = {}) {

        let data = {
            eventAction : action,
            // If provided use category, otherwise use this component's name or view's route, respectively
            eventCategory : category || (component.$options._componentTag || component.$route.name),
        };

        if(label !== undefined){
          data.eventLabel = String(label);
        }

        if(value !== undefined){
          data.eventValue = value;
        }

        component.$ga.event(data);
    }


    CopyTextToClipboard(text) {
        // See https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
        if (!navigator.clipboard) {
          this.fallbackCopyTextToClipboard(text);
          return;
        }
        navigator.clipboard.writeText(text).then(
          function() {},
          function(error) {
            console.error(error); // eslint-disable-line no-console
          }
        );
      }

    fallbackCopyTextToClipboard(text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      }

      document.body.removeChild(textArea);
    }

    ShowFirstSituationLast(firstSituation, firstMatchInfo, secondSituation, secondMatchInfo){
      // First, sort by MatchDate descending
      if (firstMatchInfo.MatchDate < secondMatchInfo.MatchDate) {
        return 1;
      } else if (firstMatchInfo.MatchDate > secondMatchInfo.MatchDate) { 
        return -1;
      }

      // Second, sort by Time ascending
      if (firstSituation.StartTime < secondSituation.StartTime) { 
        return -1;
      } else if (firstSituation.StartTime > secondSituation.StartTime) {
        return 1
      } else { // nothing to split them
        return 0;
      }
    }
}

export default new Helpers();