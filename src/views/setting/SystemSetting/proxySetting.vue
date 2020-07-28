<template>
  <!-- <h1>系统设置 - 代理设置</h1> -->
  <div>
    <div class="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        size="mini"
        ref="ruleForm"
        label-width="180px"
        class="demo-ruleForm"
      >
        <el-form-item label="代理价格" prop="proxyprice">
          <el-input v-model="ruleForm.proxyprice">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="vip上级返佣模式" prop="viphigher">
          <el-select v-model="ruleForm.viphigher" placeholder="vip上级返佣模式">
            <el-option label="固定金额" value="0"></el-option>
            <el-option label="百分比" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="固定金额" prop="fixedprice1">
          <el-input v-model="ruleForm.fixedprice1">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="代理上级返佣模式" prop="proxysuper">
          <el-select v-model="ruleForm.proxysuper" placeholder="代理上级返佣模式">
            <el-option label="固定金额" value="0"></el-option>
            <el-option label="百分比" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="固定金额" prop="fixedprice2">
          <el-input v-model="ruleForm.fixedprice2">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="员工vip上级返佣模式" prop="uservip">
          <el-select v-model="ruleForm.uservip" placeholder="员工vip上级返佣模式">
            <el-option label="固定金额" value="0"></el-option>
            <el-option label="百分比" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="固定金额" prop="fixedprice3">
          <el-input v-model="ruleForm.fixedprice3">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>

        <el-form-item label="推广代理人数限制" prop="peoplenum">
          <el-input v-model="ruleForm.peoplenum">
            <template slot="append">人</template>
          </el-input>
        </el-form-item>

        <el-form-item label="代理优惠" prop="content">
          <div id="ueditor">
            <script id="editor" type="text/plain" style="width:800px;height:300px;"></script>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        // 代理价格
        proxyprice: "",
        // vip上级返佣模式
        viphigher: "",

        // 固定金额1
        fixedprice1: "",
        // 代理上级返佣模式
        proxysuper: "",

        // 固定金额2
        fixedprice2: "",
        // 员工vip上级返佣模式
        uservip: "",

        // 固定金额3
        fixedprice3: "",
        // 推广代理人数限制
        peoplenum: ""
      },
      rules: {
        proxyprice: [{ required: true, message: "请输入", trigger: "blur" }],
        viphigher: [{ required: true, message: "请选择", trigger: "change" }],

        fixedprice1: [{ required: true, message: "请输入", trigger: "blur" }],
        proxysuper: [{ required: true, message: "请选择", trigger: "change" }],

        fixedprice2: [{ required: true, message: "请输入", trigger: "blur" }],
        uservip: [{ required: true, message: "请选择", trigger: "change" }],

        fixedprice3: [{ required: true, message: "请输入", trigger: "blur" }],
        peoplenum: [{ required: true, message: "请输入", trigger: "blur" }],

        content: [{ required: true, message: "请输入", trigger: "change" }]
      },

      editor: "",

      content: ""
    };
  },
  methods: {
    // 初始化富文本
    ueditor() {
      this.editor = UE.getEditor("editor");
    },
    // 获取富文本内容
    getUEContent() {
      this.content = this.editor.getContent();
    },

    submitForm(formName) {
      this.getUEContent();
      if (this.content) {
        alert("submit!");
        console.log(this.content);
        this.$refs[formName].clearValidate();
      } else {
        this.$refs[formName].validate(valid => {
          if (!valid) {
            console.log("error submit!!");
            return false;
          }
        });
      }
    }
  },
  mounted() {
    this.ueditor();
  },
  destroyed() {
    this.editor.destroy();
  }
};
</script>

<style lang="less" scoped>
.el-form .el-form-item__content > .el-input {
  width: 200px !important;
}
.el-form .el-form-item__content > .el-select {
  width: 200px;
}
</style>