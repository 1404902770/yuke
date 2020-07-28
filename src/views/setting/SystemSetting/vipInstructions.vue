<template>
  <!-- <h1>系统设置 - 会员说明</h1> -->
  <div>
    <div class="editor">
      <el-form
        :model="ruleForm"
        :rules="rules"
        size="mini"
        ref="ruleForm"
        label-width="162px"
        class="demo-ruleForm"
      >
        <el-form-item label="会员介绍" prop="content">
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
      editor: "",

      ruleForm: {
        // 富文本内容
        content: ""
      },
      rules: {
        content: [{ required: true, message: "请输入", trigger: "change" }]
      }
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

    // 点击确定
    submitForm(formName) {
      this.getUEContent();
      if (this.content) {
        alert("submit!");
        console.log(this.content);
        this.$refs[formName].resetFields();
      } else {
        this.$refs[formName].validate(valid => {
          if (!valid) {
            console.log("error submit!!");
            return false;
          }
        });
      }
      //   this.$refs[formName].validate(valid => {
      //     if (valid) {
      //       alert("submit!");
      //       console.log(this.content);
      //     } else {
      //       console.log("error submit!!");
      //       return false;
      //     }
      //   });
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
</style>