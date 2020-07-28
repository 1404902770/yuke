<template>
  <!-- <h1>用户管理 - 导入用户</h1> -->
  <div>
    <el-container>
      <!-- <el-header> -->
      <div class="uploadwrap">
        <el-upload
          class="upload-demo"
          action
          :auto-upload="false"
          :on-change="handleChange"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
        </el-upload>

        <div class="uploadtem">
          <a href="http://">下载模板</a>
        </div>

        <el-button size="mini" type="primary" class="subbtn">提交</el-button>
      </div>
      <!-- </el-header> -->
      <el-main>
        <div class="table">
          <template>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="手机号" min-width="55">
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>

              <el-table-column label="会员卡类型" min-width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.nickname }}</span>
                </template>
              </el-table-column>

              <el-table-column label="是否是代理" min-width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.phone }}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-main>
      <el-footer>
        <!-- <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="100"
            layout=" prev , pager , next , jumper , total"
            :total="400"
          ></el-pagination>
        </div>-->
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 上传数据列表
      fileList: [],

      // 表格数据
      tableData: []

      // 分页
      //   currentPage: 1
    };
  },
  methods: {
    handleChange(file, fileList) {
      console.log(file, fileList);
    }

    // // 切换分页
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // }
  }
};
</script>

<style lang="less" scoped>
.uploadwrap {
  margin-left: 80px;
  .el-upload__tip {
    margin-top: 12px !important;
  }
  .uploadtem {
    margin: 10px 0;
    a {
      font-size: 14px;
    }
  }
  .subbtn {
    margin: 15px 0 20px 0;
  }
}
.el-main {
  padding: 0 0 !important;

  .el-table {
    font-size: 12px !important;
  }
  .el-table /deep/ .cell {
    overflow: hidden !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
  }

  .el-table /deep/ th,
  .el-table /deep/ td {
    padding: 7px 0 !important;
  }
}
.el-footer {
  padding: 0 0 !important;
}
</style>