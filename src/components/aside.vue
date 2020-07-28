<template >
  <div class="aside">
    <!-- background-color="#fff"
    text-color="#000"
    active-text-color="#409EFF"-->
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      style="border-right:0;"
      unique-opened
      router
    >
      <template v-for="item in routers">
        <template v-if="item.twoTitle">
          <el-submenu :index="item.oneTitle" :key="item.oneTitle" style="text-align: left;">
            <template slot="title">
              <img :src="item.imgSrc" alt style="width:20px;margin-right:10px;" />
              <span>{{ item.oneTitle }}</span>
            </template>
            <el-menu-item
              v-for="(item,index) in item.twoTitle"
              :key="index"
              @click="goto(item)"
              :index="item.path"
            >{{ item.title }}</el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="item.path" style="text-align: left;">
            <img :src="item.imgSrc" alt style="width:20px;margin-right:10px;" />
            <span slot="title">{{ item.oneTitle }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "asideshell",
  data() {
    return {
      // 路由串
      routers: [
        {
          oneTitle: "设置",
          imgSrc: require("../../public/static/images/z7.png"),
          twoTitle: [
            {
              title: "系统设置",
              path: "/systemSettings"
            },
            {
              title: "幻灯片管理",
              path: "/slideManagement"
            },
            {
              title: "版本管理",
              path: "/versionManagement"
            },
            {
              title: "会员价格管理",
              path: "/vipPriceManagement"
            },
            {
              title: "激活码管理",
              path: "/activationCodeManagement"
            }
          ]
        },
        {
          oneTitle: "管理员管理",
          imgSrc: require("../../public/static/images/z2.png"),
          twoTitle: [
            {
              title: "管理员",
              path: "/administrator"
            }
          ]
        },
        {
          oneTitle: "店铺管理",
          imgSrc: require("../../public/static/images/z3.png"),
          twoTitle: [
            {
              title: "待审核",
              path: "/toAudit"
            },
            {
              title: "已审核",
              path: "/theSpproved"
            },
            {
              title: "添加店铺",
              path: "/addTheStore"
            },
            {
              title: "已删除店铺",
              path: "/deleteShops"
            },
            {
              title: "店铺订单",
              path: "/shopOrder"
            }
          ]
        },
        {
          oneTitle: "提现管理",
          imgSrc: require("../../public/static/images/z4.png"),
          twoTitle: [
            {
              title: "提现记录",
              path: "/withdrawalRecord"
            }
          ]
        },
        {
          oneTitle: "用户管理",
          imgSrc: require("../../public/static/images/z5.png"),
          twoTitle: [
            {
              title: "用户列表",
              path: "/userList"
            },
            {
              title: "合伙人列表",
              path: "/partnerList"
            },
            {
              title: "合伙人申请",
              path: "/partnerPlease"
            },
            {
              title: "用户推广码",
              path: "/userPromotionCode"
            },
            {
              title: "商务合作申请",
              path: "/businessCooperation"
            },
            {
              title: "推广页浏览记录",
              path: "/promotionPage"
            },
            {
              title: "导入用户",
              path: "/importTheUser"
            }
          ]
        },
        {
          oneTitle: "预约管理",
          imgSrc: require("../../public/static/images/z8.png"),
          twoTitle: [
            {
              title: "用户预约列表",
              path: "/userAppointmentList"
            }
          ]
        },
        {
          oneTitle: "商家入驻",
          imgSrc: require("../../public/static/images/z1.png"),
          twoTitle: [
            {
              title: "入驻管理",
              path: "/intoManagement"
            }
          ]
        },
        {
          oneTitle: "营销管理",
          imgSrc: require("../../public/static/images/z6.png"),
          twoTitle: [
            {
              title: "发送短信",
              path: "/sendTextMessage"
            },
            {
              title: "发优惠券",
              path: "/sendCoupons"
            }
          ]
        }
      ]
    };
  },
  methods: {
    goto(item) {
      // console.log(item);
      this.$store.commit('addpath',item)
      this.updatemenu(item)
    },
    updatemenu(val){
      this.$emit('updatemenu',val)
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu-item {
  padding-left: 49px !important;
}
</style>