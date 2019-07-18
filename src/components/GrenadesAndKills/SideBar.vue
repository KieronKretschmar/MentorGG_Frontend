<template>
    <div>
        Hier sollen details zu dem selectedSample (eine einzelne Nade oder ein einzelner Kill) oder der selectedZone angezeigt werden. 
        SelectedZone läuft bei mir nur lokal, da die DB auf dem Server das noch nicht kann. 

        Sidebar yes
        <div v-if="selectedLineup">
          <input id="setpos-text" type="text" :value="selectedLineup.Setpos" readonly>
          <button id="setpos-copy" type="button" data-toggle="tooltip" data-placement="top" data-original-title="Copy to clipboard" @click="CopyTextToClipboard(selectedLineup.Setpos)">
              <i class="material-icons" >file_copy</i>
        </button>
    </div>
    </div>
</template>

<script>
export default {
    props: [
    'detailView',
    'sampleType',
    'selectedSample',
    
    'selectedLineup',
    'selectedZone',
    'userSelectedZonePerformance',
    'userTotalRounds',
    'globalSelectedZonePerformance',
    'globalTotalRounds',
    ],
    methods: {
      CopyTextToClipboard(text) {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(function() {
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    },
    // See https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
      }
    }
}
</script>

<style>

</style>
