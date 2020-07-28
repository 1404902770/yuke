<template>
  <!-- <h1>店铺管理 - 已删店铺</h1> -->
  <div>
    <el-container>
      <el-header>
        <el-form ref="form" size="mini" :model="form" label-width="40px">
          <el-form-item label="名称">
            <el-input v-model="form.name" placeholder="请输入昵称"></el-input>
          </el-form-item>

          <el-form-item label="电话">
            <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="form.type" placeholder="请选择类型">
              <el-option label="酒吧" value="0"></el-option>
              <el-option label="KTV" value="1"></el-option>
              <el-option label="清吧" value="2"></el-option>
            </el-select>
          </el-form-item>

          <div class="el-form-item">
            <el-button size="mini" class="search" type="primary" @click="onSearch">搜索</el-button>
            <el-button size="mini" type="danger">清空</el-button>
          </div>
        </el-form>
      </el-header>
      <el-main>
        <div class="table">
          <template>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="ID" min-width="25">
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>

              <el-table-column label="名称" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="LOGO" min-width="60">
                <template slot-scope="scope">
                  <img :src="scope.row.logo" alt style="max-height:23px;vertical-align: middle;" />
                </template>
              </el-table-column>

              <el-table-column label="店铺类型" min-width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.storetype }}</span>
                </template>
              </el-table-column>

              <el-table-column label="店铺电话" min-width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.storephone }}</span>
                </template>
              </el-table-column>

              <el-table-column label="客服电话" min-width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.servephone }}</span>
                </template>
              </el-table-column>

              <el-table-column label="审核结果" min-width="40">
                <template slot-scope="scope">
                  <el-tag
                    size="mini"
                    :type="scope.row.auditresult == '拒绝'?'danger':''"
                  >{{ scope.row.auditresult }}</el-tag>
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleRestore(scope.$index, scope.row)"
                  >还原</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-main>
      <el-footer>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="100"
            layout=" prev , pager , next , jumper , total"
            :total="400"
          ></el-pagination>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 检索数据
      form: {
        // 名称
        name: "",
        // 电话
        phone: "",
        // 类型
        type: ""
      },

      // 表格数据
      tableData: [
        {
          id: "52",
          name: "棉花酒吧",
          logo: require("../../../public/static/images/demo.jpg"),
          storetype: "酒吧",
          storephone: "13668044103",
          servephone: "13668044103",
          auditresult: "拒绝"
        }
      ],

      // 分页
      currentPage: 1
    };
  },
  methods: {
    // 搜索按钮
    onSearch() {
      console.log("Search!");
    },

    // 还原按钮
    handleRestore(index, row) {
      console.log(index, row);
    },

    // 切换分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  height: 47px !important;

  .el-form .el-form-item {
    display: inline-block;
    margin-right: 10px;
    vertical-align: top;
  }
}
.el-main {
  padding: 0 0 !important;

  .el-table {
    font-size: 12px !important;
  }

  .el-table /deep/ th,
  .el-table /deep/ td {
    padding: 7px 0 !important;
  }
}
</style>