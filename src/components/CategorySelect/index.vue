<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          value=""
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="handler1"
          :disabled="show"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in List1"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          value=""
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="handler2"
          :disabled="show"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in List2"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          value=""
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="handler3"
          :disabled="show"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in List3"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props: ['show'],
  data() {
    return {
      List1: [],
      List2: [],
      List3: [],
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  mounted() {
    // 获取一级标题数据
    this.getCategory1List();
  },
  methods: {
    getCategory1List() {
      this.$API.attr.reqCategory1List().then((res) => {
        this.List1 = res.data;
      });
    },
    handler1() {
      // 一级分类select发生改变时的回调
      // console.log(this.cForm.cateory1Id)
      return new Promise((resolve, reject) => {
        // 清除二三级list和id
        this.List2 = [];
        this.List3 = [];
        this.cForm.category2Id = "";
        this.cForm.category3Id = "";
        let category1Id = this.cForm.category1Id;
        this.$API.attr.reqCategory2List(category1Id).then((res) => {
          this.List2 = res.data;
        });
      });
    },
    handler2() {
      return new Promise((resolve, reject) => {
        this.List3 = [];
        this.cForm.category3Id = "";
        let category2Id = this.cForm.category2Id;
        this.$API.attr.reqCategory3List(category2Id).then((res) => {
          console.log(res);
          this.List3 = res.data;
        })
      });
    },
    handler3() {
      this.$emit("getCategoryId", this.cForm);
    },

  },
};
</script>

<style>
</style>