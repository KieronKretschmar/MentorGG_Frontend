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
}

export default new Helpers();