<script>
import { Line } from 'vue-chartjs'
import VueChartJS from 'vue-chartjs';

export default {
    extends: Line,
    props: ['options'],
    mixins: [ VueChartJS.mixins.reactiveProp ],
    mounted() {
        this.renderChart(this.chartData, this.options);
    }
}
</script>