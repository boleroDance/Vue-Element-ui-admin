<template>
  <el-card style="margin-top: 10px">
    <el-tabs class="el-tab">
      <el-tab-pane label="销售额" name="first"> 销售额的数据 </el-tab-pane>
      <el-tab-pane label="访问量" name="second"> 访问量的数据 </el-tab-pane>
      <div class="tab-right">
        <span>本日</span><span>本周</span><span>本月</span><span>本年</span>
        <el-date-picker
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
        <el-col :span="16">123</el-col>
        <el-col :span="8">456</el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {};
</script>

<style>
.el-tab {
  display: flex;
  justify-content:space-between;
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
</style>