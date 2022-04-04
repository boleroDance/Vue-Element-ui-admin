<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 切换 spu 列表 -->
      <div v-show="scene == 0">
        <!-- 展示spu列表结构 -->
        <el-button
          :disabled="category3Id == ''"
          style="margin-bottom: 10px"
          type="primary"
          icon="el-icon-plus"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="spuName"
            label="SPU名称"
            width="width"
          ></el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述"
            width="width"
          ></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="success"
                title="添加Sku"
                icon="el-icon-plus"
                size="mini"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="warning"
                title="修改Spu"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="info"
                title="查看当前spu全部sku列表"
                icon="el-icon-info"
                size="mini"
                @click="handlerSkuList(row)"
              ></el-button>
              <el-popconfirm
                @onConfirm="deleteSpu(row)"
                style="margin-left: 10px"
                title="确定删除该spu吗？"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  title="删除spu"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button>
              </el-popconfirm>
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
        <spu-form @changeScene="changeScene" ref="spu"></spu-form>
      </div>
      <!-- 切换 编辑 sku -->
      <div v-show="scene == 2">
        <sku-form
          ref="sku"
          @desubmitSoChangeScene="desubmitSoChangeScene"
        ></sku-form>
      </div>
    </el-card>
    <el-dialog :title="`${spuInfo.spuName}的SKU列表`" :visible.sync="dialogTableVisible">
      <el-table :data="skuList" style="width: 100%" border>
        <el-table-column
          property="skuName"
          label="名称"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          property="price"
          label="价格"
          width="90"
          align="center"
        ></el-table-column>
        <el-table-column 
          property="weight"
          label="重量"
          width="90"
          align="center"
         >
        </el-table-column>
        <el-table-column label="默认图片" width="150" align="center">
          <template slot-scope="{row, $index}">
            <img :src="row.skuDefaultImg" alt="" style="width:100px; height:100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SkuForm from "./childCompts/skuForm.vue";
import spuForm from "./childCompts/spuForm.vue";

export default {
  components: { spuForm, SkuForm },
  name: "SPU",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // isShowTable: true,
      page: 1,
      limit: 3,
      // spu列表数据
      records: [],
      total: 0,
      // 定义一个scene属性负责切换三个视图 0:spulist 1:editspu 2:editsku
      scene: 0,
      dialogTableVisible: false,
      spuInfo: {},
      // 记录返回的sku列表数据
      skuList: [],
    };
  },
  methods: {
    getCategoryId(cForm) {
      // select子组件里的handler3将cForm（categoryid）通过emit发送过来了
      this.category1Id = cForm.category1Id;
      this.category2Id = cForm.category2Id;
      this.category3Id = cForm.category3Id;
      this.getSpuList();
    },
    getSpuList() {
      // 获取spu列表
      return new Promise((resolve, reject) => {
        const { page, limit, category3Id } = this;
        this.$API.spu.reqSpuList(page, limit, category3Id).then((res) => {
          console.log(res);
          this.records = res.data.records;
          this.total = res.data.total;
        });
      });
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getSpuList();
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    updateAttr(row) {
      this.scene = 1;
      // 获取子组件spuform 之后可以拿到子组件的方法
      console.log(this.$refs.spu);
      this.$refs.spu.initSpuData(row);
    },
    addSpu() {
      // 发送两个请求 1.获取品牌的数据 2.全部销售属性数据
      this.scene = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    deleteSpu(row) {
      console.log(row);
      return new Promise((resolve, reject) => {
        let res = this.$API.spu.reqDeleteSpu(row.id);
        resolve(res);
      }).then((res) => {
        this.$message.success("删除成功");
        this.getSpuList();
      });
    },
    addSku(row) {
      // 添加sku按钮的回调
      this.scene = 2;
      // 通知子组件发送请求
      // 3个请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    changeScene({ scene, flag }) {
      // 子组件spuform的取消自定义事件回调
      // flag是为了区别保存按钮是update还是add
      // update是停留在当前页 add返回首页
      this.scene = scene;
      if (flag == "update") {
        console.log("update");
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    desubmitSoChangeScene(scene) {
      // skuForm通知父组件修改场景
      this.scene = scene;
    },
    handlerSkuList(row) {
      // 点击查看当前spu的sku列表
      this.dialogTableVisible = true
      this.spuInfo = row
      return new Promise((resolve, reject) => {
        let res = this.$API.spu.reqSkuList(row.id)
        resolve(res)
      })
      .then(response => {
        this.skuList = response.data
      })
    }
  },
};
</script>

<style scoped>
</style>