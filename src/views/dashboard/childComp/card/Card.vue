<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <card-detail title="总销售额" count="￥ 126560">
            <template slot="charts">
              <span style="font-size: 12px"
                >周同比 &nbsp; &nbsp; 56.67%
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
                  ></path></svg
              ></span>
              <span style="font-size: 12px"
                >日同比 &nbsp; &nbsp; 19.16%
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
                  ></path></svg
              ></span>
            </template>
            <template slot="footer">
              <span style="font-size: 12px">日销售额 &nbsp; ￥ 12423</span>
            </template>
          </card-detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <card-detail title="访问量" count="88460">
            <template slot="charts">
              <line-charts></line-charts>
            </template>
            <template slot="footer">
              <span style="font-size: 12px">日销售额 &nbsp; ￥ 12423</span>
            </template>
          </card-detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <card-detail title="支付笔数" count="88460">
            <template slot="charts">
              <bar-charts></bar-charts>
            </template>
            <template slot="footer">
              <span style="font-size: 12px">转化率 &nbsp; 65%</span>
            </template>
          </card-detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <card-detail title="运营活动效果" count="78%">
            <template slot="charts">
              <progress-charts></progress-charts>
            </template>
            <template slot="footer">
              <span style="font-size: 12px"
                >周同比 &nbsp; &nbsp; 12%
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
                    fill="#d81e06"
                    p-id="2380"
                  ></path>
                </svg>
              </span>
              <span style="font-size: 12px"
                >日同比 &nbsp; &nbsp; 11%
                <svg
                  t="1652685860391"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2409"
                  width="8"
                  height="8"
                >
                  <path
                    d="M952.32 715.2l-416-485.376a33.088 33.088 0 0 0-48.64 0l-416 485.376A32 32 0 0 0 96 768h832a32 32 0 0 0 24.32-52.8z"
                    fill="#1afa29"
                    p-id="2410"
                  ></path>
                </svg>
              </span>
            </template>
          </card-detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarCharts from './BarCharts.vue';
import CardDetail from "./CardDetail.vue";
import LineCharts from './LineCharts.vue';
import ProgressCharts from './ProgressCharts.vue';

export default {
  components: { CardDetail, LineCharts, BarCharts, ProgressCharts },
  name: "Card",
};
</script>

<style scoped>
</style>