<template>
  <el-card class="search">
    <div slot="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>    
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <search-line-charts></search-line-charts>
        </el-col>
        <el-col :span="12">
          <search-line-charts></search-line-charts>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import SearchLineCharts from "./SearchLineCharts.vue";
export default {
  components: { SearchLineCharts },
};
</script>

<style scoped>
.search {
  height: 300px;
}
.search-header {
  display: flex;
  justify-content: space-between;
}
</style>