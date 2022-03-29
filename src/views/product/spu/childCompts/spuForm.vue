<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称"></el-input>
      </el-form-item>
        <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" value="">
          <el-option label="label" value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" placeholder="请输入SPU描述"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
        action=""
        list-type="picture-card"

        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt=""/>
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select placeholder="">
          <el-option></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
        <!-- 展示当前spu属于自己的销售属性 -->
        <el-table style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template>
              <el-tag></el-tag>
              <el-input class="input-new-tag" size="small"></el-input>
              <el-button size="small">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
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
    }
  }
}
</script>

<style>

</style>