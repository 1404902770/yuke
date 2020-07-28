<template>
  <!-- <h1>系统设置 - 系统设置</h1> -->
  <div class="sysSetting">
    <div class="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        size="mini"
        ref="ruleForm"
        label-width="162px"
        class="demo-ruleForm"
      >
        <el-form-item label="商家售出商品平台提成" prop="money">
          <el-input v-model="ruleForm.money">
            <span slot="suffix">%</span>
          </el-input>
        </el-form-item>
        <el-form-item label="投诉电话" prop="complaintsphone">
          <el-input v-model="ruleForm.complaintsphone"></el-input>
        </el-form-item>
        <el-form-item label="合伙人申请电话" prop="partnerphone">
          <el-input v-model="ruleForm.partnerphone"></el-input>
        </el-form-item>

        <el-form-item label="商务合作申请说明" prop="desc">
          <el-input type="textarea" rows="5" v-model="ruleForm.desc"></el-input>
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
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      ruleForm: {
        // 平台提成
        money: "",
        // 投诉电话
        complaintsphone: "",
        // 合伙人电话
        partnerphone: "",
        // 商务合作申请说明
        desc: ""
      },
      rules: {
        money: [{ required: true, message: "请输入平台提成", trigger: "blur" }],
        complaintsphone: [
          { required: true, validator: checkPhone, trigger: "blur" }
        ],
        partnerphone: [
          { required: true, validator: checkPhone, trigger: "blur" }
        ],

        desc: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.el-form .el-form-item__content > .el-input {
  width: 200px !important;
  // float: left;
}
.el-form .el-form-item__content > .el-textarea {
  width: 500px;
  // float: left;
}
// .el-button--mini {
//   float: left;
// }
</style>