<template>
  <!-- <h1>店铺管理 - 待审核</h1> -->
  <div>
    <el-container>
      <el-header>
        <div class="search">
          <el-form ref="form" size="mini" :model="form" label-width="40px">
            <el-form-item label="名称">
              <el-input v-model="form.name" placeholder="请输入名称"></el-input>
            </el-form-item>

            <el-form-item label="电话">
              <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
            </el-form-item>

            <el-form-item label="类型">
              <el-select v-model="form.type" placeholder="选择类型">
                <el-option label="酒吧" value="0"></el-option>
                <el-option label="KTV" value="1"></el-option>
                <el-option label="清吧" value="1"></el-option>
              </el-select>
            </el-form-item>

            <div class="el-form-item">
              <el-button size="mini" class="search" type="primary" @click="onSearch">搜索</el-button>
              <el-button size="mini" type="danger">清空</el-button>
            </div>
          </el-form>
        </div>
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

              <el-table-column label="名称" min-width="90">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="LOGO" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.logo }}</span>
                </template>
              </el-table-column>

              <el-table-column label="店铺类型" min-width="40">
                <template slot-scope="scope">
                  <span>{{ scope.row.stortype }}</span>
                </template>
              </el-table-column>

              <el-table-column label="店铺电话" min-width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.storephone }}</span>
                </template>
              </el-table-column>

              <el-table-column label="客服电话" min-width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.servicephone }}</span>
                </template>
              </el-table-column>

              <el-table-column label="服务时间" min-width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.servicedate }}</span>
                </template>
              </el-table-column>

              <el-table-column label="申请时间" min-width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.applytime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作" >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)"
                  >修改</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
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
        //  名称
        name: "",
        // 电话
        phone: "",
        // 类型
        type: ""
      },

      // 表格数据
      tableData: [],

      // 分页
      currentPage: 1
    };
  },
  methods: {
    // 搜索按钮
    onSearch() {
      console.log("Search!");
    },

    // 编辑按钮
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除按钮
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

  .el-table /deep/ th {
    padding: 7px 0 !important;
  }
  .el-table /deep/ td {
    padding: 9px 0 !important;
  }
}
</style>