<template>
  <!-- <h1>用户管理 - 用户推广码</h1> -->
  <div>
    <el-container>
      <el-header>
        <el-form ref="form" size="mini" :rules="rules" :model="form" label-width="50px">
          <el-form-item label="数量" prop="num">
            <el-input v-model="form.num"></el-input>
          </el-form-item>

          <div class="el-form-item">
            <el-button size="mini" class="search" type="primary" @click="getcode">获取用户推广码</el-button>
          </div>
        </el-form>
      </el-header>
      <el-main>
        <!-- <div class="table">
          <template>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="ID" min-width="45">
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>

              <el-table-column label="名称" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.nickname }}</span>
                </template>
              </el-table-column>

              <el-table-column label="电话号码" min-width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.phone }}</span>
                </template>
              </el-table-column>

              <el-table-column label="审核时间" min-width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.audittime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作" min-width="100">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleThrought(scope.$index, scope.row)"
                  >通过</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleRefuse(scope.$index, scope.row)"
                  >拒绝</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>-->
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
      // 数量数据
      form: {
        num: "1"
      },
      rules: {
        num: [{ required: true, message: "请输入", trigger: "blur" }]
      },

      // 表格数据
      tableData: [
        {
          id: "52",
          nickname: "奈良的🦌",
          headpic: [require("../../../public/static/images/demo.jpg")],
          phone: "13278049352",
          audittime: "2020-07-24 16:00:01"
        }
      ],

      // 分页
      currentPage: 1
    };
  },
  methods: {
    // 获取用户推广码按钮
    getcode() {
      console.log("Search!");
    },

    // 通过按钮
    handleThrought(index, row) {
      console.log(index, row);
    },
    // 拒绝按钮
    handleRefuse(index, row) {
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