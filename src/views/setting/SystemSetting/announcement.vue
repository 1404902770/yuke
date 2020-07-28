<template>
  <!-- <h1>系统设置 - 公告宣传图</h1> -->
  <div>
    <div class="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        size="mini"
        ref="ruleForm"
        label-width="162px"
        class="demo-ruleForm"
      >
        <el-form-item label="系统公告" prop="systemnotice">
          <el-input type="textarea" rows="5" v-model="ruleForm.systemnotice"></el-input>
        </el-form-item>

        <el-form-item label="商户公告" prop="merchantsnotice">
          <el-input type="textarea" rows="5" v-model="ruleForm.merchantsnotice"></el-input>
        </el-form-item>

        <el-form-item label="商家详情宣传图" prop="merchantspic">
          <el-upload
            class="avatar-uploader"
            action
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleAvatarSuccess1"
          >
            <img v-if="ruleForm.merchantspic" :src="ruleForm.merchantspic" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="小程序分享海报" prop="posters">
          <el-upload
            class="avatar-uploader"
            action
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleAvatarSuccess2"
          >
            <img v-if="ruleForm.posters" :src="ruleForm.posters" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="会员卡列表背景图" prop="backgroundpic">
          <el-upload
            class="avatar-uploader"
            action
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleAvatarSuccess3"
          >
            <img v-if="ruleForm.backgroundpic" :src="ruleForm.backgroundpic" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        //   系统公告
        systemnotice: "",
        // 商务合作申请说明
        merchantsnotice: "",
        // 商家详情宣传图
        merchantspic: "",
        // 小程序分享海报
        posters: "",
        // 会员卡列表背景图
        backgroundpic: ""
      },
      rules: {
        systemnotice: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        merchantsnotice: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        merchantspic: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        posters: [{ required: true, message: "请选择", trigger: "change" }],
        backgroundpic: [
          { required: true, message: "请选择", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    handleAvatarSuccess1(res, file) {
      console.log(res, file);
      //   this.ruleForm.merchantspic = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess2(res, file) {
      console.log(res, file);
      //   this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess3(res, file) {
      console.log(res, file);
      //   this.imageUrl = URL.createObjectURL(file.raw);
    },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-form .el-form-item__content > .el-textarea {
  width: 500px;
}
.form {
  .avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader /deep/ .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
}
</style>