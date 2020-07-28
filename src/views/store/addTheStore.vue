<template>
  <!-- <h1>店铺管理 - 添加店铺</h1> -->
  <div>
    <el-container>
      <el-header>
        <div class="steps">
          <el-steps :active="active" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
          </el-steps>
        </div>
      </el-header>
      <el-main>
        <div class="content">
          <div v-if="active == 0" class="tablewrap">
            <el-form
              :model="ruleForm"
              :rules="rules"
              size="mini"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="店铺名称" prop="storename">
                <el-input v-model="ruleForm.storename" placeholder="请输入店铺名称"></el-input>
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

              <el-form-item label="电话号码" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>

              <el-form-item label="默认密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
              </el-form-item>

              <el-form-item label="店铺类型" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                  <el-option label="酒吧" value="0"></el-option>
                  <el-option label="KTV" value="1"></el-option>
                  <el-option label="清吧" value="2"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="服务电话" prop="servephone">
                <el-input v-model="ruleForm.servephone"></el-input>
              </el-form-item>

              <el-form-item label="活动形式" prop="desc">
                <el-input type="textarea" rows="6" v-model="ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="submitForm('ruleForm')">下一步</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              </el-form-item>
            </el-form>
          </div>

          <div v-if="active == 1" class="tablewrap">
            <el-form
              :model="ruleFormsecond"
              :rules="rulessecond"
              size="mini"
              ref="ruleFormsecond"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-form-item label="开始营业时间" prop="date1">
                <!-- :picker-options="{selectableRange: '18:30:00 - 20:30:00'}" -->
                <el-time-picker v-model="ruleFormsecond.date1" placeholder="任意时间点"></el-time-picker>
              </el-form-item>

              <el-form-item label="结束营业时间" prop="date2">
                <el-time-picker v-model="ruleFormsecond.date2" placeholder="任意时间点"></el-time-picker>
              </el-form-item>

              <el-form-item label="省" prop="province">
                <el-select v-model="ruleFormsecond.province" placeholder="请选择" @change="getcity">
                  <template v-for="(item,index) in citylist">
                    <el-option :key="index" :label="item.p" :value="item.p"></el-option>
                  </template>
                </el-select>
              </el-form-item>

              <el-form-item label="市" prop="city">
                <el-select v-model="ruleFormsecond.city" placeholder="请选择" @change="getarea">
                  <template v-for="(item,index) in city">
                    <el-option :key="index" :label="item.n" :value="item.n"></el-option>
                  </template>
                </el-select>
              </el-form-item>

              <el-form-item label="区" prop="area">
                <el-select v-model="ruleFormsecond.area" placeholder="请选择">
                  <template v-for="(item,index) in area">
                    <el-option :key="index" :label="item.s" :value="item.s"></el-option>
                  </template>
                </el-select>
              </el-form-item>

              <el-form-item label="店铺详细地址" prop="address">
                <el-input v-model="ruleFormsecond.address"></el-input>
              </el-form-item>

              <el-form-item label="经度" prop="longitude">
                <el-input v-model="ruleFormsecond.longitude"></el-input>
              </el-form-item>

              <el-form-item label="纬度" prop="latitude">
                <el-input v-model="ruleFormsecond.latitude"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button @click="submitFormprev('ruleFormsecond')">上一步</el-button>
                <el-button @click="submitForm('ruleFormsecond')">下一步</el-button>
                <!-- <el-button @click="resetForm('ruleFormsecond')">返回</el-button> -->
              </el-form-item>
            </el-form>
          </div>

          <div v-if="active == 2" class="tablewrap">
            <el-form
              :model="ruleFormthird"
              :rules="rulesthird"
              size="mini"
              ref="ruleFormthird"
              label-width="120px"
              class="demo-ruleForm"
            >
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
                <el-button @click="submitFormprev('ruleFormthird')">上一步</el-button>
                <el-button type="primary" @click="submitFormadd('ruleFormthird')">添加</el-button>
                <!-- <el-button @click="resetForm('ruleFormthird')">返回</el-button> -->
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      // 步骤条激活
      active: 0,
      // 第三部表单数据
      ruleFormthird: {},
      rulesthird: {},
      // 引流产品列表 - 想要有多少个
      addproductslist: [0, 1],
      // 引流产品说明图片
      imageUrl: "",

      // 第二步表单数据
      ruleFormsecond: {
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
        latitude: ""
      },
      rulessecond: {
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
      // 修改弹框城市列表
      citylist: [],
      // 市级数据
      city: [],
      // 区级数据
      area: [],

      // 第一步表单数据
      ruleForm: {
        // 店铺名称
        storename: "",
        // logo
        logo: "",
        // 电话号码
        phone: "",
        // 默认密码
        password: "",
        // 店铺类型
        region: "",
        // 服务电话
        servephone: "",
        // 活动形式
        desc: ""
      },
      rules: {
        storename: [{ required: true, message: "请输入", trigger: "blur" }],
        logo: [{ required: true, message: "请输入", trigger: "change" }],
        phone: [{ required: true, message: "请输入", trigger: "blur" }],
        password: [{ required: true, message: "请输入", trigger: "blur" }],
        region: [{ required: true, message: "请选择", trigger: "change" }],
        servephone: [{ required: true, message: "请选择", trigger: "blur" }],
        desc: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 第三步
    // 添加按钮
    submitFormadd() {},

    // 点击按钮添加引流产品说明
    addproducts() {
      let i = 0;
      this.addproductslist.push(++i);
      console.log(this.addproductslist);
    },

    // 点击按钮删除引流产品说明
    deleteproducts() {
      this.addproductslist.pop();
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

    // 第二步
    // 获取市的信息
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
    // 获取区的信息
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

    // 上传LOGO
    handleAvatarChange(file, fileList) {
      console.log(file, fileList);
      this.ruleForm.logo = file.raw;
    },

    // 上一步按钮
    submitFormprev(formName) {
      this.active = this.active - 1;
    },
    // 下一步按钮
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.active = this.active + 1;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
.content {
  .el-form .el-form-item__content > .el-select,
  .el-form .el-form-item__content > .el-input {
    width: 200px;
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