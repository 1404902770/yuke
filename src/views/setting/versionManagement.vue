<template>
  <!-- <h1>设置 - 版本管理</h1> -->
  <div>
    <el-container>
      <el-header>
        <el-form ref="form" size="mini" :model="form" label-width="70px">
          <el-form-item label="平台类型">
            <el-select v-model="form.platformtype" placeholder="选择类型">
              <el-option label="全部" value="0"></el-option>
              <el-option label="Android" value="Android"></el-option>
              <el-option label="ios" value="ios"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="App类型">
            <el-select v-model="form.apptype" placeholder="选择类型">
              <el-option label="全部" value="0"></el-option>
              <el-option label="代理端" value="1"></el-option>
              <el-option label="用户端" value="2"></el-option>
            </el-select>
          </el-form-item>

          <div class="el-form-item">
            <el-button size="mini" class="search" type="primary" @click="onSearch">搜索</el-button>
            <el-button size="mini" type="danger">清空</el-button>
            <el-button size="mini" type="primary" @click="addapp">添加</el-button>
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
              <el-table-column label="版本名称" min-width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.versionname }}</span>
                </template>
              </el-table-column>
              <el-table-column label="系统类型" min-width="50">
                <template slot-scope="scope">
                  <span>{{ scope.row.systemtype }}</span>
                </template>
              </el-table-column>
              <el-table-column label="app类型" min-width="40">
                <template slot-scope="scope">
                  <span>{{ scope.row.apptype }}</span>
                </template>
              </el-table-column>
              <el-table-column label="版本信息" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.versioninfo }}</span>
                </template>
              </el-table-column>
              <el-table-column label="强制更新状态" min-width="100">
                <template slot-scope="scope">
                  <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
                  <el-select size="mini" v-model="scope.row.state" placeholder="请选择活动区域">
                    <el-option label="非强制更新" value="0"></el-option>
                    <el-option label="必须更新" value="1"></el-option>
                    <el-option label="不需要更新" value="2"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="链接" min-width="60">
                <template slot-scope="scope">
                  <span>
                    <!-- <a :href="">查看下载链接</a> -->
                    <el-button type="text" class="lookurl" @click="lookurl">查看下载链接</el-button>
                    <!-- 查看下载链接 -->
                    <div>
                      <el-dialog
                        :title="scope.row.address"
                        :visible.sync="dialogVisible1"
                        width="50%"
                      >
                        <span>这是一段信息</span>
                        <img src alt />
                      </el-dialog>
                    </div>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="100">
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

          <!-- 添加弹框 -->
          <div class="addapp">
            <el-dialog :visible.sync="dialogVisible" width="50%" @close="closeaddapp">
              <div class="form">
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  size="mini"
                  ref="ruleForm"
                  label-width="120px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="平台类型" prop="platformtype">
                    <el-select v-model="ruleForm.platformtype" placeholder="请选择">
                      <el-option label="Android" value="0"></el-option>
                      <el-option label="IOS" value="1"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="App类型" prop="apptype">
                    <el-select v-model="ruleForm.apptype" placeholder="请选择">
                      <el-option label="代理端" value="0"></el-option>
                      <el-option label="用户端" value="1"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="是否强制更新" prop="isupdate">
                    <el-select v-model="ruleForm.isupdate" placeholder="请选择">
                      <el-option label="非强制更新" value="0"></el-option>
                      <el-option label="必须更新" value="1"></el-option>
                      <el-option label="不必须更新" value="2"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="版本号" prop="versionnum">
                    <el-input v-model="ruleForm.versionnum"></el-input>
                  </el-form-item>

                  <el-form-item label="版本信息" prop="versioninfo">
                    <el-input type="textarea" rows="5" v-model="ruleForm.versioninfo"></el-input>
                  </el-form-item>

                  <el-form-item label="上传App" prop="sendapp">
                    <!-- <el-input v-model="ruleForm.sendapp"></el-input> -->
                    <el-upload
                      class="upload-demo"
                      action
                      :on-change="handleChange"
                      :file-list="ruleForm.sendapp"
                      :auto-upload="false"
                    >
                      <el-button size="mini">上传</el-button>
                    </el-upload>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="addsure('ruleForm')">添 加</el-button>
                    <el-button v-if="ishidden!='0'" @click="resetForm('ruleForm')">重 置</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-dialog>
          </div>
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
        //  平台类型
        platformtype: "0",
        // App类型
        apptype: "0"
      },
      // 表格数据
      tableData: [
        {
          id: "52",
          versionname: "1.0.0",
          systemtype: "IOS",
          apptype: "代理端",
          versioninfo: "v1.0.5 修复部分问题，优化程序体验",
          state: "2",
          urladdress: "店铺"
        }
      ],

      //   上传列表
      fileList: [],

      // 添加幻灯片弹框数据
      ruleForm: {
        // 平台类型
        platformtype: "",
        // App类型
        apptype: "",
        // 是否强制更新
        isupdate: "",
        // 版本号
        versionnum: "",
        // 版本信息
        versioninfo: "",
        // 上传App
        sendapp: []
      },
      rules: {
        platformtype: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        apptype: [{ required: true, message: "请选择", trigger: "change" }],
        isupdate: [{ required: true, message: "请选择", trigger: "change" }],
        versionnum: [{ required: true, message: "请输入", trigger: "blur" }],
        versioninfo: [{ required: true, message: "请输入", trigger: "blur" }],
        sendapp: [{ required: true, message: "请输入", trigger: "change" }]
      },

      // 判断是否显示重置按钮
      ishidden: "",

      //   添加/修改弹框
      dialogVisible: false,
      //   查看下载链接弹框
      dialogVisible1: false,

      // 分页
      currentPage: 1
    };
  },
  methods: {
    // 搜索按钮
    onSearch() {
      console.log("Search!");
    },

    // 添加按钮
    addapp() {
      this.dialogVisible = true;
      this.ishidden = "1";
    },

    // 上传
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-3);
      console.log(file, fileList);
      this.ruleForm.sendapp = fileList;
    },

    // 确定按钮
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

    // 关闭新增修改弹框
    closeaddapp() {
      this.$refs.ruleForm.resetFields();

      this.ruleForm.versionnum = "";
      this.ruleForm.platformtype = "";
      this.ruleForm.apptype = "";
      this.ruleForm.versioninfo = "";
      this.ruleForm.isupdate = "";
    },

    // 查看下载链接
    lookurl() {
      this.dialogVisible1 = true;
    },

    // 修改按钮
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogVisible = true;
      this.ishidden = "0";

      this.ruleForm.versionnum = row.versionname;
      this.ruleForm.platformtype = row.systemtype;
      this.ruleForm.apptype = row.apptype;
      this.ruleForm.versioninfo = row.versioninfo;
      this.ruleForm.isupdate = row.state;
      // this.ruleForm.urladdress = row.urladdress;
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
  .addinfo {
    margin-bottom: 8px;
  }

  .el-table {
    font-size: 12px !important;
    .lookurl {
      font-size: 12px;
    }
  }

  .el-table /deep/ th {
    padding: 7px 0 !important;
  }
  .el-table /deep/ td {
    padding: 3px 0 !important;
  }
}

.el-footer {
  padding: 0 0;
}

.el-form .el-form-item__content .el-select,
.el-form .el-form-item__content > .el-input {
  width: 200px;
}
.el-form .el-form-item__content > .el-textarea {
  width: 500px;
}
</style>