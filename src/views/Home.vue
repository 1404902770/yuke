<template>
  <!-- <p>主页</p> -->
  <div class="home">
    <!-- 第一行卡片 -->
    <div class="count-row">
      <div class="count-card">
        <p>用户总数</p>
        <div>4750</div>
        <span></span>
      </div>
      <div class="count-card">
        <p>商户总数</p>
        <div>380</div>
        <span></span>
      </div>
    </div>
    <!-- 时间检索 -->
    <div class="timesearch">
      <el-form ref="form" :model="sizeForm" size="mini">
        <el-form-item>
          <!-- <el-col :span="5"> -->
            <el-date-picker
              v-model="sizeForm.date"
              type="daterange"
              range-separator=" - "
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          <!-- </el-col> -->
          <!-- <el-col :span="1"> -->
            <el-button type="primary" style="margin-left:10px" @click="onSubmit">确定</el-button>
          <!-- </el-col> -->
        </el-form-item>
      </el-form>
    </div>
    <!-- 统计echarts图 -->
    <div class="echarts">
      <div id="echarts1"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      sizeForm: {
        date: ""
      },
      merchants: ['3','1']
    };
  },
  methods: {
    // echarts图
    getStudent1() {
      let _this = this;
      let student = _this.$echarts.init(document.getElementById("echarts1"));

      student.setOption({
        title: {
          text: "商户注册人数统计"
        },
        // tooltip: {
        //   trigger: "axis"
        // },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: ['2020-07-12','2020-07-14'],
        },
        yAxis: {
          type: "value",
          // 不显示最小值一下没有的坐标
          // scale: true
        },
        series: [
          {
            type: "line",
            data: this.merchants
          }
        ]
      });
    },

    // 点击确定
    onSubmit() {
      console.log("submit!");
    }
  },
  mounted() {
    this.getStudent1();
  }
};
</script>

<style lang="less" scoped>
// 卡片
.count-row {
  display: flex;
  .count-card {
    width: 118px;
    height: 128px;
    background-image: url(../../public/static/images/blue.png);
    background-repeat: no-repeat;
    user-select: none;
    color: #fff;
    overflow: hidden;
    text-align: center;
    p {
      margin-top: 28px;
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      line-height: 20px;
      margin-bottom: 0;
    }
    div {
      margin-top: 12px;
      font-size: 25px;
      font-weight: 600;
      color: #fff;
      line-height: 36px;
    }
    span {
      display: inline-block;
      width: 20px;
      border-bottom: 1px solid #ccc;
    }
  }
}
// 时间检索
.timesearch {
  // width: 400px;
  .el-col-1 {
    width: 5.1%;
  }
}
// echarts图
.echarts {
  #echarts1 {
    width: 600px;
    height: 400px;
  }
}
</style>
