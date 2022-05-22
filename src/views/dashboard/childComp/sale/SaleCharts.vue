<template>
    <div id="sale-charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "",
  data() {
    return {
      mySaleChart: null,
      activeTitle: '销售额'
    }
  },
  mounted() {
    this.mySaleChart = echarts.init(this.$refs.charts);
    var option = {
      title: {
        text: ""
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [],
          color: 'yellowgreen'
        },
      ],
    };

    this.mySaleChart.setOption(option);

    this.changeData()
  },
  computed: {
    listState () {
      return this.$store.state.dashbord.list
    }
  },
  watch: {
    listState() {
      this.changeData()
    }
  },
  methods: {
    changeData () {
      console.log('change')
      this.mySaleChart.setOption({
        title: {
          text: this.activeTitle
        },
        xAxis: {
          data: this.activeTitle == '销售额'? this.listState.orderFullYearAxis: this.listState.userFullYearAxis
        },
        series: [
          {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.activeTitle == '销售额'?this.listState.orderFullYear:this.listState.userFullYear,
          color: 'yellowgreen'
        },
        ]
      })
    }
  }
};
</script>

<style scoped>
#sale-charts {
  width: 100%;
  height: 300px;
}
</style>