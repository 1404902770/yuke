<template>
  <!-- <h1>设置 - 会员价格管理</h1> -->
  <div>
    <div class="table">
      <template>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="ID" min-width="40">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="名称" min-width="70">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="原价/元" min-width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.oldprice }}</span>
            </template>
          </el-table-column>

          <el-table-column label="现价/元" min-width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.newprice }}</span>
            </template>
          </el-table-column>

          <el-table-column label="VIP上级返佣" min-width="110">
            <template slot-scope="scope">
              <span v-html="scope.row.vipreturn"></span>
            </template>
          </el-table-column>

          <el-table-column label="代理上级返佣" min-width="110">
            <template slot-scope="scope">
              <span v-html="scope.row.proxyreturn"></span>
            </template>
          </el-table-column>

          <el-table-column label="员工VIP上级返佣" min-width="110">
            <template slot-scope="scope">
              <span v-html="scope.row.yuangongreturn"></span>
            </template>
          </el-table-column>

          <el-table-column label="图片" min-width="60">
            <template slot-scope="scope">
              <!-- <span>{{ scope.row.pic }}</span> -->
              <el-image
                style="width: 30px; height: 30px"
                :src="scope.row.pic"
                :preview-src-list="srcList"
              >></el-image>
            </template>
          </el-table-column>

          <el-table-column label="次数/次" min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.num }}</span>
            </template>
          </el-table-column>

          <el-table-column label="说明" min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.desc }}</span>
            </template>
          </el-table-column>

          <el-table-column label="是否上架" min-width="60">
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
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- 修改弹框 -->
    <div class="update">
      <el-dialog :visible.sync="dialogVisible" width="50%">
        <el-form
          :model="ruleForm"
          :rules="rules"
          size="mini"
          ref="ruleForm"
          label-width="220px"
          class="demo-ruleForm"
        >
          <el-form-item label="原价" prop="oldprice">
            <el-input v-model="ruleForm.oldprice"></el-input>
          </el-form-item>

          <el-form-item label="现价" prop="newprice">
            <el-input v-model="ruleForm.newprice"></el-input>
          </el-form-item>

          <el-form-item label="次数" prop="number">
            <el-input v-model="ruleForm.number"></el-input>
            <span>无限次值为-1</span>
          </el-form-item>

          <el-form-item label="vip上级返佣模式" prop="vipreturnmodel">
            <el-select v-model="ruleForm.vipreturnmodel" placeholder="请选择">
              <el-option label="固定金额" value="0"></el-option>
              <el-option label="百分比" value="1"></el-option>
            </el-select>
            <span>&nbsp;(固定金额/百分比)</span>
          </el-form-item>

          <el-form-item label="固定金额" prop="fixedprice1">
            <el-input v-model="ruleForm.fixedprice1">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>

          <el-form-item label="代理上级返佣模式" prop="proxyreturnmodel">
            <el-select v-model="ruleForm.proxyreturnmodel" placeholder="请选择">
              <el-option label="固定金额" value="0"></el-option>
              <el-option label="百分比" value="1"></el-option>
            </el-select>
            <span>&nbsp;(固定金额/百分比)</span>
          </el-form-item>

          <el-form-item label="固定金额" prop="fixedprice2">
            <el-input v-model="ruleForm.fixedprice2">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>

          <el-form-item label="员工VIP上级返佣模式" prop="yuangongreturnmodel">
            <el-select v-model="ruleForm.yuangongreturnmodel" placeholder="请选择">
              <el-option label="固定金额" value="0"></el-option>
              <el-option label="百分比" value="1"></el-option>
            </el-select>
            <span>&nbsp;(固定金额/百分比)</span>
          </el-form-item>

          <el-form-item label="固定金额" prop="fixedprice3">
            <el-input v-model="ruleForm.fixedprice3">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>

          <el-form-item label="图片" prop="pic">
            <el-upload
              class="avatar-uploader"
              action
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleAvatarChange"
            >
              <img v-if="ruleForm.pic" :src="ruleForm.pic" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="详情" prop="desc">
            <el-input type="textarea" rows="5" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
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
          name: "月卡会员",
          oldprice: "1888",
          newprice: "188",
          vipreturn: "模式: 固定金额 </br> 固定金额：50元 </br> 最终返佣：50元",
          proxyreturn:
            "模式: 固定金额 </br> 固定金额：106元 </br> 最终返佣：106元",
          yuangongreturn:
            "模式: 固定金额 </br> 固定金额：10元 </br> 最终返佣：10元",
          pic: require("../../../public/static/images/_404.png"),
          num: 1,
          desc: "可享受全场特定合作商家各一次免费畅玩服务十多分钟",
          state: true
        }
      ],

      // 弹框
      dialogVisible: false,

      ruleForm: {
        // 原价
        oldprice: "",
        // 现价
        newprice: "",
        // 次数
        number: "",
        // vip上级返佣模式
        vipreturnmodel: "",
        // 固定金额1
        fixedprice1: "",
        // 代理上级返佣模式
        proxyreturnmodel: "",
        // 固定金额2
        fixedprice2: "",
        // 员工VIP上级返佣模式
        yuangongreturnmodel: "",
        // 固定金额3
        fixedprice3: "",
        // 图片
        pic: "",
        // 详情
        desc: ""
      },
      rules: {
        oldprive: [{ required: true, message: "请输入", trigger: "blur" }],
        newprice: [{ required: true, message: "请输入", trigger: "blur" }],
        number: [{ required: true, message: "请输入", trigger: "blur" }],
        vipreturnmodel: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        fixedprice1: [{ required: true, message: "请输入", trigger: "blur" }],
        proxyreturnmodel: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        fixedprice2: [{ required: true, message: "请输入", trigger: "blur" }],
        yuangongreturnmodel: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        fixedprice3: [{ required: true, message: "请输入", trigger: "blur" }],
        pic: [{ required: true, message: "请选择", trigger: "change" }],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },

      // 图片预览
      srcList: [require("../../../public/static/images/_404.png")]
    };
  },
  methods: {
    handleAvatarChange(res, file) {
      console.log(res, file);
      // this.imageUrl = URL.createObjectURL(file.raw);
    },

    // 编辑按钮
    handleEdit(index, row) {
      // console.log(index, row);

      this.ruleForm.oldprice = row.oldprice;
      this.ruleForm.newprice = row.newprice;
      this.ruleForm.number = row.num;
      this.ruleForm.vipreturnmodel = 0;
      this.ruleForm.fixedprice1 = 50;
      this.ruleForm.proxyreturnmodel = 0;
      this.ruleForm.fixedprice2 = 106;
      this.ruleForm.yuangongreturnmodel = 0;
      this.ruleForm.fixedprice3 = 10;
      this.ruleForm.pic = row.pic;
      this.ruleForm.desc = row.desc;

      this.dialogVisible = true;
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.el-table {
  font-size: 12px !important;
}

.el-table /deep/ .cell {
  overflow: hidden !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
}

.el-table /deep/ th {
  padding: 7px 0 !important;
}
.el-table /deep/ td {
  padding: 3px 0 !important;
}

.el-form .el-form-item__content > .el-input {
  width: auto;
}
.el-form .el-form-item__content .el-select {
  width: 200px;
}
.el-form .el-form-item__content > .el-textarea {
  width: 500px;
}

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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>