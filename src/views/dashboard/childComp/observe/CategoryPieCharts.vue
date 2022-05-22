<template>
  <div id="category-charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "",
  mounted() {
    let myPieChart = echarts.init(this.$refs.charts);
    var option = {
      title: {
        text: '视频广告',
        subtext: 1040,
        left: 'center',
        top: 'center'
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "outsize",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "搜索引擎" },
            { value: 735, name: "销售广告" },
            { value: 580, name: "捆绑广告" },
            { value: 484, name: "直接访问" },
            { value: 300, name: "邮件营销" },
          ],
        },
      ],
    };
    myPieChart.setOption(option);
    // 给echarts绑定事件
    myPieChart.on('mouseover', (params) => {
      console.log(params)
      const {name, value} = params.data
      myPieChart.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  },
};
</script>

<style scoped>
  #category-charts {
    width: 100%;
    height: 300px;
  }
</style>