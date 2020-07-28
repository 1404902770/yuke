<template>
  <!-- <h1>用户管理 - 用户列表</h1> -->
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

          <el-form-item label="顶级用户">
            <el-select v-model="form.withdrawal" placeholder="请选择">
              <el-option label="全部" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
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

              <el-table-column label="头像" min-width="60">
                <template slot-scope="scope">
                  <el-image
                    style="width: 30px; height: 30px"
                    :src="scope.row.headpic[0]"
                    :preview-src-list="scope.row.headpic"
                  ></el-image>
                </template>
              </el-table-column>

              <el-table-column label="电话号码" min-width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.phone }}</span>
                </template>
              </el-table-column>

              <el-table-column label="推荐人电话" min-width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.referrerphone }}</span>
                </template>
              </el-table-column>

              <el-table-column label="会员到期时间" min-width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.vipexpiretime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="创建时间" min-width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.createtime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="合伙人" min-width="60">
                <template slot-scope="scope">
                  <!-- <span>{{ scope.row.partner }}</span> -->
                  <el-switch v-model="scope.row.partner"></el-switch>
                </template>
              </el-table-column>

              <el-table-column label="代理状态" min-width="60">
                <template slot-scope="scope">
                  <!-- <span>{{ scope.row.proxystate }}</span> -->
                  <el-switch v-model="scope.row.proxystate"></el-switch>
                </template>
              </el-table-column>

              <el-table-column label="是否为员工" min-width="60">
                <template slot-scope="scope">
                  <!-- <span>{{ scope.row.isstaff }}</span> -->
                  <el-switch v-model="scope.row.isstaff"></el-switch>
                </template>
              </el-table-column>

              <el-table-column label="会员状态" min-width="70">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.vipstate!='0'" size="mini">VIP</el-tag>
                  <el-button v-if="scope.row.vipstate=='0'" type="primary" size="mini">开通会员</el-button>
                </template>
              </el-table-column>

              <el-table-column label="状态" min-width="70">
                <template slot-scope="scope">
                  <!-- <span>{{ scope.row.state }}</span> -->
                  <el-switch v-model="scope.row.state" active-text="禁用"></el-switch>
                </template>
              </el-table-column>

              <el-table-column label="邀请层级" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.invitation }}</span>
                  <el-button type="primary" size="mini">查看邀请关系</el-button>
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
        // 提现端
        withdrawal: "0"
      },

      // 表格数据
      tableData: [
        {
          id: "52",
          nickname: "奈良的🦌",
          headpic: [require("../../../public/static/images/demo.jpg")],
          phone: "13278049352",
          referrerphone: "17688039976",
          vipexpiretime: "2020-08-24 15:58:13",
          createtime: "2020-07-24 16:00:01",
          partner: "0",
          proxystate: "0",
          isstaff: "0",
          vipstate: "0",
          state: "0",
          invitation: ""
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