<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          @click="addAttr"
          icon="el-icon-plus"
          style="margin-bottom: 10px"
          :disabled="!category3Id"
          >添加属性</el-button
        >
        <el-table
          :data="attrList"
          stripe
          border
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column prop="" label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="(item, index) in row.attrValueList"
                :key="item.id"
                style="margin-left: 20px; margin-bottom: 6px"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="message"
                size="mini"
                icon="el-icon-edit"
                @click="editAttr(row)"
              ></el-button>
              <el-popconfirm title="确定删除该属性值吗?" @onConfirm="delelteAttr(row)">
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <!-- 添加或修改属性的结构 -->
        <el-form :inline="true" ref="form" :model="attrInfo" label-width="80px">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
          icon="el-icon-plus"
          >添加属性值</el-button
        >
        <el-button @click="desubmitAttr">取消</el-button>
        <el-table
          style="width: 100%; margin: 10px 0 10px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column align="center" prop="prop" label="属性值名称">
            <template slot-scope="{ row }">
              <!-- row 是attrValueList的所有属性名 -->
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toggleViewModel(row)"
                @keyup.native.enter="row.flag = false"
              ></el-input>
              <span @click="row.flag = true" style="display: block" v-else>{{
                row.valueName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="prop" label="操作">
            <template slot-scope="{ row, $index }">
              <el-popconfirm title="确定删除该属性值吗?" @onConfirm="delelteAttrValue($index)">
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length < 1" type="primary">保存</el-button>
        <el-button @click="desubmitAttrValue">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 接受后台返回的平台属性数据
      attrList: [],
      isShowTable: true,
      // 表单收集新增属性 或 修改属性使用的
      attrInfo: {
        attrName: "",
        attrValueList: [
          // {
          //   attrId: 0,     // 相应属性名的id
          //   valueName: "",
          // },
        ],
        categoryId: 0, // 三级分类的id
        categoryLevel: 3,
      },

    };
  },
  methods: {
    getCategoryId(cForm) {
      this.category1Id = cForm.category1Id;
      this.category2Id = cForm.category2Id;
      this.category3Id = cForm.category3Id;
      this.getAttrList();
    },
    // 三级分类一确定，就请求基本属性数据
    getAttrList() {
      return new Promise((resolve, reject) => {
        const { category1Id, category2Id, category3Id } = this;
        this.$API.attr
          .reqAttrList(category1Id, category2Id, category3Id)
          .then((res) => {
            console.log(res);
            this.attrList = res.data;
          });
      });
    },
    categoryChange() {
      console.log("change");
    },
    addAttr() {
      this.isShowTable = false;
      // this.attrInfo.categoryId = this.category3Id
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    addAttrValue() {
      // 添加属性值的回调
      this.attrInfo.attrValueList.push({
        // 将已有属性值的id带上
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true, // 给每一个属性添加一个flag，用户切换查看模式与编辑模式，每个属性值控制自己的模式切换
      });
    },
    desubmitAttr() {
      this.isShowTable = true;
      this.attrInfo.attrName = "";
      this.attrInfo.categoryId = 0;
      this.attrInfo.attrValueList = [];
    },
    desubmitAttrValue() {
      this.attrInfo.attrValueList = [];
    },
    editAttr(row) {
      console.log(row);
      for (let item of row.attrValueList) {
        // item.flag = false
        // vue无法探测普通的新增属性，这样书写的属性不是响应式的
        this.$set(item, "flag", true);
      }
      this.isShowTable = false;
      // 这里修改了属性 attrList的对象也会发生改变 如果用浅拷贝的方法，但数据结构里面 对象套数组套对象
      // 得用深拷贝 lodash
      this.attrInfo = cloneDeep(row);
    },
    toggleViewModel(row) {
      console.log(row);
      // 编辑模式变为查看模式 row:attrId:undefined flag valueName
      // 如果属性值为空 不能为新加属性值
      if (row.valueName == "") {
        this.$message.warning("属性值不能为空");
        return;
      }
      // 新增属性不能重复
      // console.log(this.attrInfo.attrValueList.valueName)
      const value = [];
      for (let item of this.attrInfo.attrValueList) {
        if (!value.includes(item.valueName)) {
          value.push(item.valueName);
          row.flag = false;
        } else {
          row.flag = true;
          this.$message.warning("属性值不能重复，请再检查您的属性");
        }
      }
    },
    delelteAttrValue($index) {
      this.attrInfo.attrValueList.splice($index, 1)
    },
    delelteAttr(row) {
      console.log(row.id)
      return new Promise((resolve, reject) => {
        this.$API.attr.reqDeleteAttr(row.id)
        .then(res => {
          console.log(res)
          this.getAttrList()
          this.isShowTable = true
        })
      })
    },
    addOrUpdateAttr() {
       // 提交数据中不应有falg、检查数据，不应有空格等不合法的数据
     this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if(!item.valueName =='') {
          // 删除flag
          delete item.flag
          return true
        }
      })
    console.log(this.attrInfo.attrValueList)
    return new Promise((resolve, reject) => {
       this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
       .then(res => {
         console.log(res)
         this.$message.success('保存成功')
         this.getAttrList()
         this.isShowTable = true
       })
    })
       
    }
  },
};
</script>

<style scoped>
</style>