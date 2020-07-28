<template>
  <!-- <h1>用户管理 - 商务合作申请</h1> -->
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
              <el-table-column label="ID" min-width="20">
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>

              <el-table-column label="姓名" min-width="90">
                <template slot-scope="scope">
                  <span>{{ scope.row.nickname }}</span>
                </template>
              </el-table-column>

              <el-table-column label="电话" min-width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.phone }}</span>
                </template>
              </el-table-column>

              <el-table-column label="申请时间" min-width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.applytime }}</span>
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
        phone: ""
      },

      // 表格数据
      tableData: [
        {
          id: "52",
          nickname: "奈良的🦌",
          phone: "13278049352",
          applytime: "2020-07-24 16:00:01"
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