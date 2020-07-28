<template>
  <!-- 公共头部 -->
  <div class="publicShell">
    <div class="left">
      <h3>娱事通后台管理系统</h3>
    </div>
    <div class="middle">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">首页</el-menu-item>

        <template v-for="(item,index) in list">
          <el-menu-item class="card" :index="item.path" :key="index">
            {{item.title}}
            <i title="删除" class="el-icon-close" @click="resetmenu(item)"></i>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="right">
      <!-- <el-col :span="12"> -->
      <el-dropdown trigger="click" @command="goOut()">
        <span class="el-dropdown-link">
          admin
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- </el-col> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["menu"],
  data() {
    return {
      activeIndex: "/",
      list: []
    };
  },
  methods: {
    // 菜单切换
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },

    // 删除菜单某一项
    resetmenu(item) {
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].title == item.title) {
          this.list.splice(i, 1);
        }
      }
    },

    // 点击退出
    goOut() {}
  },
  watch: {
    menu(newval, oldval) {
      // console.log(newval, oldval);
      this.activeIndex = newval.path;
    }
  },
  mounted() {
    this.list = this.$store.state.path;
  }
};
</script>
  
<style lang="less" scoped>
.publicShell {
  display: flex;
  // width: 100vw;
  flex-wrap: nowrap;
  overflow-y: hidden;
  overflow-x: auto;
  background-color: #545c64;
}
.left {
  // width: 216px;
  // background-color: rgb(84, 92, 100);
  display: inline-flex;
  justify-content: center;
  width: var(--sideWidth);
  flex-grow: 0;
  flex-shrink: 0;
  h3 {
    font-size: 24px;
    color: white;
    margin: 13px 0;
  }
}
.middle {
  // width: 78.6%;
  display: inline-flex;
  flex-grow: 1;
  max-height: 60px;
}
.right {
  display: inline-flex;
  align-items: center;
  color: #fff;
  // width: 10%;
  // background-color: rgb(84, 92, 100);
  // .el-col-12 {
  //   float: right;
  //   margin-top: 20px;
  // }
}
.el-menu--horizontal {
  border-bottom: none !important;
}
.el-dropdown {
  margin: 0 20px;
}
.el-dropdown-link {
  color: white;
}
.el-dropdown-link:hover {
  color: goldenrod;
  cursor: pointer;
}
.card {
  i {
    position: absolute;
    display: none;
    top: 2px;
    right: -9px;
    font-size: 14px;
  }
  i:hover {
    color: #fff;
  }
}
.card:hover {
  i {
    display: inline-block !important;
  }
}
</style>
  