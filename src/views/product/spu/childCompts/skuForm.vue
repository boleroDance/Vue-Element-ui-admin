<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">{{spu.spuName}}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="sku名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元素)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
       <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="item.attrName" v-for="(item, index) in attrInfoList" :key="item.id">
            <el-select placeholder="请选择" v-model="item.attrIdAndValueId">
              <el-option 
                :label="attrValue.valueName" :value="`${item.id}:${attrValue.id}`" 
                v-for="(attrValue, index) in item.attrValueList" :key="attrValue.id" 
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr, index) in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option
              :label="saleAttrValue.saleAttrValueName" 
              v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"
              :value="`${saleAttr.id}:${saleAttrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table @selection-change="handleSelectionChange" border :data="spuImageList" style="width: 100%">
          <el-table-column
            type="selection"
            prop="prop"
            width="80"
          ></el-table-column>
          <el-table-column prop="prop" label="图片" align="center" width="width">
            <template slot-scope="{row, $index}">
              <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="imgName"
            label="名称"
            width="width"
            align="center"
          ></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row, $index}">
              <el-button v-if="row.isDefault==0" @click="changeDefault(row)" type="primary">设置默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitSaveSku" type="primary">保存</el-button>
        <el-button @click="deSubmitSaveSku">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "skuForm",
  data() {
    return {
      // 进入添加sku页面发送的三个请求的返回数据
      // 1.图片
      spuImageList: [],
      // 2.销售属性
      spuSaleAttrList: [],
      // 3.平台属性
      attrInfoList: [],
      spu: {},
      //暂时存放选中的图片but without isDefalut property
      ImageList: [],
      // 收集sku数据的字段
      skuInfo: {
        category3Id: 0,   
        spuId: 0,
        tmId: 0,
        price: 0,
        weight: "",
        skuName: "",
        skuDesc: "",
        skuDefaultImg: "",
        // sku平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        skuImageList: [
          // {
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   spuImgId: 0,
          // },
        ],
        // sku销售属性列表
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },

    };
  },
  methods: {
    getData(category1Id, category2Id, spu) {
      // 获取skuform数据
      // 整理父组件传过来的数据
      this.spu = spu
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      Promise.all([
        new Promise((resolve) => {
          let res = this.$API.sku.reqSpuImageList(spu.id);
          resolve(res);
        }),
        new Promise((resolve) => {
          let res = this.$API.sku.reqspuSaleAttrList(spu.id);
          resolve(res);
        }),
        new Promise((resolve) => {
          let res = this.$API.sku.reqattrInfoList(
            category1Id,
            category2Id,
            spu.category3Id
          );
          resolve(res);
        }),
      ]).then((responses) => {
        let list = responses[0].data;
        list.forEach(element => {
          element.isDefault = 0
        });
        this.spuImageList = list
        this.spuSaleAttrList = responses[1].data;
        this.attrInfoList = responses[2].data;
      });
    },
    handleSelectionChange(row) {
      console.log(row)
      // 可以获取用户选中图片的信息数据(id, imgName, imgUrl, spuId)
      this.ImageList = row 
    },
    changeDefault(row) {
      // 点击修改isDefault为1，其余都为0
      console.log(row)
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    deSubmitSaveSku() {
      this.$emit('desubmitSoChangeScene', 0)
      Object.assign(this._data, this.$options.data.call(this))
    },
    submitSaveSku() {
      // 整理参数
      // 1.整理spuSaleAttrList -》 skuInfo.skuAttrValueList
      this.attrInfoList.forEach(item =>{
        if(item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(":")
          let obj = {attrId, valueId}
          this.skuInfo.skuAttrValueList.push(obj)
        }
      })
      // 2.整理spuSaleAttrList -> skuSaleAttrValueList
      this.spuSaleAttrList.forEach(item => {
        if(item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(":")
          let obj = {saleAttrId, saleAttrValueId}
          this.skuInfo.skuSaleAttrValueList.push(obj)
        }
      })
      //3. 整理imageList的参数
      this.skuInfo.skuImageList = this.ImageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      
      return new Promise((resolve, reject) => {
        let res = this.$API.spu.reqSaveSkuInfo(this.skuInfo)
        resolve(res)
      })
      .then(response => {
        console.log(response)
        this.$message.success('添加sku成功')
        this.deSubmitSaveSku()
      })
    }
  },
};
</script>

<style>
</style>