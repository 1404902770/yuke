import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";

Vue.use(VueRouter);

// 防止重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  // 主页
  {
    path: "/",
    name: "Home",
    component: Home
  },
  // ------------------------设置---------------------
  // 系统设置
  {
    path: '/systemSettings',
    // name: 'SystemSettings',
    component: resolve => require(['@/views/setting/systemSettings.vue'], resolve),
    children: [
      // 系统设置
      {
        path: '/',
        name: 'SystemSet',
        component: resolve => require(['@/views/setting/SystemSetting/systemSet.vue'], resolve),
      },
      // 优惠劵使用说明
      {
        path: '/couponUse',
        name: 'CouponUse',
        component: resolve => require(['@/views/setting/SystemSetting/couponUse.vue'], resolve),
      },
      // 公告宣传图
      {
        path: '/announcement',
        name: 'Announcement',
        component: resolve => require(['@/views/setting/SystemSetting/announcement.vue'], resolve),
      },
      // 代理设置
      {
        path: '/proxySetting',
        name: 'ProxySetting',
        component: resolve => require(['@/views/setting/SystemSetting/proxySetting.vue'], resolve),
      },
      // 会员说明
      {
        path: '/vipInstructions',
        name: 'vipInstructions',
        component: resolve => require(['@/views/setting/SystemSetting/vipInstructions.vue'], resolve),
      },
      // 商家会员卡设置
      {
        path: '/vipCard',
        name: 'VipCard',
        component: resolve => require(['@/views/setting/SystemSetting/vipCard.vue'], resolve),
      },
      // 返利规则说明
      {
        path: '/rebateRules',
        name: 'RebateRules',
        component: resolve => require(['@/views/setting/SystemSetting/rebateRules.vue'], resolve),
      },
      // 推广页
      {
        path: '/promotion',
        name: 'Promotion',
        component: resolve => require(['@/views/setting/SystemSetting/promotionPage.vue'], resolve),
      }
    ]
  },
  // 幻灯片管理
  {
    path: '/slideManagement',
    name: 'SlideManagement',
    component: resolve => require(['@/views/setting/slideManagement.vue'], resolve)
  },
  // 版本管理
  {
    path: '/versionManagement',
    name: 'VersionManagement',
    component: resolve => require(['@/views/setting/versionManagement.vue'], resolve)
  },
  // 会员价格管理
  {
    path: '/vipPriceManagement',
    name: 'VipPriceManagement',
    component: resolve => require(['@/views/setting/vipPriceManagement.vue'], resolve)
  },
  // 激活码管理
  {
    path: '/activationCodeManagement',
    name: 'ActivationCodeManagement',
    component: resolve => require(['@/views/setting/activationCodeManagement.vue'], resolve)
  },
  // -------------------------管理员管理------------------------
  // 管理员
  {
    path: '/administrator',
    name: 'Administrator',
    component: resolve => require(['@/views/administrator/administrator.vue'], resolve)
  },
  // -----------------------店铺管理------------------------
  // 待审核
  {
    path: '/toAudit',
    name: 'ToAudit',
    component: resolve => require(['@/views/store/toAudit.vue'], resolve)
  },
  // 已审核
  {
    path: '/theSpproved',
    name: 'theSpproved',
    component: resolve => require(['@/views/store/theSpproved.vue'], resolve)
  },
  // 已审核 - 设置
  {
    path: '/theSpprovedSet',
    name: 'theSpprovedSet',
    component: resolve => require(['@/views/store/theSpprovedSet.vue'], resolve),
  },
  // 添加店铺
  {
    path: '/addTheStore',
    name: 'AddTheStore',
    component: resolve => require(['@/views/store/addTheStore.vue'], resolve)
  },
  // 已删除店铺
  {
    path: '/deleteShops',
    name: 'DeleteShops',
    component: resolve => require(['@/views/store/deleteShops.vue'], resolve)
  },
  // 店铺订单
  {
    path: '/shopOrder',
    name: 'ShopOrder',
    component: resolve => require(['@/views/store/shopOrder.vue'], resolve)
  },
  // -----------------------提现管理------------------------
  // 提现记录
  {
    path: '/withdrawalRecord',
    name: 'WithdrawalRecord',
    component: resolve => require(['@/views/withdrawal/withdrawalRecord.vue'], resolve)
  },
  // -----------------------用户管理------------------------
  // 用户列表
  {
    path: '/userList',
    name: 'UserList',
    component: resolve => require(['@/views/user/userList.vue'], resolve)
  },
  // 合伙人列表
  {
    path: '/partnerList',
    name: 'PartnerList',
    component: resolve => require(['@/views/user/partnerList.vue'], resolve)
  },
  // 合伙人申请
  {
    path: '/partnerPlease',
    name: 'PartnerPlease',
    component: resolve => require(['@/views/user/partnerPlease.vue'], resolve)
  },
  // 用户推广码
  {
    path: '/userPromotionCode',
    name: 'UserPromotionCode',
    component: resolve => require(['@/views/user/userPromotionCode.vue'], resolve)
  },
  // 商务合作申请
  {
    path: '/businessCooperation',
    name: 'BusinessCooperation',
    component: resolve => require(['@/views/user/businessCooperation.vue'], resolve)
  },
  // 推广页浏览记录
  {
    path: '/promotionPage',
    name: 'PromotionPage',
    component: resolve => require(['@/views/user/promotionPage.vue'], resolve)
  },
  // 导入用户
  {
    path: '/importTheUser',
    name: 'ImportTheUser',
    component: resolve => require(['@/views/user/importTheUser.vue'], resolve)
  },
  // -----------------------预约管理------------------------
  // 用户预约列表
  {
    path: '/userAppointmentList',
    name: 'UserAppointmentList',
    component: resolve => require(['@/views/convention/userAppointmentList.vue'], resolve)
  },
  // -----------------------商家入驻------------------------
  // 入驻管理
  {
    path: '/intoManagement',
    name: 'IntoManagement',
    component: resolve => require(['@/views/storeIn/intoManagement.vue'], resolve)
  },
  // -----------------------营销管理------------------------
  // 发送短信
  {
    path: '/sendTextMessage',
    name: 'SendTextMessage',
    component: resolve => require(['@/views/marketing/sendTextMessage.vue'], resolve),
    meta:{
      title:'发送短信'
    }
  },
  // 发优惠券
  {
    path: '/sendCoupons',
    name: 'SendCoupons',
    component: resolve => require(['@/views/marketing/sendCoupons.vue'], resolve)
  }


];

const router = new VueRouter({
  routes
});

export default router;
