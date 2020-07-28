<template>
  <!-- <h1>店铺管理 - 店铺订单</h1> -->
  <div>
    <el-container>
      <el-header>
        <el-form ref="form" size="mini" :model="form" label-width="54px">
          <el-form-item label="订单号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="商户">
            <el-input v-model="form.phone" placeholder="请输入内容"></el-input>
          </el-form-item>

          <div class="el-form-item">
            <el-button size="mini" class="search" type="primary" @click="onSearch">搜索</el-button>
            <el-button size="mini" type="info">清空</el-button>
            <el-button size="mini" type="primary">
              <i class="el-icon-refresh"></i> 刷新
            </el-button>
          </div>
        </el-form>
      </el-header>
      <el-main>
        <div class="table">
          <template>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="ID" min-width="50">
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>

              <el-table-column label="订单号" min-width="130">
                <template slot-scope="scope">
                  <span>{{ scope.row.ordernum }}</span>
                </template>
              </el-table-column>

              <el-table-column label="用户昵称" min-width="90">
                <template slot-scope="scope">
                  <span>{{ scope.row.nickname }}</span>
                </template>
              </el-table-column>

              <el-table-column label="电话号码" min-width="90">
                <template slot-scope="scope">
                  <span>{{ scope.row.phone }}</span>
                </template>
              </el-table-column>

              <el-table-column label="桌号" min-width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.ramadhin }}</span>
                </template>
              </el-table-column>

              <el-table-column label="数量" min-width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.number }}</span>
                </template>
              </el-table-column>

              <el-table-column label="单价" min-width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.price }}</span>
                </template>
              </el-table-column>

              <el-table-column label="订单总额" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.totalorder }}</span>
                </template>
              </el-table-column>

              <el-table-column label="支付时间" min-width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.paytime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="第三方支付流水号" min-width="130">
                <template slot-scope="scope">
                  <span>{{ scope.row.thirdparty }}</span>
                </template>
              </el-table-column>

              <el-table-column label="订单状态" min-width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.orderstate }}</span>
                </template>
              </el-table-column>

              <el-table-column label="交易完成时间" min-width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.completetime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="评论状态" min-width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.reviewstatus }}</span>
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
          ordernum: "437955342287114240",
          nickname: "지성Town",
          phone: "16575693440",
          ramadhin: "B02",
          number: "1",
          price: "110",
          totalorder: "110",
          paytime: "2020-06-30 22:45:09",
          thirdparty: "437955342287114240",
          orderstate: "已完成",
          completetime: "2020-06-30 23:13:04",
          reviewstatus: "未评论"
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

  .el-table /deep/ th,
  .el-table /deep/ td {
    padding: 7px 0 !important;
  }
}
.el-footer {
  padding: 0 0 !important;
}
</style>