<template>
  <div id="bar-charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "",
  mounted() {
    // 组件挂载完毕后初始化echarts实例
    let myBarChart = echarts.init(this.$refs.charts);
    var option1 = {
      xAxis: {
        show: false,
        type: 'category',

        },
      yAxis: {show: false},
      series: [
        {
          type: "bar",
          data: [10, 12, 4, 22, 3, 6, 16, 21, 2],
          color: 'yellow'
        },
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
      },
      tooltip: {}
    };
    myBarChart.setOption(option1);
  },
};
</script>

<style scoped>
 #bar-charts {
  width: 100%;
  height: 100%;
}
</style>