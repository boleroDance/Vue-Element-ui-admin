<template>
  <div>
    <div class="header">
      <span>搜索用户数</span>
      <svg
        t="1652680109588"
        class="icon"
        style="width: 16px; height: 16px"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4271"
        width="200"
        height="200"
      >
        <path
          d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64z m0 88c-198.823 0-360 161.177-360 360s161.177 360 360 360 360-161.177 360-360-161.177-360-360-360z m32 288a8 8 0 0 1 8 8v278a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8V448a8 8 0 0 1 8-8h64z m-32-160c30.928 0 56 25.072 56 56s-25.072 56-56 56-56-25.072-56-56 25.072-56 56-56z"
          fill="#000000"
          fill-opacity=".45"
          p-id="4272"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span>12321 &nbsp; &nbsp; </span>
      <span style="font-size: 12px">17.1 &nbsp; &nbsp;</span>
      <svg
        style="width: 8px; height: 8px"
        t="1652682839646"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2379"
        width="200"
        height="200"
      >
        <path
          d="M952.32 715.2l-416-485.376a33.088 33.088 0 0 0-48.64 0l-416 485.376A32 32 0 0 0 96 768h832a32 32 0 0 0 24.32-52.8z"
          fill="#d81e06"
          p-id="2380"
        ></path>
      </svg>
      <svg
        t="1652682839646"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2379"
        width="8"
        height="8"
      >
        <path
          d="M952.32 715.2l-416-485.376a33.088 33.088 0 0 0-48.64 0l-416 485.376A32 32 0 0 0 96 768h832a32 32 0 0 0 24.32-52.8z"
          fill="#1afa29"
          p-id="2380"
        ></path>
      </svg>
      <div id="search-charts" ref="charts"></div>
    </div>
    <div class="footer"></div>
  </div>
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
        type: "category",
      },
      yAxis: { show: false },
      series: [
        {
          type: "line",
          data: [345, 23, 123, 34, 234, 32, 167],
          // 设置拐点样式
          itemStyle: {
            opacity: 0,
          },
          // 设置线段颜色
          lineStyle: {
            color: "blue",
          },
          // 设置填充颜色
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "blue",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ],
              global: false,
            },
          },
          smooth: true,
        },
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
      },
    };
    myLineChart.setOption(option1);
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
}
.header span {
  margin-right: 6px;
}
#search-charts {
  width: 100%;
  height: 50px;
  margin-top: 20px;
}
</style>