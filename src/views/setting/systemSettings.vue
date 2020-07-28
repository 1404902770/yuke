<template>
  <div>
    <el-container>
      <el-header>
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="系统设置" name="SystemSet"></el-tab-pane>
            <el-tab-pane label="优惠劵使用说明" name="CouponUse"></el-tab-pane>
            <el-tab-pane label="公告&宣传图" name="Announcement"></el-tab-pane>
            <el-tab-pane label="代理设置" name="ProxySetting"></el-tab-pane>
            <el-tab-pane label="会员说明" name="vipInstructions"></el-tab-pane>
            <el-tab-pane label="商家会员卡设置" name="VipCard"></el-tab-pane>
            <el-tab-pane label="返利规则说明" name="RebateRules"></el-tab-pane>
            <el-tab-pane label="推广页" name="Promotion"></el-tab-pane>
          </el-tabs>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "SystemSet"
    };
  },
  methods: {
    handleClick(tab, event) {
      //   console.log(tab);
      this.$router.replace({ name: tab.name }).catch(err => err);
    }
  },
  mounted() {
    this.activeName = this.$route.name;
  }
};
</script>

<style lang="less" scoped>
</style>