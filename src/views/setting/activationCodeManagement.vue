<template>
  <!-- <h1>设置 - 激活码管理</h1> -->
  <div>
    <el-container>
      <el-header>
        <div class="tab">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="激活码列表" name="first"></el-tab-pane>
            <el-tab-pane label="添加激活码" name="second"></el-tab-pane>
          </el-tabs>
        </div>
      </el-header>
      <el-main>
        <div :hidden="activeName=='first'? false:true">
          <div class="search">
            <el-form ref="form" size="mini" :model="form" label-width="68px">
              <el-form-item label="激活状态">
                <el-select v-model="form.region" placeholder="选择类型">
                  <el-option label="未激活" value="0"></el-option>
                  <el-option label="已激活" value="1"></el-option>
                </el-select>

                <el-button class="search" type="primary" @click="onSearch">搜索</el-button>
                <el-button type="danger">清空</el-button>
                <el-button type="primary">
                  <i class="el-icon-refresh"></i> 刷新
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="tbalewrap">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="ID" min-width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>

              <el-table-column label="激活码" min-width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.code }}</span>
                </template>
              </el-table-column>

              <el-table-column label="状态" min-width="180">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.state == '0' ? 'danger':''"
                    size="small"
                  >{{ scope.row.state == '0' ? '未激活':'已激活' }}</el-tag>
                </template>
              </el-table-column>

              <el-table-column label="备注" min-width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.note }}</span>
                </template>
              </el-table-column>

              <el-table-column label="激活人" min-width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.activation }}</span>
                </template>
              </el-table-column>

              <el-table-column label="激活时间" min-width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.activationdate }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div :hidden="activeName=='second'? false:true">
          <div class="formwrap">
            <el-form
              :model="ruleForm"
              :rules="rules"
              size="mini"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="数量" prop="num">
                <el-input v-model="ruleForm.num"></el-input>
              </el-form-item>

              <el-form-item label="类型" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                  <template v-for="(item,index) in typelist">
                    <el-option :key="index" :label="item" :value="index"></el-option>
                  </template>
                </el-select>
              </el-form-item>

              <el-form-item label="备注" prop="desc">
                <el-input type="textarea" rows="5" v-model="ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-main>
      <el-footer>
        <div></div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      // 检索数据
      form: {
        //  类型
        region: ""
      },

      // 激活码列表数据
      tableData: [
        {
          id: "1071",
          code: "ze7g5714",
          state: "1",
          note: "老数据",
          activation: "乔木",
          activationdate: "2020-04-22 21:57:06"
        },
        {
          id: "1072",
          code: "ogfi5714",
          state: "0",
          note: "老数据",
          activation: "",
          activationdate: ""
        }
      ],

      // 添加激活码
      ruleForm: {
        // 数量
        num: "10",
        // 类型
        region: "",
        // 备注
        desc: ""
      },
      rules: {
        num: [{ required: true, message: "请输入", trigger: "blur" }],
        region: [{ required: true, message: "请选择", trigger: "change" }],
        desc: [{ required: true, message: "请输入", trigger: "blur" }]
      },

      // 类型选项
      typelist: [
        "月卡会员",
        "半年卡会员",
        "年卡会员",
        "终身会员",
        "半年卡会员",
        "半年卡会员",
        "半年卡会员",
        "年卡会员",
        "年卡会员",
        "终身会员",
        "终身会员",
        "月卡会员",
        "半年卡会员",
        "半年卡会员",
        "年卡会员",
        "终身会员",
        "终身会员",
        "终身会员",
        "月卡会员",
        "月卡会员",
        "半年卡会员",
        "年卡会员",
        "终身会员"
      ]
    };
  },
  methods: {
    // tab切换
    handleClick(tab, event) {
      // console.log(tab, event);
      this.activeName = tab.paneName;
    },

    // 搜索按钮
    onSearch() {
      console.log("Search!");
    },

    // 添加按钮
    submitForm(formName) {
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
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  margin-left: 10px;
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

  .el-form .el-form-item__content .el-select,
  .el-form .el-form-item__content > .el-input {
    width: 200px;
  }
  .el-form .el-form-item__content > .el-textarea {
    width: 500px;
  }
}
</style>