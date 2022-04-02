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
        <!-- action：图片上传地址 
        file-list是给照片墙做展示的数组 数组里必须要有name url属性
         -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unselectedAttr.length}项未选择`"
          v-model="newAttr"
        >
          <el-option
            :label="item.name"
            :value="item"
            v-for="(item, index) in unselectedAttr"
            :key="item.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          :disabled="!newAttr"
          @click="addSaleAttr"
          icon="el-icon-plus"
          style="margin-left: 10px"
          >添加销售属性</el-button
        >
        <!-- 展示当前spu属于自己的销售属性 -->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column prop="" label="属性值列表" width="580">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
                >{{ tag.saleAttrValueName }}</el-tag
              >
              <el-input
                class="input-new-tag"
                size="small"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                @blur="handleInputConfirm(row)"
              ></el-input>
              <el-button
                @click="addSaleAttrValue(row)"
                class="button-new-tag"
                size="small"
                v-else
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitAddOrUpdateSpu()"
          >保存</el-button
        >
        <el-button @click="desubmitAddOrUpdateSpu">取消</el-button>
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
      // spuImageList 中我们将imgName属性改成了name... 服务器不需要，所以暂时放这
      spuImageList: [],
      trademarkList: [],
      //销售属性
      saleAttrList: [],
      //收集未选择的销售属性id
      newAttr: {},
    };
  },
  methods: {
    handleRemove(file, fileList) {
      //file参数:代表的是删除的那个张图片
      //fileList:照片墙删除某一张图片以后，剩余的其他的图片
      //收集照片墙图片的数据
      //对于已有的图片【照片墙中显示的图片：有name、url字段的】，因为照片墙显示数据务必要有这两个属性
      //对于服务器而言，不需要name、url字段，将来对于有的图片的数据在提交给服务器的时候，需要处理的
      this.spuImageList = fileList;
    },
    handlePictureCardPreview(file) {
      //照片墙图片预览的回调
      //将图片地址赋值给这个属性
      this.dialogImageUrl = file.url;
      //对话框显示
      this.dialogVisible = true;
    },
    handlerSuccess(response, file, fileList) {
      // 照片墙新增图片后的回调
      // console.log(response, file, fileList)
      this.spuImageList = fileList;
    },
    addSaleAttr() {
      // 添加销售属性
      // 解构属性 修改属性名以便table展示
      // 向spuSaleAttrList里添加新的销售属性
      const { id: baseSaleAttrId, name: saleAttrName } = this.newAttr;
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      // 清空此时没用的newAttr
      this.newAttr = "";
    },
    addSaleAttrValue(row) {
      // 添加属性值
      // row.inputVisible = true
      // 不是响应式
      this.$set(row, "inputVisible", true);
      // v-model 收集到row中
      this.$set(row, "inputValue", "");
    },
    handleInputConfirm(row) {
      // 失去焦点事件 变成tag
      const { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() == "") {
        this.$message.warning("属性值不能为空");
        return;
      }

      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName !== inputValue
      );
      if (!result) {
        this.$message.warning("请勿输入重复的属性值");
        return;
      }
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      row.inputVisible = false;
    },
    submitAddOrUpdateSpu() {
      // 只需要整理照片墙的参数，其余都在spu里
      // 照片墙要带有imgName和imgUrl属性
      let res = this.spuImageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: item.url || item.response.data,
        };
      });
      this.spu.spuImageList = res;

      return new Promise((resolve, reject) => {
        let response = this.$API.spu.reqAddOrUpdateSpu(this.spu);
        resolve(response);
      }).then((response) => {
        this.$message.success("保存成功");
        this.$emit("changeScene", {scene:0, flag:this.spu.id? 'update':'add'});
        // 清除数据
        Object.assign(this._data, this.$options.data())
      });

    },
    initSpuData(row) {
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
            let imagelist = imageres.data;
            imagelist.forEach((element) => {
              element.name = element.imgName;
              element.url = element.imgUrl;
            });
            this.spuImageList = imagelist;
            return new Promise((resolve, reject) => {
              // 获取全部平台的销售属性
              let res = this.$API.spu.reqbaseSaleAttrList();
              resolve(res);
            }).then((baseSaleAttrres) => {
              this.saleAttrList = baseSaleAttrres.data;
            });
          });
        });
      });
    },
    addSpuData(category3Id) {
      this.spu.category3Id = category3Id
      return new Promise((resolve, reject) => {
        // 获取品牌信息
        let res = this.$API.spu.reqTrademarkList();
        resolve(res);
      }).then((res) => {
        this.trademarkList = res.data
        return new Promise((resolve, reject) => {
          // 获取全部平台的销售属性
          let res = this.$API.spu.reqbaseSaleAttrList();
          resolve(res);
        }).then((baseSaleAttrres) => {
          this.saleAttrList = baseSaleAttrres.data
        })
      });
    },
    desubmitAddOrUpdateSpu() {
      // 取消按钮的回调
      this.$emit('changeScene', {scene:0, flag:'add'})
      // 清数据
      // Object.assign
      // 组件实例中的this._data 是全部的响应式数据, 可以操作data中的响应式数据
      // this.$options是组件实例中的配置对象 配置对象的data函数执行，返回一个空的响应式数据
      console.log(this._data)
      console.log(this.$options.data)
      Object.assign(this._data, this.$options.data())

    }
  },

  computed: {
    unselectedAttr() {
      // saleAttrList 颜色 尺寸 版本
      // spu.spuSaleAttrList 尺寸 大小
      let res = this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name !== item1.saleAttrName;
        });
      });
      return res;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>