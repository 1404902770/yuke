<template>
<!-- <h1>店铺管理 - 已审核 - 设置</h1> -->
  <div>
    <el-container>
      <el-header>
        <div class="headnav">
          <el-button type="primary" size="mini" @click="goback">
            <i class="el-icon-back"></i> 返回
          </el-button>
          <div class="tabmenu">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="设置" name="0"></el-tab-pane>
              <el-tab-pane label="店铺管理员" name="1"></el-tab-pane>
              <el-tab-pane label="生成畅聊二维码" name="2"></el-tab-pane>
              <el-tab-pane label="商家会员卡列表" name="3"></el-tab-pane>
              <el-tab-pane label="商品列表" name="4"></el-tab-pane>
              <el-tab-pane label="订单记录" name="5"></el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-header>
      <el-main>
        <!-- 设置 -->
        <div class="setting" v-show="activeName == '0' ?true:false">
          <el-form
            :model="ruleForm"
            :rules="rules"
            size="mini"
            ref="ruleForm"
            label-width="180px"
            class="demo-ruleForm"
          >
            <el-form-item label="默认点赞量设置" prop="likenum">
              <el-input v-model="ruleForm.likenum"></el-input>
            </el-form-item>

            <el-form-item label="默认交易量设置" prop="tradingnum">
              <el-input v-model="ruleForm.tradingnum"></el-input>
            </el-form-item>

            <el-form-item label="默认浏览量" prop="viewsnum">
              <el-input v-model="ruleForm.viewsnum"></el-input>
            </el-form-item>

            <el-form-item label="是否人气商家推荐" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="商家推荐门头图" prop="pic">
              <el-upload
                class="avatar-uploader"
                action
                :auto-upload="false"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="ruleForm.pic" :src="ruleForm.pic" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button @click="resetForm('ruleForm')">返回</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 店铺管员列表 -->
        <div class="storeadmin" v-show="activeName == '1' ?true:false">
          <div class="search">
            <el-form ref="form" size="mini" :model="form" label-width="40px">
              <el-form-item label="名称">
                <el-input v-model="form.name" placeholder="请输入昵称"></el-input>
              </el-form-item>

              <el-form-item label="电话">
                <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
              </el-form-item>

              <el-form-item label="类型">
                <el-select v-model="form.type" placeholder="选择类型">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="管理员" value="1"></el-option>
                  <el-option label="普通员工" value="2"></el-option>
                </el-select>
              </el-form-item>

              <div class="el-form-item">
                <el-button size="mini" class="search" type="primary" @click="onSearch">搜索</el-button>
                <el-button size="mini" type="info">清空</el-button>
                <el-button size="mini" type="primary">
                  <i class="el-icon-refresh"></i> 刷新
                </el-button>
                <el-button size="mini" type="primary" @click="addadmin">添加管理员</el-button>
              </div>
            </el-form>
          </div>
          <div class="tablewrap">
            <template>
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="ID" min-width="30">
                  <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="名称" min-width="90">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="电话号码" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.phone }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="类型" min-width="60">
                  <template slot-scope="scope">
                    <span>{{ scope.row.type }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="创建人" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.founder }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="余额" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="冻结余额" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.freeze }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="scope">
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

          <!-- 添加管理员 -->
          <div>
            <el-dialog :visible.sync="dialogVisible" width="30%">
              <el-form
                :model="ruleFormaddadmin"
                :rules="rulesaddadmin"
                size="mini"
                ref="ruleFormaddadmin"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="名称" prop="name">
                  <el-input v-model="ruleFormaddadmin.name"></el-input>
                </el-form-item>

                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="ruleFormaddadmin.phone"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                  <el-input v-model="ruleFormaddadmin.password"></el-input>
                </el-form-item>

                <el-form-item label="类型" prop="type">
                  <el-select v-model="ruleFormaddadmin.type" placeholder="请选择">
                    <el-option label="管理员" value="1"></el-option>
                    <el-option label="普通用户" value="0"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitFormaddadmin('ruleFormaddadmin')">添加</el-button>
                  <el-button @click="resetForm('ruleFormaddadmin')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
        </div>

        <!-- 生成畅聊二维码 -->
        <div class="qrcode" v-show="activeName == '2' ?true:false">
          <div class="qrcode">
            <el-form
              ref="formqrcode"
              size="mini"
              :model="formqrcode"
              :rules="rulesqrcode"
              label-width="120px"
            >
              <el-form-item label="LOGO" prop="imageUrl">
                <el-upload
                  class="avatar-uploader"
                  action
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-change="handleAvatarChange"
                >
                  <img v-if="formqrcode.imageUrl" :src="formqrcode.imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitFormqrcode('formqrcode')">确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <!-- 商家会员卡列表 -->
        <div class="storevipcode" v-show="activeName == '3' ?true:false">
          <div class="tablewrap">
            <template>
              <el-table :data="tableDataVipCode" border style="width: 100%">
                <el-table-column label="ID" min-width="30">
                  <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="介绍图" min-width="90">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="分享图" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.phone }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="链接图片" min-width="60">
                  <template slot-scope="scope">
                    <span>{{ scope.row.type }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="奖励比例" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.founder }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="价格" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="现收入" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.freeze }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="已售出总数" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="剩余总数" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="分享总数" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>

                <!-- <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>-->
              </el-table>
            </template>
          </div>
        </div>

        <!-- 商品列表 -->
        <div class="goodslist" v-show="activeName == '4' ?true:false">
          <div class="search">
            <el-form ref="formGoods" size="mini" :model="formGoods" label-width="68px">
              <el-form-item label="商品名称">
                <el-input v-model="formGoods.goodsname"></el-input>
              </el-form-item>

              <div class="el-form-item">
                <el-button size="mini" class="search" type="primary" @click="searchgoods">搜索</el-button>
                <el-button size="mini" type="info">清空</el-button>
                <el-button size="mini" type="primary">
                  <i class="el-icon-refresh"></i> 刷新
                </el-button>
              </div>
            </el-form>
          </div>
          <div class="tablewrap">
            <template>
              <el-table :data="tableDataGoods" border style="width: 100%">
                <el-table-column label="ID" min-width="30">
                  <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="商品名称" min-width="90">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="商品名称" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.phone }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="商品价格" min-width="60">
                  <template slot-scope="scope">
                    <span>{{ scope.row.type }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="商品售出数额" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.founder }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="商品" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="商品描述" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.freeze }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="上架状态" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>

                <!-- <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>-->
              </el-table>
            </template>
          </div>
          <div class="pages">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="100"
              layout=" prev, pager, next, jumper, total"
              :total="400"
            ></el-pagination>
          </div>
        </div>

        <!-- 订单记录 -->
        <div class="orderlist" v-show="activeName == '5' ?true:false">
          <div class="search">
            <el-form ref="formOrder" size="mini" :model="formOrder" label-width="68px">
              <el-form-item label="订单号">
                <el-input v-model="formOrder.order"></el-input>
              </el-form-item>

              <div class="el-form-item">
                <el-button size="mini" class="search" type="primary" @click="searchorder">搜索</el-button>
                <el-button size="mini" type="info">清空</el-button>
                <el-button size="mini" type="primary">
                  <i class="el-icon-refresh"></i> 刷新
                </el-button>
              </div>
            </el-form>
          </div>
          <div class="tablewrap">
            <template>
              <el-table :data="tableDataOrder" border style="width: 100%">
                <el-table-column label="ID" min-width="30">
                  <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="订单号" min-width="90">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="用户昵称" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.phone }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="电话号码" min-width="60">
                  <template slot-scope="scope">
                    <span>{{ scope.row.type }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="桌号" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.founder }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="数量" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="单价" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.freeze }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="订单总额" min-width="90">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="支付时间" min-width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="第三方流水号" min-width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="订单状态" min-width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="交易完成时间" min-width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="评论状态" min-width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>

                <!-- <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>-->
              </el-table>
            </template>
          </div>
          <div class="pages">
            <el-pagination
              @current-change="handleCurrentChangeOrder"
              :current-page="currentPageOrder"
              :page-size="100"
              layout=" prev, pager, next, jumper, total"
              :total="400"
            ></el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
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
      // tab当前项
      activeName: "0",

      // 检索数据
      form: {
        //  名称
        name: "",
        // 电话
        phone: "",
        // 类型
        type: "0"
      },

      // 设置数据
      ruleForm: {
        // 默认点赞量
        likenum: "0",
        // 默认交易量
        tradingnum: "0",
        // 默认浏览量
        viewsnum: "7",
        // 是否人气商家推荐
        resource: "0",
        // 商家推荐门头图
        pic: require("../../../public/static/images/blue.png")
      },
      rules: {
        likenum: [{ required: true, message: "请输入", trigger: "blur" }],
        tradingnum: [{ required: true, message: "请输入", trigger: "blur" }],
        viewsnum: [{ required: true, message: "请输入", trigger: "blur" }],
        resource: [{ required: true, message: "请选择", trigger: "change" }],
        pic: [{ required: true, message: "请选择", trigger: "change" }]
      },

      // 表格数据
      tableData: [
        {
          id: "52",
          name: "1.0.0",
          phone: "16673238888",
          type: "管理员	",
          founder: "后台创建",
          balance: "0",
          freeze: "0"
        }
      ],

      // 添加管理员
      dialogVisible: false,

      // 添加管理员数据
      ruleFormaddadmin: {
        // 名称
        name: "",
        // 手机号码
        phone: "",
        // 密码
        password: "",
        // 类型
        type: ""
      },
      rulesaddadmin: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        password: [{ required: true, message: "请输入", trigger: "blur" }],

        type: [{ required: true, message: "请选择", trigger: "change" }]
      },

      // 生成畅聊二维码数据
      formqrcode: {
        imageUrl: [require("../../../public/static/images/blue.png")]
      },
      rulesqrcode: {
        imageUrl: [{ required: true, message: "请选择", trigger: "change" }]
      },

      // 商家会员卡列表 - 表格数据
      tableDataVipCode: [
        {
          id: "52",
          name: "1.0.0",
          phone: "16673238888",
          type: "管理员	",
          founder: "后台创建",
          balance: "0",
          freeze: "0"
        }
      ],

      // 商品列表 - 搜索数据
      formGoods: {
        goodsname: ""
      },

      // 商品列表 - 表格数据
      tableDataGoods: [
        {
          id: "52",
          name: "1.0.0",
          phone: "16673238888",
          type: "管理员	",
          founder: "后台创建",
          balance: "0",
          freeze: "0"
        }
      ],

      // 商品列表 - 分页
      currentPage: 1,

      // 订单列表 - 搜索数据
      formOrder: {
        order: ""
      },

      // 订单列表 - 表格数据
      tableDataOrder: [
        {
          id: "52",
          name: "1.0.0",
          phone: "16673238888",
          type: "管理员	",
          founder: "后台创建",
          balance: "0",
          freeze: "0"
        }
      ],

      // 商品列表 - 分页
      currentPageOrder: 1
    };
  },
  methods: {
    // tab切换
    handleClick(tab, event) {
      //   console.log(tab, event);
      this.activeName = tab.name;
    },
    // 返回
    goback() {
      this.$router.go(-1);
    },

    // 商品列表 - 分页切换
    handleCurrentChangeOrder() {},

    // 订单列表 - 搜索按钮
    searchorder() {
      console.log("Search!");
    },

    // 商品列表 - 分页切换
    handleCurrentChange() {},

    // 商品列表 - 搜索按钮
    searchgoods() {
      console.log("Search!");
    },

    // 生成畅聊二维码 - 上传LOGO
    handleAvatarChange() {},

    // 生成畅聊二维码 - 确定按钮
    submitFormqrcode(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 店铺管理源列表 - 搜索按钮
    onSearch() {
      console.log("Search!");
    },

    // 店铺管理源列表 - 添加按钮
    addadmin() {
      this.dialogVisible = true;
    },

    // 店铺管理源列表 - 删除按钮
    handleDelete(index, row) {
      console.log(index, row);
    },

    // 设置 - 上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    // 店铺管理员列表 - 添加管理员按钮
    submitFormaddadmin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 设置 - 保存按钮
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
    // 设置 - 返回按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.el-main {
  padding-left: 0 !important;

  .storeadmin,
  .storevipcode,
  .goodslist,
  .orderlist {
    .el-form .el-form-item {
      display: inline-block;
      margin-right: 10px;
      vertical-align: top;
    }
    .el-table /deep/ th,
    .el-table /deep/ td {
      padding: 7px 0 !important;
      font-size: 12px !important;
    }
  }

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
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>