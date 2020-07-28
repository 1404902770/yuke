<template>
  <!-- <h1>设置 - 幻灯片管理</h1> -->
  <div>
    <el-container>
      <el-header>
        <el-form ref="form" size="mini" :model="form" label-width="40px">
          <el-form-item label="类型">
            <el-select v-model="form.region" placeholder="选择类型">
              <el-option label="用户端" value="0"></el-option>
              <el-option label="客户端" value="1"></el-option>
            </el-select>

            <el-button class="search" type="primary" @click="onSearch">搜索</el-button>
            <el-button type="danger">清空</el-button>
            <el-button type="primary">
              <i class="el-icon-refresh"></i> 刷新
            </el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-button class="addinfo" size="mini" type="primary" @click="addinfo">添加</el-button>

        <div class="table">
          <template>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="ID" min-width="40">
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="幻灯片标题" min-width="140">
                <template slot-scope="scope">
                  <span>{{ scope.row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column label="图片" min-width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.pic }}</span>
                </template>
              </el-table-column>
              <el-table-column label="幻灯片类型" min-width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.type }}</span>
                </template>
              </el-table-column>
              <el-table-column label="链接地址" min-width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.urladdress }}</span>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" min-width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column label="开启状态" min-width="60">
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
                    @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button>
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
      </el-main>

      <!-- 添加弹框 -->
      <div>
        <el-dialog title="添加幻灯片" :visible.sync="dialogVisible" width="50%" @close="closedialog">
          <div class="form">
            <el-form
              :model="ruleForm"
              :rules="rules"
              size="mini"
              ref="ruleForm"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-form-item label="标题 " prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>

              <el-form-item label="类型 " prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                  <el-option label="商户端" value="0"></el-option>
                  <el-option label="用户端-首页" value="1"></el-option>
                  <el-option label="用户端-会员卡列表" value="2"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                v-if="ruleForm.region !='' && ruleForm.region !='2'"
                label="缩略图"
                prop="filepic"
              >
                <el-upload
                  class="avatar-uploader"
                  action
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-change="handleAvatarSuccess1"
                >
                  <img v-if="ruleForm.filepic" :src="ruleForm.filepic" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item
                v-if="ruleForm.region !='' && ruleForm.region !='2'"
                label="点击类型 "
                prop="clicltype"
              >
                <el-select v-model="ruleForm.clicltype" placeholder="请选择类型">
                  <el-option label="无跳转" value="0"></el-option>
                  <el-option :disabled="ruleForm.region =='0' ? true:false" label="店铺ID" value="1"></el-option>
                  <el-option label="幻灯片内容" value="2"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item v-if=" ruleForm.region =='2'" label="幻灯片类型 " prop="bannertype">
                <el-select v-model="ruleForm.bannertype" placeholder="请选择">
                  <el-option label="图片" value="0"></el-option>
                  <el-option label="视频" value="1"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item v-if=" ruleForm.region =='2'" label="图片" prop="picture">
                <el-upload
                  class="avatar-uploader"
                  action
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-change="handleAvatarSuccess2"
                >
                  <img v-if="ruleForm.picture" :src="ruleForm.picture" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="addsure('ruleForm')">添 加</el-button>
                <el-button @click="resetForm('ruleForm')">重 置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="resetForm('ruleForm1')">取 消</el-button>
            <el-button size="mini" type="primary" @click="addsure('ruleForm1')">确 定</el-button>
          </span>-->
        </el-dialog>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 检索数据
      form: {
        //  类型
        region: ""
      },
      // 表格数据
      tableData: [
        {
          id: "52",
          title: "开业巨献",
          pic: "",
          type: "用户端-首页",
          urladdress: "店铺",
          date: "2020-07-19 16:07:24",
          state: true
        }
      ],

      // 添加幻灯片弹框数据
      ruleForm: {
        // 标题
        title: "",
        // 类型
        region: "",
        // 缩略图
        filepic: "",
        // 点击类型
        clicltype: "",
        // 幻灯片类型
        bannertype: "",
        // 图片
        picture: ""
      },
      rules: {
        title: [{ required: true, message: "请输入", trigger: "blur" }],
        region: [{ required: true, message: "请选择", trigger: "change" }],
        filepic: [{ required: true, message: "请选择", trigger: "change" }],
        clicltype: [{ required: true, message: "请选择", trigger: "change" }],
        bannertype: [{ required: true, message: "请选择", trigger: "change" }],
        picture: [{ required: true, message: "请选择", trigger: "change" }]
      },

      dialogVisible: false
    };
  },
  methods: {
    // 搜索按钮
    onSearch() {
      console.log("Search!");
    },

    // 添加按钮
    addinfo() {
      this.dialogVisible = true;
    },

    // 上传缩略图
    handleAvatarSuccess1(res, file) {
      console.log(res, file);
      //   this.ruleForm.merchantspic = URL.createObjectURL(file.raw);
    },

    // 上传图片
    handleAvatarSuccess2(res, file) {
      console.log(res, file);
      //   this.ruleForm.merchantspic = URL.createObjectURL(file.raw);
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

    // 关闭弹框
    closedialog() {
      this.ruleForm.title = "";
      this.ruleForm.region = "";
      this.ruleForm.filepic = "";
      this.ruleForm.clicltype = "";
      this.ruleForm.bannertype = "";
      this.ruleForm.picture = "";
    },

    // 编辑按钮
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogVisible = true;

      this.ruleForm.title = row.title;
      this.ruleForm.pic = row.pic;
      this.ruleForm.type = row.type;
      this.ruleForm.urladdress = row.urladdress;
      this.ruleForm.state = row.state;
    },
    // 删除按钮
    handleDelete(index, row) {
      console.log(index, row);
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
  .addinfo {
    margin-bottom: 8px;
  }
}
.search {
  margin-left: 10px;
}
.el-table {
  font-size: 12px !important;
}
.el-table /deep/ th {
  padding: 7px 0 !important;
}

.el-form .el-form-item__content .el-select,
.el-form .el-form-item__content > .el-input {
  width: 200px;
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

.el-dialog__wrapper /deep/ .el-dialog__footer {
  text-align: left !important;
}
</style>