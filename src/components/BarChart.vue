<script>
import { Bar } from "vue-chartjs";
import AnnotationPlugin from "chartjs-plugin-annotation";

export default {
  extends: Bar,
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options);
  }
};
</script>