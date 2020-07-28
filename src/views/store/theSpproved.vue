<template>
  <!-- <h1>店铺管理 - 已审核</h1> -->
  <div>
    <el-container>
      <el-header>
        <div class="search">
          <el-form ref="form" size="mini" :model="form" label-width="40px">
            <el-form-item label="名称">
              <el-input v-model="form.name" placeholder="请输入名称"></el-input>
            </el-form-item>

            <el-form-item label="电话">
              <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
            </el-form-item>

            <el-form-item label="类型">
              <el-select v-model="form.type" placeholder="选择类型">
                <el-option label="酒吧" value="0"></el-option>
                <el-option label="KTV" value="1"></el-option>
                <el-option label="清吧" value="1"></el-option>
              </el-select>
            </el-form-item>

            <div class="el-form-item">
              <el-button size="mini" class="search" type="primary" @click="onSearch">搜索</el-button>
              <el-button size="mini" type="danger">清空</el-button>
            </div>
          </el-form>
        </div>
      </el-header>
      <el-main>
        <div class="table">
          <template>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="ID" min-width="40">
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>

              <el-table-column label="名称" min-width="90">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="LOGO" min-width="50">
                <template slot-scope="scope">
                  <el-image
                    style="width: 30px; height: 30px"
                    :src="scope.row.logo"
                    :preview-src-list="srcList"
                  ></el-image>
                </template>
              </el-table-column>

              <el-table-column label="店铺类型" min-width="40">
                <template slot-scope="scope">
                  <span>{{ scope.row.storetype }}</span>
                </template>
              </el-table-column>

              <el-table-column label="店铺电话" min-width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.storephone }}</span>
                </template>
              </el-table-column>

              <el-table-column label="客服电话" min-width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.servicephone }}</span>
                </template>
              </el-table-column>

              <el-table-column label="服务时间" min-width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.servicetime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="审核时间" min-width="90">
                <template slot-scope="scope">
                  <span>{{ scope.row.audittime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="审核结果" min-width="60">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.state == '0' ? 'danger':''"
                    size="small"
                  >{{ scope.row.state == '0' ? '已拒绝':'已通过' }}</el-tag>
                </template>
              </el-table-column>

              <el-table-column label="备注" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.note }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作" min-width="120">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleSet(scope.$index, scope.row)"
                  >设置</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)"
                  >修改</el-button>
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

        <!-- 修改弹框 -->
        <div class="update">
          <el-dialog :visible.sync="dialogVisible" width="50%">
            <el-form
              :model="ruleForm"
              :rules="rules"
              size="mini"
              ref="ruleForm"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>

              <el-form-item label="LOGO" prop="logo">
                <el-upload
                  class="avatar-uploader"
                  action
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-change="handleAvatarChange"
                >
                  <img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="店铺类型" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                  <el-option label="清吧" value="0"></el-option>
                  <el-option label="KTV" value="1"></el-option>
                  <el-option label="酒吧" value="2"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="服务电话" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>

              <el-form-item label="店铺介绍" prop="desc">
                <el-input type="textarea" rows="6" v-model="ruleForm.desc"></el-input>
              </el-form-item>

              <el-form-item label="开始营业时间" prop="date1">
                <!-- :picker-options="{selectableRange: '18:30:00 - 20:30:00'}" -->
                <el-time-picker v-model="ruleForm.date1" placeholder="任意时间点"></el-time-picker>
              </el-form-item>

              <el-form-item label="结束营业时间" prop="date2">
                <el-time-picker v-model="ruleForm.date2" placeholder="任意时间点"></el-time-picker>
              </el-form-item>

              <el-form-item label="省" prop="province">
                <el-select v-model="ruleForm.province" placeholder="请选择" @change="getcity">
                  <template v-for="(item,index) in citylist">
                    <el-option :key="index" :label="item.p" :value="item.p"></el-option>
                  </template>
                </el-select>
              </el-form-item>

              <el-form-item label="市" prop="city">
                <el-select v-model="ruleForm.city" placeholder="请选择" @change="getarea">
                  <template v-for="(item,index) in city">
                    <el-option :key="index" :label="item.n" :value="item.n"></el-option>
                  </template>
                </el-select>
              </el-form-item>

              <el-form-item label="区" prop="area">
                <el-select v-model="ruleForm.area" placeholder="请选择">
                  <template v-for="(item,index) in area">
                    <el-option :key="index" :label="item.s" :value="item.s"></el-option>
                  </template>
                </el-select>
              </el-form-item>

              <el-form-item label="店铺详细地址" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
              </el-form-item>

              <el-form-item label="经度" prop="longitude">
                <el-input v-model="ruleForm.longitude"></el-input>
              </el-form-item>

              <el-form-item label="纬度" prop="latitude">
                <el-input v-model="ruleForm.latitude"></el-input>
              </el-form-item>

              <el-form-item label="环境图片">
                <!-- <el-input v-model="ruleForm.pic"></el-input> -->
                <el-upload
                  action
                  list-type="picture-card"
                  :auto-upload="false"
                  :on-change="handleChange"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="环境视频">
                <el-upload
                  action
                  list-type="picture-card"
                  :auto-upload="false"
                  accept="video/mp4, video/ogg, video/flv, video/avi, video/wmv, video/rmvb"
                  :on-change="handleChangeVideo"
                  :on-remove="handleRemoveVideo"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="引流产品图片">
                <el-upload
                  action
                  list-type="picture-card"
                  :auto-upload="false"
                  :on-change="handleChangeProducts"
                  :on-remove="handleRemoveProducts"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="引流产品说明">
                <div class="products-wrap">
                  <!-- <div class="row">
                    图片：
                    <div class="product-image-container">
                      <el-upload
                        class="avatar-uploader"
                        action
                        :auto-upload="false"
                        :show-file-list="false"
                        :on-change="handleAvatarChange"
                      >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </div>

                    <el-input placeholder="请输入内容" v-model="ruleForm.input1">
                      <template slot="prepend">产品</template>
                    </el-input>
                    <el-input placeholder="请输入内容" v-model="ruleForm.input2">
                      <template slot="prepend">数量</template>
                    </el-input>
                    <el-input placeholder="请输入内容" v-model="ruleForm.input3">
                      <template slot="prepend">价格</template>
                    </el-input>
                    <el-button type="danger" size="mini">删除</el-button>
                  </div>
                  <div class="row">
                    图片：
                    <div class="product-image-container">
                      <el-upload
                        class="avatar-uploader"
                        action
                        :auto-upload="false"
                        :show-file-list="false"
                        :on-change="handleAvatarChange"
                      >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </div>

                    <el-input placeholder="请输入内容" v-model="ruleForm.input1">
                      <template slot="prepend">产品</template>
                    </el-input>
                    <el-input placeholder="请输入内容" v-model="ruleForm.input2">
                      <template slot="prepend">数量</template>
                    </el-input>
                    <el-input placeholder="请输入内容" v-model="ruleForm.input3">
                      <template slot="prepend">价格</template>
                    </el-input>
                    <el-button type="danger" size="mini">删除</el-button>
                  </div>-->
                  <div class="row" v-for="(item,index) in addproductslist" :key="index">
                    图片：
                    <div class="product-image-container">
                      <el-upload
                        class="avatar-uploader"
                        action
                        :auto-upload="false"
                        :show-file-list="false"
                        :on-change="handleAvatarChangeProducts"
                      >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </div>

                    <el-input placeholder="请输入内容" v-model="ruleForm.input1">
                      <template slot="prepend">产品</template>
                    </el-input>
                    <el-input placeholder="请输入内容" v-model="ruleForm.input2">
                      <template slot="prepend">数量</template>
                    </el-input>
                    <el-input placeholder="请输入内容" v-model="ruleForm.input3">
                      <template slot="prepend">价格</template>
                    </el-input>
                    <el-button type="danger" size="mini" @click="deleteproducts">删除</el-button>
                  </div>
                  <div class="row">
                    <el-button type="primary" size="mini" @click="addproducts">增加</el-button>
                  </div>
                </div>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">返回</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </el-main>
      <el-footer>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="100"
            layout=" prev , pager , next , jumper , total"
            :total="400"
          ></el-pagination>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      // 检索数据
      form: {
        //  名称
        name: "",
        // 电话
        phone: "",
        // 类型
        type: ""
      },

      // 修改弹框
      dialogVisible: false,

      // 表格数据
      tableData: [
        {
          id: "1060",
          name: "MISS酒吧",
          logo: require("../../../public/static/images/blue.png"),
          storetype: "清吧",
          storephone: "16673238888",
          servicephone: "16673238888",
          servicetime: "20:00 - 03:00",
          audittime: "2020-07-20 18:10:17",
          state: "1",
          note: "后台添加"
        }
      ],

      // 修改弹框城市列表
      citylist: [],

      srcList: [require("../../../public/static/images/blue.png")],

      // 修改数据
      ruleForm: {
        // 活动名称
        name: "",
        // LOGO
        logo: "",
        // 店铺类型
        region: "",
        // 服务电话
        phone: "",
        // 店铺介绍
        desc: "",
        // 开始营业时间
        date1: "",
        // 结束营业时间
        date2: "",
        // 省
        province: "",
        // 是
        city: "",
        // 区
        area: "",
        // 店铺详细地址
        address: "",
        // 经度
        longitude: "",
        // 纬度
        latitude: "",
        // 环境图片
        pic: "",
        // 引流产品说明
        // 产品
        input1: "",
        // 数量
        input2: "",
        // 价格
        input3: ""
      },
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        logo: [{ required: true, message: "请输入", trigger: "change" }],
        phone: [{ required: true, message: "请输入", trigger: "blur" }],
        desc: [{ required: true, message: "请填写", trigger: "blur" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择开始时间",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择结束时间",
            trigger: "change"
          }
        ],
        province: [{ required: true, message: "请选择", trigger: "change" }],
        city: [{ required: true, message: "请选择", trigger: "change" }],
        area: [{ required: true, message: "请选择", trigger: "change" }],
        address: [{ required: true, message: "请输入", trigger: "blur" }],
        longitude: [{ required: true, message: "请输入", trigger: "blur" }],
        latitude: [{ required: true, message: "请输入", trigger: "blur" }]
      },

      // 市级数据
      city: [],
      // 区级数据
      area: [],

      // 引流产品列表 - 想要有多少个
      addproductslist: [0, 1],
      // 引流产品说明图片
      imageUrl: "",

      // 分页
      currentPage: 1,
    };
  },
  methods: {
    // 搜索按钮
    onSearch() {
      console.log("Search!");
    },

    // 修改logo图
    handleAvatarChange() {},

    // 点击按钮添加引流产品说明
    addproducts() {
      let i = 0
      this.addproductslist.push(++i)
      console.log(this.addproductslist)
    },
    
    // 点击按钮删除引流产品说明
    deleteproducts(){
      this.addproductslist.pop()
    },

    // 引流产品图片
    handleAvatarChangeProducts(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res, file);
    },

    // 上传引流产品图片
    handleChangeProducts(file, fileList) {
      console.log(file, fileList);
    },

    // 移除引流产品图片
    handleRemoveProducts(file, fileList) {
      console.log(file, fileList);
    },

    // 上传环境视频
    handleChangeVideo(file, fileList) {
      console.log(file, fileList);
    },

    // 移除环境视频
    handleRemoveVideo(file, fileList) {
      console.log(file, fileList);
    },

    // 上传环境图片
    handleChange(file, fileList) {
      console.log(file, fileList);
    },

    // 移除环境图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    // 修改 - 获取市的信息
    getcity(value) {
      // this.ruleForm.city = "";
      // this.ruleForm.area = "";
      // console.log(value);
      this.citylist.forEach(val => {
        if (value == val.p) {
          // console.log(val)
          this.city = val.c;
        }
      });
      this.ruleForm.city = this.city[0].n;
      this.getarea(this.city[0].n);
    },
    // 修改 - 获取区的信息
    getarea(value) {
      // this.ruleForm.area = "";
      // console.log(value);
      this.city.forEach(val => {
        if (value == val.n) {
          // console.log(val)
          this.area = val.a;
        }
      });
      this.ruleForm.area = this.area[0].s;
    },

    // 修改保存按钮
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
    // 修改返回按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 设置按钮
    handleSet(index, row) {
      console.log(index, row);
      this.$router.push({ name: "theSpprovedSet" });
    },
    // 修改按钮
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialogVisible = true;
    },
    // 删除按钮
    handleDelete(index, row) {
      console.log(index, row);
    },

    // 切换分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    // 获取城市数据
    getCitys() {
      Vue.axios
        .get("citys.json")
        .then(res => {
          // console.log(res);
          this.citylist = res.data.citylist;
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {
    this.getCitys();
  }
};
</script>

<style lang="less" scoped>
.el-header {
  height: 47px !important;

  .el-form .el-form-item {
    display: inline-block;
    margin-right: 10px;
    vertical-align: top;
  }
}

.el-main {
  padding: 0 0 !important;

  .el-table {
    font-size: 12px !important;
  }

  .el-table /deep/ th {
    padding: 7px 0 !important;
  }
  .el-table /deep/ td {
    padding: 9px 0 !important;
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
    width: 178px;
    height: 178px;
    display: block;
  }
  .update {
    .el-form .el-form-item__content > .el-input {
      width: 200px;
    }
    .el-form .el-form-item__content .el-select {
      width: 360px;
    }
    .el-form .el-form-item__content > .el-textarea {
      width: 500px;
    }

    .product-image-container {
      width: 28px;
      height: 28px;
    }

    .products-wrap .row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      min-width: 800px;
      margin-bottom: 12px;

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
        font-size: 16px;
        color: #8c939d;
        width: 28px;
        height: 28px;
        line-height: 28px;
        text-align: center;
      }
      .avatar {
        width: 28px;
        height: 28px;
        display: block;
      }
    }
    .products-wrap .row > .el-input {
      max-width: 200px;
    }
  }
}
</style>