<template>
  <div>
    <el-card style="margin: 20px 0">
       <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <!-- 切换 spu 列表 -->
      <div v-show="scene == 0">
        <!-- 展示spu列表结构 -->
        <el-button :disabled="category3Id == ''" style="margin-bottom: 10px" type="primary" icon="el-icon-plus" @click="addSpu">添加SPU</el-button>
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width"></el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width"></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row, $index}">
              <el-button type="success" title="添加Sku" icon="el-icon-plus" size="mini"></el-button>
              <el-button type="warning" title="修改Spu" icon="el-icon-edit" size="mini" @click="addSpu(row)"></el-button>
              <el-button type="info" title="查看当前spu全部sku列表" icon="el-icon-info" size="mini"></el-button>
              <el-button type="danger" title="删除spu" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器
          @current-change="getSpuList"
          @size-change="handleSizeChange"
         -->
        <el-pagination
        style="text-align: center"
        :current-page="page"
        :page-sizes="[3, 5, 10]"
        :page-size="limit"
        layout="prev, pager, next, jumper,->, sizes,total"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        ></el-pagination>
      </div>
      <!-- 切换 编辑 spu -->
      <div v-show="scene == 1">
        <spu-form @desubmit="changeScene" ref="spu"></spu-form>
      </div>
      <!-- 切换 编辑 sku -->
      <div v-show="scene == 2">
        <sku-form></sku-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import SkuForm from './childCompts/skuForm.vue';
import spuForm from './childCompts/spuForm.vue';

export default {
  components: { spuForm, SkuForm },
  name: "SPU",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      isShowTable: true,
      page: 1,
      limit: 3,
      // spu列表数据
      records: [],
      total: 0,
      // 定义一个scene属性负责切换三个视图 0:spulist 1:editspu 2:editsku
      scene: 0
    }
  },
  methods: {
    getCategoryId(cForm) {
      // select子组件里的handler3将cForm（categoryid）通过emit发送过来了
      this.category1Id = cForm.category1Id;
      this.category2Id = cForm.category2Id;
      this.category3Id = cForm.category3Id;
      this.getSpuList()
    },
    getSpuList() {
      // 获取spu列表
      return new Promise((resolve, reject) => {
        const {page, limit, category3Id} = this
        this.$API.spu.reqSpuList(page, limit, category3Id)
        .then(res => {
          console.log(res)
          this.records = res.data.records
          this.total = res.data.total
        })
      })
    },
    handleCurrentChange(page) {
      this.page = page
      this.getSpuList()
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    addSpu(row) {
      this.scene = 1
      // 获取子组件spuform 之后可以拿到子组件的方法
      console.log(this.$refs.spu)
      this.$refs.spu.initSpuData(row)
      

    },
    changeScene(scene) {
      // 子组件spuform的取消自定义事件回调
    this.scene = scene
    }
  }
}
</script>

<style scoped>

</style>