<template>
  <div>
    <el-row :gutter="10" style="margin-top: 10px; margin-bottom: 10px">
      <el-col :span="12">
          <search></search>
      </el-col>
      <el-col :span="12">
          <category></category>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from "./Search.vue";
import Category from "./Category.vue";
export default {
  components: { Search, Category },
};
</script>

<style>
</style>