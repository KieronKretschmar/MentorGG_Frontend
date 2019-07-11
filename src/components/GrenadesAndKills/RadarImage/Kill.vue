<template>
    <g v-if="killData" class="kill" :class="[ killData.UserWinner ? 'userkiller' : 'uservictim', killData.UserIsCt ? 'ct' : 'terrorist' ]" :id="killData.Id" @click="SetSelectedSample(killData.Id)">
        <circle class="usercircle" :cx="killData.PlayerPosX" :cy="killData.PlayerPosY" :r="userRadius +'px'"/>
        <polyline v-if="showTrajectories" class="connection" vector-effect="non-scaling-stroke"
            :points="killConnection"></polyline>
    </g>

</template>

<script>
export default {
    props: [
        'killData', 
        'zoomFactor', 
        'SetSelectedSample',
        'isSelected',
        'showTrajectories'
        ],
    computed: {
        userRadius() {return 5 * this.zoomFactor;},
        killConnection() {
            return this.killData.PlayerPosX + "," + this.killData.PlayerPosY + " " + this.killData.VictimPosX + "," + this.killData.VictimPosY; 
        }
    }
}
</script>

<style lang="scss">

.kill{
    // &.ct .usercircle{    
    //     fill: $ct-color;
    // }
    // &.terrorist .usercircle{
    //     fill: $terrorist-color;
    // }
    
    &.userkiller .usercircle{    
        fill: $success-color;
    }
    &.uservictim .usercircle{
        fill: $failure-color;
    }

    .connection{
        stroke-width: 1.5px;
        fill: none;
        stroke: white;
        opacity: 1;
    }

    // &.userkiller .connection{
    //     stroke: $success-color;
    // }

    // &.uservictim .connection{
    //     stroke: $failure-color;
    // }
}

</style>
