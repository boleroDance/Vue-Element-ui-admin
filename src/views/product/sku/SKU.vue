<template>
  <div>
    <el-table style="width: 100%" border :data="records">
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="skuName"
        label="名称"
        width="width"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="skuDesc"
        label="描述"
        width="width"
        align="center"
      ></el-table-column>
      <el-table-column prop="prop" label="默认图片" width="110" align="center">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            v-if="row.isSale == 0"
            @click="getCancelSale(row)"
            icon="el-icon-sort-down"
            size="mini"
          ></el-button>
          <el-button
            type="success"
            v-else
            icon="el-icon-sort-up"
            @click="getOnSale(row)"
            size="mini"
          ></el-button>
          <el-button
            type="primary"
            @click="getEdit"
            icon="el-icon-edit"
            size="mini"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            @click="getSkuDetail(row)"
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
    ></el-pagination>

    <!-- 抽屉效果 -->
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      :show-close="false"
      size="50%"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuDetailInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuDetailInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuDetailInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              type="success"
              v-for="(attr, index) in skuDetailInfo.skuAttrValueList"
              :key="attr.id"
              style="margin: 5px 10px"
            >
              {{ attr.attrId }}-{{ attr.valueId }}
            </el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item
              v-for="(item, index) in skuDetailInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" alt="" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "SKU",
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      // 存储服务器返回sku数据请求
      records: [],
      // 服务器返回的skudetail数据
      skuDetailInfo: {},
      drawer: false,
      direction: "rtl",
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    getSkuList(pager = 1) {
      this.page = pager;
      const { page, limit } = this;
      return new Promise((resolve, reject) => {
        let res = this.$API.sku.reqSkuList(page, limit);
        resolve(res);
      }).then((response) => {
        console.log(response);
        this.total = response.data.total;
        this.records = response.data.records;
      });
    },
    handleCurrentChange(pager) {
      this.getSkuList(pager);
    },
    handleSizeChange(limit) {
      this.limit = limit;
    },
    getCancelSale(row) {
      // 点击上架
      return new Promise((resolve, reject) => {
        let res = this.$API.sku.reqCancelSale(row.id);
        resolve(res);
      }).then((response) => {
        console.log(response);
        row.isSale = 1;
        this.$message.success("下架成功");
      });
    },
    getOnSale(row) {
      return new Promise((resolve, reject) => {
        let res = this.$API.sku.reqOnSale(row.id);
        resolve(res);
      }).then((response) => {
        console.log(response);
        row.isSale = 0;
        this.$message.success("上架成功");
      });
    },
    getEdit() {
      this.$message("正在开发中");
    },
    getSkuDetail(row) {
      // 获取sku详情
      this.drawer = true;
      return new Promise((resolve, reject) => {
        let res = this.$API.sku.reqSkuDetail(row.id);
        resolve(res);
      }).then((response) => {
        this.skuDetailInfo = response.data;
      });
    },
  },
};
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<style scoped>
.el-col {
  margin: 10px 10px;
}
.el-col.el-col-5 {
  font-size: 18px;
  text-align: right;
  font-weight: bold;
}

  >>>.el-carousel__button{
    width:10px;
    height:10px;
    background:red;
    border-radius:50%;
  }

</style>