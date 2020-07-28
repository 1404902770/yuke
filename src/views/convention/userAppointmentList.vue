<template>
  <!-- <h1>预约管理 - 用户预约列表</h1> -->
  <div>
    <el-container>
      <el-header>
        <el-form ref="form" size="mini" :model="form" label-width="auto">
          <el-form-item label="用户电话号">
            <el-input v-model="form.userphone" placeholder="用户电话号"></el-input>
          </el-form-item>

          <el-form-item label="预约人电话">
            <el-input v-model="form.conventionphone" placeholder="请输入预约预留电话"></el-input>
          </el-form-item>

          <el-form-item label="订单状态">
            <el-select v-model="form.orderstate" placeholder="请选择">
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
      </el-header>
      <el-main>
        <div class="table">
          <template>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="ID" min-width="40">
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>

              <el-table-column label="预约人姓名" min-width="55">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="预约人手机号" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.conventionphone }}</span>
                </template>
              </el-table-column>

              <el-table-column label="商户名称" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.storename }}</span>
                </template>
              </el-table-column>

              <el-table-column label="客服电话" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.servephone }}</span>
                </template>
              </el-table-column>

              <el-table-column label="预订人数" min-width="50">
                <template slot-scope="scope">
                  <span>{{ scope.row.reservationnum }}</span>
                </template>
              </el-table-column>

              <el-table-column label="订单状态" min-width="50">
                <template slot-scope="scope">
                  <span>{{ scope.row.orderstate }}</span>
                </template>
              </el-table-column>

              <el-table-column label="预约时间" min-width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.reservationtime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="接单/拒单时间" min-width="90">
                <template slot-scope="scope">
                  <span>{{ scope.row.singletime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="完成时间" min-width="90">
                <template slot-scope="scope">
                  <span>{{ scope.row.resulttime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="创建时间" min-width="90">
                <template slot-scope="scope">
                  <span>{{ scope.row.createtime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="备注" min-width="130">
                <template slot-scope="scope">
                  <span>{{ scope.row.note }}</span>
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
        // 用户电话
        userphone: "",
        // 预约人电话
        conventionphone: "",
        // 订单状态
        orderstate: ""
      },

      // 表格数据
      tableData: [
        {
          id: "52",
          name: "奈良的🦌",
          conventionphone: "13278049352",
          storename: "Mlady House",
          servephone: "02885853388",
          reservationnum: "5",
          orderstate: "未核单",
          reservationtime: "2020-07-27 02:00 ~ 05:00 (晚场)",
          singletime: "2020-07-27 02:06:27",
          resulttime: "",
          createtime: "2020-07-27 02:05:19",
          note: ""
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