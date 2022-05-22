<template>
  <el-card>
    <div slot="header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group class="category-select" v-model="radio1" size="small">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div>
      <category-pie-charts></category-pie-charts>
    </div>
  </el-card>
</template>

<script>
import CategoryPieCharts from './CategoryPieCharts.vue';
export default {
  components: { CategoryPieCharts },
  data() {
    return {
      radio1: "全部渠道",
      radio2: "线上",
      radio3: '门店',
    };
  },
};
</script>

<style scoped>
  .category-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>