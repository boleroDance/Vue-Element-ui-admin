<template>
  <div>
    <el-form label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="item.tmName"
            :value="item.id"
            v-for="(item, index) in trademarkList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          v-model="spu.description"
          placeholder="请输入SPU描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- action：图片上传地址 -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select placeholder="">
          <el-option></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
        <!-- 展示当前spu属于自己的销售属性 -->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width"></el-table-column>
          <el-table-column prop="" label="属性值列表" width="width">
            <template slot-scope="row, $index">
              <el-tag
              :key="tag.id"
              v-for="(tag, index) in row.spuSaleAttrValueList"
              closable
              :disable-transitions="false"
              >{{ tag.saleAttrValueName }}</el-tag>
              <el-input class="input-new-tag" size="small"></el-input>
              <el-button size="small">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('desubmit', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "spuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        category3Id: 0,
        description: "",
        spuName: "",
        tmId: "", // 平台id
        spuImageList: [
          //收集SPU图片信息
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      spuImageList: [],
      trademarkList: [],
      //销售属性
      saleAttrList: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      //file参数:代表的是删除的那个张图片
      //fileList:照片墙删除某一张图片以后，剩余的其他的图片
      // console.log(file, fileList,22222);
      //收集照片墙图片的数据
      //对于已有的图片【照片钱中显示的图片：有name、url字段的】，因为照片墙显示数据务必要有这两个属性
      //对于服务器而言，不需要name、url字段，将来对于有的图片的数据在提交给服务器的时候，需要处理的
      this.spuImageList = fileList;
    },
    //照片墙图片预览的回调
    handlePictureCardPreview(file) {
      //将图片地址赋值给这个属性
      this.dialogImageUrl = file.url;
      //对话框显示
      this.dialogVisible = true;
    },
    initSpuData(row) {
      console.log(row);
      // 这里要发送四个请求
      // 1.getTradmarkList 2.获取全部销售属性(3) baseSaleAttrList
      // 3.获取某一个spu信息 getSpuById 4. 获取对应spu图片 spuImageList
      return new Promise((resolve, reject) => {
        // 获取spu信息
        let res = this.$API.spu.reqSpuInfo(row.id);
        resolve(res);
      }).then((spures) => {
        console.log(spures);
        this.spu = spures.data;
        return new Promise((resolve, reject) => {
          // 获取品牌信息
          let res = this.$API.spu.reqTrademarkList();
          resolve(res);
        }).then((trademarkres) => {
          this.trademarkList = trademarkres.data;
          return new Promise((resolve, reject) => {
            // 获取spu图片
            let res = this.$API.spu.reqSpuImageList(row.id);
            resolve(res);
          }).then((imageres) => {
            let imagelist = imageres.data
            imagelist.forEach(element => {
              element.name = element.imgName
              element.url = element.imgUrl
            });
            this.spuImageList = imagelist
            return new Promise((resolve, reject) => {
              // 获取全部平台的销售属性
              let res = this.$API.spu.reqbaseSaleAttrList();
              resolve(res);
            }).then((baseSaleAttrres) => {
              this.saleAttrList = baseSaleAttrres.data
            });
          });
        });
      });
    },
  },
};
</script>

<style>
</style>