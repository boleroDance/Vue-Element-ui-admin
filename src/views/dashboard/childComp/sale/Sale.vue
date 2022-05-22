<template>
  <el-card style="margin-top: 10px">
    <el-tabs class="el-tab" v-model="activeName">
      <el-tab-pane label="销售额" name="salesData"></el-tab-pane>
      <el-tab-pane label="访问量" name="heatsData"></el-tab-pane>
      <div class="tab-right">
        <span @click="setDay">本日</span><span>本周</span><span>本月</span><span>本年</span>
        <!-- value-format	可选，绑定值的格式。不指定则绑定值为 Date 对象 -->
        <el-date-picker
          v-model="date"
          value-format="yyyy-MM-dd"
          class="date-editor"
          type="daterange"
          range-separator="|"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
        >
        </el-date-picker>
      </div>
    </el-tabs>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <sale-charts ref="salechart"></sale-charts>
        </el-col>
        <el-col :span="6">
          <div class="sale-right">
            <h3>门店{{ title }}排名</h3>
            <ul>
              <li>
                <span class="sale-right-icon">1</span>
                <span class="sale-center-text">肯德基</span>
                <span class="sale-right-number">323.324</span>
              </li>
              <li>
                <span class="sale-right-icon">2</span>
                <span class="sale-center-text">麦当劳</span>
                <span class="sale-right-number">299.132</span>
              </li>
              <li>
                <span class="sale-right-icon">3</span>
                <span class="sale-center-text">必胜客</span>
                <span class="sale-right-number">284.132</span>
              </li>
              <li>
                <span>4</span>
                <span class="sale-center-text">海底捞</span>
                <span class="sale-right-number">264.678</span>
              </li>
              <li>
                <span>5</span>
                <span class="sale-center-text">西贝莜面村</span>
                <span class="sale-right-number">223.022</span>
              </li>
              <li>
                <span>6</span>
                <span class="sale-center-text">汉堡王</span>
                <span class="sale-right-number">201.531</span>
              </li>
              <li>
                <span>7</span>
                <span class="sale-center-text">真功夫</span>
                <span class="sale-right-number">197.523</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import SaleCharts from "./SaleCharts.vue";
export default {
  components: {
    SaleCharts,
  },
  data() {
    return {
      activeName: "salesData",
      // 收集data的数据
      date: null,
      activeTitle: '销售额'
    };
  },
  computed: {
    // sale右侧的title
    title() {
      if (this.activeName === "salesData") {
        return "销售额";
      } else {
        return "访问量";
      }
    },
  },
  watch: {
    // 监听属性title的变化，一旦发生改变，通知子组件图标重新渲染，给标题赋予新值
    title() {
      this.activeTitle = this.title
      this.$refs.salechart.activeTitle = this.title
      this.$refs.salechart.changeData()
    }
  },
  methods: {
    setDay() {
      let current = +new Date()
      let time = new Date(current)
      let year = time.getFullYear() // year
      let month = ("0" + (time.getMonth() + 1)).slice(-2)
      let day = ("0" + time.getDate()).slice(-2)
      let mydate = year + "-" + month + "-" + day
      this.date = [mydate, mydate]
    },
   
  },
};
</script>

<style>
.el-tab {
  display: flex;
  justify-content: space-between;
}
.tab-right {
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  color: #303133;
}
.tab-right .date-editor {
  width: 220px;
  margin-left: 20px;
}
.tab-right span {
  margin: 0 16px;
}
.sale-right ul {
  width: 100%;
  height: 300px;
  list-style: none;
  padding-left: 0;
}
.sale-right ul li {
  margin: 6px 0;
  height: 30px;
  line-height: 30px;
}
.sale-right-icon {
  width: 15px;
  height: 15px;
  line-height: 15px;
  display: inline-block;
  background-color: black;
  border-radius: 50%;
  color: white;
  font-size: 12px;
  text-align: center;
  float: left;
  margin-top: 6px;
}
.sale-right-number {
  float: right;
}
.sale-center-text {
  padding-left: 16px;
}
</style>