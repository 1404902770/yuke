<template>
  <!-- <h1>营销管理 - 发送短信</h1> -->
  <div>
    <div class="formwrap">
      <el-form
        :model="ruleForm"
        :rules="rules"
        size="mini"
        ref="ruleForm"
        label-width="180px"
        class="demo-ruleForm"
      >
        <el-form-item label="短信内容" prop="message">
          <el-input type="textarea" rows="5" v-model="ruleForm.message"></el-input>
          <div class="tip">
            <el-tag size="mini" type="danger">为防止投诉，晚上八点前发送，有5~30分钟延迟。晚上八点后发送，可能次日到达</el-tag>
          </div>
        </el-form-item>

        <el-form-item label="发送对象" prop="sendobj">
          <el-select v-model="ruleForm.sendobj" placeholder="请选择">
            <el-option label="全部用户" value="0"></el-option>
            <el-option label="自定义手机号" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="请输入手机号">
          <el-input v-model="ruleForm.phone" @keydown.enter.native="generate"></el-input>&nbsp;输入后按下回车键
        </el-form-item>

        <el-form-item label="已输入" prop="result">
          <div v-if="ruleForm.result!=''" class="card">
            {{ruleForm.result}}
            <i title="删除" class="el-icon-close" @click="resetphone"></i>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">发送</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      ruleForm: {
        // 短信内容
        message: "",
        // 发送对象
        sendobj: "1",
        // 输入手机号
        phone: "",
        // 已输入
        result: ""
      },
      // 表单验证
      rules: {
        message: [{ required: true, message: "请输入内容", trigger: "blur" }],
        sendobj: [{ required: true, message: "请选择", trigger: "change" }],
        result: [{ required: true, message: "请输入内容", trigger: "change" }]
      },
      a: {}
    };
  },
  methods: {
    // 键盘监听回车生成已输入
    generate() {
      let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;

      if (this.ruleForm.phone == "") {
        this.$message({
          showClose: true,
          message: "手机号不能为空",
          type: "warning"
        });
      } else if (reg.test(this.ruleForm.phone)) {
        this.ruleForm.result = this.ruleForm.phone;
        this.ruleForm.phone = "";
      } else {
        this.$message({
          showClose: true,
          message: "手机号格式错误",
          type: "error"
        });
      }
    },

    // 清空手机号
    resetphone() {
      this.ruleForm.result = "";
    },

    // 发送按钮
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
  },
  mounted() {
    console.log(this.$route);
    window.onbeforeunload = function(e) {
      var message = "some word";
      e = e || window.event;
      if (e) {
        e.returnValue = message;
        this.sessionStorage.setItem("moren", {
          name: this.$route.meta.title,
          path: this.$route.path
        });
      }
      //   return "浏览器关闭！";
    };
    // if (this.sessionStorage.getItem("moren")) {
    //   this.a = this.sessionStorage.getItem("moren");
    // }
  }
};
</script>

<style lang="less" scoped>
.formwrap {
  .tip {
    margin: 10px 0;
  }
  .el-form .el-form-item__content > .el-input {
    width: 200px !important;
  }
  .el-form .el-form-item__content > .el-select {
    width: 200px;
  }
  .el-form .el-form-item__content > .el-textarea {
    width: 500px;
  }
  .card {
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    padding: 0 12px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    i {
      position: absolute;
      display: none;
      top: 0;
      right: 0;
    }
  }
  .card:hover {
    i {
      display: block !important;
    }
    i:hover {
      color: orange;
      display: block !important;
    }
  }
}
</style>