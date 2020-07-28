<template>
  <!-- <h1>营销管理 - 发送优惠劵</h1> -->
  <div>
    <div class="formwrap">
      <el-form
        :model="ruleForm"
        :rules="rules"
        size="mini"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="数量" prop="number">
          <el-input v-model="ruleForm.number"></el-input>
        </el-form-item>

        <el-form-item class="validity" label="有效期" prop="validity">
          <el-select v-model="ruleForm.validity" placeholder="请选择">
            <el-option label="永久" value="0"></el-option>
            <el-option label="指定月份" value="1"></el-option>
          </el-select>

          <el-form-item v-if="ruleForm.validity =='1'" label="有效月份">
            <el-input-number
              v-model="ruleForm.num"
              @change="handleChange"
              :min="1"
              :max="10"
              label="有效月份"
            ></el-input-number>
          </el-form-item>
        </el-form-item>

        <el-form-item label="劵类型" prop="stocktype">
          <el-select v-model="ruleForm.stocktype" placeholder="请选择">
            <el-option label="指定劵" value="0"></el-option>
            <el-option label="通用劵" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="ruleForm.stocktype == '0'" label="请输入商家名称" prop="storename">
          <el-autocomplete
            class="inline-input"
            v-model="ruleForm.storename"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>

        <el-form-item label="发放用户" prop="senduser">
          <el-select v-model="ruleForm.senduser" placeholder="请选择">
            <el-option label="指定用户" value="0"></el-option>
            <el-option label="所有人" value="1"></el-option>
          </el-select>

          <el-form-item v-if="ruleForm.senduser=='0'" label="请输入手机号">
            <!-- <el-input v-model="ruleForm.phone" @keydown.enter.native="generate"></el-input> -->
            <el-autocomplete
              class="inline-input"
              v-model="ruleForm.phone"
              @keydown.enter.native="generate"
              :fetch-suggestions="querySearchphone"
              placeholder="请输入内容"
              @select="handleSelectphone"
            ></el-autocomplete>
          </el-form-item>

          <div class="phone">
            <el-form-item v-if="ruleForm.senduser=='0'" label="已选择">
              <template v-for="(item,index) in ruleForm.result">
                <p v-if="ruleForm.result!=''" class="card" :key="index">
                  {{item}}
                  <i title="删除" class="el-icon-close" @click="resetphone(item)"></i>
                </p>
              </template>
            </el-form-item>
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
        // 数量
        number: "1",
        // 有效期
        validity: "1",
        // 有效期时间
        num: "",
        // 劵类型
        stocktype: "1",
        // 请输入商家名称
        storename: "",
        // 发放用户
        senduser: "1",
        // 指定用户手机号
        phone: "",
        // 已输入
        result: []
      },
      // 表单验证
      rules: {
        number: [{ required: true, message: "请输入数量", trigger: "blur" }],
        stocktype: [{ required: true, message: "请选择", trigger: "change" }],
        storename: [{ required: true, message: "请输入", trigger: "change" }]
      },
      // 推荐商户
      restaurants: [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号"
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          value: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
        },
        {
          value: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层"
        },
        { value: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { value: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          value: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺"
        },
        {
          value: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819"
        },
        {
          value: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
        },
        { value: "枪会山", address: "上海市普陀区棕榈路" },
        { value: "纵食", address: "元丰天山花园(东门) 双流路267号" },
        { value: "钱记", address: "上海市长宁区天山西路" },
        { value: "壹杯加", address: "上海市长宁区通协路" },
        {
          value: "唦哇嘀咖",
          address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"
        },
        { value: "爱茜茜里(西郊百联)", address: "长宁区仙霞西路88号1305室" },
        {
          value: "爱茜茜里(近铁广场)",
          address:
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
        },
        {
          value: "鲜果榨汁（金沙江路和美广店）",
          address: "普陀区金沙江路2239号金沙和美广场B1-10-6"
        },
        {
          value: "开心丽果（缤谷店）",
          address: "上海市长宁区威宁路天山路341号"
        },
        { value: "超级鸡车（丰庄路店）", address: "上海市嘉定区丰庄路240号" },
        { value: "妙生活果园（北新泾店）", address: "长宁区新渔路144号" },
        { value: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
        {
          value: "凡仔汉堡（老真北路店）",
          address: "上海市普陀区老真北路160号"
        },
        { value: "港式小铺", address: "上海市长宁区金钟路968号15楼15-105室" },
        { value: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
        { value: "北京饺子馆", address: "长宁区北新泾街道天山西路490-1号" },
        {
          value: "饭典*新简餐（凌空SOHO店）",
          address: "上海市长宁区金钟路968号9号楼地下一层9-83室"
        },
        {
          value: "焦耳·川式快餐（金钟路店）",
          address: "上海市金钟路633号地下一层甲部"
        },
        { value: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
        { value: "浏阳蒸菜", address: "天山西路430号" },
        { value: "四海游龙（天山西路店）", address: "上海市长宁区天山西路" },
        {
          value: "樱花食堂（凌空店）",
          address: "上海市长宁区金钟路968号15楼15-105室"
        },
        { value: "壹分米客家传统调制米粉(天山店)", address: "天山西路428号" },
        {
          value: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号"
        },
        {
          value: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位"
        },
        { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼"
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
        }
      ],
      // 推荐手机号用户
      restaurantsphone: [
        { value: "三全鲜食（北新泾店）666", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号"
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          value: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
        },
        {
          value: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层"
        },
        { value: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { value: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          value: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺"
        },
        {
          value: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819"
        },
        {
          value: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
        },
        { value: "枪会山", address: "上海市普陀区棕榈路" },
        { value: "纵食", address: "元丰天山花园(东门) 双流路267号" },
        { value: "钱记", address: "上海市长宁区天山西路" },
        { value: "壹杯加", address: "上海市长宁区通协路" },
        {
          value: "唦哇嘀咖",
          address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"
        },
        { value: "爱茜茜里(西郊百联)", address: "长宁区仙霞西路88号1305室" },
        {
          value: "爱茜茜里(近铁广场)",
          address:
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
        },
        {
          value: "鲜果榨汁（金沙江路和美广店）",
          address: "普陀区金沙江路2239号金沙和美广场B1-10-6"
        },
        {
          value: "开心丽果（缤谷店）",
          address: "上海市长宁区威宁路天山路341号"
        },
        { value: "超级鸡车（丰庄路店）", address: "上海市嘉定区丰庄路240号" },
        { value: "妙生活果园（北新泾店）", address: "长宁区新渔路144号" },
        { value: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
        {
          value: "凡仔汉堡（老真北路店）",
          address: "上海市普陀区老真北路160号"
        },
        { value: "港式小铺", address: "上海市长宁区金钟路968号15楼15-105室" },
        { value: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
        { value: "北京饺子馆", address: "长宁区北新泾街道天山西路490-1号" },
        {
          value: "饭典*新简餐（凌空SOHO店）",
          address: "上海市长宁区金钟路968号9号楼地下一层9-83室"
        },
        {
          value: "焦耳·川式快餐（金钟路店）",
          address: "上海市金钟路633号地下一层甲部"
        },
        { value: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
        { value: "浏阳蒸菜", address: "天山西路430号" },
        { value: "四海游龙（天山西路店）", address: "上海市长宁区天山西路" },
        {
          value: "樱花食堂（凌空店）",
          address: "上海市长宁区金钟路968号15楼15-105室"
        },
        { value: "壹分米客家传统调制米粉(天山店)", address: "天山西路428号" },
        {
          value: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号"
        },
        {
          value: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位"
        },
        { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼"
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
        }
      ]
    };
  },
  methods: {
    // 键盘监听回车生成已输入
    generate() {
      this.ruleForm.result.push(this.ruleForm.phone);
      this.ruleForm.phone = "";
    },

    // 返回输入建议
    querySearchphone(queryString, cb) {
      //   console.log(queryString);
      var restaurants = this.restaurantsphone;
      var results = queryString
        ? restaurants.filter(this.createFilterphone(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 判断数组里的和选择的
    createFilterphone(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 选择推荐手机号用户
    handleSelectphone(item) {
      //   console.log(item);
      if (this.ruleForm.result.indexOf(item.value) == -1) {
        this.ruleForm.result.push(item.value);
      } else {
        this.$message({
          showClose: true,
          message: "用户已添加",
          type: "error"
        });
      }

      this.ruleForm.phone = "";
    },

    // 返回输入建议
    querySearch(queryString, cb) {
      //   console.log(queryString);
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 判断数组里的和选择的
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },

    // 选择推荐商家
    handleSelect(item) {
      //   console.log(item);
      this.ruleForm.storename = item.value;
    },

    // 有效期计数器
    handleChange(value) {
      console.log(value);
    },

    // 清空手机号
    resetphone(item) {
      console.log(item);
      for (var i = 0; i < this.ruleForm.result.length; i++) {
        if (this.ruleForm.result[i] == item) {
          this.ruleForm.result.splice(i, 1);
        }
      }
      //   this.ruleForm.result = "";
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
  mounted() {}
};
</script>

<style lang="less" scoped>
.formwrap {
  .tip {
    margin: 10px 0;
  }
  .validity {
    .el-form-item--mini.el-form-item {
      margin-bottom: 0px !important;
    }
  }
  .phone {
    .el-form-item /deep/ .el-form-item__content {
      display: block !important;
    }
  }
  .el-form-item /deep/ .el-form-item__content {
    display: flex !important;
  }
  .el-form .el-form-item__content > .el-input {
    width: 200px !important;
  }
  .el-form .el-form-item__content > .el-select {
    width: 200px;
    margin-right: 10px;
  }
  .el-form .el-form-item__content > .el-textarea {
    width: 500px;
  }
  .card {
    box-sizing: border-box;
    position: relative;
    display: block;
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