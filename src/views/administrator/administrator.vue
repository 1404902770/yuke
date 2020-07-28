<template>
  <!-- <h1>管理员管理 - 管理员</h1> -->
  <div>
    <el-container>
      <el-header>
        <el-button type="primary" size="mini" @click="addadmin('1')">
          <i class="el-icon-plus"></i>&nbsp;&nbsp;&nbsp;添加
        </el-button>
      </el-header>
      <el-main>
        <div class="table">
          <template>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="ID" min-width="30">
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>

              <el-table-column label="用户名" min-width="50">
                <template slot-scope="scope">
                  <span>{{ scope.row.username }}</span>
                </template>
              </el-table-column>

              <el-table-column label="最后登录IP" min-width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.ipaddress }}</span>
                </template>
              </el-table-column>

              <el-table-column label="最后登陆时间" min-width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.date }}</span>
                </template>
              </el-table-column>

              <el-table-column label="禁用状态" min-width="30">
                <template slot-scope="scope">
                  <span>
                    <el-switch
                      v-model="scope.row.state"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    ></el-switch>
                  </span>
                </template>
              </el-table-column>

              <el-table-column label="操作" min-width="100">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row,'2')"
                  >编辑</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleUpdate(scope.$index, scope.row,'3')"
                  >修改密码</el-button>
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

        <!-- 添加/修改管理员 -->
        <div class="addadmin">
          <el-dialog :visible.sync="dialogVisible" width="30%" @close="closedialog">
            <el-form
              :model="ruleForm"
              :rules="rules"
              size="mini"
              ref="ruleForm"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-form-item v-if="tag=='1' || tag=='2'" label="用户名 " prop="username">
                <el-input v-model="ruleForm.username"></el-input>
              </el-form-item>

              <el-form-item v-if="tag=='1' || tag=='3'" label="密码 " prop="password">
                <el-input v-model="ruleForm.password"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="addsure('ruleForm')">添 加</el-button>
                <el-button @click="resetForm('ruleForm')">重 置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表格数据
      tableData: [
        {
          id: "1",
          username: "admin",
          ipaddress: "127.0.0.1",
          date: "2020-07-21 10:57:47",
          state: true
        }
      ],

      // 添加管理员弹框数据
      ruleForm: {
        // 标题
        username: "",
        // 类型
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入", trigger: "blur" }],
        password: [{ required: true, message: "请输入", trigger: "blur" }]
      },

      tag: "",

      dialogVisible: false
    };
  },
  methods: {
    // 添加管理员
    addadmin(num) {
      this.dialogVisible = true;
      this.tag = num;
    },

    // 添加按钮
    addsure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 重置按钮
    resetForm(formName) {
      //   this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },

    // 编辑按钮
    handleEdit(index, row, num) {
      console.log(index, row);

      this.tag = num;
      this.dialogVisible = true;
      this.ruleForm.username = row.username;
    },
    // 修改密码按钮
    handleUpdate(index, row, num) {
      console.log(index, row);

      this.tag = num;
      this.dialogVisible = true;
    },
    // 删除按钮
    handleDelete(index, row) {
      console.log(index, row);
    },

    // 关闭弹框
    closedialog() {
      this.ruleForm.username = "";
      this.ruleForm.password = "";
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
}

.el-table {
  font-size: 12px !important;
}
.el-table /deep/ th,
.el-table /deep/ td {
  padding: 7px 0 !important;
}

.el-form .el-form-item__content .el-select,
.el-form .el-form-item__content > .el-input {
  width: 200px;
}
</style>