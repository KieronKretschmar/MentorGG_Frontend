<template>
    <div class="profile-situations">        
        <Overview v-if="loadedDetailSituationType == -1" @open-detail="OnShowDetail"/>
        <Detail v-else :type="loadedDetailSituationType" :steamId="steamId" @back="OnBackToOverview"/>
    </div>
</template>

<script>
import Overview from "@/components/Profile/Situations/Overview.vue";
import Detail from "@/components/Profile/Situations/Detail.vue";

export default {
    props: ['steamId'],
    components: {
        Overview,
        Detail
    },
    data() {
        return {
            loadedDetailSituationType: -1
        };
    },
    methods: {
        OnShowDetail(situationType) {
            this.ShowDetail(situationType);
        },
        OnBackToOverview() {
            this.loadedDetailSituationType = -1;
        },
        ShowDetail(situationType) {
            this.loadedDetailSituationType = situationType;
        }
    }
}
</script>