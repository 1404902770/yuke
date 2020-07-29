<template>
  <!-- <h1>系统设置 - 推广页</h1> -->
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
        <el-form-item label="佣金返利规则" prop="content">
          <div class="sellpage-upload">
            <template v-for="(item ,index) in showlist">
              <div class="filelist-item" :key="index">
                <img :src="item" alt />
                <div class="i-wrap">
                  <i class="el-icon-delete"></i>
                  <i class="el-icon-top" @click="moveup(item)"></i>
                  <i class="el-icon-bottom" @click="movedown(item)"></i>
                </div>
              </div>
            </template>

            <!-- <div class="filelist-item">
              <img src="../../../../public/static/images/tuiguang1.png" alt />
              <div class="i-wrap">
                <i class="el-icon-delete"></i>
                <i class="el-icon-top"></i>
                <i class="el-icon-bottom"></i>
              </div>
            </div>-->
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addpic">添加图片或视频</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 添加图片或视频弹框 -->
    <div>
      <el-dialog title="添加图片或视频" :visible.sync="dialogVisible" width="50%">
        <div class="form">
          <el-form
            :model="ruleForm"
            :rules="rules"
            size="mini"
            ref="ruleForm1"
            label-width="162px"
            class="demo-ruleForm"
          >
            <el-form-item label="类型 " prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择类型">
                <el-option label="图片" value="image"></el-option>
                <el-option label="视频" value="audio"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="上传文件" prop="fileList">
              <el-upload
                class="upload-demo"
                ref="upload"
                action
                :on-change="handleChange"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="resetForm('ruleForm1')">取 消</el-button>
          <el-button size="mini" type="primary" @click="addsure">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,

      // 展示列表
      showlist: [
        require("../../../../public/static/images/tuiguang1.png"),
        require("../../../../public/static/images/tuiguang2.png"),
        require("../../../../public/static/images/tuiguang3.png"),
        require("../../../../public/static/images/tuiguang4.png")
        // "../../../../public/static/images/tuiguang1.png",
        // "../../../../public/static/images/tuiguang1.png"
      ],

      // 上传列表
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // },
        // {
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // }
      ],

      // 添加数据
      ruleForm: {
        // 富文本内容
        content: "",
        // 类型
        region: "",
        // 上传文件
        fileList: ""
      },
      rules: {
        content: [{ required: true, message: "请输入", trigger: "change" }],
        region: [{ required: true, message: "请选择", trigger: "change" }],
        fileList: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  methods: {
    // 点击上移按钮
    moveup(item) {
      // console.log(this.showlist.indexOf(item));
      let num = this.showlist.indexOf(item);
      if (num > 0) {
        for (var i = 0; i < this.showlist.length; i++) {
          if (this.showlist[i] == item) {
            // console.log(this.showlist[i])
            this.showlist.splice(i, 1);
          }
        }
        // this.showlist.push(item);
        this.showlist.splice(num - 1, 0, item);
      } else {
        // console.log("top");
      }
    },
    // 点击下移按钮
    movedown(item) {
      // console.log(this.showlist.indexOf(item));
      let num = this.showlist.indexOf(item);
      if (num < this.showlist.length) {
        for (var i = 0; i < this.showlist.length; i++) {
          if (this.showlist[i] == item) {
            // console.log(this.showlist[i])
            this.showlist.splice(i, 1);
          }
        }
        // this.showlist.push(item);
        this.showlist.splice(num + 1, 0, item);
      } else {
        // console.log('bottom')
      }
    },

    // 点击添加图片或视频按钮
    addpic() {
      this.dialogVisible = true;
    },

    // 添加图片或视频确定按钮
    addsure() {
      // this.dialogVisible = false;
      this.$refs.ruleForm1.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 移除上传图片或视频
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 上传图片或视频
    handleChange(file, fileList) {
      console.log(file, fileList);
      this.ruleForm.fileList = file.raw;
    },

    // 保存按钮
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

    // 取消按钮
    resetForm(formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.sellpage-upload {
  .filelist-item {
    width: 200px;
    position: relative;
    img,
    video {
      width: 200px;
      object-fit: contain;
    }
    .i-wrap {
      width: 20px;
      position: absolute;
      display: flex;
      flex-direction: column;
      top: 0;
      right: -20px;
      cursor: pointer;
      z-index: 1000;
      i {
        margin-bottom: 10px;
      }
      i:hover {
        color: orange;
      }
    }
  }
}
</style>