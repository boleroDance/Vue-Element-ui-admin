<template>
  <div>
    <el-row :gutter="30" style="margin-top: 10px; margin-bottom:10px">
      <el-col :span="12">
        <el-card><search></search></el-card>
      </el-col>
      <el-col :span="12">
        <el-card><category></category></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from './Search.vue'
import Category from './Category.vue'
export default {
  components: { Search, Category },

}
</script>

<style>

</style>