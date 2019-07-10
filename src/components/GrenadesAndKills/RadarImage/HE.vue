<template>
    <g v-if="grenadeData" :class="[{ 'enemies-hit': damageDealtToEnemies > 0}, grenadeData.UserIsCt > 0 ? 'ct' : 'terrorist' ]" :id="grenadeData.Id" @click="SetSelectedSample(grenadeData.Id)">
        <circle  v-if="showTrajectories" class="usercircle" :cx="grenadeData.ReleaseX" :cy="grenadeData.ReleaseY" :r="releaseRadius +'px'"/>
        <polyline v-if="showTrajectories" class="trajectory" vector-effect="non-scaling-stroke"
            :points="trajectory"></polyline>
        <circle class="he-detonation"  :cx="grenadeData.DetonationX" :cy="grenadeData.DetonationY"
                data-toggle=tooltip data-placement=top title="@(tooltipTitle)" :r="detonationRadius +'px'" />    

        <g v-if="isSelected" class="victims-group">
            <circle v-for="(hit,index) in grenadeData.Hits" :key="index"
            class="victim-circle"
            :class="[{'lethal' : hit.Kill}, 
            {'team-attack' : hit.TeamAttack},
            hit.TeamAttack == grenadeData.UserIsCt ? 'ct' : 'terrorist']" 
            :cx="hit.VictimPosX" :cy="hit.VictimPosY" :r="victimRadius + 'px'"/>
        </g>
    </g>

</template>

<script>
export default {
    props: [
        'grenadeData', 
        'zoomFactor', 
        'showTrajectories',
        'SetSelectedSample',
        'isSelected',
        ],
    computed: {
        releaseRadius() {return 5 * this.zoomFactor;},
        detonationRadius() {
            var baseRadius = 5;
            var maxRadius = 14;
            var maxDamageDealt = 100;
            var normalizedPerformance = this.$helpers.NormalizedPerformance(this.damageDealtToEnemies, maxDamageDealt, 0);
            return (baseRadius + normalizedPerformance * (maxRadius - baseRadius)) * this.zoomFactor;

        },
        victimRadius() {return 5 * this.zoomFactor;},
        damageDealtToEnemies() {
            if(this.grenadeData.Hits.filter(x=>!x.TeamAttack).length == 0) {
                return 0;
            }

            return this.grenadeData.Hits.filter(x=>!x.TeamAttack).reduce((acc, obj)=> obj.AmountHealth + acc, 0);            
        },
        trajectory() {
            var trajectoryString = "";
            for (let i = 0; i < this.grenadeData.Trajectory.length; i++) {
                const element = this.grenadeData.Trajectory[i];
                trajectoryString += element.X + "," + element.Y + " ";
            }
            return trajectoryString;
        }
    }
}
</script>

<style lang="scss">


.usercircle{
    .ct &{
    fill: $ct-color;
    }
    .terrorist &{
        fill: $terrorist-color;
    }
}

.trajectory{
    stroke-width: 1.5px;
    fill: none;
    /* stroke-dasharray: 5, 3; */
    stroke: #FFFFFF;
    opacity: 0.5;
}

.victim-circle{
    &.ct{
    fill: $ct-color;
    }
    &.terrorist{
        fill: $terrorist-color;
    }

    &.lethal{
        stroke-width: 1.5px;
        stroke:$success-color;
        &.team-attack{
            stroke:$failure-color;
        }

    }
}

.he-detonation{
    fill:black;
    .enemies-hit &{
        fill: white;
    }
}
</style>
