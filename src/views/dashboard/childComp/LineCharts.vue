<template>
  <div id="line-charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "",
  mounted() {
    // 组件挂载完毕后初始化echarts实例
    let myLineChart = echarts.init(this.$refs.charts);
    var option1 = {
      xAxis: {
        show: false,
        type: 'category',

        },
      yAxis: {show: false},
      series: [
        {
          type: "line",
          data: [10, 12, 3, 21, 15, 3, 32, 2],
          // 设置拐点样式
          itemStyle: {
            opacity: 0
          },
          // 设置线段颜色
          lineStyle: {
            color: 'purple',
          },
          // 设置填充颜色
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'purple', 
                },
                {
                  offset: 1,
                  color: '#fff',
                },
              ],
              global: false
            }
          },
          smooth: true
        },
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
      }
    };
    myLineChart.setOption(option1);
  },
};
</script>

<style scoped>
#line-charts {
  width: 100%;
  height: 100%;
}
</style>