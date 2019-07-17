<template>
    <div>
        Hier sollen details zu dem selectedSample (eine einzelne Nade oder ein einzelner Kill) oder der selectedZone angezeigt werden. 
        SelectedZone läuft bei mir nur lokal, da die DB auf dem Server das noch nicht kann. 

        Sidebar yes
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
}
</script>

<style>

</style>
