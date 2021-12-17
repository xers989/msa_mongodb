<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: ['chartData', 'options'],
  data() {
    return {
    };
  },
  mounted() {
    console.log(this.chartData);
    this.renderChart(this.chartData, this.options);
  }
};
</script>