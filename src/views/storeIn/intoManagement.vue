<template>
  <!-- <h1>商家入驻 - 入驻管理</h1> -->
  <div>
    <el-container>
      <el-header>
        <div class="headtab">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="店铺入住列表" name="first"></el-tab-pane>
          </el-tabs>
        </div>
      </el-header>
      <el-main>
        <div class="search">
          <el-form ref="form" size="mini" :model="form" label-width="auto">
            <el-form-item label="名称">
              <el-input v-model="form.name" placeholder="请输入昵称"></el-input>
            </el-form-item>

            <el-form-item label="电话">
              <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-select v-model="form.state" placeholder="请选择类型">
                <el-option label="待接单" value="0"></el-option>
                <el-option label="未核单" value="1"></el-option>
                <el-option label="已完成" value="2"></el-option>
                <el-option label="已拒单" value="3"></el-option>
                <el-option label="用户取消" value="4"></el-option>
              </el-select>
            </el-form-item>

            <div class="el-form-item">
              <el-button size="mini" class="search" type="primary" @click="onSearch">搜索</el-button>
              <el-button size="mini" type="danger">清空</el-button>
            </div>
          </el-form>
        </div>
        <div class="table">
          <template>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="ID" min-width="30">
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>

              <el-table-column label="名称" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="手机号码" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.phone }}</span>
                </template>
              </el-table-column>

              <el-table-column label="商户名称" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.storename }}</span>
                </template>
              </el-table-column>

              <el-table-column label="申请时间" min-width="140">
                <template slot-scope="scope">
                  <span>{{ scope.row.applytime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="审核时间" min-width="140">
                <template slot-scope="scope">
                  <span>{{ scope.row.audittime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="状态" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.state }}</span>
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
      // 顶部tab切换数据
      activeName: "first",

      // 检索数据
      form: {
        // 名称
        name: "",
        // 电话
        phone: "",
        // 状态
        state: ""
      },

      // 表格数据
      tableData: [
        {
          id: "52",
          name: "奈良的🦌",
          phone: "18909042638",
          storename: "赫本",
          applytime: "2020-07-15 13:35:10",
          audittime: "",
          state: ""
        }
      ],

      // 分页
      currentPage: 1
    };
  },
  methods: {
    // 顶部tab切换
    handleClick(tab, event) {
      console.log(tab, event);
    },

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
}
.el-main {
  padding: 0 0 !important;
  .search {
    .el-form .el-form-item {
      display: inline-block;
      margin-right: 10px;
      vertical-align: top;
    }
  }

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