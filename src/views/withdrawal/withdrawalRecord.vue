<template>
  <!-- <h1>提现管理 - 提现记录</h1> -->
  <div>
    <el-container>
      <el-header>
        <el-form ref="form" size="mini" :model="form" label-width="68px">
          <el-form-item label="电话">
            <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
          </el-form-item>

          <el-form-item label="处理状态">
            <el-select v-model="form.processingstate" placeholder="请选择类型">
              <el-option label="全部" value="0"></el-option>
              <el-option label="处理中" value="1"></el-option>
              <el-option label="提现成功" value="2"></el-option>
              <el-option label="提现失败" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="提现端">
            <el-select v-model="form.withdrawal" placeholder="请选择类型">
              <el-option label="全部" value="0"></el-option>
              <el-option label="用户端" value="1"></el-option>
              <el-option label="商户端" value="2"></el-option>
            </el-select>
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
              <el-table-column label="ID" min-width="35">
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>

              <el-table-column label="申请人" min-width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.applicant }}</span>
                </template>
              </el-table-column>

              <el-table-column label="流水号" min-width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.serialnumber }}</span>
                </template>
              </el-table-column>

              <el-table-column label="手机号" min-width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.phone }}</span>
                </template>
              </el-table-column>

              <el-table-column label="金额" min-width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.amount }}</span>
                </template>
              </el-table-column>

              <el-table-column label="提现端" min-width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.withdrawal }}</span>
                </template>
              </el-table-column>

              <el-table-column label="申请时间" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.applytime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="处理时间" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.processingtime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="备注" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.note }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作" min-width="100">
                <template slot-scope="scope">
                  <div v-if="scope.row.state ==''">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="handleEdit(scope.$index, scope.row)"
                    >通过</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                    >拒绝</el-button>
                  </div>

                  <div v-if="scope.row.state !=''">
                    <el-tag
                      size="mini"
                      :type="scope.row.state == '0' ?'danger':''"
                    >{{scope.row.state == '0' ?'已拒绝':'已通过'}}</el-tag>
                  </div>
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
        // 电话
        phone: "",
        // 处理状态
        processingstate: "0",
        // 提现端
        withdrawal: "0"
      },

      // 表格数据
      tableData: [
        {
          id: "52",
          applicant: "谭清军(信用卡提额*修复征信)",
          serialnumber: "446536436896894976",
          phone: "15828426709",
          amount: "800",
          withdrawal: "用户端",
          applytime: "2020-07-24 15:03:13",
          processingtime: "2020-07-30 22:45:09",
          note: "待审核",
          state: ""
        },
        {
          id: "52",
          applicant: "谭清军(信用卡提额*修复征信)",
          serialnumber: "446536436896894976",
          phone: "15828426709",
          amount: "800",
          withdrawal: "用户端",
          applytime: "2020-07-24 15:03:13",
          processingtime: "2020-07-30 22:45:09",
          note: "待审核",
          state: "1"
        },
        {
          id: "52",
          applicant: "谭清军(信用卡提额*修复征信)",
          serialnumber: "446536436896894976",
          phone: "15828426709",
          amount: "800",
          withdrawal: "用户端",
          applytime: "2020-07-24 15:03:13",
          processingtime: "2020-07-30 22:45:09",
          note: "待审核",
          state: "0"
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

    // 同意按钮
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 拒绝按钮
    handleDelete(index, row) {
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