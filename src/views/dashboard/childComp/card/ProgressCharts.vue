<template>
  <div id="progress-charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "",
  mounted() {
    // 组件挂载完毕后初始化echarts实例
    let myProgressChart = echarts.init(this.$refs.charts);
    var option1 = {
      xAxis: {
        show: false,
        min: 0,
        max: 100
        },
      yAxis: {
        show: false,
        type: 'category',
      },
      series: [
        {
          type: "bar",
          data: [78],
          color: 'yellow',
          barWidth: 16,
          // 背景颜色
          showBackground: true,
          label: {
            show: true,
            formatter: '|',
            position: 'right'
          }
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
    myProgressChart.setOption(option1);
  },
};
</script>

<style scoped>
 #progress-charts {
  width: 100%;
  height: 100%;
}
</style>