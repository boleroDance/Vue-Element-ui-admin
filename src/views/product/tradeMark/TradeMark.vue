<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="addTradeMark"
      >添加</el-button
    >
    <el-table
      :data="list"
      stripe
      border
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" width="90" align="center">
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="logoUrl"
        label="品牌LOGO"
        width="230"
        align="center"
      >
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column
        prop="prop"
        label="操作"
        width="width"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="editTradeMark(row)"
          >
            Edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteTradeMark(row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-count="7"
      :page-sizes="[3, 5, 10]"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="prev, pager, next, jumper, ->, sizes,total"
    ></el-pagination>

    <el-dialog :title="titleChange" :visible.sync="dialogFormVisible">
      <el-form :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" prop="tmName" label-width="80px">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" prop="logoUrl">
          <!-- 图片这里不能使用v-model 不是表单元素
          action: 设置图片上传的地址
          on-success 检测图片上传，当上传成功，执行一次
          :before upload  上传之前执行一次
           -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    // 自定义校验规则
    var validateTmName = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error("品牌名称字数在2-10位之间"));
      } else {
        callback();
      }
    };

    return {
      // pagelist数据相关
      page: 1,
      limit: 5,
      total: 0,
      list: [],
      // dialogueform相关
      dialogFormVisible: false,
      titleChange: "添加品牌",
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      // 表单验证
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { validator: validateTmName, trigger: "change" },
        ],
        logoUrl: [{ required: true, message: "请选择品牌的图片" }],
      },
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    getPageList(pager = 1) {
      this.page = pager;
      const { page, limit } = this;
      return new Promise((resolve, reject) => {
        this.$API.trademark.reqTradeMarkList(page, limit).then((res) => {
          console.log(res);
          this.total = res.data.total;
          this.list = res.data.records;
          resolve();
        });
      });
    },
    handleCurrentChange(pager) {
      this.getPageList(pager);
    },
    handleSizeChange(limit) {
      this.limit = limit;
    },
    addTradeMark() {
      this.dialogFormVisible = true;
      this.titleChange = "添加品牌";
      this.tmForm = { tmName: "", logoUrl: "" };
    },
    editTradeMark(row) {
      this.dialogFormVisible = true;
      this.titleChange = "修改品牌";
      // row是当前修改的那一row信息
      // console.log(row)
      // 表单双向绑定 将已有的信息展示
      // 如果 -》 this.tmForm = row 直接操作了浏览器 我们应该浅拷贝
      this.tmForm = { ...row };
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      //  res 为上传成功后返回的数据，收集res.data
      // 用户上传图片到cdn，返回给前端一个url, 前端把url给服务器
      // file为上传成功后服务器返回的图片数据
      // console.log(res)
      // console.log(file)
      this.tmForm.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addOrUpdateClick() {
      this.dialogFormVisible = false;
      //发送请求
      this.$refs.ruleForm.validate((success) => {
        if (success) {
          console.log("valid");
          return new Promise((resolve, reject) => {
            this.$API.trademark
              .reqAddOrUpdateTradeMark(this.tmForm)
              .then((res) => {
                this.$message.success(
                  this.tmForm.id ? "修改品牌成功" : "添加品牌成功"
                );
                // 再次更新品牌列表
                this.getPageList(this.tmForm.id ? this.page : 1);
              })
          });
        } else {
          console.log("error submit!")
          return false
        }
      });



    },
    deleteTradeMark(row) {
      console.log(row)
      this.$confirm('你确定删除该品牌？', '提示', {
        confirmButtonText:'确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          this.$API.trademark.reqDeleteTradeMark(row.id)
          .then((res) => {
            console.log(res)
            this.getPageList()
          })
          .catch((res) => {
            console.log(res)
          })
        })
      }).catch(() => {
        this.$message('已取消操作') 
      })
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style> 